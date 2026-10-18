// scripts/career-seed.mjs
//
// Loads the Career Choices content and questionnaire into MongoDB and creates
// its indexes.
//
// Idempotent, and deliberately timid about it: by default a re-run only INSERTS
// what is missing. It will not touch a document that already exists, because by
// then an expert may have corrected it and the seed file is not the authority
// any more. Pass --overwrite to push the file's version over the top, which
// bumps the version and writes the prior state to career_revisions like any
// other edit, so nothing is lost silently.
//
//   MONGODB_URI=... node scripts/career-seed.mjs
//   MONGODB_URI=... node scripts/career-seed.mjs --dry-run
//   MONGODB_URI=... node scripts/career-seed.mjs --overwrite

import { MongoClient } from 'mongodb'
import { ALL_ITEMS } from './career-items.mjs'
import { FIELDS, ROLES, STREAMS, FUNDING } from './career-content.mjs'

const args = process.argv.slice(2)
const DRY = args.includes('--dry-run')
const OVERWRITE = args.includes('--overwrite')

/** Everything ships as a draft. Nothing reaches a learner un-reviewed. */
const reviewable = () => ({
  version: 1,
  reviewState: 'draft',
  updatedAt: new Date(),
  updatedBy: 'seed',
  approvedBy: null,
  approvedAt: null,
})

const SETS = [
  { name: 'career_fields',  key: 'slug', docs: FIELDS },
  { name: 'career_roles',   key: 'slug', docs: ROLES },
  { name: 'career_streams', key: 'slug', docs: STREAMS },
  { name: 'career_funding', key: 'slug', docs: FUNDING.map((f) => ({
      ...f, lastVerifiedAt: null, lastVerifiedBy: null })) },
  { name: 'career_items',   key: 'key',  docs: ALL_ITEMS },
]

async function main() {
  if (DRY) {
    console.log('--dry-run: nothing written.\n')
    for (const s of SETS) console.log(`  ${String(s.docs.length).padStart(4)}  ${s.name}`)
    console.log('\nRoles by field:')
    const byField = {}
    for (const r of ROLES) (byField[r.field] ??= []).push(r.label)
    for (const [f, list] of Object.entries(byField)) {
      console.log(`\n  ${f}`)
      for (const l of list) console.log(`      ${l}`)
    }
    return
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not set.')
    process.exit(1)
  }

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db('pradeep-site')

  try {
    for (const set of SETS) {
      const col = db.collection(set.name)
      let inserted = 0, updated = 0, skipped = 0

      for (const doc of set.docs) {
        const filter = { [set.key]: doc[set.key] }
        const existing = await col.findOne(filter)

        if (!existing) {
          await col.insertOne({ ...doc, ...reviewable() })
          inserted++
          continue
        }

        if (!OVERWRITE) { skipped++; continue }

        // Same trail an admin edit writes — see recordRevision in careerGate.ts.
        await db.collection('career_revisions').insertOne({
          collection: set.name.replace('career_', ''),
          docId: existing._id.toString(),
          version: existing.version ?? 0,
          snapshot: existing,
          changedBy: 'seed',
          changedAt: new Date(),
          note: 'overwritten by career-seed.mjs --overwrite',
        })

        await col.updateOne(filter, {
          $set: {
            ...doc,
            version: (existing.version ?? 0) + 1,
            updatedAt: new Date(),
            updatedBy: 'seed',
          },
        })
        updated++
      }

      console.log(
        `${set.name.padEnd(16)} +${inserted} inserted` +
        (updated ? `, ${updated} overwritten` : '') +
        (skipped ? `, ${skipped} left alone` : ''),
      )
    }

    // ── Indexes ──
    await db.collection('career_fields').createIndex({ slug: 1 }, { unique: true })
    await db.collection('career_roles').createIndex({ slug: 1 }, { unique: true })
    await db.collection('career_roles').createIndex({ field: 1, reviewState: 1 })
    await db.collection('career_streams').createIndex({ slug: 1 }, { unique: true })
    await db.collection('career_funding').createIndex({ slug: 1 }, { unique: true })
    await db.collection('career_items').createIndex({ key: 1 }, { unique: true })
    await db.collection('career_items').createIndex({ order: 1 })

    await db.collection('career_attempts').createIndex({ createdAt: -1 })
    // Every reviewer-facing query filters on taker. See CareerAttempt.taker.
    await db.collection('career_attempts').createIndex({ taker: 1, createdAt: -1 })
    await db.collection('career_attempt_ratings').createIndex({ attemptId: 1 })
    await db.collection('career_attempt_ratings').createIndex({ expert: 1 })

    await db.collection('career_revisions').createIndex({ collection: 1, docId: 1, version: -1 })
    await db.collection('career_reviews').createIndex({ collection: 1, docId: 1, createdAt: 1 })
    await db.collection('career_reviews').createIndex({ status: 1, createdAt: -1 })
    await db.collection('career_experts').createIndex({ codeHash: 1 }, { unique: true })

    console.log('\nIndexes created.')
  } finally {
    await client.close()
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
