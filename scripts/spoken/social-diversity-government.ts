// scripts/spoken/social-diversity-government.ts
// Social Science · Diversity and Discrimination, Understanding Government.
// Authoring rules are at the head of science-food.ts.

import type { AuthoredSpoken } from '../../src/lib/speaking.ts'

const DIV = 'Diversity and Discrimination'
const GOV = 'Understanding Government'

export const SOCIAL_DIVERSITY_GOVERNMENT: AuthoredSpoken[] = [
  // ── Prejudice & Stereotypes ───────────────────────────────────────────
  {
    topic: 'prejudice-and-stereotypes', topicLabel: 'Prejudice & Stereotypes', chapter: DIV,
    question: 'Explain the difference between a prejudice and a stereotype, giving an example of '
            + 'each from school life.',
    modelAnswer:
      'A prejudice is judging someone before you know anything about them, such as deciding a '
      + 'new classmate is unfriendly because of where they come from. A stereotype fixes a whole '
      + 'group into one image, such as saying all boys are noisy. Both are unfair because they '
      + 'ignore what a person is actually like.',
    keyPoints: [
      { id: 'prejudice', label: 'A prejudice is judging in advance, without knowing the person',
        accept: [['before know'], ['without know'], ['judge'], ['opinion'], ['decide'], ['in advance'], ['first']] },
      { id: 'stereotype', label: 'A stereotype fixes a whole group into one fixed image',
        accept: [['whole group'], ['all of them'], ['everyone'], ['fixed image'], ['same way'], ['every'], ['all boy'], ['all girl']] },
      { id: 'unfair', label: 'Both are unfair — they ignore what the person is really like',
        accept: [['unfair'], ['wrong'], ['not true'], ['hurt'], ['ignore'], ['real'], ['actually'], ['individual']] },
    ],
  },
  {
    topic: 'prejudice-and-stereotypes', topicLabel: 'Prejudice & Stereotypes', chapter: DIV,
    question: 'A teacher always picks the same few pupils to answer questions and never the '
            + 'quiet ones. Explain what harm this can do over time.',
    modelAnswer:
      'The pupils never chosen begin to believe they are not clever, and they lose confidence. '
      + 'They stop trying, so they really do fall behind, and the belief comes true. The class '
      + 'also learns to treat them as less able, which is unfair to them.',
    keyPoints: [
      { id: 'confidence', label: 'Those left out lose confidence and believe they are less able',
        accept: [['confiden'], ['believe'], ['feel'], ['self'], ['think they are'], ['discourag'], ['sad'], ['inferior']] },
      { id: 'self-fulfilling', label: 'They stop trying, so they really do fall behind',
        accept: [['stop try'], ['give up'], ['fall behind'], ['not learn'], ['worse'], ['come true'], ['really become'], ['effort']] },
      { id: 'others-copy', label: 'The rest of the class starts treating them as less able too',
        accept: [['other'], ['class'], ['friend'], ['treat'], ['tease'], ['classmate'], ['unfair']] },
    ],
  },

  // ── Forms of Discrimination ───────────────────────────────────────────
  {
    topic: 'forms-of-discrimination', topicLabel: 'Forms of Discrimination', chapter: DIV,
    question: 'Name three grounds on which people in India have been treated unequally, and give '
            + 'an example of one of them.',
    modelAnswer:
      'People have been treated unequally because of caste, with some barred from temples and '
      + 'wells. It has happened on grounds of religion, and on grounds of sex, when girls are '
      + 'kept from school. Disability and poverty are further grounds on which people are '
      + 'shut out.',
    keyPoints: [
      { id: 'caste', label: 'Caste — barred from temples, wells or seating',
        accept: [['caste'], ['dalit'], ['untouch'], ['temple'], ['well']] },
      { id: 'religion-or-sex', label: 'Religion, or sex — girls kept from school',
        accept: [['religion'], ['muslim'], ['hindu'], ['christian'], ['girl'], ['woman'], ['gender'], ['female']] },
      { id: 'disability-poverty', label: 'Disability, poverty or language are further grounds',
        accept: [['disab'], ['handicap'], ['poor'], ['poverty'], ['money'], ['language'], ['tribal'], ['wheelchair']] },
    ],
  },
  {
    topic: 'forms-of-discrimination', topicLabel: 'Forms of Discrimination', chapter: DIV,
    question: 'A village keeps two sets of drinking glasses at the tea stall, one for certain '
            + 'families. Explain what is wrong with this and what the law says.',
    modelAnswer:
      'It is untouchability, which treats some people as impure because of the family they were '
      + 'born into. It insults their dignity and denies them equal treatment in a public place. '
      + 'The Constitution abolished untouchability, so the practice is a punishable offence.',
    keyPoints: [
      { id: 'untouchability', label: 'It is untouchability, based on birth',
        accept: [['untouch'], ['caste'], ['birth'], ['dalit'], ['impure'], ['born']] },
      { id: 'dignity', label: 'It insults their dignity and denies equal treatment',
        accept: [['dignit'], ['insult'], ['equal'], ['respect'], ['humiliat'], ['unfair'], ['shame']] },
      { id: 'illegal', label: 'The Constitution abolished it — it is a punishable offence',
        accept: [['constitution'], ['abolish'], ['illegal'], ['crime'], ['punish'], ['offence'], ['against the law'], ['banned']] },
    ],
  },

  // ── Gender Stereotypes ────────────────────────────────────────────────
  {
    topic: 'gender-stereotypes', topicLabel: 'Gender Stereotypes', chapter: DIV,
    question: '"Boys do not cry." Explain what is wrong with saying this to a child, and what '
            + 'harm it does as they grow.',
    modelAnswer:
      'Everyone feels sadness and pain, so it is simply untrue. It teaches a boy to hide what he '
      + 'feels instead of speaking about it, and hidden feelings build up. As a man he may find '
      + 'it hard to ask for help when he is struggling.',
    keyPoints: [
      { id: 'untrue', label: 'It is untrue — everyone feels sadness and pain',
        accept: [['everyone'], ['all people'], ['human'], ['natural'], ['not true'], ['same feeling'], ['emotion']] },
      { id: 'hides-feelings', label: 'It teaches him to hide feelings instead of speaking',
        accept: [['hide'], ['keep inside'], ['suppress'], ['not speak'], ['bottle'], ['pretend'], ['silent']] },
      { id: 'later-harm', label: 'Later he may not ask for help when struggling',
        accept: [['help'], ['support'], ['alone'], ['mental'], ['depress'], ['stress'], ['problem'], ['talk']] },
    ],
  },
  {
    topic: 'gender-stereotypes', topicLabel: 'Gender Stereotypes', chapter: DIV,
    question: 'A family sends its son for tuition but keeps its daughter at home to help with '
            + 'housework. Explain three ways this affects her whole life.',
    modelAnswer:
      'She falls behind in her studies and may leave school altogether. Without qualifications '
      + 'she cannot take up work that pays well, so she stays dependent on others for money. '
      + 'Having no earnings of her own also leaves her with little say in decisions about her '
      + 'own life.',
    keyPoints: [
      { id: 'education-lost', label: 'She falls behind and may leave school',
        accept: [['school'], ['study'], ['educat'], ['drop out'], ['dropout'], ['behind'], ['read'], ['learn']] },
      { id: 'work-lost', label: 'Without qualifications she cannot get well-paid work',
        accept: [['job'], ['work'], ['earn'], ['salary'], ['career'], ['employ'], ['income'], ['pay']] },
      { id: 'dependence', label: 'She stays dependent and has little say in her own life',
        accept: [['depend'], ['no say'], ['decision'], ['choice'], ['freedom'], ['control'], ['power'], ['marriage']] },
    ],
  },

  // ── Valuing the Girl Child ────────────────────────────────────────────
  {
    topic: 'valuing-the-girl-child', topicLabel: 'Valuing the Girl Child', chapter: DIV,
    question: 'In some districts far fewer girls are born than boys. Explain what causes this and '
            + 'what trouble it stores up for society.',
    modelAnswer:
      'Families that treat a daughter as a burden abort unborn girls, which is female foeticide. '
      + 'It is illegal, and finding out the sex of an unborn child before birth is banned. Over '
      + 'time it leaves far too few women, which unbalances society and makes life still harder '
      + 'for them.',
    keyPoints: [
      { id: 'cause', label: 'Girls are seen as a burden, leading to female foeticide',
        accept: [['foetic'], ['fetic'], ['abort'], ['burden'], ['dowry'], ['unwanted'], ['kill'], ['before birth']] },
      { id: 'illegal', label: 'It is illegal, and sex determination before birth is banned',
        accept: [['illegal'], ['ban'], ['crime'], ['law'], ['punish'], ['offence'], ['not allowed'], ['scan'], ['test']] },
      { id: 'consequence', label: 'It leaves too few women and unbalances society',
        accept: [['less women'], ['ratio'], ['balance'], ['population'], ['shortage'], ['imbalance'], ['unmarried'], ['too few']] },
    ],
  },
  {
    topic: 'valuing-the-girl-child', topicLabel: 'Valuing the Girl Child', chapter: DIV,
    question: 'Give three things a country can do so that daughters are valued as much as sons.',
    modelAnswer:
      'It can make schooling free and safe for girls so that every one of them studies. It can '
      + 'enforce laws against dowry and against testing the sex of an unborn child. It can also '
      + 'run campaigns that show women succeeding, so families see a daughter as a source of '
      + 'pride rather than a cost.',
    keyPoints: [
      { id: 'education', label: 'Make schooling free, safe and available to every girl',
        accept: [['school'], ['educat'], ['study'], ['free'], ['scholarship'], ['toilet'], ['cycle'], ['learn']] },
      { id: 'enforce-laws', label: 'Enforce laws against dowry and sex determination',
        accept: [['law'], ['dowry'], ['ban'], ['punish'], ['illegal'], ['strict'], ['enforce'], ['police']] },
      { id: 'change-attitudes', label: 'Campaigns showing women succeeding change attitudes',
        accept: [['campaign'], ['advertis'], ['awareness'], ['attitude'], ['think'], ['example'], ['role model'], ['pride'], ['respect']] },
    ],
  },

  // ── Women Who Broke Through ───────────────────────────────────────────
  {
    topic: 'women-who-led', topicLabel: 'Women Who Broke Through', chapter: DIV,
    question: 'Name two Indian women who reached the very top in their field, saying what each is '
            + 'known for and what their example proves.',
    modelAnswer:
      'Kalpana Chawla became an astronaut and flew into space, the first woman of Indian origin '
      + 'to do so. Saina Nehwal reached the top of world badminton, and Indra Nooyi led one of '
      + 'the largest companies in the world. Their lives prove that ability has nothing to do '
      + 'with being a man or a woman.',
    keyPoints: [
      { id: 'name-one', label: 'Kalpana Chawla — astronaut, flew into space',
        accept: [['kalpana'], ['chawla'], ['astronaut'], ['space'], ['nasa'], ['shuttle']] },
      { id: 'name-two', label: 'Saina Nehwal, Indra Nooyi, Dipa Karmakar or similar',
        accept: [['saina'], ['nehwal'], ['badminton'], ['indra'], ['nooyi'], ['pepsi'], ['dipa'], ['karmakar'], ['gymnast'], ['sindhu'], ['mary kom']] },
      { id: 'what-it-proves', label: 'Ability has nothing to do with being a man or a woman',
        accept: [['ability'], ['anything'], ['equal'], ['capable'], ['can do'], ['talent'], ['nothing to do'], ['no differ']] },
    ],
  },
  {
    topic: 'women-who-led', topicLabel: 'Women Who Broke Through', chapter: DIV,
    question: 'Explain why it matters for a young person to see somebody like themselves '
            + 'succeeding at something difficult.',
    modelAnswer:
      'It shows them the thing is actually possible, instead of something only other kinds of '
      + 'people do. It gives them the confidence to try, and someone to model themselves on. It '
      + 'also changes the minds of families and teachers, who then encourage them instead of '
      + 'holding them back.',
    keyPoints: [
      { id: 'possible', label: 'It shows the thing is genuinely possible for them',
        accept: [['possible'], ['can be done'], ['achiev'], ['realis'], ['realiz'], ['not only'], ['proof'], ['imagine']] },
      { id: 'confidence', label: 'It gives confidence and someone to model themselves on',
        accept: [['confiden'], ['role model'], ['inspir'], ['motivat'], ['follow'], ['courage'], ['believe'], ['try']] },
      { id: 'changes-others', label: 'It changes what families and teachers expect of them',
        accept: [['family'], ['parent'], ['teacher'], ['society'], ['encourag'], ['support'], ['expect'], ['allow']] },
    ],
  },

  // ── Dr Ambedkar & the Fight Against Caste ─────────────────────────────
  {
    topic: 'ambedkar', topicLabel: 'Dr Ambedkar & the Fight Against Caste', chapter: DIV,
    question: 'Describe what Dr B. R. Ambedkar faced as a schoolboy, and what he went on to '
            + 'achieve for the country.',
    modelAnswer:
      'As a boy he was made to sit apart on a sack outside the classroom and was not allowed to '
      + 'drink from the common water pot. He studied abroad and became one of the most learned '
      + 'people of his time. He chaired the drafting committee of the Constitution and made sure '
      + 'it abolished untouchability and guaranteed equality.',
    keyPoints: [
      { id: 'childhood', label: 'Made to sit apart, refused water from the common pot',
        accept: [['sit'], ['sack'], ['outside'], ['apart'], ['water'], ['tap'], ['separate'], ['not allowed'], ['corner']] },
      { id: 'education', label: 'He studied abroad and became highly learned',
        accept: [['abroad'], ['america'], ['london'], ['columbia'], ['degree'], ['study'], ['educat'], ['doctor'], ['learn']] },
      { id: 'constitution', label: 'He led the drafting of the Constitution and ended untouchability',
        accept: [['constitution'], ['draft'], ['untouch'], ['equal'], ['law'], ['right'], ['architect'], ['committee']] },
    ],
  },
  {
    topic: 'ambedkar', topicLabel: 'Dr Ambedkar & the Fight Against Caste', chapter: DIV,
    question: 'Dr Ambedkar said that political freedom alone was not enough for India. Explain '
            + 'what he meant.',
    modelAnswer:
      'Freedom from British rule ended foreign control, but it did not end the unfair treatment '
      + 'of people at home. Millions were still kept out of temples, schools and wells because '
      + 'of the caste they were born into. He argued that real freedom needed social and economic '
      + 'equality as well, not just the right to vote.',
    keyPoints: [
      { id: 'foreign-rule-ended', label: 'Ending British rule removed foreign control only',
        accept: [['british'], ['foreign'], ['independen'], ['ruler'], ['1947'], ['colonial'], ['outside']] },
      { id: 'inequality-remained', label: 'Unfair treatment by caste continued inside the country',
        accept: [['caste'], ['untouch'], ['temple'], ['unfair'], ['inequal'], ['discriminat'], ['still'], ['dalit']] },
      { id: 'social-economic', label: 'Real freedom needs social and economic equality too',
        accept: [['social'], ['economic'], ['equal'], ['money'], ['land'], ['job'], ['dignit'], ['not just vote']] },
    ],
  },

  // ── The Constitution & Equality ───────────────────────────────────────
  {
    topic: 'constitution-and-equality', topicLabel: 'The Constitution & Equality', chapter: DIV,
    question: 'Explain what the Right to Equality guarantees an Indian citizen, and give two '
            + 'examples of what it forbids.',
    modelAnswer:
      'It guarantees that everybody is equal before the law and gets its equal protection. The '
      + 'state may not treat a person differently because of religion, caste, sex, race or place '
      + 'of birth. It forbids untouchability and forbids barring anyone from shops, wells, roads '
      + 'or public places.',
    keyPoints: [
      { id: 'equal-before-law', label: 'Everyone is equal before the law and equally protected by it',
        accept: [['before the law'], ['same law'], ['equal protection'], ['all citizen'], ['everybody'], ['no one above']] },
      { id: 'no-grounds', label: 'No different treatment by religion, caste, sex, race or birthplace',
        accept: [['religion'], ['caste'], ['sex'], ['race'], ['birth'], ['gender'], ['ground']] },
      { id: 'forbids', label: 'It forbids untouchability and barring people from public places',
        accept: [['untouch'], ['public place'], ['shop'], ['well'], ['road'], ['temple'], ['tank'], ['access']] },
    ],
  },
  {
    topic: 'constitution-and-equality', topicLabel: 'The Constitution & Equality', chapter: DIV,
    question: 'If everyone is to be treated the same, explain why the government still reserves '
            + 'seats in colleges for certain communities.',
    modelAnswer:
      'Some communities were held back for centuries and start from far behind everybody else. '
      + 'Treating unequal starting points identically would simply keep them behind for ever. '
      + 'Reservation is meant to help them catch up, so that equality becomes real and not just '
      + 'a promise on paper.',
    keyPoints: [
      { id: 'historical-disadvantage', label: 'Some communities were held back for centuries',
        accept: [['centur'], ['history'], ['past'], ['long time'], ['denied'], ['oppress'], ['behind'], ['generation'], ['caste']] },
      { id: 'same-is-not-fair', label: 'Treating unequal starting points identically keeps them behind',
        accept: [['start'], ['not fair'], ['unequal'], ['level'], ['chance'], ['opportunit'], ['head start'], ['race']] },
      { id: 'catch-up', label: 'It helps them catch up so equality becomes real',
        accept: [['catch up'], ['help'], ['support'], ['uplift'], ['real'], ['practice'], ['actual'], ['bring up']] },
    ],
  },

  // ── Transgender Rights ────────────────────────────────────────────────
  {
    topic: 'transgender-rights', topicLabel: 'Transgender Rights', chapter: DIV,
    question: 'In April 2014 the Supreme Court gave an important judgement about a group long '
            + 'pushed to the margins. Describe what it decided and why it mattered.',
    modelAnswer:
      'The Supreme Court recognised transgender people as a third gender in the NALSA judgement. '
      + 'It held that they have the same fundamental rights as anyone else, including the right '
      + 'to decide their own gender. It also directed that they be treated as socially and '
      + 'educationally backward so they get help in education and jobs.',
    keyPoints: [
      { id: 'third-gender', label: 'Transgender people were recognised as a third gender',
        accept: [['third gender'], ['transgender'], ['nalsa'], ['recognis'], ['recogniz'], ['identity']] },
      { id: 'equal-rights', label: 'They hold the same fundamental rights, including self-identification',
        accept: [['fundamental'], ['same right'], ['equal'], ['own gender'], ['dignit'], ['choose'], ['identify']] },
      { id: 'support', label: 'They were to get help in education and employment',
        accept: [['educat'], ['job'], ['employ'], ['reserv'], ['backward'], ['welfare'], ['support'], ['quota']] },
    ],
  },
  {
    topic: 'transgender-rights', topicLabel: 'Transgender Rights', chapter: DIV,
    question: 'Describe three difficulties transgender people have faced in ordinary daily life '
            + 'in India.',
    modelAnswer:
      'They have often been thrown out by their own families and left with nowhere to live. '
      + 'Schools and employers have refused them, so many were forced into begging to survive. '
      + 'They have also faced abuse in public and been denied proper treatment at hospitals.',
    keyPoints: [
      { id: 'family-rejection', label: 'Rejected by family and left without a home',
        accept: [['family'], ['home'], ['parent'], ['thrown'], ['disown'], ['reject'], ['house'], ['abandon']] },
      { id: 'school-work', label: 'Refused by schools and employers, pushed into begging',
        accept: [['school'], ['job'], ['work'], ['employ'], ['beg'], ['educat'], ['refus'], ['income']] },
      { id: 'abuse-health', label: 'Abused in public and denied proper healthcare',
        accept: [['abuse'], ['harass'], ['tease'], ['violence'], ['hospital'], ['doctor'], ['health'], ['insult'], ['bully']] },
    ],
  },

  // ── Nazi Germany & the Jews ───────────────────────────────────────────
  {
    topic: 'nazi-germany', topicLabel: 'Nazi Germany & the Jews', chapter: DIV,
    question: 'Describe how Jewish people were treated in Germany under Hitler, and what this '
            + 'shows about where prejudice can lead.',
    modelAnswer:
      'They were stripped of citizenship and their rights, banned from many jobs and schools, '
      + 'and made to wear a yellow star so they could be picked out. They were forced into '
      + 'ghettos and then into concentration camps, where about six million were murdered in the '
      + 'Holocaust. It shows that prejudice left unchallenged can end in mass killing.',
    keyPoints: [
      { id: 'rights-removed', label: 'Citizenship, jobs and schooling were taken away; marked out by a star',
        accept: [['citizen'], ['right'], ['job'], ['school'], ['star'], ['badge'], ['mark'], ['ban'], ['shop']] },
      { id: 'camps', label: 'Forced into ghettos and concentration camps',
        accept: [['ghetto'], ['camp'], ['concentration'], ['auschwitz'], ['deport'], ['train'], ['prison']] },
      { id: 'scale-and-lesson', label: 'About six million died; prejudice unchallenged ends in killing',
        accept: [['six million'], ['million'], ['holocaust'], ['murder'], ['kill'], ['genocide'], ['death'], ['lesson'], ['danger']] },
    ],
  },
  {
    topic: 'nazi-germany', topicLabel: 'Nazi Germany & the Jews', chapter: DIV,
    question: 'Explain how ordinary Germans came to accept such cruelty, and what that teaches '
            + 'about staying silent.',
    modelAnswer:
      'The government controlled newspapers, radio and schools, and repeated for years that one '
      + 'group was to blame for everything wrong. Children were taught it from a young age, so it '
      + 'seemed normal. Anyone who objected was punished, so most people stayed quiet — and '
      + 'silence let the cruelty grow.',
    keyPoints: [
      { id: 'propaganda', label: 'Newspapers, radio and schools repeated the blame for years',
        accept: [['propaganda'], ['newspaper'], ['radio'], ['media'], ['blame'], ['repeat'], ['control'], ['lie'], ['film']] },
      { id: 'children-taught', label: 'Children were taught it young, so it seemed normal',
        accept: [['child'], ['school'], ['young'], ['taught'], ['normal'], ['textbook'], ['youth'], ['grew up']] },
      { id: 'fear-silence', label: 'Objectors were punished, so people stayed silent and it grew',
        accept: [['fear'], ['punish'], ['afraid'], ['quiet'], ['arrest'], ['scared'], ['object'], ['danger'], ['risk']] },
    ],
  },

  // ── Segregation & Civil Rights in America ─────────────────────────────
  {
    topic: 'african-american-rights', topicLabel: 'Segregation & Civil Rights in America', chapter: DIV,
    question: 'Explain what segregation meant in America, and describe one act of protest against '
            + 'it.',
    modelAnswer:
      'Segregation kept black and white people apart by law, with separate schools, buses, parks '
      + 'and drinking fountains, and the ones for black people were far worse. Rosa Parks refused '
      + 'to give up her bus seat to a white passenger and was arrested. That began the Montgomery '
      + 'bus boycott, which lasted over a year until the law was struck down.',
    keyPoints: [
      { id: 'kept-apart', label: 'People were kept apart by law — separate schools, buses, parks',
        accept: [['separate'], ['apart'], ['school'], ['bus'], ['park'], ['fountain'], ['restaurant'], ['divide'], ['different']] },
      { id: 'unequal', label: 'What black people were given was far worse',
        accept: [['worse'], ['poor'], ['unequal'], ['bad'], ['inferior'], ['not same'], ['back']] },
      { id: 'protest', label: 'Rosa Parks and the Montgomery bus boycott, or Martin Luther King',
        accept: [['rosa'], ['parks'], ['boycott'], ['montgomery'], ['martin luther'], ['king'], ['march'], ['refus'], ['seat'], ['arrest']] },
    ],
  },
  {
    topic: 'african-american-rights', topicLabel: 'Segregation & Civil Rights in America', chapter: DIV,
    question: 'A boycott simply means refusing to buy or use something. Explain why it can be '
            + 'such a powerful weapon for people with no other power.',
    modelAnswer:
      'It costs the other side money, and losing income forces them to listen when nothing else '
      + 'would. It needs no weapons and no wealth, only that ordinary people agree to act '
      + 'together. It also draws the attention of newspapers and the wider public, so the '
      + 'unfairness becomes impossible to ignore.',
    keyPoints: [
      { id: 'economic-pressure', label: 'It costs the other side money, which forces them to listen',
        accept: [['money'], ['loss'], ['income'], ['business'], ['profit'], ['economic'], ['pressure'], ['pay']] },
      { id: 'needs-no-power', label: 'It needs no weapons or wealth, only people acting together',
        accept: [['together'], ['unity'], ['peaceful'], ['nonviolen'], ['non violen'], ['no weapon'], ['everyone'], ['join'], ['unite']] },
      { id: 'attention', label: 'It draws public and newspaper attention to the unfairness',
        accept: [['attention'], ['newspaper'], ['media'], ['public'], ['notice'], ['world'], ['news'], ['support']] },
    ],
  },

  // ── What Is Government ────────────────────────────────────────────────
  {
    topic: 'what-is-government', topicLabel: 'What Is Government', chapter: GOV,
    question: 'Imagine a town where nobody makes or enforces any rules. Describe what would go '
            + 'wrong, and what that tells you about why we have a government.',
    modelAnswer:
      'Traffic would be chaos with nobody deciding which side to drive on, and disputes would be '
      + 'settled by whoever was strongest. Nobody would build roads, run hospitals or supply '
      + 'water, since no one person can afford to. A government exists to make rules, to settle '
      + 'quarrels fairly and to provide what no individual can provide alone.',
    keyPoints: [
      { id: 'disorder', label: 'Disorder — traffic chaos, the strongest getting their way',
        accept: [['chaos'], ['traffic'], ['fight'], ['strong'], ['confusion'], ['accident'], ['crime'], ['disorder'], ['quarrel']] },
      { id: 'no-services', label: 'Nobody would build roads, hospitals or supply water',
        accept: [['road'], ['hospital'], ['water'], ['school'], ['electric'], ['service'], ['build'], ['police']] },
      { id: 'purpose', label: 'Government makes rules, settles disputes and provides for all',
        accept: [['law'], ['settle'], ['dispute'], ['decide'], ['provide'], ['protect'], ['order'], ['justice'], ['authority']] },
    ],
  },
  {
    topic: 'what-is-government', topicLabel: 'What Is Government', chapter: GOV,
    question: 'Explain what it means to say a government has authority, and where that authority '
            + 'comes from in a democracy.',
    modelAnswer:
      'Authority means its decisions bind everybody, and people can be punished for breaking '
      + 'them. In a democracy that power comes from the people themselves, who choose their '
      + 'representatives by voting. Because it is given by the people it can also be taken back '
      + 'at the next election.',
    keyPoints: [
      { id: 'binding', label: 'Its decisions bind everyone, and breaking them is punished',
        accept: [['everyone must'], ['bind'], ['obey'], ['follow'], ['punish'], ['force'], ['compulsor'], ['all citizen']] },
      { id: 'from-people', label: 'In a democracy the power comes from the people, through voting',
        accept: [['people'], ['vote'], ['elect'], ['citizen'], ['public'], ['choose'], ['represent']] },
      { id: 'can-be-removed', label: 'What the people give they can take back at an election',
        accept: [['take back'], ['remove'], ['next election'], ['change'], ['vote out'], ['five year'], ['again']] },
    ],
  },

  // ── Functions of Government ───────────────────────────────────────────
  {
    topic: 'functions-of-government', topicLabel: 'Functions of Government', chapter: GOV,
    question: 'Describe three quite different kinds of work a government does for its people, '
            + 'with an example of each.',
    modelAnswer:
      'It keeps order and protects the country, through the police and the armed forces. It '
      + 'provides services nobody could provide alone, such as roads, schools, hospitals and '
      + 'water supply. It also settles disputes through the courts and looks after those in '
      + 'need, with pensions and relief after a flood.',
    keyPoints: [
      { id: 'order-defence', label: 'Keeping order and defending the country — police and army',
        accept: [['police'], ['army'], ['defen'], ['border'], ['order'], ['crime'], ['protect'], ['soldier'], ['safety']] },
      { id: 'services', label: 'Providing roads, schools, hospitals and water',
        accept: [['road'], ['school'], ['hospital'], ['water'], ['electric'], ['transport'], ['service'], ['bridge']] },
      { id: 'justice-welfare', label: 'Settling disputes through courts, and helping those in need',
        accept: [['court'], ['justice'], ['dispute'], ['judge'], ['pension'], ['ration'], ['flood'], ['relief'], ['poor'], ['welfare']] },
    ],
  },
  {
    topic: 'functions-of-government', topicLabel: 'Functions of Government', chapter: GOV,
    question: 'Where does a government get the money for all it does, and why must it account '
            + 'for how that money is spent?',
    modelAnswer:
      'Most of it comes from taxes paid by citizens and businesses, along with fees and earnings '
      + 'from state undertakings. Because it is the public’s money, the public has a right to '
      + 'know where it went. Accounts are checked and placed before the legislature, which is '
      + 'how waste and corruption are caught.',
    keyPoints: [
      { id: 'taxes', label: 'Mainly taxes from citizens and businesses',
        accept: [['tax'], ['gst'], ['income'], ['duty'], ['fee'], ['citizen pay'], ['people pay'], ['revenue']] },
      { id: 'public-money', label: 'It is the public’s money, so the public may ask where it went',
        accept: [['public money'], ['our money'], ['people money'], ['belong'], ['right to know'], ['transparen'], ['answerable']] },
      { id: 'checked', label: 'Accounts are checked and placed before the legislature',
        accept: [['check'], ['audit'], ['parliament'], ['assembly'], ['legislature'], ['corrupt'], ['waste'], ['budget'], ['report']] },
    ],
  },

  // ── Levels of Government ──────────────────────────────────────────────
  {
    topic: 'levels-of-government', topicLabel: 'Levels of Government', chapter: GOV,
    question: 'Explain why a country as large as India does not run everything from one office in '
            + 'the capital.',
    modelAnswer:
      'The country is far too large and varied for one office to know what every place needs. '
      + 'A broken street light or a blocked drain is best handled by people living there. '
      + 'Splitting the work into levels also brings decisions closer to ordinary people, so they '
      + 'can be heard.',
    keyPoints: [
      { id: 'too-large', label: 'The country is too large and varied for one office',
        accept: [['too large'], ['big'], ['vast'], ['huge'], ['many state'], ['differ'], ['varied'], ['population']] },
      { id: 'local-knows', label: 'Local problems are best handled by people living there',
        accept: [['local'], ['village'], ['street'], ['drain'], ['near'], ['know'], ['small problem'], ['own area']] },
      { id: 'closer-to-people', label: 'It brings decisions closer to ordinary people',
        accept: [['closer'], ['reach'], ['heard'], ['participat'], ['contact'], ['quick'], ['easy'], ['voice']] },
    ],
  },
  {
    topic: 'levels-of-government', topicLabel: 'Levels of Government', chapter: GOV,
    question: 'A street light near your home has been out for weeks. Say who you would approach '
            + 'and why, rather than writing to the Prime Minister.',
    modelAnswer:
      'The right body is the local one — the panchayat in a village or the municipality in a '
      + 'town. Street lighting is exactly the kind of small local matter it exists to handle, and '
      + 'its office is close by. The Prime Minister deals with the whole country and could not '
      + 'possibly attend to one lamp.',
    keyPoints: [
      { id: 'local-body', label: 'The panchayat or municipality — the local body',
        accept: [['panchayat'], ['municipal'], ['corporation'], ['ward'], ['sarpanch'], ['councillor'], ['local body'], ['nagar']] },
      { id: 'its-job', label: 'Street lighting is exactly its work, and its office is close by',
        accept: [['their work'], ['their job'], ['duty'], ['responsib'], ['look after'], ['nearby'], ['close'], ['small matter'], ['maintain']] },
      { id: 'national-too-big', label: 'The national level deals with the whole country',
        accept: [['whole country'], ['national'], ['big matter'], ['defence'], ['too busy'], ['every'], ['crore'], ['important']] },
    ],
  },

  // ── Levels of Government in India ─────────────────────────────────────
  {
    topic: 'government-in-india', topicLabel: 'Levels of Government in India', chapter: GOV,
    question: 'Name the three levels at which India is governed and give one matter each one '
            + 'handles.',
    modelAnswer:
      'At the top is the union level in Delhi, which handles defence, foreign affairs and '
      + 'currency. Then comes the state level, with its own assembly, handling police, farming '
      + 'and health. Below that is the local level — panchayats and municipalities — handling '
      + 'water supply, drains and street lighting.',
    keyPoints: [
      { id: 'union', label: 'Union or central level — defence, foreign affairs, currency',
        accept: [['union'], ['central'], ['delhi'], ['defen'], ['foreign'], ['currency'], ['army'], ['nation']] },
      { id: 'state', label: 'State level — police, agriculture, health',
        accept: [['state'], ['assembly'], ['chief minister'], ['police'], ['agricultur'], ['health'], ['mla'], ['capital']] },
      { id: 'local', label: 'Local level — panchayats and municipalities, water, drains, lighting',
        accept: [['panchayat'], ['municipal'], ['local'], ['village'], ['drain'], ['street'], ['corporation'], ['ward']] },
    ],
  },
  {
    topic: 'government-in-india', topicLabel: 'Levels of Government in India', chapter: GOV,
    question: 'Explain what a panchayat is and describe two things it does for a village.',
    modelAnswer:
      'A panchayat is the elected local body of a village, headed by a sarpanch and chosen by '
      + 'the villagers themselves. It looks after drinking water, roads, drains and street '
      + 'lighting. It also keeps records of births and deaths, runs schemes for work, and settles '
      + 'small local disputes.',
    keyPoints: [
      { id: 'elected-local', label: 'An elected local body of the village, headed by a sarpanch',
        accept: [['elect'], ['sarpanch'], ['chosen'], ['member'], ['vote'], ['gram'], ['head'], ['local body']] },
      { id: 'services', label: 'It looks after water, roads, drains and lighting',
        accept: [['water'], ['road'], ['drain'], ['light'], ['clean'], ['sanitat'], ['repair'], ['well']] },
      { id: 'records-schemes', label: 'It keeps records, runs schemes and settles small disputes',
        accept: [['record'], ['birth'], ['death'], ['scheme'], ['employment'], ['dispute'], ['register'], ['ration'], ['certificate']] },
    ],
  },

  // ── Legislature, Executive & Judiciary ────────────────────────────────
  {
    topic: 'organs-of-government', topicLabel: 'Legislature, Executive & Judiciary', chapter: GOV,
    question: 'A government has three organs. Name them and say what each one does.',
    modelAnswer:
      'The legislature makes the laws, and in India that is Parliament and the state assemblies. '
      + 'The executive carries them out, which is the Prime Minister, the ministers and the '
      + 'officials. The judiciary is the courts, which interpret the laws and settle disputes '
      + 'about them.',
    keyPoints: [
      { id: 'legislature', label: 'The legislature makes laws — Parliament and assemblies',
        accept: [['legislat'], ['parliament'], ['assembly'], ['make law'], ['lok sabha'], ['rajya'], ['mla'], ['mp']] },
      { id: 'executive', label: 'The executive carries them out — ministers and officials',
        accept: [['executive'], ['minister'], ['official'], ['carry out'], ['implement'], ['administr'], ['collector'], ['bureaucra']] },
      { id: 'judiciary', label: 'The judiciary interprets laws and settles disputes — the courts',
        accept: [['judic'], ['court'], ['judge'], ['justice'], ['interpret'], ['supreme'], ['high court'], ['case']] },
    ],
  },
  {
    topic: 'organs-of-government', topicLabel: 'Legislature, Executive & Judiciary', chapter: GOV,
    question: 'Explain why the courts are kept separate from the ministers, and what would go '
            + 'wrong if they were not.',
    modelAnswer:
      'Judges must be free to decide against the government itself when it breaks the law. If '
      + 'ministers controlled the judges, no one could ever win a case against those in power. '
      + 'Independence lets the courts protect citizens’ fundamental rights and check any misuse '
      + 'of authority.',
    keyPoints: [
      { id: 'decide-against', label: 'Judges must be free to rule against the government itself',
        accept: [['against the government'], ['against those'], ['free'], ['independen'], ['fear'], ['without pressure'], ['impartial'], ['fair']] },
      { id: 'otherwise-no-justice', label: 'Otherwise nobody could win a case against those in power',
        accept: [['never win'], ['no justice'], ['unfair'], ['favour'], ['favor'], ['powerful'], ['misuse'], ['pressure'], ['influence']] },
      { id: 'protects-rights', label: 'Independence lets the courts protect fundamental rights',
        accept: [['fundamental'], ['right'], ['protect'], ['citizen'], ['constitution'], ['check'], ['balance']] },
    ],
  },

  // ── Monarchy, Dictatorship & Democracy ────────────────────────────────
  {
    topic: 'forms-of-government', topicLabel: 'Monarchy, Dictatorship & Democracy', chapter: GOV,
    question: 'Compare a democracy with a dictatorship in three ways.',
    modelAnswer:
      'In a democracy the people choose their rulers by voting, while a dictator seizes power and '
      + 'is never chosen. A democracy allows criticism, free newspapers and opposition parties, '
      + 'whereas a dictatorship silences and jails those who object. In a democracy the rulers '
      + 'can be removed at the next election; a dictator cannot be removed peacefully.',
    keyPoints: [
      { id: 'how-chosen', label: 'People elect their rulers; a dictator seizes power',
        accept: [['elect'], ['vote'], ['choose'], ['seiz'], ['force'], ['army'], ['not chosen'], ['himself']] },
      { id: 'freedom', label: 'Criticism, free press and opposition are allowed, or crushed',
        accept: [['criticis'], ['newspaper'], ['media'], ['opposition'], ['speech'], ['jail'], ['arrest'], ['silence'], ['freedom']] },
      { id: 'removal', label: 'Rulers can be voted out; a dictator cannot be removed peacefully',
        accept: [['remove'], ['next election'], ['vote out'], ['change'], ['five year'], ['cannot'], ['life'], ['forever']] },
    ],
  },
  {
    topic: 'forms-of-government', topicLabel: 'Monarchy, Dictatorship & Democracy', chapter: GOV,
    question: 'In a monarchy, explain how the ruler comes to hold the position, and describe the '
            + 'difference between an absolute and a constitutional one.',
    modelAnswer:
      'The ruler inherits the throne by birth, passing from parent to child rather than being '
      + 'chosen. In an absolute monarchy that ruler holds all the power and the word is law. In a '
      + 'constitutional monarchy the king or queen is only a ceremonial head, while an elected '
      + 'government actually governs, as in Britain.',
    keyPoints: [
      { id: 'by-birth', label: 'The position is inherited by birth, not chosen',
        accept: [['birth'], ['inherit'], ['father'], ['son'], ['family'], ['throne'], ['royal'], ['born'], ['descend']] },
      { id: 'absolute', label: 'In an absolute one the ruler holds all the power',
        accept: [['all power'], ['whatever'], ['no limit'], ['word is law'], ['complete'], ['total'], ['unlimited'], ['answer to no']] },
      { id: 'constitutional', label: 'In a constitutional one the ruler is ceremonial, elected ministers govern',
        accept: [['ceremon'], ['only a head'], ['symbol'], ['elect'], ['britain'], ['england'], ['uk'], ['no real power'], ['name only']] },
    ],
  },

  // ── The Quest for Universal Adult Franchise ───────────────────────────
  {
    topic: 'universal-adult-franchise', topicLabel: 'The Quest for Universal Adult Franchise', chapter: GOV,
    question: 'Explain what universal adult franchise means, and name two groups who once had to '
            + 'fight for it.',
    modelAnswer:
      'It means every adult citizen may vote, whatever their wealth, sex, caste, religion or '
      + 'education. Once only rich men who owned property were allowed to. Women had to fight '
      + 'for it, as did black people in South Africa and America, and poorer men without land.',
    keyPoints: [
      { id: 'every-adult', label: 'Every adult citizen may vote, on equal terms',
        accept: [['every adult'], ['all adult'], ['everyone'], ['each citizen'], ['one vote'], ['equal'], ['eighteen'], ['18']] },
      { id: 'no-conditions', label: 'Regardless of wealth, sex, caste, religion or education',
        accept: [['rich'], ['poor'], ['property'], ['wealth'], ['man'], ['woman'], ['caste'], ['religion'], ['educat'], ['literate']] },
      { id: 'who-fought', label: 'Women, black people, and men without property had to fight for it',
        accept: [['women'], ['suffrag'], ['black'], ['africa'], ['america'], ['worker'], ['landless'], ['struggle'], ['campaign']] },
    ],
  },
  {
    topic: 'universal-adult-franchise', topicLabel: 'The Quest for Universal Adult Franchise', chapter: GOV,
    question: 'Explain why letting only property owners vote leads to unjust laws.',
    modelAnswer:
      'Rulers listen to the people who can remove them, so they attend only to those who vote. '
      + 'Laws would then favour the wealthy — light taxes on land, little spending on the poor. '
      + 'Those with no vote have no way to be heard, so their needs are simply ignored.',
    keyPoints: [
      { id: 'listen-to-voters', label: 'Rulers attend only to those who can remove them',
        accept: [['listen'], ['attend'], ['care'], ['please'], ['remove'], ['re elect'], ['reelect'], ['only those'], ['ignore']] },
      { id: 'laws-favour-rich', label: 'Laws would favour the wealthy over everyone else',
        accept: [['favour'], ['favor'], ['rich'], ['wealth'], ['tax'], ['land'], ['benefit'], ['advantage'], ['their own']] },
      { id: 'voiceless', label: 'Those without a vote have no way to be heard',
        accept: [['no voice'], ['not heard'], ['ignore'], ['poor'], ['need'], ['cannot'], ['helpless'], ['no say']] },
    ],
  },

  // ── Universal Adult Franchise in India ────────────────────────────────
  {
    topic: 'franchise-in-india', topicLabel: 'Universal Adult Franchise in India', chapter: GOV,
    question: 'India gave every adult the vote from its very first election, which surprised the '
            + 'world. Explain why that was remarkable.',
    modelAnswer:
      'Most of the population could not read or write, and other countries had assumed voting '
      + 'required education and wealth. Britain and America had taken over a century to widen the '
      + 'vote step by step, and women there had won it only recently. India granted it to '
      + 'everyone at once in 1950, treating the vote as a right rather than a reward.',
    keyPoints: [
      { id: 'poor-and-illiterate', label: 'Most people could not read or write, and were poor',
        accept: [['read'], ['write'], ['illiterat'], ['educat'], ['poor'], ['literacy'], ['school']] },
      { id: 'others-took-longer', label: 'Other countries had widened the vote slowly over a century',
        accept: [['britain'], ['england'], ['america'], ['other countr'], ['slow'], ['centur'], ['step'], ['gradual'], ['long time'], ['year']] },
      { id: 'right-not-reward', label: 'India granted it to all at once, as a right',
        accept: [['at once'], ['immediat'], ['right'], ['1950'], ['1951'], ['everyone'], ['straight away'], ['beginning'], ['all together']] },
    ],
  },
  {
    topic: 'franchise-in-india', topicLabel: 'Universal Adult Franchise in India', chapter: GOV,
    question: 'Describe two arrangements that let an Indian who cannot read still cast their vote '
            + 'properly.',
    modelAnswer:
      'Every candidate is given a picture symbol, such as a hand or a lamp, which appears beside '
      + 'the name on the machine. Voters therefore recognise their choice without reading a word. '
      + 'Polling staff explain the machine, the ballot is secret, and an indelible ink mark '
      + 'prevents anyone voting twice.',
    keyPoints: [
      { id: 'symbols', label: 'Each candidate has a picture symbol on the machine',
        accept: [['symbol'], ['picture'], ['sign'], ['hand'], ['lamp'], ['image'], ['photo'], ['mark of party']] },
      { id: 'no-reading-needed', label: 'So voters recognise their choice without reading',
        accept: [['without read'], ['recognis'], ['recogniz'], ['identify'], ['see'], ['know'], ['illiterat'], ['understand']] },
      { id: 'other-help', label: 'Staff explain it, the ballot is secret, ink prevents voting twice',
        accept: [['staff'], ['officer'], ['explain'], ['help'], ['secret'], ['ink'], ['finger'], ['twice'], ['machine'], ['evm']] },
    ],
  },

  // ── The Suffragette Movement ──────────────────────────────────────────
  {
    topic: 'suffragette-movement', topicLabel: 'The Suffragette Movement', chapter: GOV,
    question: 'Describe how women in Britain won the vote, and what they had to endure.',
    modelAnswer:
      'Women campaigned for decades with petitions, meetings and marches, and were ignored. '
      + 'The suffragettes then took to breaking windows and chaining themselves to railings, and '
      + 'many were jailed and force-fed when they went on hunger strike. Their work, and the jobs '
      + 'women did during the First World War, finally won them the vote.',
    keyPoints: [
      { id: 'peaceful-first', label: 'Decades of petitions, meetings and marches, all ignored',
        accept: [['petition'], ['meeting'], ['march'], ['peaceful'], ['ignor'], ['decade'], ['year'], ['ask'], ['campaign']] },
      { id: 'militant', label: 'Then windows broken, chaining to railings — and jail',
        accept: [['window'], ['chain'], ['railing'], ['jail'], ['prison'], ['arrest'], ['hunger'], ['force fed'], ['protest']] },
      { id: 'won-it', label: 'Their work and wartime jobs finally won them the vote',
        accept: [['war'], ['factor'], ['job'], ['work'], ['1918'], ['1928'], ['finally'], ['granted'], ['succeed'], ['achiev']] },
    ],
  },
  {
    topic: 'suffragette-movement', topicLabel: 'The Suffragette Movement', chapter: GOV,
    question: 'What arguments were used against letting women vote, and why were they wrong?',
    modelAnswer:
      'It was claimed that women were not intelligent enough to understand politics, which was '
      + 'simply false and rested on their being kept out of schools. It was said their place was '
      + 'the home and their husbands would decide for them, which denied them a mind of their '
      + 'own. Every country that gave women the vote showed the fears to be groundless.',
    keyPoints: [
      { id: 'not-clever', label: 'The claim that they were not intelligent enough',
        accept: [['intellig'], ['clever'], ['understand'], ['brain'], ['foolish'], ['weak'], ['emotional'], ['politics']] },
      { id: 'place-at-home', label: 'The claim that their place was the home, husbands deciding',
        accept: [['home'], ['house'], ['husband'], ['famil'], ['child'], ['kitchen'], ['duty'], ['decide for']] },
      { id: 'proved-wrong', label: 'Both were false — kept from school, and later disproved everywhere',
        accept: [['school'], ['educat'], ['not allowed'], ['false'], ['proved'], ['same'], ['equal'], ['showed'], ['untrue']] },
    ],
  },

  // ── The Anti-Apartheid Movement ───────────────────────────────────────
  {
    topic: 'anti-apartheid', topicLabel: 'The Anti-Apartheid Movement', chapter: GOV,
    question: 'Explain what apartheid was in South Africa and how it finally ended.',
    modelAnswer:
      'Apartheid was a system of laws that separated people by race and gave power only to the '
      + 'white minority. Black South Africans were forced into poor areas, needed passes to '
      + 'travel and could not vote. After decades of protest, Nelson Mandela’s long imprisonment '
      + 'and pressure from other countries, it ended and he became president in 1994.',
    keyPoints: [
      { id: 'separation-by-race', label: 'Laws separated people by race; power lay with the white minority',
        accept: [['race'], ['white'], ['black'], ['separat'], ['law'], ['colour'], ['color'], ['minority'], ['divide']] },
      { id: 'what-it-did', label: 'Black people were confined to poor areas, needed passes, could not vote',
        accept: [['pass'], ['area'], ['township'], ['vote'], ['land'], ['job'], ['school'], ['travel'], ['poor']] },
      { id: 'how-it-ended', label: 'Protest, Mandela and outside pressure ended it; he became president',
        accept: [['mandela'], ['president'], ['1994'], ['protest'], ['boycott'], ['sanction'], ['pressure'], ['free'], ['elect']] },
    ],
  },
  {
    topic: 'anti-apartheid', topicLabel: 'The Anti-Apartheid Movement', chapter: GOV,
    question: 'Nelson Mandela spent twenty-seven years in prison, yet urged forgiveness on his '
            + 'release. Explain why that choice mattered so much.',
    modelAnswer:
      'Revenge would have driven the country into a civil war between the races. By choosing '
      + 'reconciliation he persuaded people who had feared him that they had a place in the new '
      + 'nation. A Truth and Reconciliation Commission let the past be told openly, so the '
      + 'country could move on without tearing itself apart.',
    keyPoints: [
      { id: 'avoids-war', label: 'Revenge would have meant civil war between the races',
        accept: [['revenge'], ['civil war'], ['violence'], ['bloodshed'], ['fight'], ['destroy'], ['kill'], ['divide']] },
      { id: 'includes-former-enemies', label: 'Reconciliation gave former enemies a place in the new nation',
        accept: [['reconcil'], ['together'], ['unite'], ['everyone'], ['peace'], ['accept'], ['enemy'], ['white'], ['include']] },
      { id: 'truth-commission', label: 'A Truth and Reconciliation Commission let the past be told',
        accept: [['truth'], ['commission'], ['confess'], ['past'], ['tell'], ['hearing'], ['admit'], ['move on'], ['heal']] },
    ],
  },
]
