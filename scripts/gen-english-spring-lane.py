#!/usr/bin/env python3
"""
Builds the bank for John Clare's sonnet "On a Lane in Spring".

    python3 scripts/gen-english-spring-lane.py

The poem is public domain — Clare died in 1864 — and the text worked from is
printed below so a question can always be checked against the line it came from.

    1  A Little Lane, the brook runs close beside
    2  And spangles in the sunshine while the fish glide swiftly by
    3  And hedges leafing with the green spring tide
    4  From out their greenery the old birds fly
    5  And chirp and whistle in the morning sun
    6  The pilewort glitters 'neath the pale blue sky
    7  The little robin has its nest begun
    8  And grass green linnets round the bushes fly
    9  How Mild the Spring Comes in; the daisy buds
   10  Lift up their golden blossoms to the sky
   11  How lovely are the pingles and the woods
   12  Here a beetle runs; and there a fly
   13  Rests on the Arum leaf in bottle green
   14  And all the Spring in this Sweet lane is seen

Two kinds of question live here, and they are NOT equally safe:

  * Word meanings and comprehension survive small differences of wording. A
    pilewort is a lesser celandine whichever edition you hold, and the fly rests
    on the arum leaf in all of them. These ship published.

  * Anything that QUOTES the poem — the alliteration and personification
    questions, and the line-explanation ones — is only as right as the text
    above. Those ship as drafts, because a misquoted line in a live paper is
    exactly the kind of error that costs a child's trust in the whole thing.
    Check them against the textbook, then publish.
"""

import json

OUT = "scripts/banks/english-spring-lane.json"
CH = "On a Lane in Spring"

BANK = []


def q(topic, label, question, options, answer, hint, difficulty, status="published",
      chapter=None, subtopic=None):
    opts = [str(o).strip() for o in options]
    assert len(opts) == 4, (question, opts)
    assert len(set(o.lower() for o in opts)) == 4, ("duplicate options", question, opts)
    assert 0 <= answer < 4, question
    assert hint, ("every question needs a hint", question)
    BANK.append({
        "grade": 6, "subject": "english", "chapter": chapter or CH,
        "topic": topic, "topicLabel": label,
        "subtopic": subtopic,
        "question": question, "options": opts, "answer": answer,
        "hint": hint, "difficulty": difficulty, "status": status,
    })


# ═════════════════════════════════════════════════════════════════════════
# 1. Word meanings — a topic of its own, as asked
# ═════════════════════════════════════════════════════════════════════════
T, L = "dictionary", "Dictionary"

WORDS = [
    ("brook", "A small stream",
     ["A narrow footpath", "A low stone wall", "A shallow pond"],
     "A brook is a small stream — smaller than a river, and in the poem it runs "
     "along beside the lane."),
    ("spangles", "Sparkles with small points of light",
     ["Splashes noisily over stones", "Spreads out into a wide pool", "Freezes at the edges"],
     "Spangles are tiny glittering ornaments, so to spangle is to glitter — the "
     "water throws back little points of sunlight."),
    ("glide", "Move along smoothly and without effort",
     ["Dart about in quick jerks", "Sink slowly to the bottom", "Swim against the current"],
     "To glide is to move smoothly, as though carried — which is why it suits "
     "fish in water and birds in air."),
    ("leafing", "Coming into leaf",
     ["Losing their leaves", "Being cut back", "Growing thorns"],
     "Leafing means putting out new leaves. It is what hedges do in spring, not "
     "in autumn."),
    ("pilewort", "A small yellow spring wildflower, the lesser celandine",
     ["A tall flowering weed with purple heads", "A climbing plant with white bells",
      "A prickly bush that fruits in autumn"],
     "Pilewort is the country name for the lesser celandine, one of the first "
     "yellow flowers of spring."),
    ("linnets", "Small brown finches that sing",
     ["Large black crows", "Water birds with long legs", "Birds of prey that hunt at night"],
     "Linnets are small singing finches. The poem calls them grass green because "
     "of the light on them among the leaves."),
    ("robin", "A small bird with a red breast",
     ["A large grey bird that cannot fly", "A bird that only sings at night",
      "A bird that lives on water"],
     "The robin is the small red-breasted bird — in the poem it has just begun "
     "building its nest."),
    ("pingles", "Small enclosed fields or narrow strips of land",
     ["Steep rocky hillsides", "Deep muddy ditches", "Wide open moors"],
     "Pingle is a country word Clare uses for a small enclosure — a little field "
     "or narrow close."),
    ("arum", "A plant with large arrow-shaped leaves",
     ["A tree with white bark", "A fruit that ripens in spring", "A kind of tall grass"],
     "The arum, also called cuckoo-pint, has broad arrow-shaped leaves — wide "
     "enough for a fly to rest on."),
]

