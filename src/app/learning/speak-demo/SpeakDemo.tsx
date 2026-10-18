'use client'
// src/app/learning/speak-demo/SpeakDemo.tsx
// Demo: answer by speaking or by typing, marked against a mark scheme.
//
// Nothing here is stored. No audio is uploaded or kept anywhere — the browser
// does the recognition and we hold the text in memory for the length of the
// session. That is a deliberate property, not an omission: these are children's
// voices, and the less that leaves the device the less there is to protect.
//
// ── One writer at a time ──
// The answer text has exactly one author at any moment, and the modes below
// exist to keep it that way:
//
//   choose   nothing is writing
//   speak    the recogniser owns the text; it cannot be edited while live
//   review   dictation is over and stopped dead; the child owns the text
//   type     the keyboard owns the text; the microphone is never started
//
// The first version let the recogniser and the child write to the same string
// at the same time, which needed a running "committed base" to keep the two
// from overwriting each other, and that bookkeeping is where the bugs lived.
// Modes remove the problem instead of managing it.

import { useCallback, useEffect, useRef, useState } from 'react'
import { markAnswer, readResults, joinTranscript, type MarkResult } from '@/lib/speaking'
import { BALANCED_DIET } from './questions'

type Mode = 'choose' | 'speak' | 'review' | 'type'
type Phase = 'answering' | 'marked'

/** Vendor-prefixed everywhere except the spec. */
function getRecogniser(): any {
  if (typeof window === 'undefined') return null
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null
}

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

const OPENING = { mode: 'choose' as Mode, transcript: '', interim: '' }

/* Inline SVG rather than an icon font: two glyphs do not justify a download,
   and these inherit colour from the button. */
const MicIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5V21M8.5 21h7" />
  </svg>
)

const KeyboardIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
  </svg>
)

