// src/lib/career.ts
// Career Choices domain model, for learners of 15 and above.
//
// This is deliberately NOT the Learning Lab model. There are no right answers,
// so nothing here scores, hints, or grades. What the paper produces is a
// *profile*, and what the profile produces is a shortlist of fields — each one
// shown as a ladder of roles at different entry costs rather than a single
// destination.
//
// The ladder is the whole point. A field is visible to a fifteen-year-old only
// through its apex role: everyone has heard of "doctor" and nobody has heard of
// radiographer, OT technician, or hospital administrator. A child who will not
// clear NEET currently learns nothing from the attempt except that they failed.
// Showing the rungs is how that is fixed without lying to anyone about any of
// them.

// Type-only — this module is imported by client components, so the driver must
// never end up in the browser bundle.
import type { ObjectId } from 'mongodb'

/**
 * The paper is for Class 10 and above. Below that the stream decision is years
 * away and a career label is a thing a child carries rather than uses, so the
 * page asks for age and turns younger visitors away rather than adapting.
 */
export const MIN_AGE = 15

// ── Interests ──────────────────────────────────────────────────────────────
// Holland's RIASEC. Public domain, decades of validation behind it, and the
// vocabulary O*NET publishes its own occupation tagging in — so a role card can
// be checked against an external source rather than against our own opinion.
//
// Multiple Intelligences is more popular in Indian schools and would have been
// an easier sell; its evidence base does not support telling a child anything.

export const INTERESTS = [
  'realistic',
  'investigative',
  'artistic',
  'social',
  'enterprising',
  'conventional',
] as const

export type Interest = (typeof INTERESTS)[number]
export type InterestScores = Record<Interest, number>

/**
 * Plain-language names. The RIASEC letters themselves are never shown to a
 * learner — "you are an ISE" is jargon dressed as insight, and a code is
 * exactly the kind of label this paper exists to avoid handing out.
 */
export const INTEREST_LABEL: Record<Interest, string> = {
  realistic:     'Working with your hands and with machines',
  investigative: 'Finding out why things happen',
  artistic:      'Making and designing things',
  social:        'Working with and for people',
  enterprising:  'Persuading, selling and running things',
  conventional:  'Organising, recording and keeping things straight',
}

export const INTEREST_SHORT: Record<Interest, string> = {
  realistic:     'Hands and machines',
  investigative: 'Finding out why',
  artistic:      'Making and designing',
  social:        'People',
  enterprising:  'Running things',
  conventional:  'Order and detail',
}

// ── The interest section's construction ────────────────────────────────────

/**
 * Every one of the twenty three-way combinations of six interests, used exactly
 * once. This is not a stylistic choice — it is the only way the section is fair.
 *
 * In a forced-choice paper an interest can be advantaged purely by the company
 * it keeps: a type that happens to be offered alongside two weak rivals wins
 * more often than one repeatedly set against strong ones. Using all twenty
 * triples makes every interest appear in exactly ten items and every *pair* of
 * interests meet in exactly four, so no type has an easier draw than another.
 *
 * The arithmetic only closes at twenty. Twenty-four items would put 72 pair
 * meetings across 15 pairs — 4.8 each — which cannot be balanced, and the
 * imbalance would sit invisibly inside every result the paper ever produced.
 */
export const INTEREST_ITEM_COUNT = 20

/**
 * Scores are ipsative: picking one interest necessarily denies two others, so
 * the six always sum to the same total. Rankings *within* a person are valid
 * and are all this paper uses. Comparing one learner's "artistic" against
 * another's is not valid, which is why no number from this section is ever
 * displayed, exported, or averaged across learners.
 */
export const INTEREST_MAX = 10

/**
 * How close two interests must be before they are reported as tied rather than
 * ranked. Two items' difference out of ten is comfortably inside the noise of a
 * twenty-item instrument, and a paper that claims a winner it does not have is
 * worse than one that says "you are between these two".
 */
export const TIE_MARGIN = 2

/** A profile with no peak at all — every interest inside one tie margin. */
export const FLAT_SPREAD = 3

