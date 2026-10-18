// src/lib/labClient.ts
// Browser-side state shared by the builder, the paper page and the result page.
//
// The lab used to be one component holding a `stage` variable, so a paper
// existed only in memory. Now each stage is a URL, and what the next page needs
// travels through localStorage: the paper as generated, the recipe it was built
// from (so "Try again" can rebuild it), and the scored result.

import type { PaperFormat, PaperQuestion } from '@/lib/learning'

export const NAME_KEY = 'll:name'
export const HISTORY_KEY = 'll:history'
export const DEVICE_KEY = 'll:device'
/** The paper currently being sat, so the builder can offer to pick it up again. */
export const ACTIVE_KEY = 'll:active-paper'
const PASS_KEY = 'll:pass'
const PAPERS_KEY = 'll:papers'
const PAPER_PREFIX = 'll:paper:'
const RESULT_PREFIX = 'll:result:'
const HISTORY_MAX = 20
/** Papers (and their results) kept on the device. Older ones are dropped. */
const KEEP_PAPERS = 3

export const HOME_PATH = '/learning/cbse'
export const PRACTICE_PATH = '/learning/cbse/practice'
export const PROGRESS_PATH = '/learning/cbse/progress'
export const FEEDBACK_PATH = '/learning/cbse/feedback'
/** Where "build a new paper" leads. */
export const BUILDER_PATH = PRACTICE_PATH
export const paperPath = (id: string) => `/learning/cbse/paper/${id}`
export const resultPath = (id: string) => `/learning/cbse/paper/${id}/result`

/** A link into the builder with a selection already made. */
export function practiceHref(sel: { grade?: number; subject?: string; topics?: string[]; format?: string }): string {
  const q = new URLSearchParams()
  if (sel.grade) q.set('grade', String(sel.grade))
  if (sel.subject) q.set('subject', sel.subject)
  if (sel.topics?.length) q.set('topics', sel.topics.join(','))
  if (sel.format && sel.format !== 'mcq') q.set('format', sel.format)
  const qs = q.toString()
  return qs ? `${PRACTICE_PATH}?${qs}` : PRACTICE_PATH
}

/** What a paper was built from — enough to build another like it. */
export interface Recipe {
  grade: number
  subject: string
  subjectLabel: string
  topics: string[]
  topicLabels: string[]
  count: number
  preset: string
  format: PaperFormat
}

export interface CachedPaper {
  paperId: string
  format: PaperFormat
  marksTotal: number
  questions: PaperQuestion[]
  recipe: Recipe
  learnerName: string
  startedAt: number
}

export interface CachedResult {
  data: any
  recipe: Recipe
  format: PaperFormat
}

export interface HistoryEntry {
  /** Lets the progress page link back to the result, while it is still kept. */
  paperId?: string
  at: string
  subjectLabel: string
  topicLabels: string[]
  score: number
  total: number
  pct: number
}

function read<T>(key: string, store: Storage = localStorage): T | null {
  try {
    const raw = store.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown, store: Storage = localStorage) {
  try { store.setItem(key, JSON.stringify(value)) } catch { /* storage full or off */ }
}

/**
 * A random, opaque id for this browser, created once and kept locally. It is
 * not a fingerprint: nothing is derived from the device or the person. It only
 * lets a run of papers from the same browser be recognised, so a sudden collapse
 * in score can prompt a friendly "is this still you?".
 */
export function getDeviceId(): string | null {
  try {
    let id = localStorage.getItem(DEVICE_KEY)
    if (!id) {
      id = (crypto.randomUUID?.() ?? String(Math.random()).slice(2) + Date.now().toString(36))
      localStorage.setItem(DEVICE_KEY, id)
    }
    return id
  } catch {
    return null // private mode — the check simply does not apply
  }
}

export function getName(): string {
  try { return localStorage.getItem(NAME_KEY) || '' } catch { return '' }
}
export function setName(name: string) {
  try { localStorage.setItem(NAME_KEY, name) } catch {}
}

/** The "I am a person" pass. Session-long: it is not worth keeping past the tab. */
export function getPass(): string {
  try { return sessionStorage.getItem(PASS_KEY) || '' } catch { return '' }
}
export function setPass(pass: string) {
  try { sessionStorage.setItem(PASS_KEY, pass) } catch {}
}

export function loadHistory(): HistoryEntry[] {
  return read<HistoryEntry[]>(HISTORY_KEY) ?? []
}
export function pushHistory(entry: HistoryEntry): HistoryEntry[] {
  const next = [entry, ...loadHistory()].slice(0, HISTORY_MAX)
  write(HISTORY_KEY, next)
  return next
}

export function getActivePaper(): string | null {
  try { return localStorage.getItem(ACTIVE_KEY) } catch { return null }
}
export function clearActivePaper() {
  try { localStorage.removeItem(ACTIVE_KEY) } catch {}
}

export function loadPaper(id: string): CachedPaper | null {
  return read<CachedPaper>(PAPER_PREFIX + id)
}
export function loadResult(id: string): CachedResult | null {
  return read<CachedResult>(RESULT_PREFIX + id)
}

/** Remember a paper by id, dropping the oldest beyond KEEP_PAPERS. */
export function savePaper(paper: CachedPaper) {
  write(PAPER_PREFIX + paper.paperId, paper)
  try { localStorage.setItem(ACTIVE_KEY, paper.paperId) } catch {}
  touchPaper(paper.paperId)
}

export function saveResult(id: string, result: CachedResult) {
  write(RESULT_PREFIX + id, result)
  touchPaper(id)
}

function touchPaper(id: string) {
  const ids = (read<string[]>(PAPERS_KEY) ?? []).filter((x) => x !== id)
  ids.unshift(id)
  for (const old of ids.slice(KEEP_PAPERS)) {
    try {
      localStorage.removeItem(PAPER_PREFIX + old)
      localStorage.removeItem(RESULT_PREFIX + old)
    } catch {}
  }
  write(PAPERS_KEY, ids.slice(0, KEEP_PAPERS))
}

/**
 * Ask the server for a paper. Resolves to the raw JSON plus an `ok` flag, so the
 * caller decides how to word a failure (the builder and "Try again" differ).
 */
export async function requestPaper(
  recipe: Recipe,
  learnerName: string,
  human: { pass?: string; captchaToken?: string; captchaAnswer?: string },
): Promise<{ ok: boolean; data: any }> {
  const res = await fetch('/api/learning/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grade: recipe.grade,
      subject: recipe.subject,
      topics: recipe.topics,
      count: recipe.count,
      preset: recipe.preset,
      format: recipe.format,
      learnerName,
      deviceId: getDeviceId(),
      ...human,
    }),
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, data }
}

