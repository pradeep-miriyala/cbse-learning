'use client'
// src/app/learning/career-choices/ResultPanel.tsx
// What the paper produces: a plain-language profile, four or five fields shown
// as ladders, one field they did not score for, and the streams those fields
// are reachable from.
//
// Three rules this component exists to enforce.
//
//   A filtered role is still drawn. It is greyed and the answer that removed it
//   is named, because a career this paper will not recommend is not a career it
//   is willing to pretend does not exist — and at fifteen the answer that
//   removed it may well change.
//
//   Cost never renders without funding beside it. The cost figure alone is the
//   thing that stops a family before they have looked properly, and the routes
//   that answer it are real and widely unknown.
//
//   Streams are described, never recommended. What each one is designed to do,
//   what it narrows, and what it still leaves open — and the learner joins it up.

import { useState } from 'react'

type Band = 'low' | 'medium' | 'high'

export type Role = {
  slug: string
  label: string
  tuesday: string
  rung: string
  rungLabel: string
  standing: 'in-range' | 'stretch' | 'further-up' | 'filtered'
  blockedByLabel: string | null
  stretchedOn: string[]
  entryRoutes: string[]
  entranceIntensity: 'none' | 'moderate' | 'high'
  pay: { start: Band; startLabel: string; later: Band; laterLabel: string }
  costs: { route: string; govt: Band; private: Band; years: number }[]
  fundingRefs: string[]
  whyPeopleLeave: string
  approvedBy: string | null
  reviewState: string
}

export type Field = { slug: string; label: string; blurb: string; roles: Role[] }

export type Funding = {
  slug: string; label: string; kind: string; whoFor: string; covers: string
  mechanics: string[]; figures: { label: string; value: string }[]
  applyAt: string; sourceUrl: string; lastVerifiedAt: string | null
}

export type Stream = {
  slug: string; label: string; board: string; designedFor: string
  whatTwoYearsAreLike: string; narrows: string
  lateralRoutes: string[]; examsItSetsUpFor: string[]
}

export type Result = {
  attemptId: string
  profile: {
    ranked: { interest: string; label: string; short: string; tiedWith: string[] }[]
    flat: boolean
    ruledOut: string[]
    maxRung: string
    avoidsHighStakes: boolean
    prefersEarly: boolean
  }
  shortlist: Field[]
  wildcard: Field | null
  streams: Stream[]
  funding: Funding[]
}

const BAND_WORD: Record<Band, string> = { low: 'lower', medium: 'middle', high: 'higher' }

function MoneyPanel({ role, funding }: { role: Role; funding: Funding[] }) {
  const relevant = funding.filter((f) => role.fundingRefs.includes(f.slug))

  return (
    <div className="cc-money">
      <div className="cc-money-title">What it costs, and how people pay for it</div>

      {role.costs.map((c, i) => (
        <p key={i}>
          <strong>{c.route}</strong> — {c.years} {c.years === 1 ? 'year' : 'years'}.
          {' '}Fees are in the <strong>{BAND_WORD[c.govt]}</strong> group at a government college
          {c.govt !== c.private && <> and the <strong>{BAND_WORD[c.private]}</strong> group privately</>}.
        </p>
      ))}

      {/* The point of the panel. A cost band on its own tells a family to stop;
          these are what a family that knows them does instead. */}
      {relevant.length > 0 && (
        <ul>
          {relevant.map((f) => (
            <li key={f.slug}>
              <strong>{f.label}</strong> — {f.whoFor} {f.mechanics[0]}
              {f.applyAt && <> Applied for at {f.applyAt}.</>}
            </li>
          ))}
        </ul>
      )}

      <p className="cc-footnote">
        Pay for this role sits in the {BAND_WORD[role.pay.start]} group at the start
        {role.pay.start !== role.pay.later
          ? <> and the {BAND_WORD[role.pay.later]} group about ten years in.</>
          : <>, and stays there.</>}
        {' '}Groups rather than figures, until somebody who does this work has checked them.
      </p>
    </div>
  )
}

