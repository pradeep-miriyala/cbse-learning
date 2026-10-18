#!/usr/bin/env python3
"""
Match-the-columns questions for The Selfish Giant.

    python3 scripts/gen-english-matching.py

The child reads a short passage and pairs each adjective with the noun it
describes in it. Every set carries decoys — extra nouns belonging to no
adjective — because with equal columns the last pair is free by elimination,
which is the flaw in every matching exercise that does not bother.

Checked here rather than trusted: no left repeated, no right repeated, no decoy
that is secretly a right answer, and every pair actually present in its passage.
"""

import json
import re

OUT = "scripts/banks/english-matching.json"
CH = "The Selfish Giant"

BANK = []


def q(topic, label, question, passage_title, passage, pairs, decoys, difficulty,
      status="published"):
    lefts = [p[0] for p in pairs]
    rights = [p[1] for p in pairs]
    low = lambda xs: [str(x).strip().lower() for x in xs]

    assert len(pairs) >= 3, ("a set needs at least 3 pairs", question)
    assert len(set(low(lefts))) == len(lefts), ("a left item repeats", question, lefts)
    assert len(set(low(rights))) == len(rights), ("a right item repeats", question, rights)
    assert len(set(low(decoys))) == len(decoys), ("a decoy repeats", question, decoys)
    for d in decoys:
        assert d.strip().lower() not in low(rights), (
            "decoy is also a correct answer", question, d)

    # The pair has to be findable in the passage the child is given, or the
    # question is asking them to guess rather than to read.
    flat = re.sub(r"\s+", " ", passage).lower()
    for left, right in pairs:
        assert left.lower() in flat, ("left item is not in the passage", question, left)
        assert right.lower() in flat, ("right item is not in the passage", question, right)

    # Every set asks the same thing — "match each adjective to its noun" — so the
    # question text cannot tell two of them apart. The passage is what makes one
    # set a different question from another, so it carries the identity.
    slug = re.sub(r"[^a-z0-9]+", "-", passage_title.lower()).strip("-")

    BANK.append({
        "grade": 6, "subject": "english", "chapter": CH,
        "topic": topic, "topicLabel": label, "subtopic": None,
        "format": "match",
        "question": question,
        "passageId": f"match-{slug}",
        "passageTitle": passage_title, "passage": passage,
        "pairs": [{"left": l, "right": r} for l, r in pairs],
        "decoys": decoys,
        "marks": len(pairs),
        "budgetSec": 40 + len(pairs) * 15,
        "difficulty": difficulty, "status": status,
    })


T, L = "selfish-giant-matching", "Match the Columns"
ASK = "Read the passage, then match each adjective on the left with the noun it describes."

q(T, L, ASK, "The garden the children loved",
  "It was a large lovely garden, with soft green grass. Here and there over the grass "
  "stood beautiful flowers like stars, and there were twelve peach trees that in the "
  "spring-time broke out into delicate blossoms of pink and pearl, and in the autumn bore "
  "rich fruit. The birds sat on the trees and sang so sweetly that the children used to "
  "stop their games in order to listen to them.",
  [("lovely", "garden"), ("soft", "grass"), ("beautiful", "flowers"),
   ("delicate", "blossoms"), ("rich", "fruit")],
  ["trees", "birds", "games"], "easy")

q(T, L, ASK, "Winter moves in",
  "Then the Spring came, and all over the country there were little blossoms and little "
  "birds. Only in the garden of the Selfish Giant it was still winter. The Snow covered up "
  "the grass with her great white cloak, and the Frost painted all the trees silver. Then "
  "they invited the North Wind to stay with them, and he came. He was wrapped in furs, and "
  "he roared all day about the garden, and blew the chimney pots down.",
  [("little", "birds"), ("white", "cloak"), ("selfish", "giant"), ("north", "wind")],
  ["grass", "trees", "furs", "spring"], "medium")

q(T, L, ASK, "The Hail and the frozen corner",
  "So the Hail came. Every day for three hours he rattled on the roof of the castle till he "
  "broke most of the slates. He was dressed in grey, and his breath was like ice. In one "
  "corner it was still winter, and in it was standing a little boy. He was so small that he "
  "could not reach up to the branches of the tree, and he was wandering all round it, "
  "crying bitterly. The poor tree was still quite covered with frost and snow, and the North "
  "Wind was blowing and roaring above it.",
  [("little", "boy"), ("poor", "tree"), ("three", "hours"), ("one", "corner")],
  ["roof", "slates", "branches", "frost"], "hard")

