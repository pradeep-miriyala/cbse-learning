// scripts/prepare-bank.mjs
//
// Validates a hand-authored question bank against the import schema, shuffles
// each question's options so the stored bank is not answer-first, and reports
// collisions against questions already in MongoDB.
//
//   node scripts/prepare-bank.mjs scripts/banks/*.json             # check + shuffle in place
//   node scripts/prepare-bank.mjs --check scripts/banks/*.json     # report only
//   MONGODB_URI=... node scripts/prepare-bank.mjs --db  <files>    # + collision report
//   MONGODB_URI=... node scripts/prepare-bank.mjs --import <files> # + upsert into the bank
//
// Importing is idempotent: questions upsert on contentHash, so re-running
// updates in place rather than duplicating.
//
// The shuffle is seeded from the question text, so re-running is stable and
// does not churn the files.

import fs from 'node:fs'
import crypto from 'node:crypto'

const args = process.argv.slice(2)
const CHECK_ONLY = args.includes('--check')
const DO_IMPORT = args.includes('--import')
const WITH_DB = args.includes('--db') || DO_IMPORT
const files = args.filter((a) => !a.startsWith('--'))

if (files.length === 0) {
  console.error('Usage: node scripts/prepare-bank.mjs [--check] [--db] <file.json...>')
  process.exit(1)
}

