#!/usr/bin/env python3
"""
"Owls in the Family" — an adapted excerpt from An Island of Trees by Ruskin Bond.

    python3 scripts/gen-english-owls-story.py

Written from the chapter itself, so the answers are the chapter's answers rather
than a plausible reconstruction. Bond is a living author and the book is in
copyright, so the quotations here are kept to the one or two sentences a
question actually needs — the length a textbook prints beside its own exercise —
and never more.

Three topics:

  * Understanding the Story — including the five the textbook asks
  * True or False — statements that turn on a detail worth reading twice
  * Reading the Lines — a short extract, then adjectives and verbs inside it
"""

import json

OUT = "scripts/banks/english-owls-story.json"
CH = "Owls in the Family"

BANK = []


def q(topic, label, question, options, answer, hint, difficulty,
      passage_id=None, passage_title=None, passage=None):
    opts = [str(o).strip() for o in options]
    assert len(opts) in (2, 4), (question, opts)
    assert len(set(o.lower() for o in opts)) == len(opts), ("duplicate options", question, opts)
    assert 0 <= answer < len(opts), question
    assert hint, ("every question needs a hint", question)
    doc = {
        "grade": 6, "subject": "english", "chapter": CH,
        "topic": topic, "topicLabel": label, "subtopic": None,
        "question": question, "options": opts, "answer": answer,
        "hint": hint, "difficulty": difficulty, "status": "published",
    }
    if passage_id:
        doc |= {"passageId": passage_id, "passageTitle": passage_title, "passage": passage}
    BANK.append(doc)


# ═════════════════════════════════════════════════════════════════════════
# 1. Understanding the Story
# ═════════════════════════════════════════════════════════════════════════
T, L = "owls-story", "Understanding the Story"

# ── the five the textbook asks ──
q(T, L, "Grandfather says, “Now, there’s an unselfish mother for you!” What makes him say this?",
  ["The mother owl had brought her owlets back and seemed willing to give them a good home",
   "The mother owl had fought off the wild birds that attacked her young",
   "The mother owl had built a second nest for her owlets",
   "The mother owl had fed her owlets before feeding herself"], 0,
  "She had attacked them the day before to defend her young. The next morning the owlets were "
  "back on the wall and she greeted the family softly from the bird-bath — as Grandfather reads "
  "it, she wanted them to have a good home, and they were getting too big for her to manage.",
  "medium")

q(T, L, "How did the narrator and his family realise where the owlets had come from?",
  ["A second owlet fell in almost the same place, and they found a rough nest where the "
   "rainwater pipe came through the roof",
   "The mother owl led them to the nest in the mango tree",
   "Grandfather recognised the owlets as belonging to a pair he had seen",
   "They heard the owlets calling from inside the roof"], 0,
  "It took the second owlet, found in almost the same spot, before they looked up and saw the "
  "rough nest at the rainwater pipe.", "medium")

q(T, L, "What did the owls do at night, and how did this help the household?",
  ["They caught beetles, and the kitchen-quarters were infested with them at the time",
   "They kept watch and drove away wild birds from the garden",
   "They caught mice, which the family could not otherwise get rid of",
   "They sang softly, which helped Grandmother sleep"], 0,
  "Their nightly occupation was catching beetles. With sharp eyes and powerful beaks they were "
  "excellent pest destroyers, and the kitchen-quarters were infested at the time.", "medium")

q(T, L, "What mild form of transvestism satisfied the owls?",
  ["Grandfather wore a petticoat at feeding time",
   "Grandfather wore an apron at feeding time",
   "The narrator wore Grandmother's shawl",
   "Aunt Mabel wore trousers to feed them"], 0,
  "The owls snapped at anyone in trousers and were fond of anyone in a petticoat, so "
  "Grandfather wore one to feed them. The narrator compromised — he wore an apron instead.",
  "medium")

q(T, L, "How does the narrator show that the owls his family adopted were not birds of ill omen?",
  ["He notes that — mice excepted — there were no untoward deaths in the house while they lived there",
   "He points out that the owls never once cried at night",
   "He explains that owls are lucky birds in most countries",
   "He says that Grandmother's health improved while they stayed"], 0,
  "Superstitious folk dread the cry of the owl. His answer is simply the record: apart from "
  "mice, nothing untoward died in that house during the owls' residence.", "hard")

