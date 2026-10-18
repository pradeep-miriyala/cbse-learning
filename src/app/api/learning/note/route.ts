// src/app/api/learning/note/route.ts
// The feedback hub: a note about the site, not about one finished paper.
//
// Three kinds, so they can be sorted without reading each. Nothing is required
// beyond the message; an email is optional and only for a reply. Held in its own
// collection and never shown to anyone but the admin.

import { NextRequest, NextResponse } from 'next/server'
import { getLearningNotesCollection } from '@/lib/mongodb'
import { checkHoneypot, checkContent, checkRateLimit } from '@/lib/spam'

export const dynamic = 'force-dynamic'

const KINDS = new Set(['broken', 'question', 'idea'])

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Silently accept so a bot learns nothing from the response.
  if (!checkHoneypot(body.website)) return NextResponse.json({ success: true })

  const kind = String(body.kind || '')
  const message = String(body.message || '').trim().slice(0, 800)
  const where = String(body.where || '').trim().slice(0, 120)
  const email = String(body.email || '').trim().slice(0, 120)

  if (!KINDS.has(kind)) return NextResponse.json({ error: 'Pick what this is about.' }, { status: 400 })
  if (message.length < 10) {
    return NextResponse.json({ error: 'Please say a little more — at least a sentence.' }, { status: 400 })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email does not look right. Leave it blank if you prefer.' }, { status: 400 })
  }
  const check = checkContent(`${message} ${where}`)
  if (!check.clean) return NextResponse.json({ error: check.reason || 'Please reword that.' }, { status: 400 })

  try {
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
    const limit = await checkRateLimit(ip)
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'You have sent a couple already — please try again in a few minutes.' },
        { status: 429 },
      )
    }

    const col = await getLearningNotesCollection()
    await col.insertOne({
      kind, message, where, email,
      userAgent: String(req.headers.get('user-agent') || '').slice(0, 160),
      status: 'open',
      createdAt: new Date(),
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[learning/note]', err)
    return NextResponse.json({ error: 'Could not send that. Please try again.' }, { status: 500 })
  }
}
