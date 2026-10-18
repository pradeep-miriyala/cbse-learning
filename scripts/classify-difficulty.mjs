// scripts/classify-difficulty.mjs
//
// Assigns Easy / Medium / Hard to every question in the bank.
//
//   MONGODB_URI=... node scripts/classify-difficulty.mjs            # dry run + report
//   MONGODB_URI=... node scripts/classify-difficulty.mjs --apply    # write to the bank
//   MONGODB_URI=... node scripts/classify-difficulty.mjs --sample 8 # show worked examples
//
// The rules below encode what makes a multiple-choice question hard for a
// Class 6 reader specifically. They are deliberately explicit rather than a
// black box, so a wrong call can be traced to a rule and the rule fixed.
//
// The ranking is provisional. Once enough learners have answered a question,
// its observed success rate is a far better measure and should replace this.

import { MongoClient } from 'mongodb'

const args = process.argv.slice(2)
const APPLY = args.includes('--apply')
const SAMPLE = args.includes('--sample') ? Number(args[args.indexOf('--sample') + 1]) || 6 : 0

const strip = (s) => String(s ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

/**
 * Score a question. Higher means harder. Every rule returns a reason string so
 * the classification can be audited afterwards.
 */
function score(q) {
  const raw = String(q.question ?? '')
  const stem = strip(q.question).toLowerCase()
  const opts = (q.options || []).map(strip)
  const signals = []
  let s = 0
  const add = (points, why) => { s += points; signals.push(`${points > 0 ? '+' : ''}${points} ${why}`) }

  const avgOpt = opts.length ? opts.reduce((a, b) => a + b.length, 0) / opts.length : 0

  // ── 1. Base level: what kind of thinking is being asked for? ──────────
  // This is the dominant factor, so it sets the base rather than nudging it.
  //
  //   0 — recall a stored fact          "The plural of child is:"
  //   1 — classify a fresh example      "…What kind of noun is Priya?"
  //   2 — reason, predict or evaluate   "Why does a ship float?"
  //
  // A question that is *about* a negation ("the contraction of do not") is
  // recall, so this must be decided before the negation rule runs.
  const isAboutWords = /\b(contraction|full form|plural|masculine|feminine|opposite) of\b/.test(stem)

  if (/\bwhy\b/.test(stem)) add(2, 'asks why — reasoning')
  else if (/what (would|will) happen|what happens (if|when)|\bsuppose\b|if a |if you /.test(stem))
    add(2, 'predicts a new situation')
  else if (/which statement|which of these is correct|correctly (matches|shows|compares)|which pair/.test(stem))
    add(2, 'must weigh all four options as statements')
  else if (/\b(differ|difference between|compared with|rather than|better than|instead of)\b/.test(stem))
    add(2, 'compares two things')
  else if (/how (can|could|would|does|do|is|are) /.test(stem)) add(1, 'explains a mechanism')
  // An example sentence before the question means applying a rule, not recall.
  // Bolded target words were authored precisely for these classify-the-example items.
  else if (!isAboutWords && /<b>/.test(raw) && stem.length > 55) add(1, 'classify a word inside a given example')
  else if (!isAboutWords && /\. .+\?/.test(strip(q.question))) add(1, 'applies a rule to a given example')

  // ── 2. Negation, but only when it is the instruction ──────────────────
  // "Which of these is NOT…" is a genuine trap. "the contraction of do not"
  // is not — there the word is the subject matter.
  const negatedInstruction = /<b>not<\/b>|\bexcept\b|which .{0,40}\bnot\b|is \bnot\b (a|an|the)|\bnever\b.*\?/.test(raw.toLowerCase())
  if (negatedInstruction && !isAboutWords) add(2, 'negative instruction — easy to read past')

  // ── 3. Discrimination between close options ───────────────────────────
  // Options from one family have to be told apart rather than recognised.
  if (opts.length >= 3) {
    const tails = opts.map(o => o.toLowerCase().split(/\s+/).slice(-1)[0])
    const heads = opts.map(o => o.toLowerCase().split(/\s+/)[0])
    const family = new Set(tails).size <= Math.ceil(opts.length / 2)
                || new Set(heads).size <= Math.ceil(opts.length / 2)
    if (family) add(1, 'options from one family — must be told apart')
  }

  // ── 3b. What the answer itself demands ────────────────────────────────
  // Where a whole topic is built from one question shape, structure cannot
  // separate the items — but the concept being tested still does. These are
  // teacher judgements about which ideas a Class 6 child finds slippery.
  const ans = strip(opts[q.answer] || '').toLowerCase()

  // Figures of speech: "like"/"as" hands you a simile; a metaphor has no cue.
  if (/figure of speech/.test(stem)) {
    if (/\bsimile\b|\balliteration\b|\bonomatopoeia\b/.test(ans))
      add(-1, 'figure has an obvious cue (like/as, repeated sound)')
    else if (/\bmetaphor\b|\bpersonification\b/.test(ans))
      add(1, 'figure has no cue word — must infer the comparison')
  }

  // Noun types: a proper noun is flagged by its capital letter. Abstract,
  // collective and material nouns need the category to be understood.
  if (/kind of noun/.test(stem)) {
    if (/proper noun|common noun/.test(ans)) add(-1, 'noun type visible from the word itself')
    else if (/abstract|collective|material/.test(ans)) add(1, 'noun type needs the category understood')
  }

  // Parts of speech: the content words are taught first and are concrete.
  // The function words are the ones children reliably confuse.
  if (/part of speech/.test(stem)) {
    if (/^(noun|verb|adjective|adverb)$/.test(ans)) add(-1, 'content word — taught first')
    else if (/preposition|conjunction|interjection|pronoun/.test(ans))
      add(1, 'function word — commonly confused')
  }

  // ── 4. Reading and processing load ────────────────────────────────────
  if (avgOpt > 50) add(1, 'long options')
  if (stem.length > 140) add(1, 'long stem')

  // ── 5. Number work ────────────────────────────────────────────────────
  if (/how many|calculate|what is the (sum|product|value)|per cent|\d+\s*[x×+\-]\s*\d+/.test(stem))
    add(1, 'counting or calculation')

  // ── 6. Figures and grids ──────────────────────────────────────────────
  if (q.visual || q.imageSvg) add(1, 'must read a figure or number grid')

  // ── 7. Two ideas in the answer ────────────────────────────────────────
  const answerText = strip(opts[q.answer] || '').toLowerCase()
  if (/\band\b/.test(answerText) && answerText.length > 35)
    add(1, 'answer combines two ideas')

  return { score: s, signals }
}

const bandOf = (s) => (s <= 0 ? 'easy' : s <= 2 ? 'medium' : 'hard')

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) { console.error('MONGODB_URI not set'); process.exit(1) }
  const client = new MongoClient(uri)
  await client.connect()
  const col = client.db('pradeep-site').collection('learning_questions')

  // Authored ratings are deliberate and outrank the heuristic.
  const all = await col.find({ difficultySource: { $ne: 'authored' } }).toArray()
  const authored = await col.countDocuments({ difficultySource: 'authored' })
  if (authored) console.log(`(skipping ${authored} questions with an authored difficulty)`)
  const scored = all.map(q => ({ q, ...score(q) }))

  // ── Distribution ──
  const dist = { easy: 0, medium: 0, hard: 0 }
  scored.forEach(x => dist[bandOf(x.score)]++)
  const pct = (n) => Math.round((n / scored.length) * 100)
  console.log(`\n${scored.length} questions classified`)
  console.log(`   easy    ${String(dist.easy).padStart(4)}  ${pct(dist.easy)}%`)
  console.log(`   medium  ${String(dist.medium).padStart(4)}  ${pct(dist.medium)}%`)
  console.log(`   hard    ${String(dist.hard).padStart(4)}  ${pct(dist.hard)}%`)

  // ── Per subject, so no subject ends up all one band ──
  const bySubject = {}
  scored.forEach(x => {
    const s = (bySubject[x.q.subject] ??= { easy: 0, medium: 0, hard: 0 })
    s[bandOf(x.score)]++
  })
  console.log('\nby subject:')
  for (const [sub, d] of Object.entries(bySubject)) {
    const t = d.easy + d.medium + d.hard
    console.log(`   ${sub.padEnd(16)} E ${String(d.easy).padStart(3)}  M ${String(d.medium).padStart(3)}  H ${String(d.hard).padStart(3)}   (${Math.round(d.easy/t*100)}/${Math.round(d.medium/t*100)}/${Math.round(d.hard/t*100)})`)
  }

  // ── Topics that cannot support a mixed paper ──
  const byTopic = {}
  scored.filter(x => x.q.status === 'published').forEach(x => {
    const t = (byTopic[x.q.topicLabel] ??= { easy: 0, medium: 0, hard: 0, n: 0 })
    t[bandOf(x.score)]++; t.n++
  })
  const thin = Object.entries(byTopic).filter(([, t]) => t.easy < 2 || t.medium < 2 || t.hard < 2)
  console.log(`\ntopics missing at least one band (cannot honour every mix): ${thin.length} of ${Object.keys(byTopic).length}`)
  thin.slice(0, 10).forEach(([name, t]) =>
    console.log(`   ${name.padEnd(38)} E${t.easy} M${t.medium} H${t.hard}  (n=${t.n})`))

  // ── Worked examples, to sanity-check the rules ──
  if (SAMPLE) {
    for (const band of ['easy', 'medium', 'hard']) {
      console.log(`\n──── ${band.toUpperCase()} examples ────`)
      scored.filter(x => bandOf(x.score) === band).slice(0, SAMPLE).forEach(x => {
        console.log(`\n  [${x.score}] ${strip(x.q.question).slice(0, 96)}`)
        console.log(`      → ${strip(x.q.options[x.q.answer]).slice(0, 70)}`)
        if (x.signals.length) console.log(`      ${x.signals.join(' · ')}`)
      })
    }
  }

  if (APPLY) {
    const now = new Date()
    const res = await col.bulkWrite(scored.map(x => ({
      updateOne: {
        filter: { _id: x.q._id },
        update: { $set: {
          difficulty: bandOf(x.score),
          difficultyScore: x.score,
          difficultySignals: x.signals,
          difficultySource: 'heuristic',
          difficultyAt: now,
        } },
      },
    })), { ordered: false })
    console.log(`\napplied to ${res.modifiedCount} questions`)
  } else {
    console.log('\n(dry run — pass --apply to write)')
  }

  await client.close()
}

main().catch(e => { console.error(e); process.exit(1) })
