// src/app/learning/speak-demo/page.tsx — spoken-answer demo
//
// Unlinked and unindexed: this is a sample to try on a phone and decide from,
// not a feature the Learning Lab offers yet.

import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/layout/PageHeader'
import SpeakDemo from './SpeakDemo'
import { SPEAK_CSS } from './styles'

export const metadata = {
  title: 'Speak your answer — demo',
  robots: { index: false, follow: false },
}

export default function SpeakDemoPage() {
  return (
    <>
      <style>{SPEAK_CSS}</style>
      <Nav active="learning" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader
          kicker="Learning Lab · demo"
          title="Speak your answer"
          dek="Five questions on Balanced Diet. Say your answer out loud — three sentences — and it is marked against the mark scheme."
        />

        <SpeakDemo />
      </div>

      <Footer />
    </>
  )
}
