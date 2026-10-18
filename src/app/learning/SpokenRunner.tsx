'use client'
// src/app/learning/SpokenRunner.tsx
// Sitting a 3-mark spoken paper: one question at a time, answered by voice or
// keyboard, submitted for marking at the end.
//
// Nothing is uploaded but the text. The browser turns speech into words and no
// recording leaves the device — these are children's voices, and the less that
// travels the less there is to protect.
//
// Marking happens on the server, not here, for the same reason an MCQ answer
// key is not sent to the page: the mark scheme IS the answer key.

import { useEffect, useRef, useState } from 'react'
import SpokenAnswer from './SpokenAnswer'

export interface SpokenPaperQuestion {
  qid: string
  topic: string
  topicLabel: string
  question: string
  marks: number
  budgetSec: number
}

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

/** Same cadence as the multiple-choice runner. */
const PING_MS = 25_000

export default function SpokenRunner({
  questions,
  paperId,
  marksTotal,
  learnerName,
  submitting,
  onSubmit,
  onQuit,
}: {
  questions: SpokenPaperQuestion[]
  paperId: string
  marksTotal: number
  learnerName: string
  submitting: boolean
  onSubmit: (said: Record<string, string>) => void
  onQuit: () => void
}) {
  const [idx, setIdx] = useState(0)
  const [said, setSaid] = useState<Record<string, string>>({})
  const [elapsed, setElapsed] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  const q = questions[idx]
  const last = idx === questions.length - 1
  const answered = Object.values(said).filter((t) => t.trim()).length

  // Tell the server the paper is still being worked on, and carry the answers
  // with it. Without this a spoken paper never appears in the live view at all,
  // and a refresh would throw away everything said so far.
  const progress = useRef({ answered: 0, index: 0, said: {} as Record<string, string> })
  progress.current = { answered, index: idx, said }

  useEffect(() => {
    if (!paperId) return
    const ping = () => {
      fetch('/api/learning/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paperId, ...progress.current }),
        keepalive: true,
      }).catch(() => {})
    }
    ping()
    const t = setInterval(ping, PING_MS)
    return () => clearInterval(t)
  }, [paperId])

  // Finishing an answer is the signal worth reporting promptly — it is what
  // makes a score move in the live view.
  useEffect(() => {
    if (!paperId) return
    fetch('/api/learning/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paperId, answered, index: idx, said: progress.current.said }),
      keepalive: true,
    }).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered, paperId])

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  // On a phone the next question opens below the fold, and a child who does not
  // think to scroll simply sees the old one. Move them to what changed.
  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [idx])

  const budget = questions.reduce((s, x) => s + x.budgetSec, 0)

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
          {q.marks} marks · answer in about three sentences · {learnerName}
        </p>
        <p className="sd-question">{q.question}</p>

        <SpokenAnswer
          questionKey={q.qid}
          text={said[q.qid] ?? ''}
          onText={(t) => setSaid((prev) => ({ ...prev, [q.qid]: t }))}
        />

        <div className="sd-actions">
          <button
            className="sd-btn"
            disabled={idx === 0 || submitting}
            onClick={() => setIdx((i) => i - 1)}
          >
            Back
          </button>

          {last ? (
            <button className="sd-btn sd-btn-primary" disabled={submitting}
                    onClick={() => onSubmit(said)}>
              {submitting ? 'Marking…' : 'Finish and see my marks'}
            </button>
          ) : (
            <button className="sd-btn sd-btn-primary" disabled={submitting}
                    onClick={() => setIdx((i) => i + 1)}>
              Next question
            </button>
          )}

          <button className="sd-btn" disabled={submitting} onClick={onQuit}>
            Leave
          </button>
        </div>

        {/* A blank answer is allowed — a child who does not know should be able
            to move on rather than be trapped — but it is worth saying out loud
            before the paper is closed. */}
        {last && answered < questions.length && (
          <p className="sd-note">
            {questions.length - answered} question{questions.length - answered === 1 ? ' is' : 's are'} still
            blank. You can go back, or finish and see how you did on the rest.
          </p>
        )}
      </div>

      <p className="sd-privacy">
        {marksTotal} marks in all. Your voice is turned into text by your own browser —
        no recording is uploaded.
      </p>
    </div>
  )
}
