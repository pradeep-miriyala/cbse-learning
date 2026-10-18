#!/usr/bin/env python3
"""
Subject & Predicate, and Subject–Verb Agreement.

    python3 scripts/gen-english-sentence-grammar.py

Sentences are drawn from The Selfish Giant wherever they can be, so the grammar
is practised on language the child has just read rather than on invented
examples about cats and mats.
"""

import json

OUT = "scripts/banks/english-sentence-grammar.json"
CH = "Grammar Foundations"

BANK = []


def q(topic, label, question, options, answer, hint, difficulty):
    opts = [str(o).strip() for o in options]
    assert len(opts) == 4, (question, opts)
    assert len(set(o.lower() for o in opts)) == 4, ("duplicate options", question, opts)
    assert 0 <= answer < 4, question
    assert hint, ("every question needs a hint", question)
    BANK.append({
        "grade": 6, "subject": "english", "chapter": CH,
        "topic": topic, "topicLabel": label, "subtopic": None,
        "question": question, "options": opts, "answer": answer,
        "hint": hint, "difficulty": difficulty, "status": "published",
    })


# ═════════════════════════════════════════════════════════════════════════
# Subject & Predicate
# ═════════════════════════════════════════════════════════════════════════
T, L = "subject-predicate", "Subject & Predicate"

q(T, L, "What is the subject of a sentence?",
  ["The person or thing the sentence is about",
   "The action word in the sentence",
   "The describing word in the sentence",
   "The full stop at the end"], 0,
  "The subject is who or what the sentence is about. Ask “who?” or “what?” before the verb.",
  "easy")

q(T, L, "What is the predicate of a sentence?",
  ["Everything that tells you what the subject does or is",
   "The first word of the sentence",
   "Only the naming word",
   "The question mark or full stop"], 0,
  "The predicate is the rest of the sentence — the verb and everything that goes with it.",
  "easy")

q(T, L, "Every complete sentence must have which two parts?",
  ["A subject and a predicate", "A noun and an adjective",
   "A question and an answer", "A capital letter and a comma"], 0,
  "Without a subject you do not know who; without a predicate you do not know what happened.",
  "easy")

SPLITS = [
    ("The Giant came back.", "The Giant", "came back", "easy"),
    ("The children played in the garden.", "The children", "played in the garden", "easy"),
    ("The Snow covered the grass.", "The Snow", "covered the grass", "easy"),
    ("The little linnet sang outside his window.", "The little linnet",
     "sang outside his window", "medium"),
    ("The North Wind roared all day long.", "The North Wind", "roared all day long", "medium"),
    ("The twelve peach trees blossomed in the spring.", "The twelve peach trees",
     "blossomed in the spring", "medium"),
    ("A high wall stood all round the garden.", "A high wall",
     "stood all round the garden", "medium"),
    ("The frightened children ran away.", "The frightened children", "ran away", "easy"),
]

for sentence, subject, predicate, diff in SPLITS:
    others = [s for s, *_ in SPLITS if s != sentence]
    q(T, L, f"What is the SUBJECT of this sentence?\n\n“{sentence}”",
      [subject, predicate, sentence, "There is no subject"], 0,
      f"Ask who or what the sentence is about: {subject}. The rest tells you what they did.",
      diff)
    q(T, L, f"What is the PREDICATE of this sentence?\n\n“{sentence}”",
      [predicate, subject, sentence, "There is no predicate"], 0,
      f"The predicate is everything that says what the subject does — “{predicate}”.",
      diff)

q(T, L, "In “Under the tree sat a very small boy”, what is the subject?",
  ["a very small boy", "Under the tree", "sat", "Under the tree sat"], 0,
  "The sentence is turned around, but it is still about the boy. Ask who sat — the boy did.",
  "hard")

q(T, L, "Which of these is NOT a complete sentence?",
  ["Ran away through the hole in the wall", "The Giant knocked down the wall",
   "Spring came back to the garden", "The children climbed the trees"], 0,
  "It has a predicate but no subject — you are never told who ran. That makes it a fragment.",
  "hard")

q(T, L, "Which of these is NOT a complete sentence?",
  ["A high wall all round the garden", "The Hail rattled on the roof",
   "The frost painted the trees silver", "The boy could not reach the branches"], 0,
  "It names a thing but never says what it did or was. There is no predicate.", "hard")

q(T, L, "In “The Giant’s garden was very beautiful”, what is the predicate?",
  ["was very beautiful", "The Giant's garden", "The Giant", "very beautiful garden"], 0,
  "A predicate does not have to be an action. Here it tells you what the subject WAS.",
  "medium")