// ── Work context ───────────────────────────────────────────────────────────
// What decides whether somebody lasts in a job, and what an interest inventory
// misses completely. Hotel management is on your feet, strangers all day, night
// shifts and relocation; a learner can score perfectly for it on interests and
// be certain to leave within a year.
//
// These are tags rather than scales so that the role cards stay legible to the
// experts reviewing them: a demand is a word a working nurse can agree or
// disagree with, not a coefficient.

export const CONTEXT_TAGS = [
  'outdoors',
  'on-feet',
  'desk-bound',
  'night-shifts',
  'irregular-hours',
  'strangers-daily',
  'high-responsibility',
  'relocation',
  'abroad',
  'variable-income',
  'physical-stamina',
  'blood-and-injury',
  'routine-work',
  'uniform',
] as const

export type ContextTag = (typeof CONTEXT_TAGS)[number]

export const CONTEXT_TAG_LABEL: Record<ContextTag, string> = {
  'outdoors':            'Outdoors or moving between sites',
  'on-feet':             'On your feet most of the day',
  'desk-bound':          'Mostly at a desk',
  'night-shifts':        'Shifts, including nights',
  'irregular-hours':     'Unpredictable hours',
  'strangers-daily':     'Dealing with strangers all day',
  'high-responsibility': 'You are the one answerable when it goes wrong',
  'relocation':          'Moving cities for work',
  'abroad':              'Working outside India',
  'variable-income':     'Income that varies with performance',
  'physical-stamina':    'Physically demanding',
  'blood-and-injury':    'Blood, injury and bodily fluids',
  'routine-work':        'Much the same rhythm every day',
  'uniform':             'Uniform and a clear chain of command',
}

/**
 * What a learner's context answers produce.
 *
 * `rejects` removes roles; `prefers` promotes them. The asymmetry is deliberate
 * — saying you would rather not work nights is a reliable statement about
 * yourself, while saying you would enjoy it is mostly a guess at fifteen.
 */
export interface ContextProfile {
  rejects: ContextTag[]
  prefers: ContextTag[]
}

// ── Rungs ──────────────────────────────────────────────────────────────────
// The level a role sits at on its field's ladder, defined by what it costs to
// enter rather than by status. This is the axis interests cannot see, and the
// one Indian families most often never discuss out loud.

export const RUNGS = [
  'vocational',
  'diploma',
  'degree',
  'degree-pg',
  'long-professional',
] as const

export type Rung = (typeof RUNGS)[number]

export const RUNG_LABEL: Record<Rung, string> = {
  'vocational':        'ITI or a short trade course',
  'diploma':           'Polytechnic or a diploma',
  'degree':            'A degree',
  'degree-pg':         'A degree and then a postgraduate qualification',
  'long-professional': 'A long professional training',
}

/** Years of full-time study after Class 12 that each rung typically costs. */
export const RUNG_YEARS: Record<Rung, number> = {
  'vocational':        1,
  'diploma':           3,
  'degree':            4,
  'degree-pg':         6,
  'long-professional': 8,
}

export const rungIndex = (r: Rung) => RUNGS.indexOf(r)

// ── Ordinal bands ──────────────────────────────────────────────────────────
// Pay and cost are groups, not numbers, and will stay groups until somebody is
// willing to own the figures and re-verify them.
//
// Two things fall out of that. Stale rupee figures cannot mislead a family
// planning around them — and, less obviously, nobody can divide pay by cost.
// A payback ratio would funnel every learner toward the same three highest-ratio
// careers, which is precisely the herd behaviour this whole feature exists to
// interrupt. With ordinal bands that calculation is not available to anyone,
// including us.

export const BANDS = ['low', 'medium', 'high'] as const
export type Band = (typeof BANDS)[number]

export const BAND_LABEL: Record<Band, string> = {
  low:    'Lower',
  medium: 'Middle',
  high:   'Higher',
}

