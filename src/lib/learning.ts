// src/lib/learning.ts
// Learning Lab domain types and shared logic.
//
// The model deliberately has no "exam paper" documents. There is one flat
// question bank tagged grade / subject / topic, and a paper is generated on
// demand from a topic selection. Adding new material means adding questions,
// not another page.

// Type-only — this module is imported by client components, so the driver must
// never end up in the browser bundle.
import type { ObjectId } from 'mongodb'

/**
 * Paper sizing rules. A learner may pick as many topics as they like, but
 * every chosen topic must contribute at least MIN_PER_TOPIC questions — a
 * topic represented by one or two questions is not really being tested. That
 * minimum, together with the 50-question ceiling, is what caps the topic count.
 */
export const MIN_PER_TOPIC = 5
export const MAX_PAPER_LENGTH = 50

/** 50 ÷ 5 — the most topics that can each still get their minimum share. */
export const MAX_TOPICS = Math.floor(MAX_PAPER_LENGTH / MIN_PER_TOPIC)

/** Selectable paper lengths. */
export const PAPER_LENGTHS = [10, 15, 20, 25, 30, 40, 50] as const
export const DEFAULT_PAPER_LENGTH = 20

/**
 * Paper formats. A multiple-choice paper and a spoken one are different tests
 * with different economics, so they are picked separately rather than mixed:
 * fifty MCQs is a reasonable sitting, fifty three-mark spoken answers is two
 * hours of talking.
 */
export const FORMATS = ['mcq', 'spoken', 'match'] as const
export type PaperFormat = (typeof FORMATS)[number]

/**
 * A spoken paper's floors are lower than an MCQ's, because each question is
 * worth three marks and takes a minute and a half rather than fifteen seconds.
 * Two per topic is enough for a topic to be worth offering, and four questions
 * — twelve marks — is the least that reads as a paper rather than a spot check.
 */
export const SPOKEN_MIN_PER_TOPIC = 2
export const SPOKEN_MIN_PAPER = 4
export const SPOKEN_MAX_PAPER = 12
export const SPOKEN_PAPER_LENGTHS = [4, 6, 8, 10, 12] as const
export const DEFAULT_SPOKEN_LENGTH = 6

/**
 * Match-the-columns papers. Each question is a passage plus several pairs, so
 * one question is a good few minutes of work — a paper of four is plenty.
 */
export const MATCH_MIN_PER_TOPIC = 2
export const MATCH_MIN_PAPER = 3
export const MATCH_MAX_PAPER = 8
export const MATCH_PAPER_LENGTHS = [3, 4, 5, 6, 8] as const
export const DEFAULT_MATCH_LENGTH = 4

export const minPerTopicFor = (format: PaperFormat) =>
  format === 'spoken' ? SPOKEN_MIN_PER_TOPIC
  : format === 'match' ? MATCH_MIN_PER_TOPIC
  : MIN_PER_TOPIC

export const maxTopicsFor = (format: PaperFormat) =>
  format === 'spoken' ? Math.floor(SPOKEN_MAX_PAPER / SPOKEN_MIN_PER_TOPIC)
  : format === 'match' ? Math.floor(MATCH_MAX_PAPER / MATCH_MIN_PER_TOPIC)
  : MAX_TOPICS

/** The shortest paper a given selection can honestly produce. */
export const minLengthForFormat = (topicCount: number, format: PaperFormat) =>
  format === 'spoken' ? Math.max(SPOKEN_MIN_PAPER, topicCount * SPOKEN_MIN_PER_TOPIC)
  : format === 'match' ? Math.max(MATCH_MIN_PAPER, topicCount * MATCH_MIN_PER_TOPIC)
  : topicCount * MIN_PER_TOPIC

export const isFormat = (v: unknown): v is PaperFormat =>
  (FORMATS as readonly string[]).includes(String(v))

/**
 * How long a learner sits on one question before the hint button appears.
 * The hint is offered, never auto-revealed — most teacher tips name the answer.
 * Two minutes: a child who is genuinely working through a question should not
 * be interrupted by an offer of help, and one who is stuck will still be stuck
 * in two minutes.
 */
export const HINT_DELAY_MS = 120_000

