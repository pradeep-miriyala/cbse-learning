// src/lib/speaking.ts
// Marking a spoken answer against a mark scheme.
//
// The rule this whole module is built around: a recognition error must never
// cost a child a mark. Speech recognition on an eleven-year-old's Indian-English
// will mishear words, split them ("carbohydrate" → "carbo hydrate"), join them,
// and drop plurals. None of that is the child's fault, so matching is
// deliberately generous — it looks for the idea, not the string.
//
// It is also deliberately dumb. Every decision is inspectable: this key point
// was found because these words were present. That matters more than accuracy
// at the margin, because a child who is told they missed a point can be shown
// exactly what was looked for, and can dispute it.

/** One thing the examiner is looking for. */
export interface KeyPoint {
  id: string
  /** Shown to the child after marking — the point in plain words. */
  label: string
  /**
   * Ways of saying it. Outer array is OR: any one group scores the point.
   * Inner array is AND: every term in a group must be present.
   *
   * A term with a space in it is matched against the transcript with spaces
   * removed, so a word the recogniser split in two still counts.
   */
  accept: string[][]
}

export interface SpokenQuestion {
  id: string
  topic: string
  topicLabel: string
  marks: number
  /** Roughly how long this should take, in seconds — pace is a real exam skill. */
  budgetSec: number
  question: string
  /** Read out after marking, so the child sees a full-credit answer. */
  modelAnswer: string
  keyPoints: KeyPoint[]
}

export interface PointResult {
  point: KeyPoint
  found: boolean
  /** The words that scored it, for showing the child why. */
  matched: string[]
}

export interface MarkResult {
  results: PointResult[]
  score: number
  outOf: number
}

/** Lowercase, strip anything that isn't a letter or digit, collapse spaces. */
export function normalise(s: string): string {
  return String(s ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9ఀ-౿]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Conservative suffix stripping. Not a real stemmer — it only removes endings
 * that never change the idea, so "vitamins" and "vitamin" are one word while
 * "eating" and "eat" are too. Anything shorter than four letters is left alone,
 * because that is where over-stemming starts collapsing unrelated words.
 */
export function stem(w: string): string {
  if (w.length < 4) return w
  for (const suf of ['ies', 'ing', 'es', 'ed', 's']) {
    if (w.endsWith(suf) && w.length - suf.length >= 3) {
      const base = w.slice(0, -suf.length)
      return suf === 'ies' ? base + 'y' : base
    }
  }
  return w
}

/** Edit distance, capped — used only to absorb a one-character mishearing. */
function within1(a: string, b: string): boolean {
  if (a === b) return true
  if (Math.abs(a.length - b.length) > 1) return false
  let i = 0, j = 0, edits = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue }
    if (++edits > 1) return false
    if (a.length > b.length) i++
    else if (a.length < b.length) j++
    else { i++; j++ }
  }
  return edits + (a.length - i) + (b.length - j) <= 1
}

interface Prepared {
  tokens: string[]
  stems: string[]
  /** The transcript with spaces removed, for words recognition split or joined. */
  despaced: string
  /** Where each token begins inside `despaced`, so a match can be required to
   *  start at a word — otherwise "iron" would be found inside "environment". */
  starts: number[]
}

function prepare(transcript: string): Prepared {
  const n = normalise(transcript)
  const tokens = n ? n.split(' ') : []
  const starts: number[] = []
  let at = 0
  for (const t of tokens) { starts.push(at); at += t.length }
  return { tokens, stems: tokens.map(stem), despaced: n.replace(/ /g, ''), starts }
}

/** Does the term appear in the despaced text, starting where some word starts? */
function atWordStart(term: string, p: Prepared): boolean {
  return p.starts.some((i) => p.despaced.startsWith(term, i))
}

/**
 * Is this term present? Four chances, in order of confidence:
 *   1. the stem appears as a whole word
 *   2. it appears inside the transcript with spaces removed — catches a word
 *      the recogniser split, and a word it joined to its neighbour
 *   3. a word is one character away from it (only for words long enough that a
 *      single edit cannot reach a genuinely different word)
 */
function termPresent(term: string, p: Prepared): string | null {
  const t = normalise(term)
  if (!t) return null

  if (t.includes(' ')) {
    return atWordStart(t.replace(/ /g, ''), p) ? term : null
  }

  const s = stem(t)
  const idx = p.stems.indexOf(s)
  if (idx !== -1) return p.tokens[idx]

  // Substring match, tried on the raw term as well as the stem.
  //
  // Mark schemes use short prefixes on purpose — "obes" is meant to catch obese
  // and obesity alike. Stemming first would turn that into "obe", which matches
  // nothing, so such a term sat in the scheme looking perfectly reasonable and
  // silently never scored. The raw form is tried first for exactly that case.
  // Four characters is the floor: shorter prefixes start matching inside
  // unrelated words.
  if (t.length >= 4 && atWordStart(t, p)) return term
  if (s.length >= 4 && atWordStart(s, p)) return term

  if (s.length >= 6) {
    const near = p.stems.findIndex((w) => within1(w, s))
    if (near !== -1) return p.tokens[near]
  }
  return null
}

/** Mark one answer. Pure — same transcript in, same marks out, every time. */
export function markAnswer(q: SpokenQuestion, transcript: string): MarkResult {
  const p = prepare(transcript)

  const results: PointResult[] = q.keyPoints.map((point) => {
    for (const group of point.accept) {
      const hits: string[] = []
      let all = true
      for (const term of group) {
        const hit = termPresent(term, p)
        if (!hit) { all = false; break }
        hits.push(hit)
      }
      if (all) return { point, found: true, matched: hits }
    }
    return { point, found: false, matched: [] }
  })

  return {
    results,
    score: results.filter((r) => r.found).length,
    outOf: q.keyPoints.length,
  }
}


