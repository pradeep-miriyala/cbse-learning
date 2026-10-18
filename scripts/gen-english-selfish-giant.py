#!/usr/bin/env python3
"""
Builds the bank for Oscar Wilde's "The Selfish Giant".

    python3 scripts/gen-english-selfish-giant.py

The story is public domain — Wilde died in 1900 — and the passages quoted here
are short extracts a textbook would print beside its own questions.

Three kinds of question, filed in two places:

  * WORD MEANINGS go into the shared "Dictionary" topic, tagged with the text
    they came from. Only words the textbook actually picks out, not a dictionary.

  * EXTRACT SETS use the passage mechanism: a quoted line, then several
    questions about it, drawn together so the child reads the line once.

  * COMPREHENSION questions stand alone.

Anything that quotes the story is only as right as the wording below. Wilde is
widely reprinted and these lines are among the most quoted in the book, so they
ship published — but if your edition differs, the extracts are the place to
look.
"""

import json

OUT = "scripts/banks/english-selfish-giant.json"
CH = "The Selfish Giant"
DICT_CH = "Dictionary"
SOURCE = "The Selfish Giant"

BANK = []


def q(topic, label, question, options, answer, hint, difficulty,
      chapter=None, subtopic=None, status="published",
      passage_id=None, passage_title=None, passage=None):
    opts = [str(o).strip() for o in options]
    assert len(opts) == 4, (question, opts)
    assert len(set(o.lower() for o in opts)) == 4, ("duplicate options", question, opts)
    assert 0 <= answer < 4, question
    assert hint, ("every question needs a hint", question)
    doc = {
        "grade": 6, "subject": "english", "chapter": chapter or CH,
        "topic": topic, "topicLabel": label, "subtopic": subtopic,
        "question": question, "options": opts, "answer": answer,
        "hint": hint, "difficulty": difficulty, "status": status,
    }
    if passage_id:
        doc |= {"passageId": passage_id, "passageTitle": passage_title, "passage": passage}
    BANK.append(doc)


# ═════════════════════════════════════════════════════════════════════════
# 1. Dictionary — only the words the textbook picks out
# ═════════════════════════════════════════════════════════════════════════
T, L = "dictionary", "Dictionary"

WORDS = [
    ("Cornish", "Belonging to Cornwall, a county in south-west England",
     ["Made of corn", "A kind of stone wall", "Belonging to a country in Africa"],
     "The Giant had been away visiting his friend the Cornish ogre — an ogre from Cornwall."),
    ("ogre", "A cruel man-eating giant in stories",
     ["A gentle woodland spirit", "A servant who guards a gate", "A very old and wise king"],
     "An ogre is the frightening giant of fairy tales. The Selfish Giant counts one as a friend, "
     "which tells you something about him."),
    ("gruff", "Rough and unfriendly in voice or manner",
     ["Soft and gentle", "Cheerful and joking", "Quiet and shy"],
     "The Giant speaks in a gruff voice when he drives the children out — rough, harsh, unwelcoming."),
    ("cloak", "A loose outer garment worn over the shoulders",
     ["A pair of thick boots", "A wide-brimmed hat", "A woollen scarf for the neck"],
     "A cloak has no sleeves and hangs from the shoulders. The Snow covers the grass with a "
     "great white one."),
    ("linnet", "A small brown finch that sings",
     ["A large bird that cannot fly", "A bird that hunts at night", "A bird that lives on water"],
     "It is a linnet singing outside his window that the Giant thinks the most beautiful music "
     "in the world."),
    ("outrage", "Great anger at something felt to be very wrong",
     ["A quiet feeling of sadness", "A sudden burst of laughter", "A polite request"],
     "Outrage is anger at unfairness — the feeling that something ought not to have happened."),
    ("haughty", "Proud, and looking down on other people",
     ["Modest and humble", "Nervous and easily frightened", "Generous with everything one has"],
     "A haughty person thinks themselves above others. It is a good word for the Giant before "
     "he changes."),
    ("prohibit", "To forbid by law or by rule",
     ["To allow freely", "To encourage strongly", "To ask politely"],
     "The Giant's notice board prohibits the children from entering — it forbids them."),
    ("righteous", "Believing oneself to be morally right",
     ["Ashamed of one's actions", "Uncertain about what is right", "Careless about right and wrong"],
     "Righteous means in the right, or feeling in the right. The Giant is quite sure he is "
     "entitled to his own garden."),
    ("intimidate", "To frighten someone into doing what you want",
     ["To comfort someone who is upset", "To teach someone patiently", "To praise someone warmly"],
     "To intimidate is to use fear. The Giant's roar and his high wall do exactly that to the "
     "children."),
    ("whimsical", "Playful and fanciful, in an amusing unexpected way",
     ["Strictly serious at all times", "Cruel and calculating", "Slow and very careful"],
     "Whimsical means fanciful and playful — the quality a story about talking Snow and Frost has."),
]

