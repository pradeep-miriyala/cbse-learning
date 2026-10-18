// src/app/api/learning/report/route.ts
// "Report this question" — a one-tap flag from the quiz or the answer review.
//
// The reason is a fixed list so reports can be counted per question; the note is
// optional. The question has to belong to the paper being reported from, so a
// stranger cannot flag arbitrary questions, and a paper can only file so many.

import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getLearningPapersCollection, getLearningReportsCollection } from '@/lib/mongodb'
import { checkHoneypot, checkContent } from '@/lib/spam'

export const dynamic = 'force-dynamic'

const REASONS = new Set(['wrong-answer', 'unclear', 'wrong-topic', 'missing-picture', 'other'])
/** Enough for a real problem paper; too few for a script. */
const MAX_PER_PAPER = 12

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!checkHoneypot(body.website)) return NextResponse.json({ success: true })

  const paperId = String(body.paperId || '')
  const qid = String(body.qid || '')
  const reason = String(body.reason || '')
  const note = String(body.note || '').trim().slice(0, 300)

  if (!ObjectId.isValid(paperId) || !ObjectId.isValid(qid)) {
    return NextResponse.json({ error: 'Unknown question.' }, { status: 400 })
  }
  if (!REASONS.has(reason)) {
    return NextResponse.json({ error: 'Please pick what is wrong.' }, { status: 400 })
  }
  if (note) {
    const check = checkContent(note)
    if (!check.clean) return NextResponse.json({ error: check.reason || 'Please reword that.' }, { status: 400 })
  }

  try {
    const papers = await getLearningPapersCollection()
    const paper = await papers.findOne({ _id: new ObjectId(paperId) })
    if (!paper || !paper.items?.some((i: { qid: string }) => i.qid === qid)) {
      return NextResponse.json({ error: 'Unknown question.' }, { status: 404 })
    }

    const col = await getLearningReportsCollection()
    const filed = await col.countDocuments({ paperId })
    const already = await col.findOne({ paperId, qid }, { projection: { _id: 1 } })
    if (!already && filed >= MAX_PER_PAPER) {
      return NextResponse.json({ error: 'That is plenty of reports for one paper — thank you.' }, { status: 429 })
    }

    // One report per question per paper; sending again changes the reason.
    await col.updateOne(
      { paperId, qid },
      {
        $set: {
          paperId, qid, reason, note,
          grade: paper.grade, subject: paper.subject,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date(), status: 'open' },
      },
      { upsert: true },
    )
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[learning/report]', err)
    return NextResponse.json({ error: 'Could not send that.' }, { status: 500 })
  }
}
