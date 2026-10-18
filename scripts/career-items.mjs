// scripts/career-items.mjs
// The Career Choices paper: 46 items in four sections.
//
// Section A is the twenty three-way combinations of the six RIASEC interests,
// each used exactly once. That is what makes the section fair — every interest
// appears in ten items and every pair of interests meets in exactly four, so no
// type wins by being repeatedly offered against weak company. See the note on
// INTEREST_ITEM_COUNT in src/lib/career.ts.
//
// Every option describes an ACTIVITY, never a job title. The classic failure of
// interest inventories in schools is Realistic items phrased as roles — "being a
// mechanic" — which sorts children by what they think people like them do
// rather than by what they enjoy. "Fixing a cycle" does not.

const R = 'realistic', I = 'investigative', A = 'artistic'
const S = 'social', E = 'enterprising', C = 'conventional'

export const INTEREST_ITEMS = [
  { key: 'i01', prompt: 'Your school’s annual day is being set up. Where would you rather be?', options: [
    { text: 'Rigging the lights and the sound, and fixing the fan that keeps cutting out', interest: R },
    { text: 'Working out how 300 people fit in the hall and can still reach the exits', interest: I },
    { text: 'Designing how the stage should look, and painting the backdrop', interest: A },
  ]},
  { key: 'i02', prompt: 'A big wedding in the family. You get handed one job.', options: [
    { text: 'Looking after the guests, especially the ones who don’t know anybody', interest: S },
    { text: 'Negotiating with the caterer, the hall and the decorator', interest: E },
    { text: 'Tracking the budget, the lists and the schedule so nothing is missed', interest: C },
  ]},
  { key: 'i03', prompt: 'A trunk of old family photographs and papers turns up.', options: [
    { text: 'Working out the dates, the places and who is related to whom', interest: I },
    { text: 'Making something out of them — a book, a wall, a short film', interest: A },
    { text: 'Indexing and preserving the lot properly so it survives', interest: C },
  ]},
  { key: 'i04', prompt: 'A village nearby has flooded and your group goes to help.', options: [
    { text: 'Loading trucks, clearing debris, doing the heavy work', interest: R },
    { text: 'Sitting with families and finding out what each one actually needs', interest: S },
    { text: 'Coordinating the whole effort and dealing with the officials', interest: E },
  ]},
  { key: 'i05', prompt: 'A family business has no presence online at all.', options: [
    { text: 'Designing the look — the name, the photographs, the whole feel of it', interest: A },
    { text: 'Finding the customers and making the sales actually happen', interest: E },
    { text: 'Setting up the billing, the stock list and the records properly', interest: C },
  ]},
  { key: 'i06', prompt: 'A free afternoon, and a workshop full of tools.', options: [
    { text: 'Building something — a shelf, a stand, a repair somebody needs', interest: R },
    { text: 'Taking the broken drill apart to see how it works inside', interest: I },
    { text: 'Sorting and labelling the whole tool wall so nothing goes missing again', interest: C },
  ]},
  { key: 'i07', prompt: 'Your class has done badly this term and everyone is arguing about why.', options: [
    { text: 'Digging into which topics and which students, and what the pattern is', interest: I },
    { text: 'Talking to the ones who are struggling, one at a time', interest: S },
    { text: 'Putting a plan to the teacher and getting the class behind it', interest: E },
  ]},
  { key: 'i08', prompt: 'A friend wants to sell something at the weekend market.', options: [
    { text: 'Making the thing itself, and making it well', interest: R },
    { text: 'Designing the stall, the packaging and the name', interest: A },
    { text: 'Handling the pricing, the customers, and getting two stalls next month', interest: E },
  ]},
  { key: 'i09', prompt: 'A team you follow keeps losing and you have been put in charge.', options: [
    { text: 'Studying the numbers until you find where it is actually going wrong', interest: I },
    { text: 'Deciding who to bring in and who to drop, and selling that to everyone', interest: E },
    { text: 'Keeping the full record of every match and every player', interest: C },
  ]},
  { key: 'i10', prompt: 'A long blank wall at school is going to be repainted.', options: [
    { text: 'Scraping, priming and painting it properly so it lasts', interest: R },
    { text: 'Designing the mural that goes on it', interest: A },
    { text: 'Getting twenty juniors organised and enjoying the work', interest: S },
  ]},
  { key: 'i11', prompt: 'The local library has books, chairs, and nobody in it.', options: [
    { text: 'Redesigning the space so that people want to sit there', interest: A },
    { text: 'Running reading sessions and getting people through the door', interest: S },
    { text: 'Fixing the catalogue and the lending system so it can be used at all', interest: C },
  ]},
  { key: 'i12', prompt: 'Your colony has had bad water pressure for months.', options: [
    { text: 'Laying the new pipe yourself with two friends', interest: R },
    { text: 'Measuring the pressure house by house to find where it actually fails', interest: I },
    { text: 'Getting the residents to agree on a plan and to pay for it', interest: E },
  ]},
  { key: 'i13', prompt: 'There is one subject you find genuinely hard.', options: [
    { text: 'Working out exactly why it is hard, and going at that', interest: I },
    { text: 'Finding a completely different way to picture the whole thing', interest: A },
    { text: 'Studying with somebody, each explaining bits to the other', interest: S },
  ]},
  { key: 'i14', prompt: 'You spend a day helping at a hospital.', options: [
    { text: 'Moving and setting up equipment, keeping the ward running', interest: R },
    { text: 'Staying with the patients who are frightened', interest: S },
    { text: 'Keeping the records straight so that nothing gets missed', interest: C },
  ]},
  { key: 'i15', prompt: 'The road outside your school is dangerous and nobody has done anything.', options: [
    { text: 'Making the posters and the video that get people to notice', interest: A },
    { text: 'Running the sessions with the younger students yourself', interest: S },
    { text: 'Getting the police, the school and a sponsor to back it', interest: E },
  ]},
  { key: 'i16', prompt: 'A cousin’s old scooter will not start.', options: [
    { text: 'Opening it up and working through it part by part', interest: R },
    { text: 'Reading up until you can narrow down what causes exactly this fault', interest: I },
    { text: 'Finding somebody who knows, and learning while they do it', interest: S },
  ]},
  { key: 'i17', prompt: 'An app everybody has suddenly started using.', options: [
    { text: 'Working out how it actually does what it does', interest: I },
    { text: 'Thinking about how it should have looked and felt instead', interest: A },
    { text: 'Working out how it makes money and who it is beating', interest: E },
  ]},
  { key: 'i18', prompt: 'A shop you help at is quietly losing money.', options: [
    { text: 'Fixing what is physically going wrong — the fridge, the shutter, the wiring', interest: R },
    { text: 'Changing what is sold, and what it is sold for', interest: E },
    { text: 'Going through the accounts until you find where it leaks', interest: C },
  ]},
  { key: 'i19', prompt: 'A free health camp is being held in your area.', options: [
    { text: 'Looking at the results afterwards and finding the pattern in them', interest: I },
    { text: 'Explaining to people what their results mean for them', interest: S },
    { text: 'Registering everybody accurately and keeping the files in order', interest: C },
  ]},
  { key: 'i20', prompt: 'You are given a good camera for a month.', options: [
    { text: 'Understanding the camera itself — the lenses, the sensor, what breaks', interest: R },
    { text: 'Composing and taking the pictures', interest: A },
    { text: 'Cataloguing, backing up and keeping the whole archive in order', interest: C },
  ]},
]