for word, right, wrongs, hint in WORDS:
    q(T, L, f"In this story, what does “{word}” mean?", [right, *wrongs], 0, hint, "easy",
      chapter=DICT_CH, subtopic=SOURCE)

BACKWARDS = [
    ("Which word means rough and unfriendly in manner?", "gruff", ["whimsical", "righteous", "cornish"],
     "A gruff voice is a rough, harsh one."),
    ("Which word means to forbid something?", "prohibit", ["intimidate", "outrage", "cloak"],
     "To prohibit is to forbid — usually by a rule or a notice."),
    ("Which word means to frighten someone into obeying?", "intimidate", ["prohibit", "haughty", "linnet"],
     "Intimidating someone is getting your way by making them afraid."),
    ("Which word means proud and looking down on others?", "haughty", ["gruff", "whimsical", "cornish"],
     "Haughty is a particular kind of pride — the kind that despises other people."),
    ("Which word names a garment?", "cloak", ["ogre", "linnet", "outrage"],
     "A cloak is worn over the shoulders."),
    ("Which word names a bird?", "linnet", ["ogre", "cloak", "outrage"],
     "A linnet is a small singing finch."),
    ("Which word names a creature from fairy tales?", "ogre", ["linnet", "cloak", "prohibit"],
     "An ogre is the man-eating giant of stories."),
    ("Which word means playful and fanciful?", "whimsical", ["righteous", "gruff", "prohibit"],
     "Whimsical describes something light and imaginative rather than serious."),
]
for question, right, wrongs, hint in BACKWARDS:
    q(T, L, question, [right, *wrongs], 0, hint, "easy", chapter=DICT_CH, subtopic=SOURCE)

q(T, L, "Which word would best describe someone who puts up a wall to keep children out?",
  ["Haughty", "Whimsical", "Righteous", "Gruff"], 0,
  "Haughty is the pride that looks down on others — exactly what the wall expresses.",
  "medium", chapter=DICT_CH, subtopic=SOURCE)

q(T, L, "“Trespassers will be prosecuted.” Which word from the list is closest in meaning to what "
        "this notice does?",
  ["Prohibit", "Intimidate", "Outrage", "Cloak"], 0,
  "The notice forbids people from entering, which is what prohibit means. It also intimidates, "
  "but forbidding is what it says.", "medium", chapter=DICT_CH, subtopic=SOURCE)


# ═════════════════════════════════════════════════════════════════════════
# 2. Extract sets — a quoted line, then questions about it
# ═════════════════════════════════════════════════════════════════════════
T, L = "selfish-giant-extracts", "Reading the Lines"

P1 = "spring-forgotten"
P1_TEXT = ('“Spring has forgotten this garden,” they cried, “so we will live here all the '
           'year round.”')

q(T, L, "Who are the speakers — the “we” in this extract?",
  ["The Snow and the Frost", "The children of the village",
   "The Giant and the Cornish ogre", "The birds and the flowers"], 0,
  "It is the Snow and the Frost who say this, delighted to find a garden where spring never comes.",
  "easy", passage_id=P1, passage_title="The Snow and the Frost speak", passage=P1_TEXT)

q(T, L, "What did the speakers do to the garden?",
  ["The Snow covered the grass and the Frost turned the trees silver",
   "They planted new flowers along the wall",
   "They melted away and let the sun in",
   "They knocked down the Giant's wall"], 0,
  "The Snow covered the grass with her great white cloak, and the Frost painted all the trees "
  "silver.", "easy", passage_id=P1, passage_title="The Snow and the Frost speak", passage=P1_TEXT)

q(T, L, "Whom did they invite to join them?",
  ["The North Wind, and then the Hail", "The children, and then the Giant",
   "The Spring, and then the Summer", "The linnet, and then the peach trees"], 0,
  "They invited the North Wind, who came wrapped in furs, and afterwards the Hail.",
  "medium", passage_id=P1, passage_title="The Snow and the Frost speak", passage=P1_TEXT)

q(T, L, "Why had Spring forgotten this garden?",
  ["Because the Giant had shut the children out of it",
   "Because the garden had no soil left",
   "Because the Giant had cut down all the trees",
   "Because it was too far north for spring to reach"], 0,
  "Spring stays away because the children are gone. Where there are no children, there is no "
  "spring — that is the story's whole idea.", "hard",
  passage_id=P1, passage_title="The Snow and the Frost speak", passage=P1_TEXT)

P2 = "my-own-garden"
P2_TEXT = ('“What are you doing here?” he cried in a very gruff voice, and the children ran '
           'away. “My own garden is my own garden,” said the Giant; “any one can understand '
           'that, and I will allow nobody to play in it but myself.”')

