'use client'

// src/app/learning/PwaRegister.tsx
// Registers the lab's service worker and offers the install prompt.
//
// The prompt is a quiet pill, not a banner or a modal: Chrome only fires
// beforeinstallprompt once it judges the visit to be engaged, so by the time
// this appears the child is already using the lab. iOS gives no such event, so
// Safari gets a one-line instruction instead — the only way to install there.

import { useEffect, useState } from 'react'

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'll-install-dismissed'

function isStandalone() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS predates display-mode and reports it here instead.
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function isIosSafari() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const ios = /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS 13+ reports itself as a Mac; the touch points give it away.
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  // Chrome and Firefox on iOS cannot add to the home screen at all, so there
  // is nothing useful to tell their users.
  return ios && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua)
}

export default function PwaRegister() {
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null)
  const [iosHint, setIosHint] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    let registration: ServiceWorkerRegistration | undefined

    // Dev serves chunks from unhashed URLs that change on every edit, so a
    // cache-first worker would hand back yesterday's code and break HMR. Tear
    // down anything a previous dev session left behind on the way past.
    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations()
        .then((regs) => Promise.all(regs.map((r) => r.unregister())))
        .then(() => caches.keys())
        .then((keys) => Promise.all(
          keys.filter((k) => k.startsWith('ll-')).map((k) => caches.delete(k))
        ))
        .catch(() => {})
      return
    }

    navigator.serviceWorker
      .register('/learning/sw.js', { scope: '/learning' })
      .then((reg) => { registration = reg })
      .catch(() => { /* An unavailable worker costs the user nothing. */ })

    // Pick up a new deploy when the child comes back to the tab, rather than
    // making them close and reopen the app.
    const onVisible = () => {
      if (document.visibilityState === 'visible') registration?.update()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  useEffect(() => {
    if (isStandalone()) return
    if (localStorage.getItem(DISMISS_KEY) === '1') return

    const onPrompt = (e: Event) => {
      e.preventDefault()
      setDeferred(e as InstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    const onInstalled = () => setDeferred(null)
    window.addEventListener('appinstalled', onInstalled)

    // Safari never fires the event, so hold the hint back until the visit has
    // lasted long enough to be worth interrupting.
    let timer: ReturnType<typeof setTimeout> | undefined
    if (isIosSafari()) timer = setTimeout(() => setIosHint(true), 25_000)

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
      if (timer) clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1')
    setDeferred(null)
    setIosHint(false)
  }

  const install = async () => {
    if (!deferred) return
    await deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
  }

  if (!deferred && !iosHint) return null

  return (
    <>
      <style>{PWA_CSS}</style>
      <div className="ll-install" role="region" aria-label="Install the Learning Lab">
        <img src="/learning/icon-192.png" alt="" width={36} height={36} />
        <div className="ll-install-text">
          <strong>Add the lab to your home screen</strong>
          <span>
            {deferred
              ? 'Opens straight to the papers.'
              : 'Tap Share, then “Add to Home Screen”.'}
          </span>
        </div>
        {deferred && (
          <button type="button" className="ll-install-go" onClick={install}>
            Install
          </button>
        )}
        <button
          type="button"
          className="ll-install-x"
          onClick={dismiss}
          aria-label="Not now"
        >
          ×
        </button>
      </div>
    </>
  )
}

const PWA_CSS = `
  .ll-install {
    position: fixed; z-index: 90;
    left: max(1rem, env(safe-area-inset-left));
    right: max(1rem, env(safe-area-inset-right));
    bottom: calc(1rem + env(safe-area-inset-bottom));
    margin-inline: auto; max-width: 30rem;
    display: flex; align-items: center; gap: 0.85rem;
    padding: 0.85rem 0.9rem;
    background: var(--surface); border: 1px solid var(--line);
    box-shadow: 0 10px 30px rgba(15,13,10,0.16);
    font-family: var(--f-ui);
    animation: fadeUp 0.35s ease both;
  }
  .ll-install img { border-radius: 8px; flex-shrink: 0; }
  .ll-install-text { display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; flex: 1; }
  .ll-install-text strong {
    font-size: 0.85rem; font-weight: 700; color: var(--ink); line-height: 1.3;
  }
  .ll-install-text span {
    font-size: 0.76rem; color: var(--ink-50); line-height: 1.4;
  }
  .ll-install-go {
    flex-shrink: 0; font-family: var(--f-ui); font-weight: 700;
    font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: #fff; background: var(--accent); border: 1px solid var(--accent);
    padding: 0 1rem; min-height: 40px; cursor: pointer;
  }
  .ll-install-go:hover { opacity: 0.85; }
  .ll-install-x {
    flex-shrink: 0; background: none; border: none; cursor: pointer;
    color: var(--ink-50); font-size: 1.4rem; line-height: 1;
    width: 40px; min-height: 40px; display: grid; place-items: center;
  }
  .ll-install-x:hover { color: var(--ink); }

  @media (max-width: 420px) {
    .ll-install { gap: 0.6rem; padding: 0.75rem; }
    .ll-install-text strong { font-size: 0.8rem; }
    .ll-install-text span { font-size: 0.72rem; }
  }
`
