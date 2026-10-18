// src/app/learning/suggest/page.tsx — suggest a question

import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/layout/PageHeader'
import SuggestForm from './SuggestForm'
import { SUGGEST_CSS } from './styles'

export const metadata = {
  title: 'Suggest a question — Learning Lab',
  description:
    'Parents and teachers can propose a question for the Class 6 practice bank. Every suggestion is read before it is used.',
  alternates: { canonical: '/learning/suggest' },
}

export default function SuggestPage() {
  return (
    <>
      <style>{SUGGEST_CSS}</style>
      <Nav active="learning" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader
          kicker="Learning Lab"
          title="Suggest a question"
          dek="If you teach, or you have watched a child struggle with something that is not here yet, send it over."
        />
        <SuggestForm />
      </div>

      <Footer />
    </>
  )
}
