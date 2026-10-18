// src/app/api/learning/feedback/route.ts
// End-of-test feedback. Rating is the required part; the comment is optional
// and passes through the same content filter the comments system uses.

import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getLearningFeedbackCollection, getLearningAttemptsCollection } from '@/lib/mongodb'
import { checkHoneypot, checkContent } from '@/lib/spam'
import { sanitizeLearnerName } from '@/lib/learning'

export const dynamic = 'force-dynamic'

/** Fixed tags keep the signal analysable instead of free text only. */
const VALID_TAGS = new Set([
  'too-easy',
  'just-right',
  'too-hard',
  'confusing-wording',
  'learned-something',
  'want-more-questions',
])

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!checkHoneypot(body.website)) {
    // Silently accept so bots don't learn anything from the response.
    return NextResponse.json({ success: true })
  }

  const attemptId = String(body.attemptId || '')
  const rating = Number(body.rating)
  const comment = String(body.comment || '').trim().slice(0, 800)
  const tags: string[] = Array.isArray(body.tags)
    ? [...new Set(body.tags.map((t: unknown) => String(t)))]
        .filter((t): t is string => VALID_TAGS.has(t as string))
        .slice(0, 6)
    : []

  if (!ObjectId.isValid(attemptId)) {
    return NextResponse.json({ error: 'Unknown attempt.' }, { status: 400 })
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Please pick a rating from 1 to 5.' }, { status: 400 })
  }

  if (comment) {
    const check = checkContent(comment)
    if (!check.clean) {
      return NextResponse.json({ error: check.reason || 'Please reword that.' }, { status: 400 })
    }
  }

  try {
    const attempts = await getLearningAttemptsCollection()
    const attempt = await attempts.findOne({ _id: new ObjectId(attemptId) })
    if (!attempt) {
      return NextResponse.json({ error: 'Unknown attempt.' }, { status: 404 })
    }

    const col = await getLearningFeedbackCollection()

    // One feedback per attempt — resubmitting updates rather than piling up.
    await col.updateOne(
      { attemptId },
      {
        $set: {
          attemptId,
          paperId:     attempt.paperId,
          learnerName: sanitizeLearnerName(attempt.learnerName),
          grade:       attempt.grade,
          subject:     attempt.subject,
          topics:      attempt.topics,
          score:       attempt.score,
          total:       attempt.total,
          pct:         attempt.pct,
          rating,
          tags,
          comment,
          updatedAt:   new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true },
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[learning/feedback]', err)
    return NextResponse.json({ error: 'Could not save your feedback.' }, { status: 500 })
  }
}