DICT_CH, SOURCE = "Dictionary", "On a Lane in Spring"

for word, right, wrongs, hint in WORDS:
    q(T, L, f"In the poem, what does “{word}” mean?", [right, *wrongs], 0, hint, "easy",
      chapter=DICT_CH, subtopic=SOURCE)

# The same words the other way round, which is a different piece of knowing.
BACKWARDS = [
    ("Which word in the poem means a small stream?", "brook", ["pingle", "arum", "linnet"],
     "The brook is the water running close beside the lane."),
    ("Which word means to sparkle in the light?", "spangle", ["glide", "leaf", "chirp"],
     "To spangle is to throw back little points of light, like tiny ornaments."),
    ("Which word names a spring flower?", "pilewort", ["linnet", "brook", "pingle"],
     "Pilewort is the lesser celandine, a small yellow flower of early spring."),
    ("Which word names a bird?", "linnet", ["pilewort", "arum", "pingle"],
     "Linnets are small brown finches; a robin is a bird too, and both are in the poem."),
    ("Which word names a piece of land?", "pingle", ["arum", "brook", "spangle"],
     "A pingle is a small enclosure — a little field."),
    ("Which word names a plant with broad leaves?", "arum", ["linnet", "brook", "spangle"],
     "The arum has wide arrow-shaped leaves, which is why a fly can rest on one."),
]
for question, right, wrongs, hint in BACKWARDS:
    q(T, L, question, [right, *wrongs], 0, hint, "easy", chapter=DICT_CH, subtopic=SOURCE)

q(T, L, "“The hedges are leafing.” In which season would you say this?",
  ["Spring", "Autumn", "Winter", "It can be said in any season"], 0,
  "Leafing is putting out new leaves, which hedges do in spring.", "easy",
  chapter=DICT_CH, subtopic=SOURCE)

q(T, L, "A fish glides through the water. What does this tell you about how it moves?",
  ["Smoothly and easily", "Noisily and splashing", "Slowly and with great effort",
   "In short sharp jumps"], 0,
  "Gliding is smooth, effortless movement — nothing about it is jerky or laboured.", "easy", chapter=DICT_CH, subtopic=SOURCE)

q(T, L, "Why might a poet choose “brook” rather than “river”?",
  ["Because it is small, and suits a quiet country lane",
   "Because it is deeper and more dangerous",
   "Because a brook has no water in summer",
   "Because rivers cannot have fish in them"], 0,
  "A brook is small. The whole poem is about small things noticed closely in one lane.", "medium", chapter=DICT_CH, subtopic=SOURCE)

q(T, L, "Clare uses country words like pingle and pilewort. What does this tell you about him?",
  ["He wrote about the countryside he actually lived and worked in",
   "He was inventing words that had no meaning",
   "He had never seen the places he wrote about",
   "He was writing for readers in another country"], 0,
  "Clare was a farm labourer who wrote about his own fields, using the words used there.",
  "medium", chapter=DICT_CH, subtopic=SOURCE)


# ═════════════════════════════════════════════════════════════════════════
# 2. Understanding the poem
# ═════════════════════════════════════════════════════════════════════════
T, L = "spring-lane-poem", "Understanding the Poem"

q(T, L, "How does the speaker describe the brook?",
  ["It runs close beside the lane and sparkles in the sunshine",
   "It is frozen over and silent",
   "It has dried up and left only stones",
   "It is wide, deep and dangerous to cross"], 0,
  "The brook runs close beside the lane and spangles — sparkles — in the sunshine, "
  "with fish gliding by.", "easy")

q(T, L, "What are the fish doing in the brook?",
  ["Gliding swiftly by", "Leaping out of the water", "Lying still on the bottom",
   "Swimming away from the lane"], 0,
  "The fish glide swiftly by — smooth, easy movement in the sunlit water.", "easy")

q(T, L, "What do the old birds do?",
  ["They fly out from the greenery and chirp and whistle in the morning sun",
   "They sit silently in their nests all day",
   "They fly away to another country",
   "They drive the younger birds out of the hedges"], 0,
  "The old birds come out from the greenery of the hedges and chirp and whistle "
  "in the morning sun.", "easy")

q(T, L, "Where do the old birds come from?",
  ["Out of the greenery of the hedges", "From the middle of the brook",
   "From the roof of a house", "From under the arum leaves"], 0,
  "They fly from out their greenery — the hedges that are leafing with the spring.",
  "easy")