/**
 * Reference roles that define each band.
 *
 * Twelve experts asked to call a salary "medium" will produce twelve private
 * scales. Asked instead to place a role beside a nurse, a site supervisor and
 * an engineer, they converge — which is how these bands were specified in the
 * first place. The admin UI asks for the comparison, not the adjective.
 */
export const PAY_ANCHORS: Record<Band, string> = {
  low:    'about what a school teacher or a nurse starts on',
  medium: 'about what a hotel operations manager or a site supervisor earns',
  high:   'about what an engineer or a qualified chartered accountant earns',
}

export const COST_ANCHORS: Record<Band, string> = {
  low:    'a government polytechnic or a state university seat',
  medium: 'a self-financed seat at a mid-range private college',
  high:   'a private professional college — medicine, some engineering, design',
}

// ── Aptitudes ──────────────────────────────────────────────────────────────
// Self-rated, and labelled as self-rated everywhere it appears. A real aptitude
// battery runs to ninety minutes and needs norming against a population; an
// improvised one would be pseudoscience wearing a lab coat. A self-rating is
// honest as long as it is never called a test, and works well enough as a soft
// weight — which is the only thing it is allowed to be here.

export const APTITUDES = [
  'maths',
  'language',
  'spatial',
  'memory',
  'visual',
  'persuading',
  'pressure',
  'detail',
] as const

export type Aptitude = (typeof APTITUDES)[number]

export const APTITUDE_LABEL: Record<Aptitude, string> = {
  maths:      'Numbers and calculation',
  language:   'Reading and writing',
  spatial:    'Picturing how things fit together',
  memory:     'Remembering a lot of detail',
  visual:     'Drawing and visual sense',
  persuading: 'Persuading people',
  pressure:   'Staying calm when it goes wrong',
  detail:     'Careful, exact work',
}

/** Self-rating scale. Four points, so there is no neutral middle to hide in. */
export const APTITUDE_SCALE = [
  { value: 1, label: 'Not me at all' },
  { value: 2, label: 'Not really' },
  { value: 3, label: 'Fairly comfortable' },
  { value: 4, label: 'One of my strengths' },
] as const

/**
 * How far below a role's stated requirement a self-rating must fall before it
 * counts against the role. One point below is inside the noise of somebody
 * guessing at their own maths; two is a real signal.
 *
 * It is a penalty and never a filter. A fifteen-year-old's estimate of their own
 * ability is not a fact about them, and no answer given here should ever be able
 * to remove a career from the page.
 */
export const APTITUDE_TOLERANCE = 2

// ── Documents ──────────────────────────────────────────────────────────────

export type ReviewState = 'draft' | 'in_review' | 'expert_approved' | 'published'

export const REVIEW_STATES: ReviewState[] = [
  'draft', 'in_review', 'expert_approved', 'published',
]

/** Carried by every document an expert can change. See career_revisions. */
export interface Reviewable {
  version: number
  reviewState: ReviewState
  updatedAt: Date
  updatedBy: string
  /** Set when reviewState first reaches expert_approved. Shown on the card. */
  approvedBy?: string | null
  approvedAt?: Date | null
}

export interface CareerField extends Reviewable {
  _id?: ObjectId
  slug: string
  label: string
  /** One line a fifteen-year-old would recognise the field from. */
  blurb: string
  order: number
}

export interface CostBand {
  /** e.g. "BSc Nursing at a government college" */
  route: string
  govt: Band
  private: Band
  years: number
}

export interface CareerRole extends Reviewable {
  _id?: ObjectId
  slug: string
  field: string
  label: string
  /**
   * What the job is on an ordinary Tuesday. Not the brochure sentence — the
   * thing that tells a learner whether they would like the actual hours of it.
   */
  tuesday: string
  rung: Rung
  /** Primary first. Two or three; a role that matches everything matches nothing. */
  interests: Interest[]
  /** Conditions the job imposes. A learner who ruled one out will not see it. */
  requires: ContextTag[]
  /** Minimum comfortable self-rating, 1–4, for the aptitudes that matter. */
  aptitudes: Partial<Record<Aptitude, number>>
  /** Stream slugs this role is reachable from. Empty means stream-agnostic. */
  streams: string[]
  entryRoutes: string[]
  /** Whether getting in turns on one high-stakes entrance exam. */
  entranceIntensity: 'none' | 'moderate' | 'high'
  payStart: Band
  payLater: Band
  costs: CostBand[]
  fundingRefs: string[]
  /**
   * Why people leave. Every other career resource omits this, which is exactly
   * why a learner has no way to tell an honest one from a prospectus.
   */
  whyPeopleLeave: string
  sources: string[]
  /** Median of the expert placements, once there are any. See careerReview. */
  payVotes?: { expert: string; payStart: Band; payLater: Band }[]
}