function RoleRow({ role, funding }: { role: Role; funding: Funding[] }) {
  const [open, setOpen] = useState(false)

  return (
    <li className={`cc-rung is-${role.standing}`}>
      <div className="cc-rung-top">
        <span className="cc-rung-name">{role.label}</span>
        <span className="cc-tag cc-tag-route">{role.rungLabel}</span>
        {role.standing === 'stretch' && (
          <span className="cc-tag cc-tag-stretch">longer than you said</span>
        )}
        {role.standing === 'further-up' && (
          <span className="cc-tag cc-tag-route">further up this ladder</span>
        )}
        {role.standing === 'filtered' && role.blockedByLabel && (
          <span className="cc-tag cc-tag-blocked">{role.blockedByLabel}</span>
        )}
        {role.reviewState !== 'published' && (
          <span className="cc-tag cc-tag-draft">not yet reviewed</span>
        )}
      </div>

      <p className="cc-tuesday">{role.tuesday}</p>

      {/* Named, not hidden. What removed it may well not be true of them in two
          years, and they should be able to see what would open again. */}
      {role.standing === 'filtered' && role.blockedByLabel && (
        <p className="cc-tuesday" style={{ fontStyle: 'italic' }}>
          You said no to: {role.blockedByLabel.toLowerCase()}. That is why this one is
          greyed out rather than missing — if that changes, this opens up.
        </p>
      )}

      <button
        type="button"
        className="cc-btn cc-btn-ghost"
        style={{ padding: '0.4rem 0', minHeight: 'auto', border: 'none', marginTop: '0.6rem' }}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? '− Less' : '+ How you get there, and what it costs'}
      </button>

      {open && (
        <div className="cc-rung-detail">
          <div className="cc-detail-row">
            <span className="cc-detail-key">Getting in</span>
            <span className="cc-detail-val">
              {role.entryRoutes.map((r, i) => <div key={i}>{r}</div>)}
              {role.entranceIntensity === 'high' && (
                <div style={{ marginTop: '0.3rem' }}>
                  This one turns on a single high-stakes entrance exam.
                </div>
              )}
            </span>
          </div>

          {role.stretchedOn.length > 0 && (
            <div className="cc-detail-row">
              <span className="cc-detail-key">You rated yourself lower on</span>
              <span className="cc-detail-val">
                {role.stretchedOn.join(', ')} — which is your own estimate, not a test,
                and not a reason this is closed to you.
              </span>
            </div>
          )}

          <div className="cc-detail-row">
            <span className="cc-detail-key">Why people leave</span>
            <span className="cc-detail-val">{role.whyPeopleLeave}</span>
          </div>

          {role.approvedBy && (
            <div className="cc-detail-row">
              <span className="cc-detail-key">Checked by</span>
              <span className="cc-detail-val">{role.approvedBy}</span>
            </div>
          )}

          <MoneyPanel role={role} funding={funding} />
        </div>
      )}
    </li>
  )
}

function FieldCard({ field, funding }: { field: Field; funding: Funding[] }) {
  return (
    <div className="cc-field-card">
      <div className="cc-field-head">
        <div className="cc-field-name">{field.label}</div>
        <div className="cc-field-blurb">{field.blurb}</div>
      </div>
      <ul className="cc-ladder">
        {field.roles.map((r) => <RoleRow key={r.slug} role={r} funding={funding} />)}
      </ul>
    </div>
  )
}

