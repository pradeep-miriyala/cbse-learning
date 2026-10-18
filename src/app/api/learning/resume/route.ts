// src/app/api/learning/resume/route.ts
// Hands an unfinished paper back to the learner who was sitting it.
//
// Papers already live server-side for two days and, since the heartbeat began
// carrying answers, they now hold the learner's choices too. So a refresh —
// the accidental pull-to-refresh that started this, but equally a crash, a
// flat battery, or iOS discarding a backgrounded tab — no longer has to cost
// the work.
//
// The reply is built exactly as /generate builds one: the questions in the
// order this learner saw them, the options in the order they were shuffled
// into, and no answer key. Scoring still happens only in /submit.

import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getLearningQuestionsCollection, getLearningPapersCollection } from '@/lib/mongodb'
import { sanitizeDeviceId, type LearningQuestion, type PaperQuestion } from '@/lib/learning'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const paperId = String(body.paperId || '')
  const deviceId = sanitizeDeviceId(body.deviceId)
  if (!ObjectId.isValid(paperId)) {
    return NextResponse.json({ resumable: false }, { status: 200 })
  }

  try {
    const papers = await getLearningPapersCollection()
    const paper = await papers.findOne({ _id: new ObjectId(paperId), submittedAt: null })

    // Nothing to resume is a normal answer, not an error: the paper may have
    // been submitted from another tab, or aged past its two-day life.
    if (!paper) return NextResponse.json({ resumable: false })

    // The caller must be the device that started it. Knowing a paper id is not
    // enough — otherwise a guessed id would hand someone another child's paper.
    if (paper.deviceId && paper.deviceId !== deviceId) {
      return NextResponse.json({ resumable: false })
    }

    // Spoken and matching papers do not keep answers server-side, and their
    // questions are not the multiple-choice shape built below.
    if (paper.format === 'spoken' || paper.format === 'match') {
      return NextResponse.json({ resumable: false })
    }

    const col = await getLearningQuestionsCollection()
    const items: { qid: string; order: number[] }[] = paper.items ?? []
    const docs = await col.find({ _id: { $in: items.map((i) => new ObjectId(i.qid)) } }).toArray()
    const byId = new Map(docs.map((d) => [String(d._id), d as LearningQuestion]))

    const questions: PaperQuestion[] = []
    for (const item of items) {
      const q = byId.get(item.qid)
      // A question deleted from the bank since the paper was built would leave
      // a hole; the paper is rebuilt without it rather than failing outright.
      if (!q) continue
      questions.push({
        qid: item.qid,
        topic: q.topic,
        topicLabel: q.topicLabel,
        question: q.question,
        options: item.order.map((i) => q.options[i]),
        visual: q.visual ?? null,
        imageSvg: q.imageSvg ?? null,
        imageUrl: q.imageUrl ?? null,
        passageId: q.passageId ?? null,
        passageTitle: q.passageTitle ?? null,
        passage: q.passage ?? null,
      })
    }

    if (questions.length === 0) return NextResponse.json({ resumable: false })

    return NextResponse.json({
      resumable: true,
      paperId: String(paper._id),
      grade: paper.grade,
      subject: paper.subject,
      topics: paper.topics ?? [],
      learnerName: paper.learnerName ?? '',
      questions,
      // What the learner had already chosen, keyed the same way the client
      // keeps it: question id to the option position they were shown.
      answers: paper.answers && typeof paper.answers === 'object' ? paper.answers : {},
      atIndex: Number.isInteger(paper.atIndex) ? paper.atIndex : 0,
      startedAt: paper.createdAt ?? null,
      hintsUsed: Array.isArray(paper.hintsUsed) ? paper.hintsUsed.length : 0,
    })
  } catch (err) {
    console.error('[learning/resume]', err)
    return NextResponse.json({ resumable: false }, { status: 200 })
  }
}