export default function SpeakDemo() {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('answering')
  const [mode, setMode] = useState<Mode>('choose')
  const [transcript, setTranscript] = useState('')
  const [interim, setInterim] = useState('')
  const [micError, setMicError] = useState('')
  const [result, setResult] = useState<MarkResult | null>(null)
  const [disputed, setDisputed] = useState<Set<string>>(new Set())
  const [editing, setEditing] = useState<number | null>(null)
  const [draft, setDraft] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [supported, setSupported] = useState<boolean | null>(null)

  const recRef = useRef<any>(null)
  const wantRef = useRef(false)          // whether the child still means to be talking
  const baseRef = useRef('')             // text from recognition sessions already ended
  const sessionRef = useRef('')          // final text of the CURRENT session
  const committedRef = useRef(false)     // one commit per word edit, not one per blur
  const startRef = useRef<() => void>(() => {})
  const panelRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const q = BALANCED_DIET[idx]

  useEffect(() => { setSupported(!!getRecogniser()) }, [])

  // On a phone the marked result appears below the fold, and a child who does
  // not think to scroll simply never sees their score — the same way a learner
  // once reported a comprehension passage as "missing" when it was above the
  // question. Move them to whatever just changed.
  useEffect(() => {
    const target = phase === 'marked' ? resultRef.current : panelRef.current
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [phase, idx])

  // The clock runs while answering — pace is a real exam skill and costs nothing
  // to teach. It is shown, never enforced.
  useEffect(() => {
    if (phase !== 'answering') return
    const t = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [phase, idx])

  /**
   * Stop dictating, for good.
   *
   * The handlers are detached before stopping, not merely ignored: a recogniser
   * that fires one last time after the child has started correcting words would
   * write over the correction, which is the whole class of bug the modes are
   * here to prevent.
   */
  const stopDictating = useCallback((nextMode: Mode = 'review') => {
    wantRef.current = false
    const rec = recRef.current
    if (rec) {
      rec.onresult = null; rec.onend = null; rec.onerror = null
      try { rec.stop() } catch { /* already stopped */ }
    }
    recRef.current = null
    setInterim('')
    setMode(nextMode)
  }, [])

  const start = useCallback(() => {
    const SR = getRecogniser()
    if (!SR) { setSupported(false); return }
    setMicError('')

    const rec = new SR()
    rec.lang = 'en-IN'          // matters a great deal for Indian-English
    rec.continuous = true       // three sentences means pauses; do not cut them off
    rec.interimResults = true

    rec.onresult = (e: any) => {
      const { final, interim: live } = readResults(e.results)
      sessionRef.current = final
      setTranscript(joinTranscript(baseRef.current, final))
      setInterim(live)
    }

    rec.onerror = (e: any) => {
      // no-speech fires on any longer pause; not worth alarming a child over.
      if (e.error === 'no-speech') return
      wantRef.current = false
      setMicError(
        e.error === 'not-allowed'
          ? 'The microphone is blocked. Allow it in your browser, or go back and type instead.'
          : e.error === 'network'
          ? 'Speech recognition needs a connection. Go back and type your answer instead.'
          : 'The microphone stopped working. Go back and type your answer instead.',
      )
      setMode('review')
    }

    // Android in particular ends the session on every pause. Fold what was heard
    // into the committed text and start a NEW recogniser — a reused one can hand
    // back the previous session's results all over again.
    rec.onend = () => {
      setInterim('')
      baseRef.current = joinTranscript(baseRef.current, sessionRef.current)
      sessionRef.current = ''
      if (wantRef.current) startRef.current()
      else setMode('review')
    }

    recRef.current = rec
    wantRef.current = true
    try { rec.start() } catch { /* already running */ }
  }, [])

  useEffect(() => { startRef.current = start }, [start])
  useEffect(() => () => { wantRef.current = false; try { recRef.current?.stop() } catch {} }, [])

  function beginSpeaking() {
    baseRef.current = ''; sessionRef.current = ''
    setTranscript(''); setInterim(''); setMicError('')
    setMode('speak')
    start()
  }

  function check() {
    if (mode === 'speak') stopDictating('review')
    const r = markAnswer(q, transcript)
    setResult(r)
    setScores((s) => ({ ...s, [q.id]: r.score }))
    setPhase('marked')
  }

  function resetAnswer(nextMode: Mode) {
    wantRef.current = false
    const rec = recRef.current
    if (rec) { rec.onresult = null; rec.onend = null; rec.onerror = null; try { rec.stop() } catch {} }
    recRef.current = null
    baseRef.current = ''; sessionRef.current = ''
    setTranscript(''); setInterim(''); setMicError('')
    setEditing(null); setDraft('')
    setMode(nextMode)
  }

  function next() {
    resetAnswer(OPENING.mode)
    setIdx((i) => i + 1)
    setPhase('answering')
    setResult(null)
    setDisputed(new Set())
    setElapsed(0)
  }

  function openEditor(i: number, word: string) {
    committedRef.current = false
    setDraft(word)
    setEditing(i)
  }

  /**
   * Blur fires twice on this input — once when Enter commits, and again as React
   * unmounts it — and the second carries an empty value, which would delete the
   * word the child had just repaired. The guard makes an edit commit exactly
   * once. Escape sets it too, which is what makes Escape a cancel.
   */
  function commit(i: number) {
    if (committedRef.current) return
    committedRef.current = true
    replaceWord(i, draft)
  }

  /** An empty box deletes the word — how a child removes an invented one. */
  function replaceWord(i: number, value: string) {
    const clean = value.trim()
    setTranscript((prev) => {
      const words = prev ? prev.split(/\s+/) : []
      if (i >= words.length) return prev
      if (clean) words[i] = clean
      else words.splice(i, 1)
      return words.join(' ')
    })
    setEditing(null)
  }

  const words = transcript ? transcript.split(/\s+/) : []
  const done = idx >= BALANCED_DIET.length
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const totalOutOf = BALANCED_DIET.reduce((a, x) => a + x.keyPoints.length, 0)

  if (done) {
    return (
      <div className="sd-wrap">
        <div className="sd-panel">
          <p className="sd-kicker">Demo finished</p>
          <h2 className="sd-done-score">{totalScore} / {totalOutOf}</h2>
          <p className="sd-done-note">
            Five answers on Balanced Diet. Nothing was recorded or saved — the audio
            never left this device, and the text goes when you close the tab.
          </p>
          <button className="sd-btn sd-btn-primary" onClick={() => {
            resetAnswer(OPENING.mode)
            setIdx(0); setScores({}); setPhase('answering'); setResult(null); setElapsed(0)
          }}>
            Start again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="sd-wrap">
      <div className="sd-meta">
        <span>Question {idx + 1} of {BALANCED_DIET.length}</span>
        <span>{q.topicLabel}</span>
        <span className={elapsed > q.budgetSec ? 'sd-over' : ''}>
          {mmss(elapsed)} <span className="sd-dim">/ {mmss(q.budgetSec)}</span>
        </span>
      </div>

      <div className="sd-panel" ref={panelRef}>
        <p className="sd-kicker">{q.marks} marks · answer in about three sentences</p>
        <p className="sd-question">{q.question}</p>

        {phase === 'answering' && (
          <>
            {/* ── Pick one way in ── */}
            {/* Two icons on one line. The full-width cards these replaced ate
                most of a phone screen before the child had said anything. */}
            {mode === 'choose' && (
              <div className="sd-choose">
                <button className="sd-icon-btn" onClick={beginSpeaking}
                        disabled={supported === false}
                        aria-label="Speak my answer"
                        title={supported === false ? 'Not available in this browser' : 'Speak my answer'}>
                  <MicIcon />
                </button>
                <button className="sd-icon-btn" onClick={() => resetAnswer('type')}
                        aria-label="Type my answer" title="Type my answer">
                  <KeyboardIcon />
                </button>
                <span className="sd-choose-hint">
                  {supported === false
                    ? 'This browser cannot listen — tap the keyboard to type.'
                    : 'Tap the microphone to speak, or the keyboard to type.'}
                </span>
              </div>
            )}

            {/* ── Dictating: the recogniser owns the text ── */}
            {mode === 'speak' && (
              <>
                <div className="sd-choose">
                  <button className="sd-icon-btn is-live" onClick={() => stopDictating('review')}
                          aria-label="Stop recording">
                    <span className="sd-rec-dot" />
                  </button>
                  <span className="sd-choose-hint">Listening — tap the red dot when you have finished.</span>
                </div>
                <div className="sd-heard">
                  <p className="sd-heard-label">What we are hearing</p>
                  <p className="sd-live">
                    {transcript || <span className="sd-interim">Start speaking…</span>}
                    {interim && <span className="sd-interim"> {interim}</span>}
                  </p>
                </div>
                <p className="sd-note">You can fix any wrong words once you stop.</p>
              </>
            )}

            {/* ── Review: dictation is over, the child owns the text ── */}
            {mode === 'review' && (
              <>
                {micError && <p className="sd-error">{micError}</p>}
                {transcript ? (
                  <div className="sd-heard">
                    <p className="sd-heard-label">This is what we heard — tap any word to fix it</p>
                    <p className="sd-words">
                      {words.map((w, i) =>
                        editing === i ? (
                          <input
                            key={i}
                            className="sd-word-edit"
                            autoFocus
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onFocus={(e) => e.currentTarget.select()}
                            onBlur={() => commit(i)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') { e.preventDefault(); commit(i) }
                              if (e.key === 'Escape') { committedRef.current = true; setEditing(null) }
                            }}
                          />
                        ) : (
                          <button key={i} className="sd-word" onClick={() => openEditor(i, w)}>{w}</button>
                        ),
                      )}
                    </p>
                  </div>
                ) : (
                  <p className="sd-note">Nothing was heard. Try again, or type your answer.</p>
                )}
              </>
            )}

            {/* ── Typing: the keyboard owns the text, the microphone never starts ── */}
            {mode === 'type' && (
              <textarea
                className="sd-type"
                rows={5}
                autoFocus
                value={transcript}
                placeholder="Type your answer here…"
                onChange={(e) => setTranscript(e.target.value)}
              />
            )}

            {mode !== 'choose' && mode !== 'speak' && (
              <div className="sd-actions">
                <button className="sd-btn sd-btn-primary" disabled={!transcript.trim()} onClick={check}>
                  Check my answer
                </button>
                <button className="sd-btn" onClick={() => resetAnswer('choose')}>
                  Start this answer again
                </button>
              </div>
            )}
          </>
        )}

        {phase === 'marked' && result && (
          <div className="sd-result" ref={resultRef}>
            <p className="sd-score">
              {result.score} <span className="sd-dim">/ {result.outOf}</span>
            </p>

            <ul className="sd-points">
              {result.results.map((r) => {
                const claimed = disputed.has(r.point.id)
                return (
                  <li key={r.point.id} className={r.found ? 'is-found' : claimed ? 'is-claimed' : 'is-missed'}>
                    <span className="sd-tick">{r.found ? '✓' : claimed ? '!' : '✗'}</span>
                    <span className="sd-point-body">
                      <span className="sd-point-label">{r.point.label}</span>
                      {r.found && r.matched.length > 0 && (
                        <span className="sd-because">you said: {r.matched.join(', ')}</span>
                      )}
                      {!r.found && !claimed && (
                        // The only place a child's own judgement enters. It does not
                        // change the mark — it raises a flag for a person to look at,
                        // which is a far smaller trust surface than self-marking.
                        <button
                          className="sd-dispute"
                          onClick={() => setDisputed((d) => new Set(d).add(r.point.id))}
                        >
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
              <p>{q.modelAnswer}</p>
            </div>

            <div className="sd-actions">
              <button className="sd-btn sd-btn-primary" onClick={next}>
                {idx === BALANCED_DIET.length - 1 ? 'See my total' : 'Next question'}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="sd-privacy">
        Your voice is turned into text by your own browser. No recording is uploaded,
        and nothing here is saved.
      </p>
    </div>
  )
}
