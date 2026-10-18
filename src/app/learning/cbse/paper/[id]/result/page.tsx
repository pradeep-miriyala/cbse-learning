// src/app/learning/cbse/paper/[id]/result/page.tsx — the scored paper
import ResultSession from '../../../../ResultSession'

export const metadata = { title: 'Your result', robots: { index: false } }

export default function ResultPage() {
  return <ResultSession />
}
