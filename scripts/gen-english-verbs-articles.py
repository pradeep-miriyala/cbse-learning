#!/usr/bin/env python3
"""
Builds the Class 6 English bank for verbs and articles.

Hand-written. Grammar questions are unusually easy to get subtly wrong: a verb
that is transitive in one sentence is intransitive in the next, "on the chair"
looks like an object but is not one, and the a/an rule is about sound rather
than spelling. Each of those traps is used deliberately as a distractor, so a
wrong answer tells you which rule the child has half-learned.

The target word in each sentence is marked with <b> so the question is about
the word intended and not another one in the sentence.

    python3 scripts/gen-english-verbs-articles.py
"""

import json
from collections import Counter

CHAPTER = "Verbs & Articles"
BANK = []


def Q(topic, label, question, correct, wrongs, hint, difficulty):
    """Correct answer first; prepare-bank.mjs shuffles the options on import."""
    options = [correct] + list(wrongs)
    assert len(options) == 4, (question, len(options))
    assert len(set(options)) == 4, ("duplicate options", question)
    BANK.append({
        "grade": 6, "subject": "english", "chapter": CHAPTER,
        "topic": topic, "topicLabel": label,
        "question": question, "options": options, "answer": 0,
        "hint": hint, "difficulty": difficulty,
    })


# ═══════════════════════════════════════════════════════════════════════
# 1. Transitive Verbs
# ═══════════════════════════════════════════════════════════════════════
T, L = "transitive-verbs", "Transitive Verbs"

Q(T, L, "What is a transitive verb?",
  "A verb whose action passes on to an object",
  ["A verb that describes a state of being",
   "A verb that never changes its form",
   "A verb that always comes at the end of a sentence"],
  "Ask 'what?' or 'whom?' after the verb. If there is an answer, the verb is transitive.", "easy")

Q(T, L, "In 'Meera <b>read</b> the letter', what is the object of the verb?",
  "the letter", ["Meera", "read", "There is no object"],
  "Read what? The letter.", "easy")

Q(T, L, "Which sentence contains a transitive verb?",
  "The gardener planted a sapling",
  ["The baby slept peacefully",
   "The sun rose at six",
   "My grandfather laughed loudly"],
  "Only one of these verbs has something receiving the action.", "easy")

Q(T, L, "In 'Arjun <b>kicked</b> the ball into the goal', which word is the direct object?",
  "ball", ["goal", "Arjun", "kicked"],
  "Kicked what? The ball. 'Into the goal' tells you where, not what.", "medium")

Q(T, L, "Which question do you ask to find the object of a transitive verb?",
  "'What?' or 'Whom?' after the verb",
  ["'Where?' after the verb",
   "'When?' after the verb",
   "'How?' after the verb"],
  "The object answers what or whom, never where or when.", "easy")

Q(T, L, "In 'She <b>gave</b> her sister a pencil', which is the direct object?",
  "a pencil", ["her sister", "She", "gave"],
  "Gave what? A pencil. Her sister is the indirect object — the one who received it.", "hard")

Q(T, L, "In 'The teacher <b>told</b> us a story', what is the indirect object?",
  "us", ["a story", "The teacher", "told"],
  "The indirect object is the person the action is done for or to.", "hard")

Q(T, L, "What is a verb called when it takes two objects, as in 'He sent me a letter'?",
  "A ditransitive verb",
  ["An intransitive verb",
   "A linking verb",
   "An auxiliary verb"],
  "Di- means two: an indirect object and a direct object.", "hard")

Q(T, L, "Which sentence does NOT contain a transitive verb?",
  "The old clock stopped",
  ["Ravi opened the window",
   "She wrote a poem",
   "They ate their lunch"],
  "Ask 'what?' after each verb. One of them has no answer.", "medium")

Q(T, L, "In 'The children <b>enjoyed</b> the film', which word receives the action?",
  "the film", ["The children", "enjoyed", "No word receives it"],
  "Enjoyed what? The film.", "easy")

Q(T, L, "Why is 'She sings a bhajan every morning' transitive but 'She sings beautifully' is not?",
  "In the first the verb has an object, a bhajan; in the second 'beautifully' only describes how she sings",
  ["The first is in the present tense and the second is not",
   "'Sings' changes its meaning between the two",
   "The second has no verb at all"],
  "The same verb can be transitive in one sentence and intransitive in another.", "hard")

Q(T, L, "In 'Grandmother <b>cooked</b> us a delicious meal', which is the direct object?",
  "a delicious meal", ["us", "Grandmother", "cooked"],
  "Cooked what? The meal. 'Us' is who it was cooked for.", "hard")

Q(T, L, "Which of these verbs is most often transitive?",
  "buy", ["arrive", "sleep", "fall"],
  "You must buy something; you do not arrive something.", "medium")

Q(T, L, "In 'Ali <b>painted</b> the fence yesterday', what is the object?",
  "the fence", ["yesterday", "Ali", "painted"],
  "'Yesterday' answers when, not what.", "medium")

Q(T, L, "Complete the rule: a transitive verb needs …",
  "an object to complete its meaning",
  ["an adverb to complete its meaning",
   "a preposition before it",
   "two subjects"],
  "'She brought' feels unfinished until you say what she brought.", "medium")

Q(T, L, "In 'The committee <b>chose</b> Priya', which word is the object?",
  "Priya", ["The committee", "chose", "There is no object"],
  "Chose whom? Priya. An object can be a person.", "medium")

Q(T, L, "Which sentence uses a transitive verb correctly with its object?",
  "The dog chased the postman",
  ["The dog chased quickly",
   "The dog chased in the garden",
   "The dog chased loudly"],
  "Only one option answers 'chased whom or what?'.", "medium")

