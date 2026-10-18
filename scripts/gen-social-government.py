#!/usr/bin/env python3
"""
Builds the Class 6 "Understanding Government" bank for Social Science.

Written by hand. Civics questions go stale or go wrong easily — the number of
seats in a house, the age at which a person may vote, which body does what —
so every figure here is stated only where it is settled, and the questions lean
on what a thing is for rather than on numbers a child would only memorise.

The two case studies are told as histories with dates, because their whole
point is that the vote was not given freely anywhere. It was asked for, refused,
and asked for again — in Britain over decades, in South Africa over a lifetime.
India is set against them deliberately: it began with universal adult franchise
rather than arriving at it.

    python3 scripts/gen-social-government.py
"""

import json
from collections import Counter

CHAPTER = "Understanding Government"
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
# 1. What Is Government
# ═══════════════════════════════════════════════════════════════════════
T, L = "what-is-government", "What Is Government"

Q(T, L, "What is a government?",
  "The group of people and institutions with the authority to make and enforce decisions for a country",
  ["A company that sells goods to the public",
   "A building in the capital city",
   "A gathering of the richest people in a country"],
  "Two things matter: it decides, and its decisions can be enforced.", "easy")

Q(T, L, "Why does a country need a government at all?",
  "Because millions of people living together need shared rules, services and a way to settle disputes",
  ["Because someone must own the land",
   "Because every country must have a flag",
   "Because otherwise there would be no festivals"],
  "Imagine a city with no traffic rules and no one to settle a quarrel.", "easy")

Q(T, L, "What makes a government's decisions different from a suggestion?",
  "They apply to everyone and can be enforced by law",
  ["They are printed in newspapers",
   "They are announced by important people",
   "They are made in the capital city"],
  "You may ignore advice. You may not ignore a law.", "medium")

Q(T, L, "Where does a government's authority come from in a democracy?",
  "From the people, who choose it in elections",
  ["From the army",
   "From the wealthiest families",
   "From the oldest citizens"],
  "In a democracy the people lend the power and can take it back.", "medium")

Q(T, L, "Which of these is a decision only a government can make?",
  "Setting the taxes everyone in the country must pay",
  ["Deciding what a family will cook for dinner",
   "Choosing the captain of a school team",
   "Deciding which film to watch"],
  "Look for the decision that binds strangers as well as friends.", "easy")

Q(T, L, "What is meant by the 'rule of law'?",
  "That everyone, including those in government, must obey the law",
  ["That there must be a large number of laws",
   "That only judges need to follow the law",
   "That laws are decided by the ruler alone"],
  "The point is not that laws exist, but that nobody stands above them.", "hard")

Q(T, L, "A government builds a road that nobody wants to pay for individually. What does this illustrate?",
  "Governments provide things that benefit everyone but that no single person would pay for alone",
  ["That governments waste money",
   "That roads are cheaper than houses",
   "That only rich countries build roads"],
  "Who would pay for a road they share with a million strangers?", "hard")

Q(T, L, "What is the difference between a government and a country?",
  "The country is the land and the people; the government is who runs it at a given time",
  ["They mean exactly the same thing",
   "A country is smaller than a government",
   "A government lasts forever, a country does not"],
  "Governments change after elections. The country stays.", "medium")

Q(T, L, "Why are government decisions written down as laws?",
  "So that everyone can know them, and so they apply the same way to all",
  ["Because writing is a tradition",
   "So that only lawyers can read them",
   "To make books longer"],
  "An unwritten rule can be changed quietly to suit somebody.", "medium")

Q(T, L, "What happens in a country when there is no working government?",
  "Services break down and there is no reliable way to keep order or settle disputes",
  ["People become wealthier because there are no taxes",
   "Nothing changes at all",
   "Schools and hospitals run better"],
  "Think about who would run the hospitals, courts and water supply.", "medium")

Q(T, L, "Which of these best describes what a citizen is?",
  "A full member of a country, with rights and duties under its laws",
  ["Anyone standing on a country's soil",
   "A person who works for the government",
   "A person who has never broken a law"],
  "A visitor is not a citizen, even while inside the country.", "medium")

Q(T, L, "In a democracy, why is it important that people can criticise the government?",
  "Because a government that cannot be questioned has no reason to correct its mistakes",
  ["Because criticism is entertaining",
   "Because governments enjoy being criticised",
   "It is not important at all"],
  "Ask what would improve a government's behaviour if nobody could complain.", "hard")

Q(T, L, "Which of these is NOT a function of a government?",
  "Deciding which religion each family must follow",
  ["Collecting taxes",
   "Running courts of law",
   "Defending the country's borders"],
  "The Constitution leaves that choice with the person.", "medium")

Q(T, L, "What does it mean to say a government is 'accountable'?",
  "It must answer to the people for what it does",
  ["It keeps careful accounts of its money only",
   "It employs many accountants",
   "It cannot be removed from office"],
  "Elections are the sharpest form of accountability.", "hard")

Q(T, L, "How does a government affect the life of a school student every day?",
  "Through the school itself, the roads travelled, the water supplied and the rules obeyed",
  ["It has no effect until a person turns eighteen",
   "Only through the television news",
   "Only when there is an election"],
  "Count the government's work on the way to school.", "medium")

Q(T, L, "What is meant by 'sovereignty' of a country?",
  "That it makes its own decisions without being controlled by another country",
  ["That it has a very large army",
   "That it is ruled by a king",
   "That it has plenty of natural resources"],
  "India became sovereign when it decided its own affairs.", "hard")

Q(T, L, "Why do people obey laws even when nobody is watching?",
  "Because most people accept that shared rules make life together possible",
  ["Because cameras are everywhere",
   "Because laws are impossible to break",
   "Because they fear the army"],
  "A country policed only by fear would need a police officer for every citizen.", "hard")

Q(T, L, "A government collects taxes. What is the money mainly used for?",
  "Paying for shared services such as schools, hospitals, roads and defence",
  ["Paying the salaries of ministers only",
   "Buying land in other countries",
   "It is stored and never used"],
  "Follow the money to the things everybody uses.", "easy")

Q(T, L, "What is the difference between a rule made by a school and a law made by a government?",
  "A school rule applies inside the school; a law applies to everyone in the country",
  ["School rules are more serious",
   "There is no difference at all",
   "Only adults must follow laws"],
  "Both are rules; they differ in how far they reach.", "easy")

Q(T, L, "What is the strongest reason for a government to explain its decisions publicly?",
  "People are more likely to accept decisions they understand, and can correct them if they are wrong",
  ["Explanations make announcements longer",
   "It is required by every religion",
   "It helps newspapers sell copies"],
  "Consent is easier to give when the reasoning is visible.", "hard")

# ═══════════════════════════════════════════════════════════════════════
# 2. Functions of Government
# ═══════════════════════════════════════════════════════════════════════
T, L = "functions-of-government", "Functions of Government"

Q(T, L, "Which of these is a basic function of any government?",
  "Maintaining law and order",
  ["Choosing the names of newborn children",
   "Deciding what people wear at home",
   "Selecting who marries whom"],
  "Look for the task that keeps a large society working.", "easy")

Q(T, L, "Why does a government run schools and hospitals rather than leaving them entirely to private owners?",
  "So that education and health are available to those who cannot afford to pay",
  ["Because private schools are illegal",
   "Because governments enjoy running buildings",
   "Because doctors must be government employees"],
  "Ask what would happen to a poor child if there were no government school.", "hard")

