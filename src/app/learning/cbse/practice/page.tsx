// src/app/learning/cbse/practice/page.tsx — build a paper
import PageHeader from '@/components/layout/PageHeader'
import LearningLab from '../../LearningLab'

export const metadata = {
  title: 'Practice',
  description:
    'Pick your topics and a fresh CBSE Class 6 practice paper is generated every time, scored instantly with teacher tips.',
  alternates: { canonical: '/learning/cbse/practice' },
}

export default function PracticePage() {
  return (
    <>
      <PageHeader
        kicker="Practice"
        title="Build a paper"
        dek="Choose a subject and topics. A fresh paper is generated every time."
      />
      <LearningLab />
    </>
  )
}