q(T, L, ASK, "The Giant returns",
  "He had been to visit his friend the Cornish ogre, and had stayed with him for seven "
  "years. When he arrived he saw the children playing in the garden. “What are you doing "
  "here?” he cried in a very gruff voice, and the children ran away. He built a high wall "
  "all round it, and put up a notice board.",
  [("cornish", "ogre"), ("seven", "years"), ("gruff", "voice"), ("high", "wall")],
  ["children", "garden", "friend", "board"], "medium")

q(T, L, ASK, "Spring comes back",
  "And when the people were going to market at twelve o'clock they found the Giant playing "
  "with the children in the most beautiful garden they had ever seen. The little boy whom "
  "the Giant loved was never seen again. The other children were very sorry, and they used "
  "to say to the Giant, “Where is your little companion?”",
  [("beautiful", "garden"), ("little", "companion"), ("other", "children")],
  ["market", "Giant", "boy"], "easy")


# ═════════════════════════════════════════════════════════════════════════
# Owls in the Family — adapted from An Island of Trees by Ruskin Bond
# ═════════════════════════════════════════════════════════════════════════
CH = "Owls in the Family"
T, L = "owls-matching", "Match the Columns"

q(T, L, ASK, "The owlet on the verandah steps",
  "One morning, we found a full-fledged baby spotted owlet on the ground by the verandah "
  "steps. When grandfather picked it up, it hissed and clacked its bill, but after a meal of "
  "raw meat and water, settled down for the day under my bed. The spotted owlet, even when "
  "full grown, is only the size of a myna, and has none of the sinister appearance of the "
  "larger owls.",
  [("full-fledged", "owlet"), ("raw", "meat"), ("sinister", "appearance"), ("larger", "owls")],
  ["steps", "morning", "bed", "size"], "easy")

q(T, L, ASK, "Releasing the owlets",
  "The young birds throve and ten days later at dawn, Grandfather and I took them into the "
  "garden to release them. I had placed one on a branch of the mango tree and was stooping to "
  "pick up the other, when I received quite a heavy blow on the back of my head. Then from a "
  "safe distance we watched the mother fly down and lead her offspring into the long grass at "
  "the edge of the garden.",
  [("young", "birds"), ("heavy", "blow"), ("safe", "distance"), ("long", "grass"),
   ("mango", "tree")],
  ["garden", "dawn", "head", "edge"], "medium")

q(T, L, ASK, "Owls about the house",
  "The owls loved to sit and splash in a shallow dish, especially if cold water was poured "
  "over them from a jug at the same time. During the day, they dozed in large cages under the "
  "trees in the garden. They needed cages for protection against attacks from wild birds. At "
  "night they had the freedom of the house, where they exercised their wings as much as they "
  "liked.",
  [("shallow", "dish"), ("cold", "water"), ("large", "cages"), ("wild", "birds")],
  ["jug", "garden", "trees", "wings"], "medium")

q(T, L, ASK, "Two kinds of owl-voice",
  "In response to Grandmother\u2019s voice, the owlets would make sounds as gentle and "
  "soothing as the purring of a cat; but when wild owls were around, ours would rend the night "
  "with blood-curdling shrieks. Their nightly occupation was catching beetles, with which the "
  "kitchen-quarters were infested at the time.",
  [("blood-curdling", "shrieks"), ("nightly", "occupation"), ("wild", "owls")],
  ["cat", "beetles", "night", "voice"], "hard")


# ═════════════════════════════════════════════════════════════════════════
from collections import Counter

with open(OUT, "w") as f:
    json.dump(BANK, f, indent=2, ensure_ascii=False)
    f.write("\n")

print(f"{len(BANK)} matching questions")
for x in BANK:
    print(f"   {len(x['pairs'])} pairs + {len(x['decoys'])} decoys  [{x['difficulty']}]  "
          f"{x['passageTitle']}")
print(f"total pairs (marks): {sum(len(x['pairs']) for x in BANK)}")
print(f"wrote {OUT}")
