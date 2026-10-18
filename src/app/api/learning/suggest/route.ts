// src/app/api/learning/suggest/route.ts
// A parent or teacher proposing a question.
//
// This writes to its own collection, never to the bank. Nothing typed by a
// stranger belongs in the collection papers are drawn from, however it is
// flagged — a suggestion becomes a question only when it is approved, and
// approval writes a fresh document through the admin's own path.

import { NextRequest, NextResponse } from 'next/server'
import { getLearningSuggestionsCollection } from '@/lib/mongodb'
import { checkHoneypot, checkContent } from '@/lib/spam'
import { sanitizeLearnerName } from '@/lib/learning'
import { verifyCaptcha, verifyPass } from '@/lib/captcha'

export const dynamic = 'force-dynamic'

const MAX_PER_DAY = 20

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Silently accept so a bot learns nothing from the response.
  if (!checkHoneypot(body.website)) return NextResponse.json({ success: true })

  // The same human check the papers use.
  if (!verifyPass(body.pass) && !verifyCaptcha(String(body.captchaToken || ''), body.captchaAnswer)) {
    return NextResponse.json(
      { error: 'That answer was not quite right. Try the new sum below.', captchaFailed: true },
      { status: 400 },
    )
  }

  const from = sanitizeLearnerName(body.from) || ''
  const email = String(body.email || '').trim().slice(0, 120)
  const grade = Number(body.grade)
  const subject = String(body.subject || '').trim().slice(0, 40)
  const topic = String(body.topic || '').trim().slice(0, 80)
  const format = body.format === 'spoken' ? 'spoken' : 'mcq'
  const question = String(body.question || '').trim().slice(0, 600)
  const note = String(body.note || '').trim().slice(0, 600)

  const options: string[] = Array.isArray(body.options)
    ? body.options.map((o: unknown) => String(o).trim().slice(0, 200)).filter(Boolean).slice(0, 6)
    : []
  const answer = Number(body.answer)
  const modelAnswer = String(body.modelAnswer || '').trim().slice(0, 1200)

  if (!from) return NextResponse.json({ error: 'Please add your name.' }, { status: 400 })
  if (!question) return NextResponse.json({ error: 'Please write the question.' }, { status: 400 })
  if (!Number.isFinite(grade)) return NextResponse.json({ error: 'Pick a class.' }, { status: 400 })
  if (!subject) return NextResponse.json({ error: 'Pick a subject.' }, { status: 400 })

  if (format === 'mcq') {
    if (options.length < 2) {
      return NextResponse.json({ error: 'A multiple-choice question needs at least two options.' }, { status: 400 })
    }
    if (!Number.isInteger(answer) || answer < 0 || answer >= options.length) {
      return NextResponse.json({ error: 'Mark which option is the right one.' }, { status: 400 })
    }
    const lowered = options.map((o) => o.toLowerCase())
    if (new Set(lowered).size !== lowered.length) {
      return NextResponse.json({ error: 'Two of those options are the same.' }, { status: 400 })
    }
  } else if (!modelAnswer) {
    return NextResponse.json({ error: 'Please write the answer you would expect.' }, { status: 400 })
  }

  // The same filter the comments run through.
  for (const text of [question, modelAnswer, note, ...options]) {
    if (!text) continue
    const check = checkContent(text)
    if (!check.clean) {
      return NextResponse.json({ error: check.reason || 'Please reword that.' }, { status: 400 })
    }
  }

  try {
    const col = await getLearningSuggestionsCollection()

    // A soft daily cap. Not security — a bored person with a script gets past
    // it — but it keeps one enthusiastic afternoon from burying the queue.
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const recent = await col.countDocuments({ from, createdAt: { $gte: since } })
    if (recent >= MAX_PER_DAY) {
      return NextResponse.json(
        { error: `That is ${MAX_PER_DAY} suggestions today — thank you. Do come back tomorrow.` },
        { status: 429 },
      )
    }

    await col.insertOne({
      from, email,
      grade, subject, topic,
      format,
      question,
      options: format === 'mcq' ? options : [],
      answer: format === 'mcq' ? answer : null,
      modelAnswer: format === 'spoken' ? modelAnswer : '',
      note,
      status: 'pending',
      createdAt: new Date(),
      reviewedAt: null,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[learning/suggest]', err)
    return NextResponse.json({ error: 'Could not save that. Please try again.' }, { status: 500 })
  }
}
