'use client'
// src/components/layout/Nav.tsx — the site bar.
//
// Two shapes. Everywhere else it is the wordmark plus the menu: inline links on
// a wide screen, a hamburger drawer on a phone. While a paper is being sat it
// shrinks to a slim bar with a single way out, so nobody leaves a paper by
// brushing a menu. The portfolio holds the other learning links (LangPlay and
// so on).

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BUILDER_PATH, loadPaper } from '@/lib/labClient'

const SITE = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://pradeep.miriyala.in'

const LINKS: { href: string; label: string; external?: boolean; match: (p: string) => boolean }[] = [
  { href: BUILDER_PATH, label: 'Practice', match: (p) => p.startsWith(BUILDER_PATH) },
  { href: '/learning/suggest', label: 'Suggest a question', match: (p) => p.startsWith('/learning/suggest') },
  { href: `${SITE}/contact?re=learning`, label: 'Tell us what is broken', external: true, match: () => false },
]

/** /learning/cbse/paper/<id> — the paper itself, not its result. */
const PAPER_RE = /^\/learning\/cbse\/paper\/([^/]+)\/?$/

export default function Nav(_props: { active?: string }) {
  const pathname = usePathname() || ''
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Navigating closes the drawer; so does Escape (focus goes back to the button).
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const paper = PAPER_RE.exec(pathname)
  if (paper) {
    // Multiple-choice answers are saved as they are given, so leaving is safe.
    // The other kinds are not, and say so.
    const leave = (e: MouseEvent) => {
      const saved = loadPaper(paper[1])?.format ?? 'mcq'
      if (saved !== 'mcq' && !window.confirm('Leave this paper? This kind of paper cannot be saved, so you would start again.')) {
        e.preventDefault()
      }
    }
    return (
      <nav className="nav nav-slim" aria-label="Paper">
        <div className="nav-inner">
          <span className="nav-word">CBSE Learning Lab</span>
          <Link href={BUILDER_PATH} className="nav-exit" onClick={leave}>
            <span aria-hidden>✕</span> Save &amp; exit
          </Link>
        </div>
      </nav>
    )
  }

  return (
    <nav className="nav" aria-label="Learning Lab">
      <div className="nav-inner">
        <Link href={BUILDER_PATH} className="nav-word">CBSE Learning Lab</Link>

        <button
          ref={toggleRef}
          type="button"
          className="nav-burger"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden />
        </button>

        <div id="nav-menu" className={'nav-links' + (open ? ' is-open' : '')}>
          {LINKS.map((l) =>
            l.external ? (
              <a key={l.href} className="nav-link" href={l.href}>{l.label}</a>
            ) : (
              <Link
                key={l.href}
                className={'nav-link' + (l.match(pathname) ? ' active' : '')}
                href={l.href}
                aria-current={l.match(pathname) ? 'page' : undefined}
              >
                {l.label}
              </Link>
            ),
          )}
        </div>
      </div>
      {open && <button type="button" className="nav-scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </nav>
  )
}