Q(T, L, "Which government function is at work when a bridge is built across a river?",
  "Providing public infrastructure",
  ["Defending the borders",
   "Conducting elections",
   "Punishing criminals"],
  "Infrastructure means the shared structures a country runs on.", "easy")

Q(T, L, "What is the government's role during a flood or an earthquake?",
  "Organising rescue, relief and rebuilding on a scale no individual could manage",
  ["Waiting until the water goes down",
   "Asking each family to manage alone",
   "Only recording how many were affected"],
  "Disaster response needs resources only a state can gather quickly.", "medium")

Q(T, L, "Why is defence considered a function of the national government rather than a state or local one?",
  "Because the country's borders and security concern the whole nation at once",
  ["Because states have no money",
   "Because soldiers dislike travelling",
   "Because borders change every year"],
  "A threat to one border is a threat to the whole country.", "medium")

Q(T, L, "A government sets a minimum wage. Which function is this?",
  "Protecting people from unfair treatment in the economy",
  ["Defending the country",
   "Conducting elections",
   "Building roads"],
  "It steps in where one side has far more bargaining power than the other.", "hard")

Q(T, L, "Why does a government make rules about the quality of food sold in shops?",
  "Because a buyer cannot test food for safety themselves before eating it",
  ["Because shopkeepers ask for the rules",
   "To make food more expensive",
   "Because food is imported"],
  "Some risks cannot be judged by the person taking them.", "hard")

Q(T, L, "Which of these shows a government settling a dispute?",
  "A court deciding a quarrel between two people over land",
  ["Two neighbours agreeing between themselves",
   "A family dividing household work",
   "Friends deciding who bats first"],
  "The state provides a neutral place to settle what people cannot settle themselves.", "medium")

Q(T, L, "What is the purpose of the government issuing currency notes?",
  "To provide money everybody trusts and accepts across the country",
  ["To decorate wallets",
   "To count the population",
   "To replace the need for banks"],
  "Money works only if everyone agrees it has value.", "medium")

Q(T, L, "Which function of government is involved in running the railways?",
  "Providing a public service that connects the whole country",
  ["Interpreting the Constitution",
   "Conducting the census",
   "Appointing judges"],
  "It is a service the public uses every day.", "easy")

Q(T, L, "Why does the government conduct a census every ten years?",
  "To find out how many people there are and what they need, so services can be planned",
  ["To decide who may vote",
   "To collect taxes on the spot",
   "To choose the capital city"],
  "You cannot plan schools without knowing how many children there are.", "medium")

Q(T, L, "A government builds a canal to bring water to farms. Which need is being met?",
  "The need for resources that individual farmers could not arrange alone",
  ["The need for entertainment",
   "The need for a new border",
   "The need for more elections"],
  "One farmer cannot dig a canal across a district.", "medium")

Q(T, L, "Why do governments regulate how factories dispose of their waste?",
  "Because the harm falls on people who had no part in the factory's profit",
  ["Because factories ask to be regulated",
   "To make factories close down",
   "Because waste is valuable"],
  "The river is used by everyone downstream.", "hard")

Q(T, L, "Which of these is the government's welfare function?",
  "Running schemes that support the poor, the elderly and the disabled",
  ["Holding a parade on Republic Day",
   "Printing the national anthem",
   "Naming new roads"],
  "Welfare means looking after those least able to look after themselves.", "medium")

Q(T, L, "Why is it a government's job to run courts rather than leaving disputes to be settled privately?",
  "Because a fair decision needs someone with no interest in the quarrel and the power to enforce it",
  ["Because private people cannot read the law",
   "Because courts make money",
   "Because disputes are rare"],
  "Both sides must accept the referee, and the result.", "hard")

Q(T, L, "What is the government's role in controlling the spread of a disease?",
  "Organising vaccination, treatment and public information across the whole population",
  ["Asking each family to find its own cure",
   "Closing all hospitals",
   "Waiting for the disease to pass"],
  "A disease crosses every boundary a family can draw.", "medium")

Q(T, L, "Which of these best explains why some services are provided by government rather than sold for profit?",
  "Some things everyone needs would be out of reach for many if they had to be bought",
  ["Businesses are not allowed to provide services",
   "Government services are always better",
   "Profit is illegal in India"],
  "Think of who would be left out if every service had a price.", "hard")

Q(T, L, "A government reduces the tax on medicines. What is it trying to do?",
  "Make an essential thing cheaper and easier for people to obtain",
  ["Increase its own income",
   "Discourage people from buying medicine",
   "Help medicine shops close"],
  "Taxes can be used to steer behaviour, not only to raise money.", "medium")

Q(T, L, "Which function does the police force carry out?",
  "Enforcing the law and maintaining public order",
  ["Making new laws",
   "Deciding court cases",
   "Setting tax rates"],
  "Note that enforcing a law is different from making or judging it.", "easy")

