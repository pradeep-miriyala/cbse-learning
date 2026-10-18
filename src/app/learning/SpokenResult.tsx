'use client'
// src/app/learning/SpokenResult.tsx
// What a marked spoken paper looks like: the marks, then every question with
// the points found and missed, what the learner actually said, and a full-marks
// answer to compare against.
//
// Each point shows the words that earned it. A child told they missed something
// has to be able to see what was looked for — otherwise the mark is an opinion
// they cannot argue with, and the dispute button below would be meaningless.

import { useState } from 'react'

export interface SpokenReviewItem {
  number: number
  topic: string
  topicLabel: string
  question: string
  said: string
  marks: number
  outOf: number
  points: { id: string; label: string; found: boolean; matched: string[] }[]
  modelAnswer: string
}

export interface SpokenResultData {
  attemptId: string
  learnerName: string
  score: number
  total: number
  pct: number
  message: string
  byTopic: Record<string, { label: string; correct: number; total: number }>
  review: SpokenReviewItem[]
}

export default function SpokenResult({
  result,
  subjectLabel,
  onRetry,
  onNewPaper,
}: {
  result: SpokenResultData
  subjectLabel: string
  onRetry: () => void
  onNewPaper: () => void
}) {
  const [disputed, setDisputed] = useState<Set<string>>(new Set())
  const [onlyMissed, setOnlyMissed] = useState(false)

  const topics = Object.entries(result.byTopic)

  return (
    <div className="sd-wrap">
      <div className="sd-panel">
        <p className="sd-kicker">{result.learnerName} · {subjectLabel} · 3-mark answers</p>
        <p className="sd-score">
          {result.score} <span className="sd-dim">/ {result.total} marks</span>
        </p>
        <p className="sd-done-note">{result.message}</p>

        {topics.length > 0 && (
          <div style={{ marginBottom: '1.2rem' }}>
            <p className="sd-heard-label">By topic</p>
            {topics.map(([k, t]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between',
                                    fontSize: '0.85rem', padding: '0.2rem 0' }}>
                <span>{t.label}</span>
                <span className="sd-dim">{t.correct}/{t.total}</span>
              </div>
            ))}
          </div>
        )}

        <div className="sd-actions">
          <button className="sd-btn sd-btn-primary" onClick={onRetry}>Try a fresh paper</button>
          <button className="sd-btn" onClick={onNewPaper}>Choose new topics</button>
          <button className="sd-btn" onClick={() => setOnlyMissed((v) => !v)}>
            {onlyMissed ? 'Showing missed' : 'Only what I missed'}
          </button>
        </div>
      </div>

      {result.review.map((r) => {
        const perfect = r.marks === r.outOf
        if (onlyMissed && perfect) return null
        return (
          <div className="sd-panel" style={{ marginTop: '0.9rem' }} key={r.number}>
            <p className="sd-kicker">
              Question {r.number} · {r.topicLabel} · {r.marks} of {r.outOf}
            </p>
            <p className="sd-question">{r.question}</p>

            <div className="sd-heard">
              <p className="sd-heard-label">What you said</p>
              <p className="sd-live">
                {r.said?.trim() || <span className="sd-interim">You left this one blank.</span>}
              </p>
            </div>

            <ul className="sd-points" style={{ marginTop: '1rem' }}>
              {r.points.map((p) => {
                const claimed = disputed.has(`${r.number}:${p.id}`)
                return (
                  <li key={p.id} className={p.found ? 'is-found' : claimed ? 'is-claimed' : 'is-missed'}>
                    <span className="sd-tick">{p.found ? '✓' : claimed ? '!' : '✗'}</span>
                    <span className="sd-point-body">
                      <span className="sd-point-label">{p.label}</span>
                      {p.found && p.matched.length > 0 && (
                        <span className="sd-because">you said: {p.matched.join(', ')}</span>
                      )}
                      {!p.found && !claimed && (
                        // The only place a learner's own judgement enters, and it
                        // does not move the mark — it raises a flag for a person.
                        // A far smaller trust surface than self-marking.
                        <button className="sd-dispute"
                                onClick={() => setDisputed((d) => new Set(d).add(`${r.number}:${p.id}`))}>
                          I did say that
                        </button>
                      )}
                      {claimed && (
                        <span className="sd-because">
                          Flagged for a teacher to check. Your mark is unchanged.
                        </span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>

            <div className="sd-model">
              <p className="sd-model-label">A full-marks answer</p>
              <p>{r.modelAnswer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
