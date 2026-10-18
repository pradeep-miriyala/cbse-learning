// src/lib/careerResult.ts
// Turning a profile into the result the page renders.
//
// Extracted so that a persona run and a real submission go through exactly the
// same code. If the calibration set were scored by a second implementation, the
// experts would be rating something no learner will ever see, and the whole
// point of a fixed persona set would be lost.

import {
  recommend,
  visibilityFilter,
  INTEREST_LABEL,
  INTEREST_SHORT,
  CONTEXT_TAG_LABEL,
  RUNG_LABEL,
  APTITUDE_LABEL,
  BAND_LABEL,
  midSentence,
  type LearnerProfile,
  type CareerField,
  type CareerRole,
  type CareerStream,
  type CareerFunding,
  rungIndex,
  type ScoredField,
  type ScoredRole,
} from './career'
import {
  getCareerFieldsCollection,
  getCareerRolesCollection,
  getCareerStreamsCollection,
  getCareerFundingCollection,
} from './mongodb'

const shapeRole = (sr: ScoredRole) => ({
  slug: sr.role.slug,
  label: sr.role.label,
  tuesday: sr.role.tuesday,
  rung: sr.role.rung,
  rungLabel: RUNG_LABEL[sr.role.rung],
  standing: sr.standing,
  blockedBy: sr.blockedBy,
  blockedByLabel: sr.blockedBy ? CONTEXT_TAG_LABEL[sr.blockedBy] : null,
  stretchedOn: sr.stretchedOn.map((a) => APTITUDE_LABEL[a]),
  entryRoutes: sr.role.entryRoutes,
  entranceIntensity: sr.role.entranceIntensity,
  streams: sr.role.streams,
  pay: {
    start: sr.role.payStart, startLabel: BAND_LABEL[sr.role.payStart],
    later: sr.role.payLater, laterLabel: BAND_LABEL[sr.role.payLater],
  },
  costs: sr.role.costs,
  fundingRefs: sr.role.fundingRefs,
  whyPeopleLeave: sr.role.whyPeopleLeave,
  approvedBy: sr.role.approvedBy ?? null,
  reviewState: sr.role.reviewState,
})

/**
 * Roles come back in LADDER order — shortest route in, first — rather than in
 * score order. A ranked list invites a learner to read the top one as the
 * answer, and the whole design turns on the ladder being seen whole.
 */
const shapeField = (sf: ScoredField) => ({
  slug: sf.field.slug,
  label: sf.field.label,
  blurb: sf.field.blurb,
  roles: [...sf.roles]
    .sort((a, b) => rungIndex(a.role.rung) - rungIndex(b.role.rung) || b.score - a.score)
    .map(shapeRole),
})

export async function buildResult(profile: LearnerProfile, asExpert: boolean) {
  const [fieldsCol, rolesCol, streamsCol, fundingCol] = await Promise.all([
    getCareerFieldsCollection(),
    getCareerRolesCollection(),
    getCareerStreamsCollection(),
    getCareerFundingCollection(),
  ])

  const vis = visibilityFilter(asExpert)

  const [fields, roles, streams, funding] = await Promise.all([
    fieldsCol.find(vis).sort({ order: 1 }).toArray() as unknown as Promise<CareerField[]>,
    rolesCol.find(vis).toArray() as unknown as Promise<CareerRole[]>,
    streamsCol.find(vis).sort({ order: 1 }).toArray() as unknown as Promise<CareerStream[]>,
    fundingCol.find(vis).toArray() as unknown as Promise<CareerFunding[]>,
  ])

  const rolesByField: Record<string, CareerRole[]> = {}
  for (const r of roles) (rolesByField[r.field] ??= []).push(r)

  const rec = recommend(fields, rolesByField, profile)

  const shortlist = rec.shortlist.map(shapeField)
  const wildcard = rec.wildcard ? shapeField(rec.wildcard) : null

  const shownRoles = [...shortlist, ...(wildcard ? [wildcard] : [])].flatMap((f) => f.roles)
  const relevantStreams = new Set(shownRoles.flatMap((r) => r.streams))
  const usedFunding = new Set(shownRoles.flatMap((r) => r.fundingRefs))

  return {
    payload: {
      profile: {
        ranked: rec.ranked.map((r) => ({
          interest: r.interest,
          label: INTEREST_LABEL[r.interest],
          short: INTEREST_SHORT[r.interest],
          tiedWith: r.tiedWith.map((t) => INTEREST_SHORT[t]),
        })),
        flat: rec.flat,
        ruledOut: profile.context.rejects.map((t) => midSentence(CONTEXT_TAG_LABEL[t])),
        maxRung: RUNG_LABEL[profile.maxRung],
        avoidsHighStakes: profile.avoidsHighStakes,
        prefersEarly: profile.prefersEarly,
      },
      shortlist,
      wildcard,
      streams: streams
        .filter((s) => relevantStreams.has(s.slug))
        .map(({ _id, updatedBy, ...rest }) => rest),
      funding: funding
        .filter((f) => usedFunding.has(f.slug))
        .map(({ _id, updatedBy, ...rest }) => rest),
    },
    shown: {
      fields: shortlist.map((f) => f.slug),
      roles: shownRoles.map((r) => r.slug),
      wildcard: wildcard?.slug ?? null,
    },
  }
}
