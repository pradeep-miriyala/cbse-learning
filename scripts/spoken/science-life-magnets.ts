// scripts/spoken/science-life-magnets.ts — Science · Living Creatures, Magnets.
// Authoring rules are at the head of science-food.ts.

import type { AuthoredSpoken } from '../../src/lib/speaking.ts'

const LIFE = 'Living Creatures'
const MAG = 'Magnets'

export const SCIENCE_LIFE_MAGNETS: AuthoredSpoken[] = [
  // ── Life Cycles of Animals ────────────────────────────────────────────
  {
    topic: 'animal-life-cycles', topicLabel: 'Life Cycles of Animals', chapter: LIFE,
    question: 'Describe how a butterfly changes from the time it hatches until it can fly. '
            + 'Name the stages in order.',
    modelAnswer:
      'A caterpillar hatches from the egg and eats leaves constantly, growing fast. It then '
      + 'becomes a pupa inside a chrysalis, where it stays still and changes completely. '
      + 'Finally the adult emerges with wings.',
    keyPoints: [
      { id: 'larva', label: 'A caterpillar or larva hatches and feeds',
        accept: [['caterpillar'], ['larva'], ['worm'], ['eat leaf'], ['eats leaves']] },
      { id: 'pupa', label: 'It becomes a pupa inside a chrysalis or cocoon',
        accept: [['pupa'], ['chrysalis'], ['cocoon'], ['resting'], ['still']] },
      { id: 'adult', label: 'The adult emerges with wings',
        accept: [['adult'], ['wing'], ['emerge'], ['come out'], ['grown up'], ['fully']] },
    ],
  },
  {
    topic: 'animal-life-cycles', topicLabel: 'Life Cycles of Animals', chapter: LIFE,
    question: 'A tadpole and a grown frog look nothing alike. Describe three ways the young one '
            + 'changes as it grows up.',
    modelAnswer:
      'The tadpole breathes through gills in water, and later develops lungs so it can breathe '
      + 'air. It loses its tail as it grows. It also grows legs, the hind legs appearing before '
      + 'the front ones, so it can move on land.',
    keyPoints: [
      { id: 'gills-lungs', label: 'Gills give way to lungs, so it can breathe air',
        accept: [['gill'], ['lung'], ['breathe'], ['air'], ['under water']] },
      { id: 'tail', label: 'The tail is lost',
        accept: [['tail']] },
      { id: 'legs', label: 'Legs grow — hind legs first, then the front ones',
        accept: [['leg'], ['hind'], ['back leg'], ['limb'], ['walk'], ['jump'], ['hop']] },
    ],
  },

  // ── Characteristics of Living Things ──────────────────────────────────
  {
    topic: 'characteristics-of-living-things', topicLabel: 'Characteristics of Living Things', chapter: LIFE,
    question: 'A car moves, uses fuel and gives out gas, yet nobody calls it alive. Give three '
            + 'things a living creature does that a car cannot.',
    modelAnswer:
      'A living creature grows by itself from young to adult, whereas a car is built at its '
      + 'full size. It reproduces, making young of its own kind. It also responds to what is '
      + 'around it and repairs itself when hurt.',
    keyPoints: [
      { id: 'grows', label: 'It grows by itself',
        accept: [['grow'], ['bigger'], ['develop'], ['taller']] },
      { id: 'reproduces', label: 'It reproduces — young of its own kind',
        accept: [['reproduc'], ['babies'], ['young one'], ['offspring'], ['egg'], ['seed'], ['multiply'], ['children']] },
      { id: 'responds-repairs', label: 'It responds to surroundings and heals itself',
        accept: [['respond'], ['react'], ['stimul'], ['feel'], ['heal'], ['repair'], ['sense'], ['touch']] },
    ],
  },
  {
    topic: 'characteristics-of-living-things', topicLabel: 'Characteristics of Living Things', chapter: LIFE,
    question: 'Plants stay rooted in one place all their lives. Explain how they still show '
            + 'movement and response, with an example.',
    modelAnswer:
      'Plants move by growing rather than by walking. A shoot bends towards light, and roots '
      + 'grow downwards towards water. The touch-me-not folds its leaves the moment it is '
      + 'touched, which shows it responds too.',
    keyPoints: [
      { id: 'growth-movement', label: 'They move by growing, not by walking',
        accept: [['grow'], ['bend'], ['turn'], ['direction']] },
      { id: 'towards-light-water', label: 'Shoots turn to light, roots grow to water',
        accept: [['light'], ['sun'], ['water'], ['shoot'], ['downward'], ['upward']] },
      { id: 'example', label: 'The touch-me-not folds when touched',
        accept: [['touch me not'], ['touchmenot'], ['mimosa'], ['fold'], ['close'], ['shrink'], ['sunflower'], ['shut']] },
    ],
  },

  // ── Life Cycle of a Plant ─────────────────────────────────────────────
  {
    topic: 'plant-life-cycle', topicLabel: 'Life Cycle of a Plant', chapter: LIFE,
    question: 'Trace the life of a mango tree from the very beginning to the point where it can '
            + 'start the cycle again.',
    modelAnswer:
      'It begins as a seed, which germinates when it gets water, warmth and air. A seedling '
      + 'grows into a sapling and then into a mature tree with roots, stem and leaves. The tree '
      + 'flowers, and the flowers become fruit carrying seeds, so the cycle starts again.',
    keyPoints: [
      { id: 'germination', label: 'The seed germinates given water, warmth and air',
        accept: [['germinat'], ['sprout'], ['seedling'], ['water'], ['sapling']] },
      { id: 'grows-mature', label: 'It grows into a mature plant with roots, stem and leaves',
        accept: [['root'], ['stem'], ['leaf'], ['leaves'], ['mature'], ['grown'], ['branch'], ['trunk']] },
      { id: 'flowers-fruit', label: 'It flowers, and flowers become fruit carrying new seeds',
        accept: [['flower'], ['fruit'], ['new seed'], ['pollinat'], ['reproduc']] },
    ],
  },
  {
    topic: 'plant-life-cycle', topicLabel: 'Life Cycle of a Plant', chapter: LIFE,
    question: 'Explain why a plant that never flowers can be a serious problem for a farmer.',
    modelAnswer:
      'Flowers are the reproductive part, and without them no fruit can form. Without fruit '
      + 'there are no seeds, so nothing can be sown the following year. Many crops are grown '
      + 'precisely for their fruit or grain, so the farmer has nothing to harvest or sell.',
    keyPoints: [
      { id: 'reproductive', label: 'Flowers are the reproductive part of the plant',
        accept: [['reproduc'], ['pollen'], ['pollinat'], ['make fruit'], ['form fruit'], ['fruit']] },
      { id: 'no-seed', label: 'No fruit means no seed for the next sowing',
        accept: [['seed'], ['next year'], ['sow'], ['plant again'], ['grow again']] },
      { id: 'no-harvest', label: 'Nothing to harvest or sell',
        accept: [['harvest'], ['sell'], ['crop'], ['income'], ['money'], ['grain'], ['yield'], ['loss']] },
    ],
  },

  // ── Seeds & Germination ───────────────────────────────────────────────
  {
    topic: 'seeds-and-germination', topicLabel: 'Seeds & Germination', chapter: LIFE,
    question: 'Seeds kept dry in a tin for months do not sprout, but the same seeds sprout in a '
            + 'few days on wet cotton. Explain what the seed needs and why.',
    modelAnswer:
      'A seed needs water, which softens the coat and wakes the sleeping embryo. It needs air, '
      + 'because the embryo has to respire to release energy. It also needs a suitable warmth, '
      + 'since it will not sprout when it is too cold.',
    keyPoints: [
      { id: 'water', label: 'Water softens the coat and wakes the embryo',
        accept: [['water'], ['moist'], ['soften'], ['swell'], ['damp']] },
      { id: 'air', label: 'Air, because the embryo must respire',
        accept: [['air'], ['oxygen'], ['respir'], ['breathe']] },
      { id: 'warmth', label: 'Suitable warmth — it will not sprout when too cold',
        accept: [['warm'], ['temperature'], ['heat'], ['cold'], ['hot']] },
    ],
  },
  {
    topic: 'seeds-and-germination', topicLabel: 'Seeds & Germination', chapter: LIFE,
    question: 'Seeds have to travel away from the parent plant. Describe three ways they are '
            + 'carried, with an example of each.',
    modelAnswer:
      'Wind carries light seeds with hairs or wings, like the drumstick and the dandelion. '
      + 'Water floats seeds such as the coconut to a new shore. Animals carry them, either by '
      + 'sticking to fur like the xanthium or by being eaten and dropped in their droppings.',
    keyPoints: [
      { id: 'wind', label: 'Wind carries light, winged or hairy seeds',
        accept: [['wind'], ['air'], ['fly'], ['dandelion'], ['drumstick'], ['light'], ['wing'], ['hair']] },
      { id: 'water', label: 'Water floats seeds such as the coconut',
        accept: [['water'], ['float'], ['coconut'], ['river'], ['sea'], ['lotus']] },
      { id: 'animals', label: 'Animals carry them — stuck to fur, or eaten and dropped',
        accept: [['animal'], ['bird'], ['fur'], ['stick'], ['hook'], ['eat'], ['dropping'], ['dung'], ['xanthium']] },
    ],
  },

  // ── Magnetic & Non-magnetic Materials ─────────────────────────────────
  {
    topic: 'magnetic-materials', topicLabel: 'Magnetic & Non-magnetic Materials', chapter: MAG,
    question: 'A box holds pins, rubber bands, paper clips and plastic buttons all jumbled '
            + 'together. Describe how you would quickly separate them, and why it works.',
    modelAnswer:
      'Move a magnet through the mixture. The pins and clips are made of iron, which is '
      + 'attracted, so they cling to the magnet and lift out. Rubber and plastic are not '
      + 'attracted at all, so they stay behind in the box.',
    keyPoints: [
      { id: 'use-magnet', label: 'Pass a magnet through the mixture',
        accept: [['magnet']] },
      { id: 'iron-attracted', label: 'Iron things — pins and clips — are attracted and lift out',
        accept: [['iron'], ['steel'], ['attract'], ['stick'], ['cling'], ['pull']] },
      { id: 'others-left', label: 'Rubber and plastic are not attracted and stay behind',
        accept: [['not attract'], ['left behind'], ['stay behind'], ['non magnetic'], ['nonmagnetic'], ['remain'], ['do not stick'], ['not pulled']] },
    ],
  },
  {
    topic: 'magnetic-materials', topicLabel: 'Magnetic & Non-magnetic Materials', chapter: MAG,
    question: 'Name two materials that a magnet pulls and two that it does not, and say what the '
            + 'first group have in common.',
    modelAnswer:
      'Iron, nickel, cobalt and steel are pulled by a magnet. Wood, plastic, glass, rubber and '
      + 'paper are not. The first group are all metals of a particular kind, and materials that '
      + 'behave that way are called magnetic.',
    keyPoints: [
      { id: 'attracted-list', label: 'Iron, nickel, cobalt or steel are pulled',
        accept: [['iron'], ['nickel'], ['cobalt'], ['steel']] },
      { id: 'not-attracted-list', label: 'Wood, plastic, glass, rubber or paper are not',
        accept: [['wood'], ['plastic'], ['glass'], ['rubber'], ['paper'], ['cloth'], ['copper'], ['aluminium']] },
      { id: 'common', label: 'The first group are metals, called magnetic materials',
        accept: [['metal'], ['magnetic material'], ['magnetic substance'], ['called magnetic']] },
    ],
  },

  // ── Poles of a Magnet ─────────────────────────────────────────────────
  {
    topic: 'magnet-poles', topicLabel: 'Poles of a Magnet', chapter: MAG,
    question: 'A bar magnet is rolled in iron filings and lifted out. Describe what you would '
            + 'see, and explain it.',
    modelAnswer:
      'The filings cling in thick bunches at the two ends and hardly at all in the middle. That '
      + 'is because the pulling power is strongest at the ends, which are the poles. In the '
      + 'centre the force is weakest, so almost nothing sticks there.',
    keyPoints: [
      { id: 'ends-thick', label: 'Filings gather thickly at the two ends',
        accept: [['end'], ['both side'], ['two side'], ['tip'], ['edge'], ['corner']] },
      { id: 'poles', label: 'The ends are the poles, where the force is strongest',
        accept: [['pole'], ['strong'], ['most powerful'], ['maximum']] },
      { id: 'middle-weak', label: 'The middle is weakest, so little sticks there',
        accept: [['middle'], ['centre'], ['center'], ['weak'], ['less'], ['nothing stick']] },
    ],
  },
  {
    topic: 'magnet-poles', topicLabel: 'Poles of a Magnet', chapter: MAG,
    question: 'A bar magnet is snapped cleanly in half. Say what each piece now has, and what '
            + 'that tells you about poles.',
    modelAnswer:
      'Each half is a complete magnet with a north pole and a south pole of its own. You cannot '
      + 'obtain a single separated pole, however many times you break it. Poles always exist in '
      + 'pairs.',
    keyPoints: [
      { id: 'each-complete', label: 'Each piece becomes a complete magnet',
        accept: [['both piece'], ['two magnet'], ['complete'], ['full magnet'], ['new magnet'], ['own magnet'], ['separate magnet']] },
      { id: 'both-poles', label: 'Each has its own north and south pole',
        accept: [['north', 'south'], ['north pole'], ['south pole'], ['two pole']] },
      { id: 'never-single', label: 'A single pole can never be obtained — poles come in pairs',
        accept: [['pair'], ['never'], ['cannot'], ['not possible'], ['always two'], ['impossible'], ['no matter']] },
    ],
  },

  // ── Attraction & Repulsion ────────────────────────────────────────────
  {
    topic: 'attraction-repulsion', topicLabel: 'Attraction & Repulsion', chapter: MAG,
    question: 'State the rule about how two magnets behave when brought close, and give an '
            + 'example of each case.',
    modelAnswer:
      'Unlike poles attract, so a north brought near a south pulls together. Like poles repel, '
      + 'so two norths push each other away. The rule is that like poles repel and unlike poles '
      + 'attract.',
    keyPoints: [
      { id: 'unlike-attract', label: 'Unlike poles attract — north with south',
        accept: [['unlike', 'attract'], ['opposite', 'attract'], ['north', 'south'], ['different', 'attract']] },
      { id: 'like-repel', label: 'Like poles repel — north with north',
        accept: [['like', 'repel'], ['same', 'repel'], ['same', 'push'], ['repel'], ['push away'], ['push apart']] },
      { id: 'attract-word', label: 'The pulling together is called attraction',
        accept: [['attract'], ['pull'], ['come together'], ['stick']] },
    ],
  },
  {
    topic: 'attraction-repulsion', topicLabel: 'Attraction & Repulsion', chapter: MAG,
    question: 'You are given two identical iron bars, one magnetised and one not, and told not to '
            + 'use anything else. Explain how you can tell which is which.',
    modelAnswer:
      'Bring an end of the first bar near an end of the second and note what happens, then turn '
      + 'one bar around and try again. If they push apart in one of the positions, both are '
      + 'magnets. Plain iron is only ever attracted and never pushed away, so repulsion is the '
      + 'sure test.',
    keyPoints: [
      { id: 'bring-together', label: 'Bring the ends near, then reverse one and try again',
        accept: [['near'], ['close'], ['turn'], ['reverse'], ['other way'], ['both end'], ['rotate'], ['flip']] },
      { id: 'repulsion-test', label: 'Pushing away proves it — repulsion is the sure test',
        accept: [['repel'], ['push away'], ['push apart'], ['repuls'], ['move away']] },
      { id: 'attraction-not-proof', label: 'Attraction alone proves nothing, since plain iron is attracted too',
        accept: [['attract', 'both'], ['only attract'], ['always attract'], ['attract', 'not'], ['attract', 'plain'], ['attract', 'ordinary']] },
    ],
  },

  // ── Types of Magnets ──────────────────────────────────────────────────
  {
    topic: 'magnet-types', topicLabel: 'Types of Magnets', chapter: MAG,
    question: 'Explain the difference between a natural and an artificial magnet, and give one '
            + 'example of each.',
    modelAnswer:
      'A natural one is found in the ground as a rock — lodestone, which is an ore of iron. '
      + 'An artificial one is made by people from iron or steel. Bar magnets, horseshoe magnets '
      + 'and the magnets in a fridge door are all made ones.',
    keyPoints: [
      { id: 'natural', label: 'Natural ones are found in the earth — lodestone',
        accept: [['lodestone'], ['loadstone'], ['rock'], ['found in'], ['earth'], ['ore'], ['ground'], ['mine']] },
      { id: 'artificial-made', label: 'Artificial ones are made by people from iron or steel',
        accept: [['made'], ['man'], ['factory'], ['human'], ['steel'], ['prepare']] },
      { id: 'examples', label: 'Bar, horseshoe, needle or fridge magnets are made ones',
        accept: [['bar'], ['horseshoe'], ['horse shoe'], ['needle'], ['fridge'], ['ring'], ['cylindrical'], ['button']] },
    ],
  },
  {
    topic: 'magnet-types', topicLabel: 'Types of Magnets', chapter: MAG,
    question: 'Why is a horseshoe shape used for a magnet meant to lift heavy loads, rather than '
            + 'a straight bar?',
    modelAnswer:
      'Bending it brings both poles round to the same side, close together. The two pulls then '
      + 'act on the load at once instead of from opposite ends. That makes the lifting force '
      + 'much stronger than a straight one of the same size.',
    keyPoints: [
      { id: 'poles-together', label: 'Bending brings both poles to the same side, close together',
        accept: [['both pole'], ['two pole'], ['same side'], ['together'], ['near each other'], ['side by side'], ['bend']] },
      { id: 'both-act', label: 'Both pulls act on the load at once',
        accept: [['both', 'act'], ['both pull'], ['two force'], ['together pull'], ['at once'], ['same time'], ['add']] },
      { id: 'stronger', label: 'So the lifting force is much stronger',
        accept: [['strong'], ['powerful'], ['more force'], ['better'], ['greater']] },
    ],
  },

  // ── Making & Losing Magnetism ─────────────────────────────────────────
  {
    topic: 'making-magnets', topicLabel: 'Making & Losing Magnetism', chapter: MAG,
    question: 'Describe how you would turn an ordinary iron nail into a magnet using a bar magnet, '
            + 'and say how you would check that it worked.',
    modelAnswer:
      'Stroke the nail with one pole of the bar magnet, always in the same direction, lifting it '
      + 'away and returning to the start each time. Repeat this thirty or forty times. Then hold '
      + 'the nail near some pins — if it picks them up, it has become a magnet.',
    keyPoints: [
      { id: 'stroke', label: 'Stroke it with one pole of the magnet',
        accept: [['stroke'], ['rub'], ['one pole'], ['single pole'], ['touch']] },
      { id: 'same-direction', label: 'Always in the same direction, many times',
        accept: [['same direction'], ['one direction'], ['many time'], ['repeat'], ['again and again'], ['thirty'], ['forty'], ['fifty']] },
      { id: 'test', label: 'Test it by picking up pins',
        accept: [['pin'], ['clip'], ['filing'], ['pick up'], ['attract'], ['iron piece']] },
    ],
  },
  {
    topic: 'making-magnets', topicLabel: 'Making & Losing Magnetism', chapter: MAG,
    question: 'Give three things that would make a magnet lose its power, and one way to store '
            + 'magnets so it does not happen.',
    modelAnswer:
      'Heating it strongly destroys the magnetism. Hammering or dropping it repeatedly does the '
      + 'same. Storing magnets carelessly weakens them too. They should be kept in pairs with '
      + 'unlike poles facing and a soft iron keeper across the ends.',
    keyPoints: [
      { id: 'heat', label: 'Strong heating destroys it',
        accept: [['heat'], ['hot'], ['fire'], ['burn'], ['flame']] },
      { id: 'shock', label: 'Hammering or dropping does the same',
        accept: [['hammer'], ['drop'], ['bang'], ['beat'], ['fall'], ['hit'], ['shock']] },
      { id: 'storage', label: 'Store in pairs with unlike poles facing, and a keeper',
        accept: [['keeper'], ['pair'], ['unlike'], ['opposite pole'], ['soft iron'], ['store properly'], ['bar across']] },
    ],
  },

  // ── Finding Direction ─────────────────────────────────────────────────
  {
    topic: 'magnetic-direction', topicLabel: 'Finding Direction', chapter: MAG,
    question: 'A magnet is hung by a thread so it can turn freely, and left alone. Say what it '
            + 'does, and explain how sailors once used this.',
    modelAnswer:
      'It swings round and comes to rest pointing north and south every time. That happens '
      + 'because the earth itself behaves like a huge magnet and pulls it round. Sailors used a '
      + 'magnetised needle floating on water as a compass, so they could steer with no land in '
      + 'sight.',
    keyPoints: [
      { id: 'points-ns', label: 'It settles pointing north and south',
        accept: [['north', 'south'], ['north pole'], ['same direction every'], ['rest', 'north']] },
      { id: 'earth-magnet', label: 'Because the earth acts like a giant magnet',
        accept: [['earth'], ['world'], ['globe'], ['planet']] },
      { id: 'compass', label: 'A compass let sailors steer out of sight of land',
        accept: [['compass'], ['ship'], ['sea'], ['navigat'], ['travel'], ['lost'], ['steer']] },
    ],
  },
  {
    topic: 'magnetic-direction', topicLabel: 'Finding Direction', chapter: MAG,
    question: 'You are lost in a forest with a needle, a piece of cork and a bowl of water, and '
            + 'the needle has been stroked with a magnet. Explain how these help.',
    modelAnswer:
      'Lay the needle on the cork and float it on the water so it can turn freely without '
      + 'rubbing. It swings until it lines up pointing north and south. Once north is known, '
      + 'the other directions follow and you can walk a straight course.',
    keyPoints: [
      { id: 'float-free', label: 'Float the needle on the cork so it turns freely',
        accept: [['float'], ['turn freely'], ['rotate'], ['move freely'], ['spin'], ['place on']] },
      { id: 'settles-ns', label: 'It settles pointing north and south',
        accept: [['north', 'south'], ['north direction'], ['point north'], ['show north']] },
      { id: 'other-directions', label: 'Knowing north gives the other directions',
        accept: [['east'], ['west'], ['other direction'], ['find way'], ['which way'], ['straight'], ['walk']] },
    ],
  },

  // ── Uses of Magnets ───────────────────────────────────────────────────
  {
    topic: 'magnet-uses', topicLabel: 'Uses of Magnets', chapter: MAG,
    question: 'Describe three places a magnet is at work in ordinary life, and what job it does '
            + 'in each.',
    modelAnswer:
      'A refrigerator door has one in its seal, so the door stays shut. A compass uses one to '
      + 'point out direction for a traveller. Huge ones on cranes lift scrap iron in a junkyard, '
      + 'and doctors use small ones to draw iron splinters out of a patient’s eye.',
    keyPoints: [
      { id: 'household', label: 'A fridge door, pencil box or cupboard catch',
        accept: [['fridge'], ['refrigerat'], ['door'], ['cupboard'], ['pencil box'], ['bag'], ['speaker'], ['headphone']] },
      { id: 'compass-direction', label: 'A compass, to find direction',
        accept: [['compass'], ['direction'], ['north']] },
      { id: 'lifting-or-medical', label: 'Cranes lifting scrap, or removing iron splinters',
        accept: [['crane'], ['scrap'], ['junk'], ['lift'], ['doctor'], ['eye'], ['splinter'], ['hospital'], ['separat']] },
    ],
  },
  {
    topic: 'magnet-uses', topicLabel: 'Uses of Magnets', chapter: MAG,
    question: 'A rubbish heap has iron tins mixed with plastic and glass. Explain how a factory '
            + 'sorts them and why the method is better than doing it by hand.',
    modelAnswer:
      'A large electromagnet is passed over the heap, and the iron tins are attracted and lift '
      + 'away while plastic and glass stay put. It is far faster than picking through by hand '
      + 'and handles a huge quantity. It is also safer, because nobody has to touch sharp or '
      + 'dirty rubbish.',
    keyPoints: [
      { id: 'magnet-separates', label: 'A big electromagnet lifts the iron away',
        accept: [['electromagnet'], ['magnet'], ['attract'], ['lift'], ['pick up']] },
      { id: 'others-stay', label: 'Plastic and glass are not attracted and stay behind',
        accept: [['not attract'], ['stay'], ['left'], ['remain'], ['behind'], ['not lifted'], ['non magnetic']] },
      { id: 'faster-safer', label: 'Much faster than by hand, and safer',
        accept: [['fast'], ['quick'], ['safe'], ['sharp'], ['time'], ['lot'], ['huge'], ['injur'], ['effort']] },
    ],
  },

  // ── Discovery & History ───────────────────────────────────────────────
  {
    topic: 'magnet-discovery', topicLabel: 'Discovery & History', chapter: MAG,
    question: 'Tell the story of how magnets are said to have been discovered, and what the rock '
            + 'was called.',
    modelAnswer:
      'A shepherd named Magnes was walking on a hillside when the iron nails of his sandals and '
      + 'the tip of his stick stuck fast to a rock. The rock was lodestone, an ore of iron that '
      + 'is naturally magnetic. The word magnet is said to come from his name, or from the place '
      + 'Magnesia.',
    keyPoints: [
      { id: 'shepherd', label: 'A shepherd, Magnes, found his iron sticking to a rock',
        accept: [['shepherd'], ['sandal'], ['stick'], ['nail'], ['boy'], ['stuck'], ['hillside'], ['walking']] },
      { id: 'lodestone', label: 'The rock was lodestone, a natural ore of iron',
        accept: [['lodestone'], ['loadstone'], ['ore'], ['natural'], ['iron rock'], ['stone']] },
      { id: 'name-origin', label: 'The name comes from Magnes or from Magnesia',
        accept: [['magnesia'], ['name'], ['word'], ['origin'], ['comes from']] },
    ],
  },
  {
    topic: 'magnet-discovery', topicLabel: 'Discovery & History', chapter: MAG,
    question: 'Explain why the compass mattered so much to people long ago, and what they had to '
            + 'rely on before it existed.',
    modelAnswer:
      'Before it, travellers steered by the sun in the day and the pole star at night, which '
      + 'failed whenever the sky was cloudy. A compass works in any weather and at any hour, so '
      + 'ships could sail out of sight of land. That let traders and explorers cross open seas '
      + 'and reach places they had never seen.',
    keyPoints: [
      { id: 'before', label: 'They relied on the sun and stars, which clouds hid',
        accept: [['sun'], ['star'], ['pole star'], ['sky'], ['cloud'], ['moon'], ['landmark'], ['coast']] },
      { id: 'works-always', label: 'A compass works in any weather, day or night',
        accept: [['any weather'], ['cloudy'], ['night'], ['always'], ['rain'], ['anytime'], ['all time'], ['day']] },
      { id: 'made-possible', label: 'So ships could cross open sea, and trade and exploring grew',
        accept: [['ship'], ['sail'], ['sea'], ['ocean'], ['trade'], ['explor'], ['voyage'], ['new land'], ['far']] },
    ],
  },
]
