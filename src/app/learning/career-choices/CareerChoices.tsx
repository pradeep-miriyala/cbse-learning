'use client'
// src/app/learning/career-choices/CareerChoices.tsx
// Gate → age → paper → result.
//
// The gate is first because this is a private link during the pilot and only
// invited experts should be through it at all. The age question is second and
// is asked plainly rather than inferred: below fifteen the stream decision is
// years away, and a career label is a thing a child carries around rather than
// uses. Turning somebody away is the right answer there, not adapting the paper.

import { useState, useEffect } from 'react'
import PaperRunner, { type Item } from './PaperRunner'
import ResultPanel, { type Result } from './ResultPanel'

const MIN_AGE = 15

type Stage = 'locked' | 'age' | 'too-young' | 'paper' | 'result'

export default function CareerChoices() {
  const [stage, setStage] = useState<Stage>('locked')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const [expertName, setExpertName] = useState<string | null>(null)
  const [sections, setSections] = useState<{ id: string; title: string; intro: string }[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [personas, setPersonas] = useState<{ key: string; label: string; tests: string }[]>([])

  // A pass already in the cookie jar should not make somebody type their code
  // again — the gate is on being invited, not on each visit.
  useEffect(() => { void loadPaper(true) }, [])

  async function loadPaper(silent = false) {
    const res = await fetch('/api/learning/career/paper')
    if (!res.ok) {
      if (!silent) setError('That code does not match.')
      return false
    }
    const data = await res.json()
    setSections(data.sections)
    setItems(data.items)
    setExpertName(data.expert?.name ?? null)
    setStage('age')
    void fetch('/api/learning/career/personas')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setPersonas(d.personas))
      .catch(() => {})
    return true
  }

  /**
   * Run one of the fixed calibration profiles instead of answering.
   *
   * Every expert rates the same twelve, which is the only way disagreement
   * between them means anything — and it saves each reviewer twenty minutes of
   * pretending to be a fifteen-year-old they have to invent first.
   */
  async function runPersona(key: string) {
    setBusy(true)
    const res = await fetch(`/api/learning/career/personas?key=${encodeURIComponent(key)}`)
    setBusy(false)
    if (!res.ok) { setError('Could not run that one.'); return }
    setResult(await res.json())
    setStage('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function unlock(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setError('')
    const res = await fetch('/api/learning/career/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setError(body.error || 'That code does not match.')
      setBusy(false)
      return
    }
    await loadPaper()
    setBusy(false)
  }

  async function submit(answers: Record<string, number>, durationMs: number) {
    setBusy(true)
    const res = await fetch('/api/learning/career/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, durationMs }),
    })
    setBusy(false)
    if (!res.ok) {
      setError('Something went wrong working that out. Try again.')
      return
    }
    setResult(await res.json())
    setStage('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (stage === 'locked') {
    return (
      <div className="cc-wrap">
        <form className="cc-gate" onSubmit={unlock}>
          <h2>This one is not open yet</h2>
          <p>
            Career Choices is being checked by people who actually do these jobs
            before it goes anywhere near a student. If you were sent a code, it goes
            here.
          </p>
          <div className="cc-field">
            <label className="cc-label" htmlFor="cc-code">Your code</label>
            <input
              id="cc-code" className="cc-input" value={code} autoComplete="off"
              placeholder="XXXX-XXXX"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          {error && <p className="cc-err">{error}</p>}
          <button type="submit" className="cc-btn" disabled={busy || code.length < 4}>
            {busy ? 'Checking…' : 'Open'}
          </button>
        </form>
      </div>
    )
  }

  if (stage === 'age') {
    return (
      <div className="cc-wrap">
        <div className="cc-gate">
          <h2>Before you start</h2>
          <p>
            This paper is written for students of {MIN_AGE} and above — around Class 10
            onwards, when choosing a stream is either close or already done. Below that
            it would be handing you a label years before you could use it, which is not
            a good trade.
          </p>
          <p>It takes about twenty minutes. There are no right answers anywhere in it.</p>
          <div className="cc-rate-row">
            <button type="button" className="cc-btn" onClick={() => setStage('paper')}>
              I am {MIN_AGE} or older
            </button>
            <button type="button" className="cc-btn cc-btn-ghost"
              onClick={() => setStage('too-young')}>
              I am younger than that
            </button>
          </div>

          {personas.length > 0 && (
            <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
              <div className="cc-label" style={{ marginBottom: '0.5rem' }}>
                Or review a standard profile
              </div>
              <p className="cc-footnote" style={{ marginBottom: '1rem' }}>
                Every reviewer sees the same twelve, so that where you disagree with
                another expert, the disagreement can actually be read. These are
                weighted toward the awkward cases rather than the obvious ones.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {personas.map((p) => (
                  <button key={p.key} type="button" className="cc-option"
                    disabled={busy} onClick={() => runPersona(p.key)}>
                    <strong>{p.label}</strong>
                    <div className="cc-footnote" style={{ marginTop: '0.25rem' }}>{p.tests}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (stage === 'too-young') {
    return (
      <div className="cc-wrap">
        <div className="cc-gate">
          <h2>Come back in a couple of years</h2>
          <p>
            Not because you would not manage it — because what it produces is only
            useful once a stream choice is actually near, and what you enjoy at
            thirteen changes a great deal before then.
          </p>
          <p>
            The <a href="/learning/cbse">Learning Lab</a> is the part of this site meant for
            now.
          </p>
        </div>
      </div>
    )
  }

  if (stage === 'result' && result) {
    return (
      <div className="cc-wrap">
        <ResultPanel
          result={result}
          expertName={expertName}
          onRestart={() => { setResult(null); setStage('age') }}
        />
      </div>
    )
  }

  return (
    <div className="cc-wrap">
      {error && <p className="cc-err">{error}</p>}
      <PaperRunner sections={sections} items={items} onDone={submit} busy={busy} />
    </div>
  )
}
