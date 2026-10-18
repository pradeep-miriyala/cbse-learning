// src/app/learning/career-choices/page.tsx — Career Choices
//
// Nested under /learning rather than sitting at the root, so that when the
// learning side of the site becomes its own subsite the whole subtree moves as
// one and the URLs survive it.

import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/layout/PageHeader'
import CareerChoices from './CareerChoices'
import { CAREER_CSS } from './styles'

export const metadata = {
  title: 'Career Choices',
  // A private link under review. It should not be indexed, listed, or followed
  // until the cards have names on them.
  robots: { index: false, follow: false },
}

export default function CareerChoicesPage() {
  return (
    <>
      <style>{CAREER_CSS}</style>
      <Nav active="learning" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader
          kicker="Parenting & Teaching"
          title="Career Choices"
          dek="What the work is actually like, what it costs to get there, and how people pay for it."
        />

        <CareerChoices />
      </div>

      <Footer />
    </>
  )
}