# ── the rest of the chapter ──
q(T, L, "Where was the first owlet found, and what did it do when Grandfather picked it up?",
  ["On the ground by the verandah steps; it hissed and clacked its bill",
   "On a branch of the mango tree; it flew away at once",
   "Inside the kitchen-quarters; it snapped at his hand",
   "On the garden wall; it made a soft whoo-whoo"], 0,
  "It was on the ground by the verandah steps, and it hissed and clacked its bill in protest.",
  "easy")

q(T, L, "What was the first owlet given to eat?",
  ["Raw meat and water", "Spaghetti", "Beetles", "A mouse"], 0,
  "After a meal of raw meat and water it settled down for the day under the narrator's bed. "
  "Spaghetti came later, from Grandmother.", "easy")

q(T, L, "How big is a spotted owlet when fully grown?",
  ["About the size of a myna", "About the size of an eagle",
   "About the size of a sparrow", "About the size of a crow"], 0,
  "Even full grown it is only the size of a myna, and has none of the sinister appearance of "
  "the larger owls.", "easy")

q(T, L, "How might you persuade a spotted owlet to show its face?",
  ["By tapping on the trunk of the tree it lives in",
   "By leaving raw meat at the foot of the tree",
   "By calling to it softly at dusk",
   "By shaking the branch it is sitting on"], 0,
  "Tap on the tree trunk and the bird may show an enquiring face at the entrance to its hole.",
  "medium")

q(T, L, "Why does the spotted owlet prefer to stay at home during the day?",
  ["Other birds attack it, because they consider all owls their enemies",
   "It cannot see at all in daylight",
   "It is afraid of people",
   "It sleeps all day and hunts only at night"], 0,
  "The chapter is careful about this: it is not strictly a night-bird and it is not normally "
  "afraid of man. It stays in because other birds treat all owls as enemies.", "hard")

q(T, L, "What did the mother owl leave for her owlets, and what did it show?",
  ["A mouse, showing she placed no reliance on the narrator as a foster-parent",
   "A beetle, showing she wanted them to learn to hunt",
   "A feather, showing she had been close by",
   "Nothing, showing she had abandoned them"], 0,
  "She left a mouse with its tail tucked through the mosquito net. Obviously she did not trust "
  "the narrator to feed them.", "medium")

q(T, L, "What happened when Grandfather and the narrator tried to release the owlets?",
  ["The mother owl struck the narrator on the head and swooped at Grandfather",
   "The owlets refused to leave and flew back indoors",
   "The owlets were attacked at once by wild birds",
   "The mother owl led them away without a sound"], 0,
  "The narrator took quite a heavy blow on the back of the head, and Grandfather was agile "
  "enough to duck out of the way a moment later.", "medium")

q(T, L, "Which pets did Grandmother object to?",
  ["All snakes, most monkeys and some crows",
   "All birds, including the owls",
   "Only the owls, until she grew used to them",
   "Cats and dogs, but nothing wild"], 0,
  "She objected to all snakes, most monkeys and some crows — but took quite a fancy to the "
  "owls.", "medium")

q(T, L, "What did Grandmother frequently feed the owls?",
  ["Spaghetti", "Raw meat", "Beetles", "Bread and milk"], 0,
  "She fed them on spaghetti, and they seemed quite fond of it.", "easy")

q(T, L, "Why did Aunt Mabel run shrieking from the room?",
  ["She was terrified of the owls, and one would sidle up to her in a friendly way",
   "The owls swelled their feathers and snapped at her",
   "She disliked the smell of the raw meat",
   "Grandmother had asked her to feed them"], 0,
  "The owls showed affection to anyone in a petticoat, Aunt Mabel included — and she was "
  "terrified of them. The friendliness was the problem.", "medium")

q(T, L, "How did the owls sound in response to Grandmother’s voice?",
  ["As gentle and soothing as a cat purring",
   "Like blood-curdling shrieks",
   "Like a soft whoo-whoo of warning",
   "They made no sound at all"], 0,
  "Gentle as purring for Grandmother — the blood-curdling shrieks were for when wild owls "
  "were about.", "medium")

