// src/app/api/learning/hint/route.ts
// Serves one question's teacher tip on request, mid-paper.
//
// Hints are fetched here rather than shipped with the paper because 42% of them
// name the correct answer outright — sending them up front would put the answer
// key in the browser. Asking for one is recorded on the paper, so the review
// and the stats can show which questions needed help.

import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getLearningQuestionsCollection, getLearningPapersCollection } from '@/lib/mongodb'
import { hintBudgetFor } from '@/lib/learning'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const paperId = String(body.paperId || '')
  const qid = String(body.qid || '')

  if (!ObjectId.isValid(paperId) || !ObjectId.isValid(qid)) {
    return NextResponse.json({ error: 'Unknown question.' }, { status: 400 })
  }

  try {
    const papers = await getLearningPapersCollection()
    const paper = await papers.findOne({ _id: new ObjectId(paperId) })
    if (!paper) {
      return NextResponse.json({ error: 'This paper has expired.' }, { status: 404 })
    }
    if (paper.submittedAt) {
      return NextResponse.json({ error: 'This paper is already submitted.' }, { status: 409 })
    }
    // Only for questions actually on this paper — no fishing the bank for tips.
    if (!paper.items?.some((i: { qid: string }) => i.qid === qid)) {
      return NextResponse.json({ error: 'That question is not on this paper.' }, { status: 400 })
    }

    // The budget is enforced here, not only in the button. The client cap is
    // there so a learner can see what they are spending; this is what makes it
    // true. Without it the tips are an answer key for anyone who calls the
    // endpoint directly, and the hint count stored on the attempt — which the
    // review and the admin both report — would mean nothing.
    //
    // A question already hinted is free to ask for again: the paper records
    // hints per question, so re-reading one does not spend another.
    const used: string[] = Array.isArray(paper.hintsUsed) ? paper.hintsUsed : []
    const budget = hintBudgetFor(paper.items.length)
    if (!used.includes(qid) && used.length >= budget) {
      return NextResponse.json(
        { error: `You have used all ${budget} hint${budget === 1 ? '' : 's'} for this paper.`, exhausted: true },
        { status: 403 },
      )
    }

    const col = await getLearningQuestionsCollection()
    const q = await col.findOne({ _id: new ObjectId(qid) }, { projection: { hint: 1 } })
    if (!q?.hint) {
      return NextResponse.json({ error: 'No hint is available for this one.' }, { status: 404 })
    }

    await papers.updateOne({ _id: paper._id }, { $addToSet: { hintsUsed: qid } })

    return NextResponse.json({ hint: q.hint })
  } catch (err) {
    console.error('[learning/hint]', err)
    return NextResponse.json({ error: 'Could not fetch the hint.' }, { status: 500 })
  }
}
