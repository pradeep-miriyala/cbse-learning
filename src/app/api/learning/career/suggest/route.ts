// src/app/api/learning/career/suggest/route.ts
// Expert suggestions on a card.
//
// Suggest-only, deliberately. Two experts editing one card contradict each
// other, and the trail should record a recommendation and the decision taken on
// it as two separate things rather than as one silent overwrite. Experts marked
// canEdit get the admin routes instead.

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resolveExpert, addSuggestion, suggestionsFor } from '@/lib/careerGate'

export const dynamic = 'force-dynamic'

const COLLECTIONS = ['fields', 'roles', 'streams', 'funding', 'items'] as const

const Schema = z.object({
  collection: z.enum(COLLECTIONS),
  docId: z.string().min(1).max(80),
  /** The field being commented on, so a suggestion lands somewhere specific. */
  path: z.string().min(1).max(60),
  onVersion: z.number().int().min(0),
  body: z.string().min(3).max(4000),
})

export async function POST(req: NextRequest) {
  const expert = await resolveExpert()
  if (!expert) return NextResponse.json({ error: 'Locked.' }, { status: 401 })

  const parsed = Schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid suggestion.' }, { status: 400 })
  }

  await addSuggestion({
    ...parsed.data,
    expert: expert.name,
    discipline: expert.discipline ?? '',
  })

  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const expert = await resolveExpert()
  if (!expert) return NextResponse.json({ error: 'Locked.' }, { status: 401 })

  const url = new URL(req.url)
  const collection = url.searchParams.get('collection')
  const docId = url.searchParams.get('docId')

  if (!collection || !docId || !COLLECTIONS.includes(collection as never)) {
    return NextResponse.json({ error: 'Specify collection and docId.' }, { status: 400 })
  }

  const suggestions = await suggestionsFor(collection as (typeof COLLECTIONS)[number], docId)
  return NextResponse.json({ suggestions })
}