export interface CareerStream extends Reviewable {
  _id?: ObjectId
  slug: string
  label: string
  board: 'cbse' | 'intermediate' | 'vocational'
  /**
   * What the stream was built to feed. The result page states this and stops —
   * it does not recommend one. A stream is a machine with a documented output,
   * and the learner is the one who decides whether they want that output.
   */
  designedFor: string
  whatTwoYearsAreLike: string
  opens: string[]
  /**
   * What it makes hard or impossible, said plainly. MEC does not lead to
   * engineering, and a learner deserves that at fifteen rather than at
   * seventeen. It sits next to lateralRoutes so it is never the last word.
   */
  narrows: string
  lateralRoutes: string[]
  examsItSetsUpFor: string[]
  order: number
}

export interface CareerFunding extends Reviewable {
  _id?: ObjectId
  slug: string
  label: string
  kind: 'loan' | 'scholarship' | 'fee-waiver' | 'stipend'
  /** Who it is for, in the words a parent would use. */
  whoFor: string
  covers: string
  /**
   * The mechanics that make it worth knowing about. Figures live in `figures`
   * and are left empty until an expert fills and dates them — a wrong ceiling
   * or threshold in a document a family plans around is worse than a blank one.
   */
  mechanics: string[]
  figures: { label: string; value: string }[]
  applyAt: string
  sourceUrl: string
  lastVerifiedAt?: Date | null
  lastVerifiedBy?: string | null
}

// ── The paper ──────────────────────────────────────────────────────────────

export type SectionId = 'interests' | 'context' | 'route' | 'aptitude'

export const SECTIONS: { id: SectionId; title: string; intro: string }[] = [
  { id: 'interests', title: 'What you would rather be doing',
    intro: 'Twenty situations. There is no right answer to any of them — pick the one you would actually choose, not the one that sounds best.' },
  { id: 'context', title: 'How you want to work',
    intro: 'These decide whether a job suits you far more than the job title does. Answer for the life you want, not the salary.' },
  { id: 'route', title: 'How you want to get there',
    intro: 'How long you are willing to study, and how. There is no better or worse answer here — the routes are different, not ranked.' },
  { id: 'aptitude', title: 'How you would rate yourself',
    intro: 'Your own opinion of yourself, not a test. Nothing here can take a career off your list; it only changes the order.' },
]

export interface TriadOption {
  text: string
  interest: Interest
}

export interface ContextOption {
  text: string
  rejects?: ContextTag[]
  prefers?: ContextTag[]
}

export interface RouteOption {
  text: string
  /** The furthest rung this answer is willing to reach, when it says anything. */
  maxRung?: Rung
  /** Set when the answer rules out roles gated by one high-stakes exam. */
  avoidsHighStakes?: boolean
  /** Set when the answer actively favours earning early. */
  prefersEarly?: boolean
}

export type CareerItemBody =
  | { section: 'interests'; prompt: string; options: TriadOption[] }
  | { section: 'context'; prompt: string; options: ContextOption[] }
  | { section: 'route'; prompt: string; options: RouteOption[] }
  | { section: 'aptitude'; prompt: string; aptitude: Aptitude }

export type CareerItem = Reviewable & { _id?: ObjectId; key: string; order: number } & CareerItemBody

// ── Scoring ────────────────────────────────────────────────────────────────

