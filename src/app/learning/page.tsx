// src/app/learning/page.tsx — Learning: a short page that points to the two learning tools.
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/layout/PageHeader'

export const metadata = {
  title: 'Learning',
  description:
    'Two free learning tools built for my own children: CBSE practice papers, and LangPlay for learning to read and write Indian scripts.',
  alternates: { canonical: '/learning' },
  openGraph: {
    title: 'Learning — Pradeep Miriyala',
    description:
      'Free CBSE Class 6 practice papers, and LangPlay — learn to read and write Indian scripts by tracing letters.',
    url: '/learning',
  },
}

const TOOLS = [
  {
    tag: 'CBSE · Class 6',
    tagCls: 'tag-rust',
    title: 'CBSE Learning',
    desc: 'Free practice papers in English, Maths, Science and Social Science. Pick up to three topics and a fresh paper is generated every time, scored instantly with a teacher tip on every miss.',
    cta: 'Open CBSE Learning →',
    href: '/learning/cbse',
    external: false,
  },
  {
    tag: 'Indian scripts',
    tagCls: 'tag-teal',
    title: 'LangPlay',
    desc: 'Learn to read and write Indian scripts by tracing letters. Short, playful sessions for young learners, with matching games and habits that build up over time.',
    cta: 'Open LangPlay ↗',
    href: 'https://lang.miriyala.in',
    external: true,
  },
]

export default function LearningPage() {
  return (
    <>
      <Nav active="learning" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader
          kicker="Parenting & Teaching"
          title="Learning"
          dek="Two free tools I built for my own children, and now share with yours."
        />

        <div style={{ padding: '2.5rem var(--px) 3.5rem', maxWidth: 900 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {TOOLS.map(({ tag, tagCls, title, desc, cta, href, external }) => (
              <a key={title} href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="hover-bg-amber"
                style={{
                  display: 'block', padding: '1.5rem',
                  border: '1px solid var(--line)',
                  background: 'rgba(245,243,239,0.6)',
                  textDecoration: 'none', transition: 'background 0.2s',
                }}>
                <span className={`eyebrow ${tagCls}`}>{tag}</span>
                <h2 style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.2, color: 'var(--ink)', margin: '0.5rem 0 0.6rem' }}>
                  {title}
                </h2>
                <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.9rem', color: 'var(--ink-60)', lineHeight: 1.75, marginBottom: '1rem' }}>
                  {desc}
                </p>
                <span style={{ fontFamily: 'var(--f-ui)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                  {cta}
                </span>
              </a>
            ))}
          </div>

          <p style={{ fontFamily: 'var(--f-body)', fontSize: '0.85rem', color: 'var(--ink-60)', lineHeight: 1.75, marginTop: '2rem' }}>
            Both are free and need no sign-up. Something broken, or a topic you would like to see?{' '}
            <a href="https://pradeep.miriyala.in/contact?re=learning" className="link">Tell me</a>.
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}
