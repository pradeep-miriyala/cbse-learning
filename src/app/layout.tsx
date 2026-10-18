// src/app/layout.tsx — root layout for the Learning Lab site.
// Faustina (display) · Literata (prose) · Karla (UI), the same families as the portfolio. The design tokens and the
// few shared classes the lab leans on live in globals.css.
import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://learn.miriyala.in'

export const metadata: Metadata = {
  title: { default: 'Learning Lab — free CBSE practice papers', template: '%s — Learning Lab' },
  description:
    'Free CBSE practice papers in English, Maths, Science and Social Science. Pick your topics and a fresh paper is generated every time.',
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: 'Learning Lab', type: 'website', locale: 'en_IN' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Faustina:ital,wght@0,400..700;1,400..600&family=Literata:ital,opsz,wght@0,7..72,300..600;1,7..72,300..500&family=Karla:ital,wght@0,300..800;1,300..700&family=Spline+Sans+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
