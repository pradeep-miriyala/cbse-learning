// src/app/learning/cbse/page.tsx — Learning Lab home
import HomeView from '../HomeView'

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

export default function CbseHomePage() {
  return <HomeView />
}
