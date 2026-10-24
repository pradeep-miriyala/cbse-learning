// src/app/robots.ts
import type { MetadataRoute } from 'next'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://learn.miriyala.in'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          // Expert-gated pilot, deliberately incomplete and meant to be walked
          // through in order. An indexed deep link would drop a stranger into
          // the middle of it.
          '/learning/career-choices',
          // Paused pending a trial with real children.
          '/learning/speak-demo',
          // One generated paper per attempt, and one learner's own history.
          // Nothing here is the same twice, so nothing here belongs in an index.
          '/learning/cbse/paper/',
          '/learning/cbse/progress',
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  }
}