/**
 * How many hints a single paper allows: one for every five questions.
 *
 * Without a cap the hints are simply an answer key — 42% of the teacher tips
 * name the correct option outright, which is why they are fetched one at a
 * time rather than shipped with the paper. A budget keeps a hint something a
 * learner spends rather than something they collect, and makes the hint count
 * on an attempt worth reading.
 *
 * The floor of one matters for a ten-question paper, where a strict fifth
 * would still be two, but for any shorter paper the division would round to
 * nothing and the feature would silently disappear.
 */
export const hintBudgetFor = (paperLength: number) =>
  Math.max(1, Math.floor(paperLength / 5))

// ── Difficulty ─────────────────────────────────────────────────────────────

export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const
export type Difficulty = (typeof DIFFICULTIES)[number]
export type DifficultyMix = Record<Difficulty, number>

export interface DifficultyPreset {
  id: string
  label: string
  blurb: string
  mix: DifficultyMix
}

/**
 * Presets rather than three sliders. Sliders that must total 100 are fiddly on
 * a phone and give a child a way to get stuck; a preset cannot be set wrong.
 *
 * Only 14% of the bank is hard, so Challenge will often not be fully met. The
 * generator reports the mix it actually achieved rather than pretending.
 */
export const DIFFICULTY_PRESETS: DifficultyPreset[] = [
  { id: 'warmup',    label: 'Warm-up',   blurb: 'Mostly easier questions, to build confidence',
    mix: { easy: 0.65, medium: 0.30, hard: 0.05 } },
  { id: 'balanced',  label: 'Balanced',  blurb: 'A normal test — a bit of everything',
    mix: { easy: 0.35, medium: 0.45, hard: 0.20 } },
  { id: 'challenge', label: 'Challenge', blurb: 'Harder questions, for revision before a test',
    mix: { easy: 0.15, medium: 0.45, hard: 0.40 } },
]

export const DEFAULT_PRESET = 'balanced'
export const presetById = (id: unknown) =>
  DIFFICULTY_PRESETS.find((p) => p.id === id) ??
  DIFFICULTY_PRESETS.find((p) => p.id === DEFAULT_PRESET)!

/** Nudge a rounded split so it sums exactly to `total`. */
function reconcile(want: DifficultyMix, total: number): DifficultyMix {
  const order: Difficulty[] = ['medium', 'easy', 'hard']
  let sum = DIFFICULTIES.reduce((a, b) => a + want[b], 0)
  let i = 0
  while (sum !== total && i < 100) {
    const b = order[i % order.length]
    if (sum < total) { want[b]++; sum++ }
    else if (want[b] > 0) { want[b]--; sum-- }
    i++
  }
  return want
}

/**
 * Split each topic's share across the three difficulty bands.
 *
 * Where a topic cannot supply its share of a band — 24 of 58 topics have no
 * hard questions at all — the shortfall is refilled from the bands that do have
 * room, medium first, since medium is the least disruptive substitute. The
 * paper therefore stays the requested length and keeps its per-topic floor,
 * and only the mix bends.
 */
export function allocateDifficulty(
  perTopic: Record<string, number>,
  available: Record<string, Partial<DifficultyMix>>,
  mix: DifficultyMix,
): Record<string, DifficultyMix> {
  const out: Record<string, DifficultyMix> = {}

  for (const [topic, n] of Object.entries(perTopic)) {
    const have: DifficultyMix = {
      easy: available[topic]?.easy ?? 0,
      medium: available[topic]?.medium ?? 0,
      hard: available[topic]?.hard ?? 0,
    }

    const want = reconcile({
      easy: Math.round(n * mix.easy),
      medium: Math.round(n * mix.medium),
      hard: Math.round(n * mix.hard),
    }, n)

    // Trim anything the topic cannot supply.
    let shortfall = 0
    for (const b of DIFFICULTIES) {
      if (want[b] > have[b]) { shortfall += want[b] - have[b]; want[b] = have[b] }
    }

    // Refill from bands with spare capacity, medium first.
    const refillOrder: Difficulty[] = ['medium', 'easy', 'hard']
    while (shortfall > 0) {
      const b = refillOrder.find((x) => have[x] - want[x] > 0)
      if (!b) break // the whole topic is exhausted
      want[b]++
      shortfall--
    }

    out[topic] = want
  }

  return out
}