Q(T, L, "What is the most complete description of what governments do?",
  "They make rules, provide shared services, and settle disputes among people",
  ["They collect money and store it",
   "They organise festivals and parades",
   "They print newspapers and books"],
  "Three verbs cover most of it: decide, provide, resolve.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 3. Levels of Government
# ═══════════════════════════════════════════════════════════════════════
T, L = "levels-of-government", "Levels of Government"

Q(T, L, "Why does a large country have more than one level of government?",
  "Because some decisions suit the whole country and others suit a village or a city",
  ["Because it creates more jobs",
   "Because one government would be too small",
   "Because the Constitution has many pages"],
  "Defence concerns everyone; a village street light does not.", "medium")

Q(T, L, "Which level of government would repair a broken street light in your neighbourhood?",
  "The local government", ["The national government", "The state government", "A foreign government"],
  "The smallest problems are handled closest to the ground.", "easy")

Q(T, L, "Which level of government would decide policy for the country's armed forces?",
  "The national government", ["The local government", "The village panchayat", "The municipal corporation"],
  "Defence is a matter for the whole country at once.", "easy")

Q(T, L, "What is the main advantage of local government?",
  "The people deciding are close to the problem and know the area well",
  ["It costs nothing to run",
   "It can ignore national laws",
   "It never makes mistakes"],
  "Someone in the capital is unlikely to know which drain floods every monsoon.", "medium")

Q(T, L, "Why can a local government not decide its own foreign policy?",
  "Because a country must speak with one voice to other countries",
  ["Because local governments have no offices",
   "Because foreign countries are far away",
   "Because it would be too expensive"],
  "Imagine each district signing its own treaties.", "hard")

Q(T, L, "A decision about the syllabus for schools across a state is taken at which level?",
  "The state government", ["The village panchayat", "The municipal ward", "The United Nations"],
  "The state runs its own school system within national rules.", "medium")

Q(T, L, "What is the term for dividing powers between a national government and state governments?",
  "Federalism", ["Monarchy", "Bureaucracy", "Diplomacy"],
  "India is described as a federal country with a strong centre.", "hard")

Q(T, L, "Why might two states have different rules about the same subject?",
  "Because states are allowed to decide certain matters for themselves",
  ["Because states may ignore the Constitution",
   "Because there is no national government",
   "Because the states are in different countries"],
  "Some subjects belong to the states, some to the centre, some to both.", "hard")

Q(T, L, "Which of these problems is best solved at the local level?",
  "Collecting rubbish from streets in a town",
  ["Signing a treaty with another country",
   "Deciding the value of the rupee",
   "Commanding the navy"],
  "Ask how far the problem reaches beyond the neighbourhood.", "easy")

Q(T, L, "What is the risk if every decision is taken by the national government alone?",
  "Local needs are ignored because the people deciding are too far away",
  ["Decisions would be made too quickly",
   "The country would have too many elections",
   "There would be no laws at all"],
  "Distance from a problem usually means less knowledge of it.", "hard")

Q(T, L, "Which level of government usually runs the public hospital in a district?",
  "The state government", ["The village panchayat only", "The national government only", "A private company"],
  "Health is largely a state subject in India.", "medium")

Q(T, L, "A new national highway is planned across several states. Which level takes the lead?",
  "The national government, because the road crosses state boundaries",
  ["Each village panchayat separately",
   "The municipal corporation of one city",
   "The state that is largest"],
  "A road that crosses borders needs a decision above them.", "medium")

Q(T, L, "What does 'decentralisation' mean?",
  "Moving decision-making power away from the centre and closer to the people",
  ["Building a new capital city",
   "Combining several states into one",
   "Removing all local bodies"],
  "The word means moving away from the centre.", "hard")

Q(T, L, "Why is it useful for a citizen that local government exists?",
  "Ordinary problems can be raised with someone nearby rather than in a distant capital",
  ["Local governments never collect taxes",
   "It reduces the number of elections",
   "Local officials cannot be questioned"],
  "It is easier to reach a ward councillor than a minister.", "medium")

Q(T, L, "Which statement about the levels of government is correct?",
  "They work together, each handling the matters best suited to it",
  ["They compete and one must eventually win",
   "Only the national level makes real decisions",
   "They are entirely independent of one another"],
  "Think of them as layers of one system, not rivals.", "medium")

Q(T, L, "A city runs out of drinking water. Which levels are likely to be involved?",
  "Local government for supply, and state government for the larger water sources",
  ["Only the national government",
   "Only foreign governments",
   "No level of government at all"],
  "Big problems often reach across more than one level.", "hard")

Q(T, L, "Why do local bodies also need the power to collect some taxes?",
  "Because a body with no money of its own cannot act on its decisions",
  ["Because taxes are enjoyable to collect",
   "So that citizens pay twice",
   "Because the Constitution requires equal taxes"],
  "Responsibility without resources is only paperwork.", "hard")

Q(T, L, "Which of these is decided at the national level in most countries?",
  "The currency used across the country",
  ["The timing of a village fair",
   "The route of a local bus",
   "The name of a municipal park"],
  "A country cannot have a different rupee in every district.", "easy")

Q(T, L, "What usually happens when a state law conflicts with a national law on the same subject?",
  "The national law generally prevails",
  ["The state law always prevails",
   "Both are cancelled",
   "The older law prevails"],
  "The higher level sets the frame within which the lower one works.", "hard")

Q(T, L, "What is the simplest way to describe the three levels of government?",
  "One for the neighbourhood, one for the state, and one for the whole country",
  ["One for the rich, one for the poor, one for the rest",
   "One for laws, one for money, one for defence",
   "One for each political party"],
  "The levels are about area, not about groups of people.", "easy")

# ═══════════════════════════════════════════════════════════════════════
# 4. Levels of Government in India
# ═══════════════════════════════════════════════════════════════════════
T, L = "government-in-india", "Levels of Government in India"

Q(T, L, "What is the elected local body in an Indian village called?",
  "The gram panchayat", ["The Lok Sabha", "The Vidhan Sabha", "The Rajya Sabha"],
  "Gram means village.", "easy")

Q(T, L, "What is the local government of a large Indian city called?",
  "A municipal corporation", ["A gram sabha", "A zila parishad", "A state assembly"],
  "Smaller towns have municipalities or nagar panchayats.", "easy")

Q(T, L, "Which body makes laws for a state in India?",
  "The state legislative assembly, or Vidhan Sabha",
  ["The Lok Sabha", "The Supreme Court", "The gram panchayat"],
  "Vidhan Sabha means legislative assembly.", "medium")

Q(T, L, "Who heads the government of an Indian state?",
  "The Chief Minister", ["The Governor", "The President", "The Prime Minister"],
  "The Governor is the constitutional head; the Chief Minister runs the government.", "medium")

Q(T, L, "Which body makes laws for the whole of India?",
  "Parliament", ["The state assemblies together", "The Supreme Court", "The zila parishad"],
  "Parliament sits in New Delhi and its laws apply nationwide.", "easy")

Q(T, L, "Which amendments to the Constitution gave constitutional status to panchayats and municipalities?",
  "The 73rd and 74th Amendments of 1992",
  ["The 42nd Amendment of 1976",
   "The 61st Amendment of 1988",
   "The 1st Amendment of 1951"],
  "One covered rural bodies, the other urban ones.", "hard")

Q(T, L, "What is the gram sabha?",
  "The meeting of all adult voters of a village, to which the panchayat answers",
  ["A court that hears village disputes",
   "The office of the district collector",
   "A committee of the state government"],
  "It is the whole village, not a set of elected members.", "medium")

Q(T, L, "Why does the Constitution reserve seats for women in panchayats?",
  "To make sure women take part in decisions they had long been kept out of",
  ["Because men are not interested in local government",
   "Because women pay more taxes",
   "Because panchayats are small"],
  "Reservation opens a door that custom had kept closed.", "hard")

Q(T, L, "Which of these is a subject usually handled by the state government in India?",
  "Police and public order",
  ["Defence of the country",
   "Foreign affairs",
   "Currency and coinage"],
  "The three wrong answers are all national by their nature.", "medium")

Q(T, L, "What is a zila parishad?",
  "The elected body of local government at the district level",
  ["A state's upper house",
   "A national ministry",
   "A court above the High Court"],
  "Zila means district.", "medium")

Q(T, L, "Which level of government in India issues a birth certificate?",
  "The local body — the municipality or the panchayat",
  ["The Supreme Court",
   "The Ministry of Defence",
   "The Rajya Sabha"],
  "Records of everyday life are kept closest to where people live.", "medium")

Q(T, L, "A road inside a village needs repair. Who should the villagers approach first?",
  "Their gram panchayat", ["The Prime Minister", "The Supreme Court", "The Governor"],
  "Start at the level that owns the problem.", "easy")

Q(T, L, "Why was local self-government given constitutional protection in 1992?",
  "So that these bodies could not simply be ignored or dissolved by state governments",
  ["Because villages had asked for new names",
   "To reduce the number of states",
   "To replace the Parliament"],
  "Before that, local bodies existed at the pleasure of the states.", "hard")

Q(T, L, "Which official is appointed rather than elected?",
  "The Governor of a state",
  ["The Chief Minister",
   "A member of the Lok Sabha",
   "A ward councillor"],
  "The Governor is appointed by the President.", "hard")

Q(T, L, "How often are elections to the Lok Sabha normally held?",
  "Every five years", ["Every two years", "Every ten years", "Every year"],
  "Its normal term is five years unless dissolved earlier.", "easy")

Q(T, L, "Which of these decisions would a municipal corporation take?",
  "Where to place streetlights and how to collect the city's waste",
  ["Whether to sign a trade agreement with another country",
   "How many soldiers the army should have",
   "What the national income tax rate should be"],
  "City housekeeping is the corporation's work.", "easy")

Q(T, L, "What is the role of the district collector?",
  "An appointed officer who carries out government administration in a district",
  ["An elected head of the district",
   "A judge of the district court",
   "The leader of the state assembly"],
  "The collector implements; the elected bodies decide.", "hard")

Q(T, L, "Why do India's three levels of government sometimes work on the same problem?",
  "Because large problems, such as clean water or education, need action at every level",
  ["Because the levels do not trust each other",
   "Because the Constitution is unclear",
   "Because each level wants more taxes"],
  "A school needs a building locally, teachers from the state, and a national policy.", "hard")

Q(T, L, "Which house of Parliament represents the states of India?",
  "The Rajya Sabha", ["The Lok Sabha", "The Vidhan Sabha", "The gram sabha"],
  "Its members are chosen by the elected members of state assemblies.", "medium")

Q(T, L, "What does it mean that India is a federal country?",
  "Power is shared between the union government and the state governments under the Constitution",
  ["All power rests with the states",
   "All power rests with the union government",
   "There is no written division of power"],
  "Neither level can simply abolish the other.", "hard")

# ═══════════════════════════════════════════════════════════════════════
# 5. Organs of Government
# ═══════════════════════════════════════════════════════════════════════
T, L = "organs-of-government", "Legislature, Executive & Judiciary"

Q(T, L, "What are the three organs of government?",
  "The legislature, the executive and the judiciary",
  ["The army, the police and the courts",
   "The centre, the states and the districts",
   "The President, the Prime Minister and the Governor"],
  "One makes laws, one carries them out, one interprets them.", "easy")

Q(T, L, "What is the main work of the legislature?",
  "Making laws", ["Deciding court cases", "Running government departments", "Commanding the army"],
  "The word comes from the same root as 'legal'.", "easy")

Q(T, L, "What is the main work of the executive?",
  "Carrying out the laws and running the day-to-day administration",
  ["Making new laws",
   "Punishing people found guilty",
   "Interpreting the Constitution"],
  "It executes — that is, it puts decisions into effect.", "easy")

Q(T, L, "What is the main work of the judiciary?",
  "Interpreting the law and settling disputes",
  ["Collecting taxes",
   "Making new laws",
   "Conducting elections"],
  "It decides what the law means and who is right.", "easy")

Q(T, L, "Which two houses make up the Indian Parliament?",
  "The Lok Sabha and the Rajya Sabha",
  ["The Lok Sabha and the Vidhan Sabha",
   "The Rajya Sabha and the Supreme Court",
   "The Vidhan Sabha and the Vidhan Parishad"],
  "One is the house of the people, the other of the states.", "easy")

Q(T, L, "Who are the members of the Lok Sabha?",
  "Representatives elected directly by the voters of each constituency",
  ["Judges chosen by the Chief Justice",
   "Officials appointed by the President",
   "Members chosen by state assemblies"],
  "Lok means people.", "medium")

Q(T, L, "Why is the judiciary kept independent of the government?",
  "So that it can decide against the government itself when the law requires it",
  ["So that judges can work shorter hours",
   "So that courts can make their own laws",
   "So that judges need not study the Constitution"],
  "A court controlled by the government could not judge the government.", "hard")

Q(T, L, "What is meant by 'separation of powers'?",
  "Keeping law-making, law-enforcing and law-interpreting in different hands",
  ["Dividing the country into states",
   "Separating the rich from the poor",
   "Keeping men and women in different offices"],
  "The point is that no single body should hold all three.", "hard")

Q(T, L, "What is the danger if one person controls all three organs of government?",
  "There is nobody left to check their power, and rights become unsafe",
  ["Decisions would take longer",
   "The country would have too many laws",
   "Nothing would change"],
  "Who would judge a ruler who also makes and enforces the law?", "hard")

Q(T, L, "Which is the highest court in India?",
  "The Supreme Court", ["The High Court", "The district court", "The Lok Adalat"],
  "Its decisions bind every other court in the country.", "easy")

Q(T, L, "What is judicial review?",
  "The power of courts to strike down a law that violates the Constitution",
  ["The yearly review of judges' salaries",
   "A review of court buildings",
   "The power of Parliament to review judgments"],
  "It is how the Constitution is kept above ordinary laws.", "hard")

Q(T, L, "Who is the head of the executive at the national level in practice?",
  "The Prime Minister, along with the Council of Ministers",
  ["The Chief Justice of India",
   "The Speaker of the Lok Sabha",
   "The Governor of a state"],
  "The President is head of state; the Prime Minister heads the government.", "medium")

Q(T, L, "How does the legislature keep a check on the executive?",
  "By questioning ministers, debating their decisions and controlling the budget",
  ["By deciding court cases against them",
   "By appointing the judges",
   "By commanding the police"],
  "Question Hour exists for exactly this reason.", "hard")

Q(T, L, "A law passed by Parliament is found to violate a Fundamental Right. What can happen?",
  "The Supreme Court can declare it invalid",
  ["Nothing, since Parliament is supreme",
   "The law applies only in some states",
   "The President must resign"],
  "The Constitution sits above the law-making body.", "hard")

Q(T, L, "Which organ of government does a police officer belong to?",
  "The executive", ["The legislature", "The judiciary", "None of the three"],
  "The police enforce the law rather than make or judge it.", "medium")

Q(T, L, "Who presides over the Lok Sabha?",
  "The Speaker", ["The President", "The Prime Minister", "The Chief Justice"],
  "The Speaker keeps order and decides points of procedure.", "medium")

Q(T, L, "What is the role of the President of India in law-making?",
  "A bill becomes law only after receiving the President's assent",
  ["The President writes all the bills",
   "The President votes in the Lok Sabha",
   "The President has no role at all"],
  "The signature is the final step.", "medium")

Q(T, L, "Why must ministers in India be members of the legislature?",
  "So that they can be questioned directly by the elected representatives",
  ["So that they can vote twice",
   "Because ministers must be lawyers",
   "To reduce the number of elections"],
  "Accountability works best face to face.", "hard")

Q(T, L, "A court orders the government to clean a polluted river. Which principle is at work?",
  "The judiciary holding the executive to its legal duties",
  ["The legislature making a new law",
   "The executive judging its own conduct",
   "The abolition of the separation of powers"],
  "The court is not making policy; it is enforcing an existing duty.", "hard")

Q(T, L, "Which statement about the three organs is correct?",
  "Each has its own work, and each limits the others",
  ["The judiciary is the most powerful of the three",
   "The three organs never interact",
   "The executive can overrule the courts"],
  "Separate, but deliberately connected.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 6. Monarchy, Dictatorship & Democracy
# ═══════════════════════════════════════════════════════════════════════
T, L = "forms-of-government", "Monarchy, Dictatorship & Democracy"

Q(T, L, "What is a monarchy?",
  "A form of government in which a king or queen rules, usually inheriting the position",
  ["A government chosen by lottery each year",
   "A government run by the army",
   "A government with no head at all"],
  "The defining feature is that the position passes down a family.", "easy")

Q(T, L, "What is a dictatorship?",
  "A government in which one person or a small group holds power without the people's consent",
  ["A government elected every five years",
   "A government run by judges",
   "A government with two houses"],
  "The people have no way to remove the ruler.", "easy")

Q(T, L, "What is a democracy?",
  "A form of government in which the people choose their rulers and can replace them",
  ["A government headed by the wealthiest citizen",
   "A government that never changes",
   "A government run by religious leaders"],
  "The Greek roots mean rule by the people.", "easy")

Q(T, L, "What is the difference between an absolute monarchy and a constitutional monarchy?",
  "In an absolute monarchy the ruler's word is law; in a constitutional one the monarch's powers are limited by law",
  ["There is no difference between them",
   "Absolute monarchies have no kings",
   "Constitutional monarchies have no laws"],
  "Britain and Japan have monarchs whose powers are limited.", "hard")

Q(T, L, "Why is a democracy usually considered fairer than a dictatorship?",
  "Because power comes from the people and can be taken back from a government that fails them",
  ["Because democracies make decisions faster",
   "Because dictatorships have no laws at all",
   "Because democracies are always wealthier"],
  "The test is not speed but whether the ruled can change the rulers.", "medium")

Q(T, L, "What is a republic?",
  "A country whose head of state is elected rather than inheriting the position",
  ["A country with no government",
   "A country ruled by a king",
   "A country with only one political party"],
  "This is why India is called a republic and 26 January is Republic Day.", "medium")

Q(T, L, "What is the difference between direct and representative democracy?",
  "In a direct democracy people vote on decisions themselves; in a representative one they elect others to decide",
  ["Direct democracy uses paper ballots only",
   "Representative democracy has no elections",
   "There is no real difference"],
  "A country of a billion people cannot gather to vote on every question.", "hard")

Q(T, L, "Which form of government does India have?",
  "A representative democracy and a republic",
  ["An absolute monarchy",
   "A military dictatorship",
   "A constitutional monarchy"],
  "The Preamble describes India as a sovereign, socialist, secular, democratic republic.", "easy")

Q(T, L, "In a dictatorship, why is the press usually controlled?",
  "Because free reporting would let people learn about the government's failures",
  ["Because newspapers are expensive to print",
   "Because dictators dislike reading",
   "Because journalists ask to be controlled"],
  "Control the information and you control what people can object to.", "hard")

Q(T, L, "Which of these is the clearest sign that a country is a democracy?",
  "Rulers can be voted out in regular, free elections",
  ["The country holds parades",
   "The ruler is popular",
   "The country has a written constitution"],
  "Many undemocratic countries have constitutions and parades.", "hard")

Q(T, L, "What does 'one person, one vote' mean?",
  "Every voter's ballot counts equally, whatever their wealth or position",
  ["Each person may vote only once in a lifetime",
   "Only one person may vote per family",
   "The vote of an elder counts for more"],
  "It is the rule that makes a poor voter equal to a rich one.", "medium")

Q(T, L, "Why do democracies hold elections at regular intervals rather than only when people are unhappy?",
  "Because a fixed date guarantees the chance to change the government without waiting for permission",
  ["Because elections are enjoyable",
   "So that governments can plan holidays",
   "Because the Constitution has no other purpose"],
  "A government that chose its own election date would never choose a bad moment.", "hard")

Q(T, L, "A ruler bans all other political parties. What kind of government is this becoming?",
  "A dictatorship, because there is no longer a real choice",
  ["A stronger democracy",
   "A constitutional monarchy",
   "A federal republic"],
  "An election with only one option is not a choice.", "medium")

Q(T, L, "In which form of government does the position of head of state pass from parent to child?",
  "Monarchy", ["Democracy", "Republic", "Dictatorship"],
  "Inheritance is the distinguishing feature.", "easy")

Q(T, L, "Why is a free judiciary important in a democracy but rare in a dictatorship?",
  "Independent courts can rule against the ruler, which a dictator cannot allow",
  ["Because dictators do not understand law",
   "Because courts are expensive to run",
   "Because judges refuse to work in dictatorships"],
  "The court is the one place a citizen can defeat the state.", "hard")

Q(T, L, "What is the strongest argument in favour of democracy despite its slowness?",
  "Decisions made with people's consent are more likely to be accepted and corrected when wrong",
  ["Democratic decisions are always correct",
   "Democracy costs nothing",
   "Democracies never make mistakes"],
  "The advantage is not perfection but the ability to change course.", "hard")

Q(T, L, "Which of these countries is a well-known constitutional monarchy?",
  "The United Kingdom", ["The United States", "France", "Brazil"],
  "It has a monarch as head of state and an elected parliament that governs.", "medium")

Q(T, L, "What does 'secular' mean in the description of the Indian state?",
  "The state does not favour any religion and treats all equally",
  ["The state has banned all religions",
   "The state follows the largest religion",
   "Religion may not be discussed in public"],
  "Neutral between religions, not opposed to them.", "medium")

Q(T, L, "Under a dictatorship, what usually happens to elections?",
  "They are cancelled, or held with no real opposition allowed",
  ["They are held more often than in democracies",
   "They are supervised by the courts",
   "They are decided by lottery"],
  "The form may survive; the substance does not.", "medium")

Q(T, L, "What is the most important thing that makes a government democratic?",
  "That its authority rests on the free consent of the people it governs",
  ["That it has three organs",
   "That it collects taxes",
   "That it has a capital city"],
  "Every government has organs and taxes. Not every one has consent.", "hard")

# ═══════════════════════════════════════════════════════════════════════
# 7. The Quest for Universal Adult Franchise
# ═══════════════════════════════════════════════════════════════════════
T, L = "universal-adult-franchise", "The Quest for Universal Adult Franchise"

Q(T, L, "What does 'universal adult franchise' mean?",
  "That every adult citizen has the right to vote, whatever their wealth, sex, religion or caste",
  ["That every adult must stand for election",
   "That voting is allowed only in cities",
   "That adults may vote in any country they visit"],
  "Franchise is another word for the right to vote.", "easy")

Q(T, L, "In most countries, who was allowed to vote when elections first began?",
  "Only a small number of wealthy men who owned property",
  ["Every adult citizen",
   "Only women",
   "Only people who could not read"],
  "The vote began as a privilege of property, not a right of citizenship.", "medium")

Q(T, L, "Why did rulers once argue that only property owners should vote?",
  "They claimed only those with wealth had a real stake in the country's affairs",
  ["Because poor people were not interested in politics",
   "Because there were not enough ballot papers",
   "Because property owners were better educated by law"],
  "It was an argument for keeping power where it already was.", "hard")

Q(T, L, "What is the connection between the right to vote and other rights?",
  "A group without the vote has no way to demand that its other rights be respected",
  ["There is no connection at all",
   "Voting matters only during elections",
   "Other rights must come first"],
  "The vote is the tool used to win everything else.", "hard")

Q(T, L, "What does 'suffrage' mean?",
  "The right to vote in elections",
  ["Suffering under an unjust ruler",
   "A tax paid before voting",
   "A form of local government"],
  "Suffragists and suffragettes campaigned for exactly this.", "medium")

Q(T, L, "Why was the demand for votes for women resisted for so long?",
  "Because of the belief that public and political life was not women's business",
  ["Because women had asked to be excluded",
   "Because there were no women citizens",
   "Because voting was too difficult"],
  "A stereotype about women's proper place stood behind the law.", "hard")

Q(T, L, "What is a 'literacy test' when used as a condition for voting?",
  "A test used to keep certain groups from voting by demanding they read something difficult",
  ["A test taken by candidates before an election",
   "A school examination for all students",
   "A test of the voting machine"],
  "Such tests were applied unequally, which was the point of them.", "hard")

Q(T, L, "Which statement about the history of voting rights is correct?",
  "In most countries the vote was widened slowly, group by group, after long campaigns",
  ["Every country granted universal suffrage at once",
   "Voting rights have never changed anywhere",
   "Women received the vote before men everywhere"],
  "The word 'quest' in this topic is doing real work.", "medium")

Q(T, L, "Which country was the first self-governing nation to give women the right to vote?",
  "New Zealand, in 1893", ["Britain, in 1918", "The United States, in 1920", "France, in 1944"],
  "It was decades ahead of most of Europe.", "hard")

Q(T, L, "Why is the secret ballot important?",
  "A voter can choose freely without fear of being punished for their choice",
  ["It makes counting faster",
   "It saves paper",
   "It allows people to vote twice"],
  "Where votes are public, the powerful can watch how the weak vote.", "medium")

Q(T, L, "What is the minimum voting age in India today?",
  "Eighteen", ["Sixteen", "Twenty-one", "Twenty-five"],
  "It was lowered from twenty-one in 1988.", "easy")

Q(T, L, "Which amendment lowered the voting age in India from twenty-one to eighteen?",
  "The 61st Amendment, in 1988",
  ["The 73rd Amendment, in 1992",
   "The 42nd Amendment, in 1976",
   "The 1st Amendment, in 1951"],
  "It took effect in time for the 1989 general election.", "hard")

Q(T, L, "Why was the voting age lowered to eighteen?",
  "Because young people were educated, informed and already treated as adults in other ways",
  ["Because there were too few voters",
   "Because older voters had complained",
   "To reduce the cost of elections"],
  "If eighteen is old enough to work or marry, it is old enough to vote.", "medium")

Q(T, L, "What does it mean that the right to vote in India is a constitutional right?",
  "It is guaranteed by the Constitution and cannot be withdrawn by an ordinary decision",
  ["It is a favour granted by the government each election",
   "It applies only to citizens over forty",
   "It may be bought and sold"],
  "Article 326 provides for elections on the basis of adult suffrage.", "hard")

Q(T, L, "Why do many countries make election day a public holiday?",
  "So that working people are not forced to choose between wages and voting",
  ["So that shops can sell more goods",
   "Because counting takes a whole day",
   "To reduce traffic"],
  "A right that costs a day's pay is not equally available to everyone.", "hard")

Q(T, L, "What is a constituency?",
  "The area whose voters elect one representative",
  ["The building where votes are counted",
   "A political party's headquarters",
   "The list of candidates"],
  "Each Lok Sabha member is elected from one.", "medium")

Q(T, L, "Why is it a problem if many people do not vote?",
  "The government that results represents fewer people's wishes",
  ["Ballot papers are wasted",
   "Elections take longer to count",
   "It has no effect at all"],
  "A choice made by few is still binding on all.", "medium")

Q(T, L, "What is the purpose of an independent Election Commission?",
  "To run elections fairly so that no party in power can fix the result",
  ["To choose the winning candidate",
   "To write the manifestos of parties",
   "To collect taxes during elections"],
  "The referee must not belong to either team.", "hard")

Q(T, L, "Which of these would make an election unfair even if voting itself were free?",
  "Some candidates being prevented from campaigning",
  ["A high number of voters turning out",
   "Candidates from many parties standing",
   "Results announced on the same day"],
  "A fair vote needs a fair contest before it.", "hard")

Q(T, L, "What is the simplest summary of the quest for universal adult franchise?",
  "A long struggle to turn the vote from a privilege of the few into a right of every adult",
  ["A short debate settled in one parliament",
   "A change that happened without any campaigning",
   "A rule invented in the twenty-first century"],
  "Privilege to right — that is the whole journey.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 8. The Suffragette Movement
# ═══════════════════════════════════════════════════════════════════════
T, L = "suffragette-movement", "The Suffragette Movement"

Q(T, L, "What were the suffragettes campaigning for?",
  "The right of women to vote in elections",
  ["Higher wages for factory workers",
   "The abolition of the monarchy",
   "Free railway travel for women"],
  "Suffrage means the right to vote.", "easy")

Q(T, L, "In which country did the suffragette movement of the early 1900s take place?",
  "Britain", ["South Africa", "Japan", "Brazil"],
  "It was centred on London and the industrial cities of England.", "easy")

Q(T, L, "Who founded the Women's Social and Political Union in 1903?",
  "Emmeline Pankhurst", ["Rosa Parks", "Florence Nightingale", "Sarojini Naidu"],
  "Her daughters Christabel and Sylvia were also leaders in the movement.", "medium")

Q(T, L, "What was the motto of the Women's Social and Political Union?",
  "Deeds not words", ["Liberty or death", "Peace and bread", "Knowledge is power"],
  "It marked their break from years of polite petitioning.", "medium")

Q(T, L, "What is the difference between a suffragist and a suffragette?",
  "Suffragists campaigned peacefully through petitions; suffragettes used militant protest",
  ["They campaigned for entirely different rights",
   "Suffragists were men and suffragettes were women",
   "There is no difference between the words"],
  "Both wanted the vote; they disagreed about method.", "hard")

Q(T, L, "Many imprisoned suffragettes went on hunger strike. Why?",
  "To demand to be treated as political prisoners and to draw public attention",
  ["Because prison food was expensive",
   "Because they wished to lose weight",
   "Because it was required by prison rules"],
  "A hunger strike turns a private punishment into public news.", "hard")

Q(T, L, "In 1918, British women won the vote, but with a condition. What was it?",
  "Only women over thirty who met a property qualification could vote",
  ["Only women who were married could vote",
   "Only women in London could vote",
   "All women over eighteen could vote"],
  "Men could vote at twenty-one, so it was still not equal.", "hard")

Q(T, L, "In which year did British women finally win the vote on the same terms as men?",
  "1928", ["1918", "1893", "1945"],
  "Ten years after the first, partial victory.", "medium")

Q(T, L, "Why did the suffragettes turn to disruptive protest after years of petitions?",
  "Because decades of peaceful requests had produced no change in the law",
  ["Because they enjoyed causing trouble",
   "Because petitions were illegal",
   "Because they were paid to protest"],
  "Their argument was that being ignored politely was still being ignored.", "hard")

Q(T, L, "Emily Davison is remembered for an act of protest at which event in 1913?",
  "The Epsom Derby horse race",
  ["A session of Parliament",
   "A royal wedding",
   "A football match"],
  "She stepped in front of the King's horse and later died of her injuries.", "medium")

Q(T, L, "What happened to the suffragette campaign during the First World War?",
  "It was largely suspended while women took on war work at home",
  ["It grew far more violent",
   "It moved to another country",
   "It was made illegal"],
  "Women's war work helped weaken the argument that they had no public role.", "hard")

Q(T, L, "Which argument was used against giving women the vote?",
  "That politics was a man's concern and women belonged in the home",
  ["That there were too few women in Britain",
   "That women already had the vote",
   "That voting was physically dangerous"],
  "It is a gender stereotype written into the law.", "medium")

Q(T, L, "What did suffragettes do to make their cause visible to the public?",
  "Held marches, chained themselves to railings and interrupted political meetings",
  ["Kept their campaign entirely secret",
   "Bought newspapers to avoid publicity",
   "Waited quietly for Parliament to act"],
  "Visibility was the strategy.", "medium")

Q(T, L, "Why is the suffragette movement studied alongside other struggles for rights?",
  "It shows a group organising over decades to win a right that was denied to them",
  ["It was the only protest movement in history",
   "It succeeded without any opposition",
   "It concerned only one city"],
  "The pattern — denial, campaign, partial win, full win — repeats elsewhere.", "hard")

Q(T, L, "What colours did the suffragettes adopt to identify their movement?",
  "Purple, white and green",
  ["Red, white and blue",
   "Black and gold",
   "Orange and green"],
  "They wore them on sashes and banners so a crowd could be recognised at once.", "medium")

Q(T, L, "How did newspapers help the suffragette cause even when they criticised it?",
  "They spread news of the campaign to people who would never have heard of it",
  ["They paid for the campaign directly",
   "They elected women to Parliament",
   "They stopped the government from acting"],
  "Attention, even hostile attention, kept the demand alive.", "hard")

Q(T, L, "What does the suffragette story show about how rights are usually won?",
  "They are demanded and organised for, rather than granted freely",
  ["They are given by rulers out of kindness",
   "They appear automatically as a country grows richer",
   "They are decided by other countries"],
  "Nobody in power offered the vote before it was demanded.", "hard")

Q(T, L, "A suffragette poster showed a woman with a degree who could not vote, beside a man who could. What was the argument?",
  "That the law ignored ability and education, and looked only at sex",
  ["That women should not attend university",
   "That men were better educated",
   "That degrees should be required to vote"],
  "The poster set two people side by side and let the unfairness speak.", "hard")

Q(T, L, "How long did the organised campaign for women's votes in Britain last?",
  "Several decades, from the mid-1800s to 1928",
  ["About six months",
   "Exactly one year",
   "Two centuries"],
  "Many who began the campaign did not live to vote.", "medium")

Q(T, L, "What is the clearest lesson of the suffragette movement for a student today?",
  "Rights that seem obvious now were once refused, and had to be won by ordinary people",
  ["Protest never changes anything",
   "Only famous people can change laws",
   "Voting has always been open to everyone"],
  "Ask how obvious women's suffrage seemed in 1900.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 9. The Anti-Apartheid Movement
# ═══════════════════════════════════════════════════════════════════════
T, L = "anti-apartheid", "The Anti-Apartheid Movement"

Q(T, L, "What was apartheid?",
  "A system in South Africa that separated people by race and denied rights to black South Africans",
  ["A South African political party",
   "A type of farming used in southern Africa",
   "A treaty between African countries"],
  "The word means 'apartness' in Afrikaans.", "easy")

Q(T, L, "In which country was apartheid the official policy?",
  "South Africa", ["Nigeria", "Kenya", "Egypt"],
  "It was made official government policy in 1948.", "easy")

Q(T, L, "Under apartheid, what did the pass laws require?",
  "Black South Africans to carry documents permitting them to be in certain areas",
  ["All citizens to carry a passport at all times",
   "Foreign visitors to register with the police",
   "Farmers to obtain a licence to sell crops"],
  "Movement in one's own country needed permission.", "medium")

Q(T, L, "Who was the most famous leader of the struggle against apartheid?",
  "Nelson Mandela", ["Martin Luther King Jr", "Mahatma Gandhi", "Kwame Nkrumah"],
  "He led the African National Congress and later became president.", "easy")

Q(T, L, "How many years did Nelson Mandela spend in prison?",
  "Twenty-seven", ["Five", "Twelve", "Forty"],
  "Much of it was spent on Robben Island.", "medium")

Q(T, L, "In which year was Nelson Mandela released from prison?",
  "1990", ["1976", "1984", "1994"],
  "His release opened the way to negotiations that ended apartheid.", "medium")

Q(T, L, "When were South Africa's first elections held in which all races could vote?",
  "1994", ["1948", "1960", "1990"],
  "Nelson Mandela became president after that election.", "medium")

Q(T, L, "Under apartheid, what was true of schools for black children?",
  "They were separate and deliberately given far fewer resources",
  ["They were the same as schools for white children",
   "They did not exist at all",
   "They were run by other countries"],
  "The system was designed to limit what black children could become.", "hard")

Q(T, L, "What was the Soweto uprising of 1976?",
  "A protest by black schoolchildren against being forced to study in Afrikaans, met with violence",
  ["A national election",
   "A strike by white factory workers",
   "A football tournament"],
  "It began with students and became a turning point.", "hard")

Q(T, L, "How did other countries put pressure on South Africa to end apartheid?",
  "Through boycotts, trade sanctions and banning South Africa from international sport",
  ["By declaring war on South Africa",
   "By ignoring the situation entirely",
   "By sending more trade and investment"],
  "Sporting isolation was felt keenly in a sport-loving country.", "medium")

Q(T, L, "What connection does Mahatma Gandhi have with South Africa?",
  "He lived and worked there as a young lawyer and first developed his methods of protest there",
  ["He was born in South Africa",
   "He served as its president",
   "He never visited the country"],
  "He spent about twenty-one years there before returning to India.", "hard")

Q(T, L, "What did Nelson Mandela mean by seeking reconciliation rather than revenge after 1994?",
  "He wanted South Africans to build a shared future rather than punish each other for the past",
  ["He wanted apartheid to continue quietly",
   "He wanted white South Africans to leave",
   "He refused to discuss the past at all"],
  "The Truth and Reconciliation Commission came out of this thinking.", "hard")

Q(T, L, "What was the Truth and Reconciliation Commission?",
  "A body that heard testimony about crimes under apartheid so the country could face its past",
  ["A court that sentenced all former officials",
   "A committee that wrote the new constitution",
   "An organisation that ran the 1994 election"],
  "Its aim was truth first, and healing through it.", "hard")

Q(T, L, "Which prize did Nelson Mandela share in 1993?",
  "The Nobel Peace Prize", ["The Bharat Ratna", "The Booker Prize", "An Olympic gold medal"],
  "He shared it with F. W. de Klerk, the president who negotiated with him.", "medium")

Q(T, L, "How is apartheid similar to segregation in the United States?",
  "Both separated people by race by law and denied one group equal rights",
  ["Both were caused by a shortage of land",
   "Both lasted for exactly the same years",
   "Neither involved any laws"],
  "Different countries, the same machinery of separation.", "hard")

Q(T, L, "Under apartheid, black South Africans were the majority of the population. Why does this matter?",
  "It shows the system denied rights to most of the country's people to keep a minority in power",
  ["It means apartheid was democratic",
   "It shows the majority supported apartheid",
   "It made no difference to the system"],
  "A vote for all would have ended the system at once, which is why there was none.", "hard")

Q(T, L, "What does the South African constitution of 1996 guarantee?",
  "Equality for all citizens regardless of race",
  ["Separate areas for each race",
   "Voting rights only for property owners",
   "A return to the pass laws"],
  "It is often described as one of the most progressive constitutions in the world.", "medium")

Q(T, L, "Why did the anti-apartheid movement need support from outside South Africa?",
  "Because protest inside the country was banned and severely punished",
  ["Because South Africans did not object to apartheid",
   "Because other countries wanted South Africa's land",
   "Because the movement had no leaders"],
  "When protest at home is crushed, pressure must come from elsewhere too.", "hard")

Q(T, L, "What is the main lesson of the anti-apartheid struggle?",
  "A system built on racial injustice can be ended by sustained struggle at home and pressure abroad",
  ["Injustice always lasts forever",
   "Only violence can change a government",
   "Other countries should never interfere in anything"],
  "It took decades, but the system fell.", "medium")

Q(T, L, "Nelson Mandela served only one term as president and then stepped down. Why is this remembered?",
  "It showed he valued democracy above his own power",
  ["He was voted out of office",
   "He was too ill to continue",
   "The constitution allowed only one term"],
  "Many leaders who free a country do not let go of it afterwards.", "hard")

# ═══════════════════════════════════════════════════════════════════════
# 10. Universal Adult Franchise in India
# ═══════════════════════════════════════════════════════════════════════
T, L = "franchise-in-india", "Universal Adult Franchise in India"

Q(T, L, "When India became independent, who was given the right to vote?",
  "Every adult citizen, from the very first general election",
  ["Only men who owned property",
   "Only people who could read and write",
   "Only those living in cities"],
  "India did not widen the vote step by step; it began with everyone.", "medium")

Q(T, L, "Why is India's adoption of universal adult franchise considered remarkable?",
  "Most countries had extended the vote slowly over decades, while India granted it to all at once",
  ["Because India had very few voters",
   "Because India copied the British system exactly",
   "Because voting was optional"],
  "Britain took most of a century. India did it in one step.", "hard")

Q(T, L, "In which years was India's first general election held?",
  "1951 and 1952", ["1947", "1950", "1962"],
  "It was spread over several months because of the country's size.", "medium")

Q(T, L, "Roughly how many people were eligible to vote in India's first general election?",
  "About 173 million", ["About 5 million", "About 20 million", "About 600 million"],
  "It was the largest election the world had ever seen at that time.", "hard")

Q(T, L, "Most voters in India's first election could not read. How did the Election Commission help them?",
  "By giving each party a symbol that voters could recognise on the ballot",
  ["By reading the ballot aloud to each voter",
   "By allowing only literate people to vote",
   "By postponing the election"],
  "Party symbols are still used in Indian elections today.", "hard")

Q(T, L, "Who was India's first Chief Election Commissioner?",
  "Sukumar Sen", ["B. R. Ambedkar", "Jawaharlal Nehru", "Rajendra Prasad"],
  "He organised the first general election.", "hard")

Q(T, L, "Which article of the Constitution provides for elections on the basis of adult suffrage?",
  "Article 326", ["Article 17", "Article 21", "Article 51A"],
  "It sets the constitutional basis for one person, one vote.", "hard")

Q(T, L, "Why did the makers of the Constitution reject a literacy test for voting?",
  "Because it would have excluded most Indians and denied them a say in their own country",
  ["Because tests were too expensive to print",
   "Because everyone in India could read",
   "Because the British had forbidden tests"],
  "A test would have handed the country back to a small educated class.", "hard")

Q(T, L, "What is an electoral roll?",
  "The official list of people entitled to vote in a constituency",
  ["The list of candidates standing for election",
   "The record of how each person voted",
   "The list of polling officers"],
  "Your name must be on it before you can vote.", "medium")

Q(T, L, "What is the purpose of a voter identity card?",
  "To confirm that the person voting is the one on the electoral roll",
  ["To show which party a person supports",
   "To allow voting in any constituency",
   "To record a person's income"],
  "It protects against someone voting in another's name.", "easy")

Q(T, L, "What does the Election Commission of India do?",
  "Conducts and supervises elections to Parliament, state assemblies and certain offices",
  ["Chooses the Prime Minister",
   "Writes the laws passed by Parliament",
   "Decides court cases about elections"],
  "It is an independent constitutional body.", "medium")

Q(T, L, "What is an Electronic Voting Machine used for?",
  "Recording and counting votes accurately and quickly",
  ["Choosing the candidates for a party",
   "Registering new voters",
   "Announcing the election dates"],
  "It replaced millions of paper ballots.", "easy")

Q(T, L, "What is the NOTA option on an Indian ballot?",
  "A choice meaning 'none of the above', for voters who reject all candidates",
  ["A reserved seat for new parties",
   "A second vote for the same candidate",
   "A way of voting for two candidates"],
  "It lets a voter record disapproval without staying at home.", "medium")

Q(T, L, "Why does India hold elections over several phases?",
  "Because the country is so large that security and staff must be moved between regions",
  ["Because votes are counted after each phase",
   "Because each state has different laws",
   "To give parties more time to campaign"],
  "The same officers and forces cover the country in stages.", "hard")

Q(T, L, "Which of these people may NOT vote in an Indian general election?",
  "A citizen aged sixteen",
  ["A citizen aged eighteen who cannot read",
   "A woman who owns no property",
   "A citizen living in a remote village"],
  "Only one of these fails the single condition that applies.", "medium")

Q(T, L, "What did universal adult franchise mean for Indians who had faced caste discrimination?",
  "Their vote counted exactly as much as anyone else's, whatever their birth",
  ["They were given two votes each",
   "They had to vote separately",
   "They could vote only in village elections"],
  "Political equality arrived before social equality, which was Ambedkar's point.", "hard")

Q(T, L, "Why is a high voter turnout considered good for a democracy?",
  "The government that results reflects the wishes of more of the people",
  ["It makes counting easier",
   "It reduces the cost of elections",
   "It guarantees the best candidate wins"],
  "Legitimacy grows with participation.", "medium")

Q(T, L, "What is the connection between the suffragette movement and Indian women's right to vote?",
  "Indian women received the vote with independence, without the decades-long fight British women had",
  ["Indian women were given the vote by the suffragettes",
   "Indian women have never had the vote",
   "The two have no connection at all"],
  "Compare 1928 in Britain with 1950 in India, and how each was reached.", "hard")

Q(T, L, "What responsibility comes with the right to vote?",
  "Learning about the candidates and issues before choosing",
  ["Voting for the party your family supports",
   "Voting only when the weather is good",
   "Telling everyone how you voted"],
  "A right used carelessly is still a right, but it is worth less.", "medium")

Q(T, L, "What is the best summary of India's approach to the franchise in 1950?",
  "It trusted every adult citizen with the vote from the start, whatever their wealth or education",
  ["It copied the British system of gradual extension",
   "It gave the vote only to the educated",
   "It postponed elections until literacy improved"],
  "That trust is the striking thing about it.", "medium")

# ─────────────────────────────────────────────────────────────────────────
by_topic = Counter(x["topic"] for x in BANK)
print(f"{len(BANK)} questions across {len(by_topic)} topics")
for t, n in by_topic.items():
    d = Counter(x["difficulty"] for x in BANK if x["topic"] == t)
    print(f"   {n:3}  E{d['easy']:3} M{d['medium']:3} H{d['hard']:3}   {t}")

with open("scripts/banks/social-government.json", "w") as fh:
    json.dump(BANK, fh, indent=2)
    fh.write("\n")
print("\nwrote scripts/banks/social-government.json")