q(T, L, "What did the owls enjoy doing with water?",
  ["Splashing in a shallow dish while cold water was poured over them",
   "Drinking from a jug held by Grandfather",
   "Standing in the rain on the verandah",
   "Bathing in the bird-bath in the garden"], 0,
  "They would get thoroughly wet, jump out to a perch, shake themselves, and go back for a "
  "second splash and sometimes a third.", "medium")

q(T, L, "Why were the owls kept in large cages during the day?",
  ["To protect them from attacks by wild birds",
   "To stop them escaping into the garden",
   "Because they slept better inside a cage",
   "Because Grandmother did not want them indoors"], 0,
  "They needed the cages for protection. At night they had the freedom of the house.", "medium")

q(T, L, "What is the last picture the narrator carries of Grandmother?",
  ["Asleep in her rocking-chair with an owl snuggled under her ear, both snoring",
   "Feeding the owls spaghetti in the garden",
   "Watching the owls splash in a shallow dish",
   "Calling to the owls from the verandah steps"], 0,
  "He found one of the owls had crawled up her pillow until its head was under her ear. Both "
  "Grandmother and the little owl were snoring.", "easy")

q(T, L, "Where was Ruskin Bond born?",
  ["Kasauli", "Shimla", "Jamnagar", "Dehradun"], 0,
  "He was born in Kasauli in 1934, and grew up in Jamnagar and Shimla.", "easy")


# ═════════════════════════════════════════════════════════════════════════
# 2. True or False
# ═════════════════════════════════════════════════════════════════════════
T, L = "owls-true-false", "True or False"

TF = [
    ("Aunt Mabel, unlike Grandmother, did not take a liking to the owlets.", True,
     "Grandmother took quite a fancy to them; Aunt Mabel was terrified and ran shrieking.", "easy"),
    ("The owlets throve on the mouse left by Grandfather.", False,
     "It was the MOTHER OWL who left the mouse, tucked through the mosquito net — not "
     "Grandfather. Read that one twice.", "medium"),
    ("Grandmother was averse to snakes and most monkeys.", True,
     "She objected to all snakes, most monkeys and some crows.", "easy"),
    ("The spotted owlet is strictly a night-bird.", False,
     "The chapter says the opposite: it is not strictly a night-bird. It stays home by day "
     "because other birds attack it.", "hard"),
    ("The spotted owlet is normally afraid of man.", False,
     "It is not normally afraid of man.", "medium"),
    ("The owls were fed spaghetti by Grandmother.", True,
     "And they seemed quite fond of it.", "easy"),
    ("Grandfather wore an apron at feeding time.", False,
     "Grandfather wore a PETTICOAT. It was the narrator who compromised with an apron.",
     "medium"),
    ("The owls snapped at anyone wearing trousers.", True,
     "Forgetful that Grandfather and the narrator had reared them, they would swell their "
     "feathers and snap at anyone in trousers.", "easy"),
    ("The owls caught mice every night.", False,
     "Their nightly occupation was catching BEETLES. The one mouse in the story was left by "
     "the mother owl.", "medium"),
    ("The mother owl attacked the narrator when he tried to release the owlets.", True,
     "He received quite a heavy blow on the back of the head.", "easy"),
    ("The owlets were found in a nest in the mango tree.", False,
     "The nest was where the rainwater pipe emerged through the roof. The mango tree is where "
     "they were later released.", "medium"),
    ("There were no untoward deaths in the house while the owls lived there, mice excepted.",
     True, "That is exactly how the narrator puts it — and it is his answer to superstition.",
     "medium"),
]
for statement, truth, hint, diff in TF:
    q(T, L, f"True or false?\n\n“{statement}”", ["True", "False"], 0 if truth else 1, hint, diff)


# ═════════════════════════════════════════════════════════════════════════
# 3. Reading the Lines — adjectives and verbs inside a short extract
# ═════════════════════════════════════════════════════════════════════════
T, L = "owls-extracts", "Reading the Lines"

