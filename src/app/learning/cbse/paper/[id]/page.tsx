// src/app/learning/cbse/paper/[id]/page.tsx — one paper being sat
import PaperSession from '../../../PaperSession'

export const metadata = { title: 'Your paper', robots: { index: false } }

export default function PaperPage() {
  return <PaperSession />
}
