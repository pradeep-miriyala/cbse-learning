// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // The worker file sits under /learning/ but claims the whole /learning
        // scope, including the lab's own landing page. Browsers only allow that
        // widening when the file is served with this header.
        source: '/learning/sw.js',
        headers: [
          { key: 'Service-Worker-Allowed', value: '/learning' },
          // A cached worker is a worker that can never ship a fix.
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
      {
        source: '/learning/manifest.webmanifest',
        headers: [
          { key: 'Content-Type', value: 'application/manifest+json; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
