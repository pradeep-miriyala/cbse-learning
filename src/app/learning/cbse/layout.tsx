// src/app/learning/cbse/layout.tsx — the shell shared by the builder, a paper and its result.
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { LEARNING_CSS } from '../styles'
import { SPEAK_CSS } from '../speak-demo/styles'

export default function CbseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{LEARNING_CSS}</style>
      {/* Spoken papers use the same slate panel as the demo. */}
      <style>{SPEAK_CSS}</style>
      <Nav active="learning" />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      <Footer />
    </>
  )
}
