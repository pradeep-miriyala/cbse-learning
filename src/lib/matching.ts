// src/lib/matching.ts
// Match-the-columns questions: read a passage, then pair each item on the left
// with the one it belongs to on the right.
//
// Marked per pair rather than all-or-nothing. A child who gets five of six
// right has not failed, and telling them so is the difference between a
// question that teaches and one that only judges.
//
// The right-hand column is shuffled per attempt and the pairing never reaches
// the browser, for the same reason an MCQ answer key does not: it IS the key.

export interface MatchPair {
  /** The item shown in the left column — usually the adjective. */
  left: string
  /** The item it belongs with — usually the noun. */
  right: string
}

export interface MatchQuestion {
  id: string
  topic: string
  topicLabel: string
  question: string
  /** The text to read before matching. Optional, but usually the point. */
  passage?: string | null
  passageTitle?: string | null
  pairs: MatchPair[]
  /**
   * Extra items for the right-hand column that belong to no left item. They
   * stop the last pair being free by elimination, which is the flaw in every
   * matching exercise with equal columns.
   */
  decoys?: string[]
  marks: number
  budgetSec: number
}

export interface MatchResultRow {
  left: string
  chose: string | null
  correct: string
  isCorrect: boolean
}

export interface MatchResult {
  rows: MatchResultRow[]
  score: number
  outOf: number
}

/** Seconds a child should need: reading the passage, then a pair at a time. */
export const matchBudgetFor = (pairCount: number) => 40 + pairCount * 15

const norm = (s: unknown) =>
  String(s ?? '').replace(/\s+/g, ' ').trim().toLowerCase()

/**
 * Mark one matching question.
 *
 * `chosen` maps the left item to whatever the child put against it. Compared on
 * the TEXT rather than an index, so a shuffled right-hand column cannot make a
 * right answer look wrong — the same reasoning that made the MCQ attempt store
 * its choice in the question's own option order.
 */
export function markMatch(
  q: Pick<MatchQuestion, 'pairs'>,
  chosen: Record<string, string>,
): MatchResult {
  const rows: MatchResultRow[] = q.pairs.map((p) => {
    const chose = chosen[p.left]
    const has = typeof chose === 'string' && chose.trim() !== ''
    return {
      left: p.left,
      chose: has ? chose : null,
      correct: p.right,
      isCorrect: has && norm(chose) === norm(p.right),
    }
  })
  return {
    rows,
    score: rows.filter((r) => r.isCorrect).length,
    outOf: q.pairs.length,
  }
}

/**
 * Check an authored matching question, the way auditSpoken checks a mark scheme.
 *
 * The failure that matters here is a right-hand item appearing twice: a child
 * who picks the other one is marked wrong for an answer that reads as correct,
 * and nothing in the data would show it.
 */
export function auditMatch(q: {
  question: string
  pairs: MatchPair[]
  decoys?: string[]
}): string[] {
  const problems: string[] = []

  if (q.pairs.length < 3) problems.push('needs at least 3 pairs to be worth doing')

  const lefts = q.pairs.map((p) => norm(p.left))
  if (new Set(lefts).size !== lefts.length) problems.push('the same left item appears twice')

  const rights = q.pairs.map((p) => norm(p.right))
  if (new Set(rights).size !== rights.length) {
    problems.push('two pairs share the same right item, so one of them cannot be marked fairly')
  }

  for (const d of q.decoys ?? []) {
    if (rights.includes(norm(d))) problems.push(`decoy "${d}" is also a correct answer`)
  }
  const decoySet = (q.decoys ?? []).map(norm)
  if (new Set(decoySet).size !== decoySet.length) problems.push('a decoy is repeated')

  for (const p of q.pairs) {
    if (!p.left.trim()) problems.push('a pair has an empty left item')
    if (!p.right.trim()) problems.push('a pair has an empty right item')
  }

  return problems
}
