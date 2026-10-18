#!/usr/bin/env python3
"""
Dictionary entries for the words picked out of "Owls in the Family".

    python3 scripts/gen-english-owls-words.py

Only the word meanings. These are true of the words wherever they appear, so
they do not depend on having the chapter's text in front of you — unlike the
comprehension and extract questions, which are waiting on it.

Definitions follow the textbook's own glossary where the two could differ.
"Compromised" is the one that matters: the general sense is two sides each
giving way, but the chapter means settling for less than you intended — the
narrator wanting no petticoat and accepting an apron — and that is what the
child will be asked.
"""

import json

OUT = "scripts/banks/english-owls-words.json"
DICT_CH = "Dictionary"
SOURCE = "Owls in the Family"
T, L = "dictionary", "Dictionary"

BANK = []


def q(question, options, answer, hint, difficulty):
    opts = [str(o).strip() for o in options]
    assert len(opts) == 4, (question, opts)
    assert len(set(o.lower() for o in opts)) == 4, ("duplicate options", question, opts)
    assert 0 <= answer < 4, question
    assert hint, ("every question needs a hint", question)
    BANK.append({
        "grade": 6, "subject": "english", "chapter": DICT_CH,
        "topic": T, "topicLabel": L, "subtopic": SOURCE,
        "question": question, "options": opts, "answer": answer,
        "hint": hint, "difficulty": difficulty, "status": "published",
    })


WORDS = [
    ("full-fledged", "Fully grown, with all its feathers",
     ["Only just hatched", "Unable to fly at all", "Half the usual size"],
     "A fledgling is a young bird growing its flight feathers; full-fledged means it has "
     "them all. It now means fully developed in general."),
    ("clacked", "Made a short sharp rattling sound",
     ["Sang a long sweet note", "Flapped its wings slowly", "Crept about silently"],
     "Owls clack their bills — a hard, dry, snapping noise, often a warning."),
    ("bill", "A bird's beak",
     ["A bird's claw", "A bird's tail feather", "A bird's nest"],
     "Bill is another word for beak. It is the same word as a bill you pay, but a quite "
     "different meaning."),
    ("sinister", "Suggesting that something evil is about to happen",
     ["Cheerful and welcoming", "Very large in size", "Extremely quiet"],
     "Sinister is the feeling of threat — a sinister shadow, a sinister silence."),
    ("persuade", "To make someone agree by giving them reasons",
     ["To force someone by threatening them", "To trick someone with a lie",
      "To ignore what someone says"],
     "Persuading works by argument. Forcing and tricking are the two things it is not."),
    ("emerged", "Came out into view",
     ["Disappeared from sight", "Fell asleep", "Broke into pieces"],
     "To emerge is to come out — from a hole, from behind a cloud, from a difficulty."),
    ("ledge", "A narrow flat shelf on a wall or cliff",
     ["A deep hole in the ground", "A tall wooden post", "A wide open field"],
     "A window ledge or a rock ledge — narrow, flat, and just wide enough to stand on."),
    ("reliance", "Trust, or depending on someone",
     ["Refusing all help", "Forgetting something completely", "Moving very quickly"],
     "The mother owl placed no reliance on the narrator as a foster-parent — she did not "
     "trust him with them, and left a mouse herself."),
    ("foster-parent", "Someone who raises a young one that is not their own",
     ["A parent who has died", "The oldest parent in a family", "A parent of twins"],
     "Foster-parents bring up a child, or a creature, that was born to somebody else."),
    ("throve", "Grew strong and healthy",
     ["Became weak and ill", "Ran away in fear", "Stayed exactly the same"],
     "Throve is the past of thrive. A creature that throve did well."),
    ("vicinity", "The area nearby",
     ["A place very far away", "The inside of a building", "A period of time"],
     "In the vicinity means round about — close at hand."),
    ("evidently", "Clearly, as anyone could see",
     ["Secretly, so nobody noticed", "Doubtfully, without proof", "Rarely, once or twice"],
     "Evidently comes from evidence: it means the thing is plain from what you can see."),
    ("spaghetti", "Long thin strings of pasta",
     ["A kind of small bird", "A garden tool", "A type of nest"],
     "Ordinary spaghetti — worth knowing here because to a hungry owl a strand of it looks "
     "remarkably like a worm."),
    ("sidled", "Moved sideways, quietly and a little shyly",
     ["Ran straight forward at speed", "Jumped high into the air", "Rolled over completely"],
     "To sidle is to edge along sideways, as though not wanting to be noticed."),
    ("compromised", "Settled for less than what you intended",
     ["Refused to change at all", "Got exactly what you wanted", "Started a new quarrel"],
     "The narrator wanted no part of the petticoat, so he settled for an apron instead — "
     "less than Grandfather did, but enough."),
    ("apron", "A cloth worn over the front of the clothes to keep them clean",
     ["A hat worn in the sun", "A pair of gloves", "A blanket for a bed"],
     "An apron is tied on over your clothes while you cook or work."),
    ("rend", "To tear something apart violently",
     ["To mend something carefully", "To fold something neatly", "To wash something clean"],
     "To rend is to tear. A cry that rends the air is one that seems to split it."),
    ("blood-curdling", "So frightening that it seems to chill the blood",
     ["Very gentle and soothing", "Extremely funny", "Barely audible"],
     "A blood-curdling shriek is the kind that makes you go cold. Owls are famous for them."),
    ("beetles", "Hard-shelled insects",
     ["Small furry animals", "A kind of wild flower", "Young birds"],
     "Beetles have hard wing-cases. They are exactly the sort of thing a young owl is fed."),
    ("infested", "Overrun by large numbers of pests",
     ["Kept perfectly clean", "Visited by one or two guests", "Decorated with flowers"],
     "A place infested with mice has far too many of them — which is where a hunting owl "
     "becomes useful."),
    ("perch", "A branch or bar that a bird rests on",
     ["A bird's egg", "The sound a bird makes", "A bird's feather"],
     "As a noun it is the resting place; as a verb it is what the bird does on it."),
    ("superstitious", "Believing that certain things bring good or bad luck",
     ["Believing only what can be proved", "Refusing to believe anything",
      "Understanding science very well"],
     "Superstition is belief without reason behind it — such as thinking an owl's call "
     "foretells a death."),
    ("untoward", "Unexpected and unwelcome",
     ["Expected and pleasant", "Very ordinary", "Carefully planned"],
     "Nothing untoward happened means nothing went wrong."),
    ("transvestism", "Wearing clothes usually associated with a different gender",
     ["Keeping birds as pets in a house", "Feeding an animal by hand",
      "Dressing very formally for a meal"],
     "The owls snapped at anyone in trousers and were fond of anyone in a petticoat, so "
     "Grandfather wore a petticoat at feeding time."),
    ("snuggled", "Settled close in, warmly and comfortably",
     ["Struggled to get free", "Flew away quickly", "Stood stiffly upright"],
     "To snuggle is to press close for warmth — what a small creature does against something "
     "bigger."),
]

