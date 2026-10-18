'use client'
// src/app/learning/ResultPanel.tsx
// Score, per-topic breakdown, answer review, and the end-of-test feedback form.

import { useState, type FormEvent } from 'react'
import { withFractions, escapeHtml } from '@/lib/learning'
import ReportQuestion from './ReportQuestion'

export interface SubmitResult {
  attemptId: string
  learnerName: string
  score: number
  total: number
  pct: number
  message: string
  byTopic: Record<string, { label: string; correct: number; total: number }>
  review: {
    number: number
    qid?: string
    topicLabel: string
    passageId?: string | null
    passageTitle?: string | null
    passage?: string | null
    question: string
    visual?: string | null
    imageSvg?: string | null
    imageUrl?: string | null
    yourAnswer: string | null
    correctAnswer: string
    isCorrect: boolean
    hint: string
    usedHint?: boolean
  }[]
  hintsUsed?: number
  continuity?: {
    flagged: boolean
    priorAttempts: number
    priorAvgPct: number
    priorBestPct: number
    usualName: string | null
  } | null
}

const FEEDBACK_TAGS: { id: string; label: string }[] = [
  { id: 'too-easy',            label: 'Too easy' },
  { id: 'just-right',          label: 'Just right' },
  { id: 'too-hard',            label: 'Too hard' },
  { id: 'confusing-wording',   label: 'Some wording confused me' },
  { id: 'learned-something',   label: 'I learned something new' },
  { id: 'want-more-questions', label: 'I want more questions' },
]

type ReviewFilter = 'all' | 'wrong'

