// src/app/api/learning/generate/route.ts
// Builds one paper from a topic selection. The correct answers and hints are
// deliberately NOT part of the response — scoring happens in /submit, so the
// answer key never sits in the browser mid-test.

import { NextRequest, NextResponse } from 'next/server'
import { getLearningQuestionsCollection, getLearningPapersCollection } from '@/lib/mongodb'
import {
  MAX_TOPICS,
  MIN_PER_TOPIC,
  MAX_PAPER_LENGTH,
  PAPER_LENGTHS,
  DEFAULT_PAPER_LENGTH,
  minLengthFor,
  allocatePerTopic,
  sanitizeLearnerName,
  shuffle,
  sanitizeDeviceId,
  learnerKey,
  canonicalArOrder,
  MIN_PER_PASSAGE,
  allocateDifficulty,
  presetById,
  isFormat,
  minPerTopicFor,
  maxTopicsFor,
  minLengthForFormat,
  SPOKEN_PAPER_LENGTHS,
  SPOKEN_MAX_PAPER,
  DEFAULT_SPOKEN_LENGTH,
  SPOKEN_MIN_PER_TOPIC,
  SPOKEN_MIN_PAPER,
  MATCH_PAPER_LENGTHS,
  MATCH_MAX_PAPER,
  MATCH_MIN_PAPER,
  MATCH_MIN_PER_TOPIC,
  DEFAULT_MATCH_LENGTH,
  type PaperFormat,
  DIFFICULTIES,
  type Difficulty,
  type DifficultyMix,
  type LearningQuestion,
  type PaperQuestion,
} from '@/lib/learning'
import { verifyCaptcha, verifyPass, issuePass } from '@/lib/captcha'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const grade = Number(body.grade)
  const subject = String(body.subject || '')
  const topics: string[] = Array.isArray(body.topics)
    ? body.topics.map((t: unknown) => String(t)).filter(Boolean)
    : []
  const learnerName = sanitizeLearnerName(body.learnerName)

  const format: PaperFormat = isFormat(body.format) ? body.format : 'mcq'

  const requested = Number(body.count)
  const lengths: readonly number[] =
    format === 'spoken' ? SPOKEN_PAPER_LENGTHS
    : format === 'match' ? MATCH_PAPER_LENGTHS
    : PAPER_LENGTHS
  const asked = lengths.includes(requested)
    ? requested
    : format === 'spoken' ? DEFAULT_SPOKEN_LENGTH
    : format === 'match' ? DEFAULT_MATCH_LENGTH
    : DEFAULT_PAPER_LENGTH

  if (!Number.isFinite(grade) || !subject) {
    return NextResponse.json({ error: 'Pick a grade and subject.' }, { status: 400 })
  }
  if (topics.length === 0) {
    return NextResponse.json({ error: 'Pick at least one topic.' }, { status: 400 })
  }
  const maxTopics = maxTopicsFor(format)
  if (topics.length > maxTopics) {
    const per = minPerTopicFor(format)
    const cap = format === 'spoken' ? SPOKEN_MAX_PAPER
              : format === 'match' ? MATCH_MAX_PAPER : MAX_PAPER_LENGTH
    return NextResponse.json(
      {
        error: `Every topic needs at least ${per} questions, and a paper tops out at ` +
               `${cap}. That allows ${maxTopics} topics at most.`,
      },
      { status: 400 },
    )
  }

  // Each chosen topic must clear the floor, so the paper grows to fit the
  // selection rather than rejecting it.
  const cap = format === 'spoken' ? SPOKEN_MAX_PAPER
            : format === 'match' ? MATCH_MAX_PAPER : MAX_PAPER_LENGTH
  const count = Math.min(cap, Math.max(asked, minLengthForFormat(topics.length, format)))

  if (!learnerName) {
    return NextResponse.json({ error: 'Enter your first name to begin.' }, { status: 400 })
  }

  // Human check. An unexpired pass from an earlier solve stands in for the
  // challenge, so pressing "try a fresh paper" does not re-prompt.
  const hasPass = verifyPass(body.pass)
  if (!hasPass) {
    if (!verifyCaptcha(String(body.captchaToken || ''), body.captchaAnswer)) {
      return NextResponse.json(
        { error: 'That answer was not quite right. Try the new sum below.', captchaFailed: true },
        { status: 400 },
      )
    }
  }
  const pass = hasPass ? String(body.pass) : issuePass()

  const deviceId = sanitizeDeviceId(body.deviceId)
  const preset = presetById(body.preset)

  try {
    const col = await getLearningQuestionsCollection()
    // Spoken questions carry format:'spoken'; the thousands of multiple-choice
    // ones written before the field existed have no format at all, so an MCQ
    // paper asks for "not spoken" rather than "equals mcq".
    const base = {
      grade, subject, status: 'published' as const,
      format: format === 'mcq' ? { $nin: ['spoken', 'match'] } : format,
    }

    // How many questions exist per requested topic, split by difficulty.
    const counts = await col
      .aggregate<{ _id: { topic: string; difficulty: string }; n: number }>([
        { $match: { ...base, topic: { $in: topics } } },
        { $group: { _id: { topic: '$topic', difficulty: '$difficulty' }, n: { $sum: 1 } } },
      ])
      .toArray()

    const available: Record<string, number> = {}
    const byBand: Record<string, Partial<DifficultyMix>> = {}
    for (const c of counts) {
      const { topic, difficulty } = c._id
      available[topic] = (available[topic] ?? 0) + c.n
      // Anything unclassified counts as medium so it is never stranded.
      const band = (DIFFICULTIES as readonly string[]).includes(difficulty)
        ? (difficulty as Difficulty) : 'medium'
      byBand[topic] = { ...byBand[topic], [band]: (byBand[topic]?.[band] ?? 0) + c.n }
    }

    const totalAvailable = Object.values(available).reduce((a, b) => a + b, 0)
    if (totalAvailable === 0) {
      return NextResponse.json({ error: 'No questions found for that selection.' }, { status: 404 })
    }

    // ── Match-the-columns papers ──
    // Its own path for the same reason the spoken one has: no options to
    // shuffle, no difficulty banding, no passage grouping. What IS shuffled is
    // the right-hand column, per attempt, so the answer is never in a fixed
    // place — and the pairing itself never leaves the server.
    if (format === 'match') {
      const want = Math.min(count, totalAvailable)
      const alloc = allocatePerTopic(topics, available, want, MATCH_MIN_PER_TOPIC)

      const picked: LearningQuestion[] = []
      await Promise.all(topics.map(async (topic) => {
        const n = alloc[topic] ?? 0
        if (!n) return
        const docs = await col
          .aggregate<LearningQuestion>([{ $match: { ...base, topic } }, { $sample: { size: n } }])
          .toArray()
        picked.push(...docs)
      }))

      if (picked.length < MATCH_MIN_PAPER) {
        return NextResponse.json(
          {
            error: `A matching paper needs at least ${MATCH_MIN_PAPER} questions, and that ` +
                   `selection can only fill ${picked.length}. Pick another topic.`,
          },
          { status: 400 },
        )
      }

      const ordered = shuffle(picked)
      const marksTotal = ordered.reduce((sum, q: any) => sum + (q.pairs?.length ?? 0), 0)

      const papers = await getLearningPapersCollection()
      const { insertedId } = await papers.insertOne({
        grade, subject, topics, learnerName, deviceId,
        learnerKey: learnerKey({ deviceId, learnerName }),
        format: 'match',
        items: ordered.map((q) => ({ qid: String(q._id) })),
        marksTotal,
        preset: null, difficultyAsked: null, difficultyAchieved: null,
        hintsUsed: [],
        createdAt: new Date(),
        submittedAt: null,
      })

      return NextResponse.json({
        paperId: String(insertedId),
        grade, subject, topics, learnerName, pass,
        format: 'match',
        marksTotal,
        questions: ordered.map((q: any) => ({
          qid: String(q._id),
          topic: q.topic,
          topicLabel: q.topicLabel,
          question: q.question,
          passage: q.passage ?? null,
          passageTitle: q.passageTitle ?? null,
          // The left column in its authored order; the right column shuffled
          // and mixed with any decoys. Which right belongs to which left is not
          // in this response at all.
          lefts: (q.pairs ?? []).map((p: any) => p.left),
          rights: shuffle([
            ...(q.pairs ?? []).map((p: any) => p.right),
            ...(q.decoys ?? []),
          ]),
          marks: (q.pairs ?? []).length,
          budgetSec: q.budgetSec ?? 40 + (q.pairs ?? []).length * 15,
        })),
      })
    }

    // ── Spoken papers ──
    // A separate path rather than a branch woven through what follows. None of
    // the machinery below applies: there is no option order to shuffle, no
    // difficulty banding (a three-mark question is a three-mark question), and
    // no passages. Mixing the two would make both harder to read.
    if (format === 'spoken') {
      const want = Math.min(count, totalAvailable)
      const alloc = allocatePerTopic(topics, available, want, SPOKEN_MIN_PER_TOPIC)

      const picked: LearningQuestion[] = []
      await Promise.all(topics.map(async (topic) => {
        const n = alloc[topic] ?? 0
        if (!n) return
        const docs = await col
          .aggregate<LearningQuestion>([{ $match: { ...base, topic } }, { $sample: { size: n } }])
          .toArray()
        picked.push(...docs)
      }))

      if (picked.length < SPOKEN_MIN_PAPER) {
        return NextResponse.json(
          {
            error: `A spoken paper needs at least ${SPOKEN_MIN_PAPER} questions, and that ` +
                   `selection can only fill ${picked.length}. Pick another topic.`,
          },
          { status: 400 },
        )
      }

      const ordered = shuffle(picked)
      const papers = await getLearningPapersCollection()
      const { insertedId } = await papers.insertOne({
        grade, subject, topics, learnerName, deviceId,
        learnerKey: learnerKey({ deviceId, learnerName }),
        format: 'spoken',
        // No option order to record — a spoken answer is marked against a
        // scheme, not by position.
        items: ordered.map((q) => ({ qid: String(q._id) })),
        marksTotal: ordered.reduce((sum, q: any) => sum + (q.marks ?? 3), 0),
        preset: null, difficultyAsked: null, difficultyAchieved: null,
        hintsUsed: [],
        createdAt: new Date(),
        submittedAt: null,
      })

      return NextResponse.json({
        paperId: String(insertedId),
        grade, subject, topics, learnerName, pass,
        format: 'spoken',
        marksTotal: ordered.reduce((sum, q: any) => sum + (q.marks ?? 3), 0),
        // The mark scheme and the model answer stay on the server until the
        // paper is submitted, for the same reason the MCQ answer key does.
        questions: ordered.map((q: any) => ({
          qid: String(q._id),
          topic: q.topic,
          topicLabel: q.topicLabel,
          question: q.question,
          marks: q.marks ?? 3,
          budgetSec: q.budgetSec ?? (q.marks ?? 3) * 30,
        })),
      })
    }

    const alloc = allocatePerTopic(topics, available, Math.min(count, totalAvailable))

    // Reading comprehension breaks the assumption the rest of the generator
    // rests on: its questions are not independent. The cost of a question is
    // reading the passage, so passages are drawn whole rather than a question
    // at a time — ten comprehension questions means about three passages, not
    // ten. Difficulty banding is skipped for them, because a passage comes with
    // the mix of questions it was written with; the achieved mix is reported.
    const passageTopics = new Set<string>(
      await col.distinct('topic', { ...base, topic: { $in: topics }, passageId: { $nin: [null, ''] } }),
    )
    const plainTopics = topics.filter((t) => !passageTopics.has(t))

    const picked: LearningQuestion[] = []

    for (const topic of topics) {
      if (!passageTopics.has(topic)) continue
      const want = alloc[topic] ?? 0
      if (!want) continue

      const groups = await col
        .aggregate<{ _id: string; qs: LearningQuestion[] }>([
          { $match: { ...base, topic, passageId: { $nin: [null, ''] } } },
          { $group: { _id: '$passageId', qs: { $push: '$$ROOT' } } },
        ])
        .toArray()

      // A passage must be able to carry its own weight. The importer refuses a
      // set smaller than the floor, but a set can also shrink after import —
      // questions unpublished one at a time, or a passage started by hand in
      // the admin and not yet finished. Checked here so the rule holds however
      // the question got into the bank.
      const usable = groups.filter((g) => g.qs.length >= MIN_PER_PASSAGE)

      let taken = 0
      for (const g of shuffle(usable)) {
        const remaining = want - taken
        // Below the floor there is no honest way to use another passage: the
        // learner would read a whole text for one or two questions.
        if (remaining < MIN_PER_PASSAGE) break
        const qs = shuffle(g.qs).slice(0, Math.min(g.qs.length, remaining))
        // Selection is random; the order within a passage is not, so the set
        // still reads as a set rather than as a jumble.
        qs.sort((a, b) => String(a._id).localeCompare(String(b._id)))
        picked.push(...qs)
        taken += qs.length
      }
    }

    const byTopicBand = allocateDifficulty(
      Object.fromEntries(plainTopics.map((t) => [t, alloc[t] ?? 0])),
      byBand,
      preset.mix,
    )

    // Sample each topic-and-band separately, so repeat attempts stay fresh
    // while the requested mix is respected.
    await Promise.all(
      plainTopics.flatMap((topic) =>
        DIFFICULTIES.map(async (band) => {
          const n = byTopicBand[topic]?.[band] ?? 0
          if (!n) return
          const match: Record<string, unknown> = { ...base, topic, difficulty: band }
          // Unclassified questions ride along in the medium bucket.
          if (band === 'medium') {
            delete match.difficulty
            Object.assign(match, { $or: [{ difficulty: 'medium' }, { difficulty: { $exists: false } }] })
          }
          const docs = await col
            .aggregate<LearningQuestion>([{ $match: match }, { $sample: { size: n } }])
            .toArray()
          picked.push(...docs)
        }),
      ),
    )

    if (picked.length === 0) {
      return NextResponse.json({ error: 'No questions found for that selection.' }, { status: 404 })
    }

    // Shuffle question order, then option order per question. `order` maps the
    // displayed position back to the stored option index for scoring.
    //
    // Comprehension questions are shuffled as a block, never individually — a
    // passage's questions have to arrive together or the learner would be sent
    // back to re-read the same text at four separate points in the paper.
    const blocks = new Map<string, LearningQuestion[]>()
    const loose: LearningQuestion[][] = []
    for (const q of picked) {
      if (q.passageId) {
        const b = blocks.get(q.passageId) ?? []
        b.push(q)
        blocks.set(q.passageId, b)
      } else {
        loose.push([q])
      }
    }
    const ordered = shuffle([...loose, ...blocks.values()]).flat()

    const items: { qid: string; order: number[] }[] = []
    const clientQuestions: PaperQuestion[] = []

    for (const q of ordered) {
      const qid = String(q._id)
      // Assertion-and-reason verdicts keep the order every board paper uses;
      // everything else is shuffled so the key is never in a fixed place.
      const order = canonicalArOrder(q.options) ?? shuffle(q.options.map((_, i) => i))
      items.push({ qid, order })
      clientQuestions.push({
        qid,
        topic: q.topic,
        topicLabel: q.topicLabel,
        question: q.question,
        options: order.map((i) => q.options[i]),
        visual: q.visual ?? null,
        imageSvg: q.imageSvg ?? null,
        imageUrl: q.imageUrl ?? null,
        passageId: q.passageId ?? null,
        passageTitle: q.passageTitle ?? null,
        passage: q.passage ?? null,
      })
    }

    // What the paper actually contains. Where a topic had no hard questions
    // the mix will differ from the preset, and the learner is told rather than
    // quietly given something else.
    const achieved: DifficultyMix = { easy: 0, medium: 0, hard: 0 }
    for (const q of ordered) {
      const b = (DIFFICULTIES as readonly string[]).includes(String(q.difficulty))
        ? (q.difficulty as Difficulty) : 'medium'
      achieved[b]++
    }

    const papers = await getLearningPapersCollection()
    const { insertedId } = await papers.insertOne({
      grade,
      subject,
      topics,
      learnerName,
      deviceId,
      learnerKey: learnerKey({ deviceId, learnerName }),
      items,
      // Recorded because it is the largest single cause of a score swinging
      // between two papers by the same learner: Warm-up and Challenge are
      // different tests. Without it, a 100% followed by a 20% is unexplainable
      // after the fact.
      preset: preset.id,
      difficultyAsked: preset.mix,
      difficultyAchieved: achieved,
      hintsUsed: [],
      createdAt: new Date(),
      submittedAt: null,
    })

    return NextResponse.json({
      paperId: String(insertedId),
      grade,
      subject,
      topics,
      learnerName,
      pass,
      preset: preset.id,
      presetLabel: preset.label,
      difficulty: achieved,
      questions: clientQuestions,
    })
  } catch (err) {
    console.error('[learning/generate]', err)
    return NextResponse.json({ error: 'Could not build the paper.' }, { status: 500 })
  }
}
