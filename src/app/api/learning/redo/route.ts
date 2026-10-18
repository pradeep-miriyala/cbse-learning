// src/app/api/learning/redo/route.ts
// "Fix my mistakes" — a new paper made only of the questions a learner missed
// or skipped on a scored paper.
//
// The missed set is read from the stored attempt, never from the client, so the
// request cannot be used to pull arbitrary questions out of the bank. It needs
// the human-check pass from an earlier paper (the learner has just sat one, so
// has it) and the same device that sat the original. Options are reshuffled, so
// a remembered position is no help — the answer has to be understood.

import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import {
  getLearningQuestionsCollection,
  getLearningPapersCollection,
  getLearningAttemptsCollection,
} from '@/lib/mongodb'
import {
  shuffle, sanitizeDeviceId, sanitizeLearnerName, learnerKey, canonicalArOrder,
  type AttemptItem, type LearningQuestion, type PaperQuestion,
} from '@/lib/learning'
import { verifyPass, issuePass } from '@/lib/captcha'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const fromPaper = String(body.paperId || '')
  const deviceId = sanitizeDeviceId(body.deviceId)
  if (!ObjectId.isValid(fromPaper)) {
    return NextResponse.json({ error: 'Unknown paper.' }, { status: 400 })
  }
  if (!verifyPass(body.pass)) {
    return NextResponse.json(
      { error: 'Please build a new paper from the start — the check needs answering again.', captchaFailed: true },
      { status: 400 },
    )
  }

  try {
    const attempts = await getLearningAttemptsCollection()
    const attempt = await attempts.findOne({ paperId: fromPaper })
    if (!attempt) return NextResponse.json({ error: 'That paper has not been marked.' }, { status: 404 })
    if (attempt.deviceId && attempt.deviceId !== deviceId) {
      return NextResponse.json({ error: 'Unknown paper.' }, { status: 404 })
    }

    const missed = (attempt.items as AttemptItem[] ?? []).filter((i) => !i.isCorrect).map((i) => i.qid)
    if (missed.length === 0) {
      return NextResponse.json({ error: 'Nothing to fix — every answer was right.' }, { status: 400 })
    }

    const col = await getLearningQuestionsCollection()
    const docs = (await col.find({ _id: { $in: missed.map((id) => new ObjectId(id)) } }).toArray()) as unknown as LearningQuestion[]
    if (docs.length === 0) {
      return NextResponse.json({ error: 'Those questions are no longer in the bank.' }, { status: 404 })
    }

    // A passage's questions travel together, as in any other paper.
    const blocks = new Map<string, LearningQuestion[]>()
    const loose: LearningQuestion[][] = []
    for (const q of docs) {
      if (q.passageId) {
        const b = blocks.get(q.passageId) ?? []
        b.push(q)
        blocks.set(q.passageId, b)
      } else loose.push([q])
    }
    const ordered = shuffle([...loose, ...[...blocks.values()].map((b) =>
      b.sort((x, y) => String(x._id).localeCompare(String(y._id))))]).flat()

    const items: { qid: string; order: number[] }[] = []
    const questions: PaperQuestion[] = []
    for (const q of ordered) {
      const qid = String(q._id)
      const order = canonicalArOrder(q.options) ?? shuffle(q.options.map((_, i) => i))
      items.push({ qid, order })
      questions.push({
        qid, topic: q.topic, topicLabel: q.topicLabel, question: q.question,
        options: order.map((i) => q.options[i]),
        visual: q.visual ?? null, imageSvg: q.imageSvg ?? null, imageUrl: q.imageUrl ?? null,
        passageId: q.passageId ?? null, passageTitle: q.passageTitle ?? null, passage: q.passage ?? null,
      })
    }

    const learnerName = sanitizeLearnerName(attempt.learnerName)
    const papers = await getLearningPapersCollection()
    const { insertedId } = await papers.insertOne({
      grade: attempt.grade, subject: attempt.subject, topics: attempt.topics,
      learnerName, deviceId,
      learnerKey: learnerKey({ deviceId, learnerName }),
      items,
      preset: null, difficultyAsked: null, difficultyAchieved: null,
      redoOf: fromPaper,
      hintsUsed: [],
      createdAt: new Date(),
      submittedAt: null,
    })

    return NextResponse.json({
      paperId: String(insertedId),
      grade: attempt.grade, subject: attempt.subject, topics: attempt.topics,
      learnerName, pass: issuePass(),
      questions,
    })
  } catch (err) {
    console.error('[learning/redo]', err)
    return NextResponse.json({ error: 'Could not build the paper.' }, { status: 500 })
  }
}
