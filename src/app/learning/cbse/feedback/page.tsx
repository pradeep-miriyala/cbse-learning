// src/app/learning/cbse/feedback/page.tsx — tell us anything
import PageHeader from '@/components/layout/PageHeader'
import FeedbackHub from '../../FeedbackHub'

export const metadata = {
  title: 'Feedback',
  description: 'Something broken, a question that looks wrong, or an idea for the Learning Lab.',
  alternates: { canonical: '/learning/cbse/feedback' },
}

export default function FeedbackPage() {
  return (
    <>
      <PageHeader
        kicker="Feedback"
        title="Tell us anything"
        dek="Something broken, a question that looks wrong, or an idea. A real person reads every one."
      />
      <FeedbackHub />
    </>
  )
}
