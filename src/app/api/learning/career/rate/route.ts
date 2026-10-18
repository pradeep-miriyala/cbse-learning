// src/app/api/learning/career/rate/route.ts
// An expert's verdict on what one attempt produced.
//
// This is how a system with no right answers gets audited. The `missing` list is
// the reason the endpoint exists: a bad recommendation is on the page and will
// be reported without being asked for, but a role that should have appeared and
// did not is invisible unless somebody is asked to name it — and for a tool
// whose whole purpose is exposure, those are the failures that matter.

import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import {
  getCareerAttemptsCollection,
  getCareerAttemptRatingsCollection,
  getCareerRolesCollection,
} from '@/lib/mongodb'
import { resolveExpert } from '@/lib/careerGate'

export const dynamic = 'force-dynamic'

const Schema = z.object({
  attemptId: z.string().min(1),
  overall: z.number().int().min(1).max(5),
  roleVerdicts: z.array(z.object({
    roleId: z.string().min(1).max(80),
    verdict: z.enum(['good', 'plausible', 'wrong']),
  })).max(200).default([]),
  missing: z.array(z.string().min(1).max(80)).max(50).default([]),
  wildcardVerdict: z.enum(['useful', 'noise']).nullable().default(null),
  note: z.string().max(4000).default(''),
})

export async function POST(req: NextRequest) {
  const expert = await resolveExpert()
  if (!expert) return NextResponse.json({ error: 'Locked.' }, { status: 401 })

  const parsed = Schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid rating.' }, { status: 400 })
  }

  const { attemptId, ...rating } = parsed.data
  if (!ObjectId.isValid(attemptId)) {
    return NextResponse.json({ error: 'Unknown attempt.' }, { status: 400 })
  }

  const attempts = await getCareerAttemptsCollection()
  const attempt = await attempts.findOne({ _id: new ObjectId(attemptId) })
  if (!attempt) return NextResponse.json({ error: 'Unknown attempt.' }, { status: 404 })

  // The switch that has to hold once this stops being a pilot. Expert and
  // persona runs are test data; a learner's answers are a child's, and no
  // reviewer sees an individual one however the rest of the plumbing changes.
  if (attempt.taker === 'learner') {
    return NextResponse.json(
      { error: 'Learner attempts are not open to review.' },
      { status: 403 },
    )
  }

  // Named roles are checked against the bank so a typo does not become a
  // permanent phantom in the gap analysis.
  const rolesCol = await getCareerRolesCollection()
  const known = new Set(
    (await rolesCol.find({}, { projection: { slug: 1 } }).toArray()).map((r) => r.slug as string),
  )
  const unknown = [...rating.missing, ...rating.roleVerdicts.map((v) => v.roleId)]
    .filter((s) => !known.has(s))

  if (unknown.length) {
    return NextResponse.json(
      { error: `Not roles in the bank: ${unknown.join(', ')}` },
      { status: 400 },
    )
  }

  const ratings = await getCareerAttemptRatingsCollection()
  // One rating per expert per attempt — a second pass replaces the first rather
  // than stacking, so a count of ratings is a count of opinions.
  await ratings.updateOne(
    { attemptId, expert: expert.name },
    { $set: { ...rating, attemptId, expert: expert.name, ratedAt: new Date() } },
    { upsert: true },
  )

  return NextResponse.json({ ok: true })
}
