// src/app/api/learning/taxonomy/route.ts
// The grade → subject → topic tree, derived from the bank itself so adding
// questions is the only step needed to surface a new topic.

import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { getLearningQuestionsCollection } from '@/lib/mongodb'
import { SUBJECT_LABEL, type GradeSummary } from '@/lib/learning'

export const revalidate = 300

const loadTaxonomy = unstable_cache(
  async (): Promise<GradeSummary[]> => {
    const col = await getLearningQuestionsCollection()

    const rows = await col
      .aggregate<{
        _id: { grade: number; subject: string; topic: string }
        topicLabel: string
        chapter: string
        chapters: string[]
        count: number
        spoken: number
        match: number
        easy: number
        medium: number
        hard: number
      }>([
        { $match: { status: 'published' } },
        // Group by topic only. A topic can span more than one source chapter
        // (Figures of Speech appears in both grammar papers) — including
        // chapter in the key would list that topic twice in the picker.
        {
          $group: {
            _id: { grade: '$grade', subject: '$subject', topic: '$topic' },
            topicLabel: { $first: '$topicLabel' },
            chapter:    { $first: '$chapter' },
            chapters:   { $addToSet: '$chapter' },
            // Counted apart, because a topic offering 30 multiple-choice
            // questions and 2 spoken ones can fill one kind of paper and not
            // the other. One total would promise what it cannot deliver.
            count: { $sum: { $cond: [{ $in: ['$format', ['spoken', 'match']] }, 0, 1] } },
            spoken: { $sum: { $cond: [{ $eq: ['$format', 'spoken'] }, 1, 0] } },
            match:  { $sum: { $cond: [{ $eq: ['$format', 'match'] }, 1, 0] } },
            // Per-band counts, so the picker can say what a selection can
            // actually deliver instead of promising a mix it cannot meet.
            easy:   { $sum: { $cond: [{ $eq: ['$difficulty', 'easy'] },   1, 0] } },
            medium: { $sum: { $cond: [{ $eq: ['$difficulty', 'medium'] }, 1, 0] } },
            hard:   { $sum: { $cond: [{ $eq: ['$difficulty', 'hard'] },   1, 0] } },
          },
        },
        { $sort: { '_id.grade': 1, '_id.subject': 1, count: -1 } },
      ])
      .toArray()

    const grades = new Map<number, Map<string, GradeSummary['subjects'][number]>>()

    for (const r of rows) {
      const { grade, subject, topic } = r._id
      // A topic drawn from several chapters shows all of them.
      const chapter = r.chapters?.length > 1 ? r.chapters.join(' · ') : r.chapter
      if (!grades.has(grade)) grades.set(grade, new Map())
      const subjects = grades.get(grade)!

      if (!subjects.has(subject)) {
        // No colour here on purpose: this response is cached for 5 minutes, and
        // baking presentation into it means a theme change serves stale colours.
        subjects.set(subject, {
          subject,
          subjectLabel: SUBJECT_LABEL[subject] || subject,
          total: 0,
          topics: [],
        })
      }
      const s = subjects.get(subject)!
      s.total += r.count
      s.topics.push({
        slug: topic, label: r.topicLabel, chapter, count: r.count,
        ...(r.spoken ? { spoken: r.spoken } : {}),
        ...(r.match ? { match: r.match } : {}),
        byDifficulty: { easy: r.easy, medium: r.medium, hard: r.hard },
      })
    }

    return [...grades.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([grade, subjects]) => ({
        grade,
        subjects: [...subjects.values()].sort((a, b) => a.subjectLabel.localeCompare(b.subjectLabel)),
      }))
  },
  ['learning-taxonomy'],
  { revalidate: 300, tags: ['learning-taxonomy'] },
)

export async function GET() {
  try {
    const grades = await loadTaxonomy()
    return NextResponse.json({ grades })
  } catch (err) {
    console.error('[learning/taxonomy]', err)
    return NextResponse.json({ error: 'Could not load topics' }, { status: 500 })
  }
}