/** Shortest paper that can give each of `topicCount` topics its minimum. */
export const minLengthFor = (topicCount: number) => topicCount * MIN_PER_TOPIC

/** How long a generated paper stays resumable before the TTL index reaps it. */
export const PAPER_TTL_SECONDS = 60 * 60 * 24 * 2 // 2 days

export const SUBJECT_LABEL: Record<string, string> = {
  english:          'English',
  maths:            'Maths',
  science:          'Science',
  'social-science': 'Social Science',
  telugu:           'Telugu (తెలుగు)',
}

/**
 * Rail colour per subject. These come from the cool-only subject family, not
 * the brand accents — madder and ochre are needed for status inside the lab,
 * and reusing them here made a Science rail and "not answered" identical.
 */
export const SUBJECT_ACCENT: Record<string, string> = {
  english:          'var(--subj-1)',  // indigo
  maths:            'var(--subj-2)',  // slate blue
  science:          'var(--subj-3)',  // plum
  'social-science': 'var(--subj-4)',  // ink
  telugu:           'var(--subj-5)',  // deep green
}

// ── Documents ──────────────────────────────────────────────────────────────

export interface LearningQuestion {
  _id?: ObjectId
  contentHash: string
  grade: number
  subject: string
  chapter: string
  topic: string
  topicLabel: string
  subtopic?: string | null
  question: string          // may contain inline HTML (<b>) from the source banks
  options: string[]
  answer: number            // index into `options`
  hint: string
  visual?: string | null    // monospace text block, e.g. "| 221 | 427 | 614 |"
  imageSvg?: string | null  // inline SVG, e.g. the Harappan seal drawings
  /**
   * Link to a hosted picture, used the same way as imageSvg. Deliberately NOT
   * part of contentHash: the hash identifies the question, and swapping the
   * illustration does not make it a different question. Including it would
   * also change every existing hash and break idempotent re-import.
   */
  imageUrl?: string | null
  /**
   * Reading comprehension. The passage text is repeated on every question that
   * belongs to it rather than held in its own collection: it keeps paper
   * generation a single query, and a passage is small next to the convenience.
   *
   * Unlike imageUrl, passageId *is* folded into contentHash. Comprehension sets
   * ask the same short questions of different texts — "What is the main idea of
   * this passage?" — and without the passage in the hash those would collide
   * and dedupe away. It is appended only when present, so the hashes of every
   * question written before this existed are untouched.
   */
  passageId?: string | null
  passageTitle?: string | null
  passage?: string | null
  sources?: string[]
  status?: 'published' | 'draft'
  /** Provisional until enough learners have answered — see classify-difficulty.mjs. */
  difficulty?: Difficulty
  difficultySource?: 'heuristic' | 'authored' | 'observed'
  createdAt?: Date
  updatedAt?: Date
}

/** A question as sent to the browser — the answer and hint are withheld. */
export interface PaperQuestion {
  qid: string
  topic: string
  topicLabel: string
  question: string
  options: string[]
  visual?: string | null
  imageSvg?: string | null
  imageUrl?: string | null
  /** Set on comprehension questions — see MIN_PER_PASSAGE. */
  passageId?: string | null
  passageTitle?: string | null
  passage?: string | null
}

/**
 * The fewest questions a reading passage may contribute to a paper.
 *
 * Comprehension is the one topic where questions are not independent: the cost
 * of a question is reading the passage, and that cost is only worth paying
 * across several questions. A paper of ten comprehension questions should be
 * three passages, not ten — so passages are drawn whole, and the last one is
 * trimmed only if at least this many of its questions still fit.
 */
export const MIN_PER_PASSAGE = 3

/**
 * Only http(s) links are allowed through, so a stored value can never become
 * a javascript: or data: URI that executes when rendered.
 */
export function sanitizeImageUrl(raw: unknown): string | null {
  const s = String(raw ?? '').trim()
  if (!s) return null
  try {
    const u = new URL(s)
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.toString() : null
  } catch {
    return null
  }
}

export interface LearningPaper {
  _id?: ObjectId
  grade: number
  subject: string
  topics: string[]
  learnerName: string
  /** Question id + the option order shown, so scoring matches what was seen. */
  items: { qid: string; order: number[] }[]
  createdAt: Date
  submittedAt?: Date | null
}

