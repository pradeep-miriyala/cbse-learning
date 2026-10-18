// src/app/learning/cbse/page.tsx — CBSE Learning (the Learning Lab)
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/layout/PageHeader'
import LearningLab from '../LearningLab'
import { LEARNING_CSS } from '../styles'
import { SPEAK_CSS } from '../speak-demo/styles'

export const metadata = {
  title: 'CBSE Learning',
  description:
    'Free CBSE Class 6 practice papers in English, Maths, Science and Social Science. Pick your topics and a fresh paper is generated every time.',
  alternates: { canonical: '/learning/cbse' },
  openGraph: {
    title: 'CBSE Learning — Pradeep Miriyala',
    description:
      'Free CBSE Class 6 practice papers. Pick up to three topics and get a fresh paper, scored instantly with teacher tips.',
    url: '/learning/cbse',
  },
}

export default function CbseLearningPage() {
  return (
    <>
      <style>{LEARNING_CSS}</style>
      {/* Spoken papers use the same slate panel as the demo. */}
      <style>{SPEAK_CSS}</style>
      <Nav active="learning" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader
          kicker="Parenting & Teaching"
          title="CBSE Learning"
          dek="Practice papers for CBSE students, generated afresh every time."
        />

        <LearningLab />
      </div>

      <Footer />
    </>
  )
}
