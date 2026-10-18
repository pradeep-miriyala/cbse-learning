#!/usr/bin/env python3
"""
Builds the Class 6 Fractions bank.

Every answer here is computed with Fraction rather than typed, because a bank
of 240 hand-written arithmetic questions will contain arithmetic mistakes, and
a wrong answer key in a practice paper teaches the wrong thing.

The wrong options are not random. Each one is a mistake a Class 6 child
actually makes — adding denominators, treating the bigger denominator as the
bigger fraction, dividing only the numerator when simplifying. That makes the
distractors worth counting: when one wrong option collects most of the clicks,
it names the misconception rather than just saying the question was hard.

    python3 scripts/gen-fractions.py          # writes scripts/banks/fractions.json
"""

import json
import random
import re
from fractions import Fraction
from itertools import permutations
from math import gcd

random.seed(20260817)  # stable output — re-running must not churn the file

CH = "Fractions"
OUT = "scripts/banks/fractions.json"

fs = lambda n, d: f"{n}/{d}"
frac = lambda f: f"{f.numerator}/{f.denominator}"


def value_of(s):
    """The number an option denotes, or None if it is not a bare number."""
    s = str(s).strip()
    m = re.fullmatch(r"(\d+)\s+(\d+)/(\d+)", s)          # mixed: 2 1/3
    if m:
        return int(m[1]) + Fraction(int(m[2]), int(m[3]))
    m = re.fullmatch(r"(\d+)/(\d+)", s)                    # 3/4
    if m:
        return Fraction(int(m[1]), int(m[2]))
    m = re.fullmatch(r"\d+", s)
    if m:
        return Fraction(int(s))
    return None


# Only one question type may offer two spellings of the same number: "reduce
# this to its lowest terms", where picking the fully reduced one out of several
# equal-valued forms IS the task. Everywhere else it is a trap — a child who
# works out 1/4 + 1/4 = 2/4 has done the arithmetic right, and should not be
# marked wrong for not noticing that 1/2 was also on the list.
ASKS_FOR_FORM = ("lowest terms",)


def cross_sub(n1, d1, n2, d2):
    """
    The "subtracted straight across" error — but only when it yields a fraction
    that could exist.

    Where the first denominator is the smaller one it produces a negative
    bottom, and options reading 1/-3 and 2/-2 reached live papers. A distractor
    has to be a wrong answer a child might give, not a thing that cannot be
    written down.
    """
    n, d = n1 - n2, d1 - d2
    return fs(n, d) if n > 0 and d > 0 else None


def q(topic, label, question, options, answer, hint, difficulty, visual=None):
    """One question, with the option list checked for the traps that matter."""
    opts = [str(o) for o in options]
    assert len(opts) == 4, (question, opts)
    assert len(set(opts)) == 4, ("duplicate options", question, opts)
    assert 0 <= answer < 4, question

    # Every option has to be a number that exists. A negative or zero
    # denominator is not a misconception a child could hold, it is a generator
    # bug — and options reading 1/-3 and 2/-2 reached live papers before this.
    for o in opts:
        m = re.fullmatch(r"(-?\d+)/(-?\d+)", o)
        if m:
            assert int(m[2]) > 0, ("option with a non-positive denominator", question, opts)
            assert int(m[1]) >= 0, ("option with a negative numerator", question, opts)

    # Two options that are the same NUMBER make a question unanswerable: a
    # child who works out 1/4 + 1/4 = 2/4 is right, and would be marked wrong
    # for not noticing that 1/2 was also on offer. It is only fair when the
    # question says which form it wants — "in its simplest form" — because then
    # the unsimplified one is genuinely the wrong response to what was asked.
    vals = [value_of(o) for o in opts]
    if all(v is not None for v in vals) and len(set(vals)) != len(vals):
        assert any(p in question.lower() for p in ASKS_FOR_FORM), (
            "two options share a value but the question does not say which form "
            "it wants", question, opts)

    return {
        "grade": 6, "subject": "maths", "chapter": CH,
        "topic": topic, "topicLabel": label,
        "question": question, "options": opts, "answer": answer,
        "hint": hint, "difficulty": difficulty,
        **({"visual": visual} if visual else {}),
    }