// ── Section B: how you want to work ────────────────────────────────────────
// These filter rather than score. A learner can match hotel management perfectly
// on interests and still be certain to leave within a year because of the nights
// and the strangers, and no interest inventory can see that.
//
// `rejects` is load-bearing and `prefers` is not, on purpose. "I would rather not
// work nights" is a reliable statement about yourself at fifteen. "I would enjoy
// working nights" is a guess.

export const CONTEXT_ITEMS = [
  { key: 'c01', prompt: 'Where would you rather spend your working day?', options: [
    { text: 'Indoors, in one place', rejects: ['outdoors'] },
    { text: 'Outdoors, or moving between sites', prefers: ['outdoors'] },
    { text: 'Some of both — it doesn’t bother me' },
  ]},
  { key: 'c02', prompt: 'And doing what with your body, most of the day?', options: [
    { text: 'Sitting at a desk', prefers: ['desk-bound'], rejects: ['on-feet', 'physical-stamina'] },
    { text: 'On my feet and moving', prefers: ['on-feet'], rejects: ['desk-bound'] },
    { text: 'Hands on equipment or materials', prefers: ['on-feet'] },
    { text: 'No strong feeling' },
  ]},
  { key: 'c03', prompt: 'Would you rather your days were much the same, or all different?', options: [
    { text: 'Much the same — I like knowing what the day holds', prefers: ['routine-work'] },
    { text: 'All different, even if that means some chaos', rejects: ['routine-work'] },
    { text: 'No strong feeling' },
  ]},
  { key: 'c04', prompt: 'What about the hours?', options: [
    { text: 'Fixed hours. I want my evenings and nights', rejects: ['night-shifts', 'irregular-hours'] },
    { text: 'Shifts are fine, including nights', prefers: ['night-shifts'] },
    { text: 'I don’t mind hours that are hard to predict', prefers: ['irregular-hours'] },
  ]},
  { key: 'c05', prompt: 'A day spent dealing with strangers, one after another.', options: [
    { text: 'That sounds good — I come away with more energy than I started', prefers: ['strangers-daily'] },
    { text: 'Fine in doses, but I would need quiet parts of the day too' },
    { text: 'That would drain me completely', rejects: ['strangers-daily'] },
  ]},
  { key: 'c06', prompt: 'When something goes badly wrong at work, somebody has to answer for it.', options: [
    { text: 'I would want that to be me — I would rather be the one deciding', prefers: ['high-responsibility'] },
    { text: 'I would rather do the work well and not carry that', rejects: ['high-responsibility'] },
    { text: 'I don’t know yet' },
  ]},
  { key: 'c07', prompt: 'Where are you willing to live for work?', options: [
    { text: 'I want to stay in my own city', rejects: ['relocation', 'abroad'] },
    { text: 'Anywhere in India', prefers: ['relocation'], rejects: ['abroad'] },
    { text: 'India or abroad', prefers: ['relocation', 'abroad'] },
  ]},
  { key: 'c08', prompt: 'Two jobs pay about the same over ten years. Which do you take?', options: [
    { text: 'The one with the same amount every month, guaranteed' },
    { text: 'The one where it swings with how well I do', prefers: ['variable-income'] },
  ]},
  { key: 'c09', prompt: 'Physically demanding work — heat, standing, lifting, long shifts on site.', options: [
    { text: 'I would be fine with that', prefers: ['physical-stamina'] },
    { text: 'I would rather not', rejects: ['physical-stamina'] },
  ]},
  // Kept last in its section: it is the bluntest question on the paper, and it
  // should not be the thing a learner meets first.
  { key: 'c10', prompt: 'Blood, wounds and the physical side of illness.', options: [
    { text: 'Doesn’t bother me', prefers: ['blood-and-injury'] },
    { text: 'Uncomfortable, but I could get used to it' },
    { text: 'I could not do that', rejects: ['blood-and-injury'] },
  ]},
]