q(T, L, "Why does the speaker call the spring mild?",
  ["Because it arrives gently, with no harshness of cold or heat",
   "Because there is very little of it that year",
   "Because it brings heavy storms",
   "Because it is the shortest season"], 0,
  "Mild means gentle. Everything in the poem comes quietly to life — nothing is "
  "forced, and there is no extreme of weather anywhere in it.", "medium")

q(T, L, "“How mild the Spring comes in.” Which of these best matches that mildness?",
  ["Daisy buds opening quietly and a robin beginning its nest",
   "A gale stripping the hedges bare",
   "Snow lying thick across the lane",
   "The brook flooding over its banks"], 0,
  "The poem's images are all small and gentle — buds opening, a nest begun. "
  "That is what makes the spring mild.", "medium")

q(T, L, "Where does the fly rest?",
  ["On the arum leaf", "On the pilewort flower", "On a daisy bud", "On the surface of the brook"], 0,
  "The fly rests on the Arum leaf, which the poet says is bottle green.", "easy")

q(T, L, "What colour is the arum leaf said to be?",
  ["Bottle green", "Pale blue", "Golden yellow", "Grass green"], 0,
  "The arum leaf is bottle green — a deep, dark green, quite unlike the pale "
  "blue sky above it.", "medium")

q(T, L, "What has the little robin begun?",
  ["Its nest", "Its song", "Its journey to another country", "Its search for the brook"], 0,
  "The little robin has its nest begun — the season is early, and the work is "
  "only just started.", "easy")

q(T, L, "What do the daisy buds do?",
  ["Lift up their golden blossoms to the sky", "Close tightly against the cold",
   "Fall to the ground", "Turn away from the sun"], 0,
  "The daisy buds lift up their golden blossoms to the sky — as though raising "
  "them deliberately.", "easy")

q(T, L, "Which creatures does the speaker notice on the ground and in the air near the end?",
  ["A beetle running and a fly resting", "A fox and a hare",
   "A frog and a snake", "A mouse and an owl"], 0,
  "Here a beetle runs, and there a fly rests — two very small creatures, noticed "
  "closely.", "easy")

q(T, L, "What is the poem's setting?",
  ["A single country lane in springtime", "A garden in the middle of a city",
   "A wide river in summer", "A forest at night"], 0,
  "Everything happens in one little lane. The poem's whole method is to look "
  "hard at one small place.", "easy")

q(T, L, "The last line says all the Spring in this sweet lane is seen. What does the speaker mean?",
  ["The whole of spring can be found in this one small lane",
   "Spring will soon be over in the lane",
   "The lane is the only place where spring arrives",
   "Spring is difficult to see in the lane"], 0,
  "The claim is that one small place, looked at properly, contains the whole "
  "season — you do not need to go anywhere else.", "medium")

q(T, L, "What kind of poem is this?",
  ["A sonnet of fourteen lines", "A ballad telling a long story",
   "A limerick meant to be funny", "A play written in verse"], 0,
  "It runs to fourteen lines, which makes it a sonnet — a form Clare used often.",
  "medium")

q(T, L, "Which sense does the poet use most in this poem?",
  ["Sight", "Taste", "Touch", "Smell"], 0,
  "Almost everything is something seen — sparkling water, glittering flowers, "
  "green leaves, golden blossoms. Only the chirping and whistling is heard.",
  "medium")


# ═════════════════════════════════════════════════════════════════════════
# 3. Alliteration and personification — these QUOTE the poem, so they wait
#    for the text to be checked. See the note at the top of this file.
# ═════════════════════════════════════════════════════════════════════════
T, L = "spring-lane-devices", "Alliteration & Personification"
D = "draft"

q(T, L, "What is alliteration?",
  ["The same sound repeated at the start of words close together",
   "Two lines that end with the same sound",
   "Giving human qualities to something that is not human",
   "Comparing two things using like or as"], 0,
  "Alliteration is repetition of the opening sound — brook, bushes, blossoms — "
  "not of the ending, which would be rhyme.", "easy", D)

q(T, L, "“A Little Lane” — which sound is repeated here?",
  ["The l sound", "The a sound", "The n sound", "The t sound"], 0,
  "Little and Lane both open with l, so the l sound is repeated.", "easy", D)

q(T, L, "“And spangles in the sunshine” — what makes this alliteration?",
  ["Spangles and sunshine both begin with the s sound",
   "Spangles and sunshine rhyme with each other",
   "Both words describe the same object",
   "Both words have the same number of letters"], 0,
  "Alliteration is about the sound at the start: spangles and sunshine share s.",
  "easy", D)