// ─────────────────────────────────────────────────────────────────────────
// Assembling a transcript from a speech recogniser
// ─────────────────────────────────────────────────────────────────────────

/** The shape we need out of a SpeechRecognitionResultList. */
export interface RecognisedResult {
  isFinal: boolean
  0: { transcript: string }
}

/**
 * Fold one final chunk into the text gathered so far.
 *
 * Chunks cannot simply be concatenated. A speech engine emits finals in at
 * least four shapes, and only the first is a plain append:
 *
 *   append    "a balanced diet" then "has all the nutrients"
 *   redeliver "a balanced diet" then "a balanced diet"          (Android)
 *   revise    "a balanced" then "a balanced diet has all"       (Android)
 *   overlap   "a balanced diet has" then "diet has all"
 *
 * Joining on the longest word-overlap between the tail of what we have and the
 * head of the new chunk collapses all four to the same answer. Whole words
 * only, so nothing is ever glued mid-word.
 *
 * A child who genuinely repeats a phrase across a chunk boundary loses the
 * repeat. That is the right trade: marking looks for ideas, so a dropped
 * duplicate cannot cost a mark, whereas a spurious one is what made the answer
 * unreadable on a real phone.
 */
export function mergeChunk(soFar: string, chunk: string): string {
  const a = soFar.trim(), b = chunk.trim()
  if (!a) return b
  if (!b) return a

  const aw = a.split(/\s+/), bw = b.split(/\s+/)
  const max = Math.min(aw.length, bw.length)
  const key = (w: string) => w.toLowerCase().replace(/[^a-z0-9\u0C00-\u0C7F]/g, '')

  for (let n = max; n > 0; n--) {
    const tail = aw.slice(-n).map(key).join(' ')
    const head = bw.slice(0, n).map(key).join(' ')
    if (tail === head) return aw.concat(bw.slice(n)).join(' ')
  }
  return aw.concat(bw).join(' ')
}

/**
 * Read a recogniser's results into settled text and still-changing text.
 *
 * Reads the WHOLE list every time rather than starting at `resultIndex`,
 * because Chrome on Android re-delivers results it has already marked final
 * without advancing resultIndex. Reading the whole list is idempotent; folding
 * each chunk with mergeChunk then absorbs redelivery and revision alike.
 */
export function readResults(results: ArrayLike<RecognisedResult>): {
  final: string
  interim: string
} {
  let final = '', interim = ''
  for (let i = 0; i < results.length; i++) {
    const text = results[i][0].transcript
    if (results[i].isFinal) final = mergeChunk(final, text)
    else interim += text
  }
  return { final, interim }
}

/** Join text from an earlier recognition session to the current one. */
export function joinTranscript(base: string, tail: string): string {
  return mergeChunk(base, tail)
}


// ─────────────────────────────────────────────────────────────────────────
// Authoring
// ─────────────────────────────────────────────────────────────────────────

/** A spoken question as authored, before it goes into the bank. */
export interface AuthoredSpoken {
  topic: string
  topicLabel: string
  chapter: string
  question: string
  modelAnswer: string
  keyPoints: KeyPoint[]
  difficulty?: 'easy' | 'medium' | 'hard'
  /**
   * Held back from live papers. Used where a question quotes a source whose
   * exact wording has not been checked yet — a misquotation in a paper is worse
   * than a missing question.
   */
  status?: 'published' | 'draft'
}

/** Seconds a child should need. Board pace is roughly a mark every 100 seconds. */
export const budgetFor = (marks: number) => marks * 30

/**
 * Check one authored question against the two properties that catch a broken
 * mark scheme without anyone reading it.
 *
 * A mark scheme fails silently. If its accept lists drift away from the words
 * children actually use, nothing errors — the questions simply start marking
 * good answers wrong, and that looks like the children getting worse. These two
 * checks are cheap and they catch most of it:
 *
 *   1. The model answer must score full marks. It is the answer we tell the
 *      child was worth 3/3, so if our own matcher cannot find the points in it,
 *      the scheme is wrong — not the child.
 *
 *   2. The question read back must score nothing. Key points built from words
 *      the question already contains hand out marks for parroting, which is the
 *      easiest way to write a scheme that looks generous and teaches nothing.
 */
export function auditSpoken(q: AuthoredSpoken): string[] {
  const problems: string[] = []
  const as: SpokenQuestion = {
    id: q.topic, topic: q.topic, topicLabel: q.topicLabel,
    marks: q.keyPoints.length, budgetSec: budgetFor(q.keyPoints.length),
    question: q.question, modelAnswer: q.modelAnswer, keyPoints: q.keyPoints,
  }

  const model = markAnswer(as, q.modelAnswer)
  if (model.score < model.outOf) {
    const missed = model.results.filter((r) => !r.found).map((r) => r.point.id)
    problems.push(`model answer scores only ${model.score}/${model.outOf} — misses: ${missed.join(', ')}`)
  }

  const parrot = markAnswer(as, q.question)
  if (parrot.score > 0) {
    const got = parrot.results.filter((r) => r.found).map((r) => r.point.id)
    problems.push(`reading the question back scores ${parrot.score}/${parrot.outOf} — leaks: ${got.join(', ')}`)
  }

  if (q.keyPoints.length < 2) problems.push('needs at least 2 key points')
  const ids = q.keyPoints.map((k) => k.id)
  if (new Set(ids).size !== ids.length) problems.push('duplicate key point ids')
  for (const k of q.keyPoints) {
    if (!k.accept.length) problems.push(`key point "${k.id}" accepts nothing`)
    if (k.accept.some((g) => g.length === 0)) problems.push(`key point "${k.id}" has an empty accept group`)
  }
  return problems
}
