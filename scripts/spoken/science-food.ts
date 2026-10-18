// scripts/spoken/science-food.ts — Science · Food & Nutrition, 3-mark spoken.
//
// Authoring rules, enforced by auditSpoken():
//   * The model answer must score full marks. It is what we show the child as
//     worth 3/3, so our own matcher has to find every point in it.
//   * Reading the question back must score nothing — never accept a word the
//     question already contains, or the scheme pays out for parroting.
//   * Accept the way an eleven-year-old talks, not only the textbook: "gives
//     you energy" has to score the same as "energy-giving food".
//   * Prefer one distinctive word to a phrase. Long AND-groups fail whenever
//     recognition drops a single word, and that reads as the child's fault.

import type { AuthoredSpoken } from '../../src/lib/speaking.ts'

const CH = 'Food & Nutrition'

export const SCIENCE_FOOD: AuthoredSpoken[] = [
  // ── Balanced Diet & Food Pyramid ──────────────────────────────────────
  {
    topic: 'balanced-diet', topicLabel: 'Balanced Diet & Food Pyramid', chapter: CH,
    question: 'What makes a meal balanced? Answer in about three sentences.',
    modelAnswer:
      'A balanced meal contains all the nutrients the body needs — carbohydrates, proteins, '
      + 'fats, vitamins and minerals. They must be there in the right amounts, not too much '
      + 'or too little of any one. It should also include roughage and enough water.',
    keyPoints: [
      { id: 'all-nutrients', label: 'It has all the nutrients the body needs',
        accept: [['all', 'nutrient'], ['every', 'nutrient'], ['carbohydrate', 'protein'], ['protein', 'vitamin']] },
      { id: 'proportion', label: 'In the right amounts — not too much of any one',
        accept: [['right amount'], ['correct amount'], ['right quantity'], ['proportion'], ['not too much'], ['proper amount']] },
      { id: 'roughage-water', label: 'It also includes roughage and water',
        accept: [['roughage'], ['fibre'], ['fiber'], ['water']] },
    ],
  },
  {
    topic: 'balanced-diet', topicLabel: 'Balanced Diet & Food Pyramid', chapter: CH,
    question: 'Ravi eats only rice for lunch every single day. Say what is wrong with that, '
            + 'and name two things he should eat as well.',
    modelAnswer:
      'Rice is mostly carbohydrate, so it gives energy but very little else. He is missing '
      + 'protein, so he should take dal, egg or paneer. He is also missing vitamins and '
      + 'minerals, so he should take vegetables or fruit.',
    keyPoints: [
      { id: 'only-carbs', label: 'Rice supplies mainly carbohydrate — energy and little else',
        accept: [['carbohydrate'], ['starch'], ['only energy'], ['just energy'], ['energy giving']] },
      { id: 'needs-protein', label: 'Missing protein — dal, pulses, egg, paneer, fish or meat',
        accept: [['protein'], ['dal'], ['pulse'], ['egg'], ['paneer'], ['rajma'], ['soya'], ['fish'], ['chicken'], ['meat']] },
      { id: 'needs-vitamins', label: 'Missing vitamins and minerals — vegetables, fruit or salad',
        accept: [['vegetable'], ['fruit'], ['salad'], ['sabzi'], ['vitamin'], ['mineral']] },
    ],
  },

  // ── Carbohydrates & Fats ──────────────────────────────────────────────
  {
    topic: 'carbohydrates-fats', topicLabel: 'Carbohydrates & Fats', chapter: CH,
    question: 'Why does a farm labourer need more carbohydrate in a day than someone who sits '
            + 'in an office? Name one food that would give it.',
    modelAnswer:
      'Carbohydrates are the body’s main source of energy. Heavy physical labour burns far '
      + 'more energy than sitting does, so a labourer needs a larger amount. Rice, wheat, '
      + 'potato and bread are foods that supply it.',
    keyPoints: [
      { id: 'main-energy', label: 'Carbohydrates are the body’s main source of energy',
        accept: [['energy'], ['fuel'], ['calorie']] },
      { id: 'harder-work', label: 'Harder physical work burns more, so more is needed',
        accept: [['physical'], ['heavy'], ['hard work'], ['labour burn'], ['burn'], ['tiring'], ['running']] },
      { id: 'example-food', label: 'A food that supplies it — rice, wheat, potato, bread',
        accept: [['rice'], ['wheat'], ['potato'], ['bread'], ['chapati'], ['roti'], ['sugar'], ['banana']] },
    ],
  },
  {
    topic: 'carbohydrates-fats', topicLabel: 'Carbohydrates & Fats', chapter: CH,
    question: 'Fats are often called bad, yet the body needs them. Explain why they are needed, '
            + 'and what happens if someone takes far too much.',
    modelAnswer:
      'Fats store energy, and they give more energy than the same weight of carbohydrate. '
      + 'They also keep the body warm and protect the organs. Taking far too much leads to '
      + 'obesity and heart problems.',
    keyPoints: [
      { id: 'stores-energy', label: 'They store energy, and give more per gram than carbohydrate',
        accept: [['energy'], ['store'], ['reserve']] },
      { id: 'warmth-protection', label: 'They keep the body warm and cushion the organs',
        accept: [['warm'], ['insulat'], ['cold'], ['protect'], ['cushion'], ['organ']] },
      { id: 'excess-harm', label: 'Too much causes obesity and heart trouble',
        accept: [['obes'], ['overweight'], ['fat person'], ['heart'], ['cholesterol'], ['weight gain'], ['put on weight']] },
    ],
  },

  // ── Cooking Practices ─────────────────────────────────────────────────
  {
    topic: 'cooking-practices', topicLabel: 'Cooking Practices', chapter: CH,
    question: 'Amma throws away the water after boiling potatoes. Explain what is lost by doing '
            + 'that and what she could do instead.',
    modelAnswer:
      'Vitamins and minerals dissolve into the boiling water, so throwing it away throws the '
      + 'nutrients away too. Vitamin C is destroyed especially easily. She could steam them '
      + 'instead, or keep the water and use it in soup or dough.',
    keyPoints: [
      { id: 'dissolve-out', label: 'Nutrients dissolve into the water and are thrown out with it',
        accept: [['dissolve'], ['nutrient'], ['mineral'], ['goes into the water'], ['leach']] },
      { id: 'vitamin-lost', label: 'Vitamins, especially vitamin C, are lost',
        accept: [['vitamin'], ['vitamin c'], ['destroy']] },
      { id: 'better-way', label: 'Steam instead, or reuse the water in soup or dough',
        accept: [['steam'], ['soup'], ['dough'], ['gravy'], ['reuse'], ['keep the water'], ['use it again']] },
    ],
  },
  {
    topic: 'cooking-practices', topicLabel: 'Cooking Practices', chapter: CH,
    question: 'Give two good reasons for cooking food before eating it.',
    modelAnswer:
      'Cooking kills germs and harmful bacteria, so the food is safer. It makes food softer '
      + 'and easier to digest. It also improves the taste and smell, so people eat it more '
      + 'willingly.',
    keyPoints: [
      { id: 'kills-germs', label: 'It kills germs and makes food safe',
        accept: [['germ'], ['bacteria'], ['micro'], ['safe'], ['infection'], ['disease']] },
      { id: 'easier-digest', label: 'It softens food and makes it easier to digest',
        accept: [['digest'], ['soft'], ['tender'], ['easy to chew'], ['break down']] },
      { id: 'taste', label: 'It improves taste and smell',
        accept: [['taste'], ['tasty'], ['smell'], ['flavour'], ['flavor'], ['aroma']] },
    ],
  },

  // ── Deficiency Diseases & Malnutrition ────────────────────────────────
  {
    topic: 'deficiency-diseases', topicLabel: 'Deficiency Diseases & Malnutrition', chapter: CH,
    question: 'A child bruises easily and their gums bleed when they brush. What is likely missing '
            + 'from their meals, what is the illness called, and what should they eat?',
    modelAnswer:
      'They are probably short of vitamin C. The illness is called scurvy. Eating oranges, '
      + 'lemons, amla or guava would supply what is missing.',
    keyPoints: [
      { id: 'which-nutrient', label: 'Vitamin C is missing',
        accept: [['vitamin c'], ['ascorbic']] },
      { id: 'disease-name', label: 'The disease is scurvy',
        accept: [['scurvy'], ['scurvey']] },
      { id: 'foods', label: 'Citrus fruit, amla or guava would supply it',
        accept: [['orange'], ['lemon'], ['amla'], ['guava'], ['citrus'], ['lime'], ['tomato']] },
    ],
  },
  {
    topic: 'deficiency-diseases', topicLabel: 'Deficiency Diseases & Malnutrition', chapter: CH,
    question: 'Explain what malnutrition means, and why a person can be malnourished even when '
            + 'they never feel hungry.',
    modelAnswer:
      'Malnutrition means the body is not getting the nutrients it needs in the right amounts. '
      + 'Someone may eat plenty of food and still be short of protein, vitamins or minerals, '
      + 'because their meals lack variety. Their growth suffers and they fall ill easily.',
    keyPoints: [
      { id: 'meaning', label: 'The body is not getting the nutrients it needs',
        accept: [['nutrient'], ['not getting'], ['does not get'], ['lack'], ['enough']] },
      { id: 'quantity-not-quality', label: 'Plenty of food can still be short of some nutrient',
        accept: [['protein'], ['vitamin'], ['mineral'], ['variety'], ['same food'], ['only one']] },
      { id: 'effects', label: 'Growth suffers and illness comes easily',
        accept: [['growth'], ['grow'], ['weak'], ['ill'], ['disease'], ['tired'], ['sick']] },
    ],
  },

  // ── From Farm to Plate ────────────────────────────────────────────────
  {
    topic: 'farm-to-plate', topicLabel: 'From Farm to Plate', chapter: CH,
    question: 'Trace how wheat reaches your kitchen from the field. Mention three stages.',
    modelAnswer:
      'The farmer grows the crop and harvests it when it is ripe. The grain is then threshed '
      + 'and taken to a mill, where it is ground into flour. Traders and shops carry it to the '
      + 'market, where a family buys it.',
    keyPoints: [
      { id: 'grow-harvest', label: 'The farmer grows and harvests the crop',
        accept: [['farmer'], ['harvest'], ['sow'], ['crop'], ['cut']] },
      { id: 'process', label: 'It is threshed and milled into flour',
        accept: [['mill'], ['grind'], ['flour'], ['thresh'], ['atta'], ['machine']] },
      { id: 'transport-sell', label: 'It is transported and sold in shops or markets',
        accept: [['transport'], ['shop'], ['market'], ['trader'], ['truck'], ['sell'], ['buy'], ['store']] },
    ],
  },
  {
    topic: 'farm-to-plate', topicLabel: 'From Farm to Plate', chapter: CH,
    question: 'Why is it better for a family to buy vegetables grown nearby rather than ones '
            + 'brought from far away?',
    modelAnswer:
      'Vegetables grown close by reach the shop soon after picking, so they are fresher and '
      + 'keep more of their vitamins. They cost less because there is little transport to pay '
      + 'for. It also supports the farmers of that area.',
    keyPoints: [
      { id: 'fresher', label: 'They are fresher, so they keep more of their nutrients',
        accept: [['fresh'], ['vitamin'], ['nutrient'], ['spoil'], ['rot'], ['stale']] },
      { id: 'cheaper', label: 'They cost less, with little transport to pay for',
        accept: [['cheap'], ['cost'], ['price'], ['transport'], ['petrol'], ['fuel'], ['money']] },
      { id: 'supports-local', label: 'It supports farmers of that area',
        accept: [['farmer'], ['local'], ['nearby village'], ['our area'], ['support']] },
    ],
  },

  // ── Junk Food & Millets ───────────────────────────────────────────────
  {
    topic: 'food-choices', topicLabel: 'Junk Food & Millets', chapter: CH,
    question: 'Your friend has chips and a cold drink for lunch every day at school. Explain '
            + 'three things that are wrong with that.',
    modelAnswer:
      'Those items are high in fat, salt and sugar, which causes weight gain and tooth decay. '
      + 'They have almost no protein, vitamins or minerals, so the body gets nothing to grow '
      + 'with. They also have no roughage, so digestion suffers.',
    keyPoints: [
      { id: 'fat-salt-sugar', label: 'High in fat, salt and sugar',
        accept: [['fat'], ['salt'], ['sugar'], ['oil'], ['fried']] },
      { id: 'no-nutrients', label: 'Almost no protein, vitamins or minerals',
        accept: [['protein'], ['vitamin'], ['mineral'], ['no nutrient'], ['empty']] },
      { id: 'consequences', label: 'Weight gain, tooth decay or poor digestion follow',
        accept: [['weight'], ['obes'], ['teeth'], ['tooth'], ['decay'], ['digest'], ['roughage'], ['fibre'], ['ill']] },
    ],
  },
  {
    topic: 'food-choices', topicLabel: 'Junk Food & Millets', chapter: CH,
    question: 'Millets are being encouraged again in India. Give three reasons why they are a '
            + 'good crop to grow and to eat.',
    modelAnswer:
      'They are rich in fibre, iron and calcium, so they are very nourishing. They need little '
      + 'water and grow in dry land where rice would fail. They also store well and are cheap '
      + 'for a poor family to buy.',
    keyPoints: [
      { id: 'nourishing', label: 'Rich in fibre, iron and calcium',
        accept: [['fibre'], ['fiber'], ['roughage'], ['iron'], ['calcium'], ['protein'], ['nutritio'], ['healthy']] },
      { id: 'little-water', label: 'They need little water and grow on dry land',
        accept: [['less water'], ['little water'], ['dry'], ['drought'], ['rain'], ['no irrigation']] },
      { id: 'cheap-keeps', label: 'They store well and are cheap',
        accept: [['cheap'], ['store'], ['keep long'], ['last long'], ['afford'], ['poor'], ['price']] },
    ],
  },

  // ── Minerals ──────────────────────────────────────────────────────────
  {
    topic: 'minerals', topicLabel: 'Minerals', chapter: CH,
    question: 'A girl is pale, tired all the time and breathless after climbing stairs. Which '
            + 'mineral is she short of, what is the illness called, and what should she eat?',
    modelAnswer:
      'She is short of iron. The illness is anaemia. Green leafy vegetables such as spinach, '
      + 'along with jaggery, dates and liver, would supply the iron she needs.',
    keyPoints: [
      { id: 'iron', label: 'Iron is the mineral she lacks',
        accept: [['iron']] },
      { id: 'anaemia', label: 'The illness is anaemia',
        accept: [['anaem'], ['anem'], ['blood loss'], ['less blood'], ['haemoglobin'], ['hemoglobin']] },
      { id: 'sources', label: 'Green leafy vegetables, jaggery, dates or liver',
        accept: [['spinach'], ['palak'], ['leafy'], ['green vegetable'], ['jaggery'], ['date'], ['liver'], ['beetroot']] },
    ],
  },
  {
    topic: 'minerals', topicLabel: 'Minerals', chapter: CH,
    question: 'Explain why growing children are told to drink milk, and name two other foods '
            + 'that do the same job.',
    modelAnswer:
      'Milk is rich in calcium, which builds strong bones and teeth. Without enough of it, '
      + 'bones stay weak and break easily. Curd, cheese, ragi and green leafy vegetables '
      + 'supply calcium too.',
    keyPoints: [
      { id: 'calcium', label: 'Milk supplies calcium',
        accept: [['calcium']] },
      { id: 'bones-teeth', label: 'Calcium builds strong bones and teeth',
        accept: [['bone'], ['teeth'], ['tooth'], ['strong'], ['skeleton']] },
      { id: 'other-sources', label: 'Curd, cheese, ragi or leafy vegetables do the same',
        accept: [['curd'], ['cheese'], ['paneer'], ['ragi'], ['yoghurt'], ['yogurt'], ['leafy'], ['almond'], ['sesame']] },
    ],
  },

  // ── Nutrients & Energy ────────────────────────────────────────────────
  {
    topic: 'nutrients-overview', topicLabel: 'Nutrients & Energy', chapter: CH,
    question: 'Nutrients are grouped by the job they do in the body. Describe three of those '
            + 'jobs and give a food for each.',
    modelAnswer:
      'Carbohydrates and fats are energy-giving, and rice or oil supplies them. Proteins are '
      + 'body-building and repair worn parts, and dal or egg supplies them. Vitamins and '
      + 'minerals are protective, keeping disease away, and fruit and vegetables supply them.',
    keyPoints: [
      { id: 'energy-giving', label: 'Energy-giving — carbohydrates and fats',
        accept: [['energy'], ['carbohydrate'], ['fat']] },
      { id: 'body-building', label: 'Body-building and repair — proteins',
        accept: [['protein'], ['build'], ['repair'], ['growth'], ['grow'], ['muscle']] },
      { id: 'protective', label: 'Protective — vitamins and minerals keep disease away',
        accept: [['protect'], ['vitamin'], ['mineral'], ['disease'], ['immun'], ['fight illness']] },
    ],
  },
  {
    topic: 'nutrients-overview', topicLabel: 'Nutrients & Energy', chapter: CH,
    question: 'Two boys of the same age eat the same meals, but one plays football all evening '
            + 'and the other reads at home. Explain why their needs are not the same.',
    modelAnswer:
      'Playing football uses up a great deal of energy, so the boy who plays needs more '
      + 'carbohydrate and fat to replace it. He also needs more protein, because active muscles '
      + 'have to be repaired and built. The boy who reads uses less, so eating the same amount '
      + 'would store as extra weight.',
    keyPoints: [
      { id: 'more-energy-used', label: 'Physical activity uses up much more energy',
        accept: [['energy'], ['burn'], ['use up'], ['spend'], ['calorie']] },
      { id: 'more-nutrients', label: 'So more carbohydrate, fat or protein is needed',
        accept: [['carbohydrate'], ['protein'], ['muscle'], ['repair'], ['more food'], ['fat']] },
      { id: 'excess-stored', label: 'Eating the same when less active stores as extra weight',
        accept: [['weight'], ['store'], ['obes'], ['fat person'], ['put on'], ['extra']] },
    ],
  },

  // ── Proteins & Body Building ──────────────────────────────────────────
  {
    topic: 'proteins', topicLabel: 'Proteins & Body Building', chapter: CH,
    question: 'Why are proteins especially important for a growing child and someone recovering '
            + 'from an injury? Name two foods that supply them.',
    modelAnswer:
      'Proteins build new cells and tissues, which is how a child grows taller. They also '
      + 'repair parts of the body that have been damaged, so a wound heals. Dal, egg, milk, '
      + 'paneer and fish supply them.',
    keyPoints: [
      { id: 'builds', label: 'They build new cells and tissue, so the body grows',
        accept: [['build'], ['cell'], ['tissue'], ['muscle'], ['taller'], ['develop']] },
      { id: 'repairs', label: 'They repair damaged parts, so wounds heal',
        accept: [['repair'], ['heal'], ['mend'], ['wound'], ['damage'], ['worn']] },
      { id: 'sources', label: 'Dal, egg, milk, paneer or fish supply them',
        accept: [['dal'], ['pulse'], ['egg'], ['milk'], ['paneer'], ['fish'], ['soya'], ['meat'], ['rajma'], ['chana'], ['nut']] },
    ],
  },
  {
    topic: 'proteins', topicLabel: 'Proteins & Body Building', chapter: CH,
    question: 'A family does not eat meat, fish or eggs. Explain how they can still get what '
            + 'their bodies need to grow, and name two foods they could use.',
    modelAnswer:
      'Plants supply protein as well as animals do, so nothing is missing in a vegetarian diet. '
      + 'Pulses such as dal and rajma, along with soya, groundnut, milk and paneer, are rich in '
      + 'it. Eating pulses together with cereals makes the protein work better still.',
    keyPoints: [
      { id: 'plants-supply', label: 'Plant foods supply protein just as animal foods do',
        accept: [['protein'], ['plant'], ['vegetarian'], ['same']] },
      { id: 'named-foods', label: 'Pulses, soya, groundnut, milk or paneer',
        accept: [['dal'], ['pulse'], ['rajma'], ['chana'], ['soya'], ['groundnut'], ['peanut'], ['milk'], ['paneer'], ['curd'], ['nut']] },
      { id: 'combining', label: 'Pulses with cereals together work better',
        accept: [['together'], ['combin'], ['cereal'], ['rice'], ['roti'], ['chapati'], ['wheat'], ['mix']] },
    ],
  },

  // ── Roughage & Water ──────────────────────────────────────────────────
  {
    topic: 'roughage-water', topicLabel: 'Roughage & Water', chapter: CH,
    question: 'Roughage gives the body no energy at all, yet meals must contain it. Explain why, '
            + 'and name two foods that provide it.',
    modelAnswer:
      'Roughage is the fibre from plants that the body cannot digest. It adds bulk and helps '
      + 'waste move through the intestine, so it prevents constipation. Whole grains, fruit, '
      + 'vegetables and salad provide it.',
    keyPoints: [
      { id: 'what-it-is', label: 'It is plant fibre the body cannot digest',
        accept: [['fibre'], ['fiber'], ['cannot digest'], ['not digest'], ['undigest'], ['plant']] },
      { id: 'what-it-does', label: 'It moves waste along and prevents constipation',
        accept: [['constipation'], ['bowel'], ['waste'], ['stool'], ['motion'], ['intestine'], ['digestion'], ['clean']] },
      { id: 'sources', label: 'Whole grains, fruit, vegetables and salad provide it',
        accept: [['whole grain'], ['fruit'], ['vegetable'], ['salad'], ['millet'], ['oat'], ['leafy'], ['skin']] },
    ],
  },
  {
    topic: 'roughage-water', topicLabel: 'Roughage & Water', chapter: CH,
    question: 'Give three reasons the body needs plenty of water every day.',
    modelAnswer:
      'Water carries digested food and oxygen around the body in the blood. It removes waste '
      + 'as urine and sweat. It also controls body temperature, because sweating cools a '
      + 'person down.',
    keyPoints: [
      { id: 'transport', label: 'It carries food and oxygen around in the blood',
        accept: [['carry'], ['transport'], ['blood'], ['absorb'], ['digest'], ['oxygen']] },
      { id: 'removes-waste', label: 'It removes waste as urine and sweat',
        accept: [['waste'], ['urine'], ['toilet'], ['toxin'], ['kidney'], ['flush']] },
      { id: 'temperature', label: 'It controls temperature — sweating cools the body',
        accept: [['temperature'], ['sweat'], ['cool'], ['hot'], ['heat']] },
    ],
  },

  // ── Vitamins ──────────────────────────────────────────────────────────
  {
    topic: 'vitamins', topicLabel: 'Vitamins', chapter: CH,
    question: 'A boy cannot see properly once it gets dark, though his sight is fine in daylight. '
            + 'Say what he lacks, what the condition is called, and what would help.',
    modelAnswer:
      'He lacks vitamin A. The condition is night blindness. Carrot, papaya, mango, milk and '
      + 'green leafy vegetables would supply the vitamin A he needs.',
    keyPoints: [
      { id: 'vitamin-a', label: 'Vitamin A is missing',
        accept: [['vitamin a']] },
      { id: 'night-blindness', label: 'The condition is night blindness',
        accept: [['night blind'], ['nightblind'], ['blindness']] },
      { id: 'foods', label: 'Carrot, papaya, mango, milk or leafy vegetables',
        accept: [['carrot'], ['papaya'], ['mango'], ['milk'], ['leafy'], ['spinach'], ['egg'], ['butter'], ['pumpkin']] },
    ],
  },
  {
    topic: 'vitamins', topicLabel: 'Vitamins', chapter: CH,
    question: 'Children are told to play outside in the morning sun. Explain what the body makes '
            + 'then, why it matters, and what happens without it.',
    modelAnswer:
      'Sunlight lets the skin make vitamin D. Vitamin D helps the body absorb calcium, which is '
      + 'needed for strong bones and teeth. Without it, bones become soft and bend, a disease '
      + 'called rickets.',
    keyPoints: [
      { id: 'vitamin-d', label: 'The skin makes vitamin D from sunlight',
        accept: [['vitamin d'], ['skin make'], ['skin produce']] },
      { id: 'calcium-bones', label: 'It helps absorb calcium for strong bones and teeth',
        accept: [['calcium'], ['bone'], ['teeth'], ['tooth'], ['absorb'], ['strong']] },
      { id: 'rickets', label: 'Without it bones soften and bend — rickets',
        accept: [['rickets'], ['bend'], ['soft bone'], ['weak bone'], ['bow leg'], ['deform']] },
    ],
  },
]
