#!/usr/bin/env python3
"""
Builds the Class 6 "Diversity and Discrimination" bank for Social Science.

Written by hand rather than generated. The subject is prejudice, and a
template that varies a name or a group is exactly the wrong tool for it.

Three rules held throughout:

  1. The correct answer is never the prejudiced one. A child who half-reads a
     question and picks the confident-sounding option should not be rewarded
     for picking a stereotype.
  2. Nothing graphic. The Holocaust and female foeticide are in the Class 6
     syllabus and are not softened here, but they are stated plainly and
     without detail an eleven-year-old cannot carry.
  3. No question asks a child to identify anyone's caste, religion or
     community. The subject is the unfairness, never the group.

Facts are as of the events named — the NALSA judgment of April 2014, the
Constitution's articles, the PCPNDT Act of 1994.

    python3 scripts/gen-social-diversity.py
"""

import json
from collections import Counter

CHAPTER = "Diversity and Discrimination"
BANK = []


def Q(topic, label, question, correct, wrongs, hint, difficulty):
    """Correct answer first; prepare-bank.mjs shuffles the options on import."""
    options = [correct] + list(wrongs)
    assert len(options) == 4, (question, len(options))
    assert len(set(options)) == 4, ("duplicate options", question)
    BANK.append({
        "grade": 6, "subject": "social-science", "chapter": CHAPTER,
        "topic": topic, "topicLabel": label,
        "question": question, "options": options, "answer": 0,
        "hint": hint, "difficulty": difficulty,
    })


# ═══════════════════════════════════════════════════════════════════════
# 1. Prejudice & Stereotypes
# ═══════════════════════════════════════════════════════════════════════
T, L = "prejudice-and-stereotypes", "Prejudice & Stereotypes"

Q(T, L, "What is a stereotype?",
  "A fixed idea about a whole group of people that ignores what individuals are really like",
  ["A rule written down in the Constitution",
   "A kind of government office",
   "A festival celebrated in many states"],
  "A stereotype puts every person in a group into one box, whatever they are actually like.", "easy")

Q(T, L, "What does it mean to be prejudiced against someone?",
  "To judge them badly before knowing anything about them",
  ["To agree with everything they say",
   "To meet them for the first time",
   "To be curious about where they come from"],
  "The word means to pre-judge — to decide before you know.", "easy")

Q(T, L, "Which of these is an example of a stereotype?",
  "Saying that people from a particular state are all good at business",
  ["Saying that Kerala has a long coastline",
   "Saying that your friend Rahul is good at maths",
   "Saying that India has many languages"],
  "A statement about one person, or a plain fact, is not a stereotype. A claim about everyone in a group is.", "medium")

Q(T, L, "How are a stereotype and discrimination different?",
  "A stereotype is a fixed idea in the mind; discrimination is acting on it and treating someone unfairly",
  ["They mean exactly the same thing",
   "A stereotype is against the law but discrimination is not",
   "Discrimination happens only in schools"],
  "One is a thought, the other is something done to a person.", "medium")

Q(T, L, "A new student joins and everyone assumes she must be shy because she is from a small town. What is this?",
  "A stereotype, because they decided what she is like before knowing her",
  ["Good manners, because they are being careful with her",
   "A fact, because small towns are quieter",
   "Discrimination, because she has been punished"],
  "Nobody has treated her unfairly yet — but they have already decided what she is like.", "medium")

Q(T, L, "Why are stereotypes unfair even when they sound positive?",
  "They still stop a person being seen as an individual, and they put pressure on those who do not fit",
  ["They are only unfair if they are said out loud",
   "They are never unfair if they are meant kindly",
   "They are unfair only to adults"],
  "Think of a child told she must be good at studies because of where her family comes from.", "hard")

Q(T, L, "Ravi refuses to sit next to a classmate because of a rumour he heard about her family. What has Ravi allowed to guide him?",
  "Prejudice, because he judged her without knowing anything himself",
  ["Evidence, because a rumour is a kind of proof",
   "The school rules",
   "Nothing at all — where you sit does not matter"],
  "He acted on something he heard rather than anything he knows.", "medium")

Q(T, L, "Which is the best way to weaken a stereotype about a group?",
  "Getting to know people from that group as individuals",
  ["Repeating the stereotype until it sounds silly",
   "Avoiding people from that group",
   "Waiting for the government to pass a law"],
  "A stereotype survives on distance. It rarely survives an actual friendship.", "medium")

Q(T, L, "Where do children usually pick up stereotypes from?",
  "From what they hear around them — family, friends, films and jokes",
  ["Only from textbooks",
   "Only from the internet",
   "Children are born with them"],
  "Nobody is born with a stereotype. It has to be learned from somewhere.", "easy")

Q(T, L, "Which statement is a fact rather than a stereotype?",
  "India has more than twenty official languages",
  ["People who speak that language are always loud",
   "Children from that city never study hard",
   "People of that community are all wealthy"],
  "A fact can be checked. A stereotype is a claim about everybody in a group.", "easy")

Q(T, L, "Why is it wrong to say 'all people from that community are the same'?",
  "Because every group contains millions of different people who think and live differently",
  ["Because it is impolite to talk about communities at all",
   "Because groups do not really exist",
   "Because the sentence is grammatically incorrect"],
  "Ask whether everyone in your own class is the same as you.", "medium")

Q(T, L, "A teacher always asks the boys to carry the sports equipment and the girls to decorate. What is she acting on?",
  "A stereotype about what boys and girls are suited to",
  ["A school rule about safety",
   "The wishes of the students",
   "A law of the country"],
  "Nobody asked the students what they were good at or wanted to do.", "medium")

Q(T, L, "What is the danger of believing a stereotype about yourself?",
  "You may stop trying at things you have been told your group is not good at",
  ["You will forget your own name",
   "You will become very confident",
   "Nothing at all happens"],
  "A child told girls are bad at maths may stop putting her hand up.", "hard")

Q(T, L, "Two people from the same village behave very differently. What does this show?",
  "That where a person comes from does not decide who they are",
  ["That one of them must be pretending",
   "That the village has two separate parts",
   "That stereotypes are usually correct"],
  "If the stereotype were true, both would behave the same way.", "medium")

Q(T, L, "Which of these shows prejudice turning into discrimination?",
  "A shopkeeper refuses to serve a customer because of the community he belongs to",
  ["A shopkeeper thinks a customer looks unfriendly",
   "A shopkeeper closes early on a festival day",
   "A shopkeeper charges everyone the same price"],
  "Discrimination is the moment the thought becomes an action against someone.", "hard")

Q(T, L, "Why do people sometimes hold on to stereotypes even after meeting someone who does not fit?",
  "They treat that person as an exception instead of changing their idea",
  ["Because stereotypes are protected by law",
   "Because they cannot remember the meeting",
   "Because stereotypes are always true"],
  "You may have heard someone say, 'Yes, but he is different from the rest.'", "hard")

Q(T, L, "What is the difference between noticing that people are different and being prejudiced?",
  "Noticing difference is simply seeing; prejudice adds the idea that one kind of person is worse",
  ["There is no difference between them",
   "Noticing difference is against the law",
   "Prejudice only counts if it is written down"],
  "Diversity is a fact. Prejudice is a judgement laid on top of it.", "hard")

Q(T, L, "A film shows every character from one region as a fool. What is the film doing?",
  "Spreading a stereotype to a very large audience",
  ["Reporting the news accurately",
   "Breaking a law of physics",
   "Helping that region become better known"],
  "Films reach millions, so the fixed idea they show travels a long way.", "medium")

Q(T, L, "Why is it useful to ask 'How do I know that?' when you hear a claim about a group?",
  "It makes you check whether you have any real reason to believe it",
  ["It is a polite way of ending a conversation",
   "It proves the claim is correct",
   "It is required by the Constitution"],
  "Most stereotypes fall apart the moment somebody asks for the evidence.", "medium")

Q(T, L, "What is the best short description of prejudice?",
  "An opinion formed about someone before knowing them, usually an unfair one",
  ["A careful judgement made after long study",
   "A written government order",
   "A feeling of curiosity about others"],
  "The 'pre' in the word is doing the work.", "easy")