def pick4(correct, wrongs, filler, also=()):
    """
    Four options: the answer, then the misconception distractors.

    Options are kept apart by the NUMBER they denote, not by how they are
    written. A misconception sometimes lands on the right answer — 1/3 + 1/6
    gives the same thing whether you do it properly or add across — and two
    distractors can collide the same way (6/8 and 3/4). Either way the question
    stops having one answer, so the later option is dropped rather than kept.

    `also` is the one deliberate exception: the unsimplified form of the answer,
    offered only where the question says it wants simplest form. Callers pass it
    there so the general rule above cannot silently throw it away.

    When dropping leaves fewer than four, the padding walks the numerator so it
    stays a plausible fraction, and is bounded so a bug cannot spin here.
    """
    out, seen = [], set()

    def push(o, force=False):
        o = str(o)
        if len(out) == 4 or o in out:
            return
        v = value_of(o)
        if v is not None and v in seen and not force:
            return
        out.append(o)
        if v is not None:
            seen.add(v)

    push(correct)
    for o in also:
        push(o, force=True)
    for o in list(wrongs) + list(filler):
        push(o)

    # Padding, when dropping has left a gap. It walks a real number so the
    # extra option is still something a child could plausibly have arrived at.
    # It cannot invent an option for a non-numeric answer, so that case fails
    # loudly rather than shipping a nonsense option into a paper.
    if len(out) < 4:
        base = str(correct)
        m = re.fullmatch(r"(\d+)/(\d+)", base)
        mixed = re.fullmatch(r"(\d+)\s+(\d+)/(\d+)", base)
        for step in range(1, 40):
            if len(out) == 4:
                break
            if m:
                push(f"{int(m[1]) + step}/{m[2]}")
                push(f"{m[1]}/{int(m[2]) + step}")
            elif mixed:
                push(f"{int(mixed[1]) + step} {mixed[2]}/{mixed[3]}")
                push(f"{mixed[1]} {int(mixed[2]) + step}/{mixed[3]}")
            else:
                break

    assert len(out) == 4, ("could not build four options", correct, wrongs, filler)
    return out, 0


BANK = []
add = BANK.append

# ─────────────────────────────────────────────────────────────────────────
# 1. Understanding Fractions
# ─────────────────────────────────────────────────────────────────────────
T, L = "fractions-basics", "Understanding Fractions"

for shaded, total in [(3, 8), (2, 5), (5, 9), (4, 7), (1, 6), (5, 8), (3, 10), (7, 12)]:
    bar = "■" * shaded + "□" * (total - shaded)
    opts, a = pick4(fs(shaded, total),
                    [fs(total - shaded, total),      # counted the empty parts
                     fs(shaded, total - shaded),     # part-to-part, not part-to-whole
                     fs(total, shaded)],             # upside down
                    [fs(shaded + 1, total)])
    add(q(T, L, "What fraction of the strip below is shaded?", opts, a,
          f"{shaded} parts are shaded out of {total} equal parts in all, so the fraction is {fs(shaded, total)}.",
          "easy", visual=bar))

for n, d in [(3, 7), (5, 11), (2, 9), (8, 15), (4, 13), (7, 20)]:
    opts, a = pick4(str(d), [str(n), str(n + d), str(d - n)], [str(d + 1)])
    add(q(T, L, f"In the fraction {fs(n, d)}, what is the denominator?", opts, a,
          f"The denominator is the number below the line. It tells you the whole was cut into {d} equal parts.",
          "easy"))

for n, d in [(4, 9), (6, 13), (3, 8)]:
    opts, a = pick4(str(n), [str(d), str(d - n), str(n + d)], [str(n + 2)])
    add(q(T, L, f"In the fraction {fs(n, d)}, what is the numerator?", opts, a,
          f"The numerator is the number above the line. It tells you how many of the {d} parts are taken.",
          "easy"))

for n, d in [(5, 8), (2, 3), (7, 10), (4, 9)]:
    add(q(T, L, f"What does the fraction {fs(n, d)} mean?",
          [f"{n} parts out of {d} equal parts",
           f"{d} parts out of {n} equal parts",
           f"{n} parts added to {d} parts",
           f"{n} wholes and {d} parts"], 0,
          f"{fs(n, d)} means the whole was divided into {d} equal parts and {n} of them were taken.",
          "easy"))

for total, eaten, thing, who in [(8, 3, "slices of pizza", "Riya"), (12, 5, "chapatis", "Arjun"),
                                 (10, 7, "laddus", "Meera"), (6, 1, "samosas", "Kabir")]:
    opts, a = pick4(fs(eaten, total),
                    [fs(total - eaten, total), fs(eaten, total - eaten), fs(total, eaten)],
                    [fs(eaten + 1, total)])
    add(q(T, L, f"A plate holds {total} equal {thing}. {who} eats {eaten} of them. "
                f"What fraction of the plate did {who} eat?", opts, a,
          f"{who} ate {eaten} out of {total}, which is {fs(eaten, total)}.", "easy"))

for n, d in [(3, 4), (9, 5), (7, 7), (2, 11)]:
    kind = "proper" if n < d else ("improper" if n > d else "equal to 1")
    if n < d:
        right, hint = "A proper fraction", "The numerator is smaller than the denominator, so it is a proper fraction."
    elif n > d:
        right, hint = "An improper fraction", "The numerator is larger than the denominator, so it is an improper fraction."
    else:
        right, hint = "A fraction equal to 1", "The numerator and denominator are the same, so the fraction equals 1."
    add(q(T, L, f"What kind of fraction is {fs(n, d)}?",
          ["A proper fraction", "An improper fraction", "A fraction equal to 1", "A mixed fraction"],
          ["A proper fraction", "An improper fraction", "A fraction equal to 1"].index(right),
          hint, "easy" if kind != "equal to 1" else "medium"))

for whole, d in [(20, 4), (24, 3), (30, 5), (18, 6), (36, 4), (28, 7)]:
    part = whole // d
    opts, a = pick4(str(part), [str(whole - d), str(whole * d), str(d)], [str(part + 1)])
    add(q(T, L, f"What is {fs(1, d)} of {whole}?", opts, a,
          f"One-{'half' if d == 2 else 'third' if d == 3 else f'{d}th'} of {whole} means {whole} ÷ {d} = {part}.",
          "medium"))

