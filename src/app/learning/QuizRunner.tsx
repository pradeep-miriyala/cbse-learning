'use client'
// src/app/learning/QuizRunner.tsx
// The one and only exam UI. Every paper — English, Maths, Science, Social
// Science — runs through this component, so the UX can't drift per subject.

import { useState, useEffect, useRef } from 'react'
import ReportQuestion from './ReportQuestion'
import {
  HINT_DELAY_MS, hintBudgetFor, withFractions, escapeHtml,
  type PaperQuestion,
} from '@/lib/learning'

/** How often a running paper tells the server it is still being worked on. */
const PING_MS = 20_000

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

interface Props {
  questions: PaperQuestion[]
  learnerName: string
  paperId: string
  submitting: boolean
  onSubmit: (answers: Record<string, number>) => void
  onQuit: () => void
  /** Set when a paper is picked up again after a refresh — see /api/learning/resume. */
  initialAnswers?: Record<string, number>
  initialIndex?: number
  /** Stack fractions. Only maths has them, so only maths pays for the scan. */
  formatFractions?: boolean
}

export default function QuizRunner({
  questions, learnerName, paperId, submitting, onSubmit, onQuit,
  initialAnswers, initialIndex, formatFractions,
}: Props) {
  // Question text carries trusted markup from the bank; option text does not,
  // so it is escaped before any is added.
  const fmtQuestion = (t: string) => (formatFractions ? withFractions(t) : t)
  const fmtOption = (t: string) =>
    formatFractions ? withFractions(escapeHtml(t)) : escapeHtml(t)
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(0, initialIndex ?? 0), Math.max(0, questions.length - 1)))
  const [answers, setAnswers] = useState<Record<string, number>>(() => initialAnswers ?? {})

  // Hints are offered, never forced. The button appears once a learner has
  // been on a question for a while; revealing it automatically would just hand
  // over the answer, since most tips name it outright.
  const [hintOffered, setHintOffered] = useState(false)
  const [hints, setHints] = useState<Record<string, string>>({})
  const [loadingHint, setLoadingHint] = useState(false)

  // Flagged for a second look, the way a paper exam lets you star a question.
  const [flagged, setFlagged] = useState<Record<string, boolean>>({})
  const [gridOpen, setGridOpen] = useState(false)
  // The last stop before submitting: what is unanswered or flagged, in one place.
  const [reviewing, setReviewing] = useState(false)

  const q = questions[index]
  const isLast = index === questions.length - 1
  const answeredCount = Object.keys(answers).length

  // One hint per five questions. Asking again for a hint already shown does not
  // spend another — the server records them per question, so re-reading is free.
  const hintBudget = hintBudgetFor(questions.length)
  const hintsSpent = Object.keys(hints).length
  const hintsLeft = Math.max(0, hintBudget - hintsSpent)

  // Where this question sits within its passage set. The generator keeps a
  // passage's questions adjacent, so the set is a contiguous run.
  const passagePosition = (() => {
    if (!q?.passageId) return null
    let first = index
    while (first > 0 && questions[first - 1].passageId === q.passageId) first--
    let last = index
    while (last < questions.length - 1 && questions[last + 1].passageId === q.passageId) last++
    return { at: index - first + 1, of: last - first + 1 }
  })()

  // Restart the offer timer whenever the learner moves to another question.
  useEffect(() => {
    setHintOffered(false)
    const t = setTimeout(() => setHintOffered(true), HINT_DELAY_MS)
    return () => clearTimeout(t)
  }, [index])

  /**
   * Put the top of the question back in view on every move.
   *
   * Without this the scroll position simply carries over. On a phone the
   * options sit below the fold, so a learner is always scrolled down by the
   * time they press Next — and the next question opens with its top, and
   * anything above it, already off-screen.
   *
   * That is how a reading passage went missing. A learner reported getting
   * comprehension questions with no passage; her set began at question 41 of
   * 48, so she had been scrolled down for forty questions when the passage
   * appeared above the question card, out of sight. She answered all five
   * without ever seeing the text.
   *
   * Where it scrolls to depends on whether the passage is new:
   *
   *   - a question with no passage, or the FIRST of a passage set, goes to the
   *     top of the quiz, so the text is the first thing read;
   *   - the second and later questions of the same set go to the question
   *     itself, which carries a scroll-margin so the foot of the passage stays
   *     just in view. The child is not made to scroll past the whole text five
   *     times, and can still see it is there, immediately above.
   *
   * Jumps rather than glides: this fires on every question, and a smooth
   * scroll on each one is slow to sit through and hard on anyone who finds
   * motion uncomfortable.
   */
  const startsPassage =
    !q?.passageId || index === 0 || questions[index - 1]?.passageId !== q.passageId

  const topRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const target = startsPassage ? topRef.current : cardRef.current
    target?.scrollIntoView({ block: 'start' })
    // Keyed on index alone: startsPassage is derived from it, and adding it
    // would re-run the scroll on unrelated re-renders such as choosing an option.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])
  useEffect(() => { if (reviewing) topRef.current?.scrollIntoView({ block: 'start' }) }, [reviewing])

  // Escape closes the question grid.
  useEffect(() => {
    if (!gridOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setGridOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [gridOpen])

  /**
   * Hold the page against an accidental pull-to-refresh.
   *
   * A long downward swipe at the top of a phone screen reloads the page, and
   * learners were losing papers to it. overscroll-behavior has to sit on the
   * element that actually scrolls, so it goes on <body> and only while a paper
   * is open — the rest of the site should still refresh normally.
   *
   * This is a guard, not the fix. The paper is also restorable now, because a
   * gesture no child meant to make should not need a warning dialog to undo.
   */
  useEffect(() => {
    document.body.classList.add('ll-exam-open')
    return () => document.body.classList.remove('ll-exam-open')
  }, [])

  // Tell the server the paper is still being worked on, so the admin live view
  // can tell someone mid-paper from someone who walked away. Read through a ref
  // so the interval is set up once rather than restarted on every keystroke, and
  // swallow every error — a dropped ping must never disturb the exam.
  const progress = useRef({ answered: answeredCount, index, answers })
  progress.current = { answered: answeredCount, index, answers }

  useEffect(() => {
    let stopped = false
    const ping = () => {
      if (stopped) return
      fetch('/api/learning/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paperId, ...progress.current }),
        keepalive: true,
      }).catch(() => {})
    }
    ping()
    const t = setInterval(ping, PING_MS)
    return () => { stopped = true; clearInterval(t) }
  }, [paperId])

  // Answering is the signal worth reporting promptly — it is what makes the
  // progress bar in the admin move. Moving between questions can wait for the
  // next tick rather than costing a write of its own.
  useEffect(() => {
    if (answeredCount === 0) return
    fetch('/api/learning/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paperId, answered: answeredCount, index, answers }),
      keepalive: true,
    }).catch(() => {})
    // Intentionally not keyed on `index`: only a new answer triggers a ping.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answeredCount, paperId])

  async function revealHint() {
    if (hints[q.qid] || loadingHint || hintsLeft === 0) return
    setLoadingHint(true)
    try {
      const res = await fetch('/api/learning/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paperId, qid: q.qid }),
      })
      const data = await res.json()
      if (res.ok && data.hint) setHints((prev) => ({ ...prev, [q.qid]: data.hint }))
    } catch { /* a missing hint is not worth interrupting the paper for */ }
    finally { setLoadingHint(false) }
  }

  function choose(optIndex: number) {
    setAnswers((prev) => ({ ...prev, [q.qid]: optIndex }))
  }

  // Two-way jump between the passage and the question it asks about. Scrolling
  // up to re-read is easy enough; finding the way back down to the options,
  // several hundred pixels below on a phone, is where a child loses their
  // place. Both directions get a control so neither journey is a hunt.
  const passageRef = useRef<HTMLDivElement>(null)
  const goToPassage = () => passageRef.current?.scrollIntoView({ block: 'start' })
  const goToQuestion = () => cardRef.current?.scrollIntoView({ block: 'start' })

  function next() {
    if (!isLast) { setIndex((i) => i + 1); return }
    setReviewing(true)
  }

  function jumpTo(i: number) {
    setIndex(i); setGridOpen(false); setReviewing(false)
  }

  const flaggedCount = Object.values(flagged).filter(Boolean).length
  const unansweredIdx = questions.map((item, i) => (answers[item.qid] === undefined ? i : -1)).filter((i) => i >= 0)
  const flaggedIdx = questions.map((item, i) => (flagged[item.qid] ? i : -1)).filter((i) => i >= 0)

  if (reviewing) {
    return (
      <div className="ll-quiz ll-quiz-review" ref={topRef}>
        <span className="caps">Before you hand it in</span>
        <h2 className="ll-rv-title">
          {unansweredIdx.length === 0
            ? `All ${questions.length} questions answered`
            : `${answeredCount} of ${questions.length} answered`}
        </h2>

        {unansweredIdx.length > 0 && (
          <div className="ll-rv-group">
            <span className="ll-rv-label">Not answered yet — tap to go back</span>
            <div className="ll-rv-chips">
              {unansweredIdx.map((i) => (
                <button key={i} type="button" className="ll-rv-chip is-open" onClick={() => jumpTo(i)}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
        {flaggedIdx.length > 0 && (
          <div className="ll-rv-group">
            <span className="ll-rv-label">Flagged for a second look</span>
            <div className="ll-rv-chips">
              {flaggedIdx.map((i) => (
                <button key={i} type="button" className="ll-rv-chip is-flag" onClick={() => jumpTo(i)}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
        {unansweredIdx.length === 0 && flaggedIdx.length === 0 && (
          <p className="ll-muted">Nothing is left open. Ready when you are.</p>
        )}

        <div className="ll-rv-actions">
          <button type="button" className="btn-primary" disabled={submitting} onClick={() => onSubmit(answers)}>
            {submitting ? 'Checking…' : 'Submit paper'}
          </button>
          <button type="button" className="btn" onClick={() => setReviewing(false)}>
            Back to the questions
          </button>
        </div>
        {unansweredIdx.length > 0 && (
          <p className="ll-muted" style={{ marginTop: '0.75rem' }}>
            Unanswered questions count as wrong.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="ll-quiz" ref={topRef}>
      <div className="ll-quiz-top">
        <span className="caps">
          Question {index + 1} of {questions.length}
        </span>
        <span className="ledger-tag tag-rust">{q.topicLabel}</span>
        <button
          type="button"
          className="ll-flagbtn"
          aria-pressed={!!flagged[q.qid]}
          onClick={() => setFlagged((f) => ({ ...f, [q.qid]: !f[q.qid] }))}
        >
          <span aria-hidden>⚑</span> {flagged[q.qid] ? 'Flagged' : 'Flag'}
        </button>
      </div>

      <div className="ll-progress-bar" role="progressbar" aria-valuenow={answeredCount}
        aria-valuemin={0} aria-valuemax={questions.length}
        aria-label={`${answeredCount} of ${questions.length} answered`}>
        <span className="ll-progress-fill" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
      </div>

      {/* Reading comprehension. The passage stays on paper while the question
          sits on the slate — you read here and answer there. It is rendered
          again on each question of the set rather than being carried in a
          sticky bar: the markup is identical, so it does not move, and the
          learner never has to scroll back to find the text. */}
      {q.passage && (
        <div className="ll-passage" ref={passageRef}>
          <div className="ll-passage-head">
            <span className="ll-passage-kicker">
              Passage{passagePosition && ` · question ${passagePosition.at} of ${passagePosition.of}`}
            </span>
            {q.passageTitle && <h3 className="ll-passage-title">{q.passageTitle}</h3>}
          </div>
          <div className="ll-passage-body" dangerouslySetInnerHTML={{ __html: q.passage }} />
          <button type="button" className="ll-passage-jump" onClick={goToQuestion}>
            Go to question {index + 1} <span aria-hidden>↓</span>
          </button>
        </div>
      )}

      {/* Sits directly above the question, where a child looks when the text
          they need has scrolled off the top of the screen. */}
      {q.passage && (
        <button type="button" className="ll-passage-jump is-up" onClick={goToPassage}>
          <span aria-hidden>↑</span> Read the passage again
        </button>
      )}

      <div className="ll-question-card" ref={cardRef}>
        {/* Question text carries inline markup (<b>) from the original papers. */}
        <div className="ll-question" dangerouslySetInnerHTML={{ __html: fmtQuestion(q.question) }} />

        {q.visual && <div className="ll-visual">{q.visual}</div>}
        {q.imageSvg && (
          <div className="ll-figure" role="img" aria-label="Figure for this question"
            dangerouslySetInnerHTML={{ __html: q.imageSvg }} />
        )}
        {q.imageUrl && (
          <div className="ll-figure">
            {/* Plain img rather than next/image: the host is whatever the
                question author linked to, not a configured domain. */}
            <img src={q.imageUrl} alt="Figure for this question" loading="lazy"
              referrerPolicy="no-referrer" />
          </div>
        )}

        <div className="ll-options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              type="button"
              className="ll-option"
              aria-pressed={answers[q.qid] === i}
              onClick={() => choose(i)}
            >
              <span className="ll-option-letter">{LETTERS[i]}</span>
              <span dangerouslySetInnerHTML={{ __html: fmtOption(opt) }} />
            </button>
          ))}
        </div>

        {/* Stuck? — offered after a pause, revealed only if asked for. */}
        <div className="ll-hint-slot" aria-live="polite">
          {hints[q.qid] ? (
            <div className="ll-hint">
              <span className="ll-hint-label">Hint</span>
              {hints[q.qid]}
            </div>
          ) : hintOffered && hintsLeft > 0 ? (
            <button type="button" className="ll-hint-btn" onClick={revealHint} disabled={loadingHint}>
              {loadingHint
                ? 'Fetching a hint…'
                : `Stuck? Show a hint (${hintsSpent + 1}/${hintBudget})`}
            </button>
          ) : hintOffered ? (
            <p className="ll-hint-spent">
              All {hintBudget} hint{hintBudget === 1 ? '' : 's'} for this paper have been used.
            </p>
          ) : null}
        </div>

        <div className="ll-flag-slot" key={q.qid}>
          <ReportQuestion paperId={paperId} qid={q.qid} />
        </div>
      </div>

      {/* Fixed to the bottom of the screen, where a thumb already is. The middle
          button opens the question grid; the dots it replaces ran to two or three
          rows on a long paper. */}
      <div className="ll-dock">
        <button type="button" className="btn" onClick={() => setIndex((i) => i - 1)} disabled={index === 0}>
          Back
        </button>
        <button type="button" className="ll-dock-count" aria-haspopup="dialog" onClick={() => setGridOpen(true)}>
          <span>{index + 1}<span className="ll-dock-of"> / {questions.length}</span></span>
          <span className="ll-dock-sub">{answeredCount} answered{flaggedCount > 0 ? ` · ${flaggedCount} flagged` : ''}</span>
        </button>
        <button type="button" className="btn-primary" onClick={next} disabled={submitting}>
          {isLast ? 'Review' : 'Next'}
        </button>
      </div>

      {gridOpen && (
        <div className="ll-sheet" role="dialog" aria-modal="true" aria-label="All questions">
          <button type="button" className="ll-sheet-scrim" aria-label="Close" onClick={() => setGridOpen(false)} />
          <div className="ll-sheet-panel">
            <div className="ll-sheet-head">
              <span className="caps">All questions</span>
              <button type="button" className="ll-sheet-close" onClick={() => setGridOpen(false)}>Close</button>
            </div>
            <div className="ll-grid">
              {questions.map((item, i) => (
                <button
                  key={item.qid}
                  type="button"
                  className={
                    'll-cell' +
                    (answers[item.qid] !== undefined ? ' is-answered' : '') +
                    (flagged[item.qid] ? ' is-flagged' : '') +
                    (i === index ? ' is-current' : '')
                  }
                  aria-label={`Question ${i + 1}${answers[item.qid] !== undefined ? ', answered' : ', not answered'}${flagged[item.qid] ? ', flagged' : ''}`}
                  aria-current={i === index}
                  onClick={() => jumpTo(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="ll-grid-key">
              <span><i className="k-answered" /> Answered</span>
              <span><i className="k-open" /> Not yet</span>
              <span><i className="k-flag" /> Flagged</span>
            </p>
            <button type="button" className="btn" style={{ width: '100%' }}
              onClick={() => { setGridOpen(false); setReviewing(true) }}>
              Review and submit
            </button>
          </div>
        </div>
      )}

      <p className="ll-muted" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        {learnerName}, you have answered {answeredCount} of {questions.length}.{' '}
        <button type="button" onClick={onQuit}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--accent)', borderBottom: '1px solid var(--accent)', font: 'inherit' }}>
          Start over
        </button>
      </p>
    </div>
  )
}