Q(T, L, "In 'We <b>watched</b> the match on television', which is the direct object?",
  "the match", ["television", "We", "watched"],
  "'On television' tells you where you watched it.", "hard")

Q(T, L, "Why can a phrase like 'to the market' never be the object of a verb?",
  "It begins with a preposition, so it tells you where rather than what",
  ["It is too long to be an object",
   "It contains the word 'the'",
   "Objects must always be single words"],
  "Objects answer what or whom; prepositional phrases answer where, when or how.", "hard")

Q(T, L, "In 'The rain <b>spoilt</b> our picnic', what receives the action of the verb?",
  "our picnic", ["The rain", "spoilt", "Nothing receives it"],
  "Spoilt what? The picnic.", "easy")

# ═══════════════════════════════════════════════════════════════════════
# 2. Intransitive Verbs
# ═══════════════════════════════════════════════════════════════════════
T, L = "intransitive-verbs", "Intransitive Verbs"

Q(T, L, "What is an intransitive verb?",
  "A verb whose action does not pass on to any object",
  ["A verb that has two objects",
   "A verb that must have an adjective after it",
   "A verb used only in questions"],
  "Ask 'what?' after it and you get no answer.", "easy")

Q(T, L, "Which sentence contains an intransitive verb?",
  "The baby smiled",
  ["She closed the door",
   "He kicked the ball",
   "They built a house"],
  "Only one of these verbs has nothing receiving its action.", "easy")

Q(T, L, "In 'The old man <b>coughed</b> loudly', what kind of word is 'loudly'?",
  "An adverb telling how he coughed, not an object",
  ["The direct object of the verb",
   "The subject of the sentence",
   "An indirect object"],
  "Adverbs answer how, when or where — never what or whom.", "medium")

Q(T, L, "In 'The children <b>played</b> in the park', why is 'in the park' not an object?",
  "It is a prepositional phrase telling where they played",
  ["It comes after the verb, so it must be an object",
   "It is the subject of the sentence",
   "It is an adjective describing the children"],
  "Played what? There is no answer, so the verb is intransitive here.", "hard")

Q(T, L, "Which of these verbs is normally intransitive?",
  "arrive", ["carry", "throw", "build"],
  "You arrive; you do not arrive something.", "medium")

Q(T, L, "In 'The train <b>departed</b> at noon', is the verb transitive or intransitive?",
  "Intransitive, because nothing receives the action",
  ["Transitive, because 'noon' is the object",
   "Transitive, because 'the train' is the object",
   "It is neither"],
  "'At noon' tells you when, not what.", "medium")

Q(T, L, "Which sentence uses an intransitive verb?",
  "The sun set behind the hills",
  ["She set the table",
   "He set a new record",
   "They set the alarm"],
  "The same verb 'set' is transitive in three of these and intransitive in one.", "hard")

Q(T, L, "Why can 'sleep' not normally take an object?",
  "Sleeping is something you do, not something you do to anything",
  ["Because it is a short word",
   "Because it is always in the past tense",
   "Because it is an auxiliary verb"],
  "Try 'I slept the bed' and hear how wrong it sounds.", "medium")

Q(T, L, "In 'My sister <b>laughed</b> at the joke', which is true?",
  "The verb is intransitive; 'at the joke' is a prepositional phrase",
  ["'The joke' is the direct object",
   "'My sister' is the object",
   "The verb has two objects"],
  "She laughed — at what she laughed is extra information.", "hard")

Q(T, L, "Which of these can be BOTH transitive and intransitive, depending on the sentence?",
  "run", ["arrive", "vanish", "exist"],
  "'He runs fast' and 'He runs a bakery' use the same verb differently.", "hard")

Q(T, L, "In 'The glass <b>fell</b> from the table', is there an object?",
  "No, the verb is intransitive",
  ["Yes, 'the table' is the object",
   "Yes, 'the glass' is the object",
   "Yes, 'from' is the object"],
  "The glass fell — nothing was fallen.", "medium")

Q(T, L, "How can you test whether a verb is intransitive in a sentence?",
  "Ask 'what?' or 'whom?' after it; if there is no answer, it is intransitive",
  ["Check whether it ends in -ed",
   "See whether the sentence is long",
   "Count the words before the verb"],
  "The test is the same one used for transitive verbs, read the other way.", "medium")

Q(T, L, "Which sentence has an intransitive verb?",
  "Birds fly south in winter",
  ["Pilots fly aeroplanes",
   "She flew a kite",
   "He flies drones for a living"],
  "In three of them something is being flown.", "hard")

Q(T, L, "In 'Everyone <b>waited</b> patiently', the verb is intransitive because …",
  "nothing receives the action of waiting",
  ["'patiently' is the object",
   "'everyone' is the object",
   "the sentence has no subject"],
  "'Patiently' answers how.", "easy")

Q(T, L, "Which pair of sentences shows the same verb used transitively and then intransitively?",
  "She grows tomatoes / The plant grows quickly",
  ["She reads books / She reads novels",
   "He built a shed / He built a wall",
   "They ate rice / They ate chapatis"],
  "Look for the pair where one sentence has an object and the other does not.", "hard")

Q(T, L, "In 'The lights <b>flickered</b> during the storm', which is correct?",
  "The verb is intransitive and 'during the storm' tells when",
  ["'The storm' is the direct object",
   "'The lights' is the object",
   "The verb takes two objects"],
  "Nothing was flickered.", "medium")

