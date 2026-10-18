// src/app/api/learning/career/submit/route.ts
// Turn a completed paper into a profile and a result.
//
// This runs on the server because the role cards, their filters and the ordering
// rules are the product — a client holding all of them could be read to work out
// what to answer in order to be told it should be a doctor.

import { NextRequest, NextResponse } from 'next/server'
import { getCareerItemsCollection, getCareerAttemptsCollection } from '@/lib/mongodb'
import { resolveExpert } from '@/lib/careerGate'
import { buildResult } from '@/lib/careerResult'
import {
  buildProfile,
  visibilityFilter,
  sanitizeName,
  type CareerItem,
} from '@/lib/career'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const expert = await resolveExpert()
  if (!expert) return NextResponse.json({ error: 'Locked.' }, { status: 401 })

  const body = await req.json().catch(() => null)
  if (!body || typeof body.answers !== 'object') {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 })
  }

  const answers: Record<string, number> = {}
  for (const [k, v] of Object.entries(body.answers as Record<string, unknown>)) {
    if (Number.isInteger(v)) answers[String(k).slice(0, 16)] = v as number
  }

  const itemsCol = await getCareerItemsCollection()
  const items = (await itemsCol
    .find(visibilityFilter(true))
    .sort({ order: 1 })
    .toArray()) as unknown as CareerItem[]

  const profile = buildProfile(items, answers)
  const { payload, shown } = await buildResult(profile, true)

  const attempts = await getCareerAttemptsCollection()
  const { insertedId } = await attempts.insertOne({
    taker: 'expert',
    takerName: sanitizeName(body.takerName) || expert.name,
    personaKey: null,
    deviceId: null,
    answers,
    profile,
    shown,
    createdAt: new Date(),
    durationMs: Number.isFinite(Number(body.durationMs)) ? Number(body.durationMs) : null,
  })

  return NextResponse.json({ attemptId: insertedId.toString(), ...payload })
}
