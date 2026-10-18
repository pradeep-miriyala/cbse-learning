// scripts/extract-learning-questions.mjs
//
// One-time-ish extractor: reads the hand-built mock-test HTML files and
// normalizes every question into a single shape for the Learning Lab bank.
//
//   node scripts/extract-learning-questions.mjs [--src <dir>] [--out <file>]
//
// Defaults to reading ~/Family/Saketh and writing scripts/learning-seed.json.
// Safe to re-run: output is deterministic, and contentHash lets the importer
// upsert instead of duplicating.

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import os from 'node:os'

const args = process.argv.slice(2)
const argVal = (flag, fallback) => {
  const i = args.indexOf(flag)
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback
}

const SRC_DIR = argVal('--src', path.join(os.homedir(), 'Family', 'Saketh'))
const OUT     = argVal('--out', path.join(process.cwd(), 'scripts', 'learning-seed.json'))

// ── Source manifest ────────────────────────────────────────────────────────
// Each entry maps one legacy HTML file onto grade/subject/topic taxonomy.
// `topics` maps the file's internal topic key → { slug, label } in the bank.

const SOURCES = [
  {
    file: 'PT1/Class6_Grammar_MockTest.html',
    schema: 'opts',
    grade: 6,
    subject: 'english',
    chapter: 'Grammar Foundations',
    topics: {
      noun:   { slug: 'nouns',              label: 'Nouns' },
      pos:    { slug: 'parts-of-speech',    label: 'Parts of Speech' },
      idiom:  { slug: 'idioms',             label: 'Idioms & Contractions' },
      figure: { slug: 'figures-of-speech',  label: 'Figures of Speech' },
    },
  },
  {
    file: 'PT2/Class6_Grammar_MockTest_Adjectives.html',
    schema: 'opts',
    grade: 6,
    subject: 'english',
    chapter: 'Adjectives',
    topics: {
      types:    { slug: 'adjective-types',         label: 'Types of Adjectives' },
      attrpred: { slug: 'attributive-predicative', label: 'Attributive & Predicative' },
      // Deliberately the same slug as the PT1 file — the overlap collapses on dedupe.
      figures:  { slug: 'figures-of-speech',       label: 'Figures of Speech' },
    },
  },
  {
    file: 'PT2/Class6_Maths_MockTest_PrimeNumbers.html',
    schema: 'opts',
    grade: 6,
    subject: 'maths',
    chapter: 'Prime Numbers',
    topics: {
      coprime:       { slug: 'coprimes',            label: 'Coprimes' },
      composite:     { slug: 'composite-numbers',   label: 'Composite Numbers' },
      factorization: { slug: 'prime-factorisation', label: 'Prime Factorisation' },
      divisibility:  { slug: 'divisibility-tests',  label: 'Divisibility Tests' },
    },
  },
  {
    file: 'PT2/Class6_SocialScience_MockTest_Harappan.html',
    schema: 'opts',
    grade: 6,
    subject: 'social-science',
    chapter: 'The Harappan Civilisation',
    topics: {
      cities:      { slug: 'harappan-cities',    label: 'Cities & Town Planning' },
      life:        { slug: 'harappan-life',      label: 'Life & Economy' },
      seals_text:  { slug: 'harappan-seals',     label: 'Seals & Script' },
      seals_image: { slug: 'harappan-seal-images', label: 'Seal Picture Questions' },
      discovery:   { slug: 'harappan-discovery', label: 'Discovery & Decline' },
    },
  },
  {
    file: 'PT1/number-play-mock-test.html',
    schema: 'bank',
    grade: 6,
    subject: 'maths',
    chapter: 'Number Play',
    topics: {
      'Supercells':                  { slug: 'supercells',           label: 'Supercells' },
      'Patterns on the Number Line': { slug: 'number-line-patterns', label: 'Patterns on the Number Line' },
      'Digit Sums':                  { slug: 'digit-sums',           label: 'Digit Sums' },
      'Digit Detectives':            { slug: 'digit-detectives',     label: 'Digit Detectives' },
      'Palindromic Patterns':        { slug: 'palindromes',          label: 'Palindromic Patterns' },
      'Kaprekar Number':             { slug: 'kaprekar',             label: 'Kaprekar Numbers' },
      'Clock and Calendar Numbers':  { slug: 'clock-calendar',       label: 'Clock & Calendar Numbers' },
    },
  },
  {
    // The "(1)" copy of this file is byte-identical in bank content — skipped.
    file: 'PT1/number-patterns-mock-test.html',
    schema: 'bank',
    grade: 6,
    subject: 'maths',
    chapter: 'Number Patterns',
    topics: {
      'Patterns in Numbers':              { slug: 'number-patterns',        label: 'Patterns in Numbers' },
      'Sequence Visualization':           { slug: 'sequence-visualisation', label: 'Sequence Visualisation' },
      'Relation Among Number Sequences':  { slug: 'sequence-relations',     label: 'Relations Among Sequences' },
      'Shape Patterns':                   { slug: 'shape-patterns',         label: 'Shape Patterns' },
    },
  },
  {
    file: 'PT1/vitamins-minerals-memory-game.html',
    schema: 'nutrients',
    grade: 6,
    subject: 'science',
    chapter: 'Vitamins & Minerals',
    topics: {
      use:  { slug: 'nutrient-functions',   label: 'What Nutrients Do' },
      low:  { slug: 'deficiency-signs',     label: 'Deficiency Signs' },
      food: { slug: 'nutrient-food-sources', label: 'Food Sources' },
    },
  },
]

