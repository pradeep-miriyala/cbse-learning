// src/app/api/learning/career/unlock/route.ts
// Exchange an expert's code for an access pass cookie.
//
// Same shape as the draft workshop's unlock, and the same reticence: a wrong
// code and an unknown one return identical messages, so the endpoint cannot be
// used to discover who has been invited.

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getCareerExpertsCollection } from '@/lib/mongodb'
import {
  hashExpertCode,
  issueExpertPass,
  PASS_COOKIE,
  PASS_MAX_AGE,
} from '@/lib/careerGate'

export const dynamic = 'force-dynamic'

const Schema = z.object({ code: z.string().min(4).max(40) })

export async function POST(req: NextRequest) {
  const parsed = Schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Enter the code you were sent.' }, { status: 400 })
  }

  const experts = await getCareerExpertsCollection()
  const expert = await experts.findOne({
    codeHash: hashExpertCode(parsed.data.code),
    revoked: { $ne: true },
  })

  if (!expert) {
    return NextResponse.json({ error: "That code doesn't match." }, { status: 401 })
  }

  await experts.updateOne(
    { _id: expert._id },
    { $set: { lastSeenAt: new Date() }, $inc: { visits: 1 } },
  )

  const res = NextResponse.json({
    ok: true,
    name: expert.name,
    discipline: expert.discipline ?? '',
    canEdit: !!expert.canEdit,
  })
  res.cookies.set(PASS_COOKIE, issueExpertPass(expert._id.toString()), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: PASS_MAX_AGE,
  })
  return res
}
