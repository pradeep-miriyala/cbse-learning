// src/app/api/learning/pace/route.ts
// How hard this device has been going, so the Lab can say "that is enough for
// now" instead of cheerfully handing out a fourteenth paper.
//
// A nudge, never a block. A child who wants one more paper can have one — the
// point is that nobody is telling them to stop, and an app that only ever says
// "go on then" is not neutral about that.
//
// Thresholds are set against what the bank has actually seen rather than what
// sounds sensible: the busiest hour on record is 13 papers and 135 questions
// from one child, with several others in the 5 to 7 range. So five is where a
// word is worth saying and eight is where it is worth saying firmly.

import { NextRequest, NextResponse } from 'next/server'
import { getLearningAttemptsCollection } from '@/lib/mongodb'
import { sanitizeDeviceId } from '@/lib/learning'

export const dynamic = 'force-dynamic'

const HOUR = 60 * 60 * 1000

/** A gap longer than this ends a sitting; anything less is the same stretch. */
const SESSION_GAP_MS = 20 * 60 * 1000

export type PaceLevel = 'ok' | 'nudge' | 'rest'

export async function GET(req: NextRequest) {
  const deviceId = sanitizeDeviceId(req.nextUrl.searchParams.get('deviceId'))
  if (!deviceId) return NextResponse.json({ level: 'ok' as PaceLevel })

  try {
    const col = await getLearningAttemptsCollection()
    const now = Date.now()

    const recent = await col
      .find({ deviceId, createdAt: { $gte: new Date(now - 4 * HOUR) } })
      .project({ createdAt: 1, total: 1, questionCount: 1, format: 1, durationMs: 1 })
      .sort({ createdAt: -1 })
      .limit(80)
      .toArray()

    // `total` is marks on a spoken paper and questions on a multiple-choice
    // one, so questionCount is preferred where it exists — otherwise a spoken
    // paper would count triple.
    const questionsOf = (a: any) =>
      Number(a.questionCount ?? (a.format === 'spoken' ? Math.round((a.total ?? 0) / 3) : a.total)) || 0

    const within = (ms: number) => recent.filter((a: any) => now - new Date(a.createdAt).getTime() <= ms)

    const lastHour = within(HOUR)
    const lastTwo = within(2 * HOUR)

    const papers1h = lastHour.length
    const questions1h = lastHour.reduce((n, a) => n + questionsOf(a), 0)
    const questions2h = lastTwo.reduce((n, a) => n + questionsOf(a), 0)

    // How long this sitting has run: walk back while the gaps stay small.
    let sessionStart = recent[0] ? new Date(recent[0].createdAt).getTime() : now
    for (let i = 1; i < recent.length; i++) {
      const prev = new Date(recent[i - 1].createdAt).getTime()
      const cur = new Date(recent[i].createdAt).getTime()
      if (prev - cur > SESSION_GAP_MS) break
      sessionStart = cur
    }
    const sessionMin = recent.length ? Math.round((now - sessionStart) / 60000) : 0

    let level: PaceLevel = 'ok'
    if (papers1h >= 8 || questions2h >= 120 || sessionMin >= 90) level = 'rest'
    else if (papers1h >= 5 || questions2h >= 70 || sessionMin >= 45) level = 'nudge'

    return NextResponse.json({
      level, papers1h, questions1h, questions2h, sessionMin,
    })
  } catch (err) {
    console.error('[learning/pace]', err)
    // Never let this get in the way of a paper.
    return NextResponse.json({ level: 'ok' as PaceLevel })
  }
}
