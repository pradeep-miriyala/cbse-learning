// src/app/learning/cbse/page.tsx — CBSE Learning (the Learning Lab)
import PageHeader from '@/components/layout/PageHeader'
import LearningLab from '../LearningLab'

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
      <PageHeader
        kicker="Parenting & Teaching"
        title="CBSE Learning"
        dek="Practice papers for CBSE students, generated afresh every time."
      />
      <LearningLab />
    </>
  )
}
