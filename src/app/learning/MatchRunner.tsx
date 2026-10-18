'use client'
// src/app/learning/MatchRunner.tsx
// Sitting a match-the-columns paper: read the passage, then pair each item on
// the left with one on the right.
//
// A dropdown per row rather than drag-and-drop. Dragging is charming on a
// laptop and miserable on a phone — small targets, scrolling that fights the
// drag, and nothing at all for a child using a keyboard or a screen reader. A
// select works everywhere and says what it is.
//
// Which right belongs to which left is not in this component. The pairing stays
// on the server and the marking happens there.

import { useEffect, useRef, useState } from 'react'

export interface MatchPaperQuestion {
  qid: string
  topic: string
  topicLabel: string
  question: string
  passage: string | null
  passageTitle: string | null
  lefts: string[]
  rights: string[]
  marks: number
  budgetSec: number
}

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export default function MatchRunner({
  questions,
  marksTotal,
  learnerName,
  submitting,
  onSubmit,
  onQuit,
}: {
  questions: MatchPaperQuestion[]
  marksTotal: number
  learnerName: string
  submitting: boolean
  onSubmit: (matched: Record<string, Record<string, string>>) => void
  onQuit: () => void
}) {
  const [idx, setIdx] = useState(0)
  const [matched, setMatched] = useState<Record<string, Record<string, string>>>({})
  const [elapsed, setElapsed] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  const q = questions[idx]
  const last = idx === questions.length - 1
  const mine = matched[q.qid] ?? {}
  const done = q.lefts.filter((l) => mine[l]).length

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [idx])

  const budget = questions.reduce((s, x) => s + x.budgetSec, 0)

  function choose(left: string, right: string) {
    setMatched((prev) => {
      const cur = { ...(prev[q.qid] ?? {}) }
      if (!right) delete cur[left]
      else cur[left] = right
      return { ...prev, [q.qid]: cur }
    })
  }

  /**
   * Which right-hand items are already spoken for. Shown as a hint, not
   * enforced: a child who wants to use one twice should be allowed to, and find
   * out from the marking that it was wrong.
   */
  const used = new Set(Object.values(mine))

  const blank = questions.reduce(
    (n, x) => n + x.lefts.filter((l) => !(matched[x.qid] ?? {})[l]).length, 0)

  return (
    <div className="sd-wrap">
      <div className="sd-meta">
        <span>Question {idx + 1} of {questions.length}</span>
        <span>{q.topicLabel}</span>
        <span className={elapsed > budget ? 'sd-over' : ''}>
          {mmss(elapsed)} <span className="sd-dim">/ {mmss(budget)}</span>
        </span>
      </div>

      <div className="sd-panel" ref={panelRef}>
        <p className="sd-kicker">
          {q.marks} marks · one mark for each correct pair · {learnerName}
        </p>
        <p className="sd-question">{q.question}</p>

        {q.passage && (
          <div className="mt-passage">
            {q.passageTitle && <p className="mt-passage-title">{q.passageTitle}</p>}
            <p>{q.passage}</p>
          </div>
        )}

        <div className="mt-rows">
          {q.lefts.map((left) => (
            <label className="mt-row" key={left}>
              <span className="mt-left">{left}</span>
              <span className="mt-arrow" aria-hidden="true">→</span>
              <select
                className={'mt-select' + (mine[left] ? ' is-set' : '')}
                value={mine[left] ?? ''}
                onChange={(e) => choose(left, e.target.value)}
                aria-label={`What goes with ${left}?`}
              >
                <option value="">choose…</option>
                {q.rights.map((r) => (
                  <option key={r} value={r}>
                    {r}{used.has(r) && mine[left] !== r ? ' (used)' : ''}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <p className="sd-note">{done} of {q.lefts.length} matched.</p>

        <div className="sd-actions">
          <button className="sd-btn" disabled={idx === 0 || submitting}
                  onClick={() => setIdx((i) => i - 1)}>
            Back
          </button>
          {last ? (
            <button className="sd-btn sd-btn-primary" disabled={submitting}
                    onClick={() => onSubmit(matched)}>
              {submitting ? 'Marking…' : 'Finish and see my marks'}
            </button>
          ) : (
            <button className="sd-btn sd-btn-primary" disabled={submitting}
                    onClick={() => setIdx((i) => i + 1)}>
              Next question
            </button>
          )}
          <button className="sd-btn" disabled={submitting} onClick={onQuit}>Leave</button>
        </div>

        {last && blank > 0 && (
          <p className="sd-note">
            {blank} {blank === 1 ? 'pair is' : 'pairs are'} still empty. You can go back, or
            finish and see how you did on the rest.
          </p>
        )}
      </div>

      <p className="sd-privacy">{marksTotal} marks in all.</p>
    </div>
  )
}
