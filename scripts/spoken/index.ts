// scripts/spoken/index.ts — every authored chapter, in one place for the builder.

import type { AuthoredSpoken } from '../../src/lib/speaking.ts'
import { SCIENCE_FOOD } from './science-food.ts'
import { SCIENCE_LIFE_MAGNETS } from './science-life-magnets.ts'
import { SCIENCE_MATERIALS } from './science-materials.ts'
import { SOCIAL_DIVERSITY_GOVERNMENT } from './social-diversity-government.ts'
import { SOCIAL_EARTH_HARAPPA } from './social-earth-harappa.ts'
import { ENGLISH_SPRING_LANE } from './english-spring-lane.ts'

export const CHAPTERS: { subject: string; questions: AuthoredSpoken[] }[] = [
  { subject: 'science', questions: SCIENCE_FOOD },
  { subject: 'science', questions: SCIENCE_LIFE_MAGNETS },
  { subject: 'science', questions: SCIENCE_MATERIALS },
  { subject: 'social-science', questions: SOCIAL_DIVERSITY_GOVERNMENT },
  { subject: 'social-science', questions: SOCIAL_EARTH_HARAPPA },
  { subject: 'english', questions: ENGLISH_SPRING_LANE },
]
