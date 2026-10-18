// src/lib/mongodb.ts
// Singleton pattern for serverless — reuses connection across warm invocations

import { MongoClient, MongoClientOptions, Db } from 'mongodb'

const uri = process.env.MONGODB_URI!
const options: MongoClientOptions = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined')
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  // In dev, use global to preserve connection across HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDb(): Promise<Db> {
  const client = await clientPromise
  return client.db('pradeep-site')
}

// Collections. The database and the collection names are shared with the admin in the pradeep.miriyala.in repo,
// which edits the question bank and reads the attempts. Change a name here and it has to change there.

export async function getRateLimitCollection() {
  const db = await getDb()
  return db.collection('rate_limits')
}

export async function getLearningQuestionsCollection() {
  const db = await getDb()
  return db.collection('learning_questions')
}

/** Generated papers. TTL-indexed — see scripts/import-learning.mjs. */
export async function getLearningPapersCollection() {
  const db = await getDb()
  return db.collection('learning_papers')
}

export async function getLearningAttemptsCollection() {
  const db = await getDb()
  return db.collection('learning_attempts')
}

export async function getLearningFeedbackCollection() {
  const db = await getDb()
  return db.collection('learning_feedback')
}

/**
 * Questions suggested by parents and teachers, awaiting review.
 *
 * Kept apart from the bank on purpose: nothing a stranger types should sit in
 * the same collection the papers are drawn from, however it is flagged. A
 * suggestion becomes a question only by being approved, which writes a fresh
 * document through the same path the admin form uses.
 */
export async function getLearningSuggestionsCollection() {
  const db = await getDb()
  return db.collection('learning_suggestions')
}

/** The twelve fields. Each one owns a ladder of roles. */
export async function getCareerFieldsCollection() {
  const db = await getDb()
  return db.collection('career_fields')
}

/** Role cards — the rungs. */
export async function getCareerRolesCollection() {
  const db = await getDb()
  return db.collection('career_roles')
}

/** Stream spec sheets: what each stream is designed to do, and what it narrows. */
export async function getCareerStreamsCollection() {
  const db = await getDb()
  return db.collection('career_streams')
}

/** Loans, scholarships and waivers. Referenced by roles, never embedded — a
 *  corrected moratorium rule has to change in one document, not in fifty. */
export async function getCareerFundingCollection() {
  const db = await getDb()
  return db.collection('career_funding')
}

/** Questionnaire items, all four sections. */
export async function getCareerItemsCollection() {
  const db = await getDb()
  return db.collection('career_items')
}

export async function getCareerAttemptsCollection() {
  const db = await getDb()
  return db.collection('career_attempts')
}

/** Expert verdicts on an attempt's output. See CareerAttemptRating. */
export async function getCareerAttemptRatingsCollection() {
  const db = await getDb()
  return db.collection('career_attempt_ratings')
}

/** Full prior snapshots of every editable document. The audit trail. */
export async function getCareerRevisionsCollection() {
  const db = await getDb()
  return db.collection('career_revisions')
}

/** Expert suggestions, pinned to a card and to the version they were reading. */
export async function getCareerReviewsCollection() {
  const db = await getDb()
  return db.collection('career_reviews')
}

/** One document per invited expert. Holds the HMAC of their code, never the code. */
export async function getCareerExpertsCollection() {
  const db = await getDb()
  return db.collection('career_experts')
}
