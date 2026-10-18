'use client'
// src/app/learning/suggest/SuggestForm.tsx
// Where a parent or teacher proposes a question.
//
// Nothing typed here reaches a child. It waits in its own queue until it is
// read and approved, which is said plainly on the form — a contributor who
// thinks their question went live and cannot find it will assume the thing is
// broken.

import { useEffect, useState } from 'react'

type Format = 'mcq' | 'spoken'

const SUBJECTS = [
  ['english', 'English'],
  ['maths', 'Maths'],
  ['science', 'Science'],
  ['social-science', 'Social Science'],
  ['telugu', 'Telugu (తెలుగు)'],
] as const

export default function SuggestForm() {
  const [from, setFrom] = useState('')
  const [email, setEmail] = useState('')
  const [grade, setGrade] = useState('6')
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState('')
  const [format, setFormat] = useState<Format>('mcq')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [answer, setAnswer] = useState(0)
  const [modelAnswer, setModelAnswer] = useState('')
  const [note, setNote] = useState('')
  const [website, setWebsite] = useState('')      // honeypot

  const [captcha, setCaptcha] = useState<{ token: string; display: string } | null>(null)
  const [captchaAnswer, setCaptchaAnswer] = useState('')

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function loadCaptcha() {
    fetch('/api/learning/captcha')
      .then((r) => r.json())
      .then((d) => { setCaptcha(d); setCaptchaAnswer('') })
      .catch(() => {})
  }
  useEffect(loadCaptcha, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true); setError('')
    try {
      const res = await fetch('/api/learning/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from, email, grade: Number(grade), subject, topic, format,
          question, options: options.map((o) => o.trim()).filter(Boolean), answer,
          modelAnswer, note, website,
          captchaToken: captcha?.token, captchaAnswer,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.captchaFailed) loadCaptcha()
        throw new Error(data.error || 'Could not send that.')
      }
      setSent(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  function again() {
    setQuestion(''); setOptions(['', '', '', '']); setAnswer(0)
    setModelAnswer(''); setNote(''); setTopic('')
    setSent(false); setError(''); loadCaptcha()
  }

  if (sent) {
    return (
      <div className="sg-wrap">
        <div className="sg-panel">
          <h2 className="sg-thanks">Thank you.</h2>
          <p className="sg-note">
            Your question is in the queue. Every one is read before it goes anywhere near a
            paper, so it will not appear straight away — and if it does go in, it is credited
            to you.
          </p>
          <button className="sg-btn sg-btn-primary" onClick={again}>Suggest another</button>
        </div>
      </div>
    )
  }

  return (
    <form className="sg-wrap" onSubmit={submit}>
      <div className="sg-panel">
        <p className="sg-lede">
          Spotted a gap, or a question your child would find useful? Send it here. Nothing
          goes into a paper until it has been read and approved.
        </p>

        <div className="sg-row">
          <label className="sg-field">
            <span>Your name</span>
            <input value={from} onChange={(e) => setFrom(e.target.value)} required
                   placeholder="so the question can be credited" />
          </label>
          <label className="sg-field">
            <span>Email <em>(optional)</em></span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                   placeholder="only if you would like a reply" />
          </label>
        </div>

        <div className="sg-row">
          <label className="sg-field sg-narrow">
            <span>Class</span>
            <input type="number" min={1} max={12} value={grade}
                   onChange={(e) => setGrade(e.target.value)} required />
          </label>
          <label className="sg-field">
            <span>Subject</span>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} required>
              <option value="">Choose…</option>
              {SUBJECTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
          <label className="sg-field">
            <span>Topic <em>(if you know it)</em></span>
            <input value={topic} onChange={(e) => setTopic(e.target.value)}
                   placeholder="e.g. Balanced Diet" />
          </label>
        </div>

        <span className="sg-caps">What kind of question?</span>
        <div className="sg-formats">
          <button type="button" className={'sg-format' + (format === 'mcq' ? ' is-on' : '')}
                  onClick={() => setFormat('mcq')}>
            <b>Multiple choice</b><span>Four options, one right</span>
          </button>
          <button type="button" className={'sg-format' + (format === 'spoken' ? ' is-on' : '')}
                  onClick={() => setFormat('spoken')}>
            <b>3-mark answer</b><span>Answered in about three sentences</span>
          </button>
        </div>

        <label className="sg-field">
          <span>The question</span>
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} required
                    rows={3} placeholder="Write it as you would say it to a child." />
        </label>

        {format === 'mcq' ? (
          <>
            <span className="sg-caps">The options — tick the right one</span>
            {options.map((o, i) => (
              <label key={i} className="sg-option">
                <input type="radio" name="sg-answer" checked={answer === i}
                       onChange={() => setAnswer(i)} />
                <input className="sg-option-text" value={o}
                       onChange={(e) => setOptions((prev) => prev.map((x, n) => (n === i ? e.target.value : x)))}
                       placeholder={`Option ${i + 1}`} />
              </label>
            ))}
          </>
        ) : (
          <label className="sg-field">
            <span>The answer you would expect</span>
            <textarea value={modelAnswer} onChange={(e) => setModelAnswer(e.target.value)}
                      rows={4} required
                      placeholder="Three sentences that would earn full marks." />
          </label>
        )}

        <label className="sg-field">
          <span>Anything else <em>(optional)</em></span>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2}
                    placeholder="Where it comes from, why it matters, anything worth knowing." />
        </label>

        {/* Honeypot — hidden from people, tempting to a bot. */}
        <input type="text" name="website" value={website} tabIndex={-1} autoComplete="off"
               onChange={(e) => setWebsite(e.target.value)}
               style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
               aria-hidden="true" />

        {captcha && (
          <label className="sg-field sg-narrow">
            <span>{captcha.display}</span>
            <input value={captchaAnswer} onChange={(e) => setCaptchaAnswer(e.target.value)}
                   inputMode="numeric" required placeholder="?" />
          </label>
        )}

        {error && <p className="sg-error">{error}</p>}

        <button className="sg-btn sg-btn-primary" type="submit" disabled={sending}>
          {sending ? 'Sending…' : 'Send this question'}
        </button>
      </div>
    </form>
  )
}
