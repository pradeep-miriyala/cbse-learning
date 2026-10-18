'use client'
// src/app/learning/FeedbackHub.tsx — one place to say anything.
//
// Feedback used to exist only at the end of a paper, so a problem found at any
// other moment had nowhere to go but an email to the portfolio. The three
// kinds route a note without anyone reading it first.

import { useState, type FormEvent } from 'react'
import Link from 'next/link'

const KINDS = [
  { id: 'broken',   title: 'Something is broken',     sub: 'A page that did not load, a button that did nothing.', ph: 'What happened, and on what screen?' },
  { id: 'question', title: 'A question looks wrong',  sub: 'A wrong answer, a confusing line, a missing picture.', ph: 'Which question? Say what it asked and what looks wrong.' },
  { id: 'idea',     title: 'I have an idea',          sub: 'Something that would make this easier or more useful.', ph: 'What would you like to see?' },
] as const

export default function FeedbackHub() {
  const [kind, setKind] = useState<(typeof KINDS)[number]['id'] | ''>('')
  const [message, setMessage] = useState('')
  const [where, setWhere] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const active = KINDS.find((k) => k.id === kind)

  async function send(e: FormEvent) {
    e.preventDefault()
    setSending(true); setError('')
    try {
      const res = await fetch('/api/learning/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, message, where, email, website }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Could not send that.')
      setSent(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="ll-wrap">
        <div className="ll-feedback">
          <span className="section-label">Thank you</span>
          <p className="ll-muted" style={{ marginTop: '0.75rem' }}>
            That has been sent and will be read. {email ? 'If a reply is needed, it will come to the address you gave.' : ''}
          </p>
          <p style={{ marginTop: '1.25rem' }}>
            <button type="button" className="btn" onClick={() => { setSent(false); setMessage(''); setWhere(''); setKind('') }}>
              Send another
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="ll-wrap">
      <div className="ll-fb-kinds" role="radiogroup" aria-label="What is this about?">
        {KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            role="radio"
            aria-checked={kind === k.id}
            className="ll-next-card ll-fb-kind"
            onClick={() => { setKind(k.id); setError('') }}
          >
            <span className="ll-next-title">{k.title}</span>
            <span className="ll-next-sub">{k.sub}</span>
          </button>
        ))}
      </div>

      {active && (
        <form className="ll-fb-form" onSubmit={send}>
          {kind === 'question' && (
            <p className="ll-muted" style={{ marginBottom: '0.75rem' }}>
              Tip: while you are in a paper, or reading your answers, <b>Report this question</b> sends it
              in one tap and tells us exactly which one.
            </p>
          )}
          <div className="ll-field" style={{ maxWidth: 'none' }}>
            <label htmlFor="fb-msg">Your note</label>
            <textarea
              id="fb-msg" required rows={5} maxLength={800} value={message}
              placeholder={active.ph}
              onChange={(e) => setMessage(e.target.value)}
              className="ll-fb-text"
            />
          </div>
          {kind === 'question' && (
            <div className="ll-field" style={{ maxWidth: 'none', marginTop: '0.9rem' }}>
              <label htmlFor="fb-where">Subject and topic (optional)</label>
              <input id="fb-where" type="text" maxLength={120} value={where}
                placeholder="e.g. Science · Magnets" onChange={(e) => setWhere(e.target.value)} />
            </div>
          )}
          <div className="ll-field" style={{ maxWidth: 'none', marginTop: '0.9rem' }}>
            <label htmlFor="fb-email">Email, only if you would like a reply (optional)</label>
            <input id="fb-email" type="email" maxLength={120} autoComplete="email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          {/* Honeypot: a real person never sees this. */}
          <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website}
            onChange={(e) => setWebsite(e.target.value)}
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

          {error && <p className="ll-error" role="alert">{error}</p>}
          <button type="submit" className="btn-primary" disabled={sending} style={{ marginTop: '1.1rem' }}>
            {sending ? 'Sending…' : 'Send'}
          </button>
        </form>
      )}

      <p className="ll-suggest" style={{ marginTop: '2rem' }}>
        <b>Teaching, or spotted a gap?</b> Parents and teachers can propose a whole question for the bank.{' '}
        <Link className="ll-suggest-link" href="/learning/suggest">Suggest a question</Link>
      </p>
    </div>
  )
}