q(T, L, "Who speaks these words?",
  ["The Giant, on returning home", "The Cornish ogre", "The North Wind", "The village schoolmaster"], 0,
  "It is the Giant, back after seven years and finding children in his garden.",
  "easy", passage_id=P2, passage_title="The Giant returns", passage=P2_TEXT)

q(T, L, "What does “gruff” tell you about how he said it?",
  ["Roughly and unkindly", "Softly and sadly", "Cheerfully and loudly", "Nervously and quietly"], 0,
  "A gruff voice is rough and harsh — enough to send the children running.",
  "easy", passage_id=P2, passage_title="The Giant returns", passage=P2_TEXT)

q(T, L, "What did the Giant do after saying this?",
  ["He built a high wall and put up a notice board",
   "He invited the children back the next day",
   "He planted twelve new peach trees",
   "He left again to visit his friend"], 0,
  "He built a high wall all round it and put up a notice board saying trespassers would be "
  "prosecuted.", "easy", passage_id=P2, passage_title="The Giant returns", passage=P2_TEXT)

q(T, L, "“My own garden is my own garden.” What does repeating the phrase show?",
  ["How completely he is fixed on owning it",
   "That he is not sure whose garden it is",
   "That he is joking with the children",
   "That the garden belongs to the children too"], 0,
  "Saying the same words twice makes the claim sound final, as though it settles everything. "
  "That is exactly how selfishness argues.", "hard",
  passage_id=P2, passage_title="The Giant returns", passage=P2_TEXT)

P3 = "linnet-window"
P3_TEXT = ('One morning the Giant was lying awake in bed when he heard some lovely music. '
           'It sounded so sweet to his ears that he thought it must be the King’s '
           'musicians passing by. It was really only a little linnet singing outside his '
           'window, but it was so long since he had heard a bird sing in his garden that it '
           'seemed to him to be the most beautiful music in the world.')

q(T, L, "What was the lovely music the Giant heard?",
  ["A little linnet singing outside his window", "The King's musicians passing by",
   "The children laughing in the lane", "The North Wind dying down"], 0,
  "He thought it was the King's musicians, but it was only a linnet — a small bird.",
  "easy", passage_id=P3, passage_title="The first sign of spring", passage=P3_TEXT)

q(T, L, "Why did such a small sound seem so wonderful to him?",
  ["Because no bird had sung in his garden for a very long time",
   "Because he had never heard a bird before",
   "Because the linnet was singing louder than usual",
   "Because the King had sent the bird to him"], 0,
  "It is not that the song was grand. It is that his garden had been silent so long that any "
  "bird was extraordinary.", "medium",
  passage_id=P3, passage_title="The first sign of spring", passage=P3_TEXT)

q(T, L, "What does this moment mark in the story?",
  ["The first sign that spring has come back to the garden",
   "The moment the Giant decides to leave again",
   "The arrival of the Cornish ogre",
   "The building of the wall"], 0,
  "The linnet's song is the first sign of spring returning — the Hail stops, the North Wind "
  "ceases to roar, and a delicious perfume comes to him.", "medium",
  passage_id=P3, passage_title="The first sign of spring", passage=P3_TEXT)

q(T, L, "What did the Giant do after hearing it?",
  ["He got out of bed and looked out of the window",
   "He went back to sleep at once",
   "He shouted at the bird to be quiet",
   "He sent for the King's musicians"], 0,
  "He looked out — and saw the children back in the garden, and the trees in blossom.",
  "easy", passage_id=P3, passage_title="The first sign of spring", passage=P3_TEXT)


# ═════════════════════════════════════════════════════════════════════════
# 3. Understanding the story
# ═════════════════════════════════════════════════════════════════════════
T, L = "selfish-giant-story", "Understanding the Story"

q(T, L, "Why would children enjoy playing in the Giant's garden?",
  ["It had soft green grass, beautiful flowers and trees to climb",
   "It was full of toys the Giant had bought",
   "It was the only open space near the village",
   "The Giant paid them to come"], 0,
  "The grass was soft and green, star-like flowers grew in it, and there were twelve peach "
  "trees and singing birds. It is simply a lovely place to be.", "easy")

q(T, L, "Do you think the Giant's garden was a very beautiful garden?",
  ["Yes — soft grass, star-like flowers, peach trees and singing birds",
   "No — it was bare and full of stones",
   "No — it was too small for anyone to play in",
   "Yes — but only because of the wall around it"], 0,
  "Everything described is beautiful: the grass, the flowers like stars, the twelve peach "
  "trees that blossomed in spring and bore fruit in autumn, and the birds.", "easy")

