// src/app/learning/speak-demo/styles.ts
// Styles for the spoken-answer demo. The slate panel matches the quiz runner —
// the thing being answered should not look like the rest of the page.

export const SPEAK_CSS = `
  .sd-wrap {
    max-width: 720px; margin: 0 auto; padding: 1.5rem 1.25rem 5rem;
    font-family: var(--f-ui);
  }

  .sd-meta {
    display: flex; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap;
    font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--ink-30, #9a9388); margin-bottom: 0.7rem;
  }
  .sd-dim { opacity: 0.55; }
  .sd-over { color: #d4890a; }

  .sd-panel {
    background: #23262b; color: #eef0f2;
    border: 1px solid #33373d; border-radius: 2px;
    padding: 1.6rem 1.5rem;
    box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset;
  }

  .sd-kicker {
    font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase;
    color: #8a929c; margin-bottom: 0.7rem;
  }
  .sd-question { font-size: 1.08rem; line-height: 1.6; margin-bottom: 1.3rem; }

  /* ── Microphone ── */
  .sd-mic {
    width: 100%; display: flex; align-items: center; justify-content: center;
    gap: 0.6rem; padding: 1rem 1.2rem; cursor: pointer;
    background: transparent; color: #eef0f2;
    border: 1px dashed #4a505a; border-radius: 2px;
    font: inherit; font-size: 0.9rem;
  }
  .sd-mic:hover { border-color: #6b737e; }
  .sd-mic.is-live { border-style: solid; border-color: #c81e2e; background: rgba(200,30,46,0.1); }
  .sd-mic-dot {
    width: 10px; height: 10px; border-radius: 50%; background: #6b737e; flex: none;
  }
  .sd-mic.is-live .sd-mic-dot { background: #ff4d5e; animation: sd-pulse 1.2s ease-in-out infinite; }
  @keyframes sd-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(1.35); } }

  /* ── What was heard ── */
  .sd-heard { margin-top: 1.1rem; }
  .sd-heard-label {
    font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: #8a929c; margin-bottom: 0.5rem;
  }
  .sd-words {
    font-size: 1rem; line-height: 2.1;
    background: rgba(255,255,255,0.04); border: 1px solid #33373d;
    padding: 0.7rem 0.6rem; border-radius: 2px;
  }
  .sd-word {
    background: none; border: none; border-bottom: 1px dotted #5a616b;
    color: #eef0f2; font: inherit; cursor: pointer;
    padding: 0.1rem 0.15rem; margin: 0 0.12rem;
  }
  .sd-word:hover { background: rgba(255,255,255,0.1); border-bottom-color: #eef0f2; }
  .sd-word-edit {
    font: inherit; color: #23262b; background: #fff;
    border: 1px solid #7d8590; padding: 0.1rem 0.25rem; margin: 0 0.12rem;
    width: 7ch; border-radius: 2px;
  }
  .sd-interim { color: #8a929c; font-style: italic; }

  /* Read-only while the recogniser is talking — plain text, so nothing invites
     a tap that would fight the microphone for the same words. */
  .sd-live {
    font-size: 1rem; line-height: 1.75;
    background: rgba(255,255,255,0.04); border: 1px solid #33373d;
    padding: 0.7rem 0.8rem; border-radius: 2px; min-height: 3.2rem;
  }

  /* ── Choosing a way in ──
     Two icons on a single row. The full-width cards this replaced took most of
     a phone screen before the child had answered anything. */
  .sd-choose { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
  .sd-icon-btn {
    width: 46px; height: 46px; flex: none;
    display: inline-flex; align-items: center; justify-content: center;
    background: transparent; color: #eef0f2; cursor: pointer;
    border: 1px solid #4a505a; border-radius: 4px;
  }
  .sd-icon-btn:hover:not(:disabled) { border-color: #eef0f2; background: rgba(255,255,255,0.06); }
  .sd-icon-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .sd-icon-btn.is-live { border-color: #c81e2e; background: rgba(200,30,46,0.12); }
  .sd-rec-dot {
    width: 15px; height: 15px; border-radius: 50%; background: #ff4d5e;
    animation: sd-pulse 1.2s ease-in-out infinite;
  }
  .sd-choose-hint { font-size: 0.78rem; color: #8a929c; line-height: 1.45; flex: 1 1 12rem; }

  .sd-choice {
    display: flex; flex-direction: column; gap: 0.2rem; text-align: left;
    padding: 1rem 1.1rem; cursor: pointer; font: inherit;
    background: transparent; color: #eef0f2;
    border: 1px solid #4a505a; border-radius: 2px;
  }
  .sd-choice:hover:not(:disabled) { border-color: #eef0f2; background: rgba(255,255,255,0.05); }
  .sd-choice:disabled { opacity: 0.4; cursor: not-allowed; }
  .sd-choice-title { font-size: 0.95rem; font-weight: 600; }
  .sd-choice-sub { font-size: 0.75rem; color: #8a929c; }

  .sd-type {
    width: 100%; margin-top: 1.1rem; padding: 0.8rem;
    background: rgba(255,255,255,0.05); border: 1px solid #4a505a;
    color: #eef0f2; font: inherit; font-size: 0.95rem; line-height: 1.6;
    border-radius: 2px; resize: vertical;
  }

  .sd-note, .sd-error { font-size: 0.8rem; line-height: 1.5; margin-top: 0.8rem; }
  .sd-note  { color: #8a929c; }
  .sd-error { color: #ff8a94; }

  /* ── Buttons ── */
  .sd-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 1.3rem; }
  .sd-btn {
    padding: 0.65rem 1.1rem; cursor: pointer; font: inherit;
    font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600;
    background: transparent; color: #eef0f2; border: 1px solid #5a616b; border-radius: 2px;
  }
  .sd-btn:hover:not(:disabled) { border-color: #eef0f2; }
  .sd-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .sd-btn-primary { background: #eef0f2; color: #23262b; border-color: #eef0f2; }
  .sd-btn-primary:hover:not(:disabled) { background: #fff; }

  /* ── Result ── */
  .sd-score { font-family: var(--f-display, serif); font-size: 2.4rem; line-height: 1; margin-bottom: 1.1rem; }

  .sd-points { list-style: none; display: grid; gap: 0.7rem; margin-bottom: 1.4rem; }
  .sd-points li { display: flex; gap: 0.6rem; align-items: flex-start; font-size: 0.88rem; line-height: 1.5; }
  .sd-tick { flex: none; width: 1.1rem; font-weight: 700; }
  .sd-points li.is-found  .sd-tick { color: #5fd18a; }
  .sd-points li.is-missed .sd-tick { color: #ff8a94; }
  .sd-points li.is-claimed .sd-tick { color: #f0b429; }
  .sd-points li.is-missed .sd-point-label { color: #c9cfd6; }
  .sd-point-body { display: flex; flex-direction: column; gap: 0.2rem; }
  .sd-because { font-size: 0.72rem; color: #8a929c; font-style: italic; }
  .sd-dispute {
    align-self: flex-start; background: none; border: 1px solid #5a616b;
    color: #c9cfd6; font: inherit; font-size: 0.65rem; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 0.22rem 0.5rem; cursor: pointer;
    border-radius: 2px; margin-top: 0.15rem;
  }
  .sd-dispute:hover { border-color: #eef0f2; color: #fff; }

  .sd-model {
    background: rgba(255,255,255,0.05); border-left: 3px solid #5fd18a;
    padding: 0.85rem 1rem; font-size: 0.88rem; line-height: 1.65;
    font-family: var(--f-body, serif);
  }
  .sd-model-label {
    font-family: var(--f-ui); font-size: 0.6rem; letter-spacing: 0.14em;
    text-transform: uppercase; color: #8a929c; margin-bottom: 0.35rem;
  }

  .sd-done-score { font-family: var(--f-display, serif); font-size: 3rem; line-height: 1; margin-bottom: 0.8rem; }
  .sd-done-note { font-size: 0.88rem; line-height: 1.6; color: #c9cfd6; margin-bottom: 1.3rem; }

  /* ── Match the columns ── */
  .mt-passage {
    background: rgba(255,255,255,0.05); border-left: 3px solid #5a616b;
    padding: 0.85rem 1rem; margin: 0 0 1.2rem;
    font-family: var(--f-body, serif); font-size: 0.9rem; line-height: 1.7;
  }
  .mt-passage-title {
    font-family: var(--f-ui); font-weight: 700; font-size: 0.8rem; margin-bottom: 0.35rem;
  }

  .mt-rows { display: grid; gap: 0.5rem; margin-bottom: 1rem; }
  .mt-row, .mt-result-row {
    display: grid; grid-template-columns: 1fr auto minmax(9rem, 1.2fr);
    gap: 0.6rem; align-items: center;
  }
  .mt-result-row { grid-template-columns: 1.1rem 1fr auto minmax(9rem, 1.4fr); }
  .mt-left { font-size: 0.95rem; font-weight: 600; }
  .mt-arrow { color: #6b737e; }
  .mt-select {
    width: 100%; padding: 0.5rem 0.6rem; font: inherit; font-size: 0.88rem;
    background: rgba(255,255,255,0.06); color: #eef0f2;
    border: 1px solid #4a505a; border-radius: 2px;
  }
  .mt-select.is-set { border-color: #7d8590; }
  .mt-answer { font-size: 0.9rem; }
  .mt-result-row.is-right .sd-tick { color: #5fd18a; }
  .mt-result-row.is-wrong .sd-tick { color: #ff8a94; }
  .mt-correct { color: #5fd18a; font-size: 0.82rem; }

  @media (max-width: 560px) {
    /* The arrow is decoration; on a phone the row needs the width more. */
    .mt-row { grid-template-columns: 1fr; gap: 0.25rem; }
    .mt-row .mt-arrow { display: none; }
    .mt-result-row { grid-template-columns: 1.1rem 1fr; }
    .mt-result-row .mt-arrow { display: none; }
    .mt-result-row .mt-answer { grid-column: 2; }
  }

  .sd-privacy {
    font-size: 0.72rem; line-height: 1.6; color: var(--ink-30, #9a9388);
    margin-top: 1rem; text-align: center;
  }

  @media (max-width: 600px) {
    .sd-wrap  { padding: 1rem 0.9rem 4rem; }
    .sd-panel { padding: 1.2rem 1rem; }
    .sd-question { font-size: 1rem; }
    .sd-actions .sd-btn { flex: 1 1 auto; }
  }
`