for whole, n, d in [(20, 3, 4), (24, 2, 3), (30, 3, 5), (18, 5, 6), (35, 3, 7)]:
    part = whole * n // d
    opts, a = pick4(str(part), [str(whole // d), str(whole - n), str(whole * n // (d + 1) or 1)],
                    [str(part + d)])
    add(q(T, L, f"What is {fs(n, d)} of {whole}?", opts, a,
          f"First find {fs(1, d)} of {whole}, which is {whole // d}. Then take {n} of those: {whole // d} × {n} = {part}.",
          "medium"))

for d in [4, 8, 5, 10]:
    add(q(T, L, f"A number line from 0 to 1 is divided into {d} equal parts. "
                f"Which fraction sits at the very first mark after 0?",
          [fs(1, d), fs(d, 1), fs(1, d - 1), fs(2, d)], 0,
          f"Each step is {fs(1, d)} of the way, so the first mark after 0 is {fs(1, d)}.",
          "medium"))

# Working backwards from the part to the whole. Harder than "find the part",
# because the child has to undo the operation rather than perform it.
for n, d, part in [(3, 4, 18), (2, 3, 14), (4, 5, 24), (2, 7, 10), (5, 6, 25)]:
    whole = part * d // n
    opts, a = pick4(str(whole), [str(part * n // d), str(part + d), str(part * d)],
                    [str(whole + d), str(whole - n)])
    add(q(T, L, f"{fs(n, d)} of a number is {part}. What is the number?", opts, a,
          f"If {n} parts make {part}, then 1 part is {part} ÷ {n} = {part // n}. "
          f"The whole is {d} parts: {part // n} × {d} = {whole}.", "hard"))

# Both halves of the sentence are carried in the data. The attribute has to
# suit the noun — a stray template once produced "30 students … are red" — and
# so does its negative: deriving "how many do NOT?" from an attribute reading
# "are ripe" gives "If 3/7 of them are ripe, how many do NOT?", which is not
# English. An audit of the bank found four of these.
for total, n, d, thing, attr, negative in [
        (30, 2, 5, "students in a class", "wear spectacles", "do not wear spectacles"),
        (48, 3, 8, "books on a shelf", "are storybooks", "are not storybooks"),
        (24, 5, 6, "chairs in a hall", "are occupied", "are empty"),
        (35, 3, 7, "mangoes in a basket", "are ripe", "are not ripe")]:
    part = total * n // d
    rest = total - part
    opts, a = pick4(str(rest), [str(part), str(total - d), str(total - n)],
                    [str(rest + 1), str(rest - 1)])
    add(q(T, L, f"There are {total} {thing}. If {fs(n, d)} of them {attr}, how many {negative}?",
          opts, a,
          f"{fs(n, d)} of {total} is {part}, so the rest is {total} − {part} = {rest}.", "hard"))

# ─────────────────────────────────────────────────────────────────────────
# 2. Mixed & Improper Fractions
# ─────────────────────────────────────────────────────────────────────────
T, L = "mixed-fractions", "Mixed & Improper Fractions"

IMPROPER = [(7, 2), (11, 3), (9, 4), (17, 5), (13, 6), (23, 7), (19, 8), (15, 4),
            (29, 9), (22, 5), (31, 6), (26, 3)]

for n, d in IMPROPER:
    w, r = divmod(n, d)
    opts, a = pick4(f"{w} {fs(r, d)}",
                    [f"{r} {fs(w, d)}",            # quotient and remainder swapped
                     f"{w} {fs(d, r)}" if r else f"{w} {fs(1, d)}",
                     f"{w + 1} {fs(r, d)}"],
                    [f"{w} {fs(r + 1, d)}"])
    add(q(T, L, f"Write {fs(n, d)} as a mixed number.", opts, a,
          f"{n} ÷ {d} gives {w} with {r} left over, so {fs(n, d)} = {w} {fs(r, d)}.",
          "medium"))

MIXED = [(2, 1, 3), (3, 2, 5), (1, 3, 4), (4, 1, 2), (2, 3, 7), (5, 2, 3),
         (3, 4, 9), (6, 1, 5), (2, 5, 8), (4, 3, 10), (7, 2, 3), (3, 5, 6)]

for w, n, d in MIXED:
    imp = w * d + n
    opts, a = pick4(fs(imp, d),
                    [fs(w + n, d),                 # added instead of multiplying
                     fs(w * d, d),                 # forgot the numerator
                     fs(w * n + d, d)],
                    [fs(imp + 1, d)])
    add(q(T, L, f"Write {w} {fs(n, d)} as an improper fraction.", opts, a,
          f"Multiply the whole number by the denominator and add the numerator: {w} × {d} + {n} = {imp}, so the answer is {fs(imp, d)}.",
          "medium"))

for n, d in [(5, 3), (8, 8), (2, 9), (11, 4)]:
    if n > d:
        right = "Improper — the numerator is bigger"
    elif n == d:
        right = "It equals a whole number"
    else:
        right = "Proper — the numerator is smaller"
    add(q(T, L, f"Is {fs(n, d)} a proper fraction, an improper fraction, or a whole number?",
          ["Proper — the numerator is smaller", "Improper — the numerator is bigger",
           "It equals a whole number", "It is a mixed number"],
          ["Proper — the numerator is smaller", "Improper — the numerator is bigger",
           "It equals a whole number"].index(right),
          f"Compare {n} with {d}. " + ("The numerator is larger, so the fraction is improper."
                                        if n > d else "They are equal, so the fraction is a whole number."
                                        if n == d else "The numerator is smaller, so the fraction is proper."),
          "easy"))

for w, n, d in [(2, 1, 4), (3, 2, 3), (1, 5, 6), (4, 3, 8)]:
    imp = w * d + n
    opts, a = pick4(fs(imp, d), [fs(w * d, d), fs(w + n, d), fs(imp, d + 1)], [])
    add(q(T, L, f"Which of these is equal to {w} {fs(n, d)}?", opts, a,
          f"{w} {fs(n, d)} means {w} wholes plus {fs(n, d)}. Each whole is {fs(d, d)}, so altogether it is {fs(imp, d)}.",
          "medium"))

for n, d in [(25, 4), (33, 5), (41, 6), (37, 8)]:
    w, r = divmod(n, d)
    opts, a = pick4(f"{w} and {w + 1}",
                    [f"{w - 1} and {w}", f"{w + 1} and {w + 2}", f"{d} and {d + 1}"],
                    [f"{w + 2} and {w + 3}"])
    add(q(T, L, f"Between which two whole numbers does {fs(n, d)} lie?", opts, a,
          f"{fs(n, d)} = {w} {fs(r, d)}, which is a little more than {w} but less than {w + 1}.",
          "hard"))

for w, n, d in [(3, 3, 4), (2, 5, 6), (5, 2, 3), (4, 7, 8)]:
    imp = w * d + n
    opts, a = pick4(str(imp), [str(w * d), str(w + n), str(imp + d)], [str(imp - 1)])
    add(q(T, L, f"A recipe needs {w} {fs(n, d)} cups of flour. The only scoop in the kitchen holds "
                f"{fs(1, d)} of a cup. How many scoops are needed?", opts, a,
          f"{w} {fs(n, d)} = {fs(imp, d)}, and each scoop is {fs(1, d)} cup, so {imp} scoops are needed.",
          "hard"))

# ─────────────────────────────────────────────────────────────────────────
# 3. Equivalent Fractions & Simplest Form
# ─────────────────────────────────────────────────────────────────────────
T, L = "fraction-simplification", "Equivalent Fractions & Simplest Form"

TO_SIMPLIFY = [(4, 8), (6, 9), (10, 15), (12, 16), (9, 12), (14, 21), (8, 20),
               (15, 25), (18, 24), (16, 40), (21, 28), (24, 36), (27, 45), (30, 42)]

for n, d in TO_SIMPLIFY:
    g = gcd(n, d)
    f = Fraction(n, d)
    opts, a = pick4(frac(f),
                    [fs(n - g, d - g),             # subtracted instead of divided
                     fs(n // g, d),                # divided the numerator only
                     fs(n, d // g)],               # divided the denominator only
                    [fs(f.numerator + 1, f.denominator)])
    add(q(T, L, f"Write {fs(n, d)} in its simplest form.", opts, a,
          f"The highest common factor of {n} and {d} is {g}. Divide both by {g}: {fs(n, d)} = {frac(f)}.",
          "easy" if g >= 4 or d <= 16 else "medium"))

for n, d, k in [(2, 3, 4), (3, 4, 3), (5, 6, 2), (1, 5, 6), (3, 8, 5), (4, 7, 3), (2, 9, 5), (5, 12, 2)]:
    opts, a = pick4(str(n * k),
                    [str(n + k),                       # added the scale factor
                     str(n + (d * k - d)),             # added the denominator's growth
                     str(n * d)],
                    [str(n * k + 1), str(n * k - 1)])
    add(q(T, L, f"Fill in the box: {fs(n, d)} = □/{d * k}", opts, a,
          f"The denominator was multiplied by {k}, so the numerator must be multiplied by {k} too: {n} × {k} = {n * k}.",
          "medium"))

for n, d in [(3, 7), (4, 6), (5, 9), (6, 8), (7, 11), (10, 25)]:
    simplest = gcd(n, d) == 1
    add(q(T, L, f"Is {fs(n, d)} already in its simplest form?",
          ["Yes — the only common factor of the two numbers is 1",
           f"No — both can be divided by {gcd(n, d) if not simplest else 2}",
           "No — every fraction can be simplified further",
           "Yes — because the numerator is smaller than the denominator"],
          0 if simplest else 1,
          (f"{n} and {d} share no factor except 1, so it is already in simplest form."
           if simplest else
           f"Both {n} and {d} can be divided by {gcd(n, d)}, giving {frac(Fraction(n, d))}."),
          "medium"))

for a_, b_ in [((1, 2), (3, 6)), ((2, 3), (8, 12)), ((3, 5), (9, 15)), ((1, 4), (5, 20)),
               ((2, 7), (6, 21)), ((3, 4), (15, 20))]:
    (n1, d1), (n2, d2) = a_, b_
    add(q(T, L, f"Are {fs(n1, d1)} and {fs(n2, d2)} equivalent fractions?",
          [f"Yes — both simplify to {frac(Fraction(n1, d1))}",
           "No — the numerators are different",
           "No — the denominators are different",
           "Yes — but only if both are multiplied by 2"], 0,
          f"{fs(n2, d2)} divided top and bottom by {gcd(n2, d2)} gives {frac(Fraction(n2, d2))}, the same as {fs(n1, d1)}.",
          "medium"))

for n, d in [(48, 72), (36, 60), (45, 75), (56, 84), (54, 90), (42, 98)]:
    g = gcd(n, d)
    f = Fraction(n, d)
    # Halving once and stopping is the mistake this question is for, so that
    # option has to survive even though it is the same number as the answer —
    # here it is fair, because the question does say "lowest terms".
    opts, a = pick4(frac(f),
                    [fs(n - g, d - g),             # subtracted instead of divided
                     fs(n // g, d),                # divided the numerator only
                     fs(n, d // g)],               # divided the denominator only
                    [fs(f.numerator, f.denominator + 1)],
                    also=[fs(n // 2, d // 2)] if n % 2 == 0 and d % 2 == 0 else [])
    add(q(T, L, f"Reduce {fs(n, d)} to its lowest terms.", opts, a,
          f"The HCF of {n} and {d} is {g}. Dividing both by {g} gives {frac(f)}, which cannot be reduced further.",
          "hard"))

# ─────────────────────────────────────────────────────────────────────────
# 4. Comparing & Ordering Fractions
# ─────────────────────────────────────────────────────────────────────────
T, L = "comparing-fractions", "Comparing & Ordering Fractions"

for n1, n2, d in [(3, 5, 8), (2, 7, 9), (4, 1, 5), (5, 3, 7), (7, 4, 11), (2, 5, 6)]:
    big, small = (n1, n2) if n1 > n2 else (n2, n1)
    add(q(T, L, f"Which is greater, {fs(n1, d)} or {fs(n2, d)}?",
          [fs(big, d), fs(small, d), "They are equal", "It cannot be decided"], 0,
          f"The denominators are the same, so the fraction with the bigger numerator is greater: {big} > {small}.",
          "easy"))

for n, d1, d2 in [(3, 5, 8), (2, 7, 9), (5, 6, 11), (1, 3, 4), (4, 9, 7), (3, 10, 7)]:
    big_d, small_d = (d1, d2) if d1 > d2 else (d2, d1)
    add(q(T, L, f"Which is greater, {fs(n, d1)} or {fs(n, d2)}?",
          [fs(n, small_d), fs(n, big_d), "They are equal", "The one with the bigger denominator is always greater"], 0,
          f"The numerators are the same. Cutting a whole into {small_d} parts gives bigger pieces than cutting it into {big_d}, so {fs(n, small_d)} is greater.",
          "medium"))

UNLIKE = [((2, 3), (3, 5)), ((3, 4), (5, 7)), ((4, 9), (3, 7)), ((5, 8), (7, 11)),
          ((2, 5), (3, 8)), ((7, 12), (5, 9)), ((3, 10), (2, 7)), ((5, 6), (8, 9))]

for (n1, d1), (n2, d2) in UNLIKE:
    f1, f2 = Fraction(n1, d1), Fraction(n2, d2)
    big = fs(n1, d1) if f1 > f2 else fs(n2, d2)
    small = fs(n2, d2) if f1 > f2 else fs(n1, d1)
    add(q(T, L, f"Which is greater, {fs(n1, d1)} or {fs(n2, d2)}?",
          [big, small, "They are equal", "The one with the smaller denominator"], 0,
          f"Cross multiply: {n1} × {d2} = {n1 * d2} and {n2} × {d1} = {n2 * d1}. "
          f"The larger product sits above the greater fraction, so {big} is greater.",
          "medium"))

for n, d in [(3, 8), (5, 9), (4, 7), (2, 5), (7, 12), (6, 11)]:
    f = Fraction(n, d)
    half = Fraction(1, 2)
    rel = "greater than" if f > half else ("less than" if f < half else "equal to")
    add(q(T, L, f"Is {fs(n, d)} greater than, less than, or equal to 1/2?",
          ["Greater than 1/2", "Less than 1/2", "Equal to 1/2", "It cannot be compared with 1/2"],
          ["Greater than 1/2", "Less than 1/2", "Equal to 1/2"].index(rel.capitalize().replace("Greater than", "Greater than 1/2").replace("Less than", "Less than 1/2").replace("Equal to", "Equal to 1/2")),
          f"Half of {d} is {d / 2:g}. The numerator {n} is {'more' if f > half else 'less'} than that, so {fs(n, d)} is {rel} 1/2.",
          "medium"))

ORDER = [[(1, 2), (1, 3), (1, 4)], [(2, 3), (3, 4), (1, 2)], [(3, 5), (2, 5), (4, 5)],
         [(5, 6), (2, 3), (3, 4)], [(1, 5), (3, 10), (1, 4)], [(7, 8), (5, 6), (11, 12)]]

for group in ORDER:
    ordered = sorted(group, key=lambda t: Fraction(*t))
    asc = ", ".join(fs(*t) for t in ordered)
    desc = ", ".join(fs(*t) for t in reversed(ordered))
    # Each wrong ordering is a rule a child actually applies — biggest first,
    # by numerator, by denominator. Any that happens to coincide with the true
    # order is dropped, and the remaining permutations fill the gap, so the four
    # options are always four different arrangements.
    cands = [desc,
             ", ".join(fs(*t) for t in group),                        # left as given
             ", ".join(fs(*t) for t in sorted(group, key=lambda t: t[0])),   # by numerator
             ", ".join(fs(*t) for t in sorted(group, key=lambda t: t[1]))]   # by denominator
    cands += [", ".join(fs(*t) for t in perm) for perm in permutations(group)]
    opts, a = pick4(asc, cands, [])
    add(q(T, L, "Arrange these fractions from smallest to largest: "
                + ", ".join(fs(*t) for t in group), opts, a,
          f"Written with a common denominator they line up as {asc}.", "hard"))

for (n1, d1), (n2, d2) in [((7, 10), (2, 3)), ((5, 12), (3, 8)), ((9, 14), (4, 7)), ((11, 15), (7, 10))]:
    f1, f2 = Fraction(n1, d1), Fraction(n2, d2)
    big = fs(n1, d1) if f1 > f2 else fs(n2, d2)
    small = fs(n2, d2) if f1 > f2 else fs(n1, d1)
    lcm = d1 * d2 // gcd(d1, d2)
    add(q(T, L, f"Which of these two fractions is smaller, {fs(n1, d1)} or {fs(n2, d2)}?",
          [small, big, "They are the same size", "The one with the smaller numerator is always smaller"], 0,
          f"Rewrite both with denominator {lcm}: {fs(n1 * (lcm // d1), lcm)} and {fs(n2 * (lcm // d2), lcm)}. "
          f"So {small} is smaller.", "hard"))

# ─────────────────────────────────────────────────────────────────────────
# 5. Adding Fractions
# ─────────────────────────────────────────────────────────────────────────
T, L = "adding-fractions", "Adding Fractions"

LIKE_ADD = [(1, 3, 5), (2, 3, 7), (3, 4, 9), (2, 5, 11), (4, 3, 8), (5, 6, 13),
            (1, 1, 4), (3, 2, 10), (2, 4, 9)]

for n1, n2, d in LIKE_ADD:
    total = Fraction(n1 + n2, d)
    asks = fs(n1 + n2, d) != frac(total)          # the sum does not land in lowest terms
    opts, a = pick4(frac(total),
                    [fs(n1 + n2, d + d),           # added the denominators too
                     fs(n1 * n2, d)],              # multiplied the numerators
                    [fs(n1 + n2 + 1, d)])
    add(q(T, L, f"Add: {fs(n1, d)} + {fs(n2, d)}"
                + (" Give your answer in its simplest form." if asks else ""), opts, a,
          f"The denominators are already the same, so add only the numerators: {n1} + {n2} = {n1 + n2}, giving {fs(n1 + n2, d)}"
          + (f", which simplifies to {frac(total)}." if fs(n1 + n2, d) != frac(total) else "."),
          "easy"))

UNLIKE_ADD = [((1, 2), (1, 3)), ((2, 3), (1, 4)), ((1, 5), (2, 3)), ((3, 4), (1, 6)),
              ((2, 5), (3, 10)), ((1, 3), (3, 8)), ((5, 6), (1, 4)), ((2, 7), (1, 2)),
              ((3, 5), (1, 4)), ((1, 6), (2, 9))]

for (n1, d1), (n2, d2) in UNLIKE_ADD:
    total = Fraction(n1, d1) + Fraction(n2, d2)
    lcm = d1 * d2 // gcd(d1, d2)
    opts, a = pick4(frac(total),
                    [fs(n1 + n2, d1 + d2),         # the classic: add across
                     fs(n1 + n2, lcm),             # right denominator, unconverted tops
                     fs(n1 + n2, max(d1, d2))],
                    [frac(total + Fraction(1, lcm))])
    add(q(T, L, f"Add: {fs(n1, d1)} + {fs(n2, d2)}", opts, a,
          f"The lowest common denominator is {lcm}. Rewrite as {fs(n1 * (lcm // d1), lcm)} + {fs(n2 * (lcm // d2), lcm)} "
          f"= {fs(n1 * (lcm // d1) + n2 * (lcm // d2), lcm)}"
          + (f", which simplifies to {frac(total)}." if fs(n1 * (lcm // d1) + n2 * (lcm // d2), lcm) != frac(total) else "."),
          "medium"))

for (w1, n1, d1), (w2, n2, d2) in [((1, 1, 2), (2, 1, 4)), ((2, 1, 3), (1, 1, 6)),
                                   ((3, 2, 5), (1, 1, 10)), ((1, 3, 4), (2, 1, 8))]:
    total = Fraction(w1 * d1 + n1, d1) + Fraction(w2 * d2 + n2, d2)
    w, r = divmod(total.numerator, total.denominator)
    right = f"{w} {fs(r, total.denominator)}" if r else str(w)
    add(q(T, L, f"Add: {w1} {fs(n1, d1)} + {w2} {fs(n2, d2)}",
          [right, f"{w1 + w2} {fs(n1 + n2, d1 + d2)}", f"{w1 + w2} {fs(n1 + n2, max(d1, d2))}",
           f"{w + 1} {fs(r, total.denominator)}" if r else f"{w + 1}"], 0,
          f"Add the whole numbers and the fractions separately: {w1} + {w2} = {w1 + w2}, and "
          f"{fs(n1, d1)} + {fs(n2, d2)} adds on to give {right}.", "hard"))

for who, a1, b1, a2, b2, thing in [("Nila", 1, 4, 2, 4, "of a chocolate bar"),
                                   ("Vikram", 1, 3, 1, 6, "of a jug of juice"),
                                   ("Sana", 2, 5, 1, 10, "of a ribbon"),
                                   ("Rohan", 3, 8, 1, 4, "of a cake")]:
    total = Fraction(a1, b1) + Fraction(a2, b2)
    lcm = b1 * b2 // gcd(b1, b2)
    opts, a = pick4(frac(total), [fs(a1 + a2, b1 + b2), fs(a1 + a2, lcm), frac(total * 2)],
                    [frac(total + Fraction(1, lcm))])
    add(q(T, L, f"{who} used {fs(a1, b1)} {thing} in the morning and {fs(a2, b2)} more in the evening. "
                f"How much was used altogether?", opts, a,
          f"{fs(a1, b1)} + {fs(a2, b2)} = {frac(total)} once both are written over {lcm}.", "medium"))

for (n1, d1), (n2, d2), (n3, d3) in [((1, 2), (1, 4), (1, 8)), ((1, 3), (1, 6), (1, 2)),
                                     ((2, 5), (1, 10), (1, 2)), ((1, 4), (2, 3), (1, 12))]:
    total = Fraction(n1, d1) + Fraction(n2, d2) + Fraction(n3, d3)
    right = frac(total) if total.denominator != 1 else str(total.numerator)
    add(q(T, L, f"Add: {fs(n1, d1)} + {fs(n2, d2)} + {fs(n3, d3)}",
          [right, fs(n1 + n2 + n3, d1 + d2 + d3), fs(n1 + n2 + n3, max(d1, d2, d3)),
           frac(total + Fraction(1, max(d1, d2, d3)))], 0,
          f"Put all three over a common denominator and add the numerators. The total is {right}.",
          "hard"))

# ─────────────────────────────────────────────────────────────────────────
# 6. Subtracting Fractions
# ─────────────────────────────────────────────────────────────────────────
T, L = "subtracting-fractions", "Subtracting Fractions"

LIKE_SUB = [(4, 1, 5), (5, 2, 7), (7, 3, 9), (8, 3, 11), (5, 1, 6), (9, 4, 10),
            (3, 1, 4), (7, 5, 8), (11, 5, 12)]

for n1, n2, d in LIKE_SUB:
    diff = Fraction(n1 - n2, d)
    asks = fs(n1 - n2, d) != frac(diff)           # the answer does not land in lowest terms
    opts, a = pick4(frac(diff),
                    [fs(n1 - n2, d + d),           # subtracted the denominators too
                     fs(n1 + n2, d)],              # added instead of subtracting
                    [fs(n1 - n2 + 1, d)])
    add(q(T, L, f"Subtract: {fs(n1, d)} − {fs(n2, d)}"
                + (" Give your answer in its simplest form." if asks else ""), opts, a,
          f"The denominators match, so subtract only the numerators: {n1} − {n2} = {n1 - n2}, giving {fs(n1 - n2, d)}"
          + (f", which simplifies to {frac(diff)}." if fs(n1 - n2, d) != frac(diff) else "."),
          "easy"))

UNLIKE_SUB = [((1, 2), (1, 3)), ((3, 4), (1, 6)), ((2, 3), (1, 4)), ((5, 6), (1, 2)),
              ((4, 5), (1, 10)), ((7, 8), (1, 4)), ((2, 3), (1, 6)), ((3, 5), (1, 4)),
              ((5, 8), (1, 3)), ((7, 10), (2, 5))]

for (n1, d1), (n2, d2) in UNLIKE_SUB:
    diff = Fraction(n1, d1) - Fraction(n2, d2)
    lcm = d1 * d2 // gcd(d1, d2)
    across = cross_sub(n1, d1, n2, d2)          # subtracted straight across
    opts, a = pick4(frac(diff),
                    [x for x in [across,
                                 fs(n1 - n2, lcm),
                                 fs(n1 - n2, max(d1, d2))] if x],
                    [frac(diff + Fraction(1, lcm))])
    add(q(T, L, f"Subtract: {fs(n1, d1)} − {fs(n2, d2)}", opts, a,
          f"The lowest common denominator is {lcm}. Rewrite as {fs(n1 * (lcm // d1), lcm)} − {fs(n2 * (lcm // d2), lcm)} "
          f"= {fs(n1 * (lcm // d1) - n2 * (lcm // d2), lcm)}"
          + (f", which simplifies to {frac(diff)}." if fs(n1 * (lcm // d1) - n2 * (lcm // d2), lcm) != frac(diff) else "."),
          "medium"))

for n, d in [(1, 4), (2, 5), (3, 8), (1, 3), (5, 6)]:
    diff = 1 - Fraction(n, d)
    opts, a = pick4(frac(diff), [fs(d - n, d - 1), fs(n, d), fs(d + n, d)], [fs(d - n - 1, d)])
    add(q(T, L, f"Subtract: 1 − {fs(n, d)}", opts, a,
          f"Write 1 as {fs(d, d)}. Then {fs(d, d)} − {fs(n, d)} = {frac(diff)}.", "medium"))

for w, (n1, d1), (n2, d2) in [(2, (1, 4), (3, 4)), (3, (1, 3), (2, 3)), (4, (1, 5), (3, 5)),
                              (2, (1, 6), (5, 6))]:
    diff = Fraction(w * d1 + n1, d1) - Fraction(n2, d2)
    wq, r = divmod(diff.numerator, diff.denominator)
    right = f"{wq} {fs(r, diff.denominator)}" if r else str(wq)
    opts, a = pick4(right,
                    [f"{w} {fs(abs(n1 - n2), d1)}",    # took the difference, forgot to borrow
                     f"{w - 1} {fs(n1 + n2, d1)}",     # borrowed but added the numerators
                     f"{w} {fs(n1, d1)}"],             # left it unchanged
                    [f"{w - 1} {fs(abs(n1 - n2), d1)}", f"{w} {fs(n2, d2)}"])
    add(q(T, L, f"Subtract: {w} {fs(n1, d1)} − {fs(n2, d2)}", opts, a,
          f"{fs(n1, d1)} is smaller than {fs(n2, d2)}, so borrow 1 from the {w}: "
          f"{w} {fs(n1, d1)} = {w - 1} {fs(d1 + n1, d1)}. Now subtract to get {right}.", "hard"))

# Mixed minus mixed, where the fraction part of the first is the smaller one and
# a whole has to be broken up. This is the step children most often skip.
for (w1, n1, d1), (w2, n2, d2) in [((4, 1, 3), (1, 2, 3)), ((5, 1, 4), (2, 3, 4)),
                                   ((3, 1, 5), (1, 3, 5)), ((6, 1, 6), (2, 5, 6)),
                                   ((4, 1, 2), (1, 3, 4))]:
    diff = Fraction(w1 * d1 + n1, d1) - Fraction(w2 * d2 + n2, d2)
    wq, r = divmod(diff.numerator, diff.denominator)
    right = f"{wq} {fs(r, diff.denominator)}" if r else str(wq)
    opts, a = pick4(right,
                    [f"{w1 - w2} {fs(abs(n1 - n2), max(d1, d2))}",   # took the gap, no borrow
                     f"{w1 - w2} {fs(n1 + n2, max(d1, d2))}",
                     f"{w1 - w2} {fs(n2, d2)}"],                      # kept the second fraction
                    [f"{wq + 1} {fs(r, diff.denominator)}" if r else str(wq + 1)])
    add(q(T, L, f"Subtract: {w1} {fs(n1, d1)} − {w2} {fs(n2, d2)}", opts, a,
          f"{fs(n1, d1)} is smaller than {fs(n2, d2)}, so borrow one whole from the {w1}. "
          f"Working it through gives {right}.", "hard"))

for who, (n1, d1), (n2, d2), thing in [("Ishaan", (3, 4), (1, 2), "of a bottle of milk"),
                                       ("Tara", (5, 6), (1, 3), "of a roll of tape"),
                                       ("Dev", (7, 8), (1, 4), "of a bag of rice"),
                                       ("Amara", (2, 3), (1, 6), "of a length of rope")]:
    diff = Fraction(n1, d1) - Fraction(n2, d2)
    lcm = d1 * d2 // gcd(d1, d2)
    across = cross_sub(n1, d1, n2, d2)
    opts, a = pick4(frac(diff),
                    [x for x in [across, fs(n1 - n2, lcm),
                                 frac(Fraction(n1, d1) + Fraction(n2, d2))] if x],
                    [frac(diff + Fraction(1, lcm))])
    add(q(T, L, f"{who} had {fs(n1, d1)} {thing} and used {fs(n2, d2)}. How much is left?", opts, a,
          f"{fs(n1, d1)} − {fs(n2, d2)} = {frac(diff)} once both are written over {lcm}.", "medium"))

# ─────────────────────────────────────────────────────────────────────────
from collections import Counter

by_topic = Counter(x["topic"] for x in BANK)
by_diff = Counter(x["difficulty"] for x in BANK)
print(f"{len(BANK)} questions across {len(by_topic)} topics")
for t, n in by_topic.items():
    d = Counter(x["difficulty"] for x in BANK if x["topic"] == t)
    print(f"   {n:3}  E{d['easy']:3} M{d['medium']:3} H{d['hard']:3}   {t}")
print(f"\noverall  easy {by_diff['easy']}  medium {by_diff['medium']}  hard {by_diff['hard']}")

with open(OUT, "w") as fh:
    json.dump(BANK, fh, indent=2)
    fh.write("\n")
print(f"\nwrote {OUT}")
