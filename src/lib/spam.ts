// src/lib/spam.ts
// Layered spam defense without any third-party services

import { getRateLimitCollection } from './mongodb'

// ── 1. HONEYPOT CHECK ──────────────────────────────────────────────────────
// The form has a hidden field named "website". Bots fill it in, humans don't.
export function checkHoneypot(honeypotValue: string | undefined): boolean {
  return !honeypotValue || honeypotValue === ''
}

// ── 2. RATE LIMITING ────────────────────────────────────────────────────────
// Max 2 comments per IP per 10 minutes, stored in MongoDB with TTL index
const MAX_COMMENTS = parseInt(process.env.COMMENT_RATE_LIMIT_MAX || '2')
const WINDOW_MS = parseInt(process.env.COMMENT_RATE_LIMIT_WINDOW_MS || '600000')

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; retryAfter?: number }> {
  const col = await getRateLimitCollection()
  const now = Date.now()
  const windowStart = now - WINDOW_MS

  // Ensure TTL index exists (idempotent)
  await col.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })

  const count = await col.countDocuments({
    ip,
    createdAt: { $gte: new Date(windowStart) },
  })

  if (count >= MAX_COMMENTS) {
    const oldest = await col.findOne({ ip }, { sort: { createdAt: 1 } })
    const retryAfter = oldest
      ? Math.ceil((oldest.createdAt.getTime() + WINDOW_MS - now) / 1000)
      : 600
    return { allowed: false, retryAfter }
  }

  // Record this attempt
  await col.insertOne({
    ip,
    createdAt: new Date(),
    expiresAt: new Date(now + WINDOW_MS),
  })

  return { allowed: true }
}

// ── 3. CONTENT FILTER ───────────────────────────────────────────────────────
// Reject obvious spam patterns: excessive links, known spam phrases, all-caps
const SPAM_PATTERNS = [
  /https?:\/\//gi, // More than 2 URLs
  /\b(viagra|casino|poker|loan|forex|crypto investment|click here|buy now)\b/gi,
  /(.)\1{8,}/, // Repeated character spam (aaaaaaaaaa)
]

export function checkContent(text: string): { clean: boolean; reason?: string } {
  const urlCount = (text.match(/https?:\/\//gi) || []).length
  if (urlCount > 2) return { clean: false, reason: 'Too many links' }

  for (const pattern of SPAM_PATTERNS.slice(1)) {
    if (pattern.test(text)) return { clean: false, reason: 'Spam content detected' }
  }

  // All caps check (>70% uppercase, more than 20 chars)
  if (text.length > 20) {
    const upper = (text.match(/[A-Z]/g) || []).length
    const letters = (text.match(/[a-zA-Z]/g) || []).length
    if (letters > 0 && upper / letters > 0.7) {
      return { clean: false, reason: 'Please avoid all-caps messages' }
    }
  }

  return { clean: true }
}

// ── 4. COMBINED CHECK ───────────────────────────────────────────────────────
export type SpamCheckResult = {
  passed: boolean
  reason?: string
  retryAfter?: number
  // Auto-approve if commenter has been approved before
  autoApprove?: boolean
}

export async function runSpamChecks(params: {
  honeypot: string | undefined
  ip: string
  content: string
  email: string
  previouslyApproved: boolean
}): Promise<SpamCheckResult> {
  if (!checkHoneypot(params.honeypot)) {
    return { passed: false, reason: 'Bot detected' }
  }

  const contentCheck = checkContent(params.content)
  if (!contentCheck.clean) {
    return { passed: false, reason: contentCheck.reason }
  }

  const rateCheck = await checkRateLimit(params.ip)
  if (!rateCheck.allowed) {
    return { passed: false, reason: 'Too many comments, please wait', retryAfter: rateCheck.retryAfter }
  }

  return {
    passed: true,
    autoApprove: params.previouslyApproved,
  }
}
