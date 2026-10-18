'use client'
// src/app/learning/HomeView.tsx — the front door.
//
// It answers "what should I do now?" before it offers the whole builder: pick
// up the unfinished paper, practise the topic that is going worst, or repeat the
// last kind of paper. Everything here is read from this device; a first-time
// visitor sees one big button instead.

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import ResumeCard from './ResumeCard'
import {
  PRACTICE_PATH, PROGRESS_PATH, getName, levelOf, loadHistory, loadLastRecipe, loadResult,
  loadTopicStats, practiceHref, resultPath, topicPct,
  type HistoryEntry, type Recipe, type TopicStat,
} from '@/lib/labClient'

export default function HomeView() {
  const [ready, setReady] = useState(false)
  const [name, setName] = useState('')
  const [stats, setStats] = useState<TopicStat[]>([])
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [last, setLast] = useState<Recipe | null>(null)

  useEffect(() => {
    setName(getName())
    setStats(loadTopicStats())
    setHistory(loadHistory())
    setLast(loadLastRecipe())
    setReady(true)
  }, [])

  // The topic most worth another go: lowest recent accuracy, among those not yet solid.
  const weakest = useMemo(
    () => stats
      .map((s) => ({ s, pct: topicPct(s) }))
      .filter((x) => levelOf(x.pct) !== 'solid')
      .sort((a, b) => a.pct - b.pct || b.s.papers - a.s.papers)[0] ?? null,
    [stats],
  )

  const subjects = useMemo(() => {
    const by = new Map<string, { label: string; c: number; t: number; topics: number }>()
    for (const s of stats) {
      const e = by.get(s.subject) ?? { label: s.subjectLabel, c: 0, t: 0, topics: 0 }
      for (const r of s.recent) { e.c += r.c; e.t += r.t }
      e.topics += 1
      by.set(s.subject, e)
    }
    return [...by.entries()].map(([key, v]) => ({ key, ...v, pct: v.t ? Math.round((v.c / v.t) * 100) : 0 }))
  }, [stats])

  const fresh = ready && history.length === 0

  return (
    <div className="ll-wrap">
      <h2 className="ll-home-hello">{name ? `Hello, ${name}` : 'Welcome'}</h2>
      <p className="ll-muted ll-home-sub">
        {fresh
          ? 'Free CBSE practice papers. Pick topics, answer, and see what to work on next. No sign-up.'
          : 'Here is where you left off.'}
      </p>

      <ResumeCard />

      {fresh && (
        <div className="ll-next-cards" style={{ marginTop: '1.5rem' }}>
          <Link href={PRACTICE_PATH} className="ll-next-card is-lead">
            <span className="ll-next-title">Start your first paper</span>
            <span className="ll-next-sub">Choose a subject and a few topics. It takes a minute to set up.</span>
          </Link>
        </div>
      )}

      {ready && !fresh && (
        <section className="ll-next">
          <span className="section-label">Do this next</span>
          <div className="ll-next-cards">
            {weakest && (
              <Link
                href={practiceHref({ grade: weakest.s.grade, subject: weakest.s.subject, topics: [weakest.s.slug] })}
                className="ll-next-card is-lead"
              >
                <span className="ll-next-title">Practise {weakest.s.label}</span>
                <span className="ll-next-sub">{weakest.s.subjectLabel} · {weakest.pct}% right lately. Your best chance to improve.</span>
              </Link>
            )}
            {last && (
              <Link href={practiceHref(last)} className="ll-next-card">
                <span className="ll-next-title">Another like your last paper</span>
                <span className="ll-next-sub">{last.subjectLabel} · {last.topicLabels.join(', ')}</span>
              </Link>
            )}
            <Link href={PRACTICE_PATH} className="ll-next-card">
              <span className="ll-next-title">Try something new</span>
              <span className="ll-next-sub">Build a paper from any subject and topics.</span>
            </Link>
          </div>
        </section>
      )}

      {subjects.length > 0 && (
        <section className="ll-home-block">
          <div className="ll-home-head">
            <span className="section-label">By subject</span>
            <Link href={PROGRESS_PATH} className="ll-home-more">All topics →</Link>
          </div>
          {subjects.map((s) => (
            <Link key={s.key} href={PROGRESS_PATH} className="ll-subj-row">
              <span className="ll-subj-name">{s.label}</span>
              <span className="ll-subj-bar"><span style={{ width: `${s.pct}%` }} /></span>
              <span className="ll-subj-pct">{s.pct}%</span>
            </Link>
          ))}
        </section>
      )}

      {history.length > 0 && (
        <section className="ll-home-block">
          <span className="section-label">Recent papers</span>
          <RecentList items={history.slice(0, 3)} />
        </section>
      )}
    </div>
  )
}

export function RecentList({ items }: { items: HistoryEntry[] }) {
  return (
    <div style={{ marginTop: '0.75rem' }}>
      {items.map((h, i) => {
        const row = (
          <>
            <span>
              {h.subjectLabel}{h.topicLabels.length > 0 && ` · ${h.topicLabels.join(', ')}`}
              <span className="ll-recent-date">
                {new Date(h.at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
            </span>
            <span className="ll-history-score">{h.score}/{h.total} ({h.pct}%)</span>
          </>
        )
        // The result is only kept for the last few papers; older rows are plain.
        return h.paperId && loadResult(h.paperId)
          ? <Link key={i} href={resultPath(h.paperId)} className="ll-history-row ll-history-link">{row}</Link>
          : <div key={i} className="ll-history-row">{row}</div>
      })}
    </div>
  )
}
