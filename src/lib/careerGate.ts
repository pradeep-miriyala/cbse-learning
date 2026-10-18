// src/lib/careerGate.ts
// Expert access to Career Choices, and the audit trail behind every change.
//
// Codes and passes are HMAC-signed with NEXTAUTH_SECRET, the same approach as
// src/lib/drafts.ts — the server never stores a raw code, and nothing the client
// holds can be forged without the secret. The difference from the draft
// workshop is scope: a manuscript gates per book, and this gates the whole
// module, because an expert invited to check the nursing ladder should be able
// to see what the questionnaire asked to get there.

import { createHmac, randomBytes, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import { ObjectId, WithId, Document } from 'mongodb'
import {
  getCareerExpertsCollection,
  getCareerRevisionsCollection,
  getCareerReviewsCollection,
} from './mongodb'
import type { Reviewable, ReviewState } from './career'

const SECRET = () => process.env.NEXTAUTH_SECRET || 'dev-career-secret'

function sameDigest(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  return timingSafeEqual(Buffer.from(a, 'hex'), Buffer.from(b, 'hex'))
}

// ── Expert codes ────────────────────────────────────────────────────────────
// Same alphabet as the reviewer codes: no I/1/O/0, so a code survives being
// read down a phone line and retyped.

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateExpertCode(): string {
  const chars: string[] = []
  while (chars.length < 8) {
    for (const b of randomBytes(16)) {
      if (b >= 256 - (256 % ALPHABET.length)) continue
      chars.push(ALPHABET[b % ALPHABET.length])
      if (chars.length === 8) break
    }
  }
  return `${chars.slice(0, 4).join('')}-${chars.slice(4).join('')}`
}

export const normalizeCode = (raw: string) => raw.toUpperCase().replace(/[^A-Z0-9]/g, '')

export function hashExpertCode(code: string): string {
  return createHmac('sha256', SECRET())
    .update(`career-code:${normalizeCode(code)}`)
    .digest('hex')
}

// ── Access pass ─────────────────────────────────────────────────────────────

const PASS_TTL_SECONDS = 30 * 24 * 60 * 60
export const PASS_MAX_AGE = PASS_TTL_SECONDS
export const PASS_COOKIE = 'cc_expert'

function signPass(expertId: string, exp: number): string {
  return createHmac('sha256', SECRET()).update(`career-pass:${expertId}:${exp}`).digest('hex')
}

export function issueExpertPass(expertId: string): string {
  const exp = Math.floor(Date.now() / 1000) + PASS_TTL_SECONDS
  return Buffer.from(
    JSON.stringify({ e: expertId, exp, sig: signPass(expertId, exp) }),
  ).toString('base64url')
}

export function verifyExpertPass(token: unknown): { expertId: string } | null {
  if (typeof token !== 'string' || !token) return null
  try {
    const { e, exp, sig } = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'))
    if (typeof e !== 'string' || typeof exp !== 'number' || typeof sig !== 'string') return null
    if (Math.floor(Date.now() / 1000) > exp) return null
    if (!sameDigest(signPass(e, exp), sig)) return null
    return { expertId: e }
  } catch {
    return null
  }
}

export type ExpertDoc = WithId<Document> & {
  name: string
  /** What they were invited for — shown beside their suggestions on a card. */
  discipline: string
  /**
   * Suggest-only by default. Two experts editing one card will contradict each
   * other, and the trail should record a recommendation and the decision on it
   * as two separate things rather than as one silent overwrite.
   */
  canEdit: boolean
  revoked: boolean
}

/** The expert behind the current request, or null. Revocation bites at once. */
export async function resolveExpert(): Promise<ExpertDoc | null> {
  const jar = await cookies()
  const pass = verifyExpertPass(jar.get(PASS_COOKIE)?.value)
  if (!pass || !ObjectId.isValid(pass.expertId)) return null

  const col = await getCareerExpertsCollection()
  const expert = (await col.findOne({ _id: new ObjectId(pass.expertId) })) as ExpertDoc | null
  if (!expert || expert.revoked) return null
  return expert
}

/** Convenience for route handlers. */
export async function requireExpert(): Promise<
  { ok: true; expert: ExpertDoc } | { ok: false; status: 401 }
> {
  const expert = await resolveExpert()
  return expert ? { ok: true, expert } : { ok: false, status: 401 }
}

// ── The trail ───────────────────────────────────────────────────────────────

export type CareerCollection = 'fields' | 'roles' | 'streams' | 'funding' | 'items'

/**
 * Record the state a document was in *before* a change, then return the fields
 * that carry it forward.
 *
 * Full snapshots rather than diffs. The documents are small, storage at this
 * volume is free, and restoring a card becomes a copy instead of a replay of
 * every edit since it was written. It also means the history reads the way a
 * commit log does — you can pull up a card exactly as it stood on the day an
 * expert approved it, which is the version their name is attached to.
 */
export async function recordRevision(
  collection: CareerCollection,
  docId: string,
  previous: (Document & Partial<Reviewable>) | null,
  changedBy: string,
  note: string,
): Promise<Pick<Reviewable, 'version' | 'updatedAt' | 'updatedBy'>> {
  const version = (previous?.version ?? 0) + 1

  if (previous) {
    const revisions = await getCareerRevisionsCollection()
    await revisions.insertOne({
      collection,
      docId,
      version: previous.version ?? 0,
      snapshot: previous,
      changedBy,
      changedAt: new Date(),
      note,
    })
  }

  return { version, updatedAt: new Date(), updatedBy: changedBy }
}

/** Only published cards reach a learner. Everything else is expert-facing. */
export const PUBLISHED_ONLY = { reviewState: 'published' as ReviewState }

/**
 * Fields to set when a card is approved. Stamped once, on the first transition
 * into expert_approved — a later edit bumps the version and the stamp goes
 * stale on purpose, so "reviewed by X in March" cannot silently come to mean a
 * card X never saw.
 */
export function approvalStamp(
  previous: { reviewState?: string } | null,
  next: ReviewState,
  by: string,
) {
  const alreadyApproved = previous?.reviewState === 'expert_approved'
    || previous?.reviewState === 'published'
  if (next !== 'expert_approved' || alreadyApproved) return {}
  return { approvedBy: by, approvedAt: new Date() }
}

// ── Suggestions ─────────────────────────────────────────────────────────────

export interface CareerReview {
  _id?: ObjectId
  collection: CareerCollection
  docId: string
  /** The field of the card being commented on, e.g. 'entryRoutes'. */
  path: string
  /** The version they were looking at, so a stale suggestion is recognisable. */
  onVersion: number
  expert: string
  discipline: string
  body: string
  status: 'open' | 'applied' | 'declined'
  createdAt: Date
  resolvedAt?: Date | null
  resolutionNote?: string | null
}

export async function addSuggestion(
  input: Omit<CareerReview, '_id' | 'status' | 'createdAt'>,
): Promise<void> {
  const col = await getCareerReviewsCollection()
  await col.insertOne({ ...input, status: 'open', createdAt: new Date() })
}

export async function suggestionsFor(
  collection: CareerCollection,
  docId: string,
): Promise<CareerReview[]> {
  const col = await getCareerReviewsCollection()
  return (await col
    .find({ collection, docId })
    .sort({ createdAt: 1 })
    .toArray()) as unknown as CareerReview[]
}