// ── Section C: how you want to get there ───────────────────────────────────
// The section nobody builds, and the one that decides the RUNG rather than the
// field. It is what lets nursing, a polytechnic diploma or a supervisor track
// come out as a genuine first choice instead of as a consolation prize.

export const ROUTE_ITEMS = [
  { key: 'r01', prompt: 'How many more years of full-time study are you willing to do after Class 12?', options: [
    { text: 'One or two — I want to be working', maxRung: 'vocational', prefersEarly: true },
    { text: 'About three', maxRung: 'diploma', prefersEarly: true },
    { text: 'Four or so — a degree', maxRung: 'degree' },
    { text: 'Five or six, if it is worth it', maxRung: 'degree-pg' },
    { text: 'As long as it takes', maxRung: 'long-professional' },
  ]},
  { key: 'r02', prompt: 'One entrance exam, on one day, deciding the next five years of your life.', options: [
    { text: 'That is fine. I would prepare and take my chances' },
    { text: 'I would rather my future did not turn on a single exam', avoidsHighStakes: true },
  ]},
  { key: 'r03', prompt: 'Two years of coaching classes on top of school.', options: [
    { text: 'I can do that if it gets me where I want to go' },
    { text: 'I have had enough of that already', avoidsHighStakes: true },
  ]},
  { key: 'r04', prompt: 'How do you learn best?', options: [
    { text: 'Doing the real thing from the first year, and picking up theory as I go' },
    { text: 'Theory properly first, then practice' },
    { text: 'A mix' },
  ]},
  { key: 'r05', prompt: 'A course that has you earning at nineteen or twenty, but starting lower than a degree would.', options: [
    { text: 'That interests me a lot', prefersEarly: true },
    { text: 'Maybe, if the work itself was good' },
    { text: 'No — I would rather study longer and start higher' },
  ]},
  { key: 'r06', prompt: 'Which sounds better?', options: [
    { text: 'Earning my own money at twenty', prefersEarly: true },
    { text: 'Earning a good deal more at twenty-eight' },
  ]},
  { key: 'r07', prompt: 'Most careers start with two or three years of unglamorous work.', options: [
    { text: 'I expect that, and I would do it' },
    { text: 'I would find that very hard' },
  ]},
  { key: 'r08', prompt: 'Studying further later, while already working.', options: [
    { text: 'I would happily do that — it is a route in for me', maxRung: 'degree-pg' },
    { text: 'I would rather finish studying before I start working' },
    { text: 'I don’t know yet' },
  ]},
]