const plain = (s) =>
  String(s ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase()

/**
 * Tell the live site to drop its cached topic tree.
 *
 * The taxonomy behind the topic picker is cached for five minutes with
 * stale-while-revalidate, so the first visit after an import still serves the
 * old tree and only refreshes behind the scenes. Someone checking every few
 * minutes keeps seeing the previous state — which is how several hundred newly
 * imported questions went unnoticed on the site for an hour.
 *
 * Signed with NEXTAUTH_SECRET so no new secret has to be configured anywhere.
 * A failure here is reported but never fails the import: the questions are
 * already in the database, and the cache would expire on its own regardless.
 */
async function revalidateSite() {
  const secret = process.env.NEXTAUTH_SECRET
  const base = process.env.SITE_URL || 'https://learn.miriyala.in'
  if (!secret) {
    console.log('NEXTAUTH_SECRET not set — skipping cache revalidation.')
    return
  }
  const token = crypto.createHmac('sha256', secret).update('learning-revalidate').digest('hex')
  try {
    const res = await fetch(`${base}/api/learning/revalidate`, {
      method: 'POST',
      headers: { 'x-revalidate-token': token },
    })
    if (res.ok) console.log(`Asked ${base} to refresh its topic list — new topics appear immediately.`)
    else console.log(`Could not refresh the site cache (HTTP ${res.status}). It will expire on its own within 5 minutes.`)
  } catch (err) {
    console.log(`Could not reach ${base} to refresh its cache: ${err.message}`)
  }
}

/**
 * Must match scripts/extract-learning-questions.mjs and the admin API.
 *
 * passageId is appended only when it exists. Comprehension sets ask the same
 * wording of different texts — "What is the main idea of this passage?" — so
 * without it those questions would hash alike and dedupe each other away.
 * Appending it unconditionally would instead change the hash of all 2,000-odd
 * questions written before passages existed, and re-import every one of them
 * as a duplicate.
 */
function contentHash(q) {
  const key = JSON.stringify([
    q.grade, q.subject, plain(q.question),
    [...(q.options ?? [])].map(plain).sort(),
    plain(q.visual), plain(q.imageSvg),
    ...(q.passageId ? [String(q.passageId)] : []),
    // Only for non-MCQ formats, so the questions written before spoken answers
    // existed keep their hashes. Without it a spoken question and a multiple
    // choice one sharing wording would collide and silently overwrite each
    // other — and this file, the admin POST and the admin PATCH must agree, or
    // the same question gets two hashes depending on how it arrived.
    ...(q.format && q.format !== 'mcq' ? [String(q.format)] : []),
  ])
  return crypto.createHash('sha1').update(key).digest('hex').slice(0, 16)
}

/** Deterministic shuffle seeded from a string, so output is stable per question. */
function seededShuffle(arr, seedStr) {
  const a = [...arr]
  let h = crypto.createHash('sha1').update(seedStr).digest()
  let hi = 0
  const next = () => {
    if (hi >= h.length) { h = crypto.createHash('sha1').update(h).digest(); hi = 0 }
    return h[hi++] / 256
  }
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const REQUIRED = ['grade', 'subject', 'chapter', 'topic', 'topicLabel', 'question', 'options', 'answer']

/** A spoken answer has no options and no answer index — it has a mark scheme. */
const REQUIRED_SPOKEN = ['grade', 'subject', 'chapter', 'topic', 'topicLabel', 'question',
                         'modelAnswer', 'keyPoints', 'marks']

const isSpoken = (q) => q.format === 'spoken'

/** A matching question has pairs instead of options. */
const REQUIRED_MATCH = ['grade', 'subject', 'chapter', 'topic', 'topicLabel', 'question', 'pairs']
const isMatch = (q) => q.format === 'match'

/** Mirrors MIN_PER_PASSAGE in src/lib/learning.ts. */
const MIN_PER_PASSAGE = 3

let totalAll = 0
let failed = false
const seenHash = new Map()
let allDocs = []

for (const file of files) {
  let data
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (err) {
    console.error(`\n${file}\n  INVALID JSON: ${err.message}`)
    failed = true
    continue
  }
  if (!Array.isArray(data)) {
    console.error(`\n${file}\n  Top level must be an array`)
    failed = true
    continue
  }

  const problems = []
  const topics = {}
  let answerFirst = 0

  data.forEach((q, i) => {
    if (isMatch(q)) {
      for (const k of REQUIRED_MATCH) {
        if (q[k] === undefined || q[k] === null || q[k] === '') problems.push(`#${i} missing "${k}"`)
      }
      const pairs = Array.isArray(q.pairs) ? q.pairs : []
      if (pairs.length < 3) problems.push(`#${i} needs at least 3 pairs`)
      const low = (xs) => xs.map((x) => String(x ?? '').trim().toLowerCase())
      const lefts = low(pairs.map((p) => p.left))
      const rights = low(pairs.map((p) => p.right))
      if (new Set(lefts).size !== lefts.length) problems.push(`#${i} repeats a left item`)
      // Two pairs sharing a right item cannot both be marked fairly.
      if (new Set(rights).size !== rights.length) problems.push(`#${i} repeats a right item`)
      for (const d of q.decoys ?? []) {
        if (rights.includes(String(d).trim().toLowerCase())) {
          problems.push(`#${i} decoy "${d}" is also a correct answer`)
        }
      }
      topics[q.topicLabel] = (topics[q.topicLabel] || 0) + 1
      return
    }
    if (isSpoken(q)) {
      for (const k of REQUIRED_SPOKEN) {
        if (q[k] === undefined || q[k] === null || q[k] === '') problems.push(`#${i} missing "${k}"`)
      }
      if (!Array.isArray(q.keyPoints) || q.keyPoints.length < 2) {
        problems.push(`#${i} needs at least 2 key points`)
      } else if (q.keyPoints.length !== q.marks) {
        problems.push(`#${i} claims ${q.marks} marks but has ${q.keyPoints.length} key points`)
      }
      // The deeper checks — that the model answer scores full marks and the
      // question scores none — run in build-spoken.ts, which owns the schemes.
      topics[q.topicLabel] = (topics[q.topicLabel] || 0) + 1
      return
    }
    for (const k of REQUIRED) {
      if (q[k] === undefined || q[k] === null || q[k] === '') problems.push(`#${i} missing "${k}"`)
    }
    if (!Array.isArray(q.options) || q.options.length < 2) {
      problems.push(`#${i} needs at least 2 options`)
    } else {
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
        problems.push(`#${i} answer index ${q.answer} out of range`)
      }
      const lowered = q.options.map((o) => String(o).trim().toLowerCase())
      if (new Set(lowered).size !== lowered.length) problems.push(`#${i} has duplicate options`)
      if (lowered.some((o) => !o)) problems.push(`#${i} has an empty option`)
    }
    if (!q.hint) problems.push(`#${i} missing hint`)
    if (q.answer === 0) answerFirst++
    topics[q.topicLabel] = (topics[q.topicLabel] || 0) + 1
  })

  // Duplicate questions, within this file and across all files given.
  data.forEach((q, i) => {
    if (!isSpoken(q) && !isMatch(q) && !Array.isArray(q.options)) return
    const h = contentHash(q)
    if (seenHash.has(h)) problems.push(`#${i} duplicates ${seenHash.get(h)}`)
    else seenHash.set(h, `${file}#${i}`)
  })

  // Reading comprehension: a passage must carry its own text, and must be worth
  // the reading. A passage with one or two questions would defeat the point of
  // grouping — the learner reads a whole text to answer almost nothing.
  const groups = {}
  data.forEach((q, i) => {
    if (isMatch(q)) return       // its passage belongs to the one question
    if (!q.passageId) {
      if (q.passage || q.passageTitle) problems.push(`#${i} has passage text but no passageId`)
      return
    }
    if (!q.passage) problems.push(`#${i} has passageId but no passage text`)
    if (!q.passageTitle) problems.push(`#${i} has passageId but no passageTitle`)
    ;(groups[q.passageId] ??= []).push({ i, q })
  })
  for (const [pid, rows] of Object.entries(groups)) {
    if (rows.length < MIN_PER_PASSAGE) {
      problems.push(`passage "${pid}" has only ${rows.length} question(s); at least ${MIN_PER_PASSAGE} are needed`)
    }
    // The text must be byte-identical across the set, or the group would split
    // into two passages that merely share an id.
    const texts = new Set(rows.map((r) => r.q.passage))
    if (texts.size > 1) problems.push(`passage "${pid}" has ${texts.size} different versions of its text`)
    const topics = new Set(rows.map((r) => r.q.topic))
    if (topics.size > 1) problems.push(`passage "${pid}" spans more than one topic`)
  }
  if (Object.keys(groups).length) {
    const sizes = Object.values(groups).map((r) => r.length)
    console.log(`  ${Object.keys(groups).length} passage(s), ${Math.min(...sizes)}–${Math.max(...sizes)} questions each`)
  }

  console.log(`\n${file}`)
  console.log(`  ${data.length} questions · ${Object.keys(topics).length} topics`)
  for (const [t, n] of Object.entries(topics)) console.log(`      ${String(n).padStart(3)}  ${t}`)
  const mcqCount = data.filter((q) => !isSpoken(q) && !isMatch(q)).length
  if (mcqCount) console.log(`  answer at index 0: ${answerFirst}/${mcqCount}`)

  if (problems.length) {
    failed = true
    console.log(`  ${problems.length} PROBLEM(S):`)
    for (const p of problems.slice(0, 15)) console.log(`      ${p}`)
    if (problems.length > 15) console.log(`      … and ${problems.length - 15} more`)
  } else {
    console.log('  schema: OK')
  }

  // Shuffle options so the answer key is not always first.
  //
  // This must be idempotent. Shuffling an already-shuffled file re-applies the
  // same permutation, and a permutation that is an involution squares back to
  // the identity — which walked the answer straight back to index 0 for about
  // half the bank. Sorting into a canonical order first makes the result depend
  // only on the question, never on how many times the script has run.
  if (!CHECK_ONLY && problems.length === 0) {
    const out = data.map((q) => {
      // A spoken answer has no options to shuffle — the mark scheme is not
      // positional, so there is no answer key to hide.
      if (isSpoken(q) || isMatch(q)) return q
      const correct = q.options[q.answer]
      const canonical = [...q.options].sort((a, b) => String(a).localeCompare(String(b)))
      // Comprehension sets repeat the same wording across passages ("What is the
      // main idea of this passage?"), which would seed every one of them
      // identically and apply the same permutation to each. Mixing in the
      // passage decorrelates them.
      const seed = q.passageId ? `${q.passageId}::${plain(q.question)}` : plain(q.question)
      const options = seededShuffle(canonical, seed)
      return { ...q, options, answer: options.indexOf(correct) }
    })
    fs.writeFileSync(file, JSON.stringify(out, null, 2) + '\n')
    const spread = {}
    out.forEach((q) => { if (!isSpoken(q) && !isMatch(q)) spread[q.answer] = (spread[q.answer] || 0) + 1 })
    const shuffled = out.filter((q) => !isSpoken(q) && !isMatch(q)).length
    if (shuffled) console.log(`  shuffled → answer spread ${JSON.stringify(spread)}`)
    else console.log('  no options to shuffle — spoken answers are marked by scheme')
    allDocs.push(...out)
  } else {
    allDocs.push(...data)
  }

  totalAll += data.length
}

console.log(`\nTotal: ${totalAll} questions across ${files.length} file(s)`)

if (WITH_DB) {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI not set — skipping the live-bank collision check.')
  } else {
    const { MongoClient } = await import('mongodb')
    const client = new MongoClient(uri)
    await client.connect()
    const col = client.db('pradeep-site').collection('learning_questions')
    const hashes = allDocs.map(contentHash)
    const clashes = await col.find({ contentHash: { $in: hashes } }).project({ question: 1 }).toArray()
    console.log(`\nAgainst the live bank: ${clashes.length} of ${hashes.length} already exist.`)
    for (const c of clashes.slice(0, 10)) console.log(`   already present: ${String(c.question).slice(0, 70)}`)

    const before = await col.countDocuments({ subject: 'science', status: 'published' })
    console.log(`Science currently holds ${before} published questions.`)

    if (DO_IMPORT) {
      if (failed) {
        console.error('\nNot importing — fix the problems above first.')
      } else {
        const now = new Date()

        // Questions someone has edited in the admin are theirs, not the
        // generator's. Importing over them replaces a deliberate correction
        // with the output that needed correcting — which is exactly what
        // happened once, and read as the database having drifted.
        //
        // Matching is on the question text rather than the hash, because
        // editing the options changes the hash: the hand-edited version and the
        // generated one are the same question wearing different hashes, and
        // re-importing would otherwise add a near-duplicate beside it.
        const handEdited = await col
          .find({ handEdited: true })
          .project({ question: 1, subject: 1, grade: 1 })
          .toArray()
        const protectedKeys = new Set(
          handEdited.map((d) => `${d.grade}|${d.subject}|${plain(d.question)}`),
        )
        const incoming = allDocs.length
        allDocs = allDocs.filter(
          (q) => !protectedKeys.has(`${q.grade}|${q.subject}|${plain(q.question)}`),
        )
        const held = incoming - allDocs.length
        if (held) {
          console.log(`\nHolding back ${held} question(s) edited by hand in the admin — ` +
                      'the live version stands.')
        }

        const res = await col.bulkWrite(
          allDocs.map((q) => ({
            updateOne: {
              filter: { contentHash: contentHash(q) },
              update: {
                $set: {
                  contentHash: contentHash(q),
                  grade: q.grade, subject: q.subject, chapter: q.chapter,
                  topic: q.topic, topicLabel: q.topicLabel,
                  subtopic: q.subtopic ?? null,
                  question: q.question,
                  options: q.options ?? [], answer: q.answer ?? null,
                  hint: q.hint ?? '',
                  // Spoken answers: the mark scheme replaces options entirely.
                  format: q.format ?? 'mcq',
                  ...(isSpoken(q) ? {
                    modelAnswer: q.modelAnswer,
                    keyPoints: q.keyPoints,
                    marks: q.marks,
                    budgetSec: q.budgetSec ?? q.marks * 30,
                  } : {}),
                  // Matching: the pairing is the answer key and lives only here.
                  ...(isMatch(q) ? {
                    pairs: q.pairs,
                    decoys: q.decoys ?? [],
                    marks: q.marks ?? q.pairs.length,
                    budgetSec: q.budgetSec ?? 40 + q.pairs.length * 15,
                  } : {}),
                  visual: q.visual ?? null, imageSvg: q.imageSvg ?? null,
                  imageUrl: q.imageUrl ?? null,
                  passageId: q.passageId ?? null,
                  passageTitle: q.passageTitle ?? null,
                  passage: q.passage ?? null,
                  sources: q.sources ?? ['authored'],
                  // An authored difficulty is a deliberate judgement and must
                  // survive a later classifier run, which only sets heuristics.
                  ...(q.difficulty ? { difficulty: q.difficulty, difficultySource: 'authored' } : {}),
                  ...(q.type ? { type: q.type } : {}),
                  status: q.status === 'draft' ? 'draft' : 'published',
                  updatedAt: now,
                },
                $setOnInsert: { createdAt: now },
              },
              upsert: true,
            },
          })),
          { ordered: false },
        )
        console.log(`\nImported: ${res.upsertedCount} inserted, ${res.modifiedCount} updated.`)

        const after = await col.countDocuments({ subject: 'science', status: 'published' })
        console.log(`Science now holds ${after} published questions.\n`)

        await revalidateSite()

        const tax = await col.aggregate([
          { $match: { subject: 'science', status: 'published' } },
          { $group: { _id: { c: '$chapter', t: '$topicLabel' }, n: { $sum: 1 } } },
          { $sort: { '_id.c': 1, n: -1 } },
        ]).toArray()
        let chapter = ''
        for (const row of tax) {
          if (row._id.c !== chapter) { console.log(`  ${row._id.c}`); chapter = row._id.c }
          console.log(`      ${String(row.n).padStart(3)}  ${row._id.t}`)
        }
      }
    }

    await client.close()
  }
}

process.exit(failed ? 1 : 0)
