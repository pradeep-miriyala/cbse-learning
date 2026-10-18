// src/app/api/learning/submit/route.ts
// Scores a paper server-side and returns the full review (correct answers +
// teacher tips) only once the learner has actually submitted.

import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import {
  getLearningQuestionsCollection,
  getLearningPapersCollection,
  getLearningAttemptsCollection,
} from '@/lib/mongodb'
import {
  scoreMessage,
  learnerKey,
  CONTINUITY_MIN_HISTORY,
  CONTINUITY_DROP_POINTS,
  type Continuity,
  type LearningQuestion,
  type AttemptItem,
} from '@/lib/learning'
import { markAnswer, type SpokenQuestion } from '@/lib/speaking'
import { markMatch } from '@/lib/matching'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const paperId = String(body.paperId || '')
  // { [qid]: displayed option index }
  const answers: Record<string, number> = body.answers && typeof body.answers === 'object' ? body.answers : {}
  // Spoken papers instead send { [qid]: what the learner said }.
  const said: Record<string, string> = body.said && typeof body.said === 'object' ? body.said : {}
  // Matching papers send { [qid]: { [leftItem]: chosenRightItem } }.
  const matched: Record<string, Record<string, string>> =
    body.matched && typeof body.matched === 'object' ? body.matched : {}
  const durationMs = Number.isFinite(Number(body.durationMs)) ? Number(body.durationMs) : null

  if (!ObjectId.isValid(paperId)) {
    return NextResponse.json({ error: 'Unknown paper.' }, { status: 400 })
  }

  try {
    const papers = await getLearningPapersCollection()
    const paper = await papers.findOne({ _id: new ObjectId(paperId) })
    if (!paper) {
      return NextResponse.json(
        { error: 'This paper has expired. Please start a new one.' },
        { status: 404 },
      )
    }

    const qCol = await getLearningQuestionsCollection()
    const ids = paper.items.map((i: { qid: string }) => new ObjectId(i.qid))
    const docs = await qCol.find({ _id: { $in: ids } }).toArray()
    const byId = new Map(docs.map((d) => [String(d._id), d as LearningQuestion]))

    // ── Matching papers ──
    // Marked per pair, not all-or-nothing: five of six right is not a failure,
    // and saying so is the difference between a question that teaches and one
    // that only judges.
    if (paper.format === 'match') {
      const items: AttemptItem[] = []
      const review: any[] = []
      const byTopic: Record<string, { label: string; correct: number; total: number }> = {}
      let earned = 0
      let outOf = 0

      paper.items.forEach((item: { qid: string }, idx: number) => {
        const q: any = byId.get(item.qid)
        if (!q) return

        const chosen = matched[item.qid] ?? {}
        const marked = markMatch({ pairs: q.pairs ?? [] }, chosen)
        earned += marked.score
        outOf += marked.outOf

        const t = (byTopic[q.topic] ??= { label: q.topicLabel, correct: 0, total: 0 })
        t.correct += marked.score
        t.total += marked.outOf

        items.push({
          qid: item.qid, topic: q.topic,
          difficulty: (q.difficulty as AttemptItem['difficulty']) ?? null,
          chosen: null, correct: 0,
          isCorrect: marked.score === marked.outOf,
          hinted: false,
        })

        review.push({
          number: idx + 1,
          topic: q.topic, topicLabel: q.topicLabel,
          question: q.question,
          passage: q.passage ?? null,
          passageTitle: q.passageTitle ?? null,
          marks: marked.score, outOf: marked.outOf,
          rows: marked.rows,
        })
      })

      const pct = outOf ? Math.round((earned / outOf) * 100) : 0
      const attempts = await getLearningAttemptsCollection()
      const { insertedId } = await attempts.insertOne({
        paperId,
        learnerName: paper.learnerName,
        deviceId: paper.deviceId ?? null,
        learnerKey: paper.learnerKey ?? learnerKey({
          deviceId: paper.deviceId, learnerName: paper.learnerName,
        }),
        grade: paper.grade, subject: paper.subject, topics: paper.topics,
        format: 'match',
        preset: null, difficultyAsked: null, difficultyAchieved: null,
        score: earned, total: outOf, pct,
        questionCount: review.length,
        byTopic, items,
        durationMs, hintsUsed: 0, flagged: false,
        createdAt: new Date(),
      })

      await papers.updateOne({ _id: paper._id }, { $set: { submittedAt: new Date() } })

      return NextResponse.json({
        attemptId: String(insertedId),
        learnerName: paper.learnerName,
        format: 'match',
        score: earned, total: outOf, pct,
        message: scoreMessage(pct),
        byTopic, review,
      })
    }

    // ── Spoken papers ──
    // Marked here rather than in the browser for the same reason MCQs are: the
    // mark scheme is the answer key, and it must not be sitting in the page
    // while the learner is still answering.
    if (paper.format === 'spoken') {
      const items: AttemptItem[] = []
      const review: any[] = []
      const byTopic: Record<string, { label: string; correct: number; total: number }> = {}
      let earned = 0
      let outOf = 0

      paper.items.forEach((item: { qid: string }, idx: number) => {
        const q: any = byId.get(item.qid)
        if (!q) return

        const transcript = String(said[item.qid] ?? '').slice(0, 4000)
        const scheme: SpokenQuestion = {
          id: item.qid, topic: q.topic, topicLabel: q.topicLabel,
          marks: q.marks ?? q.keyPoints?.length ?? 3,
          budgetSec: q.budgetSec ?? 90,
          question: q.question, modelAnswer: q.modelAnswer ?? '',
          keyPoints: q.keyPoints ?? [],
        }
        const marked = markAnswer(scheme, transcript)
        earned += marked.score
        outOf += marked.outOf

        const t = (byTopic[q.topic] ??= { label: q.topicLabel, correct: 0, total: 0 })
        t.correct += marked.score
        t.total += marked.outOf

        // A part-marked answer is neither right nor wrong. isCorrect records
        // only full marks, so it keeps meaning the same thing it does for an
        // MCQ; `earned` carries the partial credit.
        items.push({
          qid: item.qid, topic: q.topic,
          difficulty: (q.difficulty as AttemptItem['difficulty']) ?? null,
          chosen: null, correct: 0,
          isCorrect: marked.score === marked.outOf,
          hinted: false,
        })

        review.push({
          number: idx + 1,
          topic: q.topic, topicLabel: q.topicLabel,
          question: q.question,
          said: transcript,
          marks: marked.score, outOf: marked.outOf,
          points: marked.results.map((r) => ({
            id: r.point.id, label: r.point.label,
            found: r.found, matched: r.matched,
          })),
          modelAnswer: q.modelAnswer ?? '',
        })
      })

      const pct = outOf ? Math.round((earned / outOf) * 100) : 0
      const attempts = await getLearningAttemptsCollection()
      const { insertedId } = await attempts.insertOne({
        paperId,
        learnerName: paper.learnerName,
        deviceId: paper.deviceId ?? null,
        learnerKey: paper.learnerKey ?? learnerKey({
          deviceId: paper.deviceId, learnerName: paper.learnerName,
        }),
        grade: paper.grade, subject: paper.subject, topics: paper.topics,
        format: 'spoken',
        preset: null, difficultyAsked: null, difficultyAchieved: null,
        // score/total are marks here, not questions — format says which.
        score: earned, total: outOf, pct,
        questionCount: review.length,
        byTopic, items,
        durationMs, hintsUsed: 0, flagged: false,
        createdAt: new Date(),
      })

      await papers.updateOne({ _id: paper._id }, { $set: { submittedAt: new Date() } })

      return NextResponse.json({
        attemptId: String(insertedId),
        learnerName: paper.learnerName,
        format: 'spoken',
        score: earned, total: outOf, pct,
        message: scoreMessage(pct),
        byTopic, review,
      })
    }

    const hintsUsed: string[] = Array.isArray(paper.hintsUsed) ? paper.hintsUsed : []

    let correctCount = 0
    const byTopic: Record<string, { label: string; correct: number; total: number }> = {}
    const review: any[] = []
    const items: AttemptItem[] = []

    paper.items.forEach((item: { qid: string; order: number[] }, idx: number) => {
      const q = byId.get(item.qid)
      if (!q) return

      const shownOptions = item.order.map((i) => q.options[i])
      const correctShownIndex = item.order.indexOf(q.answer)

      const chosen = answers[item.qid]
      const hasAnswer = Number.isInteger(chosen) && chosen >= 0 && chosen < shownOptions.length
      const isCorrect = hasAnswer && chosen === correctShownIndex

      const t = (byTopic[q.topic] ??= { label: q.topicLabel, correct: 0, total: 0 })
      t.total++
      if (isCorrect) { correctCount++; t.correct++ }

      // Kept per question so a paper can be rebuilt after the paper document
      // itself expires, and so wrong answers can be counted per option. The
      // choice is translated out of the shuffled order the learner saw and back
      // into the question's stored order — otherwise "everyone picks the same
      // wrong option", the signal that a question is broken rather than merely
      // hard, would be scattered across four different indices.
      items.push({
        qid: item.qid,
        topic: q.topic,
        difficulty: (q.difficulty as AttemptItem['difficulty']) ?? null,
        chosen: hasAnswer ? item.order[chosen] : null,
        correct: q.answer,
        isCorrect,
        hinted: hintsUsed.includes(item.qid),
      })

      review.push({
        number: idx + 1,
        qid: item.qid,
        topic: q.topic,
        topicLabel: q.topicLabel,
        question: q.question,
        passageId: q.passageId ?? null,
        passageTitle: q.passageTitle ?? null,
        passage: q.passage ?? null,
        visual: q.visual ?? null,
        imageSvg: q.imageSvg ?? null,
        imageUrl: q.imageUrl ?? null,
        options: shownOptions,
        yourAnswer: hasAnswer ? shownOptions[chosen] : null,
        correctAnswer: shownOptions[correctShownIndex],
        isCorrect,
        hint: q.hint || '',
        usedHint: hintsUsed.includes(item.qid),
      })
    })

    const total = review.length
    const pct = total ? Math.round((correctCount / total) * 100) : 0

    const attempts = await getLearningAttemptsCollection()

    // Continuity: compare this result with the recent history of the same
    // device. A sharp drop prompts a friendly check rather than any block —
    // without accounts this can only ever be a nudge, not a control.
    let continuity: Continuity | null = null
    if (paper.deviceId) {
      const prior = await attempts
        .find({ deviceId: paper.deviceId })
        .sort({ createdAt: -1 })
        .limit(10)
        .project({ pct: 1, learnerName: 1 })
        .toArray()

      if (prior.length >= CONTINUITY_MIN_HISTORY) {
        const avg = Math.round(prior.reduce((s, a) => s + (a.pct ?? 0), 0) / prior.length)
        const best = Math.max(...prior.map((a) => a.pct ?? 0))
        const names: Record<string, number> = {}
        for (const a of prior) if (a.learnerName) names[a.learnerName] = (names[a.learnerName] || 0) + 1
        const usualName = Object.entries(names).sort((x, y) => y[1] - x[1])[0]?.[0] ?? null

        continuity = {
          flagged: avg - pct >= CONTINUITY_DROP_POINTS,
          priorAttempts: prior.length,
          priorAvgPct: avg,
          priorBestPct: best,
          usualName,
        }
      }
    }

    const { insertedId } = await attempts.insertOne({
      paperId,
      learnerName: paper.learnerName,
      deviceId: paper.deviceId ?? null,
      // One field for every per-learner query to group on, so adding accounts
      // later is a change to learnerKey() rather than to each aggregation.
      learnerKey: paper.learnerKey ?? learnerKey({
        deviceId: paper.deviceId, learnerName: paper.learnerName,
      }),
      grade: paper.grade,
      subject: paper.subject,
      topics: paper.topics,
      // Copied off the paper, which is deleted after two days. The attempt is
      // the durable record, so anything needed to explain a score must live
      // here and not only there.
      preset: paper.preset ?? null,
      difficultyAsked: paper.difficultyAsked ?? null,
      difficultyAchieved: paper.difficultyAchieved ?? null,
      score: correctCount,
      total,
      pct,
      byTopic,
      items,
      durationMs,
      hintsUsed: hintsUsed.length,
      flagged: continuity?.flagged ?? false,
      createdAt: new Date(),
    })

    await papers.updateOne({ _id: paper._id }, { $set: { submittedAt: new Date() } })

    return NextResponse.json({
      attemptId: String(insertedId),
      learnerName: paper.learnerName,
      score: correctCount,
      total,
      pct,
      message: scoreMessage(pct),
      byTopic,
      review,
      hintsUsed: hintsUsed.length,
      continuity,
    })
  } catch (err) {
    console.error('[learning/submit]', err)
    return NextResponse.json({ error: 'Could not score the paper.' }, { status: 500 })
  }
}
