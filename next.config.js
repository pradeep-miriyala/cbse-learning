// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        // Security headers for every response. Added after the October 2026
        // audit, which found none of these set on any of the four sites.
        //
        // Strict-Transport-Security is deliberately absent: Vercel already
        // sends max-age=63072000, and the only thing worth adding is
        // includeSubDomains, which would apply to every *.miriyala.in and is
        // effectively irreversible once browsers cache it. That waits on a
        // subdomain inventory.
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' },
        ],
      },
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
