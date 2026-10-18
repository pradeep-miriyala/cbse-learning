// src/app/api/learning/career/personas/route.ts
// The calibration set, run against the live bank.
//
// Every expert rates the same twelve profiles, which is what makes their
// disagreement measurable. Rating twelve different attempts each would give
// twelve opinions and no way to tell a broken scoring rule from a reviewer with
// an unusual view.
//
// The run goes through buildResult, exactly as a real submission does. A second
// implementation here would mean experts rating something no learner sees.

import { NextRequest, NextResponse } from 'next/server'
import { getCareerAttemptsCollection } from '@/lib/mongodb'
import { resolveExpert } from '@/lib/careerGate'
import { buildResult } from '@/lib/careerResult'
import { PERSONAS } from '@/lib/careerPersonas'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const expert = await resolveExpert()
  if (!expert) return NextResponse.json({ error: 'Locked.' }, { status: 401 })

  const key = new URL(req.url).searchParams.get('key')

  if (!key) {
    return NextResponse.json({
      personas: PERSONAS.map((p) => ({ key: p.key, label: p.label, tests: p.tests })),
    })
  }

  const persona = PERSONAS.find((p) => p.key === key)
  if (!persona) return NextResponse.json({ error: 'Unknown persona.' }, { status: 404 })

  const { payload, shown } = await buildResult(persona.profile, true)

  // One attempt per persona per expert, replaced on a re-run rather than piling
  // up — the cards move underneath these, and the rating should attach to what
  // the expert actually looked at.
  const attempts = await getCareerAttemptsCollection()
  const res = await attempts.findOneAndUpdate(
    { taker: 'persona', personaKey: persona.key, takerName: expert.name },
    {
      $set: {
        taker: 'persona',
        personaKey: persona.key,
        takerName: expert.name,
        answers: {},
        profile: persona.profile,
        shown,
        createdAt: new Date(),
        durationMs: null,
        deviceId: null,
      },
    },
    { upsert: true, returnDocument: 'after' },
  )

  return NextResponse.json({
    attemptId: res?._id?.toString() ?? '',
    persona: { key: persona.key, label: persona.label, tests: persona.tests },
    ...payload,
  })
}
