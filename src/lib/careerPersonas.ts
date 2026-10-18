// src/lib/careerPersonas.ts
// The calibration set.
//
// If every expert rates a different attempt, nothing systematic can be learned:
// there is no way to separate a broken scoring rule from a reviewer with an
// unusual opinion. So a fixed set of profiles is run through the recommender and
// every expert rates the same outputs. Disagreement then becomes measurable, and
// a rule that is genuinely wrong shows up as every expert marking the same role
// wrong on the same persona.
//
// This is the analogue of the correctness audit run over the Learning Lab bank —
// the way you audit a system that has no right answers.
//
// The set is weighted toward the places the model is expected to break rather
// than toward the easy cases. An easy persona confirms nothing.

import type { LearnerProfile, Interest, InterestScores } from './career'
import { emptyInterestScores } from './career'

/** Interest scores are ipsative and sum to 20 — see INTEREST_ITEM_COUNT. */
function peaks(spec: Partial<Record<Interest, number>>): InterestScores {
  return { ...emptyInterestScores(), ...spec }
}

export interface Persona {
  key: string
  label: string
  /** What this persona is here to catch. */
  tests: string
  profile: LearnerProfile
}

export const PERSONAS: Persona[] = [
  {
    key: 'flat',
    label: 'Interested in everything, committed to nothing',
    tests: 'The flat profile. Does the result say so honestly, or invent a top three out of rounding?',
    profile: {
      interests: peaks({ realistic: 3, investigative: 4, artistic: 3, social: 4, enterprising: 3, conventional: 3 }),
      context: { rejects: [], prefers: [] },
      maxRung: 'degree', avoidsHighStakes: false, prefersEarly: false,
      aptitudes: { maths: 3, language: 3, spatial: 3, memory: 3, visual: 3, persuading: 3, pressure: 3, detail: 3 },
    },
  },
  {
    key: 'blood-averse-carer',
    label: 'Wants to help people, cannot cope with blood',
    tests: 'The health ladder must route to hospital administration, lab work and coding rather than vanishing.',
    profile: {
      interests: peaks({ social: 8, investigative: 6, conventional: 4, artistic: 1, enterprising: 1, realistic: 0 }),
      context: { rejects: ['blood-and-injury'], prefers: ['strangers-daily'] },
      maxRung: 'degree', avoidsHighStakes: false, prefersEarly: false,
      aptitudes: { language: 4, memory: 3, detail: 4, pressure: 3, maths: 2 },
    },
  },
  {
    key: 'earn-at-twenty',
    label: 'Practical, wants to be earning at twenty',
    tests: 'The polytechnic and ITI ladders must surface. If the model quietly prefers degrees, this is where it shows.',
    profile: {
      interests: peaks({ realistic: 9, conventional: 5, investigative: 4, enterprising: 2, artistic: 0, social: 0 }),
      context: { rejects: [], prefers: ['on-feet', 'physical-stamina', 'outdoors'] },
      maxRung: 'vocational', avoidsHighStakes: true, prefersEarly: true,
      aptitudes: { spatial: 4, detail: 3, maths: 2, language: 2 },
    },
  },
  {
    key: 'filters-kill-top-field',
    label: 'Enterprising and social, but no nights and no strangers',
    tests: 'Their strongest interests point at hospitality and sales, and their context answers rule both out. Is what survives respectable?',
    profile: {
      interests: peaks({ enterprising: 8, social: 7, conventional: 3, artistic: 2, investigative: 0, realistic: 0 }),
      context: { rejects: ['night-shifts', 'strangers-daily', 'irregular-hours', 'relocation'], prefers: ['desk-bound'] },
      maxRung: 'degree', avoidsHighStakes: false, prefersEarly: false,
      aptitudes: { persuading: 4, language: 4, detail: 3, maths: 3 },
    },
  },
  {
    key: 'high-interest-no-appetite',
    label: 'Fascinated by medicine, will not study for eight years',
    tests: 'Does anything survive the route section, and does it read as a real career rather than a consolation prize?',
    profile: {
      interests: peaks({ investigative: 8, social: 6, realistic: 4, conventional: 2, artistic: 0, enterprising: 0 }),
      context: { rejects: [], prefers: ['blood-and-injury', 'night-shifts'] },
      maxRung: 'diploma', avoidsHighStakes: true, prefersEarly: true,
      aptitudes: { memory: 3, detail: 4, pressure: 4, maths: 2 },
    },
  },
  {
    key: 'classic-engineer',
    label: 'Maths, machines, willing to do the degree',
    tests: 'The easy case. If this does not come out clean, something is badly wrong.',
    profile: {
      interests: peaks({ investigative: 7, realistic: 7, conventional: 3, artistic: 2, enterprising: 1, social: 0 }),
      context: { rejects: [], prefers: ['desk-bound'] },
      maxRung: 'degree', avoidsHighStakes: false, prefersEarly: false,
      aptitudes: { maths: 4, spatial: 4, detail: 4, language: 2 },
    },
  },
  {
    key: 'stay-home-steady',
    label: 'Wants a steady job in their own city',
    tests: 'Relocation is ruled out, which removes most of the site and project ladder. What is left?',
    profile: {
      interests: peaks({ conventional: 8, social: 5, investigative: 4, realistic: 2, enterprising: 1, artistic: 0 }),
      context: { rejects: ['relocation', 'abroad', 'irregular-hours', 'variable-income'], prefers: ['routine-work', 'desk-bound'] },
      maxRung: 'degree', avoidsHighStakes: true, prefersEarly: false,
      aptitudes: { detail: 4, memory: 4, language: 3, maths: 3 },
    },
  },
  {
    key: 'outdoors-hands',
    label: 'Cannot sit at a desk',
    tests: 'Desk-bound roles must drop away without leaving the ladder looking empty.',
    profile: {
      interests: peaks({ realistic: 9, investigative: 4, enterprising: 4, conventional: 2, social: 1, artistic: 0 }),
      context: { rejects: ['desk-bound', 'routine-work'], prefers: ['outdoors', 'on-feet', 'physical-stamina', 'relocation'] },
      maxRung: 'diploma', avoidsHighStakes: true, prefersEarly: true,
      aptitudes: { spatial: 4, pressure: 3, maths: 2, detail: 3 },
    },
  },
  {
    key: 'rates-self-low',
    label: 'Interested in everything technical, rates themselves badly at all of it',
    tests: 'Self-rating is a soft weight only. Low self-ratings must not empty the page.',
    profile: {
      interests: peaks({ investigative: 7, realistic: 6, conventional: 4, artistic: 3, enterprising: 0, social: 0 }),
      context: { rejects: [], prefers: [] },
      maxRung: 'degree', avoidsHighStakes: false, prefersEarly: false,
      aptitudes: { maths: 1, spatial: 1, detail: 2, memory: 1, language: 2, pressure: 2 },
    },
  },
  {
    key: 'organiser',
    label: 'Runs things, likes order, no interest in making anything',
    tests: 'Conventional-enterprising with no realistic score at all — supervision and administration should appear, not manual trades.',
    profile: {
      interests: peaks({ conventional: 8, enterprising: 7, social: 4, investigative: 1, artistic: 0, realistic: 0 }),
      context: { rejects: ['physical-stamina'], prefers: ['high-responsibility', 'desk-bound'] },
      maxRung: 'degree-pg', avoidsHighStakes: false, prefersEarly: false,
      aptitudes: { detail: 4, persuading: 4, maths: 3, pressure: 4 },
    },
  },
  {
    key: 'night-shift-fine',
    label: 'Happy with shifts, hierarchy and a uniform',
    tests: 'The tags most learners reject are all preferred here. Does that actually promote the roles that need them?',
    profile: {
      interests: peaks({ realistic: 6, social: 5, conventional: 5, investigative: 4, enterprising: 0, artistic: 0 }),
      context: { rejects: [], prefers: ['night-shifts', 'uniform', 'on-feet', 'physical-stamina', 'blood-and-injury', 'high-responsibility'] },
      maxRung: 'diploma', avoidsHighStakes: true, prefersEarly: true,
      aptitudes: { pressure: 4, detail: 3, memory: 3 },
    },
  },
  {
    key: 'long-haul',
    label: 'Will study as long as it takes',
    tests: 'The ceiling is off. The ladder should still show the shorter rungs rather than only the apex.',
    profile: {
      interests: peaks({ investigative: 9, social: 5, realistic: 3, conventional: 3, artistic: 0, enterprising: 0 }),
      context: { rejects: [], prefers: ['high-responsibility'] },
      maxRung: 'long-professional', avoidsHighStakes: false, prefersEarly: false,
      aptitudes: { memory: 4, detail: 4, pressure: 4, maths: 3, language: 3 },
    },
  },
]
