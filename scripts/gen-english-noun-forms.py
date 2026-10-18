#!/usr/bin/env python3
"""
Forms of Nouns — number, gender and the possessive.

    python3 scripts/gen-english-noun-forms.py

The existing Nouns topic covers KINDS of noun: proper, common, collective,
abstract, material. That is a different question from FORMS, which is what a
noun does when there is more than one of it, when it belongs to somebody, or
when the language marks it male or female. Plurals and possessives turn up
scattered through the bank; gathered here they can be practised on purpose.
"""

import json

OUT = "scripts/banks/english-noun-forms.json"
CH = "Grammar Foundations"
T, L = "noun-forms", "Forms of Nouns"

BANK = []


def q(question, options, answer, hint, difficulty):
    opts = [str(o).strip() for o in options]
    assert len(opts) == 4, (question, opts)
    assert len(set(o.lower() for o in opts)) == 4, ("duplicate options", question, opts)
    assert 0 <= answer < 4, question
    assert hint, ("every question needs a hint", question)
    BANK.append({
        "grade": 6, "subject": "english", "chapter": CH,
        "topic": T, "topicLabel": L, "subtopic": None,
        "question": question, "options": opts, "answer": answer,
        "hint": hint, "difficulty": difficulty, "status": "published",
    })


# ── Number: the regular rules ────────────────────────────────────────────
REGULAR = [
    ("book", "books", ["bookes", "book's", "bookies"], "Most nouns simply add -s.", "easy"),
    ("box", "boxes", ["boxs", "boxies", "box's"],
     "Nouns ending in -x, -s, -sh, -ch add -es, because -s alone would be unsayable.", "easy"),
    ("church", "churches", ["churchs", "churchies", "church's"],
     "Ending in -ch, so it takes -es.", "easy"),
    ("baby", "babies", ["babys", "babyes", "baby's"],
     "A consonant before -y: change the y to i and add -es.", "easy"),
    ("day", "days", ["daies", "dayes", "day's"],
     "A vowel before -y keeps the y and just adds -s. Compare baby → babies.", "medium"),
    ("knife", "knives", ["knifes", "knifies", "knife's"],
     "Many nouns ending -f or -fe change to -ves.", "medium"),
    ("roof", "roofs", ["rooves", "roofes", "roofies"],
     "Not every -f becomes -ves. Roof, chief and proof simply take -s.", "hard"),
    ("potato", "potatoes", ["potatos", "potatoies", "potato's"],
     "Potato, tomato, hero and echo take -es.", "medium"),
    ("photo", "photos", ["photoes", "photoies", "photo's"],
     "Shortened words like photo and piano just add -s, even though they end in -o.", "hard"),
]
for word, right, wrongs, hint, diff in REGULAR:
    q(f"What is the plural of “{word}”?", [right, *wrongs], 0, hint, diff)

# ── Number: the irregulars ───────────────────────────────────────────────
IRREGULAR = [
    ("child", "children", ["childs", "childes", "childrens"],
     "An old plural that never took -s.", "easy"),
    ("mouse", "mice", ["mouses", "mices", "mouse's"], "The vowel changes instead.", "easy"),
    ("tooth", "teeth", ["tooths", "toothes", "teeths"], "Another vowel change.", "easy"),
    ("ox", "oxen", ["oxes", "oxs", "oxens"], "One of the very few -en plurals left.", "hard"),
    ("goose", "geese", ["gooses", "geeses", "goosen"], "Vowel change, like tooth → teeth.", "medium"),
    ("woman", "women", ["womans", "womens", "womanes"],
     "The spelling barely changes but the sound does.", "easy"),
]
for word, right, wrongs, hint, diff in IRREGULAR:
    q(f"What is the plural of “{word}”?", [right, *wrongs], 0, hint, diff)

q("Which of these nouns is the same in the singular and the plural?",
  ["sheep", "horse", "goat", "duck"], 0,
  "One sheep, ten sheep. Deer, fish and aircraft behave the same way.", "medium")

q("“The scissors ___ on the table.” Which verb is right?",
  ["are", "is", "was", "has"], 0,
  "Scissors, trousers and spectacles are always plural, even when you mean one pair.", "hard")

q("Which of these is already plural?",
  ["children", "child", "childhood", "childish"], 0,
  "Children is the plural of child. Childhood and childish are different words altogether.",
  "easy")

# ── Gender ───────────────────────────────────────────────────────────────
GENDER = [
    ("lion", "lioness", ["lionness", "lionette", "liongirl"], "easy"),
    ("king", "queen", ["kingess", "kinger", "kingette"], "easy"),
    ("nephew", "niece", ["nephewess", "nephewette", "nephewine"], "medium"),
    ("gander", "goose", ["ganderess", "gandette", "gooseman"], "hard"),
    ("bull", "cow", ["bulless", "bullette", "bullina"], "medium"),
    ("horse", "mare", ["horsess", "horsette", "horsina"], "medium"),
]
for masc, fem, wrongs, diff in GENDER:
    q(f"What is the feminine form of “{masc}”?", [fem, *wrongs], 0,
      f"The feminine of {masc} is {fem}. Not every pair is made by adding an ending — many are "
      "separate words.", diff)

q("Which of these nouns is common gender — it can mean either?",
  ["teacher", "actress", "widow", "bull"], 0,
  "A teacher may be anyone. Common gender nouns do not say which.", "medium")

q("Which noun is neuter?",
  ["table", "aunt", "hero", "mare"], 0,
  "Neuter nouns name things that are neither male nor female.", "easy")

# ── The possessive ───────────────────────────────────────────────────────
q("Which is correct?",
  ["the boy's book — one boy", "the boys book — one boy",
   "the boys' book — one boy", "the boy s book — one boy"], 0,
  "One owner: apostrophe then s.", "easy")

q("Which is correct for a book belonging to several boys?",
  ["the boys' book", "the boy's book", "the boys's book", "the boys book"], 0,
  "A plural already ending in -s takes the apostrophe after it.", "medium")

q("How do you write something belonging to the children?",
  ["the children's toys", "the childrens' toys", "the childrens toys", "the children toys"], 0,
  "Children is plural but does not end in -s, so it takes apostrophe-s like a singular.",
  "hard")

q("Which of these is NOT a possessive?",
  ["The bird sings sweetly.", "The bird's nest is empty.",
   "The birds' nests are empty.", "The owl's eyes are large."], 0,
  "Nothing belongs to anything in that sentence. It is simply a noun and a verb.", "medium")

q("“The dog wagged ___ tail.” Which word is right?",
  ["its", "it's", "its'", "of it"], 0,
  "Its is the possessive. It's always means it is — the one apostrophe that catches everybody.",
  "hard")

q("Which is the correct way to show that a hat belongs to James?",
  ["James's hat", "Jame's hat", "Jamess hat", "James hat"], 0,
  "A singular name keeps all its letters and adds apostrophe-s, even when it already ends in s.",
  "hard")

q("What does the possessive form of a noun show?",
  ["That something belongs to it", "That there is more than one of it",
   "That it is male or female", "That it is the subject of the sentence"], 0,
  "Number tells you how many, gender tells you which kind, and the possessive tells you what "
  "belongs to whom.", "easy")


# ═════════════════════════════════════════════════════════════════════════
from collections import Counter

with open(OUT, "w") as f:
    json.dump(BANK, f, indent=2, ensure_ascii=False)
    f.write("\n")

d = Counter(x["difficulty"] for x in BANK)
print(f"{len(BANK)} questions   E{d['easy']} M{d['medium']} H{d['hard']}")
print(f"wrote {OUT}")
