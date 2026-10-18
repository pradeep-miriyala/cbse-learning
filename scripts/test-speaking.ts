// scripts/test-speaking.ts
// Regression tests for the spoken-answer marker.
//
//     node --experimental-strip-types scripts/test-speaking.ts
//
// The mark scheme is the asset here, not the code around it, and its failure
// mode is silent: a scheme that quietly stops recognising a right answer just
// looks like children getting worse. So every case below is a sentence a child
// might really say — including one deliberately mangled the way speech
// recognition mangles things, and three that must score ZERO because they only
// parrot the question back.
import { markAnswer, readResults, joinTranscript, mergeChunk } from '../src/lib/speaking.ts'
import { BALANCED_DIET } from '../src/app/learning/speak-demo/questions.ts'

const q = (id: string) => BALANCED_DIET.find((x) => x.id === id)!

interface Case { q: string; want: number; why: string; said: string }

const CASES: Case[] = [
  // ── Full-credit answers, in a child's words rather than the textbook's ──
  { q: 'bd-1', want: 3, why: 'full marks, childish phrasing',
    said: 'a balanced diet means you eat all the nutrients like carbohydrates proteins fats vitamins and minerals and you take them in the right amount not too much of one thing and you should also have roughage and drink water' },

  { q: 'bd-1', want: 3, why: 'full marks after the recogniser splits and mangles words',
    said: 'a balance diet is when you get all the new triants like carbo hydrates and protein in the correct amount and also rufage and water' },

  { q: 'bd-2', want: 3, why: 'full marks, names foods not nutrients',
    said: 'rice is only carbohydrate so it just gives him energy he should add dal for protein and some vegetables also' },

  { q: 'bd-3', want: 3, why: 'full marks',
    said: 'it is not true because it does not depend on money cheap food like dal has the same protein as meat and a thali of roti dal sabzi and curd is balanced' },

  { q: 'bd-4', want: 3, why: 'full marks',
    said: 'the width of each layer shows how much you should eat the base is grains and you eat that the most and the tip has fats and sweets which you eat least' },

  { q: 'bd-5', want: 3, why: 'full marks',
    said: 'a tablet does not have roughage and roughage helps in digestion and stops constipation also vegetables give you minerals and water together' },

  // ── Partial credit: the answer really is incomplete ──
  { q: 'bd-1', want: 1, why: 'names nutrients only — no proportion, no roughage',
    said: 'a balanced diet has carbohydrates and proteins in it' },

  { q: 'bd-2', want: 2, why: 'spots the protein and vitamin gap but not why rice alone fails',
    said: 'he should also eat dal and some fruits' },

  { q: 'bd-4', want: 1, why: 'knows the base but not what the shape means or the tip',
    said: 'the bottom of the pyramid has cereals and grains' },

  // ── Must NOT score: parroting the question back ──
  { q: 'bd-1', want: 0, why: 'repeats the question, says nothing',
    said: 'a balanced diet is a balanced diet it is about food' },

  { q: 'bd-5', want: 0, why: 'repeats the question back',
    said: 'i would tell my friend that a vitamin tablet every morning is not the same as vegetables' },

  { q: 'bd-3', want: 0, why: 'off topic entirely',
    said: 'i think everyone should eat whatever they like best' },

  { q: 'bd-2', want: 0, why: 'silence — nothing recognised',
    said: '' },
]

// ── Transcript assembly ──────────────────────────────────────────────────
// Replays how Chrome on Android delivers results: it hands back items it has
// already marked final, without advancing resultIndex. Reading the whole list
// must give the same string however many times they arrive.

const asResult = (text: string, isFinal = true) =>
  ({ isFinal, 0: { transcript: text } })

let pass = 0, fail = 0

function check(name: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  ok ? pass++ : fail++
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}`)
  if (!ok) console.log(`      got  ${JSON.stringify(got)}\n      want ${JSON.stringify(want)}`)
}

// The four shapes a speech engine emits finals in. Only the first is a plain
// append; the middle two are what Chrome on Android does, and concatenating
// them is what wrote a child's answer into the box three times over.
const FINAL = (t: string) => asResult(t)
const WANT = 'a balanced diet has all the nutrients'

check('append: separate chunks',
  readResults([FINAL('a balanced diet'), FINAL('has all the nutrients')]).final, WANT)

check('redeliver: the same final handed back again',
  readResults([FINAL('a balanced diet'), FINAL('a balanced diet')]).final, 'a balanced diet')

check('redeliver: three copies of one phrase',
  readResults([FINAL('all the nutrients'), FINAL('all the nutrients'), FINAL('all the nutrients')]).final,
  'all the nutrients')

check('revise: progressively longer finals for one utterance',
  readResults([FINAL('a balanced'), FINAL('a balanced diet'), FINAL(WANT)]).final, WANT)

check('overlap: chunks sharing a tail and head',
  readResults([FINAL('a balanced diet has'), FINAL('diet has all the nutrients')]).final, WANT)

check('genuinely different speech is all kept',
  readResults([FINAL('the base is grains'), FINAL('the tip is fats')]).final,
  'the base is grains the tip is fats')

check('reading the same list twice gives the same string',
  readResults([FINAL('a balanced'), FINAL(WANT)]).final,
  readResults([FINAL('a balanced'), FINAL(WANT)]).final)

{
  const withInterim = [FINAL(WANT), asResult('and roughage', false)]
  const r = readResults(withInterim)
  check('interim text is kept separate', r.interim, 'and roughage')
  check('interim text stays out of the final', r.final, WANT)
}

check('merge ignores case and punctuation at the seam',
  mergeChunk('a balanced Diet.', 'diet has all the nutrients'),
  'a balanced Diet. has all the nutrients')

check('join across a session boundary', joinTranscript('all the nutrients', 'and water'),
  'all the nutrients and water')
check('join refuses to repeat what is already committed',
  joinTranscript('all the nutrients and water', 'and water'), 'all the nutrients and water')
check('join tolerates an empty side', joinTranscript('', 'and water'), 'and water')
check('join tolerates silence', joinTranscript('all the nutrients', ''), 'all the nutrients')

// ── Mark schemes ─────────────────────────────────────────────────────────

for (const c of CASES) {
  const r = markAnswer(q(c.q), c.said)
  const ok = r.score === c.want
  ok ? pass++ : fail++
  const hit = r.results.filter((x) => x.found).map((x) => x.point.id).join(', ') || '—'
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${c.q} got ${r.score}/${r.outOf} want ${c.want}  · ${c.why}`)
  if (!ok) {
    console.log(`      said:   "${c.said.slice(0, 90)}"`)
    console.log(`      scored: ${hit}`)
    console.log(`      missed: ${r.results.filter((x) => !x.found).map((x) => x.point.id).join(', ')}`)
  }
}
console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
