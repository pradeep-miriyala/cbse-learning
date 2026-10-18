'use client'
// src/app/learning/useResumable.ts
// An unfinished paper found on this device, offered back to the learner rather
// than resumed silently — they may well have meant to abandon it. The id is kept
// locally; the server decides whether it is still live and whether this device
// is the one that started it.

import { useEffect, useState } from 'react'
import { clearActivePaper, getActivePaper, getDeviceId } from '@/lib/labClient'

export interface Resumable {
  paperId: string
  answers: Record<string, number>
  questions: unknown[]
  learnerName: string
}

export function useResumable() {
  const [resumable, setResumable] = useState<Resumable | null>(null)

  useEffect(() => {
    const active = getActivePaper()
    if (!active) return
    fetch('/api/learning/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paperId: active, deviceId: getDeviceId() }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.resumable) setResumable(d)
        else clearActivePaper()
      })
      .catch(() => {})
  }, [])

  /** Let it go, and stop offering it. */
  function discard() {
    clearActivePaper()
    setResumable(null)
  }

  return { resumable, discard }
}
