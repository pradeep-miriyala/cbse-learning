#!/usr/bin/env python3
"""
Builds the Class 6 Reading Comprehension bank.

Every passage here is written for this bank. Nothing is lifted from a textbook,
a newspaper or a website — a free practice site cannot host someone else's
prose, and a passage written to order can be aimed at exactly the skills the
questions test.

Each set follows the same spine, so a paper covers the whole range of reading
rather than five questions of recall:

    1  literal      — the answer is stated in the text          (easy)
    2  vocabulary   — a word's meaning from its context         (medium)
    3  inference    — true, but never stated outright           (hard)
    4  main idea    — what the whole passage is about           (hard)
    5  detail/tone  — a closer literal point, or the writer's attitude

    python3 scripts/gen-comprehension.py     # writes scripts/banks/comprehension.json
"""

import json

TOPIC = "reading-comprehension"
LABEL = "Reading Comprehension"
CHAPTER = "Reading Comprehension"

P = lambda *paras: "".join(f"<p>{t}</p>" for t in paras)

# (id, title, passage, [(question, [options], answer_index, hint, difficulty)])
SETS = [
(
 "rc-kite-maker", "The Kite Maker of Nagpur",
 P("Every year, a week before Makar Sankranti, the narrow lane behind the vegetable market "
   "in Nagpur fills with colour. This is where Shabbir Bhai has made kites for forty-one years. "
   "His shop is no wider than a doorway, but from it come kites of every size, from tiny ones "
   "the length of a hand to great ones that need two people to launch.",
   "Shabbir Bhai will not use plastic. Plastic kites fly well enough, he says, but they never "
   "rot away, and every February he sees them hanging in the trees along the road, faded and "
   "torn, months after the festival has ended. His own kites are made of thin paper and split "
   "bamboo, and if one is lost it returns quietly to the soil.",
   "Younger shopkeepers in the same lane sell plastic kites by the hundred and make more money "
   "than he does. Shabbir Bhai knows this. He shrugs when it is mentioned, and goes back to "
   "trimming a length of bamboo with a blade worn thin by use. His customers, he says, come back "
   "each year, and their children come after them. That is a kind of profit too."),
 [
  ("For how long has Shabbir Bhai been making kites?",
   ["Forty-one years", "Fourteen years", "Four years", "Since last Makar Sankranti"], 0,
   "The second sentence of the passage gives the number of years directly.", "easy"),
  ("In the passage, the phrase 'no wider than a doorway' tells us that the shop is:",
   ["Very narrow", "Very tall", "Newly built", "Always crowded"], 0,
   "The comparison is about width, so it is telling you how narrow the shop is.", "easy"),
  ("Why does Shabbir Bhai refuse to use plastic?",
   ["Because plastic kites do not rot away and are left hanging in trees",
    "Because plastic kites cannot fly at all",
    "Because plastic is more expensive than paper and bamboo",
    "Because his customers have asked him not to use it"], 0,
   "He admits plastic flies well enough. His objection is what happens to it afterwards.", "medium"),
  ("What does the last line, 'That is a kind of profit too', suggest about Shabbir Bhai?",
   ["He measures success by loyal customers, not only by money",
    "He earns more money than the younger shopkeepers",
    "He is planning to start selling plastic kites soon",
    "He does not care whether anyone buys his kites"], 0,
   "He has just been told others earn more. He answers by naming something else he values.", "hard"),
  ("Which sentence best states the main idea of the passage?",
   ["A kite maker chooses his materials by what he believes is right, not by what earns most",
    "Makar Sankranti is celebrated with kites in Nagpur every year",
    "Plastic kites fly better than paper kites and are cheaper to make",
    "The lane behind the vegetable market is the busiest part of Nagpur"], 0,
   "Ask what the whole passage is about, not what any one paragraph mentions.", "hard"),
 ]
),
(
 "rc-night-watch", "The Night the Lights Went Out",
 P("The power failed at half past eight, in the middle of Anaya's homework. For a moment the "
   "whole colony was silent. Then, one by one, the sounds arrived: a door opening, somebody "
   "laughing on a balcony, a child asking a question in a high voice.",
   "Anaya climbed to the terrace with her grandmother. She had lived in this flat all her life "
   "and had never once looked up and seen more than a handful of stars. Now the sky above the "
   "colony was crowded with them, thick as spilt salt, right down to the rooftops.",
   "'They were always there,' her grandmother said. 'You could not see them because of us.' "
   "Below, the generators began to cough and catch. One tube light flickered on, then a second. "
   "By the time Anaya looked up again, the faintest stars had already gone."),
 [
  ("At what time did the power fail?",
   ["Half past eight", "Half past nine", "At midnight", "Early in the morning"], 0,
   "The very first sentence of the passage gives the time.", "easy"),
  ("What does the comparison 'thick as spilt salt' describe?",
   ["How many stars there were and how closely they were scattered",
    "How cold the terrace felt that night",
    "The colour of the clouds above the colony",
    "The taste of the food Anaya had eaten"], 0,
   "Picture salt spilt across a dark table. The comparison is about number and scatter.", "medium"),
  ("What did the grandmother mean by 'You could not see them because of us'?",
   ["The lights people use had been hiding the stars from view",
    "The family had never allowed Anaya onto the terrace",
    "The stars had moved closer to the earth that night",
    "Anaya's eyesight had been poor until that evening"], 0,
   "Something belonging to people was blocking the view — and it came back on at the end.", "hard"),
  ("Why does the writer end with the faintest stars disappearing?",
   ["To show that the return of electricity took the view away again",
    "To show that the night was ending and morning had come",
    "To show that Anaya had grown tired and gone back inside",
    "To show that clouds had covered the sky"], 0,
   "Read the sentence just before it. Something switched on, and then something was lost.", "hard"),
  ("How did the colony sound immediately after the power failed?",
   ["Silent at first, then filled with small human sounds",
    "Noisy at once, with everybody shouting",
    "Completely silent for the whole evening",
    "Filled with the sound of generators straight away"], 0,
   "The passage describes a moment of silence, and then lists what followed one by one.", "medium"),
 ]
),
(
 "rc-stepwell", "The Stepwell at Adalaj",
 P("A stepwell is not a well as most people picture one. Instead of a round mouth and a bucket "
   "on a rope, it is a long flight of steps cut down into the earth, storey after storey, until "
   "the water is reached. In the dry regions of Gujarat and Rajasthan, hundreds of them were "
   "built between the sixth and the nineteenth centuries.",
   "The stepwell at Adalaj, near Ahmedabad, goes five storeys down. Carved pillars line each "
   "level, and the air grows cooler with every flight of steps. Even at noon in May, when the "
   "land above is too hot to stand on, the lowest level stays pleasant. Villagers once gathered "
   "there in the middle of the day, and the well became a meeting place as much as a water source.",
   "When piped water arrived in the last century, most stepwells fell out of use. Many filled "
   "with rubbish or dried up as the water table sank. A few, like Adalaj, are now protected. "
   "Visitors climb down them for the carvings, and are surprised, halfway, by the cold."),
 [
  ("How many storeys does the stepwell at Adalaj go down?",
   ["Five", "Three", "Nine", "Nineteen"], 0,
   "The second paragraph opens with the number.", "easy"),
  ("How is a stepwell different from an ordinary well?",
   ["It is reached by a long flight of steps cut into the earth, not by a bucket on a rope",
    "It holds rainwater rather than groundwater",
    "It is always round and covered with a roof",
    "It was built only in the last hundred years"], 0,
   "The first two sentences set the two kinds of well against each other.", "easy"),
  ("Why did villagers gather at the lowest level in the middle of the day?",
   ["Because it stayed cool while the land above was too hot",
    "Because water could only be drawn at noon",
    "Because the carvings were easiest to see at that hour",
    "Because the upper levels were closed to visitors"], 0,
   "The passage says the air grows cooler with every flight down.", "medium"),
  ("What can you conclude about the people who built stepwells?",
   ["They understood how to keep water reachable and cool in a hot, dry land",
    "They had no other way of storing rainwater",
    "They built them mainly so that visitors could admire the carvings",
    "They preferred stepwells because they were quicker to build than wells"], 0,
   "Nothing in the passage says this outright. Put together the depth, the cooling, and the dry region.", "hard"),
  ("Which of these best describes what the passage is mainly about?",
   ["What stepwells are, how they were used, and what became of them",
    "The history of the city of Ahmedabad",
    "Why piped water is better than a stepwell",
    "How carvings are made on stone pillars"], 0,
   "The three paragraphs cover what they are, how they were used, and their decline.", "hard"),
 ]
),
(
 "rc-crow-experiment", "What the Crow Worked Out",
 P("In a laboratory in New Zealand, a crow was shown a tall glass tube with a little water at the "
   "bottom. Floating on the water was a scrap of meat, too far down for the bird to reach with "
   "its beak. Beside the tube lay a small heap of pebbles.",
   "The crow looked at the tube. Then it picked up a pebble, dropped it in, and watched. The "
   "water rose by a fraction. It dropped in a second pebble, and a third. After eight pebbles the "
   "meat had risen far enough to be taken, and the crow took it.",
   "What interested the scientists was not that the crow got the meat. It was that the bird had "
   "never been taught this and had not seen another crow do it. Later tests made the puzzle "
   "harder: when the pebbles were replaced with pieces of foam that did not raise the water, most "
   "crows tried them once or twice, then stopped and looked for something heavier."),
 [
  ("How many pebbles did the crow drop in before it could reach the meat?",
   ["Eight", "Three", "Two", "Eighteen"], 0,
   "The second paragraph gives the number directly.", "easy"),
  ("Why could the crow not reach the meat at first?",
   ["The water level was too low, so the meat floated out of reach",
    "The tube was covered with a lid",
    "The meat was frozen to the bottom of the tube",
    "The crow's beak was too large for the tube"], 0,
   "The meat was floating on water at the bottom of a tall tube.", "easy"),
  ("What does the word 'fraction' mean in 'The water rose by a fraction'?",
   ["A very small amount", "Suddenly and completely", "Not at all", "More than half"], 0,
   "One pebble in a tall tube would not raise water much.", "medium"),
  ("Why did the scientists find the crow's behaviour interesting?",
   ["The crow solved the problem without being taught it or copying another crow",
    "The crow was the first bird ever seen drinking water",
    "The crow could count the pebbles as it dropped them",
    "The crow refused to eat the meat at the end"], 0,
   "The third paragraph says plainly what did and did not interest them.", "hard"),
  ("What does the crows' behaviour with the foam pieces suggest?",
   ["They noticed the foam was not working and looked for something that would",
    "They could not tell foam and pebbles apart at all",
    "They preferred foam to pebbles because it was lighter",
    "They gave up on the meat entirely after the first try"], 0,
   "They tried the foam once or twice, then changed what they were looking for.", "hard"),
 ]
),
(
 "rc-lost-letter", "The Letter That Took Nine Years",
 P("In 2013, a postman in Kolkata delivered a letter that had been posted in 2004. It had slipped "
   "behind a shelf in a sorting office and lay there, unnoticed, for nine years. When the shelf was "
   "finally moved during repairs, the letter came out with the dust.",
   "It was addressed to a woman named Sujata, and it was from her brother, who had written to say "
   "he was coming home for Durga Puja. By the time it arrived he had visited many times, and the "
   "family had a new address; the postman traced them through a neighbour who had lived on the "
   "street for thirty years.",
   "Sujata said afterwards that she had known all along that her brother was coming that year — he "
   "had telephoned. But she kept the letter anyway. It was the only thing she owned, she said, in "
   "which he described the journey he was planning, in his own hand, before he made it."),
 [
  ("Where had the letter been lying for nine years?",
   ["Behind a shelf in a sorting office", "In a postbox on the street",
    "At Sujata's old address", "In her brother's house"], 0,
   "The first paragraph says exactly where it had slipped.", "easy"),
  ("How did the postman find the family at their new address?",
   ["A neighbour who had lived on the street for thirty years helped him",
    "The new address was written on the back of the letter",
    "Sujata's brother telephoned the post office",
    "The family came to the sorting office to collect it"], 0,
   "The second paragraph names who helped him.", "medium"),
  ("Why did the news in the letter no longer matter by the time it arrived?",
   ["Her brother had already visited many times since it was written",
    "Her brother had changed his mind about coming",
    "Durga Puja is no longer celebrated in Kolkata",
    "Sujata had moved away from the city altogether"], 0,
   "Nine years passed between the writing and the delivery.", "medium"),
  ("Why did Sujata keep a letter whose news was long out of date?",
   ["Because it held her brother's own handwritten account of a journey he had not yet made",
    "Because she had never received a letter before",
    "Because the postman asked her to keep it safe",
    "Because she wanted to complain to the post office"], 0,
   "Her reason is in the very last sentence, and it is not about the news at all.", "hard"),
  ("What is the main point of this passage?",
   ["A letter can matter for reasons that have nothing to do with its news",
    "The postal service in Kolkata is unreliable",
    "Families should telephone rather than write letters",
    "Old shelves should be moved and cleaned more often"], 0,
   "The ending tells you what the writer thinks the story is really about.", "hard"),
 ]
),
(
 "rc-plastic-road", "Roads Made of Rubbish",
 P("In 2002, a chemistry professor in Madurai named Rajagopalan Vasudevan tried something odd. He "
   "shredded waste plastic — the sort that blows about in streets and blocks drains — heated it, "
   "and mixed it into the hot bitumen used for surfacing roads.",
   "The result surprised him. The plastic coated the stone chips and helped them bind, and the "
   "road that came out was harder to crack than an ordinary one. It stood up better to heavy rain, "
   "and it used up plastic that had no other use and would otherwise have been burnt or buried.",
   "The method is now used in many Indian states, and thousands of kilometres of road have been "
   "laid this way. It is not a complete answer to the plastic problem: a road cannot swallow every "
   "bag and bottle a country throws away, and the plastic is not gone, only locked in place. But it "
   "turns a nuisance into something a village can drive on."),
 [
  ("What did Professor Vasudevan mix into hot bitumen?",
   ["Shredded waste plastic", "Crushed glass", "River sand", "Sawdust from timber mills"], 0,
   "The first paragraph names the material exactly.", "easy"),
  ("According to the passage, how did the plastic improve the road?",
   ["It coated the stone chips, helped them bind, and made the road harder to crack",
    "It made the road cheaper to light at night",
    "It made the road softer and more comfortable to walk on",
    "It allowed the road to be laid without any bitumen"], 0,
   "The second paragraph lists what the plastic did to the mixture.", "medium"),
  ("What does the word 'nuisance' mean as it is used in the last sentence?",
   ["Something troublesome and unwanted", "Something rare and valuable",
    "A kind of building material", "A heavy rainstorm"], 0,
   "Look at how the waste plastic is described in the first paragraph.", "medium"),
  ("Why does the writer say this is 'not a complete answer'?",
   ["Roads cannot use up all the plastic a country throws away, and the plastic is only locked in place",
    "The roads crack more easily than ordinary roads",
    "The method has been tried in only one village",
    "Plastic roads cost far more than ordinary roads"], 0,
   "The last paragraph gives two limits, one after the other.", "hard"),
  ("Which best describes the writer's attitude to the plastic road?",
   ["Approving, but honest about what it cannot do",
    "Completely opposed to the idea",
    "Certain that it solves the plastic problem entirely",
    "Uninterested in whether it works or not"], 0,
   "Weigh the praise in paragraph two against the 'But' in paragraph three.", "hard"),
 ]
),
(
 "rc-library-cycle", "The Library on Two Wheels",
 P("Radhika Menon's library has no building. It has a bicycle, two wooden crates bolted over the "
   "back wheel, and about ninety books. Three afternoons a week she rides it out to the hamlets "
   "beyond her village in Kerala, where the nearest proper library is eleven kilometres away.",
   "The rules are simple. A child may borrow one book and must return it before taking another. "
   "Nothing is written down. In four years, Radhika says, she has lost six books, and four of "
   "those came back eventually — one after eight months, carried to her gate by a boy who had "
   "moved to another village and remembered.",
   "She is often asked why she does not ask for identity cards or a deposit. Her answer is that a "
   "deposit would keep out exactly the children she rides out to reach, and that six books in four "
   "years is a cheap price for a system that no child is afraid of."),
 [
  ("How far away is the nearest proper library from the hamlets Radhika visits?",
   ["Eleven kilometres", "Four kilometres", "Ninety kilometres", "Eight kilometres"], 0,
   "The distance is given at the end of the first paragraph.", "easy"),
  ("How many books has Radhika lost in four years?",
   ["Six", "Four", "Two", "Ninety"], 0,
   "The second paragraph gives the number, and then says how many came back.", "easy"),
  ("Why does Radhika refuse to ask for a deposit?",
   ["A deposit would keep away the very children she is trying to reach",
    "She is not allowed to collect money by law",
    "The children have already paid a fee to join",
    "She has never thought about it"], 0,
   "Her reason is stated in the last paragraph, and it is about who would be shut out.", "medium"),
  ("What does the story of the boy who returned a book after eight months show?",
   ["That trusting the children mostly works, even when they move away",
    "That the library keeps careful written records",
    "That most books are never returned at all",
    "That children must be reminded constantly"], 0,
   "He had moved to another village. Nobody could have chased him for it.", "hard"),
  ("Which sentence best states the main idea?",
   ["A library built on trust reaches children that a stricter one would turn away",
    "Bicycles are the cheapest way to carry books",
    "Children in Kerala read more than children elsewhere",
    "Libraries should always keep written records of borrowing"], 0,
   "The final paragraph states the trade she has chosen, and why.", "hard"),
 ]
),
(
 "rc-monsoon-fish", "Fish That Walk",
 P("When the first heavy rain of the monsoon falls on the dry plains of eastern India, something "
   "strange happens in the flooded fields. Fish appear in water that held none the day before — "
   "in ditches, in paddy fields, sometimes in puddles beside the road.",
   "Some have been carried there by the flood. But the climbing perch does something else. It can "
   "breathe air through a special organ above its gills, and it can push itself overland on its "
   "stiff fins and gill covers, travelling from a drying pool to a fuller one. It moves slowly and "
   "awkwardly, and it can survive out of water for several hours.",
   "Farmers in Bihar and Odisha have known this for generations and are not surprised by it. What "
   "surprises visitors is the direction: the fish are not being washed downhill by the water. They "
   "are going the other way, uphill, towards it."),
 [
  ("What allows the climbing perch to breathe out of water?",
   ["A special organ above its gills", "Very large gills", "Its stiff fins",
    "A layer of mud on its skin"], 0,
   "The second paragraph names the organ and where it sits.", "easy"),
  ("How does the climbing perch move across land?",
   ["By pushing itself along on its stiff fins and gill covers",
    "By swimming through wet grass", "By jumping high into the air",
    "By being carried by birds"], 0,
   "The passage describes exactly which parts of the body it uses.", "medium"),
  ("What does the word 'awkwardly' suggest about how the fish moves on land?",
   ["Clumsily and with difficulty", "Quickly and smoothly",
    "Silently and in secret", "In a straight line"], 0,
   "It is paired with 'slowly', and the fish is out of its element.", "medium"),
  ("Why are visitors surprised, when farmers are not?",
   ["The fish are travelling uphill towards water, not being washed downhill by it",
    "The fish are much larger than visitors expect",
    "The farmers have never seen the fish themselves",
    "The rain falls harder than visitors are used to"], 0,
   "The last sentence points out the direction, and calls it the other way.", "hard"),
  ("What is the passage mainly about?",
   ["A fish that can breathe air and travel over land between pools",
    "How the monsoon floods the plains of eastern India",
    "Why farmers in Bihar and Odisha grow paddy",
    "The difference between ditches and paddy fields"], 0,
   "Two of the three paragraphs are about the same creature and what it can do.", "hard"),
 ]
),
(
 "rc-clock-tower", "The Clock That Was Always Wrong",
 P("The clock on the tower at the centre of our town has been eleven minutes fast for as long as "
   "anyone can remember. Every few years somebody writes to the municipality about it, and every "
   "few years nothing happens.",
   "The odd thing is that the town has arranged itself around the mistake. The bus to the district "
   "headquarters leaves at what the tower calls a quarter past nine, and everybody who catches it "
   "knows to arrive at the tower's quarter past. Shops shut by the tower. School bells are set by "
   "it. A visitor once corrected his watch by the tower and missed his train by eleven minutes.",
   "Last year a young engineer offered to fix it without charge. The shopkeepers thanked him and "
   "asked him not to. If the clock were made right, they said, then for a week or two everybody in "
   "town would be wrong."),
 [
  ("By how much is the tower clock fast?",
   ["Eleven minutes", "A quarter of an hour", "Nine minutes", "An hour"], 0,
   "The first sentence gives the figure.", "easy"),
  ("What happened to the visitor who set his watch by the tower?",
   ["He missed his train by eleven minutes", "He arrived an hour early for his train",
    "He caught the bus to the district headquarters", "He complained to the municipality"], 0,
   "The second paragraph ends with what happened to him.", "easy"),
  ("Why did the shopkeepers ask the engineer not to repair the clock?",
   ["Because the whole town had set its habits by the wrong time and would be thrown off",
    "Because they did not trust him to do the work properly",
    "Because they could not afford to pay him",
    "Because the clock had already been repaired that year"], 0,
   "Their reason is in the last sentence, and it is about everybody else, not the clock.", "hard"),
  ("What does the phrase 'the town has arranged itself around the mistake' mean?",
   ["People have built their daily routines to fit the wrong time",
    "People have moved their houses closer to the tower",
    "The municipality has repaired the clock several times",
    "The mistake is corrected every morning by hand"], 0,
   "The sentences that follow give examples: buses, shops, school bells.", "medium"),
  ("What is the writer's tone in this passage?",
   ["Amused, and gently curious about how people adapt",
    "Angry at the municipality for its neglect",
    "Frightened by what the mistake might cause",
    "Sad that the tower is no longer used"], 0,
   "Notice the ending — it is a joke rather than a complaint.", "hard"),
 ]
),
(
 "rc-seed-bank", "The Woman Who Keeps Seeds",
 P("In a village in Karnataka, in a room off her kitchen, Lakshmamma keeps seeds. There are more "
   "than seven hundred varieties in her collection, stored in earthen pots and old tins, each "
   "labelled in her own writing: sixty kinds of rice, twenty of millet, beans, gourds, greens whose "
   "names do not appear in any catalogue.",
   "Most of these plants are grown by nobody now. Farmers buy a few high-yielding varieties instead, "
   "which give more grain but need more water and more chemicals. Lakshmamma does not argue against "
   "those varieties. She argues against having only those varieties.",
   "Her reason is simple and hard to answer. A field of one kind of rice can be wiped out by one "
   "disease. A field of many kinds cannot. She gives her seeds away free to anyone who will plant "
   "them and bring back twice as many, and in thirty years she has never run short."),
 [
  ("How many varieties of seed does Lakshmamma keep?",
   ["More than seven hundred", "Exactly sixty", "About twenty", "Thirty"], 0,
   "The first paragraph gives the total before listing some of the kinds.", "easy"),
  ("On what condition does Lakshmamma give her seeds away?",
   ["That the person plants them and brings back twice as many",
    "That the person pays for them after the harvest",
    "That the person grows only her varieties",
    "That the person returns the earthen pot"], 0,
   "The last paragraph states the exchange she asks for.", "medium"),
  ("What is Lakshmamma's argument against modern varieties?",
   ["Not that they are bad, but that growing only them is dangerous",
    "That they produce less grain than older varieties",
    "That they cannot be grown in Karnataka at all",
    "That they are too difficult for farmers to plant"], 0,
   "Read the last sentence of the second paragraph very carefully. One word changes the meaning.", "hard"),
  ("Why is a field of many kinds of rice safer than a field of one?",
   ["A single disease is unlikely to destroy every different kind",
    "Many kinds grow faster than one kind",
    "Many kinds need less water in total",
    "One kind of rice cannot be harvested by machine"], 0,
   "The passage gives the reason in two short sentences near the end.", "hard"),
  ("Which best describes what Lakshmamma's collection is for?",
   ["Keeping alive crop varieties that would otherwise be lost",
    "Selling rare seeds at a high price",
    "Proving that old varieties give more grain",
    "Teaching children the names of plants"], 0,
   "Ask what would happen to those seven hundred varieties if she stopped.", "medium"),
 ]
),
(
 "rc-first-train", "The Boy Who Waited for the Train",
 P("The railway line ran past the bottom of our field, and the Delhi mail passed at twenty to six "
   "every evening. My cousin Vinod, who was seven that summer, went down to the fence to watch it "
   "every single day, and every day he waved.",
   "For weeks nobody waved back. The train went by at speed, a long blur of lit windows, and Vinod "
   "would stand a moment longer and then walk back up to the house without saying anything about it.",
   "Then one evening in August the guard in the last carriage saw him, leaned out, and waved with "
   "his whole arm. Vinod said nothing at dinner. But he was at the fence again the next day twenty "
   "minutes early, and he had put on his good shirt."),
 [
  ("At what time did the Delhi mail pass the field?",
   ["Twenty to six", "Twenty past six", "Five o'clock", "Eight in the evening"], 0,
   "The first sentence gives the time the train passed.", "easy"),
  ("How long did Vinod wave before anyone waved back?",
   ["For weeks", "For a single day", "For a whole year", "He never waved at all"], 0,
   "The second paragraph opens by telling you how long nobody responded.", "easy"),
  ("Why did the writer mention that Vinod 'had put on his good shirt'?",
   ["To show that the guard's wave had mattered enormously to him",
    "To show that Vinod was going somewhere else that evening",
    "To show that his other clothes had been washed",
    "To show that he had grown out of his old shirt"], 0,
   "Vinod says nothing at dinner. The shirt is how the writer tells you what he felt.", "hard"),
  ("What does the phrase 'a long blur of lit windows' suggest about the train?",
   ["It was moving so fast that the windows ran together",
    "The train had stopped beside the fence",
    "The windows were dark and empty",
    "The train was very short"], 0,
   "The phrase follows the words 'at speed'.", "medium"),
  ("What is the main idea of this passage?",
   ["A small kindness from a stranger meant a great deal to a child",
    "Trains used to run on time in the writer's childhood",
    "Children should not play near railway lines",
    "The writer's family owned a field near the railway"], 0,
   "The whole passage builds to one moment and the change it caused.", "hard"),
 ]
),
(
 "rc-honey-hunters", "The Honey Hunters of the Nilgiris",
 P("The Kurumba people of the Nilgiri hills have gathered wild honey from cliff faces for "
   "centuries. The nests of the rock bee hang from overhangs a hundred feet above the ground, and "
   "reaching them means climbing down a ladder of bamboo and forest rope, made on the spot and "
   "left to rot afterwards.",
   "A hunter goes down with a smouldering bundle of leaves. The smoke does not harm the bees; it "
   "quiets them enough for the comb to be cut. Only part of each nest is taken. The rest is left "
   "so the colony can rebuild, and the same cliff can be harvested again the following year.",
   "Younger Kurumba are learning the work more slowly than their parents did, and some of the old "
   "songs sung during the descent are now remembered by only a handful of people. The honey itself "
   "sells well in the cities below. It is the climb, and the knowledge of when not to take, that is "
   "harder to pass on."),
 [
  ("How high above the ground do the rock bee nests hang?",
   ["About a hundred feet", "About ten feet", "About a thousand feet", "At ground level"], 0,
   "The height is given in the first paragraph.", "easy"),
  ("What is the smouldering bundle of leaves used for?",
   ["To make smoke that quiets the bees", "To light the hunter's way in the dark",
    "To keep the hunter warm on the cliff", "To burn away the old nest"], 0,
   "The passage says what the smoke does, and what it does not do.", "medium"),
  ("Why is only part of each nest taken?",
   ["So the colony can rebuild and the cliff can be harvested again next year",
    "Because the rest of the comb is not sweet enough",
    "Because the hunter cannot carry any more",
    "Because the law allows only a small amount"], 0,
   "The reason is given immediately after, and it is about the following year.", "hard"),
  ("What does the last sentence suggest is being lost?",
   ["The skill of the climb and the judgement of how much to leave behind",
    "The market for honey in the cities",
    "The cliffs where the bees build their nests",
    "The bamboo used for making ladders"], 0,
   "It contrasts the honey, which sells well, with two things that are harder to pass on.", "hard"),
  ("Which best states the main idea of the passage?",
   ["An old way of harvesting honey survives, but the knowledge behind it is fading",
    "Wild honey is more valuable than farmed honey",
    "Rock bees are dangerous and should be avoided",
    "Bamboo ladders are the safest way to climb a cliff"], 0,
   "The first two paragraphs describe the practice; the third tells you what is happening to it.", "hard"),
 ]
),
]