/** File a freshly generated paper on the device and mark it as the active one. */
export function storeGeneratedPaper(data: any, recipe: Recipe, learnerName: string) {
  if (data.pass) setPass(data.pass)
  setName(learnerName)
  savePaper({
    paperId: data.paperId,
    format: recipe.format,
    marksTotal: data.marksTotal ?? 0,
    questions: data.questions,
    recipe,
    learnerName,
    startedAt: Date.now(),
  })
}

// ── Per-topic progress ──
// What the progress map and the home suggestion are made from. Kept per topic,
// not per paper, so "which topic needs work" is a lookup. Only multiple-choice
// papers feed it: marks on a spoken paper and pairs on a matching one are not
// the same quantity as questions right, and averaging them would mean nothing.

const TOPICS_KEY = 'll:topic-stats'
const LAST_RECIPE_KEY = 'll:last-recipe'
/** Papers per topic that "how am I doing" looks back over. */
const RECENT_PAPERS = 3

export interface TopicStat {
  grade: number
  subject: string
  subjectLabel: string
  slug: string
  label: string
  papers: number
  lastAt: string
  /** Newest first: correct and total from the last few papers on this topic. */
  recent: { c: number; t: number }[]
}

export type Level = 'solid' | 'growing' | 'shaky'

export function loadTopicStats(): TopicStat[] {
  return read<TopicStat[]>(TOPICS_KEY) ?? []
}

/** Recent accuracy, 0–100. */
export function topicPct(s: TopicStat): number {
  const c = s.recent.reduce((n, r) => n + r.c, 0)
  const t = s.recent.reduce((n, r) => n + r.t, 0)
  return t ? Math.round((c / t) * 100) : 0
}

export function levelOf(pct: number): Level {
  return pct >= 80 ? 'solid' : pct >= 50 ? 'growing' : 'shaky'
}

export function recordTopicStats(recipe: Recipe, byTopic: Record<string, { label: string; correct: number; total: number }>) {
  const all = loadTopicStats()
  const now = new Date().toISOString()
  for (const [slug, t] of Object.entries(byTopic ?? {})) {
    if (!t || typeof t.total !== 'number' || t.total <= 0) continue
    const hit = all.find((x) => x.subject === recipe.subject && x.slug === slug && x.grade === recipe.grade)
    const entry = { c: t.correct, t: t.total }
    if (hit) {
      hit.label = t.label || hit.label
      hit.papers += 1
      hit.lastAt = now
      hit.recent = [entry, ...hit.recent].slice(0, RECENT_PAPERS)
    } else {
      all.push({
        grade: recipe.grade, subject: recipe.subject, subjectLabel: recipe.subjectLabel,
        slug, label: t.label, papers: 1, lastAt: now, recent: [entry],
      })
    }
  }
  write(TOPICS_KEY, all)
}

export function saveLastRecipe(recipe: Recipe) { write(LAST_RECIPE_KEY, recipe) }
export function loadLastRecipe(): Recipe | null { return read<Recipe>(LAST_RECIPE_KEY) }
