'use client'
// src/app/learning/PaperSession.tsx
// /learning/cbse/paper/[id] — sitting one paper.
//
// The paper is a URL now, so a refresh, a crash or a bookmark lands back here.
// It is read from the device first (the questions as generated) and, for
// multiple-choice papers, from /api/learning/resume (which also carries the
// answers already given). On submit it files the result and moves to the
// result page; the paper itself is never shown again once scored.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import QuizRunner from './QuizRunner'
import SpokenRunner, { type SpokenPaperQuestion } from './SpokenRunner'
import MatchRunner, { type MatchPaperQuestion } from './MatchRunner'
import {
  BUILDER_PATH, clearActivePaper, getDeviceId, loadPaper, loadResult, pushHistory,
  resultPath, saveResult, type CachedPaper,
} from '@/lib/labClient'

type Phase = 'loading' | 'ready' | 'missing'

export default function PaperSession() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('loading')
  const [paper, setPaper] = useState<CachedPaper | null>(null)
  const [restored, setRestored] = useState<{ answers: Record<string, number>; index: number } | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const startedAt = useRef(Date.now())

  useEffect(() => {
    let cancelled = false
    const finish = (p: CachedPaper | null, r: typeof restored = null) => {
      if (cancelled) return
      if (!p) { setPhase('missing'); return }
      startedAt.current = p.startedAt || Date.now()
      setPaper(p); setRestored(r); setPhase('ready')
    }

    // Already scored on this device: go to the result instead of the paper.
    if (loadResult(id)) { router.replace(resultPath(id)); return }

    const cached = loadPaper(id)

    // Spoken and matching papers are not resumable server-side; the copy on
    // the device is all there is.
    if (cached && cached.format !== 'mcq') { finish(cached); return }

    fetch('/api/learning/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paperId: id, deviceId: getDeviceId() }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.resumable) {
          const topicLabels = [...new Set<string>(d.questions.map((q: any) => q.topicLabel))]
          // The server's copy of the questions is the truth for a paper begun.
          finish(
            cached ? { ...cached, questions: d.questions } : {
              paperId: id,
              format: 'mcq',
              marksTotal: 0,
              questions: d.questions,
              learnerName: d.learnerName || '',
              startedAt: d.startedAt ? new Date(d.startedAt).getTime() : Date.now(),
              recipe: {
                grade: d.grade, subject: d.subject, subjectLabel: d.subject,
                topics: d.topics, topicLabels, count: d.questions.length,
                preset: 'standard', format: 'mcq',
              },
            },
            { answers: d.answers || {}, index: d.atIndex || 0 },
          )
        } else {
          // Not resumable: submitted elsewhere, expired, or someone else's.
          finish(null)
        }
      })
      // Offline or the server is down: the copy on the device still works.
      .catch(() => finish(cached))

    return () => { cancelled = true }
  }, [id, router])

  async function send(payload: Record<string, unknown>) {
    if (!paper) return
    setBusy(true); setError('')
    try {
      const res = await fetch('/api/learning/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paperId: id, ...payload, durationMs: Date.now() - startedAt.current }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not score the paper.')

      saveResult(id, { data, recipe: paper.recipe, format: paper.format })
      pushHistory({
        at: new Date().toISOString(),
        subjectLabel: paper.recipe.subjectLabel,
        topicLabels: paper.recipe.topicLabels,
        score: data.score,
        total: data.total,
        pct: data.pct,
      })
      clearActivePaper()
      router.replace(resultPath(id))
    } catch (err: any) {
      setError(err.message)
      setBusy(false)
    }
  }

  function discard() {
    if (!window.confirm('Start over? This paper and your answers will be thrown away.')) return
    clearActivePaper()
    router.push(BUILDER_PATH)
  }

  if (phase === 'loading') {
    return <div className="ll-wrap"><p className="ll-muted">Opening your paper…</p></div>
  }

  if (phase === 'missing' || !paper) {
    return (
      <div className="ll-wrap">
        <p className="ll-error">
          This paper is not available any more — it may already be marked, or it has expired.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <Link className="btn-primary" href={BUILDER_PATH}>Build a new paper</Link>
        </p>
      </div>
    )
  }

  const name = paper.learnerName
  return (
    <div className="ll-wrap">
      {error && <p className="ll-error" role="alert">{error}</p>}
      {paper.format === 'match' ? (
        <MatchRunner
          questions={paper.questions as unknown as MatchPaperQuestion[]}
          marksTotal={paper.marksTotal}
          learnerName={name}
          submitting={busy}
          onSubmit={(m) => send({ matched: m })}
          onQuit={discard}
        />
      ) : paper.format === 'spoken' ? (
        <SpokenRunner
          questions={paper.questions as unknown as SpokenPaperQuestion[]}
          paperId={id}
          marksTotal={paper.marksTotal}
          learnerName={name}
          submitting={busy}
          onSubmit={(said) => send({ said })}
          onQuit={discard}
        />
      ) : (
        <QuizRunner
          questions={paper.questions}
          paperId={id}
          learnerName={name}
          submitting={busy}
          onSubmit={(answers) => send({ answers })}
          onQuit={discard}
          initialAnswers={restored?.answers}
          initialIndex={restored?.index}
          formatFractions={paper.recipe.subject === 'maths'}
        />
      )}
    </div>
  )
}