for word, right, wrongs, hint in WORDS:
    q(f"What does “{word}” mean?", [right, *wrongs], 0, hint, "easy")


# The other direction, for the words worth being able to produce rather than
# only recognise.
BACKWARDS = [
    ("Which word means fully grown, with all its feathers?", "full-fledged",
     ["snuggled", "sidled", "infested"], "A fledgling has some feathers; full-fledged has all."),
    ("Which word means the area nearby?", "vicinity", ["ledge", "perch", "apron"],
     "In the vicinity means round about."),
    ("Which word means to tear apart violently?", "rend", ["snuggle", "sidle", "persuade"],
     "To rend is to tear."),
    ("Which word means overrun by pests?", "infested", ["emerged", "throve", "compromised"],
     "Infested means having far too many of something unwanted."),
    ("Which word means unexpected and unwelcome?", "untoward", ["evidently", "sinister", "reliance"],
     "Nothing untoward means nothing went wrong."),
    ("Which word names a bird's beak?", "bill", ["ledge", "perch", "apron"],
     "Bill is another word for beak."),
    ("Which word names where a bird rests?", "perch", ["bill", "vicinity", "reliance"],
     "A perch is the branch or bar it sits on."),
    ("Which word means believing in luck and omens?", "superstitious", ["evidently", "sinister", "throve"],
     "Superstition is belief without reason behind it."),
    ("Which word means grew strong and healthy?", "throve", ["rend", "clacked", "sidled"],
     "Throve is the past of thrive."),
    ("Which word means someone who raises another's young?", "foster-parent",
     ["full-fledged", "vicinity", "apron"],
     "Foster-parents bring up a young one born to somebody else."),
]
for question, right, wrongs, hint in BACKWARDS:
    q(question, [right, *wrongs], 0, hint, "easy")

q("Which word would you use for a shriek that frightens you badly?",
  ["Blood-curdling", "Whimsical", "Untoward", "Evident"], 0,
  "Blood-curdling is the word for a sound that makes you go cold.", "medium")

q("“The owl ___ along the branch, edging closer.” Which word fits?",
  ["sidled", "throve", "compromised", "emerged"], 0,
  "Sidling is moving sideways, a little at a time.", "medium")

q("An owl that hunts mice is useful in a house that is ___ with them.",
  ["infested", "compromised", "persuaded", "snuggled"], 0,
  "Infested means overrun — which is exactly the problem an owl solves.", "medium")


# ═════════════════════════════════════════════════════════════════════════
from collections import Counter

with open(OUT, "w") as f:
    json.dump(BANK, f, indent=2, ensure_ascii=False)
    f.write("\n")

d = Counter(x["difficulty"] for x in BANK)
print(f"{len(BANK)} Dictionary questions from {SOURCE}   E{d['easy']} M{d['medium']}")
print(f"wrote {OUT}")