OUT = []
for pid, title, passage, questions in SETS:
    assert len(questions) >= 3, pid
    for qtext, options, answer, hint, difficulty in questions:
        assert len(options) == 4 and len(set(options)) == 4, (pid, qtext)
        assert 0 <= answer < 4
        OUT.append({
            "grade": 6, "subject": "english", "chapter": CHAPTER,
            "topic": TOPIC, "topicLabel": LABEL,
            "passageId": pid, "passageTitle": title, "passage": passage,
            "question": qtext, "options": list(options), "answer": answer,
            "hint": hint, "difficulty": difficulty,
        })

from collections import Counter
d = Counter(x["difficulty"] for x in OUT)
print(f"{len(OUT)} questions across {len(SETS)} passages")
print(f"   easy {d['easy']}  medium {d['medium']}  hard {d['hard']}")
print(f"   set sizes: {sorted(Counter(x['passageId'] for x in OUT).values())}")
words = [len(p.replace('<p>', ' ').replace('</p>', ' ').split()) for _, _, p, _ in SETS]
print(f"   passage length: {min(words)}–{max(words)} words")

with open("scripts/banks/comprehension.json", "w") as fh:
    json.dump(OUT, fh, indent=2)
    fh.write("\n")
print("\nwrote scripts/banks/comprehension.json")
