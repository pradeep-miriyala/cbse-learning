// src/app/learning/cbse/progress/page.tsx — how it is going, topic by topic
import PageHeader from '@/components/layout/PageHeader'
import ProgressView from '../../ProgressView'

export const metadata = { title: 'My progress', robots: { index: false } }

export default function ProgressPage() {
  return (
    <>
      <PageHeader
        kicker="My progress"
        title="How it is going"
        dek="Every topic you have practised. The ones needing work come first. It lives on this device only."
      />
      <ProgressView />
    </>
  )
}