export interface Ranked {
  interest: Interest
  score: number
  /** Interests inside TIE_MARGIN of this one, reported together rather than ranked. */
  tiedWith: Interest[]
}

/**
 * Rank the six interests, collapsing differences too small to mean anything.
 *
 * `flat` marks the profile with no peak at all. It needs saying rather than
 * hiding: a learner who is mildly interested in everything has been told by the
 * paper that it cannot narrow things down for them, which is true and useful,
 * and much better than handing them a top three built out of rounding.
 */
export function rankInterests(scores: InterestScores): { ranked: Ranked[]; flat: boolean } {
  const sorted = [...INTERESTS].sort((a, b) => scores[b] - scores[a])
  const spread = scores[sorted[0]] - scores[sorted[sorted.length - 1]]

  const ranked = sorted.map((interest) => ({
    interest,
    score: scores[interest],
    tiedWith: sorted.filter(
      (o) => o !== interest && Math.abs(scores[o] - scores[interest]) < TIE_MARGIN,
    ),
  }))

  return { ranked, flat: spread < FLAT_SPREAD }
}

export interface LearnerProfile {
  interests: InterestScores
  context: ContextProfile
  maxRung: Rung
  avoidsHighStakes: boolean
  prefersEarly: boolean
  aptitudes: Partial<Record<Aptitude, number>>
}

export type RoleStanding =
  /** Reachable on the study appetite they described. */
  | 'in-range'
  /** One rung beyond it — shown deliberately, marked as a stretch. */
  | 'stretch'
  /** Further up the same ladder. Shown greyed so the ladder stays whole. */
  | 'further-up'
  /** Ruled out by something they said they will not do. */
  | 'filtered'

export interface ScoredRole {
  role: CareerRole
  score: number
  standing: RoleStanding
  /** The tag they ruled out, when standing is 'filtered'. Drives the copy. */
  blockedBy: ContextTag | null
  /** Aptitudes they rated well below the role's stated need. Never a filter. */
  stretchedOn: Aptitude[]
}

/**
 * Score one role against a profile.
 *
 * A filtered role keeps its interest score. It has to: the ladder is still
 * shown, and the copy tells the learner *which* answer removed it and what
 * would open it again. A career the paper will not recommend is not a career
 * the paper is willing to hide.
 */
export function scoreRole(role: CareerRole, p: LearnerProfile): ScoredRole {
  let score = 0

  // Interests, weighted by position — a role's primary interest is most of what
  // it is, and the third is closer to flavour than to fit.
  role.interests.forEach((i, idx) => {
    score += (p.interests[i] ?? 0) * [1, 0.6, 0.3][idx]
  })

  const blockedBy = role.requires.find((t) => p.context.rejects.includes(t)) ?? null
  for (const t of role.requires) {
    if (p.context.prefers.includes(t)) score += 2
  }

  const stretchedOn: Aptitude[] = []
  for (const [apt, need] of Object.entries(role.aptitudes) as [Aptitude, number][]) {
    const self = p.aptitudes[apt]
    if (self === undefined) continue
    if (need - self >= APTITUDE_TOLERANCE) {
      stretchedOn.push(apt)
      score -= 2
    } else if (self > need) {
      score += 1
    }
  }

  if (p.avoidsHighStakes && role.entranceIntensity === 'high') score -= 4
  if (p.prefersEarly && rungIndex(role.rung) <= rungIndex('diploma')) score += 3

  const gap = rungIndex(role.rung) - rungIndex(p.maxRung)
  const standing: RoleStanding = blockedBy
    ? 'filtered'
    : gap <= 0 ? 'in-range'
    : gap === 1 ? 'stretch'
    : 'further-up'

  if (standing === 'stretch') score -= 2
  if (standing === 'further-up') score -= 8

  return { role, score, standing, blockedBy, stretchedOn }
}

export interface ScoredField {
  field: CareerField
  score: number
  roles: ScoredRole[]
  /** How well the field fits how they want to work, ignoring interests. */
  contextFit: number
}

