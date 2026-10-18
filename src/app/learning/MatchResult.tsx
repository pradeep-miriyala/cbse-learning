'use client'
// src/app/learning/MatchResult.tsx
// A marked matching paper: every pair, what the child put, and what belonged
// there — because a wrong pair teaches nothing unless you can see both.

export interface MatchReviewRow {
  left: string
  chose: string | null
  correct: string
  isCorrect: boolean
}

export interface MatchReviewItem {
  number: number
  topic: string
  topicLabel: string
  question: string
  passage: string | null
  passageTitle: string | null
  marks: number
  outOf: number
  rows: MatchReviewRow[]
}

export interface MatchResultData {
  attemptId: string
  learnerName: string
  score: number
  total: number
  pct: number
  message: string
  byTopic: Record<string, { label: string; correct: number; total: number }>
  review: MatchReviewItem[]
}

export default function MatchResult({
  result,
  subjectLabel,
  onRetry,
  onNewPaper,
}: {
  result: MatchResultData
  subjectLabel: string
  onRetry: () => void
  onNewPaper: () => void
}) {
  const topics = Object.entries(result.byTopic)

  return (
    <div className="sd-wrap">
      <div className="sd-panel">
        <p className="sd-kicker">{result.learnerName} · {subjectLabel} · matching</p>
        <p className="sd-score">
          {result.score} <span className="sd-dim">/ {result.total} pairs</span>
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
        </div>
      </div>

      {result.review.map((r) => (
        <div className="sd-panel" style={{ marginTop: '0.9rem' }} key={r.number}>
          <p className="sd-kicker">
            Question {r.number} · {r.topicLabel} · {r.marks} of {r.outOf}
          </p>
          <p className="sd-question">{r.question}</p>

          {r.passage && (
            <div className="mt-passage">
              {r.passageTitle && <p className="mt-passage-title">{r.passageTitle}</p>}
              <p>{r.passage}</p>
            </div>
          )}

          <div className="mt-rows">
            {r.rows.map((row) => (
              <div className={'mt-result-row' + (row.isCorrect ? ' is-right' : ' is-wrong')}
                   key={row.left}>
                <span className="sd-tick">{row.isCorrect ? '✓' : '✗'}</span>
                <span className="mt-left">{row.left}</span>
                <span className="mt-arrow" aria-hidden="true">→</span>
                <span className="mt-answer">
                  {row.chose ?? <span className="sd-interim">left empty</span>}
                  {!row.isCorrect && (
                    // Showing only the mark leaves the child guessing what was
                    // wanted, which is the one thing the review is for.
                    <span className="mt-correct"> · should be {row.correct}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
