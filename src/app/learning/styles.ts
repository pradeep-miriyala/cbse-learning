// src/app/learning/styles.ts
// Learning Lab styles. Built entirely from the site's editorial tokens
// (--bg / --ink / --accent / --f-display …) so the section reads as part of
// the same site rather than a bolt-on.

export const LEARNING_CSS = `
  /* Telugu has no glyphs in Karla or Faustina, so without a font that covers
     the script the browser falls back to whatever the device happens to have —
     or to empty boxes where it has nothing. Loaded here rather than in the root
     layout so the rest of the site does not carry the weight. */
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;600;700&display=swap');

  /* ── The lab register ──
     The page header above stays editorial (Faustina + Literata). Everything
     inside .ll-wrap switches to the lab register: Karla throughout, a slightly
     larger base so a child reads it comfortably on a tablet, and controls that
     meet a 44px touch target. Same palette, different rules. */
  .ll-wrap {
    /* Per-glyph fallback: Karla has no Telugu, so those characters fall
       through to Noto while English text is untouched. The Telugu face must
       come BEFORE the generic sans-serif, or the device default would catch
       the script first and Noto would never be used. */
    --f-ui:      'Karla', 'Noto Sans Telugu', system-ui, sans-serif;
    --f-display: 'Faustina', 'Noto Sans Telugu', Georgia, serif;
    --f-body:    'Literata', 'Noto Sans Telugu', Georgia, serif;

    position: relative; z-index: 1;
    padding: 2.5rem var(--px) 4rem; max-width: var(--max); margin: 0 auto;
    font-family: var(--f-ui);
    font-size: 17px;
    --tap: 44px;
  }

  /* ── Step scaffolding ── */
  .ll-step { border-top: 1px solid var(--line); padding: 2rem 0; }
  .ll-step:first-of-type { border-top: none; padding-top: 1rem; }
  .ll-step-head { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
  .ll-step-num {
    font-family: var(--f-mono); font-size: 0.7rem; color: var(--accent);
    border: 1px solid var(--accent); width: 1.6rem; height: 1.6rem;
    display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ll-step-title {
    font-family: var(--f-ui); font-weight: 600; font-size: 0.66rem;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink);
  }
  .ll-step-note { font-family: var(--f-ui); font-size: 0.82rem; color: var(--ink-50); }
  .ll-step.is-locked { opacity: 0.4; pointer-events: none; }

  /* ── Choice chips (grade, length) ── */
  .ll-chips { display: flex; flex-wrap: wrap; gap: 0.6rem; }
  .ll-chip {
    font-family: var(--f-ui); font-weight: 600; font-size: 0.7rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    min-height: var(--tap); padding: 0.6rem 1.15rem;
    display: inline-flex; align-items: center;
    border: 1px solid var(--line);
    background: var(--surface); color: var(--ink-70);
    cursor: pointer; transition: all 0.18s;
  }
  .ll-chip:hover { border-color: var(--ink); color: var(--ink); }
  .ll-chip[aria-pressed="true"] { background: var(--ink); border-color: var(--ink); color: var(--bg); }

  /* ── Subject cards ── */
  .ll-subjects { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem; }
  .ll-subject {
    text-align: left; padding: 1.25rem; border: 1px solid var(--line);
    background: var(--surface); cursor: pointer; transition: all 0.18s;
    border-left: 3px solid var(--sub-accent, var(--ink-30));
  }
  .ll-subject:hover { background: var(--bg-soft); }
  .ll-subject[aria-pressed="true"] { border-color: var(--ink); border-left-color: var(--sub-accent, var(--ink)); background: var(--bg-soft); }
  .ll-subject-name { display: block; font-family: var(--f-display); font-size: 1.3rem; font-weight: 400; color: var(--ink); line-height: 1.2; }
  .ll-subject-meta { display: block; font-family: var(--f-mono); font-size: 0.66rem; color: var(--ink-50); margin-top: 0.4rem; }

  /* ── Chapters ──
     Topics grouped under the chapter they belong to. With 37 topics in Social
     Science a flat list gave a child nothing to hold on to. */
  .ll-chapters { display: flex; flex-direction: column; gap: 0.5rem; }
  .ll-chapter { border: 1px solid var(--line); background: var(--surface); }
  .ll-chapter.is-open { border-color: var(--ink-30); }
  .ll-chapter-head {
    display: flex; align-items: center; gap: 0.7rem; width: 100%;
    min-height: var(--tap); padding: 0.8rem 1rem;
    background: none; border: none; cursor: pointer; text-align: left;
  }
  .ll-chapter-head:hover { background: var(--bg-soft); }
  .ll-chapter-caret { color: var(--ink-30); font-size: 0.8rem; flex-shrink: 0; }
  .ll-chapter-name {
    font-family: var(--f-ui); font-weight: 700; font-size: 0.95rem;
    color: var(--ink); flex: 1; line-height: 1.3;
  }
  .ll-chapter-meta {
    font-family: var(--f-mono); font-size: 0.62rem; color: var(--ink-50);
    text-align: right; flex-shrink: 0; white-space: nowrap;
  }
  .ll-chapter-chosen {
    display: block; color: var(--accent); font-weight: 700; margin-bottom: 0.1rem;
  }
  .ll-chapter .ll-topics { padding: 0 0.75rem 0.75rem; }

  @media (max-width: 520px) {
    /* The counts wrap under the name rather than squeezing it to two words. */
    .ll-chapter-head { flex-wrap: wrap; }
    .ll-chapter-name { flex: 1 1 100%; order: 2; }
    .ll-chapter-meta { order: 3; text-align: left; }
  }

  /* ── Topic picker ── */
  .ll-topics { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.6rem; }
  .ll-topic {
    display: flex; align-items: flex-start; gap: 0.7rem; text-align: left;
    min-height: var(--tap); padding: 0.85rem 1rem; border: 1px solid var(--line);
    background: var(--surface); cursor: pointer; transition: all 0.18s; width: 100%;
  }
  .ll-topic:hover:not(:disabled) { border-color: var(--ink-30); background: var(--bg-soft); }
  .ll-topic[aria-pressed="true"] { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 7%, transparent); }
  .ll-topic:disabled { opacity: 0.35; cursor: not-allowed; }
  .ll-topic-box {
    width: 1rem; height: 1rem; flex-shrink: 0; margin-top: 0.15rem;
    border: 1.5px solid var(--ink-30); display: inline-flex;
    align-items: center; justify-content: center;
  }
  .ll-topic[aria-pressed="true"] .ll-topic-box { border-color: var(--accent); background: var(--accent); color: #fff; }
  .ll-topic-label { font-family: var(--f-ui); font-size: 0.84rem; font-weight: 500; color: var(--ink); line-height: 1.35; }
  .ll-topic-count { font-family: var(--f-mono); font-size: 0.62rem; color: var(--ink-50); display: block; margin-top: 0.15rem; }

  /* ── Difficulty presets ── */
  .ll-presets { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 0.7rem; }
  .ll-preset {
    display: flex; flex-direction: column; gap: 0.2rem; text-align: left;
    min-height: var(--tap); padding: 0.85rem 1rem;
    border: 1px solid var(--line); background: var(--surface);
    cursor: pointer; transition: all 0.18s;
  }
  .ll-preset:hover { border-color: var(--ink-30); background: var(--bg-soft); }
  .ll-preset[aria-pressed="true"] {
    border-color: var(--accent); background: color-mix(in srgb, var(--accent) 7%, transparent);
  }
  .ll-preset-name {
    font-family: var(--f-ui); font-weight: 700; font-size: 0.88rem; color: var(--ink);
  }
  .ll-preset-blurb { font-family: var(--f-ui); font-size: 0.74rem; color: var(--ink-50); line-height: 1.4; }
  .ll-preset-mix {
    font-family: var(--f-mono); font-size: 0.62rem; color: var(--ink-30);
    letter-spacing: 0.04em; margin-top: 0.15rem;
  }

  .ll-counter { font-family: var(--f-mono); font-size: 0.68rem; color: var(--ink-50); }
  .ll-counter.is-max { color: var(--accent-2); }

  /* ── Name + launch ── */
  .ll-launch { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end; }
  .ll-field { flex: 1 1 220px; max-width: 320px; }
  .ll-field-narrow { flex: 0 0 130px; max-width: 130px; }
  .ll-field label {
    display: block; font-family: var(--f-ui); font-weight: 600; font-size: 0.58rem;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-50); margin-bottom: 0.45rem;
  }
  .ll-error {
    font-family: var(--f-ui); font-size: 0.78rem; color: var(--accent-2);
    border-left: 2px solid var(--accent-2); padding-left: 0.7rem; margin-top: 1rem;
  }

  /* ── Unfinished paper ── */
  .ll-resume {
    border: 1px solid var(--accent-3); border-left: 3px solid var(--accent-3);
    background: color-mix(in srgb, var(--accent-3) 7%, transparent);
    padding: 1.1rem 1.25rem; margin-bottom: 2rem;
  }
  .ll-resume-label {
    display: block; font-family: var(--f-ui); font-weight: 600; font-size: 0.58rem;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent-3);
    margin-bottom: 0.4rem;
  }
  .ll-resume-text { font-family: var(--f-ui); font-size: 0.92rem; line-height: 1.55; color: var(--ink); }
  .ll-resume-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 0.9rem; }

  /* Set on <body> by QuizRunner while a paper is open. Chrome on Android
     reloads the page on a long downward swipe at the top of the screen, which
     was costing learners their work. */
  body.ll-exam-open { overscroll-behavior-y: contain; }

  /* Stacked fractions, built from a string transform rather than a maths
     library — see withFractions() in src/lib/learning.ts. currentColor for the
     bar so it works on the newsprint card and on the dark slate alike. */
  .ll-frac {
    display: inline-flex; flex-direction: column; align-items: center;
    vertical-align: -0.42em; line-height: 1.08; margin: 0 0.14em;
    font-size: 0.82em; font-variant-numeric: lining-nums tabular-nums;
  }
  .ll-frac-n { padding: 0 0.28em; }
  .ll-frac-d { padding: 0 0.28em; border-top: 1px solid currentColor; }

  .ll-chip-sub { opacity: 0.6; font-size: 0.85em; }

  /* ── Pace ──
     A word, not a wall: it never covers the button and it can be dismissed. */
  .ll-pace {
    display: flex; gap: 0.9rem; align-items: flex-start;
    border: 1px solid var(--gold, #d4890a); border-left-width: 4px;
    background: rgba(212,137,10,0.07);
    padding: 0.9rem 1.1rem; margin-bottom: 1.5rem;
  }
  .ll-pace.is-rest { border-color: var(--rust, #c81e2e); background: rgba(200,30,46,0.07); }
  .ll-pace-mark { font-size: 1.3rem; line-height: 1.2; flex: none; }
  .ll-pace-body { flex: 1; }
  .ll-pace-body b { display: block; font-size: 0.95rem; margin-bottom: 0.2rem; }
  .ll-pace-body p { font-size: 0.85rem; line-height: 1.6; color: var(--ink-60); margin: 0; }
  .ll-pace-close {
    flex: none; align-self: center; cursor: pointer; font: inherit;
    font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;
    background: transparent; color: var(--ink-60);
    border: 1px solid var(--line); border-radius: 2px; padding: 0.4rem 0.7rem;
  }
  .ll-pace-close:hover { border-color: var(--ink); color: var(--ink); }

  @media (max-width: 600px) {
    .ll-pace { flex-wrap: wrap; }
    .ll-pace-close { width: 100%; }
  }

  /* ── Suggest a question ── */
  .ll-suggest {
    margin-top: 2.5rem; padding: 1.1rem 1.25rem;
    border: 1px dashed var(--line); background: var(--surface);
    display: flex; gap: 1rem; align-items: center; justify-content: space-between; flex-wrap: wrap;
  }
  .ll-suggest p { font-size: 0.85rem; line-height: 1.6; color: var(--ink-60); margin: 0; flex: 1 1 18rem; }
  .ll-suggest-link {
    flex: none; padding: 0.55rem 1rem; font-size: 0.68rem; letter-spacing: 0.12em;
    text-transform: uppercase; font-weight: 600;
    border: 1px solid var(--ink); color: var(--ink); border-radius: 2px;
  }
  .ll-suggest-link:hover { background: var(--ink); color: var(--surface); }

  .ll-elsewhere {
    font-size: 0.78rem; line-height: 1.6; color: var(--ink-60);
    margin-bottom: 0.9rem;
  }
  .ll-elsewhere-link {
    background: none; border: none; padding: 0; font: inherit; cursor: pointer;
    color: var(--accent); text-decoration: underline; text-underline-offset: 2px;
  }
  .ll-elsewhere-link:hover { color: var(--ink); }

  /* ── Kind of paper ── */
  .ll-formats { display: grid; gap: 0.6rem; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); }
  .ll-format {
    display: flex; flex-direction: column; gap: 0.2rem; text-align: left;
    padding: 0.85rem 1rem; cursor: pointer; font: inherit;
    background: var(--surface); color: var(--ink);
    border: 1px solid var(--line); border-radius: 2px;
  }
  .ll-format:hover { border-color: var(--ink); }
  .ll-format.is-on { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
  .ll-format-title { font-weight: 700; font-size: 0.95rem; }
  .ll-format-sub { font-size: 0.78rem; color: var(--ink-60); line-height: 1.4; }

  /* ── Quiz ── */
  .ll-quiz-top {
    display: flex; justify-content: space-between; align-items: center;
    gap: 1rem; flex-wrap: wrap; margin-bottom: 0.9rem;
  }
  .ll-progress-bar { height: 3px; background: var(--line); margin-bottom: 1.75rem; overflow: hidden; }
  .ll-progress-fill { height: 100%; background: var(--accent); transition: width 0.3s ease; }

  .ll-question-card { border: 1px solid var(--line); background: var(--surface); padding: 1.75rem; }
  .ll-question {
    font-family: var(--f-ui); font-size: 1.12rem; line-height: 1.65; color: var(--ink);
  }
  .ll-question b { color: var(--accent); font-weight: 700; }
  .ll-visual {
    font-family: var(--f-mono); font-size: 0.9rem; letter-spacing: 0.02em;
    background: var(--bg-soft); border: 1px solid var(--line);
    padding: 0.85rem 1rem; margin-top: 1rem; overflow-x: auto; white-space: pre-wrap;
  }
  .ll-figure { margin-top: 1.1rem; max-width: 220px; }
  .ll-figure svg,
  .ll-figure img { display: block; width: 100%; height: auto; }
  /* A linked picture may fail to load; the border keeps the gap intentional. */
  .ll-figure img { border: 1px solid var(--line); background: var(--bg-soft); }

  .ll-options { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.5rem; }
  .ll-option {
    display: flex; align-items: center; gap: 0.85rem; text-align: left; width: 100%;
    min-height: var(--tap); padding: 0.9rem 1rem;
    border: 1px solid var(--line); background: var(--bg);
    font-family: var(--f-ui); font-size: 0.95rem; color: var(--ink);
    cursor: pointer; transition: all 0.15s;
  }
  .ll-option:hover { border-color: var(--ink-30); background: var(--bg-soft); }
  .ll-option[aria-pressed="true"] { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); }
  .ll-option-letter {
    width: 1.65rem; height: 1.65rem; flex-shrink: 0; border: 1px solid var(--ink-30);
    border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--f-mono); font-size: 0.7rem; color: var(--ink-50);
  }
  .ll-option[aria-pressed="true"] .ll-option-letter { background: var(--accent); border-color: var(--accent); color: #fff; }

  .ll-quiz-nav { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-top: 1.75rem; flex-wrap: wrap; }
  .ll-dots { display: flex; flex-wrap: wrap; gap: 0.3rem; justify-content: center; flex: 1; }
  /* Small visual dot, but a finger-sized hit area around it. */
  .ll-dot {
    width: 0.6rem; height: 0.6rem; padding: 0; border-radius: 50%;
    border: 1px solid var(--ink-30); background: transparent; cursor: pointer;
    position: relative;
  }
  .ll-dot::after {
    content: ''; position: absolute; left: 50%; top: 50%;
    width: 2rem; height: 2rem; transform: translate(-50%, -50%);
  }
  .ll-dot.is-answered { background: var(--accent); border-color: var(--accent); }
  .ll-dot.is-current { box-shadow: 0 0 0 2px var(--bg), 0 0 0 3px var(--ink); }

  /* ── Reading passage ──
     Kept on paper while the question below sits on the slate. The contrast is
     the point: the passage is to be read, the question is to be worked. It
     carries the editorial serif rather than the lab's Karla, because this is
     the one place in the lab that is genuinely prose. */
  .ll-passage {
    background: var(--surface); border: 1px solid var(--line);
    border-left: 3px solid var(--accent-3);
    padding: 1.4rem 1.5rem; margin-bottom: 0.9rem;
  }
  .ll-passage-head { margin-bottom: 0.7rem; }
  .ll-passage-kicker {
    display: block; font-family: var(--f-ui); font-weight: 600; font-size: 0.58rem;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-50);
  }
  .ll-passage-title {
    font-family: var(--f-display); font-size: 1.25rem; font-weight: 400;
    line-height: 1.25; margin: 0.25rem 0 0; color: var(--ink);
  }
  .ll-passage-body {
    font-family: var(--f-body, var(--f-display)); font-size: 1rem; line-height: 1.7; color: var(--ink-70);
  }

  /* The passage is never a scroller.
     It used to be capped with overflow-y: auto so the question stayed on
     screen, but a scroll region inside a scrolling page is the wrong thing to
     hand a child: dragging inside the box moves the text, dragging just
     outside it moves the page, and nothing on screen says which is which. A
     visible scrollbar would only have labelled that confusion. The passage now
     runs at its full height, exactly as it would on a printed paper, and the
     reason for the cap is solved by where each question scrolls to instead —
     see QuizRunner. */
  .ll-passage-body p { margin: 0 0 0.85rem; }
  .ll-passage-body p:last-child { margin-bottom: 0; }
  /* In the review the passage is read once, straight through, so it is never
     boxed into a scroller. */
  .ll-passage-review { margin-top: 1.5rem; }

  @media (max-width: 640px) {
    .ll-passage { padding: 1rem 1.1rem; }
  }

  /* Jumps between the passage and its question, one at the foot of the text
     and one directly above the question. Sized to the 44px touch target: these
     are for a child on a phone who has lost sight of the other half. */
  .ll-passage-jump {
    display: inline-flex; align-items: center; gap: 0.4rem;
    min-height: var(--tap); padding: 0.5rem 0;
    background: none; border: none; cursor: pointer;
    font-family: var(--f-ui); font-size: 0.8rem; font-weight: 600;
    color: var(--accent); text-align: left;
  }
  .ll-passage-jump:hover { text-decoration: underline; }
  .ll-passage .ll-passage-jump { margin-top: 0.5rem; }
  .ll-passage-jump.is-up { margin-bottom: 0.2rem; }
  .ll-passage { scroll-margin-top: 0.5rem; }

  /* Landing on a continuation question leaves the foot of the passage just in
     view, so it is obvious the text is still there, immediately above. Sized
     to leave about three lines showing: one or two can be mistaken for a
     margin, three read unmistakably as prose that has been cut off. */
  .ll-question-card { scroll-margin-top: 5rem; }
  .ll-quiz { scroll-margin-top: calc(var(--nav-h) + 0.5rem); }

  /* ══ The slate ══
     The question panel is the one place on the site where the reader is
     working rather than reading, so it gets its own surface: a dark working
     board that calls itself out from the newsprint page around it.

     Deliberately not a chalkboard. The body face and size are unchanged,
     because the stems here run to two clauses and a chalk face would add
     difficulty that has nothing to do with the question.

     Scoped to .ll-quiz, which only QuizRunner renders. The review inside the
     result panel reuses the same question markup but not this wrapper, so the
     printed report stays on paper-white. */
  .ll-quiz .ll-question-card {
    background: #1A1F33; border-color: rgba(255,255,255,0.14);
    padding: 2rem 1.9rem;
  }
  .ll-quiz .ll-question { color: #F3F0E8; }
  /* Indigo bold text would disappear here, so emphasis switches to warm gold. */
  .ll-quiz .ll-question b { color: #E4B93F; }
  .ll-quiz .ll-visual {
    background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.14); color: #E8E4DA;
  }
  /* Figures are authored as dark strokes on nothing, and linked photographs
     almost always carry a white ground. Both are mounted on a pale card rather
     than dropped straight onto the slate, where they would vanish or glare. */
  .ll-quiz .ll-figure {
    background: #F3F0E8; padding: 0.6rem; border-radius: 2px; max-width: 240px;
  }
  .ll-quiz .ll-figure img { border-color: rgba(22,19,15,0.15); background: transparent; }
  .ll-quiz .ll-option {
    background: #232A42; border-color: rgba(255,255,255,0.16); color: #F3F0E8;
  }
  .ll-quiz .ll-option:hover { background: #2C3452; border-color: rgba(255,255,255,0.32); }
  .ll-quiz .ll-option[aria-pressed="true"] {
    border-color: #E4B93F; background: rgba(228,185,63,0.15);
  }
  .ll-quiz .ll-option-letter { border-color: rgba(255,255,255,0.35); color: #C3C9DA; }
  .ll-quiz .ll-option[aria-pressed="true"] .ll-option-letter {
    background: #E4B93F; border-color: #E4B93F; color: #1A1F33;
  }
  .ll-quiz .ll-hint {
    background: rgba(228,185,63,0.12); border-color: rgba(228,185,63,0.45); color: #F0EBDD;
  }
  .ll-quiz .ll-hint-label { color: #E4B93F; }
  .ll-quiz .ll-hint-btn { color: #E4B93F; border-color: rgba(228,185,63,0.5); }
  .ll-quiz .ll-hint-btn:hover:not(:disabled) { background: rgba(228,185,63,0.12); }

  /* ── Bottom bar, question grid, review ──
     The bar is fixed so Back and Next sit under the thumb however far the
     question has been scrolled. .ll-quiz reserves room beneath its content so
     the last option never hides behind it. */
  .ll-quiz { padding-bottom: 5.5rem; }
  .ll-flagbtn {
    margin-left: auto; min-height: 36px; padding: 0 0.7rem; border: 1px solid var(--ink-30);
    border-radius: 2px; background: transparent; color: var(--ink-50); cursor: pointer;
    font-family: var(--f-ui); font-size: 0.78rem; font-weight: 600;
  }
  .ll-flagbtn[aria-pressed="true"] { background: var(--accent-3); border-color: var(--accent-3); color: #fff; }

  .ll-dock {
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 90;
    display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
    padding: 0.65rem var(--px) calc(0.65rem + env(safe-area-inset-bottom));
    background: var(--bg); border-top: 1px solid var(--line);
    box-shadow: 0 -8px 20px rgba(22,19,15,0.08);
  }
  .ll-dock > .btn, .ll-dock > .btn-primary { min-height: var(--tap); min-width: 5.5rem; }
  .ll-dock-count {
    flex: 1; min-height: var(--tap); background: none; border: 0; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-family: var(--f-display); font-size: 1.15rem; color: var(--ink); line-height: 1.1;
  }
  .ll-dock-of { color: var(--ink-50); font-size: 0.95rem; }
  .ll-dock-sub { font-family: var(--f-ui); font-size: 0.68rem; color: var(--accent); margin-top: 0.15rem; border-bottom: 1px dotted var(--accent); }

  .ll-sheet { position: fixed; inset: 0; z-index: 120; display: flex; align-items: flex-end; justify-content: center; }
  .ll-sheet-scrim { position: absolute; inset: 0; background: rgba(22,19,15,0.45); border: 0; cursor: default; }
  .ll-sheet-panel {
    position: relative; width: 100%; max-width: 560px; max-height: 80vh; overflow-y: auto;
    background: var(--bg); border-top: 1px solid var(--line); border-radius: 12px 12px 0 0;
    padding: 1rem var(--px) calc(1.25rem + env(safe-area-inset-bottom));
  }
  .ll-sheet-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.9rem; }
  .ll-sheet-close {
    background: none; border: 0; color: var(--accent); font: inherit; font-weight: 700;
    min-height: var(--tap); padding: 0 0.25rem; cursor: pointer;
  }
  .ll-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(2.75rem, 1fr)); gap: 0.4rem; }
  .ll-cell {
    min-height: 2.75rem; border: 1px solid var(--ink-30); border-radius: 4px; background: var(--surface);
    font-family: var(--f-mono); font-size: 0.85rem; color: var(--ink); cursor: pointer; position: relative;
  }
  .ll-cell.is-answered { background: var(--accent); border-color: var(--accent); color: #fff; }
  .ll-cell.is-current { box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--ink); }
  .ll-cell.is-flagged::after {
    content: ''; position: absolute; top: 3px; right: 3px; width: 8px; height: 8px;
    border-radius: 50%; background: var(--accent-3); border: 1px solid var(--bg);
  }
  .ll-grid-key { display: flex; gap: 1rem; flex-wrap: wrap; margin: 0.9rem 0 1rem; font-size: 0.78rem; color: var(--ink-50); }
  .ll-grid-key i { display: inline-block; width: 0.8rem; height: 0.8rem; border-radius: 3px; margin-right: 0.35rem; vertical-align: -1px; border: 1px solid var(--ink-30); }
  .ll-grid-key .k-answered { background: var(--accent); border-color: var(--accent); }
  .ll-grid-key .k-flag { background: var(--accent-3); border-color: var(--accent-3); }

  .ll-quiz-review { padding-bottom: 3rem; }
  .ll-rv-title { font-family: var(--f-display); font-size: clamp(1.6rem, 5vw, 2.2rem); margin: 0.4rem 0 1.25rem; font-weight: 600; }
  .ll-rv-group { margin-bottom: 1.25rem; }
  .ll-rv-label { display: block; font-size: 0.8rem; color: var(--ink-50); margin-bottom: 0.5rem; }
  .ll-rv-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .ll-rv-chip {
    min-width: 2.75rem; min-height: 2.75rem; border-radius: 4px; cursor: pointer;
    font-family: var(--f-mono); font-size: 0.85rem; background: var(--surface); color: var(--ink);
    border: 1px solid var(--ink-30);
  }
  .ll-rv-chip.is-open { border-color: var(--error); color: var(--error); }
  .ll-rv-chip.is-flag { border-color: var(--accent-3); color: var(--accent-3); }
  .ll-rv-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; }

  /* ── Report this question ── */
  .ll-flag-slot { margin-top: 1rem; }
  .ll-flag-link {
    background: none; border: 0; padding: 0.5rem 0; min-height: 36px; cursor: pointer;
    font: inherit; font-size: 0.8rem; color: var(--ink-50); border-bottom: 1px dotted var(--ink-30);
  }
  .ll-quiz .ll-flag-link { color: #C3C9DA; border-color: rgba(255,255,255,0.35); }
  .ll-flag-panel {
    border: 1px solid var(--line); background: var(--surface); padding: 0.9rem; border-radius: 4px;
    color: var(--ink);
  }
  .ll-flag-title { display: block; font-weight: 700; font-size: 0.85rem; margin-bottom: 0.6rem; }
  .ll-flag-reasons { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.7rem; }
  .ll-flag-reason {
    min-height: 40px; padding: 0 0.8rem; border-radius: 999px; border: 1px solid var(--ink-30);
    background: transparent; color: var(--ink); font: inherit; font-size: 0.82rem; cursor: pointer;
  }
  .ll-flag-reason[aria-checked="true"] { background: var(--accent); border-color: var(--accent); color: #fff; }
  .ll-flag-note {
    width: 100%; min-height: 44px; padding: 0 0.7rem; border: 1px solid var(--ink-30); border-radius: 2px;
    background: var(--bg); font: inherit; font-size: 16px; color: var(--ink);
  }
  .ll-flag-error { color: var(--error); font-size: 0.82rem; margin-top: 0.5rem; }
  .ll-flag-actions { display: flex; gap: 0.6rem; margin-top: 0.75rem; flex-wrap: wrap; }
  .ll-flag-done { font-size: 0.82rem; color: var(--ok); }
  .ll-quiz .ll-flag-done { color: #8FD4AE; }

  /* ── Do this next ── */
  .ll-next { margin: 2rem 0 1.25rem; }
  .ll-next-cards { display: grid; gap: 0.75rem; margin-top: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
  .ll-next-card {
    text-align: left; padding: 1rem 1.1rem; min-height: var(--tap); cursor: pointer;
    background: var(--surface); border: 1px solid var(--ink-30); border-radius: 4px; font-family: var(--f-ui);
    display: flex; flex-direction: column; gap: 0.3rem; color: var(--ink);
  }
  .ll-next-card:hover:not(:disabled) { border-color: var(--accent); }
  .ll-next-card:disabled { opacity: 0.6; cursor: wait; }
  .ll-next-card.is-lead { background: var(--accent); border-color: var(--accent); color: #fff; }
  .ll-next-title { font-weight: 700; font-size: 1rem; }
  .ll-next-sub { font-size: 0.82rem; opacity: 0.85; }

  /* ── Result ── */
  .ll-score-hero { text-align: center; padding: 1.5rem 0 0.5rem; }
  .ll-score-big {
    font-family: var(--f-display); font-size: clamp(2.75rem, 9vw, 4.5rem);
    font-weight: 400; line-height: 1; color: var(--ink);
  }
  .ll-score-pct { font-family: var(--f-mono); font-size: 0.85rem; color: var(--accent); margin-top: 0.5rem; }
  .ll-score-msg { font-family: var(--f-ui); font-size: 1rem; color: var(--ink-50); margin-top: 0.75rem; }

  .ll-breakdown { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0; }
  .ll-bd-card { border: 1px solid var(--line); background: var(--surface); padding: 1rem 1.1rem; }
  .ll-bd-topic { font-family: var(--f-ui); font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-50); }
  .ll-bd-score { font-family: var(--f-display); font-size: 1.6rem; color: var(--ink); margin-top: 0.2rem; }
  .ll-bar { height: 4px; background: var(--line); margin-top: 0.6rem; overflow: hidden; }
  .ll-bar span { display: block; height: 100%; background: var(--accent); }

  .ll-actions { display: flex; gap: 0.85rem; justify-content: center; flex-wrap: wrap; margin: 1.5rem 0; }

  /* ── Review ── */
  .ll-review-block { margin-top: 2rem; }
  .ll-review-block.is-collapsed { display: none; }

  .ll-review-controls {
    display: flex; justify-content: space-between; align-items: center;
    gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;
    padding-bottom: 0.75rem; border-bottom: 1px solid var(--line);
  }
  .ll-seg { display: inline-flex; border: 1px solid var(--line); background: var(--surface); }
  .ll-seg-btn {
    font-family: var(--f-ui); font-weight: 600; font-size: 0.66rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.5rem 0.9rem; border: none; background: transparent;
    color: var(--ink-50); cursor: pointer; transition: all 0.15s;
  }
  .ll-seg-btn + .ll-seg-btn { border-left: 1px solid var(--line); }
  .ll-seg-btn:hover:not(:disabled) { color: var(--ink); }
  .ll-seg-btn[aria-pressed="true"] { background: var(--ink); color: var(--bg); }
  .ll-seg-btn:disabled { opacity: 0.35; cursor: not-allowed; }

  .ll-review { display: flex; flex-direction: column; gap: 0.85rem; }
  /* "Only mistakes" hides the correct answers rather than unmounting them —
     the print stylesheet brings them back so the PDF is always complete. */
  .ll-review-item.is-filtered-out { display: none; }
  .ll-review-item { border: 1px solid var(--line); border-left: 3px solid var(--ink-30); background: var(--surface); padding: 1.1rem 1.25rem; }
  .ll-review-item.is-correct { border-left-color: var(--ok); }
  .ll-review-item.is-wrong   { border-left-color: var(--error);   background: color-mix(in srgb, var(--error) 6%, var(--surface)); }
  .ll-review-item.is-skipped { border-left-color: var(--skipped); background: color-mix(in srgb, var(--skipped) 7%, var(--surface)); }

  .ll-review-head {
    display: flex; justify-content: space-between; align-items: center;
    gap: 0.75rem; margin-bottom: 0.6rem; flex-wrap: wrap;
  }
  .ll-review-topic {
    font-family: var(--f-ui); font-size: 0.58rem; font-weight: 600;
    letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-50);
  }
  .ll-badge {
    font-family: var(--f-ui); font-size: 0.56rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 0.2rem 0.6rem; border: 1px solid currentColor; white-space: nowrap;
  }
  .ll-badge.is-correct { color: var(--ok); }
  .ll-badge.is-wrong   { color: var(--error); }
  .ll-badge.is-skipped { color: var(--skipped); }

  .ll-review-q { font-family: var(--f-ui); font-size: 0.95rem; color: var(--ink); line-height: 1.6; }
  .ll-review-q b { color: var(--accent); }
  .ll-review-row { font-family: var(--f-ui); font-size: 0.8rem; margin-top: 0.5rem; }
  .ll-review-key {
    display: inline-block; min-width: 8.5rem;
    font-size: 0.58rem; font-weight: 600; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--ink-50);
  }
  .ll-review-row.is-yours   { color: var(--error); font-weight: 600; }
  .ll-review-row.is-correct { color: var(--ok); font-weight: 600; }
  .ll-review-tip {
    font-family: var(--f-ui); font-size: 0.85rem; color: var(--ink-50);
    border-top: 1px solid var(--line-soft); margin-top: 0.75rem; padding-top: 0.7rem;
  }
  .ll-review-tip b { color: var(--ink-70); }

  /* ── In-paper hint ──
     Offered after a pause, never revealed unasked: most teacher tips name the
     answer, so an automatic reveal would simply give the question away. */
  .ll-hint-slot { min-height: 2.6rem; margin-top: 1rem; }
  .ll-hint-btn {
    font-family: var(--f-ui); font-weight: 600; font-size: 0.72rem;
    letter-spacing: 0.08em;
    min-height: 2.4rem; padding: 0.5rem 1rem;
    border: 1px dashed var(--accent-3); background: transparent;
    color: var(--accent-3); cursor: pointer; transition: all 0.15s;
  }
  .ll-hint-btn:hover:not(:disabled) { background: color-mix(in srgb, var(--accent-3) 8%, transparent); }
  .ll-hint-btn:disabled { opacity: 0.5; cursor: wait; }
  /* Shown in place of the button once the paper's hints are spent, so the slot
     explains itself rather than the offer simply vanishing. */
  .ll-hint-spent {
    font-family: var(--f-ui); font-size: 0.78rem; color: var(--ink-50);
    border-left: 2px solid var(--line); padding-left: 0.7rem;
  }
  .ll-hint {
    font-family: var(--f-ui); font-size: 0.88rem; line-height: 1.6; color: var(--ink-70);
    border-left: 3px solid var(--accent-3);
    background: color-mix(in srgb, var(--accent-3) 7%, transparent);
    padding: 0.75rem 0.9rem;
  }
  .ll-hint-label {
    display: block; font-size: 0.56rem; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--accent-3); margin-bottom: 0.3rem;
  }
  .ll-review-item .ll-badge.is-hinted { color: var(--accent-3); }

  /* ── Continuity note on the result ── */
  .ll-continuity {
    border: 1px solid var(--line); border-left: 3px solid var(--accent-3);
    background: color-mix(in srgb, var(--accent-3) 6%, var(--surface));
    padding: 1rem 1.15rem; margin-bottom: 1.5rem;
  }
  .ll-continuity p { font-family: var(--f-ui); font-size: 0.88rem; line-height: 1.6; color: var(--ink-70); }
  .ll-continuity .ll-hint-label { color: var(--accent-3); }

  /* ── Feedback ── */
  .ll-feedback { border: 1px solid var(--line); background: var(--surface); padding: 1.5rem; margin-top: 2rem; }
  .ll-stars { display: flex; gap: 0.4rem; margin: 0.75rem 0 1.25rem; }
  .ll-star {
    width: var(--tap); height: var(--tap); border: 1px solid var(--line); background: var(--bg);
    font-family: var(--f-mono); font-size: 0.85rem; color: var(--ink-50); cursor: pointer; transition: all 0.15s;
  }
  .ll-star:hover { border-color: var(--ink-30); }
  .ll-star.is-on { background: var(--accent-3); border-color: var(--accent-3); color: var(--ink); }
  .ll-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem; }
  .ll-tag {
    font-family: var(--f-ui); font-size: 0.72rem;
    min-height: 2.5rem; padding: 0.4rem 0.95rem;
    display: inline-flex; align-items: center;
    border: 1px solid var(--line); background: var(--bg); color: var(--ink-70);
    cursor: pointer; border-radius: 999px; transition: all 0.15s;
  }
  .ll-tag[aria-pressed="true"] { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); color: var(--accent); }
  .ll-hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }

  /* ── Local history ── */
  .ll-history { border-top: 1px solid var(--line); margin-top: 2.5rem; padding-top: 1.5rem; }
  .ll-history-row {
    display: flex; justify-content: space-between; gap: 1rem; align-items: baseline;
    padding: 0.6rem 0; border-bottom: 1px solid var(--line-soft);
    font-family: var(--f-ui); font-size: 0.8rem; color: var(--ink-70);
  }
  .ll-history-score { font-family: var(--f-mono); color: var(--ink); white-space: nowrap; }

  .ll-muted { font-family: var(--f-ui); font-size: 0.85rem; color: var(--ink-50); }

  button:focus-visible, .ll-chip:focus-visible, .ll-option:focus-visible, .ll-dot:focus-visible {
    outline: 2px solid var(--accent); outline-offset: 2px;
  }

  @media (max-width: 560px) {
    .ll-question-card { padding: 1.25rem; }
    .ll-breakdown { grid-template-columns: 1fr; }
    .ll-quiz-nav .ll-dots { order: 3; width: 100%; }
  }

  /* ── Print / PDF report ──
     "Download report (PDF)" is the browser's own print-to-PDF. That keeps the
     typography identical to the screen and avoids shipping a PDF library to
     every visitor. */
  .ll-print-only { display: none; }

  @media print {
    @page { margin: 14mm 12mm 20mm; }

    /* Everything that isn't the report itself. */
    .nav, .nav-overlay, .footer, .page-head,
    .ll-quiz-nav, .ll-actions, .ll-feedback, .ll-history,
    .ll-review-controls, .ll-step, .ll-passage-jump { display: none !important; }

    body { background: #fff !important; padding-top: 0 !important; }
    body::before { display: none !important; }
    /* Drop the lab register's screen base size — print sizes are set in pt. */
    .ll-wrap { padding: 0 !important; max-width: none !important; font-size: 10pt; }

    .ll-print-only { display: block; }
    .ll-flag-slot, .ll-dock, .ll-next { display: none !important; }

    .ll-print-head { border-bottom: 1.5px solid #000; padding-bottom: 8pt; margin-bottom: 14pt; }
    .ll-print-title {
      font-family: var(--f-display); font-size: 16pt; color: #000;
    }
    .ll-print-meta {
      font-family: var(--f-ui); font-size: 8.5pt; color: #444; margin-top: 3pt;
    }

    .ll-print-footer {
      position: fixed; bottom: 0; left: 0; right: 0;
      font-family: var(--f-ui); font-size: 7.5pt; color: #555;
      border-top: 0.5pt solid #bbb; padding-top: 4pt; text-align: center;
    }

    /* The report is always the whole paper, whatever the screen is showing:
       the review may be collapsed, and the filter may be on "Only mistakes". */
    .ll-review-block.is-collapsed { display: block !important; }
    .ll-review-item.is-filtered-out { display: block !important; }

    /* A comprehension passage must print in full — on screen it is a scroller,
       and a scrolled box prints as whatever happened to be in view. It is also
       kept with the questions that follow it rather than stranded at the foot
       of a page. */
    .ll-passage {
      background: #fff !important; border: 0.5pt solid #999 !important;
      border-left: 2pt solid #555 !important;
      padding: 8pt 10pt; margin: 10pt 0 8pt; break-inside: avoid; break-after: avoid;
    }
    .ll-passage-body { font-size: 9.5pt; color: #000; }
    .ll-passage-title { font-size: 12pt; }

    .ll-score-hero { text-align: left; padding: 0 0 6pt; }
    .ll-score-big { font-size: 26pt; }
    .ll-score-pct, .ll-score-msg { font-size: 10pt; }
    .eyebrow { color: #000 !important; }

    .ll-breakdown { gap: 8pt; margin: 10pt 0 14pt; }
    .ll-bd-card, .ll-review-item, .ll-question-card {
      border: 0.5pt solid #999 !important; background: #fff !important;
      break-inside: avoid; page-break-inside: avoid;
    }
    .ll-review-item { padding: 8pt 10pt; }
    .ll-review { gap: 7pt; }
    .ll-review-q { font-size: 9.5pt; }
    .ll-review-row { font-size: 8.5pt; }
    .ll-review-tip { font-size: 8.5pt; }
    .ll-bar { display: none; }

    /* Colour survives to PDF; keep it legible if the printer is mono. */
    .ll-review-item.is-wrong   { border-left: 2.5pt solid #000 !important; }
    .ll-review-item.is-skipped { border-left: 2.5pt dashed #000 !important; }
    .ll-review-item.is-correct { border-left: 0.5pt solid #999 !important; }
    .ll-badge { border-color: #666; color: #333 !important; }

    a[href]::after { content: ''; }
  }
`
