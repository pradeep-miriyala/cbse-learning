'use client'
// src/app/learning/PaceNote.tsx
// "That's enough for now, champ."
//
// Shown when a device has been going hard. It never blocks and never hides the
// button — a child who wants one more paper can have one. The point is that
// somebody says something, because an app that only ever says "go on then" is
// not neutral about how long a ten-year-old sits there.
//
// Dismissable, and it stays dismissed for a while: a warning that cannot be
// got rid of stops being read after the second time.

import { useEffect, useState } from 'react'

export type PaceLevel = 'ok' | 'nudge' | 'rest'

export interface Pace {
  level: PaceLevel
  papers1h: number
  questions1h: number
  questions2h: number
  sessionMin: number
}

const SNOOZE_KEY = 'll:pace-snoozed'
const SNOOZE_MS = 20 * 60 * 1000

function snoozed(): boolean {
  try {
    const until = Number(localStorage.getItem(SNOOZE_KEY) || 0)
    return Date.now() < until
  } catch { return false }
}

/** Plain counting, in the child's own terms. */
function say(p: Pace): { head: string; body: string } {
  const mins = p.sessionMin
  const hours = Math.floor(mins / 60)
  const spell = hours >= 1
    ? `${hours} hour${hours === 1 ? '' : 's'}${mins % 60 >= 10 ? ` and ${mins % 60} minutes` : ''}`
    : `${mins} minutes`

  if (p.level === 'rest') {
    return {
      head: 'That is enough for today, champ.',
      body: p.papers1h >= 8
        ? `That is ${p.papers1h} papers in an hour. Your brain files things away while you rest, `
          + 'not while you keep going — so stopping now is part of the work. Come back tomorrow '
          + 'and it will feel easier.'
        : p.questions2h >= 120
        ? `You have answered about ${p.questions2h} questions in two hours. That is a lot of `
          + 'thinking. Put it down, get some air, and let it settle.'
        : `You have been at this for ${spell}. Time to stop — go and do something else entirely.`,
    }
  }

  return {
    head: 'Time for a break, champ.',
    body: p.papers1h >= 5
      ? `That is ${p.papers1h} papers in an hour. Stretch your legs for ten minutes — you will `
        + 'get more right afterwards, honestly.'
      : p.questions2h >= 70
      ? `About ${p.questions2h} questions in two hours. Have a glass of water and a walk about `
        + 'before the next one.'
      : `You have been going ${spell}. A short break now beats pushing on tired.`,
  }
}

export default function PaceNote({ pace, onDismiss }: { pace: Pace | null; onDismiss?: () => void }) {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    setHidden(!pace || pace.level === 'ok' || snoozed())
  }, [pace])

  if (!pace || pace.level === 'ok' || hidden) return null

  const { head, body } = say(pace)

  return (
    <div className={`ll-pace ${pace.level === 'rest' ? 'is-rest' : ''}`} role="status">
      <span className="ll-pace-mark" aria-hidden="true">{pace.level === 'rest' ? '✋' : '⏸'}</span>
      <div className="ll-pace-body">
        <b>{head}</b>
        <p>{body}</p>
      </div>
      <button
        className="ll-pace-close"
        onClick={() => {
          try { localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_MS)) } catch {}
          setHidden(true)
          onDismiss?.()
        }}
      >
        Got it
      </button>
    </div>
  )
}
