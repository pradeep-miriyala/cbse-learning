// src/app/api/learning/captcha/route.ts
// Issues a fresh human-check challenge for the Learning Lab.
//
// A small sum rather than a distorted-image captcha: the audience is children,
// the check only needs to stop naive scripted abuse, and no third-party script
// gets to profile a minor to do it.

import { NextResponse } from 'next/server'
import { generateCaptcha } from '@/lib/captcha'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { token, display } = generateCaptcha()
  return NextResponse.json(
    { token, display },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
