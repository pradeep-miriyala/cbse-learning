'use client'
// src/app/learning/ResultSession.tsx
// /learning/cbse/paper/[id]/result — the scored paper.
//
// The result is read from the device, where the paper page filed it, so a
// refresh keeps it. "Try again" rebuilds a paper from the same recipe.

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import PaceNote, { type Pace } from './PaceNote'
import ResultPanel from './ResultPanel'
import SpokenResult, { type SpokenResultData } from './SpokenResult'
import MatchResult, { type MatchResultData } from './MatchResult'
import {
  BUILDER_PATH, getDeviceId, getName, getPass, loadResult, paperPath, requestPaper,
  storeGeneratedPaper, type CachedResult,
} from '@/lib/labClient'

export default function ResultSession() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [res, setRes] = useState<CachedResult | null | undefined>(undefined)
  const [pace, setPace] = useState<Pace | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { setRes(loadResult(id)) }, [id])

  const checkPace = useCallback(() => {
    const device = getDeviceId()
    if (!device) return
    fetch(`/api/learning/pace?deviceId=${encodeURIComponent(device)}`)
      .then((r) => r.json())
      .then(setPace)
      .catch(() => {})
  }, [])
  useEffect(() => { checkPace() }, [checkPace])

  async function retry() {
    if (!res || busy) return
    setBusy(true); setError('')
    try {
      const name = res.data.learnerName || getName()
      const { ok, data } = await requestPaper(res.recipe, name, { pass: getPass() || undefined })
      if (!ok) {
        throw new Error(
          data.captchaFailed
            ? 'Please build a new paper from the start — the check needs answering again.'
            : data.error || 'Could not build the paper.',
        )
      }
      storeGeneratedPaper(data, res.recipe, name)
      router.push(paperPath(data.paperId))
    } catch (err: any) {
      setError(err.message)
      setBusy(false)
    }
  }

  const newPaper = () => router.push(BUILDER_PATH)

  if (res === undefined) {
    return <div className="ll-wrap"><p className="ll-muted">Loading your result…</p></div>
  }

  if (res === null) {
    return (
      <div className="ll-wrap">
        <p className="ll-error">This result is no longer on this device.</p>
        <p style={{ marginTop: '1rem' }}>
          <Link className="btn-primary" href={BUILDER_PATH}>Build a new paper</Link>
        </p>
      </div>
    )
  }

  const { data, recipe, format } = res
  const common = { subjectLabel: recipe.subjectLabel, onRetry: retry, onNewPaper: newPaper }

  return (
    <div className="ll-wrap">
      <PaceNote pace={pace} />
      {error && <p className="ll-error" role="alert">{error}</p>}
      {format === 'match' ? (
        <MatchResult result={data as MatchResultData} {...common} />
      ) : format === 'spoken' ? (
        <SpokenResult result={data as SpokenResultData} {...common} />
      ) : (
        <ResultPanel result={data} {...common} formatFractions={recipe.subject === 'maths'} />
      )}
    </div>
  )
}
