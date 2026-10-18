// src/app/learning/layout.tsx
// Everything under /learning is the installable app: the lab itself, the
// career-choices pilot, the topic suggestion form. This layout carries the
// manifest, the app-shell chrome hints, and the service worker registration —
// the rest of the site (blog, books, podcast) is deliberately out of scope.

import type { Metadata, Viewport } from 'next'
import PwaRegister from './PwaRegister'

export const metadata: Metadata = {
  manifest: '/learning/manifest.webmanifest',
  applicationName: 'Learning Lab',
  appleWebApp: {
    capable: true,
    title: 'Learning Lab',
    // The nav sits on newsprint, so a translucent bar lets it run to the top
    // of the screen instead of stacking a black strip above it.
    statusBarStyle: 'default',
  },
  // Named in full because Next replaces this field rather than merging it with
  // the root layout's — dropping the favicons along with it otherwise.
  icons: {
    icon: [
      { url: '/learning/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/learning/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: '/learning/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/learning/icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#F5F2EC',
  // Lets the installed app paint under the notch and the home indicator; the
  // install pill pays that back with env(safe-area-inset-*).
  viewportFit: 'cover',
}

export default function LearningLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PwaRegister />
    </>
  )
}
