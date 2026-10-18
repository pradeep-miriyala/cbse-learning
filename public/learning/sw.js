// public/learning/sw.js — Learning Lab service worker.
//
// Scoped to /learning, so the rest of the site (blog, books, podcast) is never
// intercepted. The file lives under /learning/ but is registered with scope
// "/learning" — the no-slash form, so the lab's own landing page is in scope —
// which needs the Service-Worker-Allowed header set in next.config.js.
//
// What it does NOT do: cache anything under /api. Papers are generated per
// attempt and attempts are recorded server-side; a stale answer key would be
// worse than no app at all.

const VERSION = 'll-v1'
const SHELL = `ll-shell-${VERSION}`
const ASSETS = `ll-assets-${VERSION}`
const OFFLINE_URL = '/learning/offline.html'

// Only the fallback and its own artwork. The lab's HTML is deliberately absent:
// it is server-rendered and points at hashed chunks that change every deploy.
const PRECACHE = [OFFLINE_URL, '/learning/icon-192.png', '/learning/manifest.webmanifest']

// How long a navigation waits for the network before falling back to the last
// good copy. Tuned for a patchy mobile connection, not a dead one.
const NAV_TIMEOUT_MS = 3500

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('ll-') && k !== SHELL && k !== ASSETS)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
})

// Network first, but give up on a slow network rather than letting the child
// stare at a white screen. A cached copy is only ever shown once the network
// has actually failed us.
async function navigationStrategy(request) {
  const cache = await caches.open(SHELL)
  try {
    const network = fetch(request)
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('slow network')), NAV_TIMEOUT_MS)
    )
    const response = await Promise.race([network, timeout])
    if (response && response.ok) cache.put(request, response.clone())
    return response
  } catch {
    return (await cache.match(request)) || (await cache.match(OFFLINE_URL))
  }
}

// Hashed build output and our own icons never change under a given URL, so the
// cached copy is always correct and always the fastest answer.
async function immutableStrategy(request) {
  // Across every cache, not just this one: the icons are precached into the
  // shell at install time, and the offline page asks for one of them.
  const hit = await caches.match(request)
  if (hit) return hit
  const cache = await caches.open(ASSETS)
  const response = await fetch(request)
  if (response && (response.ok || response.type === 'opaque')) {
    cache.put(request, response.clone())
  }
  return response
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // Google Fonts: same immutable treatment, opaque responses included.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(immutableStrategy(request))
    return
  }

  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith('/api/')) return

  if (request.mode === 'navigate') {
    event.respondWith(navigationStrategy(request))
    return
  }

  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/learning/icon')) {
    event.respondWith(immutableStrategy(request))
  }
})