/**
 * A field is worth as much as the best two roles a learner could actually take
 * up in it. Not the best one — a field represented by a single reachable role is
 * a narrower recommendation than it looks. Not the average either, which would
 * punish exactly the broad ladders this design exists to surface.
 */
export function scoreField(
  field: CareerField,
  roles: CareerRole[],
  p: LearnerProfile,
): ScoredField {
  const scored = roles
    .map((r) => scoreRole(r, p))
    .sort((a, b) => b.score - a.score)

  const live = scored.filter((r) => r.standing !== 'filtered' && r.standing !== 'further-up')
  const score = live.slice(0, 2).reduce((a, r) => a + r.score, 0)

  const contextFit = live.length
    ? live.reduce(
        (a, r) => a + r.role.requires.filter((t) => p.context.prefers.includes(t)).length,
        0,
      ) / live.length
    : 0

  return { field, score, roles: scored, contextFit }
}

export const SHORTLIST_SIZE = 5

export interface Recommendation {
  shortlist: ScoredField[]
  /**
   * One field the learner did not lean toward, chosen because everything about
   * *how* they want to work fits it anyway.
   *
   * A recommender that only returns what somebody already leans toward cannot
   * fix a knowledge gap, and the knowledge gap is the entire problem. So this
   * is picked by context fit with the interest score deliberately ignored, and
   * labelled on the page as something they did not score for.
   */
  wildcard: ScoredField | null
  flat: boolean
  ranked: Ranked[]
}

export function recommend(
  fields: CareerField[],
  rolesByField: Record<string, CareerRole[]>,
  p: LearnerProfile,
): Recommendation {
  const scored = fields
    // A field holding no role cards at all is not a recommendation, it is an
    // empty heading. Ten of the twelve fields are seeded as names only while
    // their ladders are still being written, and until a field has rungs it has
    // nothing to say. This is not the same as a field whose rungs are all ruled
    // out — those are still drawn, greyed, with the reason on them.
    .filter((f) => (rolesByField[f.slug]?.length ?? 0) > 0)
    .map((f) => scoreField(f, rolesByField[f.slug] ?? [], p))
    .sort((a, b) => b.score - a.score)

  const shortlist = scored.slice(0, SHORTLIST_SIZE)
  const rest = scored.slice(SHORTLIST_SIZE).filter((f) =>
    f.roles.some((r) => r.standing === 'in-range'),
  )

  const wildcard = rest.length
    ? rest.reduce((best, f) => (f.contextFit > best.contextFit ? f : best))
    : null

  const { ranked, flat } = rankInterests(p.interests)
  return { shortlist, wildcard, flat, ranked }
}

// ── Attempts ───────────────────────────────────────────────────────────────

export interface CareerAttempt {
  _id?: ObjectId
  /**
   * Who was sitting the paper. In the pilot this is always an expert or a
   * seeded persona; when real learners arrive it becomes 'learner', and that is
   * the flag every reviewer-facing query filters on. Building the door now
   * costs nothing — retrofitting it once children's answers are in the
   * collection is where this kind of thing goes wrong.
   */
  taker: 'expert' | 'persona' | 'learner'
  takerName: string
  /** Set for persona runs, so every expert rates the same inputs. */
  personaKey?: string | null
  deviceId?: string | null
  answers: Record<string, number>
  profile: LearnerProfile
  /** What was actually shown, so a rating can be read against it later. */
  shown: { fields: string[]; roles: string[]; wildcard: string | null }
  createdAt: Date
  durationMs?: number | null
}

/**
 * An expert's verdict on one attempt's output.
 *
 * `missing` is the field that earns its keep. A bad recommendation is visible
 * on the page and will be reported without being asked for; an *absent* one is
 * invisible unless somebody is asked to name it. For a tool whose whole purpose
 * is exposure, the roles that failed to appear are the failures that matter.
 */
export interface CareerAttemptRating {
  _id?: ObjectId
  attemptId: string
  expert: string
  ratedAt: Date
  overall: 1 | 2 | 3 | 4 | 5
  roleVerdicts: { roleId: string; verdict: 'good' | 'plausible' | 'wrong' }[]
  missing: string[]
  wildcardVerdict: 'useful' | 'noise' | null
  note: string
}