q(T, L, "A subject can be more than one word. Which is the full subject of "
        "“The tall grey wall hid the garden”?",
  ["The tall grey wall", "wall", "hid the garden", "The tall"], 0,
  "The full subject includes the words that describe it — all of “The tall grey wall”.",
  "medium")


# ═════════════════════════════════════════════════════════════════════════
# Subject–Verb Agreement
# ═════════════════════════════════════════════════════════════════════════
T, L = "subject-verb-agreement", "Subject–Verb Agreement"

q(T, L, "What does subject–verb agreement mean?",
  ["The verb must match the subject in number — singular or plural",
   "The subject must always come before the verb",
   "The verb must always end in -ing",
   "The subject and the verb must rhyme"], 0,
  "One child plays; two children play. The verb changes to match how many.", "easy")

q(T, L, "With a SINGULAR subject in the present tense, what usually happens to the verb?",
  ["It takes an -s: the boy plays", "It loses its -s: the boy play",
   "It never changes at all", "It always becomes were"], 0,
  "Oddly, it is the verb that takes the -s when the subject is singular: he plays, they play.",
  "medium")

PAIRS = [
    ("The Giant ___ in a great castle.", "lives", "live", "easy",
     "The Giant is one, so the verb takes an -s."),
    ("The children ___ in the garden every afternoon.", "play", "plays", "easy",
     "Children is plural, so the verb has no -s."),
    ("The linnet ___ outside his window.", "sings", "sing", "easy",
     "One linnet — singular subject, so sings."),
    ("The trees ___ themselves with blossoms.", "cover", "covers", "easy",
     "Trees is plural, so cover."),
    ("The North Wind ___ all day long.", "roars", "roar", "easy",
     "One wind — roars."),
    ("The flowers ___ their heads above the grass.", "lift", "lifts", "easy",
     "Flowers is plural — lift."),
    ("The little boy ___ too small to reach the branch.", "is", "are", "easy",
     "One boy — is."),
    ("The birds ___ singing again.", "are", "is", "easy",
     "Birds is plural — are."),
    ("Every child ___ welcome in the garden.", "is", "are", "medium",
     "Every makes it singular however many children there are — every child is."),
    ("Each of the trees ___ covered with frost.", "is", "are", "hard",
     "The subject is each, not trees. Each is singular, so is."),
    ("One of the boys ___ crying under the tree.", "is", "are", "hard",
     "The subject is one, not boys. One is singular."),
    ("Neither the Snow nor the Frost ___ willing to leave.", "was", "were", "hard",
     "With neither…nor, the verb agrees with the nearer subject — the Frost, which is singular."),
]

for sentence, right, wrong, diff, hint in PAIRS:
    q(T, L, f"Choose the correct verb.\n\n“{sentence}”", [right, wrong, "to " + right,
                                                          right + "ing"], 0, hint, diff)

q(T, L, "Which sentence is CORRECT?",
  ["The children were playing in the garden.", "The children was playing in the garden.",
   "The children is playing in the garden.", "The children has playing in the garden."], 0,
  "Children is plural, so it takes were.", "easy")

q(T, L, "Which sentence is CORRECT?",
  ["The Giant has a beautiful garden.", "The Giant have a beautiful garden.",
   "The Giant having a beautiful garden.", "The Giant are having beautiful garden."], 0,
  "One Giant — has. Have goes with plural subjects and with I and you.", "easy")

q(T, L, "Which sentence is WRONG?",
  ["The trees in the garden was bare.", "The trees in the garden were bare.",
   "The tree in the garden was bare.", "The trees were bare."], 0,
  "The subject is trees, which is plural, so it needs were. The words in the garden sit "
  "between them and are easy to be misled by.", "hard")

q(T, L, "“The sound of the children ___ lovely.” Which verb is right?",
  ["was", "were", "are", "have"], 0,
  "The subject is sound, not children. One sound — was. This is the trap of a phrase coming "
  "between subject and verb.", "hard")

q(T, L, "Why is “The list of words are long” wrong?",
  ["The subject is list, which is singular, so it needs is",
   "Words should come before list",
   "Long should be longer",
   "Nothing is wrong with it"], 0,
  "Of words describes the list. The list itself is one thing, so the verb is is.", "hard")


# ═════════════════════════════════════════════════════════════════════════
from collections import Counter

with open(OUT, "w") as f:
    json.dump(BANK, f, indent=2, ensure_ascii=False)
    f.write("\n")

by_topic = Counter(x["topic"] for x in BANK)
print(f"{len(BANK)} questions across {len(by_topic)} topics")
for t, n in by_topic.items():
    d = Counter(x["difficulty"] for x in BANK if x["topic"] == t)
    print(f"   {n:3}  E{d['easy']:2} M{d['medium']:2} H{d['hard']:2}   {t}")
print(f"wrote {OUT}")
