# Learning Lab (cbse-learning)

Free CBSE practice papers, plus the Career Choices pilot and the topic-suggestion form. This is the **public, learner-facing**
site only. It was split out of the portfolio (`pradeep.miriyala.in`) to keep that site light.

**The admin is not here.** Adding or editing questions, reviewing attempts, suggestions and feedback, the live view, and
the Career Choices cards and experts all stay in the portfolio repo (Admin → Learning Lab, Admin → Careers). Both sites
talk to the same MongoDB database, `pradeep-site`.

## What is in here

| Path | Holds |
|---|---|
| `src/app/learning/**` | The pages: `/learning`, `/learning/cbse`, `/career-choices`, `/suggest`, `/speak-demo` |
| `src/app/api/learning/**` | Public APIs: taxonomy, generate, submit, hint, resume, pace, heartbeat, feedback, suggest, captcha, career/*, revalidate |
| `src/lib/` | `learning`, `career*`, `speaking`, `matching`, `captcha`, `spam`, `mongodb` |
| `public/learning/` | Manifest, service worker, offline page, icons (the installable app) |
| `scripts/` | Content tooling: question banks (`banks/`), `gen-*.py` generators, `prepare-bank`, `import-learning`, `career-seed`, spoken-answer builder |

Paths are kept exactly as they were (`/learning/...`, `/api/learning/...`), so the portfolio's redirect is a plain
`/learning/:path` forward.

## Run it

```bash
cp .env.example .env.local   # MONGODB_URI, NEXTAUTH_SECRET
npm install
npm run dev                   # http://localhost:3000  (→ /learning/cbse)
npm run typecheck
npm run test:speaking         # spoken-answer marker regression tests
```

## The contract with the admin (keep both sides in step)

1. **Same database and collection names.** `src/lib/mongodb.ts` here mirrors the learning and career helpers in the
   portfolio's `src/lib/mongodb.ts`.
2. **Shared code is duplicated, not packaged.** `src/lib/learning.ts`, `career.ts`, `careerGate.ts` and `speaking.ts`
   exist in both repos. The question shape, the topic taxonomy, the career card schema and the mark scheme are the
   contract; change one and change the other. (Same approach as Little Steps' stats.)
3. **`NEXTAUTH_SECRET` must be identical on both sites.** It signs the captcha and the career-expert cookies, hashes the
   expert codes the admin hands out, and signs the admin's cache-refresh call.
4. **Cache refresh.** The topic tree is cached for five minutes (`/api/learning/taxonomy`). When the admin saves, edits,
   deletes or approves a question it POSTs a signed request to `/api/learning/revalidate` here. The portfolio's
   `NEXT_PUBLIC_LEARNING_SITE_URL` must point at this site. `scripts/prepare-bank.mjs` does the same after a bulk import
   (`SITE_URL` overrides the default).

## Design notes (unchanged)

- Answers never reach the browser mid-test; `/submit` scores server-side.
- Option order is shuffled per attempt and recorded on the paper.
- Learner identity is a first name only. Attempt history lives in `localStorage`, on the learner's device, which is
  per-origin: learners who used the old address start with an empty history on the new one.

## Content loading

```bash
node scripts/extract-learning-questions.mjs --src ~/Family/Saketh   # legacy mock tests → scripts/learning-seed.json
node --env-file=.env.local scripts/import-learning.mjs [--dry-run]  # upsert the seed and create indexes
node --env-file=.env.local scripts/career-seed.mjs [--dry-run]      # Career Choices content
```

The textbook PDFs (`cbse/` in the old repo, about 200 MB) are source material and were deliberately not copied here.

## Deploying

Own Vercel project, domain `learn.miriyala.in` (or whatever `NEXT_PUBLIC_LEARNING_SITE_URL` says on the portfolio).
Environment: `MONGODB_URI`, `NEXTAUTH_SECRET`; optional `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PORTFOLIO_URL`.