export default function ResultPanel({
  result,
  expertName,
  onRestart,
}: {
  result: Result
  expertName: string | null
  onRestart: () => void
}) {
  const { profile, shortlist, wildcard, streams, funding } = result
  const top = profile.ranked.slice(0, 3)

  return (
    <div>
      <div className="cc-result-head">
        {/* No letters, no code, no percentage. "You are an ISE" is jargon dressed
            as insight, and a label is the thing this paper exists not to hand out. */}
        {profile.flat ? (
          <>
            <p className="cc-lede">
              Your answers came out fairly even across everything. That is a real
              result, not a failure of the paper — it usually means you are curious
              about a lot of things and have not yet had the chance to find out which
              of them you would actually want to do all day.
            </p>
            <p className="cc-lede">
              The lists below are worth reading straight through rather than treating
              as a shortlist. The most useful thing you can do next is get near some
              of this work — a day with somebody who does it will tell you more than
              any questionnaire.
            </p>
          </>
        ) : (
          <>
            <p className="cc-lede">
              You leaned most toward <strong>{top[0].label.toLowerCase()}</strong>
              {top[0].tiedWith.length > 0
                ? <>, and about as much toward {top[0].tiedWith.join(' and ').toLowerCase()}.</>
                : <>, then {top[1].label.toLowerCase()}.</>}
            </p>
            <p className="cc-lede">
              You said you would go up to <strong>{profile.maxRung.toLowerCase()}</strong>
              {profile.prefersEarly && <>, and that you would rather be earning early</>}
              {profile.avoidsHighStakes && <>, and that you would rather your future did not turn on one exam</>}.
              {profile.ruledOut.length > 0 && (
                <> You ruled out: {profile.ruledOut.join(', ')}.</>
              )}
            </p>
          </>
        )}
      </div>

      <div className="cc-block">
        <div className="cc-block-title">Fields worth looking at</div>
        <p className="cc-block-note">
          Each of these is shown as a ladder, from the shortest route in to the
          longest. Everything on a ladder is a real job that real people do —
          the rungs differ in what they cost to reach, not in whether they are
          worth having. Roles greyed out are ones your own answers ruled out, and
          they say which answer did it.
        </p>
        {shortlist.map((f) => <FieldCard key={f.slug} field={f} funding={funding} />)}
      </div>

      {wildcard && (
        <div className="cc-block">
          <div className="cc-block-title">One to look at anyway</div>
          <p className="cc-block-note">
            You did not score for this one. It is here because everything you said
            about <em>how</em> you want to work fits it, and because a list that only
            shows you what you already lean toward cannot tell you anything you did
            not already know.
          </p>
          <FieldCard field={wildcard} funding={funding} />
        </div>
      )}

      {streams.length > 0 && (
        <div className="cc-block">
          <div className="cc-block-title">What the streams are designed to do</div>
          <p className="cc-block-note">
            This paper does not tell you which stream to take. What follows is what
            each one is built to lead to, what it makes hard, and what it still
            leaves open — including the routes most people do not know are there.
            The joining up is yours to do.
          </p>

          {streams.map((s) => (
            <div key={s.slug} className="cc-stream">
              <div className="cc-stream-name">{s.label}</div>
              <p className="cc-stream-for">{s.designedFor}</p>
              <p className="cc-stream-for" style={{ color: 'var(--ink-50)' }}>
                {s.whatTwoYearsAreLike}
              </p>

              <div className="cc-stream-grid">
                <div className="cc-stream-col">
                  <h4>What it narrows</h4>
                  <p>{s.narrows}</p>
                </div>
                <div className="cc-stream-col">
                  <h4>What is still open from here</h4>
                  <ul>
                    {s.lateralRoutes.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>

              {s.examsItSetsUpFor.length > 0 && (
                <p className="cc-footnote">
                  Sets you up for: {s.examsItSetsUpFor.join(' · ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="cc-caveat">
        <p><strong>What this is, and what it is not.</strong></p>
        <p>
          This is not a test and you have not passed or failed it. It is a record of
          what you said you would rather do, read against what a set of jobs actually
          ask of a person. Nobody has measured your ability at anything.
        </p>
        <p>
          What you want at fifteen will change, and it is supposed to. Interests move
          a great deal between fifteen and twenty, so treat this as a list of things
          to go and find out about, not as a decision. Take it again in a year and
          expect it to come out differently.
        </p>
        <p>
          Nothing here is closed to you. A greyed-out career is one your own answers
          set aside today — not one you cannot do.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <button type="button" className="cc-btn cc-btn-ghost" onClick={onRestart}>
          Take it again
        </button>
      </div>

      {expertName && <RatingStrip result={result} expertName={expertName} />}
    </div>
  )
}

/**
 * The expert calibration loop.
 *
 * `missing` is the field that earns its keep: a wrong recommendation is on the
 * page and gets reported without being asked for, but a role that should have
 * been shown and was not leaves no trace anywhere. For a tool whose entire
 * purpose is exposure, those are the failures worth catching.
 */
function RatingStrip({ result, expertName }: { result: Result; expertName: string }) {
  const [overall, setOverall] = useState<number | null>(null)
  const [wildcardVerdict, setWildcardVerdict] = useState<'useful' | 'noise' | null>(null)
  const [missing, setMissing] = useState('')
  const [note, setNote] = useState('')
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [error, setError] = useState('')

  const submit = async () => {
    setState('saving')
    const res = await fetch('/api/learning/career/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attemptId: result.attemptId,
        overall,
        missing: missing.split(',').map((s) => s.trim()).filter(Boolean),
        wildcardVerdict,
        note,
        roleVerdicts: [],
      }),
    })
    if (res.ok) { setState('saved'); return }
    const body = await res.json().catch(() => ({}))
    setError(body.error || 'Could not save that.')
    setState('error')
  }

  if (state === 'saved') {
    return (
      <div className="cc-rate">
        <h3>Thank you</h3>
        <p className="cc-footnote">Recorded against this run. You can take the paper again as a different sort of student.</p>
      </div>
    )
  }

  return (
    <div className="cc-rate">
      <h3>Reviewing this, {expertName}?</h3>
      <p className="cc-footnote" style={{ marginBottom: '1rem' }}>
        You are seeing draft cards. Tell us what this run got wrong — especially
        anything it should have shown and did not.
      </p>

      <div className="cc-rate-row">
        <span className="cc-detail-key">How right was it</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" className="cc-pill"
            aria-pressed={overall === n} onClick={() => setOverall(n)}>
            {n}
          </button>
        ))}
      </div>

      {result.wildcard && (
        <div className="cc-rate-row">
          <span className="cc-detail-key">The wildcard</span>
          {(['useful', 'noise'] as const).map((v) => (
            <button key={v} type="button" className="cc-pill"
              aria-pressed={wildcardVerdict === v} onClick={() => setWildcardVerdict(v)}>
              {v}
            </button>
          ))}
        </div>
      )}

      <div className="cc-field">
        <label className="cc-label" htmlFor="cc-missing">
          Roles this should have shown and did not
        </label>
        <input id="cc-missing" className="cc-input" value={missing}
          placeholder="nurse-gnm, radiographer"
          onChange={(e) => setMissing(e.target.value)} />
        <span className="cc-footnote">Comma-separated slugs, as they appear on the cards.</span>
      </div>

      <div className="cc-field">
        <label className="cc-label" htmlFor="cc-note">Anything else</label>
        <textarea id="cc-note" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      {state === 'error' && <p className="cc-err">{error}</p>}

      <button type="button" className="cc-btn" disabled={!overall || state === 'saving'}
        onClick={submit}>
        {state === 'saving' ? 'Saving…' : 'Record this'}
      </button>
    </div>
  )
}