# ═══════════════════════════════════════════════════════════════════════
# 2. Forms of Discrimination
# ═══════════════════════════════════════════════════════════════════════
T, L = "forms-of-discrimination", "Forms of Discrimination"

Q(T, L, "What does discrimination mean?",
  "Treating someone worse than others because of the group they belong to",
  ["Choosing the best player for a team after a fair trial",
   "Giving everybody the same thing",
   "Noticing that people look different from one another"],
  "The unfairness comes from the group, not from anything the person has done.", "easy")

Q(T, L, "A hostel refuses a room to a student because of his religion. This is discrimination based on:",
  "Religion", ["Height", "Handwriting", "Examination marks"],
  "Look at the reason given for the refusal.", "easy")

Q(T, L, "Which of these is NOT discrimination?",
  "A running race where the fastest runner wins",
  ["A club that refuses entry to people of one community",
   "A school that admits only children of one caste",
   "An employer who pays women less for the same work"],
  "In a fair race, everyone competes under the same rules.", "medium")

Q(T, L, "What is 'untouchability'?",
  "The cruel practice of treating some people as impure and keeping them apart from others",
  ["A game played in villages",
   "A rule about washing hands before meals",
   "A kind of medical treatment"],
  "It was a caste practice, and the Constitution abolished it.", "medium")

Q(T, L, "Being teased for being short, dark or overweight is discrimination based on:",
  "Physical appearance", ["Language", "Income", "Religion"],
  "The teasing is about how the person looks.", "easy")

Q(T, L, "Why is discrimination based on appearance harmful even when it is called 'just a joke'?",
  "The person is still made to feel worth less for something they cannot change",
  ["Jokes are against the law in India",
   "It is harmful only if a teacher hears it",
   "It is not harmful at all"],
  "Ask who is laughing and who is being laughed at.", "hard")

Q(T, L, "A family is refused a house on rent because of the community they belong to. What is this?",
  "Discrimination, because the reason has nothing to do with them as tenants",
  ["A fair business decision by the owner",
   "A rule made by the municipality",
   "An example of diversity"],
  "Nothing about their ability to pay rent or care for the house was in question.", "medium")

Q(T, L, "What is inequality?",
  "A situation where some people have far less opportunity or respect than others",
  ["A situation where everybody is treated the same",
   "A mathematics chapter about greater than and less than",
   "A kind of election"],
  "Think about who gets a chance and who does not.", "easy")

Q(T, L, "Why do people who face discrimination often also end up poorer?",
  "Being shut out of schools, jobs and housing over generations leaves families with less",
  ["Because they choose not to work",
   "Because money is distributed by lottery",
   "There is no connection between the two"],
  "One closed door leads to the next: no school, then no job, then no savings.", "hard")

Q(T, L, "Two children do the same work. One is paid less because she is a girl. This is discrimination based on:",
  "Gender", ["Age", "The type of work", "The number of hours"],
  "The work was the same. Only one thing was different.", "easy")

Q(T, L, "A shop puts up a board saying people of a certain community will not be served. In India this is:",
  "Illegal, because the Constitution forbids such discrimination",
  ["Allowed, because a shop is private property",
   "Allowed if the shopkeeper explains his reason",
   "Required by law in some states"],
  "Article 15 forbids discrimination on grounds of religion, race, caste, sex or place of birth.", "medium")

Q(T, L, "Which of these best shows discrimination in school?",
  "Making some children sit separately and eat apart from the rest",
  ["Giving a prize to the student who read the most books",
   "Dividing the class into two teams for a quiz",
   "Asking students to line up by their roll number"],
  "Look for the rule that separates children by who they are rather than what they did.", "medium")

Q(T, L, "Why is discrimination different from an ordinary disagreement between two people?",
  "It targets a person for belonging to a group, and often follows them everywhere they go",
  ["It always involves shouting",
   "It can only happen between strangers",
   "It is settled by an apology"],
  "A quarrel ends. Discrimination waits at the next door too.", "hard")

Q(T, L, "What can a student do when they see a classmate being excluded because of their background?",
  "Include them, and tell a teacher if it continues",
  ["Join in so as not to seem different",
   "Wait quietly for it to stop by itself",
   "Laugh, since it is not their own problem"],
  "Doing nothing leaves the child alone with it.", "easy")

Q(T, L, "Someone is refused a job even though he scored highest in the test, because of his caste. Why is this wrong as well as illegal?",
  "The decision ignored the only thing that should have mattered — how well he could do the job",
  ["Because tests should not be used for jobs",
   "Because he should have applied elsewhere",
   "Because the employer did not explain the decision"],
  "He had already proved he was the best candidate.", "hard")

Q(T, L, "'Diversity' and 'discrimination' are not the same thing. Which statement is correct?",
  "Diversity means people differ; discrimination means some are treated worse for those differences",
  ["Diversity always causes discrimination",
   "They are two words for the same idea",
   "Discrimination happens only where there is no diversity"],
  "Difference by itself harms nobody. What is done about it can.", "hard")

Q(T, L, "A village well may be used by everyone except one group of families. This is an example of:",
  "Discrimination based on caste",
  ["A water shortage",
   "A rule of the panchayat about cleanliness",
   "An accident"],
  "Water was available. Only certain families were kept from it.", "medium")

Q(T, L, "Why does discrimination often continue for many years even after a law bans it?",
  "Laws can change what people may do, but attitudes take longer to change",
  ["Because nobody has heard about the law",
   "Because laws stop working after some years",
   "Because courts are not allowed to act"],
  "A rule can be written in a day. A habit of mind takes longer.", "hard")

Q(T, L, "What is the first thing that makes discrimination possible?",
  "The belief that some people are worth less than others",
  ["A shortage of money",
   "A large population",
   "The existence of many languages"],
  "Before anyone is shut out, somebody has decided they matter less.", "medium")

