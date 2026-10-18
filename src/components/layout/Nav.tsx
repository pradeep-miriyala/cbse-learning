// src/components/layout/Nav.tsx — a slim bar for the lab. No client JS: the links simply wrap on a small screen.
// The portfolio is one link away; LangPlay and the topic form sit beside the lab.

const SITE = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://pradeep.miriyala.in'

const LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: 'CBSE Learning', href: '/learning/cbse' },
  { label: 'Career Choices', href: '/learning/career-choices' },
  { label: 'Suggest a topic', href: '/learning/suggest' },
  { label: 'LangPlay', href: 'https://lang.miriyala.in', external: true },
]

export default function Nav({ active }: { active?: string }) {
  return (
    <nav className="nav" aria-label="Learning Lab">
      <div className="nav-inner">
        <a href="/learning/cbse" className="nav-word">Learning Lab</a>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link${active === l.href ? ' active' : ''}`}
              {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {l.label}{l.external ? ' ↗' : ''}
            </a>
          ))}
          <a href={SITE} className="nav-link">pradeep.miriyala.in ↗</a>
        </div>
      </div>
    </nav>
  )
}
