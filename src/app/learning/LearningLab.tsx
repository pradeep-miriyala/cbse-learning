'use client'
// src/app/learning/LearningLab.tsx
// Setup → paper → result. There are no per-subject pages: a "paper" is a
// selection of up to MAX_TOPICS topics within one subject, generated on demand.

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import QuizRunner from './QuizRunner'
import SpokenRunner, { type SpokenPaperQuestion } from './SpokenRunner'
import SpokenResult, { type SpokenResultData } from './SpokenResult'
import PaceNote, { type Pace } from './PaceNote'
import MatchRunner, { type MatchPaperQuestion } from './MatchRunner'
import MatchResult, { type MatchResultData } from './MatchResult'
import ResultPanel, { type SubmitResult } from './ResultPanel'
import {
  MAX_TOPICS,
  MIN_PER_TOPIC,
  MAX_PAPER_LENGTH,
  PAPER_LENGTHS,
  SPOKEN_PAPER_LENGTHS,
  DEFAULT_SPOKEN_LENGTH,
  SPOKEN_MIN_PER_TOPIC,
  MATCH_PAPER_LENGTHS,
  DEFAULT_MATCH_LENGTH,
  MATCH_MIN_PER_TOPIC,
  minPerTopicFor,
  minLengthForFormat,
  maxTopicsFor,
  type PaperFormat,
  DEFAULT_PAPER_LENGTH,
  minLengthFor,
  SUBJECT_ACCENT,
  DIFFICULTY_PRESETS,
  DEFAULT_PRESET,
  presetById,
  type GradeSummary,
  type PaperQuestion,
} from '@/lib/learning'

type Stage = 'setup' | 'quiz' | 'result'

const NAME_KEY = 'll:name'
const HISTORY_KEY = 'll:history'
const DEVICE_KEY = 'll:device'
/** The paper currently being sat, so a refresh can pick it up again. */
const ACTIVE_KEY = 'll:active-paper'
const HISTORY_MAX = 8

interface HistoryEntry {
  at: string
  subjectLabel: string
  topicLabels: string[]
  score: number
  total: number
  pct: number
}

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * A random, opaque id for this browser, created once and kept locally. It is
 * not a fingerprint: nothing is derived from the device or the person. It only
 * lets a run of papers from the same browser be recognised, so a sudden collapse
 * in score can prompt a friendly "is this still you?".
 */
