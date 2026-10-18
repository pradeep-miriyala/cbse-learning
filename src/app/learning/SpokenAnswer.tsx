'use client'
// src/app/learning/SpokenAnswer.tsx
// Answering ONE spoken question: choose the microphone or the keyboard, say or
// type it, then repair any word that was misheard.
//
// Extracted so the demo and a real paper share it. The recogniser handling here
// is the part that took several attempts to get right on Android, and two
// copies of it would drift.
//
// ── One writer at a time ──
// The answer text has exactly one author at any moment:
//
//   choose   nothing is writing
//   speak    the recogniser owns the text; it cannot be edited while live
//   review   dictation is stopped dead; the child owns the text
//   type     the keyboard owns the text; the microphone never starts
//
// An earlier version let the recogniser and the child write to the same string
// at once, which needed a running "committed base" to referee them. That
// bookkeeping is where the bugs lived; modes remove the problem instead.

import { useCallback, useEffect, useRef, useState } from 'react'
import { readResults, joinTranscript } from '@/lib/speaking'

export type SpokenMode = 'choose' | 'speak' | 'review' | 'type'

/** Vendor-prefixed everywhere except the spec. */
export function getRecogniser(): any {
  if (typeof window === 'undefined') return null
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null
}

/* Inline SVG rather than an icon font: two glyphs do not justify a download,
   and these inherit colour from the button. */
export const MicIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5V21M8.5 21h7" />
  </svg>
)

export const KeyboardIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
  </svg>
)

export default function SpokenAnswer({
  questionKey,
  text,
  onText,
}: {
  /** Changing this resets everything — a new question starts blank. */
  questionKey: string
  text: string
  onText: (t: string) => void
}) {
  const [mode, setMode] = useState<SpokenMode>('choose')
  const [interim, setInterim] = useState('')
  const [micError, setMicError] = useState('')
  const [editing, setEditing] = useState<number | null>(null)
  const [draft, setDraft] = useState('')
  const [supported, setSupported] = useState<boolean | null>(null)

  const recRef = useRef<any>(null)
  const wantRef = useRef(false)          // whether the child still means to be talking
  const baseRef = useRef('')             // text from recognition sessions already ended
  const sessionRef = useRef('')          // final text of the CURRENT session
  const committedRef = useRef(false)     // one commit per word edit, not one per blur
  const startRef = useRef<() => void>(() => {})
  const onTextRef = useRef(onText)

  useEffect(() => { onTextRef.current = onText }, [onText])
  useEffect(() => { setSupported(!!getRecogniser()) }, [])

  /**
   * Stop dictating, for good.
   *
   * The handlers are detached before stopping, not merely ignored: a recogniser
   * that fires once more after the child has started correcting words would
   * write over the correction, which is the whole class of bug the modes exist
   * to prevent.
   */
  const stopDictating = useCallback((next: SpokenMode = 'review') => {
    wantRef.current = false
    const rec = recRef.current
    if (rec) {
      rec.onresult = null; rec.onend = null; rec.onerror = null
      try { rec.stop() } catch { /* already stopped */ }
    }
    recRef.current = null
    setInterim('')
    setMode(next)
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
      onTextRef.current(joinTranscript(baseRef.current, final))
      setInterim(live)
    }

    rec.onerror = (e: any) => {
      if (e.error === 'no-speech') return   // any longer pause fires this
      wantRef.current = false
      setMicError(
        e.error === 'not-allowed'
          ? 'The microphone is blocked. Allow it, or use the keyboard instead.'
          : e.error === 'network'
          ? 'Speech recognition needs a connection. Use the keyboard instead.'
          : 'The microphone stopped working. Use the keyboard instead.',
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

  // A new question starts from nothing, with the microphone shut down.
  useEffect(() => {
    wantRef.current = false
    const rec = recRef.current
    if (rec) { rec.onresult = null; rec.onend = null; rec.onerror = null; try { rec.stop() } catch {} }
    recRef.current = null
    baseRef.current = ''; sessionRef.current = ''
    setMode('choose'); setInterim(''); setMicError('')
    setEditing(null); setDraft('')
  }, [questionKey])

  useEffect(() => () => { wantRef.current = false; try { recRef.current?.stop() } catch {} }, [])

  function beginSpeaking() {
    baseRef.current = ''; sessionRef.current = ''
    onTextRef.current(''); setInterim(''); setMicError('')
    setMode('speak')
    start()
  }

  function beginTyping() {
    stopDictating('type')
    baseRef.current = ''; sessionRef.current = ''
    onTextRef.current('')
  }

  function openEditor(i: number, word: string) {
    committedRef.current = false
    setDraft(word)
    setEditing(i)
  }

  /**
   * Blur fires twice on this input — once when Enter commits, and again as React
   * unmounts it — and the second carries an empty value, which would delete the
   * word just repaired. The guard makes an edit commit exactly once; Escape
   * sets it too, which is what makes Escape a cancel.
   */
  function commit(i: number) {
    if (committedRef.current) return
    committedRef.current = true
    const clean = draft.trim()
    const words = text ? text.split(/\s+/) : []
    if (i >= words.length) { setEditing(null); return }
    if (clean) words[i] = clean
    else words.splice(i, 1)          // an empty box deletes an invented word
    const next = words.join(' ')
    baseRef.current = next
    sessionRef.current = ''
    onTextRef.current(next)
    setEditing(null)
  }

  const words = text ? text.split(/\s+/) : []

  return (
    <>
      {mode === 'choose' && (
        <div className="sd-choose">
          <button className="sd-icon-btn" onClick={beginSpeaking} disabled={supported === false}
                  aria-label="Speak my answer"
                  title={supported === false ? 'Not available in this browser' : 'Speak my answer'}>
            <MicIcon />
          </button>
          <button className="sd-icon-btn" onClick={beginTyping}
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
              {text || <span className="sd-interim">Start speaking…</span>}
              {interim && <span className="sd-interim"> {interim}</span>}
            </p>
          </div>
          <p className="sd-note">You can fix any wrong words once you stop.</p>
        </>
      )}

      {mode === 'review' && (
        <>
          {micError && <p className="sd-error">{micError}</p>}
          {text ? (
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
            <p className="sd-note">Nothing was heard. Try again, or use the keyboard.</p>
          )}
          <div className="sd-choose" style={{ marginTop: '0.9rem' }}>
            <button className="sd-icon-btn" onClick={beginSpeaking} disabled={supported === false}
                    aria-label="Speak again" title="Speak again"><MicIcon /></button>
            <button className="sd-icon-btn" onClick={beginTyping}
                    aria-label="Type instead" title="Type instead"><KeyboardIcon /></button>
            <span className="sd-choose-hint">Start again with the microphone, or switch to the keyboard.</span>
          </div>
        </>
      )}

      {mode === 'type' && (
        <textarea
          className="sd-type"
          rows={5}
          autoFocus
          value={text}
          placeholder="Type your answer here…"
          onChange={(e) => {
            onTextRef.current(e.target.value)
            baseRef.current = e.target.value
            sessionRef.current = ''
          }}
        />
      )}
    </>
  )
}