// ── Helpers ────────────────────────────────────────────────────────────────

export function sanitizeName(raw: unknown): string {
  return String(raw ?? '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40)
}

export const emptyInterestScores = (): InterestScores =>
  Object.fromEntries(INTERESTS.map((i) => [i, 0])) as InterestScores

/** Median of an ordinal band. Used for the expert pay placements on a role. */
export function medianBand(bands: Band[]): Band | null {
  if (!bands.length) return null
  const idx = bands.map((b) => BANDS.indexOf(b)).sort((a, b) => a - b)
  return BANDS[idx[Math.floor(idx.length / 2)]]
}

/** True when the experts who placed a role do not agree on its band. */
export const bandsDisagree = (bands: Band[]) => new Set(bands).size > 1

/**
 * Drop a label into the middle of a sentence.
 *
 * Only the first character is lowered, so "Working outside India" reads as
 * "working outside India" rather than losing the proper noun — which a blanket
 * toLowerCase() on the whole label does.
 */
export const midSentence = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

// ── Turning answers into a profile ─────────────────────────────────────────

/**
 * Fold a set of answers into the profile the recommender reads.
 *
 * Answers are indexes into each item's options, exactly as the item was stored
 * — nothing on this paper is shuffled. Shuffling is right for a scored test,
 * where a fixed answer position is a shortcut; here there is no correct option
 * to hide, and keeping the order stable means an answer recorded today can
 * still be read against the item a year from now.
 *
 * An unanswered item contributes nothing rather than a default. A default would
 * be an opinion the learner did not express, and on the context section it
 * would silently remove careers on their behalf.
 */
export function buildProfile(
  items: CareerItem[],
  answers: Record<string, number>,
): LearnerProfile {
  const interests = emptyInterestScores()
  const rejects = new Set<ContextTag>()
  const prefers = new Set<ContextTag>()
  const aptitudes: Partial<Record<Aptitude, number>> = {}

  let maxRung: Rung = 'degree'
  let avoidsHighStakes = false
  let prefersEarly = 0

  for (const item of items) {
    const a = answers[item.key]
    if (a === undefined || a === null) continue

    if (item.section === 'aptitude') {
      const v = Number(a)
      if (v >= 1 && v <= 4) aptitudes[item.aptitude] = v
      continue
    }

    const opt = item.options[a]
    if (!opt) continue

    if (item.section === 'interests') {
      interests[(opt as TriadOption).interest] += 1
    } else if (item.section === 'context') {
      const o = opt as ContextOption
      for (const t of o.rejects ?? []) rejects.add(t)
      for (const t of o.prefers ?? []) prefers.add(t)
    } else if (item.section === 'route') {
      const o = opt as RouteOption
      // The furthest any answer reaches wins. Someone willing to study part-time
      // later has said something about their ceiling even if they also said they
      // want to be earning at twenty, and both answers are true at once.
      if (o.maxRung && rungIndex(o.maxRung) > rungIndex(maxRung)) maxRung = o.maxRung
      if (o.avoidsHighStakes) avoidsHighStakes = true
      if (o.prefersEarly) prefersEarly++
    }
  }

  // A single "I'd like to earn early" answer is a mood; two or more across
  // different questions is a preference worth acting on.
  return {
    interests,
    context: { rejects: [...rejects], prefers: [...prefers] },
    maxRung,
    avoidsHighStakes,
    prefersEarly: prefersEarly >= 2,
    aptitudes,
  }
}

/**
 * What content a request may see.
 *
 * During the pilot every card is a draft and the only people through the gate
 * are experts, so an expert sees everything. A learner only ever sees published
 * cards — which today is none, and that is the correct behaviour rather than a
 * gap: nothing should reach a fifteen-year-old before somebody has put their
 * name to it.
 */
export const visibilityFilter = (isExpert: boolean) =>
  isExpert ? {} : { reviewState: 'published' as ReviewState }