q(T, L, "“And grass green linnets round the bushes fly.” Which pair alliterates?",
  ["grass and green", "linnets and round", "bushes and fly", "round and bushes"], 0,
  "Grass and green both begin with the g sound and sit side by side.", "easy", D)

q(T, L, "“The pilewort glitters 'neath the pale blue sky.” Which words alliterate?",
  ["pilewort and pale", "glitters and blue", "'neath and sky", "blue and sky"], 0,
  "Pilewort and pale both begin with p.", "medium", D)

q(T, L, "Which of these is NOT an example of alliteration?",
  ["the fish glide swiftly by", "a little lane", "grass green linnets",
   "spangles in the sunshine"], 0,
  "Glide, swiftly and by begin with three different sounds. The others each "
  "repeat an opening sound.", "medium", D)

q(T, L, "Why do poets use alliteration?",
  ["It makes a line pleasing to say and helps it stay in the memory",
   "It makes a poem longer",
   "It is the only way to make lines rhyme",
   "It hides the meaning of the poem"], 0,
  "Repeated sounds bind words together and make a line easier to remember — "
  "which is why nursery rhymes are full of it.", "medium", D)

q(T, L, "What is personification?",
  ["Describing a thing as if it were a person",
   "Repeating the first sound of nearby words",
   "Saying one thing is like another",
   "Using the same word twice in a line"], 0,
  "Personification gives human actions or feelings to something that is not "
  "human — a flower, a season, a river.", "easy", D)

q(T, L, "“The daisy buds lift up their golden blossoms to the sky.” Why is this personification?",
  ["Buds are described as lifting, which is something a person does with hands",
   "Buds are compared to gold using the word like",
   "The same sound is repeated at the start of the words",
   "The line asks the reader a question"], 0,
  "Flowers do not lift anything. Giving them that deliberate human action is "
  "what makes it personification.", "medium", D)

q(T, L, "“How mild the Spring comes in.” What makes this personification?",
  ["A season is described as coming in, as a person enters a room",
   "Spring is compared to a mild day",
   "The word Spring is repeated",
   "It uses the word how at the start"], 0,
  "Coming in is something a guest does. Treating the season as one gives it a "
  "human way of arriving.", "medium", D)

q(T, L, "Which of these lines contains personification?",
  ["The daisy buds lift up their golden blossoms to the sky",
   "The pilewort glitters 'neath the pale blue sky",
   "Here a beetle runs; and there a fly",
   "And hedges leafing with the green spring tide"], 0,
  "Glittering, running and leafing are all things those things really do. "
  "Only the buds are given a human action.", "hard", D)

q(T, L, "What is the difference between alliteration and personification?",
  ["One is about repeated sounds; the other is about giving human qualities to things",
   "One is used in poems; the other only in stories",
   "One compares two things; the other repeats a whole line",
   "There is no difference — they are two names for the same thing"], 0,
  "Alliteration is a matter of sound. Personification is a matter of meaning.",
  "medium", D)

q(T, L, "“The little robin has its nest begun.” Is this personification?",
  ["No — building a nest is something a robin really does",
   "Yes — because robins cannot build nests",
   "Yes — because the robin is called little",
   "No — because it contains alliteration instead"], 0,
  "Personification means giving a thing a quality it could not have. A robin "
  "building a nest is simply a robin doing what robins do.", "hard", D)

q(T, L, "In this poem, what does the poet's use of personification achieve?",
  ["It makes the lane feel alive and busy with its own doings",
   "It makes the poem harder to understand",
   "It shows that the poet dislikes the countryside",
   "It proves that plants can think"], 0,
  "Giving the buds and the season human actions makes the lane seem full of "
  "life going on by itself, which is the poem's whole feeling.", "hard", D)


# ═════════════════════════════════════════════════════════════════════════
from collections import Counter

with open(OUT, "w") as f:
    json.dump(BANK, f, indent=2, ensure_ascii=False)
    f.write("\n")

by_topic = Counter(x["topic"] for x in BANK)
by_status = Counter(x["status"] for x in BANK)
print(f"{len(BANK)} questions across {len(by_topic)} topics")
for t, n in by_topic.items():
    d = Counter(x["difficulty"] for x in BANK if x["topic"] == t)
    s = Counter(x["status"] for x in BANK if x["topic"] == t)
    print(f"   {n:3}  E{d['easy']:2} M{d['medium']:2} H{d['hard']:2}   {t}  [{dict(s)}]")
print(f"\nstatus: {dict(by_status)}")
print(f"wrote {OUT}")