export interface TopicSummary {
  /** How many questions the topic holds in each band. */
  byDifficulty?: DifficultyMix
  slug: string
  label: string
  chapter: string
  /** Multiple-choice questions available. */
  count: number
  /** Three-mark spoken questions available. Absent means none. */
  spoken?: number
  /** Match-the-columns questions available. Absent means none. */
  match?: number
}

export interface SubjectSummary {
  subject: string
  subjectLabel: string
  total: number
  topics: TopicSummary[]
}

export interface GradeSummary {
  grade: number
  subjects: SubjectSummary[]
}

// ── Helpers ────────────────────────────────────────────────────────────────

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Split `total` questions across `topics`.
 *
 * Every topic is first given MIN_PER_TOPIC questions so that no topic appears
 * as a token one or two questions. A topic that does not hold that many gives
 * what it has. Whatever is left is then spread evenly, and topics that run out
 * hand their shortfall back to the others so a short topic never shrinks the
 * paper below the requested length.
 */
export function allocatePerTopic(
  topics: string[],
  available: Record<string, number>,
  total: number,
  /** The per-topic floor. Spoken papers use a lower one — see SPOKEN_MIN_PER_TOPIC. */
  floor: number = MIN_PER_TOPIC,
): Record<string, number> {
  const alloc: Record<string, number> = {}
  for (const t of topics) alloc[t] = 0

  let remaining = total

  // Pass 1 — guarantee the floor, in order, until the paper is full.
  for (const t of topics) {
    if (remaining <= 0) break
    const take = Math.min(floor, available[t] ?? 0, remaining)
    alloc[t] += take
    remaining -= take
  }

  // Pass 2 — share out what is left.
  let open = topics.filter((t) => (available[t] ?? 0) - alloc[t] > 0)

  while (remaining > 0 && open.length > 0) {
    const share = Math.max(1, Math.floor(remaining / open.length))
    let progressed = false

    for (const t of open) {
      if (remaining <= 0) break
      const room = (available[t] ?? 0) - alloc[t]
      if (room <= 0) continue
      const take = Math.min(share, room, remaining)
      alloc[t] += take
      remaining -= take
      if (take > 0) progressed = true
    }

    open = open.filter((t) => (available[t] ?? 0) - alloc[t] > 0)
    if (!progressed) break // every topic is exhausted
  }

  return alloc
}

/**
 * How far below a device's recent average a score must fall before the result
 * screen gently asks whether the same learner is at the keyboard.
 */
export const CONTINUITY_DROP_POINTS = 30
/** Minimum prior attempts on a device before its average means anything. */
export const CONTINUITY_MIN_HISTORY = 2

export interface Continuity {
  flagged: boolean
  priorAttempts: number
  priorAvgPct: number
  priorBestPct: number
  /** The name most often used on this device before today's paper. */
  usualName: string | null
}

/**
 * Opaque per-device identifier. Generated randomly in the browser and stored in
 * localStorage — it is not a fingerprint and carries nothing about the person
 * or the machine. It exists only to spot a run of papers from one device, so a
 * sudden collapse in score can prompt a friendly "is this still you?".
 */
export function sanitizeDeviceId(raw: unknown): string | null {
  const s = String(raw ?? '').trim()
  return /^[a-z0-9-]{8,64}$/i.test(s) ? s : null
}

