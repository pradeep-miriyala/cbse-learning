// src/app/api/learning/heartbeat/route.ts
// A running paper tells the server it is still being worked on.
//
// Without this there is no honest way to say who is "live": a paper sits in the
// collection for two days whether the learner is still on it or shut the laptop
// after one question. The ping carries progress too, so the admin live view can
// show how far along someone is rather than just that they started.
//
// Deliberately unauthenticated and deliberately forgiving — it is called from a
// paper in progress, and a failure here must never interrupt an exam. The only
// thing it can write is progress on a paper that is already open.

import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getLearningPapersCollection } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

/** Keeps a stray or malicious ping from writing nonsense into the paper. */
const clampInt = (v: unknown, max: number) => {
  const n = Number(v)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(Math.floor(n), max))
}

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const paperId = String(body.paperId || '')
  if (!ObjectId.isValid(paperId)) return NextResponse.json({ ok: false }, { status: 400 })

  try {
    const papers = await getLearningPapersCollection()

    // Bounded by the paper's own length, so the progress shown in the admin can
    // never exceed the number of questions actually on it.
    const paper = await papers.findOne(
      { _id: new ObjectId(paperId), submittedAt: null },
      { projection: { items: 1, format: 1 } },
    )
    if (!paper) return NextResponse.json({ ok: true })

    const items: { qid: string; order: number[] }[] = Array.isArray(paper.items) ? paper.items : []
    const len = items.length

    // The answers so far, so the paper survives the browser.
    //
    // Until now they lived only in React state and reached the server once, at
    // submit — so a stray pull-to-refresh on a phone threw away everything the
    // child had done, and an abandoned paper could never be scored because
    // nobody knew what had been chosen. Sending them as they are picked costs
    // one small field on a ping that was already happening, and leaks nothing:
    // the client is reporting its own choices, and the answer key stays here.
    //
    // Every entry is checked against the paper rather than trusted: an unknown
    // qid, or an option index outside the range this learner was actually
    // shown, is dropped.
    const byQid = new Map(items.map((i) => [i.qid, i]))
    const answers: Record<string, number> = {}
    if (body.answers && typeof body.answers === 'object') {
      for (const [qid, raw] of Object.entries(body.answers).slice(0, len)) {
        const item = byQid.get(String(qid))
        if (!item) continue
        const n = Number(raw)
        if (!Number.isInteger(n) || n < 0 || n >= (item.order?.length ?? 0)) continue
        answers[String(qid)] = n
      }
    }

    // A spoken paper reports what was said instead of option indices. Same
    // reasoning as above: the text is going to the server at submit anyway, and
    // sending it as it is spoken means a refresh does not destroy the answer and
    // an abandoned paper can still be marked. Capped per answer so a stray ping
    // cannot grow the document without bound.
    const said: Record<string, string> = {}
    if (paper.format === 'spoken' && body.said && typeof body.said === 'object') {
      for (const [qid, raw] of Object.entries(body.said).slice(0, len)) {
        if (!byQid.has(String(qid))) continue
        said[String(qid)] = String(raw ?? '').slice(0, 4000)
      }
    }

    await papers.updateOne(
      { _id: paper._id, submittedAt: null },
      {
        $set: {
          lastSeenAt: new Date(),
          answered: clampInt(body.answered, len),
          atIndex: clampInt(body.index, Math.max(0, len - 1)),
          answers,
          ...(paper.format === 'spoken' ? { said } : {}),
        },
      },
    )

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[learning/heartbeat]', err)
    // Still a 200: the learner's paper does not depend on this succeeding.
    return NextResponse.json({ ok: false })
  }
}
