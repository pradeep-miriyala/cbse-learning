// src/app/api/learning/career/paper/route.ts
// The questionnaire, in order.
//
// Unlike a Learning Lab paper this is not generated — every learner answers the
// same 46 items. The interest section only balances because all twenty of its
// triples are present, so sampling from it would quietly break the property the
// section depends on.

import { NextResponse } from 'next/server'
import { getCareerItemsCollection } from '@/lib/mongodb'
import { resolveExpert } from '@/lib/careerGate'
import { SECTIONS, visibilityFilter, type CareerItem } from '@/lib/career'

export const dynamic = 'force-dynamic'

export async function GET() {
  const expert = await resolveExpert()
  if (!expert) return NextResponse.json({ error: 'Locked.' }, { status: 401 })

  const col = await getCareerItemsCollection()
  const items = (await col
    .find(visibilityFilter(true))
    .sort({ order: 1 })
    .toArray()) as unknown as CareerItem[]

  return NextResponse.json({
    sections: SECTIONS,
    // The stored answer key never leaves the server for a scored paper; here
    // there is nothing to withhold, so items go out whole.
    items: items.map(({ _id, updatedBy, ...rest }) => rest),
    expert: { name: expert.name, discipline: expert.discipline },
  })
}
