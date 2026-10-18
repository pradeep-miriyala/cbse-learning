'use client'
// src/app/learning/ReportQuestion.tsx
// "Report this question" — one tap to say what is wrong with it. Used while
// sitting a paper and again in the answer review, because a wrong answer key is
// easiest to spot when the key is on screen.

import { useState } from 'react'

const REASONS: { id: string; label: string }[] = [
  { id: 'wrong-answer',    label: 'The answer looks wrong' },
  { id: 'unclear',         label: 'Confusing wording' },
  { id: 'wrong-topic',     label: 'Wrong topic' },
  { id: 'missing-picture', label: 'Picture missing' },
  { id: 'other',           label: 'Something else' },
]

export default function ReportQuestion({ paperId, qid }: { paperId: string; qid: string }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [note, setNote] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  async function send() {
    if (!reason) { setError('Pick what is wrong first.'); return }
    setState('sending'); setError('')
    try {
      const res = await fetch('/api/learning/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paperId, qid, reason, note }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Could not send that.')
      setState('sent')
    } catch (err: any) {
      setError(err.message)
      setState('idle')
    }
  }

  if (state === 'sent') {
    return <p className="ll-flag-done" role="status">Thanks — this question has been reported.</p>
  }

  if (!open) {
    return (
      <button type="button" className="ll-flag-link" onClick={() => setOpen(true)}>
        Report this question
      </button>
    )
  }

  return (
    <div className="ll-flag-panel">
      <span className="ll-flag-title">What is wrong with it?</span>
      <div className="ll-flag-reasons" role="radiogroup" aria-label="What is wrong with this question">
        {REASONS.map((r) => (
          <button
            key={r.id}
            type="button"
            role="radio"
            aria-checked={reason === r.id}
            className="ll-flag-reason"
            onClick={() => { setReason(r.id); setError('') }}
          >
            {r.label}
          </button>
        ))}
      </div>
      <input
        type="text"
        className="ll-flag-note"
        value={note}
        maxLength={300}
        placeholder="Anything to add? (optional)"
        aria-label="Anything to add"
        onChange={(e) => setNote(e.target.value)}
      />
      {error && <p className="ll-flag-error" role="alert">{error}</p>}
      <div className="ll-flag-actions">
        <button type="button" className="btn-primary" onClick={send} disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send report'}
        </button>
        <button type="button" className="btn" onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </div>
  )
}
