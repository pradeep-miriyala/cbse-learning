// src/components/layout/Footer.tsx — one line. The portfolio keeps the long footer.

const SITE = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://pradeep.miriyala.in'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Pradeep Miriyala · Free, no sign-up</span>
        <span>
          <a href="/learning/cbse/feedback">Tell me what is broken</a>
          {' · '}
          <a href={SITE}>pradeep.miriyala.in</a>
        </span>
      </div>
    </footer>
  )
}