const SUBJECT_LABEL = {
  english:         'English',
  maths:           'Maths',
  science:         'Science',
  'social-science': 'Social Science',
}

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Pull a JS array literal assigned to `name` out of an HTML file.
 * Most banks are strict JSON, but the vitamins page uses a plain JS object
 * literal with unquoted keys — so fall back to evaluating the literal.
 * These are local, hand-authored files, not untrusted input.
 */
function extractArray(html, name) {
  const re = new RegExp(`(?:const|let|var)\\s+${name}\\s*=\\s*(\\[[\\s\\S]*?\\]);\\s*\\n`)
  const m = html.match(re)
  if (!m) return null
  try {
    return JSON.parse(m[1])
  } catch {
    return Function(`"use strict"; return (${m[1]});`)()
  }
}

/** Strip HTML tags and collapse whitespace — used for dedupe keys only. */
const plain = (s) =>
  String(s ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

/**
 * Stable identity for a question: prompt + option set (order-independent) + any
 * visual payload. The visual matters — several Supercells questions share the
 * exact same prompt and options and differ *only* in the number row shown, so
 * hashing on text alone would silently discard valid questions.
 */
function contentHash(q) {
  const key = JSON.stringify([
    q.grade,
    q.subject,
    plain(q.question),
    [...q.options].map(plain).sort(),
    plain(q.visual),
    plain(q.imageSvg),
  ])
  return crypto.createHash('sha1').update(key).digest('hex').slice(0, 16)
}

function shuffleDeterministic(arr, seedStr) {
  // Not security-sensitive: just keeps seed output stable across runs so
  // re-imports don't churn. Runtime option order is shuffled per-attempt.
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

// ── Per-schema parsers ─────────────────────────────────────────────────────

/** Schema A: { topic, q, opts (opts[0] is correct), tip, img? } */
function parseOptsSchema(html, src) {
  const bank = extractArray(html, 'ALL_QUESTIONS')
  if (!bank) throw new Error(`ALL_QUESTIONS not found in ${src.file}`)

  return bank.map((raw) => {
    const topic = src.topics[raw.topic]
    if (!topic) throw new Error(`Unmapped topic "${raw.topic}" in ${src.file}`)

    // In this schema the correct answer is always opts[0]; the page shuffled at
    // render time. Shuffle once here so the stored bank isn't answer-first.
    const correct = raw.opts[0]
    const options = shuffleDeterministic(raw.opts, `${src.file}:${raw.id}`)

    return {
      grade:      src.grade,
      subject:    src.subject,
      chapter:    src.chapter,
      topic:      topic.slug,
      topicLabel: topic.label,
      question:   raw.q,
      options,
      answer:     options.indexOf(correct),
      hint:       raw.tip || '',
      visual:     null,
      imageSvg:   raw.img || null,
      source:     src.file,
    }
  })
}

/** Schema B: { category, subtopic, question, visual, options, answer (index), hint } */
function parseBankSchema(html, src) {
  const bank = extractArray(html, 'QUESTION_BANK')
  if (!bank) throw new Error(`QUESTION_BANK not found in ${src.file}`)

  return bank.map((raw) => {
    const topic = src.topics[raw.category]
    if (!topic) throw new Error(`Unmapped category "${raw.category}" in ${src.file}`)

    return {
      grade:      src.grade,
      subject:    src.subject,
      chapter:    src.chapter,
      topic:      topic.slug,
      topicLabel: topic.label,
      subtopic:   raw.subtopic || null,
      question:   raw.question,
      options:    raw.options,
      answer:     raw.answer,
      hint:       raw.hint || '',
      visual:     raw.visual || null,
      imageSvg:   null,
      source:     src.file,
    }
  })
}

/**
 * Schema C: the vitamins/minerals page had no question bank — it drove a study-card
 * + drag-match game off a 10-item nutrient list and generated quiz prompts at runtime.
 * We materialize those prompts into real questions so this content joins the one
 * shared exam UX. Each nutrient yields 3 questions (function / deficiency / food).
 */
function parseNutrientSchema(html, src) {
  const nutrients = extractArray(html, 'nutrients')
  if (!nutrients) throw new Error(`nutrients not found in ${src.file}`)

  const PROMPT = {
    use:  (n) => `Which one helps with this: ${n.use}?`,
    low:  (n) => `Which one is linked to this problem: ${n.low}?`,
    food: (n) => `Which one do you find in: ${n.food}?`,
  }
  const HINT = {
    use:  (n) => `${n.name} is the one that does this: ${n.use}.`,
    low:  (n) => `A shortage of ${n.name} shows up as: ${n.low}.`,
    food: (n) => `${n.name} is found in ${n.food}.`,
  }

  const out = []
  for (const field of ['use', 'low', 'food']) {
    const topic = src.topics[field]
    for (const n of nutrients) {
      // Three fixed distractors, chosen deterministically so the seed is stable.
      const others = nutrients.filter((x) => x.id !== n.id).map((x) => x.name)
      const distractors = shuffleDeterministic(others, `${field}:${n.id}`).slice(0, 3)
      const options = shuffleDeterministic([n.name, ...distractors], `opt:${field}:${n.id}`)

      out.push({
        grade:      src.grade,
        subject:    src.subject,
        chapter:    src.chapter,
        topic:      topic.slug,
        topicLabel: topic.label,
        question:   PROMPT[field](n),
        options,
        answer:     options.indexOf(n.name),
        hint:       HINT[field](n),
        visual:     null,
        imageSvg:   null,
        source:     src.file,
      })
    }
  }
  return out
}

const PARSERS = { opts: parseOptsSchema, bank: parseBankSchema, nutrients: parseNutrientSchema }

// ── Main ───────────────────────────────────────────────────────────────────

function main() {
  const all = []
  const perFile = []

  for (const src of SOURCES) {
    const full = path.join(SRC_DIR, src.file)
    if (!fs.existsSync(full)) {
      console.error(`  ! missing, skipped: ${src.file}`)
      continue
    }
    const html = fs.readFileSync(full, 'utf8')
    const parsed = PARSERS[src.schema](html, src)
    perFile.push({ file: src.file, count: parsed.length })
    all.push(...parsed)
  }

  // Dedupe on content, keeping the first occurrence but recording every source.
  const byHash = new Map()
  let dupes = 0
  for (const q of all) {
    const h = contentHash(q)
    const existing = byHash.get(h)
    if (existing) {
      dupes++
      if (!existing.sources.includes(q.source)) existing.sources.push(q.source)
      continue
    }
    const { source, ...rest } = q
    byHash.set(h, { contentHash: h, ...rest, sources: [source] })
  }

  const questions = [...byHash.values()]

  // Taxonomy summary, derived rather than hand-maintained.
  const taxonomy = {}
  for (const q of questions) {
    const s = (taxonomy[`${q.grade}:${q.subject}`] ??= {
      grade: q.grade,
      subject: q.subject,
      subjectLabel: SUBJECT_LABEL[q.subject] || q.subject,
      topics: {},
    })
    const t = (s.topics[q.topic] ??= { slug: q.topic, label: q.topicLabel, chapter: q.chapter, count: 0 })
    t.count++
  }

  const seed = {
    generatedAt: new Date().toISOString(),
    totalQuestions: questions.length,
    duplicatesCollapsed: dupes,
    taxonomy: Object.values(taxonomy).map((s) => ({ ...s, topics: Object.values(s.topics) })),
    questions,
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify(seed, null, 2))

  // ── Report ──
  console.log('\nParsed:')
  for (const f of perFile) console.log(`  ${String(f.count).padStart(4)}  ${f.file}`)
  console.log(`\n  ${all.length} extracted → ${questions.length} unique (${dupes} duplicates collapsed)\n`)
  for (const s of seed.taxonomy) {
    console.log(`  Grade ${s.grade} · ${s.subjectLabel}`)
    for (const t of s.topics) console.log(`      ${String(t.count).padStart(3)}  ${t.label}  (${t.slug})`)
  }
  console.log(`\nWrote ${OUT}\n`)
}

main()
