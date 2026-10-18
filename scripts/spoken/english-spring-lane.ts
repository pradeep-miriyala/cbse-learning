// scripts/spoken/english-spring-lane.ts
// English · John Clare's sonnet "On a Lane in Spring", 3-mark spoken answers.
//
// These are the textbook's own shape of question: quote a few lines, ask what
// they mean and why. Every one of them QUOTES the poem, so every one ships as a
// draft until the text has been checked against the textbook — a misquoted line
// in a live paper is exactly the kind of error that costs a child's trust in
// the whole thing. Authoring rules are at the head of science-food.ts.
//
// The text worked from is printed in scripts/gen-english-spring-lane.py.

import type { AuthoredSpoken } from '../../src/lib/speaking.ts'

const CH = 'On a Lane in Spring'
const TOPIC = 'spring-lane-poem'
const LABEL = 'Understanding the Poem'

export const ENGLISH_SPRING_LANE: AuthoredSpoken[] = [
  {
    topic: TOPIC, topicLabel: LABEL, chapter: CH, status: 'draft',
    question:
      'Read these lines and explain what the poet is showing you, and how:\n\n'
      + '“A little lane, the brook runs close beside\n'
      + 'And spangles in the sunshine while the fish glide swiftly by\n'
      + 'And hedges leafing with the green spring tide”',
    modelAnswer:
      'The poet is showing a small stream running along the edge of the lane, throwing back '
      + 'points of sunlight as it moves. The fish are gliding smoothly through it, which makes '
      + 'the water feel alive rather than still. Meanwhile the hedges are putting out new '
      + 'leaves, so the whole scene is one of a place quietly coming to life in spring.',
    keyPoints: [
      { id: 'water-sparkles', label: 'The stream throws back points of sunlight as it moves',
        accept: [['sunlight'], ['sparkl'], ['glitter'], ['shine'], ['light'], ['sun on'], ['reflect']] },
      { id: 'fish-smooth', label: 'The fish move smoothly, so the water feels alive',
        accept: [['smooth'], ['easily'], ['effortless'], ['alive'], ['moving'], ['swim'], ['quick']] },
      { id: 'new-growth', label: 'New leaves on the hedges — the place is coming to life',
        accept: [['new leaf'], ['new leaves'], ['coming to life'], ['growing'], ['fresh'], ['season'], ['start'], ['bud']] },
    ],
  },
  {
    topic: TOPIC, topicLabel: LABEL, chapter: CH, status: 'draft',
    question:
      'Read these lines and explain what they tell you about the season, and why:\n\n'
      + '“How mild the Spring comes in; the daisy buds\n'
      + 'Lift up their golden blossoms to the sky\n'
      + 'How lovely are the pingles and the woods”',
    modelAnswer:
      'The season is arriving gently, with no harshness of cold or storm, which is what mild '
      + 'means here. The daisy buds are opening and raising their yellow flowers upward, as '
      + 'though reaching deliberately, so the poet gives the flowers a human action. Looking '
      + 'about at the small fields and the woods, he finds the whole scene beautiful.',
    keyPoints: [
      { id: 'gentle', label: 'The season arrives gently — no harshness or storm',
        accept: [['gentle'], ['soft'], ['not harsh'], ['no storm'], ['calm'], ['warm'], ['pleasant'], ['slowly']] },
      { id: 'buds-open', label: 'The buds open and raise their yellow flowers upward',
        accept: [['open'], ['upward'], ['raise'], ['yellow'], ['bloom'], ['reach'], ['face the sun'], ['stretch']] },
      { id: 'human-action', label: 'Giving flowers a human action is personification',
        accept: [['personif'], ['like a person'], ['human'], ['as if they'], ['hand'], ['deliberate']] },
    ],
  },
  {
    topic: TOPIC, topicLabel: LABEL, chapter: CH, status: 'draft',
    question:
      'Read these closing lines and explain what the poet is claiming, and how he earns it:\n\n'
      + '“Here a beetle runs; and there a fly\n'
      + 'Rests on the Arum leaf in bottle green\n'
      + 'And all the Spring in this Sweet lane is seen”',
    modelAnswer:
      'He is claiming that the whole of the season can be found in this one small lane. He '
      + 'earns it by noticing the very smallest things — a beetle running, a single fly on a '
      + 'dark green leaf — rather than anything grand. Looking that closely at one ordinary '
      + 'place is what shows it holds everything.',
    keyPoints: [
      { id: 'whole-season', label: 'The whole season is contained in one small lane',
        accept: [['whole'], ['all of'], ['everything'], ['entire'], ['one place'], ['one lane'], ['complete']] },
      { id: 'smallest-things', label: 'He notices the very smallest creatures and details',
        accept: [['small'], ['tiny'], ['detail'], ['close'], ['little thing'], ['insect'], ['notice'], ['creature']] },
      { id: 'ordinary-enough', label: 'An ordinary place, looked at closely, is enough',
        accept: [['ordinary'], ['simple'], ['nothing grand'], ['everyday'], ['common'], ['not need'], ['anywhere else'], ['plain']] },
    ],
  },
  {
    topic: TOPIC, topicLabel: LABEL, chapter: CH, status: 'draft',
    question:
      'The whole poem stays inside one lane. Explain how the poet still makes it feel like the '
      + 'whole of springtime.',
    modelAnswer:
      'He fills it with many different living things — fish, birds, flowers, a beetle, a fly — '
      + 'so there is life at every level from the water to the sky. He shows things beginning '
      + 'rather than finished, like the robin with its nest only started and the buds just '
      + 'opening. And he uses colour throughout, the golden blossoms and the pale blue sky and '
      + 'the bottle green leaf, so the reader sees it all at once.',
    keyPoints: [
      { id: 'variety-of-life', label: 'Many different living things, from the water to the sky',
        accept: [['fish'], ['bird'], ['flower'], ['beetle'], ['insect'], ['many'], ['variety'], ['different']] },
      { id: 'beginnings', label: 'Things are beginning rather than finished — nest, buds',
        accept: [['nest'], ['bud'], ['begin'], ['start'], ['new'], ['just'], ['growing']] },
      { id: 'colour', label: 'Colour throughout — golden, pale blue, bottle green',
        accept: [['colour'], ['color'], ['golden'], ['blue'], ['green'], ['yellow'], ['bright']] },
    ],
  },
]
