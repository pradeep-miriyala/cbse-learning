// src/app/api/learning/revalidate/route.ts
// Drops the cached taxonomy so a bank import shows up at once.
//
// The topic picker is built from /api/learning/taxonomy, which is cached for
// five minutes with stale-while-revalidate: the first request after the window
// expires still serves the OLD tree and only then refreshes in the background.
// Someone checking the site every few minutes can therefore keep seeing the
// previous state — which is exactly what happened after several hundred
// questions were imported and Social Science still read 175.
//
// The admin routes already call revalidateTag when a question is edited. This
// endpoint exists for the other path into the bank: scripts/prepare-bank.mjs,
// which writes to MongoDB directly and has no way to reach Next's cache.
//
// Authentication reuses NEXTAUTH_SECRET rather than introducing a new one, so
// there is nothing extra to configure in the deployment. The caller proves it
// holds the secret with an HMAC rather than sending the secret itself.

import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import crypto from 'node:crypto'

export const dynamic = 'force-dynamic'

/** The string both sides sign. Not a secret — the signature is the proof. */
const MESSAGE = 'learning-revalidate'

export async function POST(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Server is not configured for this' }, { status: 500 })
  }

  const expected = crypto.createHmac('sha256', secret).update(MESSAGE).digest('hex')
  const given = String(req.headers.get('x-revalidate-token') || '')

  // Constant-time compare, and a length check first because timingSafeEqual
  // throws rather than returning false when the buffers differ in length.
  const ok =
    given.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected))

  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  revalidateTag('learning-taxonomy')
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() })
}
