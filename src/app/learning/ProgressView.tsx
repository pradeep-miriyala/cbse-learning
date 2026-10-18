'use client'
// src/app/learning/ProgressView.tsx — the topic map.
//
// Each topic the learner has practised, with how it is going over the last few
// papers on it. Shaky ones come first within a subject, because that is where
// the next paper is most use. Everything is read from this device.

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { RecentList } from './HomeView'
import {
  PRACTICE_PATH, levelOf, loadHistory, loadTopicStats, practiceHref, topicPct,
  type HistoryEntry, type Level, type TopicStat,
} from '@/lib/labClient'

const LEVEL_LABEL: Record<Level, string> = { solid: 'Solid', growing: 'Getting there', shaky: 'Needs work' }

export default function ProgressView() {
  const [ready, setReady] = useState(false)
  const [stats, setStats] = useState<TopicStat[]>([])
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    setStats(loadTopicStats())
    setHistory(loadHistory())
    setReady(true)
  }, [])

  const rows = useMemo(() => stats.map((s) => ({ s, pct: topicPct(s) })), [stats])
  const counts = useMemo(() => {
    const c = { solid: 0, growing: 0, shaky: 0 }
    for (const r of rows) c[levelOf(r.pct)]++
    return c
  }, [rows])

  const bySubject = useMemo(() => {
    const m = new Map<string, { label: string; rows: typeof rows }>()
    for (const r of rows) {
      const e = m.get(r.s.subject) ?? { label: r.s.subjectLabel, rows: [] }
      e.rows.push(r)
      m.set(r.s.subject, e)
    }
    for (const e of m.values()) e.rows.sort((a, b) => a.pct - b.pct)
    return [...m.entries()]
  }, [rows])

  if (!ready) return <div className="ll-wrap"><p className="ll-muted">Loading…</p></div>

  if (rows.length === 0) {
    return (
      <div className="ll-wrap">
        <p className="ll-muted">
          Nothing here yet. Finish a multiple-choice paper and each topic in it will appear, with how it went.
        </p>
        <p style={{ marginTop: '1rem' }}><Link className="btn-primary" href={PRACTICE_PATH}>Build a paper</Link></p>
      </div>
    )
  }

  return (
    <div className="ll-wrap">
      <div className="ll-prog-summary" role="group" aria-label="Topics by level">
        {(['shaky', 'growing', 'solid'] as Level[]).map((l) => (
          <div key={l} className={'ll-prog-count is-' + l}>
            <b>{counts[l]}</b>
            <span>{LEVEL_LABEL[l]}</span>
          </div>
        ))}
      </div>

      {bySubject.map(([key, g]) => (
        <section key={key} className="ll-home-block">
          <span className="section-label">{g.label}</span>
          <div className="ll-prog-list">
            {g.rows.map(({ s, pct }) => {
              const lvl = levelOf(pct)
              return (
                <div key={s.slug} className="ll-prog-row">
                  <div className="ll-prog-main">
                    <span className="ll-prog-topic">{s.label}</span>
                    <span className="ll-prog-meta">
                      {s.papers} paper{s.papers === 1 ? '' : 's'} · last{' '}
                      {new Date(s.lastAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                    <span className={'ll-prog-bar is-' + lvl}><span style={{ width: `${pct}%` }} /></span>
                  </div>
                  <div className="ll-prog-side">
                    <span className={'ll-prog-pct is-' + lvl}>{pct}%</span>
                    <Link
                      className="ll-prog-go"
                      href={practiceHref({ grade: s.grade, subject: s.subject, topics: [s.slug] })}
                    >
                      Practise
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}

      {history.length > 0 && (
        <section className="ll-home-block">
          <span className="section-label">Recent papers</span>
          <RecentList items={history} />
        </section>
      )}
    </div>
  )
}
