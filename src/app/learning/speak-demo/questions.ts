// src/app/learning/speak-demo/questions.ts
// Five spoken questions on Balanced Diet — the demo set.
//
// These sit here rather than in the bank on purpose. A spoken question is a
// different shape from an MCQ (no options, no single answer index, a mark
// scheme instead), and the point of the demo is to find out whether the format
// works on a real child before deciding how it should be stored.
//
// Authoring notes, since this file is the template for every later mark scheme:
//
//   * A key point is an IDEA, and `accept` lists the ways an eleven-year-old
//     might say it. Include the childish phrasing, not only the textbook one —
//     "gives you energy" has to score the same as "energy-giving food".
//   * Prefer one distinctive word over a phrase. Long AND-groups fail when the
//     recogniser drops a single word, and that failure looks like the child's
//     fault when it is not.
//   * Never require a word the question already contains, or the point scores
//     itself when a child simply repeats the question back.

import type { SpokenQuestion } from '@/lib/speaking'

export const BALANCED_DIET: SpokenQuestion[] = [
  {
    id: 'bd-1',
    topic: 'balanced-diet',
    topicLabel: 'Balanced Diet & Food Pyramid',
    marks: 3,
    budgetSec: 90,
    question: 'What is a balanced diet? Answer in about three sentences.',
    modelAnswer:
      'A balanced diet is one that contains all the different nutrients — carbohydrates, '
      + 'proteins, fats, vitamins and minerals — that the body needs. It must have them in '
      + 'the right amounts, not too much or too little of any one. It should also include '
      + 'roughage and enough water.',
    keyPoints: [
      {
        id: 'all-nutrients',
        label: 'It contains all the nutrients the body needs',
        accept: [
          ['all', 'nutrient'],
          ['every', 'nutrient'],
          ['all', 'food group'],
          ['carbohydrate', 'protein'],
          ['protein', 'vitamin'],
        ],
      },
      {
        id: 'right-amount',
        label: 'In the right amounts or proportion — not too much of any one',
        accept: [
          ['right amount'], ['correct amount'], ['right quantity'], ['proper amount'],
          ['right proportion'], ['proportion'], ['correct quantity'],
          ['not too much'], ['neither too much'], ['proper quantity'],
        ],
      },
      {
        id: 'roughage-water',
        label: 'It also includes roughage and water',
        accept: [
          ['roughage'], ['fibre'], ['fiber'], ['water'],
        ],
      },
    ],
  },

  {
    id: 'bd-2',
    topic: 'balanced-diet',
    topicLabel: 'Balanced Diet & Food Pyramid',
    marks: 3,
    budgetSec: 90,
    question:
      'Rohan eats only rice for lunch every single day. Say why this is not a balanced meal, '
      + 'and name two things he should add.',
    modelAnswer:
      'Rice is mostly carbohydrate, so it gives energy but very little else. He is missing '
      + 'protein, so he should add dal, egg or paneer. He is also missing vitamins and '
      + 'minerals, so he should add vegetables or fruit.',
    keyPoints: [
      {
        id: 'only-carbs',
        label: 'Rice supplies mainly carbohydrate — energy, and little else',
        accept: [
          ['carbohydrate'], ['carbs'], ['starch'],
          ['only energy'], ['just energy'], ['energy giving'],
        ],
      },
      {
        id: 'add-protein',
        label: 'Missing protein — add dal, pulses, egg, paneer, fish or meat',
        accept: [
          ['protein'], ['dal'], ['pulse'], ['egg'], ['paneer'],
          ['rajma'], ['chana'], ['soya'], ['fish'], ['chicken'], ['meat'],
        ],
      },
      {
        id: 'add-vitamins',
        label: 'Missing vitamins and minerals — add vegetables, fruit or salad',
        accept: [
          ['vegetable'], ['fruit'], ['salad'], ['sabzi'], ['green'],
          ['vitamin'], ['mineral'],
        ],
      },
    ],
  },

  {
    id: 'bd-3',
    topic: 'balanced-diet',
    topicLabel: 'Balanced Diet & Food Pyramid',
    marks: 3,
    budgetSec: 90,
    question:
      'Some people think a balanced diet is only for rich families. Explain why that is not true, '
      + 'and give one example of a cheap balanced meal.',
    modelAnswer:
      'A balanced diet depends on variety, not on cost. Cheap everyday foods carry the same '
      + 'nutrients as expensive ones — dal has protein just as meat does, and seasonal '
      + 'vegetables have the same vitamins as imported fruit. A thali of roti, dal, sabzi and '
      + 'curd is balanced and costs very little.',
    keyPoints: [
      {
        id: 'not-cost',
        label: 'Balance comes from variety, not from cost',
        accept: [
          ['not', 'cost'], ['not', 'expensive'], ['not', 'money'], ['not', 'price'],
          ['variety'], ['cheap food', 'same'], ['does not depend', 'money'],
        ],
      },
      {
        id: 'cheap-same-nutrient',
        label: 'Cheap local foods carry the same nutrients as costly ones',
        accept: [
          ['same nutrient'], ['same protein'], ['same vitamin'],
          ['dal', 'protein'], ['local'], ['seasonal'], ['millet'],
          ['cheap', 'nutrient'],
        ],
      },
      {
        id: 'example',
        label: 'A concrete cheap example — roti, dal, sabzi, curd, banana, millets',
        accept: [
          ['roti'], ['chapati'], ['dal'], ['sabzi'], ['curd'], ['dahi'],
          ['banana'], ['millet'], ['ragi'], ['rice', 'vegetable'], ['thali'],
        ],
      },
    ],
  },

  {
    id: 'bd-4',
    topic: 'balanced-diet',
    topicLabel: 'Balanced Diet & Food Pyramid',
    marks: 3,
    budgetSec: 90,
    question: 'What does the food pyramid tell you? Explain what its shape means.',
    modelAnswer:
      'The width of each layer shows how much of that food to eat. The broad base is grains '
      + 'and cereals, which should be the largest part of the diet. The narrow tip is fats, '
      + 'oils and sweets, which should be eaten least.',
    keyPoints: [
      {
        id: 'width-means-amount',
        label: 'The width of a layer shows how much to eat',
        accept: [
          ['width'], ['wide', 'how much'], ['size', 'how much'],
          ['broad', 'more'], ['shape', 'amount'], ['how much', 'eat'],
          ['proportion'],
        ],
      },
      {
        id: 'base-most',
        label: 'The broad base — grains and cereals — is eaten most',
        accept: [
          ['base', 'grain'], ['bottom', 'grain'], ['base', 'cereal'],
          ['bottom', 'cereal'], ['grain', 'most'], ['cereal', 'most'],
          ['base', 'rice'], ['bottom', 'most'],
        ],
      },
      {
        id: 'tip-least',
        label: 'The narrow tip — fats, oils and sweets — is eaten least',
        accept: [
          ['tip', 'least'], ['top', 'least'], ['tip', 'fat'], ['top', 'fat'],
          ['tip', 'sweet'], ['top', 'sweet'], ['tip', 'oil'], ['top', 'oil'],
          ['least', 'sweet'], ['least', 'fat'], ['smallest', 'least'],
        ],
      },
    ],
  },

  {
    id: 'bd-5',
    topic: 'balanced-diet',
    topicLabel: 'Balanced Diet & Food Pyramid',
    marks: 3,
    budgetSec: 90,
    question:
      'Your friend says: "I take a vitamin tablet every morning, so I do not need to eat vegetables." '
      + 'What would you say to your friend?',
    modelAnswer:
      'A tablet cannot replace vegetables. Vegetables give roughage, which a tablet does not '
      + 'have, and roughage keeps digestion working and prevents constipation. Whole food also '
      + 'brings many nutrients and water together, and taking too much of a vitamin can even '
      + 'be harmful.',
    keyPoints: [
      {
        id: 'roughage',
        label: 'A tablet has no roughage or fibre',
        accept: [
          ['roughage'], ['fibre'], ['fiber'],
        ],
      },
      {
        id: 'digestion',
        label: 'Roughage helps digestion and prevents constipation',
        accept: [
          ['digestion'], ['digest'], ['constipation'], ['bowel'],
          ['stomach', 'help'], ['pass', 'stool'],
        ],
      },
      {
        id: 'whole-food',
        label: 'Whole food gives many nutrients together — and excess tablets can harm',
        accept: [
          ['many nutrient'], ['other nutrient'], ['mineral'], ['water'],
          ['natural'], ['whole food'], ['together'],
          ['too much', 'harmful'], ['excess', 'harm'], ['overdose'],
        ],
      },
    ],
  },
]
