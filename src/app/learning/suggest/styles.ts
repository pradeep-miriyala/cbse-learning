// src/app/learning/suggest/styles.ts — the suggest-a-question form.

export const SUGGEST_CSS = `
  .sg-wrap { max-width: 720px; margin: 0 auto; padding: 1.5rem 1.25rem 5rem; font-family: var(--f-ui); }
  .sg-panel {
    background: var(--surface, #fff); border: 1px solid var(--line, rgba(10,9,8,0.12));
    padding: 1.75rem 1.6rem;
  }
  .sg-lede { font-size: 0.92rem; line-height: 1.65; color: var(--ink-60); margin-bottom: 1.5rem; }
  .sg-caps {
    display: block; font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--ink-30); margin: 1.25rem 0 0.5rem;
  }

  .sg-row { display: grid; gap: 0.9rem; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .sg-field { display: block; margin-bottom: 0.9rem; }
  .sg-field > span {
    display: block; font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--ink-30); margin-bottom: 0.35rem;
  }
  .sg-field em { font-style: normal; opacity: 0.65; text-transform: none; letter-spacing: 0; }
  .sg-field input, .sg-field select, .sg-field textarea {
    width: 100%; padding: 0.6rem 0.7rem; font: inherit; font-size: 0.92rem;
    border: 1px solid var(--line, rgba(10,9,8,0.18)); background: var(--amber, #f8f5ef);
    color: var(--ink); border-radius: 2px;
  }
  .sg-field textarea { line-height: 1.6; resize: vertical; }
  .sg-narrow { max-width: 190px; }

  .sg-formats { display: grid; gap: 0.6rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-bottom: 1.25rem; }
  .sg-format {
    display: flex; flex-direction: column; gap: 0.15rem; text-align: left; cursor: pointer;
    padding: 0.8rem 0.9rem; font: inherit; background: transparent; color: var(--ink);
    border: 1px solid var(--line, rgba(10,9,8,0.18)); border-radius: 2px;
  }
  .sg-format span { font-size: 0.76rem; color: var(--ink-60); }
  .sg-format:hover { border-color: var(--ink); }
  .sg-format.is-on { border-color: var(--accent, #0e2a52); box-shadow: inset 0 0 0 1px var(--accent, #0e2a52); }

  .sg-option { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem; }
  .sg-option input[type="radio"] { flex: none; width: 18px; height: 18px; }
  .sg-option-text {
    flex: 1; padding: 0.55rem 0.7rem; font: inherit; font-size: 0.92rem;
    border: 1px solid var(--line, rgba(10,9,8,0.18)); background: var(--amber, #f8f5ef);
    color: var(--ink); border-radius: 2px;
  }

  .sg-btn {
    padding: 0.7rem 1.3rem; cursor: pointer; font: inherit; font-size: 0.7rem;
    letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600;
    background: transparent; color: var(--ink); border: 1px solid var(--ink); border-radius: 2px;
  }
  .sg-btn-primary { background: var(--ink); color: var(--amber, #f8f5ef); }
  .sg-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .sg-error { color: #c81e2e; font-size: 0.85rem; margin: 0.75rem 0; }
  .sg-thanks { font-family: var(--f-display); font-size: 1.8rem; margin-bottom: 0.6rem; }
  .sg-note { font-size: 0.92rem; line-height: 1.7; color: var(--ink-60); margin-bottom: 1.25rem; }

  @media (max-width: 600px) {
    .sg-wrap { padding: 1rem 0.9rem 4rem; }
    .sg-panel { padding: 1.2rem 1rem; }
    .sg-narrow { max-width: none; }
  }
`