function getDeviceId(): string | null {
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

export default function LearningLab() {
  const [taxonomy, setTaxonomy] = useState<GradeSummary[]>([])
  const [loadingTax, setLoadingTax] = useState(true)
  const [taxError, setTaxError] = useState('')

  const [grade, setGrade] = useState<number | null>(null)
  const [subject, setSubject] = useState<string>('')
  const [topics, setTopics] = useState<string[]>([])
  const [count, setCount] = useState<number>(DEFAULT_PAPER_LENGTH)
  const [format, setFormat] = useState<PaperFormat>('mcq')
  const [preset, setPreset] = useState<string>(DEFAULT_PRESET)
  const [name, setName] = useState('')

  const [stage, setStage] = useState<Stage>('setup')
  const [questions, setQuestions] = useState<PaperQuestion[]>([])
  const [paperId, setPaperId] = useState('')
  const [marksTotal, setMarksTotal] = useState(0)
  const [result, setResult] = useState<SubmitResult | null>(null)

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [pace, setPace] = useState<Pace | null>(null)
  const [startedAt, setStartedAt] = useState(0)

  // Human check. The pass now covers only the "try a fresh paper, same topics"
  // button — a genuinely new paper asks again. It previously covered every
  // paper for two hours, so starting one subject and then another skipped the
  // check entirely, which is what made a Telugu paper look like it had no
  // captcha at all. Retrying the same topics is the one case where re-asking is
  // pure friction, so that is the only case the pass is spent on.
  // An unfinished paper found on load, offered back to the learner rather than
  // resumed silently — they may well have meant to abandon it.
  const [resumable, setResumable] = useState<{
    paperId: string
    questions: PaperQuestion[]
    answers: Record<string, number>
    atIndex: number
    startedAt: string | null
    learnerName: string
  } | null>(null)
  const [restored, setRestored] = useState<{ answers: Record<string, number>; index: number } | null>(null)

  const [captcha, setCaptcha] = useState<{ token: string; display: string } | null>(null)
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [pass, setPass] = useState('')

  // ── Load taxonomy + remembered name ──
  useEffect(() => {
    fetch('/api/learning/taxonomy')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error)
        const grades: GradeSummary[] = d.grades || []
        setTaxonomy(grades)
        if (grades.length === 1) setGrade(grades[0].grade)
      })
      .catch(() => setTaxError('Could not load the question bank. Please refresh.'))
      .finally(() => setLoadingTax(false))

    loadCaptcha()

    try {
      setName(localStorage.getItem(NAME_KEY) || '')
      setHistory(loadHistory())
    } catch { /* storage unavailable — history is a nicety, not a requirement */ }

    // Was a paper left open? The id is kept locally; the server decides whether
    // it is still live and whether this device is the one that started it.
    try {
      const active = localStorage.getItem(ACTIVE_KEY)
      if (active) {
        fetch('/api/learning/resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paperId: active, deviceId: getDeviceId() }),
        })
          .then((r) => r.json())
          .then((d) => {
            if (d.resumable) setResumable(d)
            else localStorage.removeItem(ACTIVE_KEY)
          })
          .catch(() => {})
      }
    } catch {}
  }, [])

  /** Pick the unfinished paper back up exactly where it was left. */
  function resumePaper() {
    if (!resumable) return
    setQuestions(resumable.questions)
    setPaperId(resumable.paperId)
    setRestored({ answers: resumable.answers || {}, index: resumable.atIndex || 0 })
    // Timed from when the paper was first built, so the recorded duration
    // covers the whole sitting rather than only the part after the refresh.
    setStartedAt(resumable.startedAt ? new Date(resumable.startedAt).getTime() : Date.now())
    if (resumable.learnerName) setName(resumable.learnerName)
    setResumable(null)
    setResult(null)
    setStage('quiz')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /** Let it go, and stop offering it. */
  function discardResumable() {
    try { localStorage.removeItem(ACTIVE_KEY) } catch {}
    setResumable(null)
  }

  const checkPace = useCallback(() => {
    const id = getDeviceId()
    if (!id) return
    fetch(`/api/learning/pace?deviceId=${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((d) => setPace(d))
      .catch(() => {})
  }, [])

  useEffect(() => { checkPace() }, [checkPace])

  function loadCaptcha() {
    setCaptchaAnswer('')
    fetch('/api/learning/captcha')
      .then((r) => r.json())
      .then((d) => setCaptcha(d.token ? d : null))
      .catch(() => setCaptcha(null))
  }

  const currentGrade = useMemo(
    () => taxonomy.find((g) => g.grade === grade) || null,
    [taxonomy, grade],
  )
  const currentSubject = useMemo(
    () => currentGrade?.subjects.find((s) => s.subject === subject) || null,
    [currentGrade, subject],
  )

  /**
   * Topics grouped under their chapter.
   *
   * Social Science reached 37 topics and Science 32, listed flat. Every one of
   * those is a fair choice, which is exactly the problem — a child opening the
   * subject met a wall of names with no shape to it. The bank has always
   * carried a chapter on every question; it was simply never used to group.
   *
   * A topic that spans two chapters — Figures of Speech appears in both grammar
   * papers, so its chapter reads "Grammar Foundations · Adjectives" — is filed
   * under the first, rather than being allowed to invent a chapter of its own.
   */
  /**
   * Only topics that can actually fill the chosen kind of paper.
   *
   * A topic holding thirty multiple-choice questions and two spoken ones can
   * fill one and not the other, and offering it for the wrong one produces a
   * paper that silently comes up short.
   */
  const availableTopics = useMemo(() => {
    const all = currentSubject?.topics ?? []
    if (format === 'spoken') return all.filter((t) => (t.spoken ?? 0) >= SPOKEN_MIN_PER_TOPIC)
    if (format === 'match') return all.filter((t) => (t.match ?? 0) >= MATCH_MIN_PER_TOPIC)
    return all.filter((t) => t.count > 0)
  }, [currentSubject, format])

  /** How many of this subject's questions a topic holds, in the chosen format. */
  const stockOf = useCallback(
    (t: { count: number; spoken?: number; match?: number }) =>
      format === 'spoken' ? (t.spoken ?? 0) : format === 'match' ? (t.match ?? 0) : t.count,
    [format],
  )

  /** Which formats this subject offers at all. */
  const hasSpoken = useMemo(
    () => (currentSubject?.topics ?? []).some((t) => (t.spoken ?? 0) >= SPOKEN_MIN_PER_TOPIC),
    [currentSubject],
  )
  const hasMatch = useMemo(
    () => (currentSubject?.topics ?? []).some((t) => (t.match ?? 0) >= MATCH_MIN_PER_TOPIC),
    [currentSubject],
  )

  /**
   * What each kind of paper actually holds in this subject.
   *
   * Without it the choice is three unlabelled doors. The person who asked for
   * the matching feature could not find it afterwards, which is as clear a
   * signal as a usability test ever gives.
   */
  const stockByFormat = useMemo(() => {
    const all = currentSubject?.topics ?? []
    const count = (pick: (t: typeof all[number]) => number, floor: number) => {
      const usable = all.filter((t) => pick(t) >= floor)
      return { topics: usable.length, questions: usable.reduce((n, t) => n + pick(t), 0) }
    }
    return {
      mcq: count((t) => t.count ?? 0, 1),
      spoken: count((t) => t.spoken ?? 0, SPOKEN_MIN_PER_TOPIC),
      match: count((t) => t.match ?? 0, MATCH_MIN_PER_TOPIC),
    }
  }, [currentSubject])

  const chapters = useMemo(() => {
    type Topic = NonNullable<typeof currentSubject>['topics'][number]
    const out: { name: string; topics: Topic[] }[] = []
    for (const t of availableTopics) {
      const name = String(t.chapter || 'Other').split(' · ')[0]
      const hit = out.find((c) => c.name === name)
      if (hit) hit.topics.push(t)
      else out.push({ name, topics: [t] })
    }
    return out
  }, [availableTopics])

  /**
   * Which chapters are open. A subject with only a couple of chapters is no
   * harder to read expanded, so those start open; anything more starts closed
   * and the learner opens what they want.
   */
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({})
  useEffect(() => {
    const openByDefault = chapters.length <= 2
    setOpenChapters(Object.fromEntries(chapters.map((c) => [c.name, openByDefault])))
  }, [subject, chapters.length])

  const maxAvailable = useMemo(() => {
    return availableTopics
      .filter((t) => topics.includes(t.slug))
      .reduce((sum, t) => sum + stockOf(t), 0)
  }, [availableTopics, topics, stockOf])

  /** Shortest paper that still gives every chosen topic its minimum share. */
  const minLength = minLengthForFormat(topics.length, format)

  /** Lengths that fit both the per-topic floor and what the bank actually holds. */
  const usableLengths = useMemo(() => {
    const ladder: readonly number[] =
      format === 'spoken' ? SPOKEN_PAPER_LENGTHS
      : format === 'match' ? MATCH_PAPER_LENGTHS
      : PAPER_LENGTHS
    return ladder.filter((n) => n >= minLength && (maxAvailable === 0 || n <= maxAvailable))
  }, [minLength, maxAvailable, format])

  /**
   * How many questions of each band the chosen topics actually hold. Used to
   * warn honestly when a preset cannot be met — 24 of 58 topics have no hard
   * questions, so "Challenge" is sometimes a wish rather than a promise.
   */
  const bandStock = useMemo(() => {
    const total = { easy: 0, medium: 0, hard: 0 }
    for (const t of currentSubject?.topics ?? []) {
      if (!topics.includes(t.slug) || !t.byDifficulty) continue
      total.easy += t.byDifficulty.easy
      total.medium += t.byDifficulty.medium
      total.hard += t.byDifficulty.hard
    }
    return total
  }, [currentSubject, topics])

  /** Rough check: can the selection supply the preset's share of each band? */
  const presetShortfall = useMemo(() => {
    if (topics.length === 0) return null
    const mix = presetById(preset).mix
    const short: string[] = []
    for (const b of ['easy', 'medium', 'hard'] as const) {
      if (Math.round(count * mix[b]) > bandStock[b]) short.push(b)
    }
    return short.length ? short : null
  }, [preset, count, bandStock, topics.length])

  // Keep the chosen length legal as topics are added or removed.
  useEffect(() => {
    if (topics.length === 0) return
    const cap = format === 'spoken' ? SPOKEN_PAPER_LENGTHS[SPOKEN_PAPER_LENGTHS.length - 1]
      : format === 'match' ? MATCH_PAPER_LENGTHS[MATCH_PAPER_LENGTHS.length - 1]
      : MAX_PAPER_LENGTH
    const ceiling = maxAvailable > 0 ? Math.min(cap, maxAvailable) : cap
    const target = Math.min(Math.max(count, minLength), ceiling)
    if (target !== count) setCount(target)
  }, [minLength, maxAvailable, topics.length, format]) // eslint-disable-line react-hooks/exhaustive-deps

  function pickGrade(g: number) {
    setGrade(g); setSubject(''); setTopics([]); setError('')
  }
  function pickSubject(s: string) {
    setSubject(s); setTopics([]); setError('')
  }
  function pickFormat(f: PaperFormat) {
    if (f === format) return
    // Topics are not interchangeable between the two — a topic offered for one
    // may hold nothing for the other, so the selection starts again.
    setFormat(f); setTopics([]); setError('')
    setCount(f === 'spoken' ? DEFAULT_SPOKEN_LENGTH
             : f === 'match' ? DEFAULT_MATCH_LENGTH : DEFAULT_PAPER_LENGTH)
  }
  function toggleTopic(slug: string) {
    setError('')
    setTopics((prev) => {
      if (prev.includes(slug)) return prev.filter((t) => t !== slug)
      // The cap is a consequence of the per-topic floor, not a rule of its own.
      if (prev.length >= maxTopicsFor(format)) return prev
      return [...prev, slug]
    })
  }

  async function generate(opts?: { retry?: boolean } | unknown) {
    const retrying = !!(opts && typeof opts === 'object' && (opts as any).retry === true)
    return generateInner(retrying)
  }

  async function generateInner(retrying: boolean) {
    const trimmed = name.trim()
    if (!trimmed) { setError('Enter your first name so the result has a name on it.'); return }
    if (topics.length === 0) { setError('Pick at least one topic.'); return }
    if (!retrying && !captchaAnswer.trim()) {
      setError('Answer the sum to show you are a person.'); return
    }

    setBusy(true); setError('')
    try {
      const res = await fetch('/api/learning/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade, subject, topics, count, preset, format, learnerName: trimmed,
          deviceId: getDeviceId(),
          pass: retrying ? pass || undefined : undefined,
          captchaToken: captcha?.token,
          captchaAnswer,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        // A wrong sum gets a fresh one, so the learner is never stuck.
        if (data.captchaFailed) { loadCaptcha(); setPass('') }
        throw new Error(data.error || 'Could not build the paper.')
      }

      if (data.pass) setPass(data.pass)
      // A fresh sum for the next paper, so the same token is never offered twice.
      loadCaptcha()
      try { localStorage.setItem(NAME_KEY, trimmed) } catch {}

      setQuestions(data.questions)
      setPaperId(data.paperId)
      setMarksTotal(data.marksTotal ?? 0)
      setRestored(null)
      try { localStorage.setItem(ACTIVE_KEY, data.paperId) } catch {}
      setStartedAt(Date.now())
      setResult(null)
      setStage('quiz')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function submit(answers: Record<string, number>) {
    return send({ answers })
  }

  /** Spoken papers send what was said instead of option indices. */
  async function submitSpoken(said: Record<string, string>) {
    return send({ said })
  }

  async function send(payload: Record<string, unknown>) {
    setBusy(true); setError('')
    try {
      const res = await fetch('/api/learning/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paperId, ...payload, durationMs: Date.now() - startedAt }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not score the paper.')

      setResult(data)
      setStage('result')
      // The paper just finished counts towards the pace, so ask again.
      checkPace()
      // Submitted, so there is nothing left to pick up.
      try { localStorage.removeItem(ACTIVE_KEY) } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' })

      // Device-local history so a learner sees their own progress over time.
      try {
        const entry: HistoryEntry = {
          at: new Date().toISOString(),
          subjectLabel: currentSubject?.subjectLabel || subject,
          topicLabels: (currentSubject?.topics || [])
            .filter((t) => topics.includes(t.slug))
            .map((t) => t.label),
          score: data.score,
          total: data.total,
          pct: data.pct,
        }
        const next = [entry, ...loadHistory()].slice(0, HISTORY_MAX)
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
        setHistory(next)
      } catch {}
    } catch (err: any) {
      setError(err.message)
      setStage('setup')
    } finally {
      setBusy(false)
    }
  }

  function backToSetup() {
    try { localStorage.removeItem(ACTIVE_KEY) } catch {}
    setStage('setup'); setResult(null); setQuestions([]); setPaperId(''); setRestored(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Quiz ──
  if (stage === 'quiz' && format === 'match') {
    return (
      <div className="ll-wrap">
        <MatchRunner
          questions={questions as unknown as MatchPaperQuestion[]}
          marksTotal={marksTotal}
          learnerName={name.trim()}
          submitting={busy}
          onSubmit={(m) => send({ matched: m })}
          onQuit={backToSetup}
        />
      </div>
    )
  }

  if (stage === 'quiz' && format === 'spoken') {
    return (
      <div className="ll-wrap">
        <SpokenRunner
          questions={questions as unknown as SpokenPaperQuestion[]}
          paperId={paperId}
          marksTotal={marksTotal}
          learnerName={name.trim()}
          submitting={busy}
          onSubmit={submitSpoken}
          onQuit={backToSetup}
        />
      </div>
    )
  }

  if (stage === 'quiz') {
    return (
      <div className="ll-wrap">
        <QuizRunner
          questions={questions}
          paperId={paperId}
          learnerName={name.trim()}
          submitting={busy}
          onSubmit={submit}
          onQuit={backToSetup}
          initialAnswers={restored?.answers}
          initialIndex={restored?.index}
          formatFractions={subject === 'maths'}
        />
      </div>
    )
  }

  // ── Result ──
  if (stage === 'result' && result && format === 'match') {
    return (
      <div className="ll-wrap">
        <PaceNote pace={pace} />
        <MatchResult
          result={result as unknown as MatchResultData}
          subjectLabel={currentSubject?.subjectLabel || subject}
          onRetry={() => generate({ retry: true })}
          onNewPaper={backToSetup}
        />
      </div>
    )
  }

  if (stage === 'result' && result && format === 'spoken') {
    return (
      <div className="ll-wrap">
        <PaceNote pace={pace} />
        <SpokenResult
          result={result as unknown as SpokenResultData}
          subjectLabel={currentSubject?.subjectLabel || subject}
          onRetry={() => generate({ retry: true })}
          onNewPaper={backToSetup}
        />
      </div>
    )
  }

  if (stage === 'result' && result) {
    return (
      <div className="ll-wrap">
        <PaceNote pace={pace} />
        <ResultPanel
          result={result}
          subjectLabel={currentSubject?.subjectLabel || subject}
          onRetry={() => generate({ retry: true })}
          onNewPaper={backToSetup}
          formatFractions={subject === 'maths'}
        />
      </div>
    )
  }

  // ── Setup ──
  return (
    <div className="ll-wrap">
      <PaceNote pace={pace} />
      {/* An unfinished paper, offered back rather than resumed silently. A
          learner who abandoned one on purpose should not be dropped straight
          back into it. */}
      {resumable && (
        <div className="ll-resume">
          <span className="ll-resume-label">Unfinished paper</span>
          <p className="ll-resume-text">
            {resumable.learnerName ? `${resumable.learnerName}, you` : 'You'} have a paper
            still open — {Object.keys(resumable.answers || {}).length} of{' '}
            {resumable.questions.length} questions answered. Your answers were saved.
          </p>
          <div className="ll-resume-actions">
            <button type="button" className="btn-primary" onClick={resumePaper}>
              Continue that paper
            </button>
            <button type="button" className="btn" onClick={discardResumable}>
              Start a new one
            </button>
          </div>
        </div>
      )}
      {loadingTax && <p className="ll-muted">Loading topics…</p>}
      {taxError && <p className="ll-error">{taxError}</p>}

      {!loadingTax && !taxError && taxonomy.length === 0 && (
        <p className="ll-muted">
          The question bank is empty. Run the importer to load it.
        </p>
      )}

      {taxonomy.length > 0 && (
        <>
          {/* Step 1 — grade */}
          <section className="ll-step">
            <div className="ll-step-head">
              <span className="ll-step-num">1</span>
              <span className="ll-step-title">Choose a class</span>
            </div>
            <div className="ll-chips">
              {taxonomy.map((g) => (
                <button key={g.grade} type="button" className="ll-chip"
                  aria-pressed={grade === g.grade} onClick={() => pickGrade(g.grade)}>
                  Class {g.grade}
                </button>
              ))}
            </div>
          </section>

          {/* Step 2 — subject */}
          <section className={'ll-step' + (currentGrade ? '' : ' is-locked')}>
            <div className="ll-step-head">
              <span className="ll-step-num">2</span>
              <span className="ll-step-title">Choose a subject</span>
            </div>
            <div className="ll-subjects">
              {(currentGrade?.subjects || []).map((s) => (
                <button
                  key={s.subject}
                  type="button"
                  className="ll-subject"
                  style={{ '--sub-accent': SUBJECT_ACCENT[s.subject] || 'var(--subj-4)' } as CSSProperties}
                  aria-pressed={subject === s.subject}
                  onClick={() => pickSubject(s.subject)}
                >
                  <span className="ll-subject-name">{s.subjectLabel}</span>
                  <span className="ll-subject-meta">
                    {s.total} questions · {s.topics.length} topics
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Kind of paper. Shown only where the subject offers both, so the
              choice never appears as a dead control. */}
          {currentSubject && (hasSpoken || hasMatch) && (
            <section className="ll-step">
              <div className="ll-step-head">
                <span className="ll-step-num">3</span>
                <span className="ll-step-title">Choose the kind of paper</span>
              </div>
              <div className="ll-formats">
                <button
                  className={'ll-format' + (format === 'mcq' ? ' is-on' : '')}
                  onClick={() => pickFormat('mcq')}
                >
                  <span className="ll-format-title">Multiple choice</span>
                  <span className="ll-format-sub">
                    Pick the right answer from four · {stockByFormat.mcq.questions} questions
                  </span>
                </button>
                {hasSpoken && (
                  <button
                    className={'ll-format' + (format === 'spoken' ? ' is-on' : '')}
                    onClick={() => pickFormat('spoken')}
                  >
                    <span className="ll-format-title">3-mark answers</span>
                    <span className="ll-format-sub">
                      Say or type three sentences · {stockByFormat.spoken.questions} questions
                    </span>
                  </button>
                )}
                {hasMatch && (
                  <button
                    className={'ll-format' + (format === 'match' ? ' is-on' : '')}
                    onClick={() => pickFormat('match')}
                  >
                    <span className="ll-format-title">Match the columns</span>
                    <span className="ll-format-sub">
                      Read a passage, then pair the words · {stockByFormat.match.questions} sets
                    </span>
                  </button>
                )}
              </div>
            </section>
          )}

          {/* Topics */}
          <section className={'ll-step' + (currentSubject ? '' : ' is-locked')}>
            <div className="ll-step-head">
              <span className="ll-step-num">{currentSubject && (hasSpoken || hasMatch) ? 4 : 3}</span>
              <span className="ll-step-title">Choose your topics</span>
              <span className={'ll-counter' + (topics.length >= maxTopicsFor(format) ? ' is-max' : '')}>
                {topics.length === 0
                  ? `Pick as many as you like · ${minPerTopicFor(format)} questions from each`
                  : `${topics.length} chosen · at least ${minLength} questions`}
                {topics.length >= maxTopicsFor(format)
                  ? ` — ${maxTopicsFor(format)} is the limit for this kind of paper`
                  : ''}
              </span>
            </div>
            {/* Topics that exist in this subject but not in this format are
                simply absent, which reads as "it has been deleted" rather than
                "you are looking at the wrong list". Say which. */}
            {(() => {
              const hidden = (['mcq', 'spoken', 'match'] as const)
                .filter((f) => f !== format && stockByFormat[f].topics > 0)
                .map((f) => ({
                  f,
                  label: f === 'mcq' ? 'multiple-choice questions'
                       : f === 'spoken' ? '3-mark questions' : 'matching sets',
                  n: stockByFormat[f].questions,
                }))
              if (!hidden.length) return null
              return (
                <p className="ll-elsewhere">
                  Not seeing a topic you expected? This subject also has{' '}
                  {hidden.map((h, i) => (
                    <span key={h.f}>
                      {i > 0 && (i === hidden.length - 1 ? ' and ' : ', ')}
                      <button className="ll-elsewhere-link" onClick={() => pickFormat(h.f)}>
                        {h.n} {h.label}
                      </button>
                    </span>
                  ))}
                  .
                </p>
              )
            })()}

            <div className="ll-chapters">
              {chapters.map((c) => {
                const open = openChapters[c.name] ?? false
                const chosen = c.topics.filter((t) => topics.includes(t.slug)).length
                // Count what THIS kind of paper can draw on. Advertising the
                // multiple-choice total on a spoken paper promises fifty
                // questions from a topic that holds two.
                const questions = c.topics.reduce((n, t) => n + stockOf(t), 0)
                return (
                  <div key={c.name} className={'ll-chapter' + (open ? ' is-open' : '')}>
                    <button
                      type="button"
                      className="ll-chapter-head"
                      aria-expanded={open}
                      onClick={() =>
                        setOpenChapters((p) => ({ ...p, [c.name]: !open }))
                      }
                    >
                      <span className="ll-chapter-caret" aria-hidden="true">{open ? '▾' : '▸'}</span>
                      <span className="ll-chapter-name">{c.name}</span>
                      <span className="ll-chapter-meta">
                        {/* The count of what is already picked stays visible when a
                            chapter is shut, so a closed section never hides a choice. */}
                        {chosen > 0 && <b className="ll-chapter-chosen">{chosen} picked</b>}
                        {c.topics.length} topic{c.topics.length === 1 ? '' : 's'}
                        {' · '}{questions} question{questions === 1 ? '' : 's'}
                      </span>
                    </button>

                    {open && (
                      <div className="ll-topics">
                        {c.topics.map((t) => {
                          const on = topics.includes(t.slug)
                          return (
                            <button
                              key={t.slug}
                              type="button"
                              className="ll-topic"
                              aria-pressed={on}
                              disabled={!on && topics.length >= MAX_TOPICS}
                              onClick={() => toggleTopic(t.slug)}
                            >
                              <span className="ll-topic-box" aria-hidden="true">{on ? '✓' : ''}</span>
                              <span>
                                <span className="ll-topic-label">{t.label}</span>
                                <span className="ll-topic-count">
                                  {stockOf(t)} questions
                                </span>
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Step 4 — length, name, go */}
          <section className={'ll-step' + (topics.length > 0 ? '' : ' is-locked')}>
            <div className="ll-step-head">
              <span className="ll-step-num">4</span>
              <span className="ll-step-title">Set the paper</span>
              {maxAvailable > 0 && (
                <span className="ll-step-note">{maxAvailable} questions available in this selection</span>
              )}
            </div>

            <div className="ll-chips" style={{ marginBottom: '1.5rem' }}>
              {(format === 'spoken' ? SPOKEN_PAPER_LENGTHS
                : format === 'match' ? MATCH_PAPER_LENGTHS
                : PAPER_LENGTHS).map((n) => {
                const tooShort = n < minLength
                const tooLong = maxAvailable > 0 && n > maxAvailable
                return (
                  <button key={n} type="button" className="ll-chip"
                    aria-pressed={count === n} onClick={() => setCount(n)}
                    disabled={tooShort || tooLong}
                    title={tooShort
                      ? `Too short — ${topics.length} topics need at least ${minLength} questions`
                      : tooLong ? 'More than this selection holds' : undefined}>
                    {n} questions
                    {format === 'spoken' && <span className="ll-chip-sub"> · {n * 3} marks</span>}
                    {format === 'match' && <span className="ll-chip-sub"> · about {n * 4} pairs</span>}
                  </button>
                )
              })}
            </div>

            {/* How hard should it be? Presets rather than sliders — a preset
                cannot be set to an impossible combination.

                Not offered for spoken papers: those are not banded by
                difficulty, because a three-mark question is a three-mark
                question. A control that changed nothing would be a lie. */}
            {format !== 'spoken' && (<>
            <span className="caps" style={{ display: 'block', marginBottom: '0.6rem' }}>
              How hard should it be?
            </span>
            <div className="ll-presets">
              {DIFFICULTY_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="ll-preset"
                  aria-pressed={preset === p.id}
                  onClick={() => setPreset(p.id)}
                >
                  <span className="ll-preset-name">{p.label}</span>
                  <span className="ll-preset-blurb">{p.blurb}</span>
                  <span className="ll-preset-mix">
                    {Math.round(p.mix.easy * 100)} / {Math.round(p.mix.medium * 100)} / {Math.round(p.mix.hard * 100)}
                  </span>
                </button>
              ))}
            </div>
            <p className="ll-step-note" style={{ margin: '0.5rem 0 1.5rem' }}>
              Easy / medium / hard, as percentages.
              {presetShortfall && (
                <>
                  {' '}These topics do not hold enough{' '}
                  <b>{presetShortfall.join(' or ')}</b> questions for that mix, so the paper will
                  lean on the bands that are available.
                </>
              )}
            </p>
            </>)}

            {topics.length > 0 && usableLengths.length === 0 && (
              <p className="ll-step-note" style={{ marginBottom: '1rem' }}>
                These {topics.length} topics hold {maxAvailable} questions in total, which is fewer
                than the {minLength} needed to give each one{' '}
                {minPerTopicFor(format)}. The paper will use
                everything available.
              </p>
            )}

            <div className="ll-launch">
              <div className="ll-field">
                <label htmlFor="ll-name">Your first name</label>
                <input
                  id="ll-name"
                  type="text"
                  value={name}
                  maxLength={24}
                  autoComplete="given-name"
                  placeholder="e.g. Saketh"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* Human check — a sum, not a puzzle picture. Once solved, the
                  session pass covers later papers so it is asked only once. */}
              {captcha && (
                <div className="ll-field ll-field-narrow">
                  <label htmlFor="ll-captcha">What is {captcha.display}?</label>
                  <input
                    id="ll-captcha"
                    type="text"
                    inputMode="numeric"
                    value={captchaAnswer}
                    maxLength={3}
                    autoComplete="off"
                    placeholder="?"
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                  />
                </div>
              )}

              <button type="button" className="btn-primary" onClick={generate} disabled={busy}>
                {busy ? 'Building…' : 'Start the paper'}
              </button>
            </div>

            {maxAvailable > 0 && count > maxAvailable && (
              <p className="ll-step-note" style={{ marginTop: '0.75rem' }}>
                Only {maxAvailable} questions exist for these topics, so the paper will be that long.
              </p>
            )}

            {error && <p className="ll-error">{error}</p>}
          </section>
        </>
      )}

      {history.length > 0 && (
        <section className="ll-history">
          <span className="section-label">Recent papers on this device</span>
          <div style={{ marginTop: '1rem' }}>
            {history.map((h, i) => (
              <div key={i} className="ll-history-row">
                <span>
                  {h.subjectLabel}
                  {h.topicLabels.length > 0 && ` · ${h.topicLabels.join(', ')}`}
                </span>
                <span className="ll-history-score">
                  {h.score}/{h.total} ({h.pct}%)
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* For the grown-ups, at the end where it does not compete with the paper
          a child came for. */}
      <section className="ll-suggest">
        <p>
          <b>Teaching, or spotted a gap?</b> Parents and teachers can propose a question for the
          bank. Every one is read before it is used.
        </p>
        <a className="ll-suggest-link" href="/learning/suggest">Suggest a question</a>
      </section>
    </div>
  )
}
