import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'

const INDIGO = '#2E3A6B'
const PAPER  = '#F5F2EC'
const MADDER = '#9E2B25'

// A marked answer sheet: three ruled lines and a tick. No text — the mark has
// to survive at 48px on a home screen, and no webfont is available to the
// rasteriser anyway.
const art = `
  <rect x="112" y="88" width="288" height="336" rx="10" fill="${PAPER}"/>
  <g stroke="${INDIGO}" stroke-width="22" stroke-linecap="round">
    <line x1="152" y1="160" x2="360" y2="160"/>
    <line x1="152" y1="216" x2="360" y2="216"/>
    <line x1="152" y1="272" x2="300" y2="272"/>
  </g>
  <path d="M168 344 L216 392 L344 300" fill="none" stroke="${MADDER}"
        stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>`

// Plain: art fills the tile. Maskable: same art scaled to the centre 72% so
// nothing important falls outside Android's safe circle.
const svg = (scale = 1) => `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${INDIGO}"/>
  <g transform="translate(${256 * (1 - scale)} ${256 * (1 - scale)}) scale(${scale})">${art}</g>
</svg>`

const out = fileURLToPath(new URL('../public/learning', import.meta.url))
writeFileSync(`${out}/icon.svg`, svg(1))

const jobs = [
  ['icon-192.png', svg(1), 192],
  ['icon-512.png', svg(1), 512],
  ['icon-maskable-512.png', svg(0.72), 512],
  ['apple-touch-icon.png', svg(1), 180],
]
for (const [name, src, size] of jobs) {
  await sharp(Buffer.from(src)).resize(size, size).png({ compressionLevel: 9 }).toFile(`${out}/${name}`)
  console.log('wrote', name, size)
}