Q(T, L, "Why do intransitive verbs never appear in the passive voice?",
  "There is no object to become the subject of a passive sentence",
  ["Because they are always in the present tense",
   "Because they are short words",
   "Because they cannot follow a subject"],
  "'The ball was kicked' works because 'kick' had an object. 'Was slept' does not.", "hard")

Q(T, L, "In 'The audience <b>clapped</b> after the performance', the verb is …",
  "intransitive", ["transitive", "an auxiliary verb", "a linking verb"],
  "Clapped what? Nothing.", "easy")

Q(T, L, "Which sentence would need an object added to be complete?",
  "The carpenter repaired",
  ["The baby giggled",
   "The bell rang",
   "The visitors left"],
  "Three of these make sense alone; one leaves you asking 'repaired what?'.", "hard")

Q(T, L, "What is the simplest difference between transitive and intransitive verbs?",
  "A transitive verb has an object; an intransitive verb does not",
  ["A transitive verb is longer than an intransitive one",
   "A transitive verb is always in the past tense",
   "An intransitive verb has two subjects"],
  "Everything else follows from that one difference.", "easy")

# ═══════════════════════════════════════════════════════════════════════
# 3. Subject Complements
# ═══════════════════════════════════════════════════════════════════════
T, L = "subject-complements", "Subject Complements"

Q(T, L, "What is a subject complement?",
  "A word or phrase after a linking verb that renames or describes the subject",
  ["A word that receives the action of a verb",
   "A verb that helps the main verb",
   "A word that describes how an action is done"],
  "It completes the meaning of the subject, not of an action.", "medium")

Q(T, L, "In 'Radha is a <b>dancer</b>', what is 'dancer'?",
  "A subject complement renaming Radha",
  ["The direct object of the verb",
   "An adverb",
   "An auxiliary verb"],
  "Radha and dancer are the same person.", "easy")

Q(T, L, "In 'The soup tastes <b>delicious</b>', what is 'delicious'?",
  "A subject complement describing the soup",
  ["The object of 'tastes'",
   "An adverb describing how the soup tastes",
   "The subject of the sentence"],
  "It tells you what the soup is like.", "medium")

Q(T, L, "Which of these is a linking verb?",
  "seem", ["throw", "carry", "build"],
  "Linking verbs join a subject to a word that describes it.", "easy")

Q(T, L, "Which sentence contains a subject complement?",
  "My uncle became a teacher",
  ["My uncle taught mathematics",
   "My uncle wrote a letter",
   "My uncle repaired the fan"],
  "Look for the sentence where the word after the verb is the same person as the subject.", "medium")

Q(T, L, "What two kinds of word can act as a subject complement?",
  "A noun and an adjective",
  ["A verb and an adverb",
   "A preposition and a conjunction",
   "An article and a pronoun"],
  "Either it renames the subject or it describes it.", "medium")

Q(T, L, "In 'The night grew <b>cold</b>', what does 'cold' do?",
  "It describes the subject, the night",
  ["It receives the action of growing",
   "It tells you how the night grew",
   "It is the subject of the sentence"],
  "'Grew' here is a linking verb, not an action.", "hard")

Q(T, L, "Why is 'happy' a subject complement in 'She looks happy' but not an object?",
  "'Looks' is a linking verb here, and 'happy' describes her rather than receiving an action",
  ["Because 'happy' is an adjective and objects must be adjectives",
   "Because 'happy' comes at the end of the sentence",
   "Because 'she' is a pronoun"],
  "Nothing is being looked in this sentence.", "hard")

Q(T, L, "In 'The winner was <b>Kabir</b>', what is 'Kabir'?",
  "A subject complement", ["A direct object", "An indirect object", "An adverb"],
  "The winner and Kabir are one and the same.", "medium")

Q(T, L, "Which verb in this list is NOT normally a linking verb?",
  "kick", ["appear", "remain", "become"],
  "Three of them join a subject to a description; one is a plain action.", "medium")

Q(T, L, "In 'She looked at the painting', is 'the painting' a subject complement?",
  "No, because 'looked at' is an action here and the painting is not the same as she",
  ["Yes, because it comes after the verb",
   "Yes, because 'looked' is always a linking verb",
   "Yes, because the painting describes her"],
  "Test it: is she the painting? No — so it cannot be a subject complement.", "hard")

Q(T, L, "What is the test for a subject complement?",
  "Ask whether the word renames or describes the subject",
  ["Ask whether it comes after the verb",
   "Ask whether it is a noun",
   "Ask whether the sentence is long"],
  "Position alone proves nothing; objects come after verbs too.", "hard")

Q(T, L, "In 'My brother is <b>tall</b>', 'tall' is which kind of subject complement?",
  "An adjective describing the subject",
  ["A noun renaming the subject",
   "An adverb",
   "A second subject"],
  "It tells you what he is like, not who he is.", "easy")

Q(T, L, "In 'Delhi remains the <b>capital</b>', which word is the subject complement?",
  "capital", ["Delhi", "remains", "the"],
  "Delhi and the capital are the same place.", "medium")

Q(T, L, "Why do linking verbs not take objects?",
  "They do not express an action that anything can receive",
  ["Because they are always short",
   "Because they come at the start of a sentence",
   "Because they have no tense"],
  "'Is' does nothing to anything.", "hard")

Q(T, L, "Which sentence has an adjective as a subject complement?",
  "The mangoes are ripe",
  ["The mangoes fell from the tree",
   "She bought the mangoes",
   "He sliced the mangoes"],
  "Look for the sentence where the word after the verb describes the subject.", "medium")