P1 = "owls-verandah"
P1T = ("When grandfather picked it up, it hissed and clacked its bill, but after a meal of raw "
       "meat and water, settled down for the day under my bed.")

q(T, L, "Which THREE words in this sentence are verbs?",
  ["picked, hissed, clacked", "grandfather, bill, meat",
   "raw, day, water", "under, after, but"], 0,
  "Verbs are what somebody does. Grandfather picked; the owlet hissed and clacked.",
  "easy", P1, "The owlet is picked up", P1T)

q(T, L, "Which word in this sentence is an adjective?",
  ["raw", "meat", "settled", "under"], 0,
  "Raw describes the meat. Meat is the noun it describes.", "easy",
  P1, "The owlet is picked up", P1T)

q(T, L, "“Settled down for the day” — who settled down?",
  ["The owlet", "Grandfather", "The narrator", "The bill"], 0,
  "The sentence keeps its subject: it hissed, it clacked, and it settled down.", "medium",
  P1, "The owlet is picked up", P1T)

q(T, L, "What does this sentence tell you about the owlet’s mood as it changed?",
  ["It began by protesting and ended by settling down comfortably",
   "It was frightened all the way through",
   "It was friendly from the first moment",
   "It refused to eat anything"], 0,
  "Hissing and clacking is protest; settling down for the day is trust. The food is what turns "
  "one into the other.", "medium", P1, "The owlet is picked up", P1T)

P2 = "owls-mother-returns"
P2T = ("From outside, she crooned and gurgled for a long time and in the morning, I found that "
       "she had left a mouse with its tail tucked through the mosquito net.")

q(T, L, "Which TWO words describe the sounds the mother owl made?",
  ["crooned and gurgled", "found and left", "tucked and through", "long and morning"], 0,
  "Crooned and gurgled are both verbs of sound — soft, private noises, quite unlike a shriek.",
  "easy", P2, "The mother returns at night", P2T)

q(T, L, "In “a long time”, what part of speech is “long”?",
  ["An adjective", "A verb", "A noun", "A preposition"], 0,
  "It describes the noun time, so it is an adjective.", "medium",
  P2, "The mother returns at night", P2T)

q(T, L, "What does the mother owl’s gift of a mouse show?",
  ["She did not trust the narrator to feed her young",
   "She wanted to thank the family for their care",
   "She was teaching the owlets to hunt",
   "She had no more use for the mouse"], 0,
  "The narrator says it plainly: obviously she placed no reliance on him as a foster-parent.",
  "medium", P2, "The mother returns at night", P2T)

P3 = "owls-shrieks"
P3T = ("In response to Grandmother’s voice, the owlets would make sounds as gentle and soothing "
       "as the purring of a cat; but when wild owls were around, ours would rend the night with "
       "blood-curdling shrieks.")

q(T, L, "Which THREE words in this sentence are adjectives?",
  ["gentle, wild, blood-curdling", "sounds, night, shrieks",
   "make, rend, were", "around, with, as"], 0,
  "Gentle sounds, wild owls, blood-curdling shrieks — each one describes a noun.",
  "medium", P3, "Two kinds of owl-voice", P3T)

q(T, L, "What is the effect of putting the two sounds in one sentence?",
  ["It sets the tame, affectionate owls sharply against the wild ones",
   "It shows the owls were always frightening",
   "It suggests Grandmother could not tell them apart",
   "It proves the owls disliked Grandmother"], 0,
  "The contrast is the point: purring for the person who feeds them, shrieks for their own "
  "kind. The semicolon hinges the two halves.", "hard", P3, "Two kinds of owl-voice", P3T)

q(T, L, "“Rend the night” — what does the verb “rend” suggest about the shrieks?",
  ["That they seemed to tear the quiet apart", "That they were faint and far off",
   "That they went on all night without stopping", "That they were pleasant to hear"], 0,
  "To rend is to tear violently. The night is being torn, which is a far stronger image than "
  "simply saying the owls were loud.", "hard", P3, "Two kinds of owl-voice", P3T)


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
groups = Counter(x["passageId"] for x in BANK if x.get("passageId"))
print(f"extract sets: {dict(groups)}")
print(f"wrote {OUT}")
