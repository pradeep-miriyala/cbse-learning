// scripts/build-spoken.ts
// Validate the authored 3-mark spoken questions and emit the importable bank.
//
//     node --experimental-strip-types scripts/build-spoken.ts
//
// Nothing reaches the bank without passing auditSpoken(), because a mark scheme
// fails silently: when its accept lists drift from the words children really
// use, no error appears — the questions just start marking good answers wrong.

import { writeFileSync, mkdirSync } from 'node:fs'
import { auditSpoken, budgetFor, type AuthoredSpoken } from '../src/lib/speaking.ts'
import { CHAPTERS } from './spoken/index.ts'

/** A topic is only offerable if a paper can draw a sensible amount from it. */
const MIN_PER_TOPIC = 2
/** Below this a paper is not a paper. */
const MIN_PAPER = 4

const OUT = 'scripts/banks/spoken.json'

let broken = 0
const all: (AuthoredSpoken & { subject: string })[] = []

for (const { subject, questions } of CHAPTERS) {
  for (const q of questions) {
    const problems = auditSpoken(q)
    if (problems.length) {
      broken++
      console.log(`\nFAIL  [${subject}/${q.topic}] ${q.question.slice(0, 70)}`)
      for (const p of problems) console.log(`        ${p}`)
    }
    all.push({ ...q, subject })
  }
}

// ── Coverage ────────────────────────────────────────────────────────────
// Drafts are excluded from the coverage floor: a question nobody can be asked
// cannot help a topic reach two.
const byTopic = new Map<string, number>()
const bySubject = new Map<string, Set<string>>()
for (const q of all.filter((x) => (x.status ?? 'published') !== 'draft')) {
  const key = `${q.subject}/${q.topic}`
  byTopic.set(key, (byTopic.get(key) ?? 0) + 1)
  const set = bySubject.get(q.subject) ?? new Set()
  set.add(q.topic)
  bySubject.set(q.subject, set)
}

const thin = [...byTopic.entries()].filter(([, n]) => n < MIN_PER_TOPIC)
for (const [t, n] of thin) console.log(`THIN  ${t} has ${n}, needs ${MIN_PER_TOPIC}`)

// ── Duplicate question text ─────────────────────────────────────────────
const seen = new Map<string, string>()
let dupes = 0
for (const q of all) {
  const key = `${q.subject}|${q.question.toLowerCase().replace(/\s+/g, ' ').trim()}`
  if (seen.has(key)) { dupes++; console.log(`DUPE  ${q.topic} repeats: ${q.question.slice(0, 60)}`) }
  seen.set(key, q.topic)
}

console.log('')
for (const [subject, topics] of bySubject) {
  const n = all.filter((q) => q.subject === subject).length
  const offerable = [...topics].filter((t) => (byTopic.get(`${subject}/${t}`) ?? 0) >= MIN_PER_TOPIC)
  console.log(`${subject.padEnd(15)} ${String(n).padStart(4)} questions  ${offerable.length}/${topics.size} topics offerable`)
  // With MIN_PER_TOPIC per topic, this many topics are needed to fill a paper.
  console.log(`${''.padEnd(15)}      a ${MIN_PAPER}-question paper needs ${Math.ceil(MIN_PAPER / MIN_PER_TOPIC)} topics; ${offerable.length} available`)
}
console.log(`\n${all.length} questions, ${broken} failing audit, ${dupes} duplicate texts, ${thin.length} thin topics`)

if (broken || dupes || thin.length) {
  console.log('\nNot writing the bank while anything above is unresolved.')
  process.exit(1)
}

mkdirSync('scripts/banks', { recursive: true })
writeFileSync(OUT, JSON.stringify(
  all.map((q) => ({
    grade: 6,
    subject: q.subject,
    chapter: q.chapter,
    topic: q.topic,
    topicLabel: q.topicLabel,
    format: 'spoken',
    question: q.question,
    modelAnswer: q.modelAnswer,
    keyPoints: q.keyPoints,
    marks: q.keyPoints.length,
    budgetSec: budgetFor(q.keyPoints.length),
    difficulty: q.difficulty ?? 'medium',
    status: q.status ?? 'published',
  })), null, 2))
console.log(`\nwrote ${OUT}`)