q(T, L, "How long had the Giant been away, and where?",
  ["Seven years, with his friend the Cornish ogre",
   "Seven days, at a fair in the next village",
   "Seven months, travelling at sea",
   "Seven years, imprisoned in a tower"], 0,
  "He had been to visit his friend the Cornish ogre and had stayed seven years.", "easy")

q(T, L, "What did the Giant put up to keep the children out?",
  ["A high wall and a notice board", "A locked gate and a bell",
   "A hedge of thorns", "A pair of guard dogs"], 0,
  "He built a high wall all round the garden and put up a notice board: trespassers will be "
  "prosecuted.", "easy")

q(T, L, "What did the North Wind look like?",
  ["He was wrapped in furs", "He was dressed all in grey",
   "He was covered in a white cloak", "He wore a silver crown"], 0,
  "The North Wind came wrapped in furs. It is the Hail who is dressed in grey.", "medium")

q(T, L, "What did the North Wind do in the garden?",
  ["He roared all day and blew the chimney pots down",
   "He melted the snow and let spring in",
   "He carried the children over the wall",
   "He planted frost flowers on the grass"], 0,
  "He roared all day long, and blew the chimney pots down. The Snow and Frost had invited him "
  "to stay.", "medium")

q(T, L, "Who came after the North Wind, and how was he described?",
  ["The Hail, dressed in grey with a breath like ice",
   "The Rain, dressed in blue and always weeping",
   "The Fog, dressed in white and silent",
   "The Thunder, dressed in black and shouting"], 0,
  "The Hail came, dressed in grey, and his breath was like ice. He rattled on the roof of the "
  "castle every day.", "hard")

q(T, L, "What was the first sign that spring had come back?",
  ["A linnet singing outside the Giant's window",
   "The wall falling down by itself",
   "The Giant's peach trees bearing fruit",
   "The Snow and the Frost saying goodbye"], 0,
  "The Giant woke to a linnet singing — the first bird in his garden for years.", "easy")

q(T, L, "How did the children get back into the garden?",
  ["They crept in through a little hole in the wall",
   "The Giant opened the gate and called them",
   "They climbed over the high wall",
   "The North Wind blew the wall down"], 0,
  "They had crept in through a little hole in the wall, and were sitting in the branches of "
  "the trees.", "medium")

q(T, L, "What happened to the trees when the children came back?",
  ["They covered themselves with blossoms",
   "They lost all their leaves at once",
   "They grew twice as tall",
   "They turned silver with frost"], 0,
  "The trees were so glad to have the children back that they covered themselves with "
  "blossoms.", "easy")

q(T, L, "Why was it still winter in one corner of the garden?",
  ["A little boy was too small to climb into the tree, so that tree stayed frozen",
   "The Giant had forbidden anyone to enter that corner",
   "The sun never reached that part of the garden",
   "The wall had not been knocked down there yet"], 0,
  "One little boy was so small he could not reach the branches. That tree was still covered "
  "with frost and snow, and the North Wind was blowing above it.", "medium")

q(T, L, "What did the Giant do when he saw the little boy crying?",
  ["He crept up quietly, lifted him gently into the tree",
   "He shouted at him to leave at once",
   "He fetched a ladder and left it there",
   "He called the other children to help"], 0,
  "He went softly behind him, took him gently in his hand, and put him up into the tree — "
  "which at once broke into blossom.", "medium")

q(T, L, "What did the Giant realise about himself?",
  ["That he had been selfish, and now understood why spring would not come",
   "That he was not really a giant at all",
   "That the children had been stealing his fruit",
   "That his friend the ogre had tricked him"], 0,
  "“How selfish I have been!” he said. “Now I know why the Spring would not come here.”",
  "medium")

q(T, L, "What did the Giant do with the wall?",
  ["He knocked it down", "He built it higher", "He painted it white",
   "He cut a proper gate into it"], 0,
  "He took a great axe and knocked down the wall, so the garden was the children's again.",
  "easy")

q(T, L, "What is the main lesson of the story?",
  ["Keeping good things to yourself destroys them; sharing brings them to life",
   "Children should not enter other people's gardens",
   "Walls are the best way to protect what is yours",
   "Winter is a harsher season than spring"], 0,
  "The garden dies when it is shut up and comes alive when it is shared. The Giant's happiness "
  "arrives only when the children do.", "medium")

q(T, L, "Why does the story give the Snow, the Frost and the North Wind the ability to speak "
        "and act?",
  ["To make the garden's coldness feel deliberate and alive",
   "Because the story is about the weather rather than the Giant",
   "To show that the Giant is imagining everything",
   "Because children cannot understand real weather"], 0,
  "Personifying them turns ordinary winter into something that moves in and settles, which "
  "makes the Giant's punishment feel chosen rather than accidental.", "hard")


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
print(f"\nextract sets: {dict(groups)}")
print(f"wrote {OUT}")
