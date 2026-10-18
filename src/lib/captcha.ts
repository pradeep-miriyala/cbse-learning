// src/lib/captcha.ts — server-side signed math captcha
// Challenge is signed with HMAC so the expected answer never leaves the server.
import { createHmac } from 'crypto'

const SECRET = () => process.env.NEXTAUTH_SECRET || 'dev-captcha-secret'
const TTL_SECONDS = 600 // 10-minute window

function sign(a: number, b: number, exp: number): string {
  return createHmac('sha256', SECRET())
    .update(`${a}:${b}:${exp}`)
    .digest('hex')
}

/** Generate a new captcha challenge. Returns the token (opaque to client) and display string. */
export function generateCaptcha(): { token: string; display: string } {
  const a = Math.floor(Math.random() * 9) + 1
  const b = Math.floor(Math.random() * 9) + 1
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS
  const sig = sign(a, b, exp)
  const token = Buffer.from(JSON.stringify({ a, b, exp, sig })).toString('base64url')
  return { token, display: `${a} + ${b}` }
}

// ── Session pass ──
// Solving the challenge once issues a short-lived signed pass. The Learning Lab
// sends it with later papers so a learner is not re-prompted every time they
// press "try a fresh paper" — the check is on being human, not on each request.

const PASS_TTL_SECONDS = 2 * 60 * 60

function signPass(exp: number): string {
  return createHmac('sha256', SECRET()).update(`pass:${exp}`).digest('hex')
}

export function issuePass(): string {
  const exp = Math.floor(Date.now() / 1000) + PASS_TTL_SECONDS
  return Buffer.from(JSON.stringify({ exp, sig: signPass(exp) })).toString('base64url')
}

export function verifyPass(token: unknown): boolean {
  if (typeof token !== 'string' || !token) return false
  try {
    const { exp, sig } = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'))
    if (typeof exp !== 'number' || Math.floor(Date.now() / 1000) > exp) return false
    return signPass(exp) === sig
  } catch {
    return false
  }
}

/** Verify that the user's answer matches the signed token. */
export function verifyCaptcha(token: string, answer: string | number): boolean {
  try {
    const parsed = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'))
    const { a, b, exp, sig } = parsed as { a: number; b: number; exp: number; sig: string }

    // Check expiry
    if (Math.floor(Date.now() / 1000) > exp) return false

    // Check signature (prevents client from crafting their own tokens)
    if (sign(a, b, exp) !== sig) return false

    // Check answer
    return Number(answer) === a + b
  } catch {
    return false
  }
}
