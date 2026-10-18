'use client'
// src/app/learning/career-choices/PaperRunner.tsx
// The 46-item paper, presented one section at a time.
//
// Not one question per screen. Forty-six screens would make the paper feel like
// an ordeal, and the sections are meant to be felt as four different kinds of
// question — interests, then how you want to work, then how you want to get
// there, then your own opinion of yourself. Seeing a section whole is part of
// how that lands.
//
// Nothing is shuffled. On a scored test a fixed answer position is a shortcut
// worth breaking; here there is no correct option, and a stable order means an
// answer stored today can still be read against the item a year from now.

import { useState, useMemo, useRef } from 'react'

type Section = { id: string; title: string; intro: string }

export type Item = {
  key: string
  section: 'interests' | 'context' | 'route' | 'aptitude'
  order: number
  prompt: string
  options?: { text: string }[]
  aptitude?: string
}

const SCALE = [
  { value: 1, label: 'Not me at all' },
  { value: 2, label: 'Not really' },
  { value: 3, label: 'Fairly comfortable' },
  { value: 4, label: 'One of my strengths' },
]

export default function PaperRunner({
  sections,
  items,
  onDone,
  busy,
}: {
  sections: Section[]
  items: Item[]
  onDone: (answers: Record<string, number>, durationMs: number) => void
  busy: boolean
}) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const startedAt = useRef(Date.now())
  const topRef = useRef<HTMLDivElement>(null)

  const bySection = useMemo(() => {
    const out: Record<string, Item[]> = {}
    for (const it of items) (out[it.section] ??= []).push(it)
    for (const list of Object.values(out)) list.sort((a, b) => a.order - b.order)
    return out
  }, [items])

  const section = sections[step]
  const sectionItems = bySection[section?.id] ?? []
  const answeredHere = sectionItems.filter((i) => answers[i.key] !== undefined).length
  const remaining = sectionItems.length - answeredHere

  const totalAnswered = Object.keys(answers).length
  const pct = items.length ? Math.round((totalAnswered / items.length) * 100) : 0

  const choose = (key: string, value: number) =>
    setAnswers((a) => ({ ...a, [key]: value }))

  const advance = () => {
    if (step < sections.length - 1) {
      setStep(step + 1)
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      onDone(answers, Date.now() - startedAt.current)
    }
  }

  const isLast = step === sections.length - 1

  return (
    <div ref={topRef}>
      <div className="cc-progress">
        <div className="cc-progress-bar">
          <div className="cc-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="cc-progress-text">
          Part {step + 1} of {sections.length} · {totalAnswered}/{items.length} answered
        </span>
      </div>

      <div className="cc-section-head">
        <div className="cc-section-kicker">Part {step + 1}</div>
        <h2 className="cc-section-title">{section?.title}</h2>
        <p className="cc-section-intro">{section?.intro}</p>
      </div>

      {sectionItems.map((item, n) => (
        <div key={item.key} className="cc-item">
          <div className="cc-prompt">
            <span className="cc-prompt-n">{String(n + 1).padStart(2, '0')}</span>
            <span>{item.prompt}</span>
          </div>

          {item.section === 'aptitude' ? (
            <div className="cc-scale">
              {SCALE.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className="cc-option"
                  aria-pressed={answers[item.key] === s.value}
                  onClick={() => choose(item.key, s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="cc-options">
              {(item.options ?? []).map((o, i) => (
                <button
                  key={i}
                  type="button"
                  className="cc-option"
                  aria-pressed={answers[item.key] === i}
                  onClick={() => choose(item.key, i)}
                >
                  {o.text}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Every item in a section must be answered before moving on. An unanswered
            item is not a neutral answer — on the context section, skipping one
            would leave careers on the list that the learner may well have ruled
            out, which is worse than asking again. */}
        <button
          type="button"
          className="cc-btn"
          disabled={remaining > 0 || busy}
          onClick={advance}
        >
          {busy ? 'Working…' : isLast ? 'See what this suggests' : 'Next part'}
        </button>

        {remaining > 0 && (
          <span className="cc-progress-text">
            {remaining} still to answer in this part
          </span>
        )}

        {step > 0 && (
          <button
            type="button"
            className="cc-btn cc-btn-ghost"
            onClick={() => { setStep(step - 1); topRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Back
          </button>
        )}
      </div>
    </div>
  )
}
