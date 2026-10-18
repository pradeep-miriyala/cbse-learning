// scripts/spoken/science-materials.ts — Science · Materials, Methods of Separation.
// Authoring rules are at the head of science-food.ts.

import type { AuthoredSpoken } from '../../src/lib/speaking.ts'

const MAT = 'Materials Around Us'
const SEP = 'Methods of Separation'

export const SCIENCE_MATERIALS: AuthoredSpoken[] = [
  // ── Appearance & State ────────────────────────────────────────────────
  {
    topic: 'material-appearance-state', topicLabel: 'Appearance & State', chapter: MAT,
    question: 'Describe how a solid, a liquid and a gas differ in the way they hold their shape '
            + 'and fill a container.',
    modelAnswer:
      'A solid keeps a fixed shape and a fixed volume, so a stone stays the same in any box. '
      + 'A liquid keeps its volume but takes the shape of whatever holds it, as water does in a '
      + 'glass. A gas has neither, spreading out to fill the whole container.',
    keyPoints: [
      { id: 'solid', label: 'A solid keeps a definite shape and volume',
        accept: [['solid', 'fixed'], ['solid', 'definite'], ['solid', 'own shape'], ['stone'], ['does not change']] },
      { id: 'liquid', label: 'A liquid keeps its volume but takes the shape of the vessel',
        accept: [['liquid', 'take'], ['liquid', 'vessel'], ['water', 'glass'], ['takes the shape'], ['shape of container']] },
      { id: 'gas', label: 'A gas spreads out and fills the whole space',
        accept: [['spread'], ['everywhere'], ['expand'], ['fill the whole'], ['no fixed'], ['whole space']] },
    ],
  },
  {
    topic: 'material-appearance-state', topicLabel: 'Appearance & State', chapter: MAT,
    question: 'Explain what happens to ice as it is heated all the way to steam, naming the '
            + 'changes.',
    modelAnswer:
      'Heating ice makes it melt into water, and that change is called melting. Heating the '
      + 'water further turns it into steam, which is boiling or evaporation. Cooling steam turns '
      + 'it back into water by condensation, so the changes can be reversed.',
    keyPoints: [
      { id: 'melting', label: 'Solid to liquid — melting',
        accept: [['melt'], ['solid to liquid']] },
      { id: 'boiling', label: 'Liquid to gas — boiling or evaporation',
        accept: [['boil'], ['evaporat'], ['vapour'], ['vapor'], ['liquid to gas']] },
      { id: 'reversible', label: 'Cooling reverses it — condensation',
        accept: [['condens'], ['cool'], ['back to water'], ['reverse'], ['again water'], ['freeze']] },
    ],
  },

  // ── Heat & Electrical Conductivity ────────────────────────────────────
  {
    topic: 'material-conductivity', topicLabel: 'Heat & Electrical Conductivity', chapter: MAT,
    question: 'A steel pan is given a plastic handle. Explain the reason, using what you know '
            + 'about how heat travels.',
    modelAnswer:
      'Steel is a good conductor, so heat passes quickly through it from the flame. Plastic is '
      + 'a poor conductor, an insulator, so heat hardly travels along it. The handle therefore '
      + 'stays cool enough to hold and the cook is not burnt.',
    keyPoints: [
      { id: 'metal-conducts', label: 'Steel conducts heat well, so heat passes through quickly',
        accept: [['conduct'], ['metal'], ['passes'], ['carries heat'], ['good conductor'], ['quickly']] },
      { id: 'plastic-insulates', label: 'Plastic is a poor conductor — an insulator',
        accept: [['insulat'], ['bad conductor'], ['poor conductor'], ['does not conduct'], ['not conduct'], ['blocks']] },
      { id: 'safe-to-hold', label: 'So the handle stays cool and nobody is burnt',
        accept: [['cool'], ['burn'], ['hold'], ['safe'], ['hurt'], ['touch'], ['grip']] },
    ],
  },
  {
    topic: 'material-conductivity', topicLabel: 'Heat & Electrical Conductivity', chapter: MAT,
    question: 'Electric wires are made of copper but wrapped in plastic. Explain why each of '
            + 'those two materials is chosen.',
    modelAnswer:
      'Copper is a good conductor of electricity, so current flows through it easily. Plastic '
      + 'does not let current pass, so it is an insulator. The covering keeps the current inside '
      + 'the wire and stops anyone touching it from getting a shock.',
    keyPoints: [
      { id: 'copper-conducts', label: 'Copper conducts electricity, so current flows easily',
        accept: [['conduct'], ['current'], ['electricity flow'], ['flows'], ['pass through'], ['good conductor']] },
      { id: 'plastic-insulates', label: 'Plastic does not let current pass — an insulator',
        accept: [['insulat'], ['bad conductor'], ['not conduct'], ['does not pass'], ['stop'], ['block']] },
      { id: 'safety', label: 'So nobody touching the wire gets a shock',
        accept: [['shock'], ['safe'], ['danger'], ['protect'], ['touch'], ['injur'], ['death']] },
    ],
  },

  // ── Hardness & Density ────────────────────────────────────────────────
  {
    topic: 'material-hardness-density', topicLabel: 'Hardness & Density', chapter: MAT,
    question: 'A huge ship made of iron floats, while a small iron nail sinks. Explain how that '
            + 'can be.',
    modelAnswer:
      'Floating depends on density, not on weight alone. A ship is hollow and full of air, so '
      + 'the whole thing is less dense than water and it floats. A nail is solid iron, denser '
      + 'than water, so it goes straight down.',
    keyPoints: [
      { id: 'density-not-weight', label: 'It depends on density, not weight alone',
        accept: [['density'], ['dense'], ['weight alone'], ['not just'], ['heaviness']] },
      { id: 'hollow-air', label: 'The ship is hollow and full of air, so overall it is lighter than water',
        accept: [['hollow'], ['air'], ['empty'], ['space'], ['shape'], ['spread']] },
      { id: 'nail-solid', label: 'The nail is solid, denser than water, so it sinks',
        accept: [['solid'], ['dense than water'], ['heavier than water'], ['no air'], ['compact']] },
    ],
  },
  {
    topic: 'material-hardness-density', topicLabel: 'Hardness & Density', chapter: MAT,
    question: 'Explain what makes one material harder than another, and why a diamond is used to '
            + 'cut glass rather than the other way round.',
    modelAnswer:
      'Hardness is how well something resists being scratched or cut. A harder material can '
      + 'scratch a softer one, but not the reverse. Diamond is the hardest natural substance, so '
      + 'it scratches glass easily while glass cannot mark it.',
    keyPoints: [
      { id: 'meaning', label: 'Hardness is resistance to being scratched or dented',
        accept: [['scratch'], ['resist'], ['dent'], ['press'], ['squeeze'], ['mark']] },
      { id: 'harder-scratches', label: 'A harder material scratches a softer one, never the reverse',
        accept: [['harder', 'softer'], ['scratch', 'soft'], ['only harder'], ['not the other'], ['cannot scratch']] },
      { id: 'diamond-hardest', label: 'Diamond is the hardest natural substance',
        accept: [['hardest'], ['most hard'], ['nothing harder'], ['natural']] },
    ],
  },

  // ── Solubility ────────────────────────────────────────────────────────
  {
    topic: 'material-solubility', topicLabel: 'Solubility', chapter: MAT,
    question: 'Sugar stirred into water seems to disappear, but sand does not. Explain what is '
            + 'happening in each case, using the right words.',
    modelAnswer:
      'Sugar is soluble, so it dissolves and spreads evenly through the water to form a '
      + 'solution. It has not vanished — it is still there, and boiling the water away would '
      + 'leave it behind. Sand is insoluble, so it stays as separate grains and settles at the '
      + 'bottom.',
    keyPoints: [
      { id: 'soluble', label: 'Sugar is soluble and dissolves to form a solution',
        accept: [['dissolv'], ['soluble'], ['solution'], ['mixes evenly'], ['spread']] },
      { id: 'still-present', label: 'It has not vanished — it can be recovered',
        accept: [['still there'], ['not gone'], ['recover'], ['boil'], ['evaporat'], ['get it back'], ['present'], ['taste']] },
      { id: 'insoluble', label: 'Sand is insoluble and settles at the bottom',
        accept: [['insoluble'], ['not dissolv'], ['settle'], ['bottom'], ['separate'], ['grain']] },
    ],
  },
  {
    topic: 'material-solubility', topicLabel: 'Solubility', chapter: MAT,
    question: 'Sugar dissolves much faster in hot tea than in cold water. Give two reasons, and '
            + 'say what else would speed it up.',
    modelAnswer:
      'Heat makes the particles move faster, so they mix more quickly. Hot liquid can also hold '
      + 'more dissolved sugar than cold. Stirring speeds it up as well, and so does grinding the '
      + 'sugar into smaller grains.',
    keyPoints: [
      { id: 'particles-faster', label: 'Heat makes particles move faster, so mixing is quicker',
        accept: [['particle'], ['molecule'], ['move fast'], ['moving'], ['energy'], ['vibrat']] },
      { id: 'holds-more', label: 'A hot liquid dissolves a greater amount',
        accept: [['more sugar'], ['greater amount'], ['hold more'], ['dissolve more'], ['capacity']] },
      { id: 'stirring-grinding', label: 'Stirring, or smaller grains, speeds it up',
        accept: [['stir'], ['mix'], ['powder'], ['grind'], ['small piece'], ['smaller'], ['crush']] },
    ],
  },

  // ── Pure Substances & Mixtures ────────────────────────────────────────
  {
    topic: 'pure-substances-mixtures', topicLabel: 'Pure Substances & Mixtures', chapter: SEP,
    question: 'Explain the difference between a pure substance and a mixture, giving an example '
            + 'of each.',
    modelAnswer:
      'A pure substance has only one kind of material in it, such as distilled water or common '
      + 'salt. A mixture has two or more materials jumbled together, such as air, milk or sand '
      + 'in water. The parts of a mixture keep their own properties and can be separated again.',
    keyPoints: [
      { id: 'pure-one', label: 'A pure substance contains only one kind of material',
        accept: [['one kind'], ['only one'], ['single'], ['same throughout'], ['nothing else'], ['distilled']] },
      { id: 'mixture-many', label: 'A mixture has two or more jumbled together',
        accept: [['two or more'], ['more than one'], ['together'], ['combin'], ['air'], ['milk'], ['different thing']] },
      { id: 'separable', label: 'The parts keep their own properties and can be separated',
        accept: [['separat'], ['own propert'], ['get back'], ['divide'], ['remove'], ['take out']] },
    ],
  },
  {
    topic: 'pure-substances-mixtures', topicLabel: 'Pure Substances & Mixtures', chapter: SEP,
    question: 'Give three reasons why people bother to separate the parts of a mixture at all.',
    modelAnswer:
      'Sometimes the useful part must be taken out, as when butter is separated from milk. '
      + 'Sometimes a harmful or useless part must be removed, such as stones from rice. '
      + 'Sometimes it is to obtain something pure, as when salt is got from sea water.',
    keyPoints: [
      { id: 'get-useful', label: 'To obtain the useful part',
        accept: [['useful'], ['butter'], ['cream'], ['want'], ['need'], ['valuable'], ['use it']] },
      { id: 'remove-harmful', label: 'To remove a harmful or useless part',
        accept: [['harmful'], ['useless'], ['stone'], ['dirt'], ['husk'], ['unwanted'], ['impurit'], ['waste']] },
      { id: 'obtain-pure', label: 'To obtain something pure',
        accept: [['pure'], ['salt'], ['clean'], ['drinking']] },
    ],
  },

  // ── Separating Solids ─────────────────────────────────────────────────
  {
    topic: 'separating-solids', topicLabel: 'Separating Solids', chapter: SEP,
    question: 'Describe how a farmer separates grain from the light husk after harvest, and what '
            + 'the method depends on.',
    modelAnswer:
      'The farmer drops the mixture from a height on a windy day, which is called winnowing. '
      + 'The wind blows the light husk to one side while the heavier grain falls straight down '
      + 'in a heap. It works because the two parts differ in weight.',
    keyPoints: [
      { id: 'winnowing', label: 'The method is winnowing — dropping it in the wind',
        accept: [['winnow'], ['wind'], ['air'], ['drop'], ['height'], ['pour'], ['blow']] },
      { id: 'light-carried', label: 'The light husk is blown aside, the heavy grain falls straight',
        accept: [['heavy'], ['heavier'], ['blown'], ['aside'], ['straight'], ['one side'], ['separate heap']] },
      { id: 'depends-weight', label: 'It depends on the difference in weight',
        accept: [['weight'], ['heavier'], ['lighter'], ['mass'], ['differ']] },
    ],
  },
  {
    topic: 'separating-solids', topicLabel: 'Separating Solids', chapter: SEP,
    question: 'Flour has to be separated from bran, and stones have to be taken out of rice. '
            + 'Describe the method used for each and why they differ.',
    modelAnswer:
      'Flour is separated from bran by sieving, because the two differ in the size of their '
      + 'particles and the fine flour passes through the mesh. Stones are taken from rice by '
      + 'handpicking, since the pieces are few, large and easy to see. The method chosen always '
      + 'depends on how the parts differ.',
    keyPoints: [
      { id: 'sieving', label: 'Sieving separates by particle size',
        accept: [['siev'], ['sift'], ['mesh'], ['size'], ['fine'], ['pass through'], ['chalni']] },
      { id: 'handpicking', label: 'Handpicking, because the pieces are few and easy to see',
        accept: [['hand pick'], ['handpick'], ['by hand'], ['pick out'], ['see'], ['few'], ['visible'], ['finger']] },
      { id: 'depends-difference', label: 'The method depends on how the parts differ',
        accept: [['depends on how'], ['propert'], ['physical'], ['suitable'], ['according'], ['based on']] },
    ],
  },

  // ── Sedimentation & Filtration ────────────────────────────────────────
  {
    topic: 'sedimentation-filtration', topicLabel: 'Sedimentation & Filtration', chapter: SEP,
    question: 'Muddy river water has to be made clear. Describe the steps, naming each one.',
    modelAnswer:
      'The water is left standing so the heavier mud settles at the bottom, which is called '
      + 'sedimentation. The clear liquid above is then poured off gently without disturbing the '
      + 'settled layer, and that is decantation. Finally it is passed through a filter such as '
      + 'cloth or filter paper to trap the fine particles left behind.',
    keyPoints: [
      { id: 'sedimentation', label: 'Standing lets the heavier mud settle — sedimentation',
        accept: [['sediment'], ['settle'], ['bottom'], ['stand'], ['undisturb'], ['sink']] },
      { id: 'decantation', label: 'Pouring off the clear liquid — decantation',
        accept: [['decant'], ['pour'], ['tilt'], ['clear water'], ['top layer']] },
      { id: 'filtration', label: 'Passing it through a filter traps the fine particles',
        accept: [['filter'], ['filtrat'], ['cloth'], ['paper'], ['strain'], ['sand']] },
    ],
  },
  {
    topic: 'sedimentation-filtration', topicLabel: 'Sedimentation & Filtration', chapter: SEP,
    question: 'Explain why tea is poured through a strainer, and what would be left in it.',
    modelAnswer:
      'The strainer acts as a filter with very small holes. The liquid tea passes through, while '
      + 'the solid leaves are too large and are held back. The used leaves stay in the strainer '
      + 'as the residue, and the liquid collected is the filtrate.',
    keyPoints: [
      { id: 'small-holes', label: 'It works as a filter with very small holes',
        accept: [['filter'], ['hole'], ['mesh'], ['pore'], ['net'], ['gap'], ['small']] },
      { id: 'liquid-through', label: 'The liquid passes through, the solids are held back',
        accept: [['liquid pass'], ['pass through'], ['solid'], ['held'], ['stop'], ['cannot pass'], ['big']] },
      { id: 'residue-filtrate', label: 'Leaves left are the residue; the liquid is the filtrate',
        accept: [['residue'], ['filtrate'], ['left behind'], ['remain'], ['collect'], ['waste']] },
    ],
  },

  // ── Evaporation & Distillation ────────────────────────────────────────
  {
    topic: 'evaporation-distillation', topicLabel: 'Evaporation & Distillation', chapter: SEP,
    question: 'Describe how salt is obtained from sea water on the coast, and why filtering would '
            + 'not work.',
    modelAnswer:
      'Sea water is let into shallow pans and left in the sun and wind. The water evaporates '
      + 'into the air, leaving the salt behind as crystals to be gathered. Filtering fails '
      + 'because the salt is dissolved, so it passes straight through the paper with the water.',
    keyPoints: [
      { id: 'shallow-sun', label: 'It is spread in shallow pans in sun and wind',
        accept: [['shallow'], ['sun'], ['pan'], ['bed'], ['wind'], ['heat'], ['open']] },
      { id: 'evaporates', label: 'The water evaporates and the salt is left as crystals',
        accept: [['evaporat'], ['dries'], ['goes away'], ['crystal'], ['left behind'], ['vapour']] },
      { id: 'why-not-filter', label: 'Filtering fails because dissolved salt passes through',
        accept: [['dissolv'], ['pass through'], ['too small'], ['not solid'], ['with the water'], ['cannot filter']] },
    ],
  },
  {
    topic: 'evaporation-distillation', topicLabel: 'Evaporation & Distillation', chapter: SEP,
    question: 'Explain how you would obtain drinkable water from salty water and still keep the '
            + 'water itself, not just the salt.',
    modelAnswer:
      'The salty water is heated until it boils and turns to steam, leaving the salt behind in '
      + 'the vessel. The steam is led away and cooled, so it condenses back into liquid water. '
      + 'That collected water is pure, and the whole process is called distillation.',
    keyPoints: [
      { id: 'boil-to-steam', label: 'Heat it until it boils to steam, leaving the salt behind',
        accept: [['boil'], ['steam'], ['heat'], ['vapour'], ['vapor'], ['evaporat']] },
      { id: 'condense-back', label: 'Cool the steam so it condenses back to liquid',
        accept: [['condens'], ['cool'], ['back to water'], ['collect'], ['liquid again'], ['drop']] },
      { id: 'distillation', label: 'The process is distillation, and the water is pure',
        accept: [['distill'], ['pure'], ['clean'], ['fresh']] },
    ],
  },

  // ── Solutions ─────────────────────────────────────────────────────────
  {
    topic: 'solutions', topicLabel: 'Solutions', chapter: SEP,
    question: 'When sugar is stirred into water, name the two parts by their proper terms and '
            + 'explain what each one is.',
    modelAnswer:
      'The sugar is the solute, the substance that dissolves. The water is the solvent, the '
      + 'liquid that does the dissolving. Together they make a solution, and it is the same all '
      + 'the way through.',
    keyPoints: [
      { id: 'solute', label: 'The sugar is the solute — the substance that dissolves',
        accept: [['solute']] },
      { id: 'solvent', label: 'The water is the solvent — the liquid that dissolves it',
        accept: [['solvent']] },
      { id: 'solution-uniform', label: 'Together they form a solution, uniform throughout',
        accept: [['solution'], ['uniform'], ['same throughout'], ['evenly'], ['mixed well'], ['homogen']] },
    ],
  },
  {
    topic: 'solutions', topicLabel: 'Solutions', chapter: SEP,
    question: 'A glass of water will take four spoons of sugar but not ten — the rest lies at the '
            + 'bottom. Explain what has happened and what would let it take more.',
    modelAnswer:
      'The water has taken all it can hold at that temperature, so it is saturated. Any further '
      + 'sugar cannot dissolve and settles at the bottom instead. Heating the water lets it hold '
      + 'more, so the extra would then dissolve.',
    keyPoints: [
      { id: 'saturated', label: 'The water is saturated — it has taken all it can hold',
        accept: [['saturat'], ['as much as'], ['cannot take more'], ['limit'], ['full'], ['maximum'], ['no more']] },
      { id: 'undissolved-settles', label: 'The extra cannot dissolve and settles undissolved',
        accept: [['not dissolv'], ['undissolv'], ['settle'], ['stay'], ['remain'], ['extra']] },
      { id: 'heating-helps', label: 'Heating lets it hold more',
        accept: [['heat'], ['hot'], ['warm'], ['temperature'], ['boil'], ['more water']] },
    ],
  },
]