Q(T, L, "In 'The music sounded <b>strange</b>', which is correct?",
  "'Sounded' is a linking verb and 'strange' describes the music",
  ["'Strange' is the object of 'sounded'",
   "'Strange' is an adverb",
   "'The music' is the complement"],
  "Try replacing 'sounded' with 'was' — if it still makes sense, it is linking.", "hard")

Q(T, L, "Which sentence uses a linking verb?",
  "The room feels warm",
  ["She feels the cloth carefully",
   "He felt the wall for a switch",
   "They felt their way in the dark"],
  "In three of them somebody is touching something.", "hard")

Q(T, L, "Complete the sentence with a subject complement: 'The answer seemed …'",
  "obvious", ["quickly", "the paper", "carefully"],
  "You need a word that describes the answer.", "medium")

Q(T, L, "What is the main job of a subject complement?",
  "To complete the meaning of the subject after a linking verb",
  ["To receive the action of a transitive verb",
   "To join two sentences together",
   "To describe how an action was done"],
  "The subject is left unfinished without it: 'She is …' what?", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 4. Object Complements
# ═══════════════════════════════════════════════════════════════════════
T, L = "object-complements", "Object Complements"

Q(T, L, "What is an object complement?",
  "A word after the direct object that renames or describes that object",
  ["A word that describes the subject",
   "A verb that helps the main verb",
   "A second subject in the sentence"],
  "It completes the meaning of the object, not the subject.", "medium")

Q(T, L, "In 'They elected him <b>captain</b>', what is 'captain'?",
  "An object complement renaming 'him'",
  ["A subject complement",
   "The direct object",
   "An adverb"],
  "Him and captain are the same person.", "medium")

Q(T, L, "In 'She painted the wall <b>blue</b>', what does 'blue' do?",
  "It describes the wall, which is the direct object",
  ["It describes the subject, she",
   "It tells you how she painted",
   "It is the direct object"],
  "The wall became blue, so it describes the object.", "medium")

Q(T, L, "In 'We named our puppy <b>Moti</b>', which word is the direct object?",
  "puppy", ["Moti", "We", "named"],
  "Named what? The puppy. Moti is what we named it.", "hard")

Q(T, L, "What is the difference between a subject complement and an object complement?",
  "One describes the subject after a linking verb; the other describes the direct object",
  ["One is a noun and the other is always an adjective",
   "One comes first in the sentence and the other last",
   "There is no real difference"],
  "Ask which word it is describing.", "hard")

Q(T, L, "Which sentence contains an object complement?",
  "The class made him monitor",
  ["The class made a poster",
   "He made tea for everyone",
   "She made a mistake"],
  "Look for the sentence where a word after the object renames that object.", "hard")

Q(T, L, "In 'The judges declared her the <b>winner</b>', which is the object complement?",
  "winner", ["her", "judges", "declared"],
  "'Her' is the object; 'winner' says what she was declared to be.", "medium")

Q(T, L, "Which verbs commonly take an object complement?",
  "call, name, elect, consider, make",
  ["run, sleep, arrive, fall",
   "is, was, seem, become",
   "can, may, must, should"],
  "These are verbs of naming, choosing and considering.", "hard")

Q(T, L, "In 'Everyone considers Meera <b>honest</b>', what kind of word is the object complement?",
  "An adjective describing Meera",
  ["A noun renaming Meera",
   "An adverb",
   "A verb"],
  "It tells you what she is like, not who she is.", "medium")

Q(T, L, "Why can a sentence with an object complement never have an intransitive verb?",
  "There must be a direct object first, and only transitive verbs take objects",
  ["Because intransitive verbs are too short",
   "Because object complements are always adjectives",
   "Because intransitive verbs have no tense"],
  "No object means nothing for the complement to describe.", "hard")

Q(T, L, "In 'They found the film <b>boring</b>', which word is the direct object?",
  "the film", ["boring", "They", "found"],
  "Found what? The film. 'Boring' says what they found it to be.", "medium")

Q(T, L, "Which sentence has an object complement rather than an indirect object?",
  "The school appointed her head girl",
  ["The school gave her a prize",
   "The school sent her a letter",
   "The school offered her a place"],
  "In three of them 'her' receives something; in one, 'her' becomes something.", "hard")

Q(T, L, "In 'The heat turned the milk <b>sour</b>', what does 'sour' describe?",
  "the milk", ["the heat", "turned", "the sentence as a whole"],
  "The milk became sour.", "medium")

Q(T, L, "Complete with an object complement: 'His friends call him …'",
  "Chotu", ["quickly", "to the shop", "yesterday"],
  "You need a name or description for 'him'.", "medium")

Q(T, L, "In 'We kept the door <b>open</b>', what is 'open'?",
  "An object complement describing the door",
  ["An adverb telling how we kept it",
   "The direct object",
   "A subject complement"],
  "The door was kept in an open state.", "hard")

Q(T, L, "Which is the correct order in a sentence with an object complement?",
  "Subject, verb, direct object, object complement",
  ["Subject, object complement, verb, direct object",
   "Direct object, subject, verb, object complement",
   "Verb, subject, object complement, direct object"],
  "The complement follows the object it describes.", "hard")

Q(T, L, "In 'They made the room <b>tidy</b>', which is true?",
  "'The room' is the object and 'tidy' is the object complement",
  ["'Tidy' is the object and 'the room' is the complement",
   "'They' is the object",
   "There is no object in the sentence"],
  "Made what? The room. And what did it become? Tidy.", "medium")

Q(T, L, "Why is 'a doctor' NOT an object complement in 'She became a doctor'?",
  "'Became' is a linking verb, so 'a doctor' describes the subject, not an object",
  ["Because 'a doctor' is two words",
   "Because 'became' is in the past tense",
   "Because 'she' is a pronoun"],
  "There is no direct object in the sentence at all.", "hard")

Q(T, L, "In 'The villagers chose him <b>sarpanch</b>', which word could the complement be replaced by to test it?",
  "'to be sarpanch', since the complement says what he was chosen to be",
  ["'quickly', since it describes the choosing",
   "'yesterday', since it tells when",
   "'in the village', since it tells where"],
  "If 'to be' can be slipped in before it, it is an object complement.", "hard")

Q(T, L, "What is the main job of an object complement?",
  "To complete the meaning of the direct object",
  ["To complete the meaning of the subject",
   "To join two clauses",
   "To show the tense of the verb"],
  "'They elected him' is unfinished until you say what they elected him as.", "medium")

# The concept is a hard one, and the topic came out with no easy questions at
# all — which would leave the Warm-up preset unable to draw anything from it.
Q(T, L, "In 'We call our teacher <b>Sir</b>', which word is the object complement?",
  "Sir", ["teacher", "We", "call"],
  "'Our teacher' is the object; 'Sir' is what we call him.", "easy")

Q(T, L, "An object complement always comes after which part of the sentence?",
  "The direct object", ["The subject", "The auxiliary verb", "The adverb"],
  "It describes the object, so it follows it.", "easy")

Q(T, L, "In 'She made her son <b>happy</b>', which words does 'happy' describe?",
  "her son", ["She", "made", "the whole sentence"],
  "Her son became happy.", "easy")

Q(T, L, "Which kinds of word can act as an object complement?",
  "A noun or an adjective",
  ["Only a verb",
   "Only an adverb",
   "Only a preposition"],
  "Either it renames the object or it describes it.", "easy")

# ═══════════════════════════════════════════════════════════════════════
# 5. Auxiliary Verbs
# ═══════════════════════════════════════════════════════════════════════
T, L = "auxiliary-verbs", "Auxiliary Verbs"

Q(T, L, "What is an auxiliary verb?",
  "A verb that helps the main verb to form a tense, a question or a negative",
  ["A verb that describes an action all by itself",
   "A verb that always takes an object",
   "A verb that describes the subject"],
  "Auxiliary means helping.", "easy")

Q(T, L, "Which are the three primary auxiliary verbs?",
  "be, have and do",
  ["can, may and must",
   "run, walk and jump",
   "is, was and were"],
  "'Is' and 'was' are forms of 'be', not separate auxiliaries.", "medium")

Q(T, L, "In 'She <b>is</b> writing a letter', which word is the main verb?",
  "writing", ["is", "She", "letter"],
  "'Is' is doing the helping; 'writing' carries the meaning.", "easy")

Q(T, L, "In '<b>Do</b> you play the flute?', what job is 'do' doing?",
  "Helping to form a question",
  ["Acting as the main verb",
   "Describing the subject",
   "Joining two sentences"],
  "English uses 'do' to turn many statements into questions.", "medium")

Q(T, L, "In 'He <b>has</b> finished his homework', which tense does the auxiliary help to form?",
  "The present perfect",
  ["The simple past",
   "The future",
   "The present continuous"],
  "'Has' plus a past participle gives the present perfect.", "hard")

Q(T, L, "Which sentence uses 'have' as a main verb rather than an auxiliary?",
  "They have two dogs",
  ["They have finished lunch",
   "They have been waiting",
   "They have seen that film"],
  "In one sentence 'have' means to possess; in the others it helps another verb.", "hard")

Q(T, L, "In 'The window <b>was</b> broken by the storm', what does the auxiliary help to form?",
  "The passive voice",
  ["A question",
   "The future tense",
   "A command"],
  "'Was' plus a past participle turns the object into the subject.", "hard")

Q(T, L, "Which sentence uses an auxiliary verb to make a negative?",
  "I do not like bitter gourd",
  ["I like bitter gourd",
   "Bitter gourd is a vegetable",
   "She cooked bitter gourd"],
  "'Do' is added so that 'not' has something to attach to.", "medium")

Q(T, L, "In 'They <b>were</b> playing outside', which is the auxiliary?",
  "were", ["playing", "They", "outside"],
  "It helps 'playing' form the past continuous.", "easy")

Q(T, L, "What follows the auxiliary 'is' in the present continuous tense?",
  "A verb ending in -ing",
  ["A verb in the past tense",
   "A noun",
   "An adjective"],
  "'She is reading', 'He is running'.", "medium")

Q(T, L, "In 'Did she call you?', why is the main verb 'call' and not 'called'?",
  "Because the auxiliary 'did' already carries the past tense",
  ["Because 'call' is shorter",
   "Because questions never use the past tense",
   "Because 'she' is a pronoun"],
  "The tense is shown once, by the helper.", "hard")

Q(T, L, "Which sentence uses 'be' as a main verb?",
  "She is a nurse",
  ["She is working",
   "She is being helped",
   "She is going home"],
  "In one of them nothing else is being helped.", "hard")

Q(T, L, "How many verbs are there in 'He <b>has been</b> waiting'?",
  "Three — two auxiliaries and one main verb",
  ["One", "Two", "Four"],
  "'Has' and 'been' both help 'waiting'.", "hard")

Q(T, L, "Which auxiliary is used to form a question from 'She likes mangoes'?",
  "does", ["is", "has", "was"],
  "'Does she like mangoes?'", "medium")

Q(T, L, "In 'We <b>are</b> going to Chennai', what would the sentence become without the auxiliary?",
  "Incomplete, because 'going' cannot stand alone as the verb here",
  ["Exactly the same in meaning",
   "A question",
   "A command"],
  "'We going to Chennai' is not a sentence.", "hard")

Q(T, L, "Which of these is NOT a form of the auxiliary 'be'?",
  "had", ["am", "were", "being"],
  "'Had' belongs to 'have'.", "medium")

Q(T, L, "In 'The rice <b>is</b> cooked', which is true?",
  "'Is' is an auxiliary helping to form the passive",
  ["'Is' is the main verb of the sentence",
   "'Cooked' is an auxiliary",
   "There is no verb in the sentence"],
  "Somebody cooked the rice; the sentence hides who.", "hard")

Q(T, L, "Why is 'do' called a primary auxiliary?",
  "Because it is one of the three helpers that can also work as a main verb",
  ["Because it is the most important word in English",
   "Because it comes first in the dictionary",
   "Because it is always used in questions"],
  "'I do my homework' uses it as a main verb.", "hard")

Q(T, L, "Which sentence has NO auxiliary verb?",
  "The bell rang loudly",
  ["The bell was ringing",
   "The bell has rung",
   "Did the bell ring?"],
  "One of these has a single verb standing on its own.", "medium")

Q(T, L, "What is the main use of auxiliary verbs in English?",
  "To show tense, form questions and negatives, and build the passive voice",
  ["To describe nouns",
   "To join two sentences together",
   "To show where something happened"],
  "They carry the grammar while the main verb carries the meaning.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 6. Modal Verbs
# ═══════════════════════════════════════════════════════════════════════
T, L = "modal-verbs", "Modal Verbs"

Q(T, L, "What is a modal verb?",
  "A helping verb that shows ability, permission, possibility or obligation",
  ["A verb that shows only past time",
   "A verb that always takes an object",
   "A verb that names a person"],
  "Can, may, must, should and will are all modals.", "easy")

Q(T, L, "In 'She <b>can</b> swim', what does the modal express?",
  "Ability", ["Obligation", "Permission refused", "A past action"],
  "It tells you she is able to.", "easy")

Q(T, L, "Which modal is normally used to ask for permission politely?",
  "may", ["must", "shall", "would rather"],
  "'May I come in?' is the polite form.", "medium")

Q(T, L, "In 'You <b>must</b> wear a helmet', what does the modal express?",
  "A strong obligation", ["A possibility", "An ability", "A polite request"],
  "It leaves no real choice.", "easy")

Q(T, L, "What form of the verb follows a modal?",
  "The base form, with no 'to' and no -s",
  ["The -ing form",
   "The past participle",
   "The form ending in -s"],
  "'She can swim', never 'She can swims'.", "medium")

Q(T, L, "Which sentence uses a modal correctly?",
  "He should go now",
  ["He should goes now",
   "He should to go now",
   "He should going now"],
  "A modal is followed by the plain form of the verb.", "medium")

Q(T, L, "In 'It <b>might</b> rain this evening', what does the modal express?",
  "A possibility that is not certain",
  ["A certainty",
   "An obligation",
   "A permission"],
  "'Might' is weaker than 'will'.", "medium")

Q(T, L, "Why do modals not add -s in the third person?",
  "Because modals do not change their form for the subject",
  ["Because they are always in the past tense",
   "Because they never begin a sentence",
   "Because they are nouns"],
  "'She can', 'he can', 'they can' — the modal never moves.", "hard")

Q(T, L, "Which of these expresses advice rather than obligation?",
  "You should rest for a while",
  ["You must rest for a while",
   "You have to rest for a while",
   "You are required to rest"],
  "'Should' recommends; 'must' commands.", "hard")

Q(T, L, "In '<b>Could</b> you pass the salt?', what is the modal doing?",
  "Making a polite request",
  ["Describing an ability in the past",
   "Giving an order",
   "Expressing certainty"],
  "'Could' softens the request even though it looks like a past form.", "hard")

Q(T, L, "Which sentence expresses ability in the past?",
  "She could read before she was four",
  ["She can read very well",
   "She may read the notice",
   "She must read the chapter"],
  "'Could' is the past of 'can' when it means ability.", "hard")

Q(T, L, "Which is NOT a modal verb?",
  "have", ["shall", "would", "ought to"],
  "'Have' is a primary auxiliary, not a modal.", "medium")

Q(T, L, "In 'Students <b>must not</b> run in the corridor', what is being expressed?",
  "A prohibition", ["A suggestion", "A possibility", "An ability"],
  "It forbids rather than advises.", "medium")

Q(T, L, "Which modal is used with 'to' before the main verb?",
  "ought to", ["can", "must", "should"],
  "'You ought to apologise' — the only common modal that keeps 'to'.", "hard")

Q(T, L, "What is the difference between 'may' and 'might' in 'It may rain' and 'It might rain'?",
  "'Might' suggests a smaller chance than 'may'",
  ["'Might' is the past tense of 'may' here",
   "They mean exactly the same thing",
   "'Might' is used only in questions"],
  "Both are possible; one is less likely.", "hard")

Q(T, L, "Which sentence uses 'shall' in its traditional way?",
  "Shall I open the window?",
  ["Shall you open the window?",
   "He shall opening the window",
   "Shall opened the window"],
  "'Shall' is used with I and we, often to offer or suggest.", "hard")

Q(T, L, "In 'You <b>needn't</b> come early', what is expressed?",
  "That something is not necessary",
  ["That something is forbidden",
   "That something is certain",
   "That something is possible"],
  "It removes an obligation rather than creating one.", "hard")

Q(T, L, "Which modal would you use to express near certainty about the present?",
  "must, as in 'She must be tired after that journey'",
  ["might, as in 'She might be tired'",
   "can, as in 'She can be tired'",
   "shall, as in 'She shall be tired'"],
  "'Must' can express a strong conclusion as well as an obligation.", "hard")

Q(T, L, "Choose the correct sentence.",
  "Children may borrow two books at a time",
  ["Children may to borrow two books at a time",
   "Children may borrowing two books at a time",
   "Children mays borrow two books at a time"],
  "Modal plus base form, with no additions.", "medium")

Q(T, L, "What do all modal verbs have in common?",
  "They help the main verb and never change their form for the subject",
  ["They all describe past actions",
   "They can all be used as main verbs",
   "They all end in -ould"],
  "That is what separates them from 'be', 'have' and 'do'.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 7. Indefinite Articles: A and An
# ═══════════════════════════════════════════════════════════════════════
T, L = "indefinite-articles", "Indefinite Articles: A & An"

Q(T, L, "Which two words are the indefinite articles in English?",
  "a and an", ["the and a", "the and an", "this and that"],
  "'The' is the definite article; these two are indefinite.", "easy")

Q(T, L, "What decides whether you write 'a' or 'an'?",
  "The sound at the start of the next word, not its spelling",
  ["Whether the next word begins with a vowel letter",
   "Whether the noun is singular or plural",
   "The length of the next word"],
  "It is a rule about the ear, not the eye.", "medium")

Q(T, L, "Choose the correct form: '___ hour'",
  "an hour", ["a hour", "the hour is the only correct form", "either is equally correct"],
  "The 'h' is silent, so the word begins with a vowel sound.", "medium")

Q(T, L, "Choose the correct form: '___ university'",
  "a university", ["an university", "either is correct", "no article is needed"],
  "It begins with a 'yoo' sound, which is a consonant sound.", "hard")

Q(T, L, "Choose the correct form: '___ honest man'",
  "an honest man", ["a honest man", "the honest man is the only option", "no article is needed"],
  "The 'h' in honest is not pronounced.", "medium")

Q(T, L, "Choose the correct form: '___ umbrella'",
  "an umbrella", ["a umbrella", "either is correct", "no article is needed"],
  "It begins with a clear vowel sound.", "easy")

Q(T, L, "Choose the correct form: '___ one-rupee coin'",
  "a one-rupee coin", ["an one-rupee coin", "either is correct", "no article is needed"],
  "'One' is pronounced 'wun', which begins with a consonant sound.", "hard")

Q(T, L, "Choose the correct form: '___ MP visited our school'",
  "An MP", ["A MP", "The MP is the only option", "No article is needed"],
  "The letter M is read aloud as 'em', a vowel sound.", "hard")

Q(T, L, "With which kind of noun are 'a' and 'an' used?",
  "A singular countable noun",
  ["A plural noun",
   "An uncountable noun",
   "Any noun at all"],
  "You cannot say 'a books' or 'a water'.", "medium")

Q(T, L, "Why is 'a' used in 'She bought a book' rather than 'the'?",
  "Because the book has not been mentioned before and is not a particular one",
  ["Because 'book' begins with a consonant",
   "Because the sentence is in the past tense",
   "Because 'she' is a pronoun"],
  "Indefinite means not specified.", "medium")

Q(T, L, "Choose the correct form: '___ European country'",
  "a European country", ["an European country", "either is correct", "no article is needed"],
  "'European' begins with a 'yoo' sound.", "hard")

Q(T, L, "Which sentence uses the indefinite article correctly?",
  "He is an engineer",
  ["He is a engineer",
   "He is an engineers",
   "He is engineer"],
  "'Engineer' begins with a vowel sound, and the noun is singular.", "easy")

Q(T, L, "Choose the correct form: '___ useful tool'",
  "a useful tool", ["an useful tool", "either is correct", "no article is needed"],
  "'Useful' begins with a 'yoo' sound, like university.", "hard")

Q(T, L, "In which sentence is the article used to mean 'one'?",
  "I waited for an hour",
  ["The hour passed slowly",
   "Hours went by",
   "This hour is over"],
  "'An hour' here means a single hour.", "medium")

Q(T, L, "Choose the correct form: '___ X-ray was taken'",
  "An X-ray", ["A X-ray", "The X-ray is the only option", "No article is needed"],
  "X is read aloud as 'eks', which begins with a vowel sound.", "hard")

Q(T, L, "Which sentence needs NO article?",
  "She drinks milk every morning",
  ["She bought book",
   "He is teacher",
   "I saw elephant"],
  "'Milk' is uncountable, so no indefinite article is used.", "hard")

Q(T, L, "Choose the correct form: '___ honour to meet you'",
  "an honour", ["a honour", "either is correct", "no article is needed"],
  "Another silent 'h'.", "medium")

Q(T, L, "Which is correct: 'He works as ___ nurse'?",
  "a nurse", ["an nurse", "the nurse", "nurse without any article"],
  "'Nurse' begins with a consonant sound, and jobs take an article.", "easy")

Q(T, L, "Why do we say 'an FIR' rather than 'a FIR'?",
  "Because F is read aloud as 'ef', which begins with a vowel sound",
  ["Because FIR is an important word",
   "Because FIR is plural",
   "Because all abbreviations take 'an'"],
  "Say the letters aloud and listen to the first sound.", "hard")

Q(T, L, "What is the simplest rule for choosing between 'a' and 'an'?",
  "Say the next word aloud: a vowel sound takes 'an', a consonant sound takes 'a'",
  ["Look at whether the next letter is a vowel",
   "Use 'an' before long words and 'a' before short ones",
   "Use 'a' in speech and 'an' in writing"],
  "Sound, not spelling — that is why 'an hour' and 'a university' both work.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 8. The Definite Article: The
# ═══════════════════════════════════════════════════════════════════════
T, L = "definite-article", "The Definite Article: The"

Q(T, L, "What is the definite article in English?",
  "the", ["a", "an", "this"],
  "There is only one definite article.", "easy")

Q(T, L, "When is 'the' used?",
  "When the thing referred to is particular or already known to the listener",
  ["Only before plural nouns",
   "Only at the start of a sentence",
   "Before every noun in a sentence"],
  "Definite means the listener knows which one you mean.", "easy")

Q(T, L, "Why is 'the' correct in 'I bought a book. <b>The</b> book was expensive'?",
  "Because the book has already been mentioned, so it is now a particular one",
  ["Because 'book' begins with a consonant",
   "Because the sentence is in the past tense",
   "Because 'the' always follows 'a'"],
  "First mention takes 'a'; later mentions take 'the'.", "medium")

Q(T, L, "Which of these normally takes 'the'?",
  "the sun", ["a sun", "an sun", "sun without any article"],
  "There is only one, so it is definite.", "easy")

Q(T, L, "Which is correct?",
  "the Himalayas", ["a Himalayas", "an Himalayas", "Himalayas without an article"],
  "Mountain ranges take 'the'.", "medium")

Q(T, L, "Which is correct?",
  "Mount Everest", ["the Mount Everest", "a Mount Everest", "an Mount Everest"],
  "A single mountain does not take 'the', though a range does.", "hard")

Q(T, L, "Which is correct?",
  "the Ganga", ["a Ganga", "Ganga takes no article at all", "an Ganga"],
  "Rivers take 'the'.", "medium")

Q(T, L, "Which sentence uses 'the' correctly with a superlative?",
  "She is the tallest girl in the class",
  ["She is tallest girl in the class",
   "She is a tallest girl in the class",
   "She is an tallest girl in the class"],
  "Superlatives point to one particular thing, so they take 'the'.", "medium")

Q(T, L, "Which is correct?",
  "He plays the sitar",
  ["He plays a sitar every evening in the same way",
   "He plays sitar in the orchestra of the school",
   "He plays an sitar"],
  "Musical instruments take 'the' after 'play'.", "hard")

Q(T, L, "Which country name normally takes 'the'?",
  "the Netherlands", ["India", "Japan", "Brazil"],
  "A few country names, usually plural or containing a common noun, take 'the'.", "hard")

Q(T, L, "Which sentence is correct?",
  "We have lunch at one o'clock",
  ["We have the lunch at one o'clock",
   "We have a lunch at one o'clock",
   "We have an lunch at one o'clock"],
  "Names of meals normally take no article.", "hard")

Q(T, L, "Which sentence is correct?",
  "She speaks English fluently",
  ["She speaks the English fluently",
   "She speaks a English fluently",
   "She speaks an English fluently"],
  "Languages take no article.", "medium")

Q(T, L, "Which is correct?",
  "the Arabian Sea", ["a Arabian Sea", "Arabian Sea with no article", "an Arabian Sea"],
  "Seas and oceans take 'the'.", "medium")

Q(T, L, "Why does 'the' appear in 'the first day of school'?",
  "Because 'first' points to one particular day",
  ["Because 'day' is a short word",
   "Because school is a place",
   "Because 'the' always comes before numbers"],
  "Ordinals such as first, second and last take 'the'.", "hard")

Q(T, L, "Which sentence uses 'the' wrongly?",
  "The honesty is the best policy",
  ["The moon was bright last night",
   "The teacher praised her work",
   "The train arrived late"],
  "Abstract nouns used in a general sense take no article.", "hard")

Q(T, L, "Which is correct?",
  "He went to school by bus",
  ["He went to the school by the bus, as a student every day",
   "He went to a school by a bus, as a student every day",
   "He went to an school by an bus"],
  "'To school' in the general sense of studying takes no article.", "hard")

Q(T, L, "Which sentence correctly uses 'the' for something unique?",
  "The Earth moves around the Sun",
  ["A Earth moves around a Sun",
   "An Earth moves around an Sun",
   "Earth moves around Sun in a sentence needing articles"],
  "There is only one of each.", "easy")

Q(T, L, "Which sentence uses articles correctly?",
  "I saw a snake in the garden, and the snake slid away",
  ["I saw the snake in a garden, and a snake slid away",
   "I saw an snake in the garden, and a snake slid away",
   "I saw snake in garden, and snake slid away"],
  "First mention indefinite, second mention definite.", "hard")

Q(T, L, "Which is correct?",
  "the rich should help the poor",
  ["a rich should help a poor",
   "an rich should help an poor",
   "rich should help poor in this sentence"],
  "'The' before an adjective can mean a whole group of people.", "hard")

Q(T, L, "What is the clearest difference between 'a' and 'the'?",
  "'A' introduces something new; 'the' points to something already known",
  ["'A' is used in writing and 'the' in speech",
   "'A' is used with plurals and 'the' with singulars",
   "There is no real difference"],
  "New information first, known information afterwards.", "medium")

# ─────────────────────────────────────────────────────────────────────────
by_topic = Counter(x["topic"] for x in BANK)
print(f"{len(BANK)} questions across {len(by_topic)} topics")
for t, n in by_topic.items():
    d = Counter(x["difficulty"] for x in BANK if x["topic"] == t)
    print(f"   {n:3}  E{d['easy']:3} M{d['medium']:3} H{d['hard']:3}   {t}")

with open("scripts/banks/english-verbs-articles.json", "w") as fh:
    json.dump(BANK, fh, indent=2)
    fh.write("\n")
print("\nwrote scripts/banks/english-verbs-articles.json")
