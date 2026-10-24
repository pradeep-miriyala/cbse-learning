// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://learn.miriyala.in'

// The site root redirects to /learning/cbse, so the destination is listed and
// the signpost is not. Generated papers, a learner's progress, the paused
// speaking demo and the gated career pilot are all excluded — see robots.ts.
const PAGES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '/learning/cbse',          changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/learning',               changeFrequency: 'monthly', priority: 0.8 },
  { path: '/learning/cbse/practice', changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/learning/cbse/feedback', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/learning/suggest',       changeFrequency: 'monthly', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return PAGES.map(p => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))
}
