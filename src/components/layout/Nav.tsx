// src/components/layout/Nav.tsx — just the name. The site is the quiz; nothing else competes with it.
// The portfolio holds the other learning links (LangPlay and so on).

export default function Nav(_props: { active?: string }) {
  return (
    <nav className="nav" aria-label="Learning Lab">
      <div className="nav-inner">
        <a href="/learning/cbse" className="nav-word">CBSE Learning Lab</a>
      </div>
    </nav>
  )
}