// ── Section D: your own opinion of yourself ────────────────────────────────
// Labelled as self-rating everywhere it is shown, and a soft weight only. No
// answer here can remove a career from the page: a fifteen-year-old's estimate
// of their own maths is not a fact about their maths.

export const APTITUDE_ITEMS = [
  { key: 'a01', aptitude: 'maths',      prompt: 'Numbers and calculation' },
  { key: 'a02', aptitude: 'language',   prompt: 'Reading closely, and writing clearly' },
  { key: 'a03', aptitude: 'spatial',    prompt: 'Picturing how things fit together in space' },
  { key: 'a04', aptitude: 'memory',     prompt: 'Holding a lot of detail in your head' },
  { key: 'a05', aptitude: 'visual',     prompt: 'Drawing, and a sense of how things should look' },
  { key: 'a06', aptitude: 'persuading', prompt: 'Getting people to come round to your view' },
  { key: 'a07', aptitude: 'pressure',   prompt: 'Staying calm when something goes wrong' },
  { key: 'a08', aptitude: 'detail',     prompt: 'Careful, exact work that has to be right' },
]

export const ALL_ITEMS = [
  ...INTEREST_ITEMS.map((it, n) => ({ ...it, section: 'interests', order: 100 + n })),
  ...CONTEXT_ITEMS.map((it, n)  => ({ ...it, section: 'context',   order: 200 + n })),
  ...ROUTE_ITEMS.map((it, n)    => ({ ...it, section: 'route',     order: 300 + n })),
  ...APTITUDE_ITEMS.map((it, n) => ({ ...it, section: 'aptitude',  order: 400 + n })),
]