/** Trim and bound a learner-supplied name. First names only — no accounts. */
export function sanitizeLearnerName(raw: unknown): string {
  return String(raw ?? '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 24)
}

/**
 * The single field every per-learner query should group on.
 *
 * Today there are no accounts, so the best available identity is the device,
 * falling back to the typed name. Neither is a person: two children sharing a
 * tablet share a device, and two children may type "Aarush".
 *
 * It exists so that adding a login later is a change to this one function
 * rather than to every aggregation. When accounts arrive, `studentId` wins and
 * history already recorded under `device:…` can be claimed by matching a
 * student's known devices — which is only possible because the raw
 * `learnerName` and `deviceId` are still stored alongside this key, never
 * replaced by it.
 *
 * The prefix is deliberate: it keeps the three kinds of identity from ever
 * colliding, and makes the weaker ones obvious at a glance in the data.
 */
export function learnerKey(input: {
  studentId?: string | null
  deviceId?: string | null
  learnerName?: string | null
}): string {
  if (input.studentId) return `student:${input.studentId}`
  if (input.deviceId) return `device:${input.deviceId}`
  const name = sanitizeLearnerName(input.learnerName).toLowerCase().replace(/\s+/g, '-')
  return name ? `name:${name}` : 'anonymous'
}

/** One question as answered, kept on the attempt so the paper can be rebuilt. */
export interface AttemptItem {
  qid: string
  topic: string
  /** Copied at submit time, so later re-classification cannot rewrite history. */
  difficulty: Difficulty | null
  /**
   * Index into the question's *stored* option order, not the shuffled order the
   * learner saw. Without this normalisation the same wrong answer would look
   * like a different one on every paper, and distractor analysis — the thing
   * that separates a hard question from a broken one — would be impossible.
   */
  chosen: number | null
  correct: number
  isCorrect: boolean
  hinted: boolean
}

/**
 * Render "3/4" and "2 1/3" as properly stacked fractions.
 *
 * A string transform rather than a maths library. MathJax is over a megabyte
 * and KaTeX around 280KB before fonts, against a learning page that currently
 * ships 111KB in total — and the entire maths bank contains nothing harder
 * than a fraction or a mixed number. No exponents, no roots, no equations.
 * Fifteen lines of CSS covers it with no runtime at all, and prints correctly
 * in the downloadable report, which a JS typesetter has to be coaxed into.
 *
 * (If Class 9-12 algebra ever arrives, the answer is KaTeX rather than MathJax
 * — smaller and far faster — but that is a different problem from this one.)
 *
 * Done at render time so the bank keeps its plain "3/4". The stored text is
 * what contentHash is built from and what scoring compares, and neither should
 * change because of how something looks.
 *
 * One pass, so the markup it emits is never rescanned. □ is included because
 * the fill-in-the-box questions read "2/3 = □/12" and the box should sit in a
 * fraction like any numerator.
 */
const FRACTION = /(\d+)\s+(\d+|□)\/(\d+)|(\d+|□)\/(\d+)/g

const stack = (n: string, d: string) =>
  `<span class="ll-frac"><span class="ll-frac-n">${n}</span>` +
  `<span class="ll-frac-d">${d}</span></span>`

export function withFractions(html: string): string {
  if (!html) return html
  return html.replace(FRACTION, (_m, w, mn, md, sn, sd) =>
    w !== undefined
      ? `${w}\u2009${stack(mn, md)}`   // mixed number: 2 1/3
      : stack(sn, sd),                  // plain fraction: 3/4
  )
}

/** Options are stored as plain text, so escape before adding any markup. */
export function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * The four assertion-and-reason verdicts, in the order every board paper puts
 * them.
 *
 * A learner wrote: "A and R questions have mixed up options". They were right.
 * Options are shuffled per attempt so the answer is never in a fixed place —
 * correct for ordinary multiple choice, wrong here. In CBSE papers these four
 * always appear in this order, so a student learns to read them by position;
 * shuffling forces all four to be re-read every time and breaks a habit the
 * exam itself rewards.
 */
export const AR_OPTIONS = [
  'Both A and R are true, and R is the correct explanation of A',
  'Both A and R are true, but R is not the correct explanation of A',
  'A is true but R is false',
  'A is false but R is true',
] as const

/**
 * Positions that put `options` into the canonical order above, or null when the
 * question is not an assertion-and-reason set.
 *
 * Matched on the option text rather than on a type flag, so it holds for any
 * question phrased this way — including ones added later that nobody remembered
 * to tag.
 */
export function canonicalArOrder(options: string[]): number[] | null {
  if (options.length !== AR_OPTIONS.length) return null
  const order = AR_OPTIONS.map((t) => options.indexOf(t))
  return order.every((i) => i >= 0) ? order : null
}

export function scoreMessage(pct: number): string {
  if (pct >= 90) return 'Excellent work. You have really got this.'
  if (pct >= 70) return 'Good job. A little more practice and you will master it.'
  if (pct >= 50) return 'Fair attempt. Go through the review below to find the weak spots.'
  return 'Keep practicing. Read the tips in the review, then try again.'
}