export default function ResultPanel({
  result,
  subjectLabel,
  onRetry,
  onNewPaper,
  formatFractions,
  paperId,
}: {
  result: SubmitResult
  subjectLabel: string
  onRetry: () => void
  onNewPaper: () => void
  formatFractions?: boolean
  /** Needed to report a question from the review. */
  paperId?: string
}) {
  const fmtQuestion = (t: string) => (formatFractions ? withFractions(t) : t)
  const fmtAnswer = (t: string) =>
    formatFractions ? withFractions(escapeHtml(t)) : escapeHtml(t)
  const [showReview, setShowReview] = useState(false)
  const [filter, setFilter] = useState<ReviewFilter>('all')

  const [rating, setRating] = useState(0)
  const [tags, setTags] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const topics = Object.entries(result.byTopic)
  const wrong = result.review.filter((r) => !r.isCorrect)

  const topicNames = topics.map(([, t]) => t.label).join(', ')
  const printedOn = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  function toggleTag(id: string) {
    setTags((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  /**
   * Print-to-PDF. The review is always in the DOM (hidden with CSS when
   * collapsed) and the print stylesheet forces it visible, so the report is
   * complete whether or not the learner expanded it on screen.
   */
  function downloadReport() {
    window.print()
  }

  async function sendFeedback(e: FormEvent) {
    e.preventDefault()
    if (rating === 0) { setError('Please pick a rating first.'); return }

    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/learning/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId: result.attemptId, rating, tags, comment, website }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not save your feedback.')
      setSent(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="ll-report">
      {/* Print-only masthead — screen readers and print get the context that the
          on-screen page gets from the site header. */}
      <div className="ll-print-only ll-print-head">
        <div className="ll-print-title">Learning Lab — Practice Report</div>
        <div className="ll-print-meta">
          {result.learnerName} · {subjectLabel} · {topicNames} · {printedOn}
        </div>
      </div>

      {/* A run of papers from this browser scored much better than this one.
          Framed as a question, never an accusation — without accounts this can
          only ever be a nudge, and the innocent explanation is the likely one. */}
      {result.continuity?.flagged && (
        <div className="ll-continuity">
          <span className="ll-hint-label">Just checking</span>
          <p>
            Papers from this device usually score around{' '}
            <b>{result.continuity.priorAvgPct}%</b>
            {result.continuity.usualName && result.continuity.usualName !== result.learnerName
              ? <> — most often under the name <b>{result.continuity.usualName}</b></>
              : null}
            . Today&rsquo;s is quite a bit lower. If someone else is having a go, that is
            completely fine. If it was you, the review below shows exactly which topics to revisit.
          </p>
        </div>
      )}

      <div className="ll-score-hero">
        <span className="eyebrow">{result.learnerName}&rsquo;s result</span>
        <div className="ll-score-big">
          {result.score} / {result.total}
        </div>
        <div className="ll-score-pct">{result.pct}%</div>
        <p className="ll-score-msg">{result.message}</p>
      </div>

      <div className="ll-breakdown">
        {topics.map(([slug, t]) => {
          const pct = t.total ? Math.round((t.correct / t.total) * 100) : 0
          return (
            <div key={slug} className="ll-bd-card">
              <div className="ll-bd-topic">{t.label}</div>
              <div className="ll-bd-score">
                {t.correct} / {t.total}
              </div>
              <div className="ll-bar"><span style={{ width: `${pct}%` }} /></div>
            </div>
          )
        })}
      </div>

      <div className="ll-actions">
        <button type="button" className="btn-primary" onClick={onRetry}>
          Try a fresh paper, same topics
        </button>
        <button type="button" className="btn" onClick={() => setShowReview((v) => !v)}>
          {showReview ? 'Hide review' : 'Review my answers'}
        </button>
        <button type="button" className="btn" onClick={downloadReport}>
          Download report (PDF)
        </button>
        <button type="button" className="btn" onClick={onNewPaper}>
          Pick new topics
        </button>
      </div>

      {/* Review. Always rendered so the print stylesheet can include it; the
          collapsed state is CSS-only. */}
      <div className={'ll-review-block' + (showReview ? '' : ' is-collapsed')}>
        <div className="ll-review-controls">
          <span className="section-label">Answer review</span>
          <div className="ll-seg" role="group" aria-label="Filter reviewed answers">
            <button
              type="button"
              className="ll-seg-btn"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              All answers ({result.review.length})
            </button>
            <button
              type="button"
              className="ll-seg-btn"
              aria-pressed={filter === 'wrong'}
              onClick={() => setFilter('wrong')}
              disabled={wrong.length === 0}
            >
              Only mistakes ({wrong.length})
            </button>
          </div>
        </div>

        {wrong.length === 0 && (
          <p className="ll-muted" style={{ marginBottom: '1rem' }}>
            Nothing to correct — every answer was right.
          </p>
        )}

        <div className="ll-review">
          {/* Every question is always rendered. The "Only mistakes" filter hides
              the correct ones with CSS rather than dropping them from the DOM,
              so the printed report is always the complete paper. */}
          {result.review.map((item, i) => {
            const skipped = item.yourAnswer === null
            const hiddenByFilter = filter === 'wrong' && item.isCorrect
            // A passage is printed once above the first question of its set,
            // not repeated on all five — the review is read straight through,
            // and the PDF should not carry the same text four extra times.
            const startsPassage =
              !!item.passage && item.passageId !== result.review[i - 1]?.passageId
            return (
              <div key={item.number}>
                {startsPassage && (
                  <div className="ll-passage ll-passage-review">
                    <div className="ll-passage-head">
                      <span className="ll-passage-kicker">Passage</span>
                      {item.passageTitle && <h3 className="ll-passage-title">{item.passageTitle}</h3>}
                    </div>
                    <div className="ll-passage-body" dangerouslySetInnerHTML={{ __html: item.passage! }} />
                  </div>
                )}
              <div
                className={
                  'll-review-item ' +
                  (item.isCorrect ? 'is-correct' : skipped ? 'is-skipped' : 'is-wrong') +
                  (hiddenByFilter ? ' is-filtered-out' : '')
                }
              >
                <div className="ll-review-head">
                  <span className="ll-review-topic">{item.topicLabel}</span>
                  <span style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {item.usedHint && <span className="ll-badge is-hinted">Hint used</span>}
                    <span className={'ll-badge ' + (item.isCorrect ? 'is-correct' : skipped ? 'is-skipped' : 'is-wrong')}>
                      {item.isCorrect ? 'Correct' : skipped ? 'Not answered' : 'Incorrect'}
                    </span>
                  </span>
                </div>

                <div className="ll-review-q">
                  <b>Q{item.number}.</b>{' '}
                  <span dangerouslySetInnerHTML={{ __html: fmtQuestion(item.question) }} />
                </div>

                {item.visual && <div className="ll-visual">{item.visual}</div>}
                {item.imageSvg && (
                  <div className="ll-figure" style={{ maxWidth: 160 }}
                    dangerouslySetInnerHTML={{ __html: item.imageSvg }} />
                )}
                {item.imageUrl && (
                  <div className="ll-figure" style={{ maxWidth: 160 }}>
                    <img src={item.imageUrl} alt="Figure for this question" loading="lazy"
                      referrerPolicy="no-referrer" />
                  </div>
                )}

                {!item.isCorrect && (
                  <div className="ll-review-row is-yours">
                    <span className="ll-review-key">Your answer</span>
                    {skipped
                      ? 'Not answered'
                      : <span dangerouslySetInnerHTML={{ __html: fmtAnswer(item.yourAnswer!) }} />}
                  </div>
                )}
                <div className="ll-review-row is-correct">
                  <span className="ll-review-key">Correct answer</span>
                  <span dangerouslySetInnerHTML={{ __html: fmtAnswer(item.correctAnswer) }} />
                </div>

                {item.hint && (
                  <div className="ll-review-tip">
                    <b>Teacher tip:</b> {item.hint}
                  </div>
                )}

                {paperId && item.qid && (
                  <div className="ll-flag-slot"><ReportQuestion paperId={paperId} qid={item.qid} /></div>
                )}
              </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Feedback ── */}
      <div className="ll-feedback">
        {sent ? (
          <>
            <span className="section-label">Thank you</span>
            <p className="ll-muted" style={{ marginTop: '0.75rem' }}>
              Your feedback is saved. It genuinely shapes which questions get written next.
            </p>
          </>
        ) : (
          <form onSubmit={sendFeedback}>
            <span className="section-label">How was this paper?</span>
            <p className="ll-muted" style={{ marginTop: '0.6rem' }}>
              One quick rating helps decide what to add to the question bank next.
            </p>

            <div className="ll-stars" role="group" aria-label="Rating out of 5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={'ll-star' + (n <= rating ? ' is-on' : '')}
                  aria-label={`${n} out of 5`}
                  aria-pressed={n === rating}
                  onClick={() => setRating(n)}
                >
                  {n}
                </button>
              ))}
            </div>

            <div className="ll-tags">
              {FEEDBACK_TAGS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="ll-tag"
                  aria-pressed={tags.includes(t.id)}
                  onClick={() => toggleTag(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <label htmlFor="ll-comment" className="caps" style={{ display: 'block', marginBottom: '0.45rem' }}>
              Anything else? (optional)
            </label>
            <textarea
              id="ll-comment"
              rows={3}
              value={comment}
              maxLength={800}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Which question tripped you up?"
            />

            {/* Honeypot — hidden from people, tempting to bots. */}
            <div className="ll-hp" aria-hidden="true">
              <label htmlFor="ll-website">Website</label>
              <input id="ll-website" type="text" tabIndex={-1} autoComplete="off"
                value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            {error && <p className="ll-error">{error}</p>}

            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={sending}>
              {sending ? 'Sending…' : 'Send feedback'}
            </button>
          </form>
        )}
      </div>

      {/* Repeats at the foot of every printed page. */}
      <div className="ll-print-only ll-print-footer">
        Practice papers from pradeep.miriyala.in/learning/cbse — free CBSE practice, generated afresh every time.
      </div>
    </div>
  )
}
