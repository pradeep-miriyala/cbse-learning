// scripts/import-learning.mjs
//
// Loads scripts/learning-seed.json into MongoDB and creates the Learning Lab
// indexes. Idempotent: questions upsert on contentHash, so re-running after a
// re-extract updates in place rather than duplicating.
//
//   MONGODB_URI=... node scripts/import-learning.mjs
//   MONGODB_URI=... node scripts/import-learning.mjs --dry-run
//   MONGODB_URI=... node scripts/import-learning.mjs --seed path/to/seed.json

import fs from 'node:fs'
import path from 'node:path'
import { MongoClient } from 'mongodb'

const args = process.argv.slice(2)
const argVal = (flag, fallback) => {
  const i = args.indexOf(flag)
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback
}
const DRY = args.includes('--dry-run')
const SEED = argVal('--seed', path.join(process.cwd(), 'scripts', 'learning-seed.json'))

const PAPER_TTL_SECONDS = 60 * 60 * 24 * 2

async function main() {
  if (!fs.existsSync(SEED)) {
    console.error(`Seed not found: ${SEED}\nRun: node scripts/extract-learning-questions.mjs`)
    process.exit(1)
  }

  const seed = JSON.parse(fs.readFileSync(SEED, 'utf8'))
  const questions = seed.questions || []
  console.log(`Seed: ${questions.length} questions, generated ${seed.generatedAt}`)

  if (DRY) {
    console.log('\n--dry-run: nothing written. Taxonomy that would be live:\n')
    for (const s of seed.taxonomy || []) {
      console.log(`  Grade ${s.grade} · ${s.subjectLabel}`)
      for (const t of s.topics) console.log(`      ${String(t.count).padStart(3)}  ${t.label}`)
    }
    return
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set. Export it (or source .env.local) and retry.')
    process.exit(1)
  }

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db('pradeep-site')

  const qCol = db.collection('learning_questions')
  const pCol = db.collection('learning_papers')
  const aCol = db.collection('learning_attempts')
  const fCol = db.collection('learning_feedback')

  // ── Indexes ──
  await qCol.createIndex({ contentHash: 1 }, { unique: true })
  await qCol.createIndex({ grade: 1, subject: 1, topic: 1, status: 1 })
  // TTL: generated papers are scratch state, not history. Attempts persist.
  await pCol.createIndex({ createdAt: 1 }, { expireAfterSeconds: PAPER_TTL_SECONDS })
  await aCol.createIndex({ createdAt: -1 })
  await aCol.createIndex({ learnerName: 1, createdAt: -1 })
  await fCol.createIndex({ createdAt: -1 })
  console.log('Indexes ensured.')

  // ── Upsert questions ──
  const now = new Date()
  const ops = questions.map((q) => ({
    updateOne: {
      filter: { contentHash: q.contentHash },
      update: {
        $set: {
          grade:      q.grade,
          subject:    q.subject,
          chapter:    q.chapter,
          topic:      q.topic,
          topicLabel: q.topicLabel,
          subtopic:   q.subtopic ?? null,
          question:   q.question,
          options:    q.options,
          answer:     q.answer,
          hint:       q.hint ?? '',
          visual:     q.visual ?? null,
          imageSvg:   q.imageSvg ?? null,
          sources:    q.sources ?? [],
          status:     'published',
          updatedAt:  now,
        },
        $setOnInsert: { createdAt: now },
      },
      upsert: true,
    },
  }))

  const res = await qCol.bulkWrite(ops, { ordered: false })
  console.log(`\nQuestions: ${res.upsertedCount} inserted, ${res.modifiedCount} updated.`)

  const total = await qCol.countDocuments({ status: 'published' })
  console.log(`Bank now holds ${total} published questions.\n`)

  const tax = await qCol
    .aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: { g: '$grade', s: '$subject', t: '$topic', l: '$topicLabel' }, n: { $sum: 1 } } },
      { $sort: { '_id.g': 1, '_id.s': 1, n: -1 } },
    ])
    .toArray()

  let current = ''
  for (const row of tax) {
    const key = `Grade ${row._id.g} · ${row._id.s}`
    if (key !== current) { console.log(`  ${key}`); current = key }
    console.log(`      ${String(row.n).padStart(3)}  ${row._id.l}`)
  }

  await client.close()
  console.log('\nDone.')
}

main().catch((err) => { console.error(err); process.exit(1) })
