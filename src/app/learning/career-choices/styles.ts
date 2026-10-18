// src/app/learning/career-choices/styles.ts
// Career Choices styles. Built from the same editorial tokens as the Learning
// Lab, with its own prefix so the two can diverge without either breaking.
//
// The register is deliberately quieter than the lab's. The lab is a test and
// rewards a bit of energy; this is a page a fifteen-year-old may read something
// uncomfortable on, and it should feel like a reference document rather than a
// quiz result.

export const CAREER_CSS = `
  .cc-wrap {
    --f-ui:      'Karla', system-ui, sans-serif;
    --f-display: 'Faustina', Georgia, serif;
    --f-body:    'Literata', Georgia, serif;

    position: relative; z-index: 1;
    padding: 2.5rem var(--px) 4rem; max-width: 940px; margin: 0 auto;
    font-family: var(--f-ui); font-size: 17px;
    --tap: 44px;
  }

  /* ── Gate ── */
  .cc-gate { max-width: 460px; margin: 3rem auto; text-align: left; }
  .cc-gate h2 {
    font-family: var(--f-display); font-size: 1.5rem; font-weight: 400;
    margin-bottom: 0.75rem;
  }
  .cc-gate p { color: var(--ink-50); font-size: 0.92rem; margin-bottom: 1.5rem; line-height: 1.65; }
  .cc-field { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
  .cc-label {
    font-family: var(--f-ui); font-weight: 600; font-size: 0.66rem;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-50);
  }
  .cc-input {
    font-family: var(--f-mono); font-size: 1rem; letter-spacing: 0.08em;
    min-height: var(--tap); padding: 0.7rem 0.9rem;
    border: 1px solid var(--line); background: var(--surface); color: var(--ink);
  }
  .cc-input:focus { outline: 2px solid var(--accent); outline-offset: -1px; }
  .cc-err { color: var(--accent-2); font-size: 0.85rem; margin-top: 0.5rem; }

  .cc-btn {
    font-family: var(--f-ui); font-weight: 600; font-size: 0.7rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    min-height: var(--tap); padding: 0.7rem 1.5rem;
    border: 1px solid var(--ink); background: var(--ink); color: var(--bg);
    cursor: pointer; transition: opacity 0.18s;
  }
  .cc-btn:hover { opacity: 0.85; }
  .cc-btn:disabled { opacity: 0.4; cursor: default; }
  .cc-btn-ghost { background: none; color: var(--ink); }

  /* ── Progress ── */
  .cc-progress {
    position: sticky; top: var(--nav-h); z-index: 5;
    background: var(--bg); border-bottom: 1px solid var(--line);
    padding: 0.75rem 0; margin-bottom: 2rem;
    display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
  }
  .cc-progress-bar { flex: 1; height: 3px; background: var(--line-soft); min-width: 120px; }
  .cc-progress-fill { height: 100%; background: var(--accent); transition: width 0.3s; }
  .cc-progress-text {
    font-family: var(--f-mono); font-size: 0.72rem; color: var(--ink-50); white-space: nowrap;
  }

  /* ── Section ── */
  .cc-section-head { margin: 0 0 2rem; }
  .cc-section-kicker {
    font-family: var(--f-mono); font-size: 0.68rem; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 0.6rem;
  }
  .cc-section-title {
    font-family: var(--f-display); font-size: 1.75rem; font-weight: 400;
    line-height: 1.2; margin-bottom: 0.7rem;
  }
  .cc-section-intro {
    font-family: var(--f-body); font-size: 0.98rem; line-height: 1.7;
    color: var(--ink-50); max-width: 60ch;
  }

  /* ── Items ── */
  .cc-item { border-top: 1px solid var(--line); padding: 1.75rem 0; }
  .cc-item:first-of-type { border-top: none; }
  .cc-prompt {
    font-family: var(--f-body); font-size: 1.05rem; line-height: 1.55;
    margin-bottom: 1rem; display: flex; gap: 0.9rem; align-items: baseline;
  }
  .cc-prompt-n {
    font-family: var(--f-mono); font-size: 0.7rem; color: var(--ink-50);
    flex-shrink: 0; padding-top: 0.15rem;
  }
  .cc-options { display: flex; flex-direction: column; gap: 0.6rem; }
  .cc-option {
    text-align: left; font-family: var(--f-ui); font-size: 0.95rem; line-height: 1.5;
    min-height: var(--tap); padding: 0.85rem 1.1rem;
    border: 1px solid var(--line); background: var(--surface); color: var(--ink-70);
    cursor: pointer; transition: all 0.15s;
  }
  .cc-option:hover { border-color: var(--ink); color: var(--ink); }
  .cc-option[aria-pressed="true"] {
    background: var(--ink); border-color: var(--ink); color: var(--bg);
  }

  /* Aptitude self-rating — a row rather than a stack, since the four points are
     a scale and should read as one. */
  .cc-scale { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
  .cc-scale .cc-option { text-align: center; font-size: 0.78rem; padding: 0.8rem 0.4rem; }
  @media (max-width: 560px) {
    .cc-scale { grid-template-columns: 1fr 1fr; }
  }

  /* ── Result ── */
  .cc-result-head { border-bottom: 1px solid var(--line); padding-bottom: 2rem; margin-bottom: 2.5rem; }
  .cc-lede {
    font-family: var(--f-body); font-size: 1.1rem; line-height: 1.75;
    max-width: 62ch; color: var(--ink);
  }
  .cc-lede + .cc-lede { margin-top: 1rem; }

  .cc-block { margin: 3rem 0; }
  .cc-block-title {
    font-family: var(--f-ui); font-weight: 600; font-size: 0.68rem;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink);
    padding-bottom: 0.7rem; border-bottom: 1px solid var(--ink);
    margin-bottom: 1.5rem;
  }
  .cc-block-note {
    font-family: var(--f-body); font-size: 0.95rem; line-height: 1.7;
    color: var(--ink-50); max-width: 62ch; margin-bottom: 1.5rem;
  }

  /* ── Field + ladder ── */
  .cc-field-card { border: 1px solid var(--line); background: var(--surface); margin-bottom: 1.25rem; }
  .cc-field-head { padding: 1.25rem 1.4rem; border-bottom: 1px solid var(--line); }
  .cc-field-name { font-family: var(--f-display); font-size: 1.35rem; font-weight: 400; }
  .cc-field-blurb { font-family: var(--f-body); font-size: 0.92rem; color: var(--ink-50); margin-top: 0.35rem; line-height: 1.6; }

  .cc-ladder { list-style: none; }
  .cc-rung {
    padding: 1.15rem 1.4rem; border-top: 1px solid var(--line-soft);
    border-left: 3px solid transparent;
  }
  .cc-rung:first-child { border-top: none; }
  .cc-rung.is-in-range   { border-left-color: var(--accent); }
  .cc-rung.is-stretch    { border-left-color: var(--accent-3); }
  .cc-rung.is-further-up { opacity: 0.55; }
  .cc-rung.is-filtered   { opacity: 0.5; }

  .cc-rung-top { display: flex; gap: 0.75rem; align-items: baseline; flex-wrap: wrap; }
  .cc-rung-name { font-family: var(--f-ui); font-weight: 600; font-size: 1rem; }
  .cc-tag {
    font-family: var(--f-mono); font-size: 0.62rem; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 0.2rem 0.5rem; border: 1px solid currentColor;
    white-space: nowrap;
  }
  .cc-tag-route   { color: var(--ink-50); }
  .cc-tag-stretch { color: var(--accent-3); }
  .cc-tag-blocked { color: var(--accent-2); }
  .cc-tag-draft   { color: var(--accent-2); }

  .cc-tuesday {
    font-family: var(--f-body); font-size: 0.94rem; line-height: 1.65;
    color: var(--ink-70); margin-top: 0.6rem; max-width: 62ch;
  }
  .cc-rung-detail { margin-top: 0.9rem; display: grid; gap: 0.55rem; }
  .cc-detail-row { display: flex; gap: 0.7rem; font-size: 0.86rem; line-height: 1.55; }
  .cc-detail-key {
    font-family: var(--f-mono); font-size: 0.64rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--ink-50);
    flex-shrink: 0; width: 8.5rem; padding-top: 0.18rem;
  }
  .cc-detail-val { font-family: var(--f-ui); color: var(--ink-70); }
  @media (max-width: 620px) {
    .cc-detail-row { flex-direction: column; gap: 0.15rem; }
    .cc-detail-key { width: auto; }
  }

  /* ── Money ──
     Cost and funding are ONE panel and never separate. A cost figure standing on
     its own is the thing that stops a family before they have looked, which is
     the whole reason this section exists. */
  .cc-money {
    border: 1px solid var(--accent); background: var(--bg);
    padding: 0.95rem 1.1rem; margin-top: 0.9rem;
  }
  .cc-money-title {
    font-family: var(--f-ui); font-weight: 600; font-size: 0.64rem;
    letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent);
    margin-bottom: 0.55rem;
  }
  .cc-money p { font-family: var(--f-body); font-size: 0.88rem; line-height: 1.65; color: var(--ink-70); }
  .cc-money ul { margin: 0.5rem 0 0 1.1rem; }
  .cc-money li { font-family: var(--f-body); font-size: 0.86rem; line-height: 1.6; color: var(--ink-70); margin-bottom: 0.3rem; }

  /* ── Streams ── */
  .cc-stream { border: 1px solid var(--line); background: var(--surface); padding: 1.25rem 1.4rem; margin-bottom: 1rem; }
  .cc-stream-name { font-family: var(--f-ui); font-weight: 600; font-size: 1.02rem; }
  .cc-stream-for { font-family: var(--f-body); font-size: 0.94rem; line-height: 1.6; margin-top: 0.4rem; }
  .cc-stream-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; margin-top: 1rem; }
  @media (max-width: 620px) { .cc-stream-grid { grid-template-columns: 1fr; } }
  .cc-stream-col h4 {
    font-family: var(--f-mono); font-size: 0.62rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--ink-50); margin-bottom: 0.45rem; font-weight: 400;
  }
  .cc-stream-col p, .cc-stream-col li {
    font-family: var(--f-body); font-size: 0.86rem; line-height: 1.6; color: var(--ink-70);
  }
  .cc-stream-col ul { margin-left: 1rem; }
  .cc-stream-col li { margin-bottom: 0.28rem; }

  /* ── Honesty box ── */
  .cc-caveat {
    border-left: 3px solid var(--accent-3); padding: 0.25rem 0 0.25rem 1.2rem;
    margin: 2.5rem 0;
  }
  .cc-caveat p {
    font-family: var(--f-body); font-size: 0.94rem; line-height: 1.75;
    color: var(--ink-70); max-width: 62ch;
  }
  .cc-caveat p + p { margin-top: 0.8rem; }

  /* ── Expert rating strip ── */
  .cc-rate { border: 1px solid var(--accent-2); padding: 1.5rem; margin-top: 3rem; }
  .cc-rate h3 {
    font-family: var(--f-ui); font-weight: 600; font-size: 0.68rem;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent-2);
    margin-bottom: 0.5rem;
  }
  .cc-rate textarea {
    width: 100%; min-height: 5rem; font-family: var(--f-ui); font-size: 0.92rem;
    padding: 0.7rem; border: 1px solid var(--line); background: var(--surface);
    color: var(--ink); resize: vertical;
  }
  .cc-rate-row { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; margin: 0.9rem 0; }
  .cc-pill {
    font-family: var(--f-mono); font-size: 0.7rem; min-height: 2.2rem; padding: 0.4rem 0.8rem;
    border: 1px solid var(--line); background: var(--surface); color: var(--ink-70); cursor: pointer;
  }
  .cc-pill[aria-pressed="true"] { background: var(--ink); border-color: var(--ink); color: var(--bg); }

  .cc-footnote {
    font-family: var(--f-mono); font-size: 0.72rem; color: var(--ink-50);
    line-height: 1.6; margin-top: 0.6rem;
  }
`