Q(T, L, "Which of these is an example of positive action to reduce inequality?",
  "Reserving seats in colleges for groups kept out of education for generations",
  ["Refusing admission to students from one community",
   "Charging higher fees to poorer students",
   "Closing schools in villages"],
  "The aim is to open a door that has been shut for a very long time.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 3. The Constitution & Equality
# ═══════════════════════════════════════════════════════════════════════
T, L = "constitution-and-equality", "The Constitution & Equality"

Q(T, L, "What is the Constitution of India?",
  "The country's supreme rulebook, setting out how it is governed and what rights people have",
  ["A collection of speeches by leaders",
   "A book of Indian history",
   "A list of India's states and their capitals"],
  "Every other law in the country must agree with it.", "easy")

Q(T, L, "When did the Constitution of India come into force?",
  "26 January 1950", ["15 August 1947", "26 November 1949", "2 October 1950"],
  "That is why 26 January is celebrated as Republic Day.", "easy")

Q(T, L, "Which article of the Constitution abolishes untouchability?",
  "Article 17", ["Article 370", "Article 21", "Article 51A"],
  "It abolishes the practice and makes it punishable.", "medium")

Q(T, L, "Article 15 forbids discrimination on which grounds?",
  "Religion, race, caste, sex or place of birth",
  ["Height, weight and eyesight",
   "Marks scored in examinations",
   "The language a person prefers to read"],
  "Learn the five grounds — they cover most of what people are born into.", "medium")

Q(T, L, "What does 'equality before the law' mean?",
  "The same law applies to everyone, whoever they are",
  ["Everyone earns the same amount of money",
   "Everyone must study the same subjects",
   "Only judges are equal"],
  "It is about how the law treats you, not about wealth.", "medium")

Q(T, L, "The Preamble to the Constitution promises justice, liberty, equality and:",
  "Fraternity", ["Prosperity", "Victory", "Loyalty"],
  "It means a spirit of brotherhood among all the people of India.", "medium")

Q(T, L, "Why did the makers of the Constitution include Fundamental Rights?",
  "So that every citizen would have protections the government itself cannot take away",
  ["So that the Constitution would be longer",
   "To replace the need for courts",
   "Because other countries asked India to"],
  "A right that the government could remove at will would not protect anyone.", "hard")

Q(T, L, "What can a citizen do if a Fundamental Right is violated?",
  "Go to the High Court or the Supreme Court",
  ["Nothing — the rights are only suggestions",
   "Write to a newspaper, which is the only remedy",
   "Wait for the next election"],
  "A right you cannot enforce is not much of a right.", "medium")

Q(T, L, "How does the Constitution treat India's diversity?",
  "It protects it, allowing people to follow their own religion, language and culture",
  ["It asks everyone to adopt one language and one religion",
   "It ignores the question entirely",
   "It allows only some states to be diverse"],
  "Look at the freedom of religion and the protection of languages.", "medium")

Q(T, L, "What is the Right to Equality meant to correct?",
  "Centuries of some people being treated as lesser because of birth",
  ["The uneven distribution of rainfall",
   "The shortage of schools in cities",
   "Differences in people's heights"],
  "The Constitution was written in a country where birth had long decided a person's place.", "hard")

Q(T, L, "Which of these is a Fundamental Duty of every Indian citizen?",
  "To promote harmony and the spirit of common brotherhood among all people",
  ["To vote for a particular party",
   "To learn three languages",
   "To join the armed forces"],
  "The Fundamental Duties sit alongside the rights, asking something of the citizen in return.", "hard")

Q(T, L, "Why is it important that the Constitution applies to the government too?",
  "Because a government that is above the law could take away people's rights at will",
  ["Because the government writes the newspapers",
   "Because ministers are elected",
   "It does not apply to the government"],
  "The point of a supreme rulebook is that nobody stands above it.", "hard")

Q(T, L, "The Constitution allows special provisions for some groups. Why is this not a contradiction of equality?",
  "Treating everyone identically would leave groups held back for generations exactly where they are",
  ["Because equality applies only to adults",
   "Because the Constitution often contradicts itself",
   "Because the provisions are temporary jokes"],
  "Two runners do not start level if one begins several laps behind.", "hard")

Q(T, L, "Which body wrote the Constitution of India?",
  "The Constituent Assembly", ["The Supreme Court", "The British Parliament", "The United Nations"],
  "Its members were drawn from all over India and debated for nearly three years.", "medium")

Q(T, L, "How long did the Constituent Assembly take to complete the Constitution?",
  "Just under three years", ["About three weeks", "Nearly twenty years", "One year exactly"],
  "It sat from December 1946 and adopted the Constitution in November 1949.", "medium")

Q(T, L, "What does the Right to Freedom of Religion guarantee?",
  "That a person may follow, practise and spread the religion of their choice, or none",
  ["That everyone must attend a place of worship",
   "That only the largest religion is protected",
   "That religion may not be discussed"],
  "The choice belongs to the person, not to the state or the neighbours.", "medium")

Q(T, L, "A state government passes a law that allows discrimination by caste. What happens to it?",
  "The courts can strike it down for violating the Constitution",
  ["It becomes valid because a government passed it",
   "It applies only to that state and cannot be questioned",
   "It replaces the Constitution in that state"],
  "No law may sit above the supreme rulebook.", "hard")

Q(T, L, "Why is the Constitution described as a 'living document'?",
  "It can be amended as society changes, while its basic principles remain",
  ["It is printed on special paper",
   "It is read aloud every year",
   "It expires after fifty years"],
  "It has been amended more than a hundred times without losing its foundations.", "hard")

Q(T, L, "Which of these best explains why the Constitution begins with 'We, the people of India'?",
  "It shows the Constitution's authority comes from the people themselves",
  ["It is a greeting to visitors",
   "It names the members of the Assembly",
   "It is a translation of an older law"],
  "Ask who is speaking in those first four words.", "hard")

Q(T, L, "What is the Right against Exploitation meant to stop?",
  "Practices such as forced labour and the employment of young children in hazardous work",
  ["Students being given homework",
   "Shops charging high prices",
   "Long journeys to school"],
  "It protects people who could otherwise be made to work against their will.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 4. Transgender Rights
# ═══════════════════════════════════════════════════════════════════════
T, L = "transgender-rights", "Transgender Rights"

Q(T, L, "In April 2014, what did the Supreme Court of India rule in the NALSA case?",
  "That transgender persons must be recognised as a third gender with full constitutional rights",
  ["That transgender persons must choose to be male or female",
   "That the matter was for each state to decide separately",
   "That no change in the law was needed"],
  "The judgment was delivered on 15 April 2014.", "medium")

Q(T, L, "What does it mean that a person may decide their own gender identity, as the Court held?",
  "The person themselves decides, rather than a doctor or an official deciding for them",
  ["The government assigns a gender at the age of eighteen",
   "The decision is made by a majority vote in the family",
   "Gender identity cannot be changed on any document"],
  "The Court called this the right to self-identification.", "hard")

Q(T, L, "Which fundamental rights did the Supreme Court say applied to transgender persons?",
  "The rights to equality, against discrimination, to expression and to life with dignity",
  ["Only the right to vote",
   "Only rights connected with property",
   "No fundamental rights, but some legal benefits"],
  "The Court read Articles 14, 15, 19 and 21 as covering them.", "hard")

Q(T, L, "Why did the Supreme Court's recognition of a third gender matter in everyday life?",
  "It allowed transgender persons to obtain documents such as passports and voter cards in their own identity",
  ["It changed the design of the national flag",
   "It made school uniforms optional",
   "It had no practical effect at all"],
  "Without matching documents, ordinary tasks like opening a bank account become impossible.", "hard")

Q(T, L, "What is the older Indian word often used for a transgender community, which the judgment discussed?",
  "Hijra", ["Sarpanch", "Zamindar", "Diwan"],
  "The Court noted such communities have a long history in India.", "medium")

Q(T, L, "The Court also directed that transgender persons be treated as which category for education and jobs?",
  "Socially and educationally backward classes, so they could receive reservations",
  ["A separate country within India",
   "A group not needing any special measures",
   "Applicants who must always be placed first"],
  "The aim was to open opportunities long closed to them.", "hard")

Q(T, L, "Why had many transgender persons found it hard to get schooling or work before this ruling?",
  "They faced discrimination and often had no documents recording who they were",
  ["Because schools did not exist in their areas",
   "Because they were not interested in studying",
   "Because the law required them to work at home"],
  "Two things were missing: fair treatment, and papers that matched their identity.", "medium")

Q(T, L, "What is the correct way to speak about a transgender classmate?",
  "Use the name and pronouns they ask you to use",
  ["Use whichever name you find easier",
   "Avoid speaking to them at all",
   "Ask the whole class to vote on it"],
  "It costs nothing to call somebody what they ask to be called.", "easy")

Q(T, L, "Which statement about the 2014 judgment is correct?",
  "It was decided by the Supreme Court, the highest court in India",
  ["It was an order from a district court in Delhi",
   "It was a law passed by a state assembly",
   "It was an announcement by a private organisation"],
  "NALSA stands for the National Legal Services Authority, which brought the case.", "easy")

Q(T, L, "Why is it wrong to stare at or mock a person who is transgender?",
  "It denies them the dignity that the Constitution guarantees every person",
  ["It is wrong only if a policeman is watching",
   "It is not wrong, only impolite",
   "It is wrong only in schools"],
  "Article 21 protects the right to live with dignity.", "medium")

Q(T, L, "What does 'discrimination on the ground of sex' in Article 15 include, according to the Court?",
  "Discrimination because of a person's gender identity",
  ["Only discrimination between men and women",
   "Only discrimination at work",
   "Nothing beyond marriage laws"],
  "The Court read the word broadly, so the protection reached further.", "hard")

Q(T, L, "Before 2014, what problem did transgender persons face with official forms?",
  "Most forms offered only 'male' or 'female', leaving them unable to record who they were",
  ["Forms were only printed in English",
   "Forms had to be filled in by a lawyer",
   "There were no official forms in India"],
  "A form with only two boxes forces a false answer on some people.", "medium")

Q(T, L, "Which of these best describes the purpose of the NALSA judgment?",
  "To bring a group long treated as outsiders inside the protection of the Constitution",
  ["To create a new state",
   "To change the school syllabus",
   "To decide a property dispute"],
  "Ask who was left out before, and who was included after.", "hard")

Q(T, L, "A transgender student is refused admission to a school. What does the 2014 judgment mean for this?",
  "The refusal is discrimination and is against the Constitution",
  ["The school may decide as it wishes",
   "The student must apply to a special school",
   "The judgment applies only to adults"],
  "Recognition of rights is not limited by age.", "medium")

Q(T, L, "What does the word 'dignity' mean in the phrase 'right to live with dignity'?",
  "Being treated as a person worthy of respect",
  ["Owning expensive things",
   "Holding a government post",
   "Being famous"],
  "Dignity is not something you buy or earn — it belongs to everyone.", "easy")

Q(T, L, "Why did the Court say self-identification should not require a medical operation?",
  "Because a person's identity is about who they are, not about a surgical procedure",
  ["Because operations are expensive",
   "Because doctors refused to help",
   "Because operations are illegal in India"],
  "Making surgery a condition would put the decision back into someone else's hands.", "hard")

Q(T, L, "Which of these actions would help a transgender person most in a school?",
  "Making sure they are included in classes, teams and friendships like anyone else",
  ["Giving them a separate classroom",
   "Asking them to explain themselves to the school",
   "Excusing them from all activities"],
  "Inclusion, not separate arrangements, is what the judgment points towards.", "medium")

Q(T, L, "The NALSA judgment is an example of which body protecting rights?",
  "The judiciary — the courts",
  ["The legislature — Parliament",
   "The executive — the council of ministers",
   "The Election Commission"],
  "It was a court decision, not a law passed by Parliament.", "medium")

Q(T, L, "Why do court judgments matter even when Parliament has not passed a law?",
  "Courts can interpret the Constitution, and their reading binds the whole country",
  ["Because judges are elected by the people",
   "Because judgments last only one year",
   "They do not matter until a law is passed"],
  "The Constitution is the higher rulebook, and the courts say what it means.", "hard")

Q(T, L, "What is the simplest thing a classmate can do to support a transgender friend?",
  "Treat them as an ordinary friend and stand up for them when others do not",
  ["Tell them they should keep it a secret",
   "Report them to the school office",
   "Ask them personal questions in front of others"],
  "The most useful support is usually the least dramatic.", "easy")

# ═══════════════════════════════════════════════════════════════════════
# 5. Dr Ambedkar & the Fight Against Caste
# ═══════════════════════════════════════════════════════════════════════
T, L = "ambedkar", "Dr Ambedkar & the Fight Against Caste"

Q(T, L, "What position did Dr B. R. Ambedkar hold while the Constitution was being written?",
  "Chairman of the Drafting Committee",
  ["President of India", "Speaker of the Lok Sabha", "Chief Justice of India"],
  "The Drafting Committee prepared the text the Assembly debated.", "easy")

Q(T, L, "What was Dr Ambedkar's role in the first government of independent India?",
  "He was the first Law Minister",
  ["He was the first Prime Minister",
   "He was the first President",
   "He held no position in government"],
  "He held the law portfolio in Nehru's first cabinet.", "medium")

Q(T, L, "As a schoolboy, what did Dr Ambedkar experience because of his caste?",
  "He was made to sit apart from other children and was not allowed to drink from the common water pot",
  ["He was given extra lessons by his teachers",
   "He was made head boy of the school",
   "He was excused from examinations"],
  "His own school days are one of the clearest accounts of untouchability we have.", "medium")

Q(T, L, "Which article of the Constitution, which Dr Ambedkar helped shape, abolished untouchability?",
  "Article 17", ["Article 44", "Article 356", "Article 12"],
  "It abolishes the practice in any form and makes it an offence.", "medium")

Q(T, L, "Why is Dr Ambedkar often called the chief architect of the Indian Constitution?",
  "He led the committee that drafted it and defended its provisions through long debates",
  ["He paid for the printing of the Constitution",
   "He was the oldest member of the Assembly",
   "He designed the building where it was written"],
  "An architect draws the plan and argues for it — that is what he did.", "medium")

Q(T, L, "Dr Ambedkar studied abroad at which universities?",
  "Columbia University in America and the London School of Economics",
  ["Only at universities inside India",
   "He never attended a university",
   "At universities in Japan and China"],
  "He was among the most highly educated Indians of his time.", "medium")

Q(T, L, "Why did Dr Ambedkar place so much importance on education?",
  "He believed education was the strongest tool people had to escape an unjust system",
  ["He thought only educated people should vote",
   "He wanted to become a teacher",
   "He believed education mattered less than wealth"],
  "His own life was the argument: education was how he was heard.", "hard")

Q(T, L, "What did Dr Ambedkar mean by saying political equality is not enough without social equality?",
  "A person may have a vote and still be treated as an outcaste in daily life",
  ["That voting should be stopped",
   "That society matters more than the Constitution",
   "That equality is impossible"],
  "One vote every five years does not change how neighbours behave every day.", "hard")

Q(T, L, "In 1956, Dr Ambedkar and many of his followers converted to which religion?",
  "Buddhism", ["Jainism", "Sikhism", "Zoroastrianism"],
  "He saw it as a path out of a social order built on caste.", "medium")

Q(T, L, "Which honour was conferred on Dr Ambedkar in 1990, long after his death?",
  "The Bharat Ratna", ["The Nobel Peace Prize", "The Padma Shri", "The Param Vir Chakra"],
  "It is India's highest civilian award, and it was given posthumously.", "medium")

Q(T, L, "What did Dr Ambedkar argue was the root of caste discrimination?",
  "A social order that fixed a person's worth by the family they were born into",
  ["A shortage of land in villages",
   "The number of languages in India",
   "The climate of the Indian subcontinent"],
  "His objection was to birth deciding a person's place for life.", "hard")

Q(T, L, "Dr Ambedkar campaigned for the right of all people to use public wells and temples. Why did this matter so much?",
  "Being kept from shared spaces marked people publicly as lesser, every single day",
  ["Because wells were the only source of drinking water in India",
   "Because temples were the largest buildings in villages",
   "Because he wanted the wells to be rebuilt"],
  "The exclusion was visible to the whole village, which was part of its cruelty.", "hard")

Q(T, L, "Where was Dr Ambedkar born, and in which year?",
  "In Mhow, in 1891", ["In Pune, in 1869", "In Delhi, in 1901", "In Kolkata, in 1885"],
  "His birth anniversary on 14 April is marked across India.", "medium")

Q(T, L, "Which of these best describes Dr Ambedkar's approach to changing society?",
  "Using law, argument and education rather than violence",
  ["Leading an armed rebellion",
   "Withdrawing from public life",
   "Asking for help from foreign governments"],
  "His weapons were a pen, a book and a constitutional article.", "medium")

Q(T, L, "Why did Dr Ambedkar support reservations in education and government jobs?",
  "To open doors to communities kept out of both for centuries",
  ["To reduce the number of applicants",
   "Because he thought examinations were unfair to everyone",
   "To make government offices smaller"],
  "Where a group has been shut out for generations, an open door is not enough on its own.", "hard")

Q(T, L, "Dr Ambedkar famously described the Constitution's rights as needing something more to be real. What?",
  "A society willing to live by them",
  ["A larger army",
   "More printing presses",
   "Support from other countries"],
  "He warned that a good constitution can fail in the hands of an unwilling people.", "hard")

Q(T, L, "What does the phrase 'Educate, Agitate, Organise', associated with Dr Ambedkar, urge people to do?",
  "Learn, speak up against injustice, and work together",
  ["Study quietly and avoid public life",
   "Leave the country to find work",
   "Wait for leaders to solve their problems"],
  "Three verbs, in a deliberate order: know it, name it, then act together.", "medium")

Q(T, L, "Why is 14 April observed across India?",
  "It is Dr Ambedkar's birth anniversary",
  ["It is the day the Constitution came into force",
   "It marks the end of British rule",
   "It is the anniversary of the NALSA judgment"],
  "Do not confuse it with 26 January.", "easy")

Q(T, L, "What did Dr Ambedkar mean when he said the Constitution could be as good or as bad as those who work it?",
  "Even the best rules depend on the honesty of the people who apply them",
  ["That the Constitution should be rewritten often",
   "That constitutions do not matter",
   "That only lawyers can understand it"],
  "The document does not enforce itself.", "hard")

Q(T, L, "How is Dr Ambedkar's work connected to a child's school life today?",
  "The right to be admitted, seated and treated equally in school rests on principles he fought for",
  ["He designed the school timetable",
   "He wrote the mathematics textbook",
   "He has no connection with schools"],
  "Think of the boy who was not allowed to touch the water pot, and what changed.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 6. Nazi Germany & the Jews
#
# Stated plainly and without graphic detail. The point a Class 6 reader should
# carry away is how ordinary prejudice was turned into law, and then into
# something far worse — not the details of how people died.
# ═══════════════════════════════════════════════════════════════════════
T, L = "nazi-germany", "Nazi Germany & the Jews"

Q(T, L, "Who led the Nazi Party and became the ruler of Germany in the 1930s?",
  "Adolf Hitler", ["Otto von Bismarck", "Karl Marx", "Winston Churchill"],
  "He became Chancellor of Germany in January 1933.", "easy")

Q(T, L, "What did the Nazis wrongly claim about Germans of Jewish faith?",
  "That they were responsible for Germany's problems — a false and cruel accusation",
  ["That they were the best scientists in Germany",
   "That they had recently arrived from another continent",
   "That they should lead the government"],
  "Blaming a whole group for a country's troubles is prejudice on a national scale.", "medium")

Q(T, L, "What were the Nuremberg Laws of 1935?",
  "Laws that took away the citizenship and rights of German Jews",
  ["Laws that gave equal rights to all Germans",
   "Rules for a football tournament",
   "Laws protecting German forests"],
  "Prejudice was written into the law book itself.", "medium")

Q(T, L, "Jews in Nazi Germany were forced to wear a yellow star. What was the purpose of this?",
  "To mark them out in public so they could be identified and treated differently",
  ["To honour them for their service",
   "To help them find each other in a crowd",
   "To show which school they attended"],
  "A visible mark makes discrimination easy for everyone to carry out.", "medium")

Q(T, L, "What is the Holocaust?",
  "The murder of about six million Jews by the Nazis during the Second World War",
  ["A battle fought in North Africa",
   "A treaty signed at the end of the war",
   "A famine in eastern Europe"],
  "Millions of others, including Roma people and disabled people, were also killed.", "medium")

Q(T, L, "Anne Frank is remembered for what?",
  "The diary she kept as a Jewish girl hiding from the Nazis in Amsterdam",
  ["Leading an army against Germany",
   "Inventing a code used in the war",
   "Writing the Nuremberg Laws"],
  "She was a teenager, and her diary is read all over the world.", "medium")

Q(T, L, "How did the Nazis prepare ordinary people to accept the mistreatment of Jews?",
  "Through years of propaganda in newspapers, films, posters and school lessons",
  ["By holding a national vote on the question",
   "By asking each family to decide for itself",
   "They made no attempt to persuade anyone"],
  "The cruelty came last. Persuasion came first.", "hard")

Q(T, L, "Why is it important to study the Holocaust in school?",
  "So that we recognise where prejudice can lead if it is not stopped early",
  ["To learn the names of German cities",
   "Because it is an interesting adventure story",
   "To decide which country was strongest"],
  "The lesson is about the road, not only the destination.", "hard")

Q(T, L, "During which war did the Holocaust take place?",
  "The Second World War", ["The First World War", "The Crimean War", "The Cold War"],
  "The war ran from 1939 to 1945.", "easy")

Q(T, L, "What does the word 'propaganda' mean?",
  "Information spread to make people believe something, often one-sided or untrue",
  ["A careful scientific study",
   "A type of government building",
   "A law passed by a parliament"],
  "Its purpose is to persuade, not to inform.", "medium")

Q(T, L, "Jewish children in Nazi Germany were expelled from ordinary schools. What did this do to them?",
  "It cut them off from friends and learning, and marked them out as different",
  ["It gave them more time to play",
   "It improved their education",
   "It had no effect on their lives"],
  "Think of what school gives a child besides lessons.", "hard")

Q(T, L, "What lesson does the Nazi period teach about laws?",
  "A law is not automatically just — laws themselves can be deeply wrong",
  ["Laws can never be questioned",
   "Only old laws can be unjust",
   "Every law passed by a government is fair"],
  "The Nuremberg Laws were properly passed, and they were monstrous.", "hard")

Q(T, L, "Some people in Europe hid Jewish neighbours at great risk to themselves. What does this show?",
  "That individuals can choose to act rightly even when their government does not",
  ["That the Nazis did not really object",
   "That hiding people was easy and safe",
   "That everyone in Europe agreed with the Nazis"],
  "They are remembered because their choice was rare and dangerous.", "hard")

Q(T, L, "What was a concentration camp?",
  "A camp where the Nazis imprisoned people they had singled out, under terrible conditions",
  ["A camp where German soldiers trained",
   "A holiday camp for German schoolchildren",
   "A place where treaties were signed"],
  "People were sent there for who they were, not for anything they had done.", "medium")

Q(T, L, "Which idea did the Nazis use to justify treating some people as less than human?",
  "The false belief that their own group was a superior race",
  ["The belief that all people are equal",
   "The belief that education matters most",
   "The belief that Germany should have no army"],
  "Every large-scale cruelty begins with the claim that some people count for less.", "hard")

Q(T, L, "Why did many Jewish families try to leave Germany in the 1930s?",
  "Because they had lost their rights and were no longer safe there",
  ["Because they wanted to see other countries",
   "Because the Nazis paid them to leave",
   "Because German winters were cold"],
  "By 1935 they were no longer citizens of their own country.", "medium")

Q(T, L, "What is the connection between the Nazi story and the study of prejudice?",
  "It shows how a stereotype can grow into discrimination, then into law, then into violence",
  ["There is no connection between them",
   "It shows that stereotypes are usually harmless",
   "It shows that prejudice exists only in Europe"],
  "Trace the steps in order — each one made the next easier.", "hard")

Q(T, L, "After the war, leading Nazis were put on trial at Nuremberg. Why did this matter?",
  "It established that people can be held responsible for crimes even when their government ordered them",
  ["It decided which country would rebuild Germany",
   "It chose the new German flag",
   "It was only a ceremony with no verdicts"],
  "'I was following orders' was rejected as a defence.", "hard")

Q(T, L, "Which of these is the safest thing to do when you hear a joke that mocks a whole community?",
  "Say that you do not find it funny, and explain why",
  ["Laugh so that nobody feels awkward",
   "Repeat it to others to see what they think",
   "Say nothing and remember it"],
  "Silence is usually read as agreement.", "medium")

Q(T, L, "What does the phrase 'never again', often said about the Holocaust, mean?",
  "A promise to recognise and stop such persecution before it can happen again",
  ["A rule that history must not be taught",
   "A promise never to visit Germany",
   "A decision to forget what happened"],
  "It is a promise about the future, which is why the past is taught.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 7. Segregation & Civil Rights in America
# ═══════════════════════════════════════════════════════════════════════
T, L = "african-american-rights", "Segregation & Civil Rights in America"

Q(T, L, "What was racial segregation in the United States?",
  "A system that kept black and white people apart in schools, buses and public places",
  ["A method of counting the population",
   "A tax paid by all citizens",
   "A style of American music"],
  "Separate schools, separate seats, separate drinking fountains.", "easy")

Q(T, L, "Who was Rosa Parks?",
  "A black woman who refused to give up her bus seat to a white passenger in 1955",
  ["The first black president of the United States",
   "A judge who ended segregation",
   "A singer who wrote protest songs"],
  "Her refusal in Montgomery, Alabama, sparked a long bus boycott.", "easy")

Q(T, L, "What is a boycott?",
  "Refusing to use or buy something as a way of protesting",
  ["A vote taken in secret",
   "A tax on imported goods",
   "A kind of court order"],
  "In Montgomery, black residents simply stopped riding the buses.", "medium")

Q(T, L, "Who delivered the famous 'I Have a Dream' speech in 1963?",
  "Martin Luther King Jr", ["Abraham Lincoln", "Nelson Mandela", "Barack Obama"],
  "He spoke in Washington to a crowd of more than two hundred thousand.", "easy")

Q(T, L, "What method did Martin Luther King Jr urge his followers to use?",
  "Non-violent protest",
  ["Armed rebellion",
   "Leaving the country",
   "Refusing to speak to anyone"],
  "He was influenced by Mahatma Gandhi's methods in India.", "medium")

Q(T, L, "What did the Civil Rights Act of 1964 do?",
  "It outlawed discrimination based on race, colour, religion, sex or national origin",
  ["It created the United Nations",
   "It ended the Second World War",
   "It made education compulsory worldwide"],
  "It was the law that finally made segregation illegal.", "medium")

Q(T, L, "Ruby Bridges became famous in 1960 for what?",
  "Being the first black child to attend an all-white school in her city, escorted by officers",
  ["Winning an Olympic medal",
   "Writing a book about segregation",
   "Becoming a judge at a young age"],
  "She was six years old, and crowds shouted at her on the way in.", "medium")

Q(T, L, "Why did segregation continue for many years even after slavery was abolished?",
  "Laws and customs kept black people separate and unequal long after they were free",
  ["Because black people preferred to live separately",
   "Because nobody had noticed the problem",
   "Because slavery was never actually abolished"],
  "Freedom from slavery was not the same as equality.", "hard")

Q(T, L, "How is the American struggle against segregation similar to the fight against untouchability in India?",
  "Both involved a group kept out of shared spaces and treated as lesser by birth",
  ["Both were about taxes on farmers",
   "Both were caused by a shortage of schools",
   "They have nothing in common"],
  "Different countries and histories, but the same shape of injustice.", "hard")

Q(T, L, "Dr King and Dr Ambedkar both used which tool against injustice?",
  "Law, argument and organised peaceful protest",
  ["Armies and weapons",
   "Support from foreign rulers",
   "Withdrawal from public life"],
  "Both were highly educated men who chose persuasion and the law.", "hard")

Q(T, L, "What were the 'Jim Crow' laws?",
  "State laws in the American South that enforced segregation",
  ["Laws protecting farmers' crops",
   "Rules for American football",
   "Laws about immigration from Europe"],
  "They kept segregation in place for decades after slavery ended.", "medium")

Q(T, L, "Segregated schools for black children were usually worse funded. Why did that matter for the future?",
  "Poorer schooling limited the jobs and opportunities open to children later in life",
  ["It did not matter, since all schools teach the same",
   "It affected only the school buildings",
   "It made those schools more popular"],
  "Unequal schooling turns into unequal lives.", "hard")

Q(T, L, "What does 'civil rights' mean?",
  "The rights every citizen has to be treated equally and take part in public life",
  ["The rules of polite behaviour",
   "The right to own a car",
   "Rights that belong only to soldiers"],
  "Civil here means belonging to citizens.", "medium")

Q(T, L, "The Montgomery bus boycott lasted for over a year. What does its length tell us?",
  "That changing an unjust system takes sustained effort and sacrifice",
  ["That the buses were not needed",
   "That the protest was not serious",
   "That the boycott failed"],
  "Many walked miles to work every day for more than a year.", "hard")

Q(T, L, "Which of these is the clearest example of segregation?",
  "Separate drinking fountains marked for black and white people",
  ["A school with separate classrooms for each grade",
   "A bus with seats for the elderly",
   "A stadium with numbered seats"],
  "Look for the division made by who a person is, not by age or ticket.", "medium")

Q(T, L, "Why is Rosa Parks' refusal remembered as an act of courage?",
  "She knew she could be arrested, and was, but refused to accept an unjust rule",
  ["She was certain nothing would happen to her",
   "The bus was empty at the time",
   "The driver had asked her to stay seated"],
  "Courage is not the absence of risk.", "medium")

Q(T, L, "What did the Supreme Court decide in the Brown v. Board of Education case of 1954?",
  "That separate schools for black and white children were unconstitutional",
  ["That segregation should continue for ten more years",
   "That schools should charge fees",
   "That only universities must be integrated"],
  "'Separate but equal' was rejected as a contradiction.", "hard")

Q(T, L, "What is the main lesson of the American civil rights movement for students today?",
  "Ordinary people acting together can change laws that seem permanent",
  ["That protest never achieves anything",
   "That only presidents can change a country",
   "That injustice ends by itself with time"],
  "A seamstress, a preacher and a six-year-old girl all appear in this story.", "medium")

Q(T, L, "Barack Obama became president of the United States in 2009. Why was this seen as historic?",
  "He was the first black president of a country that had once enforced segregation by law",
  ["He was the youngest president ever elected",
   "He was the first president from a small state",
   "He was the first president to visit India"],
  "Measure the distance from 1955 in Montgomery to 2009 in Washington.", "medium")

Q(T, L, "Why do many countries teach the history of segregation even though it happened elsewhere?",
  "Because the pattern of one group being treated as lesser appears in every society",
  ["Because it is required by the United Nations",
   "Because it is the easiest history to teach",
   "Because it has no connection to their own country"],
  "The particular story is American. The pattern is not.", "hard")

# ═══════════════════════════════════════════════════════════════════════
# 8. Gender Stereotypes
# ═══════════════════════════════════════════════════════════════════════
T, L = "gender-stereotypes", "Gender Stereotypes"

Q(T, L, "What is a gender stereotype?",
  "A fixed idea about what boys or girls should be like or should do",
  ["A medical test done at birth",
   "A rule written in the Constitution",
   "A subject taught in school"],
  "It decides in advance what someone can do, based only on being a boy or a girl.", "easy")

Q(T, L, "Why is telling a boy 'boys don't cry' harmful?",
  "It teaches him to hide his feelings instead of dealing with them",
  ["It makes him physically stronger",
   "It helps him make friends more easily",
   "It is not harmful, only old-fashioned"],
  "Feelings do not disappear because a child is told not to show them.", "medium")

Q(T, L, "Which of these is a gender stereotype?",
  "Saying that cooking is women's work",
  ["Saying that some people enjoy cooking",
   "Saying that a chef needs training",
   "Saying that food is needed by everyone"],
  "Look for the sentence that assigns a task to one gender.", "easy")

Q(T, L, "A girl is discouraged from playing football because 'it is a boys' game'. What is happening?",
  "She is being denied an opportunity because of a gender stereotype",
  ["She is being protected from injury",
   "She is being given good sporting advice",
   "She is being treated equally"],
  "Nobody asked whether she was good at it or enjoyed it.", "easy")

Q(T, L, "Why do gender stereotypes limit boys as well as girls?",
  "They push boys away from things like caring, cooking or dancing that they may want to do",
  ["They affect only girls, never boys",
   "They give boys too many choices",
   "They make boys work harder at school"],
  "A box has walls on every side.", "hard")

Q(T, L, "In many homes, girls are expected to do housework while brothers are not. What is this an example of?",
  "An unequal division of work based on gender",
  ["A fair sharing of duties",
   "A rule made by the government",
   "A sign that girls enjoy housework more"],
  "Ask whether the same expectation is placed on both children.", "medium")

Q(T, L, "What is the effect on a girl's studies when she carries most of the housework?",
  "She has less time and energy to study, however capable she is",
  ["It improves her marks",
   "It has no effect at all",
   "It gives her extra time for homework"],
  "Time spent one way cannot be spent another.", "medium")

Q(T, L, "Which of these is NOT decided by whether someone is a boy or a girl?",
  "What subjects they can be good at",
  ["Nothing — gender decides everything",
   "Their favourite colour, which is fixed at birth",
   "The games they are capable of enjoying"],
  "Ability in a subject has nothing to do with gender.", "medium")

Q(T, L, "Toy shops often place dolls in one aisle and building sets in another. What does this teach children?",
  "That some toys, and the skills they build, belong to one gender only",
  ["How to find toys quickly",
   "Which toys are most expensive",
   "Nothing at all"],
  "A child learns what is 'for them' long before anyone says it aloud.", "hard")

Q(T, L, "A father takes leave from work to look after a new baby. What does this show?",
  "That caring for children is a parent's job, not only a mother's",
  ["That he does not enjoy his work",
   "That the mother is unwell",
   "That he has broken a rule"],
  "Ask why the same choice by a mother would surprise nobody.", "medium")

Q(T, L, "How does a stereotype about girls and mathematics affect real results?",
  "Girls who hear it may lose confidence and stop trying, which then seems to prove the stereotype",
  ["It changes the answers to mathematics problems",
   "It has no effect on anything",
   "It makes girls better at mathematics"],
  "This is why a false belief can appear to come true.", "hard")

Q(T, L, "Which statement about housework is accurate?",
  "It is work, whoever does it, and it can be shared by everyone in a family",
  ["It is not really work",
   "It is naturally suited to women",
   "It should be done only by children"],
  "Notice that it is usually unpaid and often unnoticed.", "medium")

Q(T, L, "A boy wants to learn classical dance and is teased. What is the best response from his classmates?",
  "Support him, because interests are not decided by gender",
  ["Join in the teasing so he changes his mind",
   "Tell him to keep it secret",
   "Ask a teacher to stop the dance classes"],
  "Some of India's finest classical dancers are men.", "easy")

Q(T, L, "What does it mean to say gender roles are 'learned'?",
  "Children pick them up from family, school and society rather than being born with them",
  ["That they are taught as a school subject",
   "That they cannot ever change",
   "That only adults have them"],
  "If they are learned, they can also be unlearned.", "hard")

Q(T, L, "Which is the strongest reason for sharing housework equally at home?",
  "Everyone benefits from the home, so everyone should contribute to running it",
  ["Because the government requires it",
   "Because it makes the house cleaner",
   "Because children enjoy chores"],
  "The argument is about fairness, not about tidiness.", "medium")

Q(T, L, "A school offers woodwork only to boys and needlework only to girls. What should it do instead?",
  "Offer both to all students and let them choose",
  ["Cancel both subjects",
   "Keep the arrangement, since it is traditional",
   "Offer them only in alternate years"],
  "The fair test is whether the choice belongs to the student.", "easy")

Q(T, L, "Why is 'she throws like a girl' an insult that carries a stereotype?",
  "It uses being a girl as a way of saying someone is bad at something",
  ["It is a compliment about accuracy",
   "It describes a real physical rule",
   "It is a technical term used in sport"],
  "Ask what the phrase assumes before it is even finished.", "hard")

Q(T, L, "How do films and advertisements often strengthen gender stereotypes?",
  "By repeatedly showing men in one kind of role and women in another",
  ["By showing every kind of person equally",
   "By avoiding pictures of people",
   "They have no influence on what people believe"],
  "Repetition is what makes an idea start to feel normal.", "medium")

Q(T, L, "What is the difference between a biological fact and a gender stereotype?",
  "A biological fact is about the body; a stereotype is a social expectation added on top",
  ["There is no difference",
   "A stereotype is always true",
   "A biological fact can be changed by opinion"],
  "Only one of the two can be argued away.", "hard")

Q(T, L, "What is the best way for a class to challenge gender stereotypes?",
  "Share tasks and opportunities equally and question assumptions when they come up",
  ["Separate boys and girls for all activities",
   "Never discuss the subject",
   "Let only teachers decide everything"],
  "The change is made in ordinary daily arrangements.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 9. Women Who Broke Through
# ═══════════════════════════════════════════════════════════════════════
T, L = "women-who-led", "Women Who Broke Through"

Q(T, L, "Indra Nooyi is known for leading which global company?",
  "PepsiCo", ["Infosys", "Tata Steel", "Microsoft"],
  "She was its chief executive from 2006 to 2018.", "easy")

Q(T, L, "In which Indian city was Indra Nooyi born and educated?",
  "Chennai", ["Jaipur", "Lucknow", "Bhopal"],
  "She studied in Chennai and Kolkata before going to the United States.", "medium")

Q(T, L, "Saina Nehwal made history in which sport?",
  "Badminton", ["Tennis", "Hockey", "Athletics"],
  "She reached world number one in 2015.", "easy")

Q(T, L, "What did Saina Nehwal achieve at the London Olympics in 2012?",
  "She won a bronze medal, the first Olympic medal for India in badminton",
  ["She won a gold medal in tennis",
   "She carried the Indian flag at the closing ceremony",
   "She won India's first Olympic medal of any kind"],
  "Her medal opened the door for Indian badminton.", "medium")

Q(T, L, "Dipa Karmakar is remembered as the first Indian woman to do what?",
  "Compete in gymnastics at the Olympic Games",
  ["Win a gold medal in swimming",
   "Captain the Indian cricket team",
   "Referee an international match"],
  "She qualified for the Rio Olympics in 2016.", "medium")

Q(T, L, "How close did Dipa Karmakar come to a medal at the Rio Olympics in 2016?",
  "She finished fourth in the vault, missing bronze very narrowly",
  ["She won the gold medal",
   "She did not reach the final",
   "She withdrew before the event"],
  "Fourth at the Olympics is the hardest place to finish.", "medium")

Q(T, L, "Kalpana Chawla was the first woman of Indian origin to do what?",
  "Travel into space", ["Fly a fighter aircraft", "Climb Mount Everest", "Win a Nobel Prize"],
  "She first flew aboard the space shuttle in 1997.", "easy")

Q(T, L, "Kalpana Chawla trained as which kind of engineer?",
  "An aerospace engineer", ["A civil engineer", "A chemical engineer", "A mining engineer"],
  "She studied in Punjab and then in the United States.", "medium")

Q(T, L, "What happened during Kalpana Chawla's second space mission in 2003?",
  "The shuttle Columbia broke apart on its return and the whole crew was lost",
  ["The mission was cancelled before launch",
   "She returned safely and retired",
   "The shuttle landed in the wrong country"],
  "She is remembered for how she lived, not only for how she died.", "medium")

Q(T, L, "What do the lives of these four women have in common?",
  "Each succeeded in a field where few Indian women had gone before",
  ["They all played the same sport",
   "They were all born in the same city",
   "They all worked for the government"],
  "Business, badminton, gymnastics and space — four different doors.", "medium")

Q(T, L, "Why does it matter that girls hear about women like Saina Nehwal and Kalpana Chawla?",
  "Seeing someone like yourself succeed makes an ambition feel possible",
  ["Because their stories are required in examinations",
   "Because girls cannot learn from men's stories",
   "It does not matter who the examples are"],
  "It is hard to aim at something you have never seen anyone do.", "hard")

Q(T, L, "Dipa Karmakar performed the Produnova, one of gymnastics' most difficult vaults. What does this show?",
  "That she was willing to attempt the hardest routine to compete with the best",
  ["That the vault was easy for everyone",
   "That gymnastics has no difficult moves",
   "That she avoided risk in competition"],
  "Very few gymnasts in the world have attempted it.", "hard")

Q(T, L, "Indra Nooyi has spoken about the difficulty of balancing work and family. Why is this worth knowing?",
  "It shows that women often face demands at home that their male colleagues do not",
  ["It shows she did not enjoy her job",
   "It proves women should not lead companies",
   "It has nothing to do with equality"],
  "The extra load is part of what makes the climb steeper.", "hard")

Q(T, L, "What did Saina Nehwal's success change for young Indian players?",
  "It showed that an Indian could reach the very top in world badminton",
  ["It made badminton an Olympic sport",
   "It ended all other sports in India",
   "It changed the rules of the game"],
  "Players who followed her have spoken about watching her win.", "medium")

Q(T, L, "Which statement about these four women is accurate?",
  "They reached the top of fields long dominated by men",
  ["They were all given their positions without competing",
   "They all worked in the same country",
   "They each inherited their position from family"],
  "Each of them competed against the best in the world.", "medium")

Q(T, L, "What does the phrase 'breaking the glass ceiling' mean?",
  "Reaching a senior position that women were previously kept out of, though nobody admitted the barrier existed",
  ["Repairing the roof of a building",
   "Winning a sporting trophy made of glass",
   "Leaving a job to start a business"],
  "The barrier is invisible, which is exactly the point of the phrase.", "hard")

Q(T, L, "Kalpana Chawla grew up in Karnal, a small town in Haryana, and became an astronaut. What does her path show?",
  "That where a person begins need not decide how far they go",
  ["That only people from large cities can become astronauts",
   "That her family already worked in space research",
   "That she left India as a young child"],
  "Very few girls from small Indian towns in the 1960s could have imagined that career.", "hard")

Q(T, L, "How should a school best encourage girls to aim high?",
  "Give them the same opportunities, coaching and expectations as boys",
  ["Set easier goals for them",
   "Ask them to choose safer careers",
   "Praise them only for good behaviour"],
  "Lower expectations are a kindness that costs a great deal.", "medium")

Q(T, L, "A girl says she wants to be an engineer and is told to try teaching instead. What is happening?",
  "Her ambition is being narrowed by a stereotype about suitable work for women",
  ["She is being given expert career advice",
   "She is being told a fact about engineering",
   "She is being treated exactly as a boy would be"],
  "Ask whether a boy saying the same thing would get the same reply.", "medium")

Q(T, L, "What is the most useful lesson from these four life stories?",
  "That ability is not decided by gender, and opportunity is what most often decides who succeeds",
  ["That only exceptional people should try",
   "That success depends mainly on luck",
   "That women succeed only in sport"],
  "Ask what each of them needed besides talent.", "hard")

# ═══════════════════════════════════════════════════════════════════════
# 10. Valuing the Girl Child
#
# Handled through the law and the arithmetic of the sex ratio. Nothing here
# describes what is done to an unborn child.
# ═══════════════════════════════════════════════════════════════════════
T, L = "valuing-the-girl-child", "Valuing the Girl Child"

Q(T, L, "What is the sex ratio of a population?",
  "The number of females for every thousand males",
  ["The total number of people in a country",
   "The number of children in each family",
   "The proportion of people who can read"],
  "It is a simple count that reveals a great deal.", "medium")

Q(T, L, "In several Indian states the sex ratio has been much lower than expected. What does that indicate?",
  "That girls have been valued less, and in some places prevented from being born",
  ["That more boys are born naturally in those states",
   "That girls move away after birth",
   "That the counting was done wrongly"],
  "Nature produces roughly equal numbers, so a large gap has a human cause.", "hard")

Q(T, L, "What does the PCPNDT Act of 1994 prohibit?",
  "Using medical tests to find out the sex of an unborn child",
  ["All medical tests during pregnancy",
   "The building of new hospitals",
   "Women working as doctors"],
  "The tests themselves are useful for health; using them to select a child's sex is banned.", "medium")

Q(T, L, "Why is it illegal in India to tell parents the sex of an unborn child?",
  "Because that knowledge has been used to prevent girls from being born",
  ["Because doctors cannot determine it accurately",
   "Because the test is very expensive",
   "Because parents are not interested"],
  "The law targets the use of the information, not the medicine.", "hard")

Q(T, L, "What is the 'Beti Bachao, Beti Padhao' scheme about?",
  "Saving and educating the girl child",
  ["Building roads in villages",
   "Providing electricity to farms",
   "Training young men for jobs"],
  "The name translates directly: save the daughter, teach the daughter.", "easy")

Q(T, L, "In which year was the Beti Bachao, Beti Padhao scheme launched?",
  "2015", ["1995", "2005", "2020"],
  "It was launched at Panipat in Haryana in January 2015.", "medium")

Q(T, L, "Which of these reasons has been given for preferring sons, and why is it mistaken?",
  "That sons support parents in old age — yet daughters do so just as often",
  ["That sons are born healthier, which is medically proven",
   "That daughters cannot attend school",
   "That sons are required by law to inherit"],
  "The belief was never a fact, and daughters have disproved it for generations.", "hard")

Q(T, L, "How does the practice of dowry contribute to families treating a daughter as a burden?",
  "It makes a daughter's marriage costly, so some families see her as an expense",
  ["It makes daughters wealthier than sons",
   "It is required by the Constitution",
   "It has no effect on how families think"],
  "Dowry itself is illegal in India, but the custom persists in places.", "hard")

Q(T, L, "Under Indian law, what right does a daughter have in her family's ancestral property?",
  "The same right as a son",
  ["No right at all",
   "Half of what a son receives",
   "A right only if there is no son"],
  "The Hindu Succession Act was amended in 2005 to make daughters equal coparceners.", "medium")

Q(T, L, "What happens to a society where far fewer girls are born than boys?",
  "The imbalance creates serious social problems for the whole community, not only for women",
  ["Nothing changes",
   "The population becomes wealthier",
   "Schools become easier to run"],
  "A generation missing millions of women affects everyone in it.", "hard")

Q(T, L, "Which of these is the strongest argument for educating girls?",
  "Every child has an equal right to learn, and an educated girl gains choices for life",
  ["Educated girls demand smaller dowries",
   "It keeps girls occupied until marriage",
   "It is cheaper than educating boys"],
  "The right comes first; the benefits follow from it.", "medium")

Q(T, L, "A family sends its son to a private school and its daughter to a cheaper one. What is this?",
  "Discrimination, because the child's schooling is decided by gender rather than need or ability",
  ["A sensible way to save money",
   "A rule set by the government",
   "Equal treatment of both children"],
  "Ask what would happen if their genders were swapped.", "medium")

Q(T, L, "Why do many girls drop out of school earlier than boys?",
  "They are often kept back for housework, care of siblings, or early marriage",
  ["Because they find studying more difficult",
   "Because schools refuse to admit them",
   "Because they are not interested in learning"],
  "The reasons are usually about what is expected of them at home.", "medium")

Q(T, L, "What does 'gender equality' mean?",
  "That people have the same rights, opportunities and respect whatever their gender",
  ["That men and women must do identical jobs",
   "That the number of boys and girls in every class must match",
   "That differences between people are ignored"],
  "It is about equal standing, not identical lives.", "medium")

Q(T, L, "Which article of the Constitution allows the state to make special provisions for women and children?",
  "Article 15", ["Article 19", "Article 32", "Article 51"],
  "The same article that forbids discrimination also permits measures to correct it.", "hard")

Q(T, L, "Why is a law banning sex determination difficult to enforce?",
  "The test can be done quietly, and both the doctor and the family may keep it secret",
  ["Because the law is not written down",
   "Because courts refuse to hear such cases",
   "Because the test is impossible to perform"],
  "Where nobody involved will complain, the offence is hard to detect.", "hard")

Q(T, L, "What can schools do to help change attitudes towards girls?",
  "Give girls equal opportunities in class, sport and leadership, and teach why it matters",
  ["Hold separate classes for girls in every subject",
   "Avoid discussing the subject with students",
   "Ask girls to take fewer examinations"],
  "Children carry what they see at school back into their homes.", "medium")

Q(T, L, "Kerala has among the highest female literacy rates in India. What does this suggest?",
  "That when girls are educated and valued, whole regions do better on health and development",
  ["That literacy has no connection with development",
   "That Kerala has fewer girls than other states",
   "That literacy is measured differently there"],
  "Compare Kerala's health figures with the national average.", "hard")

Q(T, L, "What is the first step an ordinary family can take towards valuing a daughter equally?",
  "Giving her the same food, schooling and freedom to choose as a son",
  ["Waiting for the government to act",
   "Arranging her marriage early",
   "Keeping her at home for safety"],
  "Equality begins with the ordinary decisions made every day.", "easy")

Q(T, L, "Why is the phrase 'a daughter is not a burden' at the heart of this topic?",
  "Because treating a daughter as a cost is the belief that leads to every unfairness she faces",
  ["Because it is a slogan used in advertisements",
   "Because it refers to carrying heavy loads",
   "Because it applies only to poor families"],
  "Change the belief and the practices that follow it lose their reason.", "hard")

# ─────────────────────────────────────────────────────────────────────────
by_topic = Counter(x["topic"] for x in BANK)
print(f"{len(BANK)} questions across {len(by_topic)} topics")
for t, n in by_topic.items():
    d = Counter(x["difficulty"] for x in BANK if x["topic"] == t)
    print(f"   {n:3}  E{d['easy']:3} M{d['medium']:3} H{d['hard']:3}   {t}")

with open("scripts/banks/social-diversity.json", "w") as fh:
    json.dump(BANK, fh, indent=2)
    fh.write("\n")
print("\nwrote scripts/banks/social-diversity.json")
