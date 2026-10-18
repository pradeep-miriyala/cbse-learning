'use client'
// src/app/learning/ResumeCard.tsx
// "Unfinished paper" — shown on the home screen and the builder, wherever a
// learner might otherwise start something new on top of it.

import { useRouter } from 'next/navigation'
import { paperPath } from '@/lib/labClient'
import { useResumable } from './useResumable'

export default function ResumeCard() {
  const router = useRouter()
  const { resumable, discard } = useResumable()
  if (!resumable) return null
  return (
    <div className="ll-resume">
      <span className="ll-resume-label">Unfinished paper</span>
      <p className="ll-resume-text">
        {resumable.learnerName ? `${resumable.learnerName}, you` : 'You'} have a paper
        still open — {Object.keys(resumable.answers || {}).length} of{' '}
        {resumable.questions.length} questions answered. Your answers were saved.
      </p>
      <div className="ll-resume-actions">
        <button type="button" className="btn-primary" onClick={() => router.push(paperPath(resumable.paperId))}>
          Continue that paper
        </button>
        <button type="button" className="btn" onClick={discard}>
          Start a new one
        </button>
      </div>
    </div>
  )
}
