// scripts/spoken/social-earth-harappa.ts
// Social Science · The Earth (globe, time, motions), The Harappan Civilisation.
// Authoring rules are at the head of science-food.ts.
//
// The two time-calculation topics ask for the METHOD rather than the number.
// Keyword matching cannot mark arithmetic — "half past four" and "4:30" and a
// wrong answer arrived at correctly all look alike to it — but the reasoning
// behind the sum is exactly the sort of thing it can check, and it is what a
// board examiner awards the marks for anyway.

import type { AuthoredSpoken } from '../../src/lib/speaking.ts'

const EARTH = 'The Earth: Globe, Time and Motions'
const HAR = 'The Harappan Civilisation'

export const SOCIAL_EARTH_HARAPPA: AuthoredSpoken[] = [
  // ── The Globe & the Earth's Axis ──────────────────────────────────────
  {
    topic: 'globe-basics', topicLabel: "The Globe & the Earth's Axis", chapter: EARTH,
    question: 'Explain what a globe is and give two reasons it shows our planet better than a '
            + 'flat map does.',
    modelAnswer:
      'A globe is a small model of the earth, made round like the planet itself. Because it '
      + 'keeps that round form, the shapes and sizes of countries stay true, while a flat map '
      + 'stretches and distorts them. It also shows correct distances and directions, and how '
      + 'day and night follow each other.',
    keyPoints: [
      { id: 'model', label: 'It is a small round model of the earth',
        accept: [['model'], ['miniature'], ['small copy'], ['sphere'], ['round'], ['ball'], ['replica']] },
      { id: 'true-shapes', label: 'Shapes and sizes stay true; a flat map distorts them',
        accept: [['shape'], ['size'], ['distort'], ['stretch'], ['accurate'], ['true'], ['correct'], ['real']] },
      { id: 'distance-direction', label: 'Distances, directions, and day and night are shown properly',
        accept: [['distance'], ['direction'], ['day and night'], ['rotat'], ['position'], ['location'], ['turn']] },
    ],
  },
  {
    topic: 'globe-basics', topicLabel: "The Globe & the Earth's Axis", chapter: EARTH,
    question: 'The earth is not upright as it spins. Describe how it is held and what difference '
            + 'that makes.',
    modelAnswer:
      'The earth is tilted about twenty-three and a half degrees from the upright, and it leans '
      + 'the same way all year. Because of that tilt, different parts lean towards the sun at '
      + 'different times of the year. That is what gives us the seasons — without it, every day '
      + 'everywhere would be alike.',
    keyPoints: [
      { id: 'tilt-amount', label: 'It is tilted about 23½ degrees from the upright',
        accept: [['23'], ['twenty three'], ['tilt'], ['incline'], ['slant'], ['lean'], ['angle'], ['degree']] },
      { id: 'constant-direction', label: 'It leans the same way throughout the year',
        accept: [['same way'], ['same direction'], ['all year'], ['always'], ['constant'], ['does not change'], ['fixed']] },
      { id: 'causes-seasons', label: 'The tilt is what gives us the seasons',
        accept: [['season'], ['summer'], ['winter'], ['towards the sun'], ['away from the sun'], ['heat'], ['sunlight']] },
    ],
  },

  // ── Latitudes & Hemispheres ───────────────────────────────────────────
  {
    topic: 'latitude-hemispheres', topicLabel: 'Latitudes & Hemispheres', chapter: EARTH,
    question: 'Explain what lines of latitude are and how they are numbered.',
    modelAnswer:
      'They are imaginary circles drawn round the earth parallel to the equator, so they never '
      + 'meet. The equator is numbered zero, and the numbers rise to ninety degrees at each pole. '
      + 'Each one is marked north or south to say which side of the equator it lies on, and they '
      + 'get shorter towards the poles.',
    keyPoints: [
      { id: 'parallel-circles', label: 'Imaginary circles parallel to the equator, never meeting',
        accept: [['parallel'], ['circle'], ['imaginar'], ['never meet'], ['horizontal'], ['ring'], ['east west']] },
      { id: 'numbering', label: 'Zero at the equator, rising to 90 degrees at the poles',
        accept: [['zero'], ['equator'], ['90'], ['ninety'], ['pole'], ['degree']] },
      { id: 'north-south', label: 'Each is labelled north or south of the equator',
        accept: [['north'], ['south'], ['hemisphere'], ['above'], ['below'], ['side']] },
    ],
  },
  {
    topic: 'latitude-hemispheres', topicLabel: 'Latitudes & Hemispheres', chapter: EARTH,
    question: 'Name the important parallels apart from the equator, and say what is special about '
            + 'the two at 23½ degrees.',
    modelAnswer:
      'They are the Tropic of Cancer at 23½ north, the Tropic of Capricorn at 23½ south, and the '
      + 'Arctic and Antarctic Circles at 66½. The two tropics mark the furthest points at which '
      + 'the sun is ever directly overhead. Between them lies the hottest belt of the earth, '
      + 'which is why it is called the torrid zone.',
    keyPoints: [
      { id: 'names', label: 'Tropic of Cancer, Tropic of Capricorn, Arctic and Antarctic Circles',
        accept: [['cancer'], ['capricorn'], ['arctic'], ['antarctic'], ['tropic'], ['circle']] },
      { id: 'overhead-sun', label: 'The tropics mark the limits of an overhead sun',
        accept: [['overhead'], ['directly'], ['vertical'], ['straight above'], ['head'], ['perpendicular'], ['90 degree']] },
      { id: 'hot-belt', label: 'Between them is the hottest belt — the torrid zone',
        accept: [['torrid'], ['hot'], ['heat'], ['warm'], ['between'], ['zone']] },
    ],
  },

  // ── Longitudes & the Prime Meridian ───────────────────────────────────
  {
    topic: 'longitude-meridians', topicLabel: 'Longitudes & the Prime Meridian', chapter: EARTH,
    question: 'Explain what meridians of longitude are, and how they differ from the lines that '
            + 'run round the earth sideways.',
    modelAnswer:
      'Meridians are semicircles running from the north pole to the south pole, so they all meet '
      + 'at the poles. They are every one of them the same length, unlike parallels, which get '
      + 'shorter away from the equator. They are numbered from the prime meridian at zero out to '
      + 'a hundred and eighty degrees east and west.',
    keyPoints: [
      { id: 'pole-to-pole', label: 'Semicircles running pole to pole, meeting at the poles',
        accept: [['pole to pole'], ['north to south'], ['semicircle'], ['meet'], ['converge'], ['join'], ['vertical']] },
      { id: 'equal-length', label: 'All the same length, unlike parallels',
        accept: [['same length'], ['equal'], ['all alike'], ['not shorter'], ['unlike']] },
      { id: 'numbering', label: 'Numbered from the prime meridian at 0 to 180 east and west',
        accept: [['prime meridian'], ['greenwich'], ['zero'], ['180'], ['east'], ['west'], ['degree']] },
    ],
  },
  {
    topic: 'longitude-meridians', topicLabel: 'Longitudes & the Prime Meridian', chapter: EARTH,
    question: 'The line numbered zero passes through Greenwich in London, and not through some '
            + 'other place. Explain why, and why the choice had to be agreed.',
    modelAnswer:
      'There is no natural starting line for longitude, unlike latitude, which has the equator '
      + 'halfway between the poles. Countries once each used their own capital as zero, so the '
      + 'same place had different numbers on different maps and sailors could not compare them. '
      + 'In 1884 nations agreed on Greenwich, because Britain’s naval charts were already the '
      + 'most widely used.',
    keyPoints: [
      { id: 'no-natural-line', label: 'There is no natural zero for longitude, unlike the equator for latitude',
        accept: [['no natural'], ['equator'], ['latitude'], ['nothing fix'], ['any line'], ['halfway'], ['middle']] },
      { id: 'confusion-before', label: 'Countries each used their own, so maps disagreed',
        accept: [['own capital'], ['different'], ['confus'], ['each country'], ['disagree'], ['not match'], ['sailor'], ['map']] },
      { id: 'agreed', label: 'Nations agreed on Greenwich in 1884',
        accept: [['1884'], ['conference'], ['decide'], ['accept'], ['chose'], ['britain'], ['common'], ['nation']] },
    ],
  },

  // ── The Earth Grid & Locating Places ──────────────────────────────────
  {
    topic: 'earth-grid', topicLabel: 'The Earth Grid & Locating Places', chapter: EARTH,
    question: 'A ship radios that it is sinking and gives two numbers. Explain how those two '
            + 'numbers let rescuers find it anywhere on the planet.',
    modelAnswer:
      'The two numbers are its latitude and its longitude. Latitude fixes how far north or south '
      + 'of the equator it is, and longitude fixes how far east or west of the prime meridian. '
      + 'Only one point on earth has that pair of values, where the two lines cross, so the '
      + 'position is exact.',
    keyPoints: [
      { id: 'what-they-are', label: 'They are latitude and longitude',
        accept: [['latitude'], ['longitude']] },
      { id: 'what-each-fixes', label: 'One fixes north–south, the other east–west',
        accept: [['north', 'south'], ['east', 'west'], ['equator'], ['prime meridian'], ['greenwich'], ['how far']] },
      { id: 'unique-crossing', label: 'Only one point has that pair — where the two lines cross',
        accept: [['cross'], ['intersect'], ['only one'], ['unique'], ['exact'], ['meet'], ['single point'], ['grid']] },
    ],
  },
  {
    topic: 'earth-grid', topicLabel: 'The Earth Grid & Locating Places', chapter: EARTH,
    question: 'Explain why giving only one of the two numbers is useless for finding a place.',
    modelAnswer:
      'One value on its own describes a whole line, not a point. Every place along that circle '
      + 'shares the same reading, and thousands of towns could lie on it. Only when the second '
      + 'value is added do the two lines cross at a single spot.',
    keyPoints: [
      { id: 'a-whole-line', label: 'One value describes a whole line, not a point',
        accept: [['whole line'], ['a line'], ['circle'], ['not a point'], ['many place'], ['entire']] },
      { id: 'shared-by-many', label: 'Every place along it shares that reading',
        accept: [['same'], ['share'], ['thousand'], ['all along'], ['everywhere on'], ['many city'], ['several']] },
      { id: 'need-both', label: 'Only both together cross at a single spot',
        accept: [['both'], ['second'], ['other'], ['cross'], ['together'], ['pair'], ['exact'], ['add the']] },
    ],
  },

  // ── Rotation & Revolution ─────────────────────────────────────────────
  {
    topic: 'rotation-revolution', topicLabel: 'Rotation & Revolution', chapter: EARTH,
    question: 'The earth makes two quite different movements. Name them and say what each one '
            + 'produces.',
    modelAnswer:
      'Rotation is the earth spinning on its own axis, once in about twenty-four hours, and it '
      + 'gives us day and night. Revolution is the earth travelling round the sun, once in about '
      + 'three hundred and sixty-five days, and it gives us the year and the seasons. The extra '
      + 'quarter day each year is why we add a leap day.',
    keyPoints: [
      { id: 'rotation', label: 'Rotation — spinning on its axis in 24 hours',
        accept: [['rotat'], ['spin'], ['axis'], ['24'], ['twenty four'], ['own']] },
      { id: 'day-night', label: 'Rotation gives day and night',
        accept: [['day and night'], ['day night'], ['dark'], ['light'], ['sunrise'], ['sunset']] },
      { id: 'revolution', label: 'Revolution — round the sun in 365¼ days, giving the year and seasons',
        accept: [['revolution'], ['revolv'], ['round the sun'], ['orbit'], ['365'], ['year'], ['season'], ['leap']] },
    ],
  },
  {
    topic: 'rotation-revolution', topicLabel: 'Rotation & Revolution', chapter: EARTH,
    question: 'Explain why we add an extra day to February every fourth year.',
    modelAnswer:
      'The earth actually takes about three hundred and sixty-five and a quarter days to go once '
      + 'round the sun. A calendar year is kept at three hundred and sixty-five whole days, so a '
      + 'quarter of a day is left over each time. Four of those quarters make one whole day, '
      + 'which is added as the twenty-ninth of February in a leap year.',
    keyPoints: [
      { id: 'quarter-over', label: 'One trip round the sun takes 365¼ days',
        accept: [['365'], ['quarter'], ['and a half'], ['six hour'], ['round the sun'], ['orbit'], ['revolution']] },
      { id: 'calendar-rounds', label: 'The calendar uses 365 whole days, leaving a quarter over',
        accept: [['calendar'], ['whole day'], ['left over'], ['remain'], ['not counted'], ['ignore'], ['365']] },
      { id: 'four-make-one', label: 'Four quarters make a whole day — 29 February in a leap year',
        accept: [['29'], ['twenty nine'], ['leap'], ['one full day'], ['whole day'], ['quarter'], ['together make']] },
    ],
  },

  // ── Seasons, Solstices & Equinoxes ────────────────────────────────────
  {
    topic: 'seasons-solstices', topicLabel: 'Seasons, Solstices & Equinoxes', chapter: EARTH,
    question: 'When India is having summer, Australia is having winter. Explain how that can be.',
    modelAnswer:
      'The earth is tilted, so at any time one half leans towards the sun and the other leans '
      + 'away. The half leaning towards it gets more direct rays and longer days, and has summer. '
      + 'Half a year later the earth is on the other side of its orbit and the position is '
      + 'reversed, so the two hemispheres always have opposite seasons.',
    keyPoints: [
      { id: 'tilt', label: 'The earth is tilted, so one half leans towards the sun',
        accept: [['tilt'], ['incline'], ['lean'], ['slant'], ['angle'], ['axis'], ['23']] },
      { id: 'direct-rays', label: 'The half leaning towards it gets direct rays and longer days',
        accept: [['direct'], ['ray'], ['longer day'], ['more heat'], ['more sun'], ['straight'], ['intense'], ['vertical']] },
      { id: 'opposite-halves', label: 'The other half leans away, so the hemispheres are opposite',
        accept: [['away'], ['opposite'], ['other half'], ['hemisphere'], ['reverse'], ['slanting'], ['less heat']] },
    ],
  },
  {
    topic: 'seasons-solstices', topicLabel: 'Seasons, Solstices & Equinoxes', chapter: EARTH,
    question: 'Name what happens on 21 March and 23 September, and say how those dates differ '
            + 'from 21 June and 22 December.',
    modelAnswer:
      'On the twenty-first of March and the twenty-third of September the sun is directly over '
      + 'the equator, and these are the equinoxes, when day and night are equal everywhere. On '
      + 'the twenty-first of June the sun is over the Tropic of Cancer, and on the twenty-second '
      + 'of December over the Tropic of Capricorn, and these are the solstices. At a solstice the '
      + 'difference between day and night is at its greatest.',
    keyPoints: [
      { id: 'equinox', label: 'The equinoxes — sun over the equator, day and night equal',
        accept: [['equinox'], ['equal'], ['same length'], ['equator']] },
      { id: 'solstice', label: 'The solstices — sun over a tropic',
        accept: [['solstice'], ['cancer'], ['capricorn'], ['tropic']] },
      { id: 'longest-shortest', label: 'At a solstice the day–night difference is greatest',
        accept: [['longest'], ['shortest'], ['greatest'], ['maximum'], ['biggest differ'], ['extreme'], ['most']] },
    ],
  },

  // ── Heat Zones of the Earth ───────────────────────────────────────────
  {
    topic: 'heat-zones', topicLabel: 'Heat Zones of the Earth', chapter: EARTH,
    question: 'The earth is divided into three heat belts. Name them and explain what makes each '
            + 'one hot or cold.',
    modelAnswer:
      'The torrid zone lies between the two tropics, where the sun is overhead at some time of '
      + 'the year, so it is the hottest. The temperate zones lie between the tropics and the '
      + 'polar circles, where the rays are slanting and the climate is moderate. The frigid '
      + 'zones lie beyond the polar circles, where the rays are very slanting and it is bitterly '
      + 'cold.',
    keyPoints: [
      { id: 'torrid', label: 'Torrid — between the tropics, sun overhead, hottest',
        accept: [['torrid'], ['overhead'], ['tropic'], ['equator'], ['direct'], ['hottest']] },
      { id: 'temperate', label: 'Temperate — moderate, with slanting rays',
        accept: [['temperate'], ['moderate'], ['mild'], ['middle'], ['neither']] },
      { id: 'frigid', label: 'Frigid — beyond the polar circles, very slanting rays, bitterly cold',
        accept: [['frigid'], ['pole'], ['arctic'], ['antarctic'], ['ice'], ['snow'], ['slant'], ['coldest']] },
    ],
  },
  {
    topic: 'heat-zones', topicLabel: 'Heat Zones of the Earth', chapter: EARTH,
    question: 'Explain why the poles stay so cold even during their long summer when the sun '
            + 'never sets.',
    modelAnswer:
      'The sun there is always low down near the horizon, so its rays strike at a very slanting '
      + 'angle. Slanting rays spread the same amount of heat over a much larger area, so each '
      + 'patch of ground gets little. The ice and snow also reflect most of the light straight '
      + 'back, and the rays pass through more of the atmosphere on the way in.',
    keyPoints: [
      { id: 'low-slanting', label: 'The sun stays low, so the rays strike very slantingly',
        accept: [['slant'], ['low'], ['horizon'], ['angle'], ['oblique'], ['not direct'], ['sideway']] },
      { id: 'spread-out', label: 'Slanting rays spread the heat over a larger area',
        accept: [['spread'], ['larger area'], ['big area'], ['thin'], ['less per'], ['weak'], ['divide']] },
      { id: 'reflected', label: 'Ice and snow reflect most of it, and it crosses more atmosphere',
        accept: [['reflect'], ['ice'], ['snow'], ['white'], ['bounce'], ['atmosphere'], ['absorb']] },
    ],
  },

  // ── Varying Lengths of Day and Night ──────────────────────────────────
  {
    topic: 'day-night-length', topicLabel: 'Varying Lengths of Day and Night', chapter: EARTH,
    question: 'In Delhi a June day is much longer than a December one, but at the equator every '
            + 'day is the same. Explain both facts.',
    modelAnswer:
      'The earth’s tilt means that in June the northern half leans towards the sun, so more of '
      + 'its circle of latitude lies in daylight and the day is long. In December it leans away, '
      + 'so the day is short. The equator is cut exactly in half by the circle of illumination '
      + 'whatever the tilt, so it always has about twelve hours of each.',
    keyPoints: [
      { id: 'tilt-towards', label: 'In June the northern half leans towards the sun, so days are long',
        accept: [['tilt'], ['lean'], ['towards'], ['incline'], ['axis'], ['north', 'sun']] },
      { id: 'more-in-daylight', label: 'More of the latitude circle lies in daylight',
        accept: [['more'], ['daylight'], ['circle of illumination'], ['light'], ['portion'], ['part'], ['exposed']] },
      { id: 'equator-halved', label: 'The equator is always cut in half, so it gets about twelve hours each',
        accept: [['half'], ['12'], ['twelve'], ['equal'], ['always same'], ['never change'], ['divide']] },
    ],
  },
  {
    topic: 'day-night-length', topicLabel: 'Varying Lengths of Day and Night', chapter: EARTH,
    question: 'In parts of Norway the sun does not set for weeks in summer. Explain how that '
            + 'happens and what occurs there in winter.',
    modelAnswer:
      'Those places lie beyond the Arctic Circle, and in summer that whole region leans towards '
      + 'the sun. It stays inside the lit half of the earth right through a full rotation, so the '
      + 'sun never dips below the horizon and it is called the land of the midnight sun. In '
      + 'winter the tilt is the other way and the region stays in darkness, with no sunrise for '
      + 'weeks.',
    keyPoints: [
      { id: 'beyond-arctic', label: 'The place lies beyond the Arctic Circle, leaning towards the sun',
        accept: [['arctic'], ['polar'], ['circle'], ['66'], ['tilt'], ['lean'], ['towards'], ['pole']] },
      { id: 'always-lit', label: 'It stays in the lit half through a whole rotation',
        accept: [['lit'], ['light'], ['whole rotation'], ['all the time'], ['never'], ['24'], ['midnight sun'], ['always']] },
      { id: 'winter-dark', label: 'In winter it stays in darkness, with no sunrise for weeks',
        accept: [['dark'], ['no sunrise'], ['night'], ['polar night'], ['not rise'], ['black'], ['away from']] },
    ],
  },

  // ── Local Time, Standard Time & GMT ───────────────────────────────────
  {
    topic: 'local-standard-time', topicLabel: 'Local Time, Standard Time & GMT', chapter: EARTH,
    question: 'Explain why India keeps a single clock time from Gujarat to Assam, even though the '
            + 'sun rises in one nearly two hours before the other.',
    modelAnswer:
      'Every meridian has its own local time set by the sun, so strictly each town would differ. '
      + 'Running railways, offices and broadcasts with thousands of different clock readings '
      + 'would be impossible. So one meridian is picked for the whole country — 82½ degrees east, '
      + 'through Mirzapur — and its local time becomes standard time everywhere.',
    keyPoints: [
      { id: 'local-differs', label: 'Each meridian has its own local time set by the sun',
        accept: [['local time'], ['each place'], ['every meridian'], ['own time'], ['differ'], ['longitude']] },
      { id: 'chaos', label: 'Thousands of different clock readings would make life impossible',
        accept: [['railway'], ['train'], ['office'], ['confus'], ['impossible'], ['chaos'], ['timetable'], ['difficult'], ['manage']] },
      { id: 'one-meridian', label: 'One meridian — 82½° E — is adopted for the whole country',
        accept: [['82'], ['eighty two'], ['mirzapur'], ['standard'], ['one meridian'], ['central'], ['whole country'], ['5 30'], ['five thirty']] },
    ],
  },
  {
    topic: 'local-standard-time', topicLabel: 'Local Time, Standard Time & GMT', chapter: EARTH,
    question: 'Explain what GMT means and why the world needed one agreed reference clock.',
    modelAnswer:
      'It is the time on the prime meridian at Greenwich, from which every country’s time is '
      + 'measured as so many hours ahead or behind. Without one agreed reference there would be '
      + 'no way to state when an international flight lands or a broadcast begins. India, for '
      + 'instance, is five and a half hours ahead of it.',
    keyPoints: [
      { id: 'what-it-is', label: 'The time on the prime meridian at Greenwich',
        accept: [['greenwich'], ['prime meridian'], ['zero'], ['london'], ['england']] },
      { id: 'measured-from', label: 'Every country is so many hours ahead of or behind it',
        accept: [['ahead'], ['behind'], ['plus'], ['minus'], ['hour'], ['5 30'], ['five thirty'], ['half']] },
      { id: 'why-needed', label: 'Without a common reference, flights and broadcasts could not be timed',
        accept: [['flight'], ['aeroplane'], ['plane'], ['broadcast'], ['internation'], ['common'], ['compare'], ['confus'], ['land']] },
    ],
  },

  // ── Calculating Time from Longitude ───────────────────────────────────
  {
    topic: 'time-from-longitude', topicLabel: 'Calculating Time from Longitude', chapter: EARTH,
    question: 'Without doing any sum, explain the method for working out how far ahead one place '
            + 'is of another when you know both their meridians.',
    modelAnswer:
      'The earth turns once, three hundred and sixty degrees, in twenty-four hours, so it covers '
      + 'fifteen degrees in an hour and one degree in four minutes. Find the difference between '
      + 'the two readings, remembering to add them if the places are on opposite sides of the '
      + 'prime meridian. Multiply that difference by four minutes, and the place lying further '
      + 'east is ahead.',
    keyPoints: [
      { id: 'rate', label: '360° in 24 hours means 15° an hour, or 1° in four minutes',
        accept: [['15'], ['fifteen'], ['four minute'], ['4 minute'], ['360'], ['24'], ['one degree']] },
      { id: 'difference', label: 'Take the difference between the two readings, adding if opposite sides',
        accept: [['differ'], ['subtract'], ['minus'], ['add'], ['opposite side'], ['both side'], ['gap'], ['between']] },
      { id: 'east-ahead', label: 'Multiply out, and the place further east is ahead',
        accept: [['east'], ['multiply'], ['west'], ['behind'], ['later'], ['further east'], ['forward']] },
    ],
  },
  {
    topic: 'time-from-longitude', topicLabel: 'Calculating Time from Longitude', chapter: EARTH,
    question: 'Explain why places lying to the east see the sun earlier, using the way the planet '
            + 'turns.',
    modelAnswer:
      'The earth spins from west to east, so a place on the eastern side is carried into the '
      + 'sunlight first. Sunrise therefore reaches the east before the west, and its clock is '
      + 'ahead. That is why the sun rises in Assam well before it rises in Gujarat.',
    keyPoints: [
      { id: 'spins-west-to-east', label: 'The earth spins from west to east',
        accept: [['west to east'], ['westeast'], ['spin'], ['rotat'], ['direction'], ['anticlockwise']] },
      { id: 'east-first', label: 'So eastern places are carried into the sunlight first',
        accept: [['first'], ['before'], ['sooner'], ['sunrise'], ['face the sun'], ['comes into'], ['carried']] },
      { id: 'clock-ahead', label: 'Their clocks are therefore ahead',
        accept: [['ahead'], ['clock'], ['time'], ['assam'], ['gujarat'], ['forward'], ['advance']] },
    ],
  },

  // ── Converting Between Time Zones ─────────────────────────────────────
  {
    topic: 'time-conversion', topicLabel: 'Converting Between Time Zones', chapter: EARTH,
    question: 'A cousin in London wants to telephone you in India. Explain the reasoning you would '
            + 'use to tell them a good hour to ring, without giving a number.',
    modelAnswer:
      'India runs five and a half hours ahead of the time in London. So whatever their clock '
      + 'says, ours says five and a half hours more, and their morning is already our afternoon. '
      + 'They must therefore ring earlier in their day than feels natural, or they will be '
      + 'telephoning in the middle of our night.',
    keyPoints: [
      { id: 'the-gap', label: 'India is five and a half hours ahead',
        accept: [['5 30'], ['five thirty'], ['five and a half'], ['half hour'], ['ahead'], ['difference']] },
      { id: 'add-or-subtract', label: 'Add that gap to their clock to get ours',
        accept: [['add'], ['plus'], ['more'], ['subtract'], ['minus'], ['convert'], ['calculat']] },
      { id: 'practical', label: 'So they must ring earlier in their day, or it is our night',
        accept: [['morning'], ['afternoon'], ['night'], ['sleep'], ['early'], ['late'], ['evening'], ['awake']] },
    ],
  },
  {
    topic: 'time-conversion', topicLabel: 'Converting Between Time Zones', chapter: EARTH,
    question: 'A traveller flies from Delhi to New York and arrives at a clock time earlier than '
            + 'when they took off. Explain how that is possible.',
    modelAnswer:
      'New York lies far to the west of Delhi, so its clocks run many hours behind. The flight '
      + 'takes many hours, but crossing westwards the traveller is putting the clock back further '
      + 'than the hours actually spent flying. No time is really gained — only the reading on the '
      + 'clock has changed, because they moved into a different zone.',
    keyPoints: [
      { id: 'west-behind', label: 'New York is far west, so its clocks are hours behind',
        accept: [['west'], ['behind'], ['hour'], ['9 30'], ['ten'], ['zone']] },
      { id: 'clock-put-back', label: 'Travelling west means putting the clock back more than the flight took',
        accept: [['clock back'], ['put back'], ['set back'], ['subtract'], ['minus'], ['backward'], ['further']] },
      { id: 'no-real-gain', label: 'No time is really gained — only the clock reading changed',
        accept: [['not real'], ['only the clock'], ['same amount'], ['actually'], ['illusion'], ['still pass'], ['reading']] },
    ],
  },

  // ── The International Date Line ───────────────────────────────────────
  {
    topic: 'date-line', topicLabel: 'The International Date Line', chapter: EARTH,
    question: 'Explain what the International Date Line is, where it runs, and what a traveller '
            + 'must do on crossing it.',
    modelAnswer:
      'It is an imaginary line roughly along the meridian of a hundred and eighty degrees, out '
      + 'in the middle of the Pacific Ocean. Crossing it going west, a traveller adds a day, and '
      + 'crossing it going east, they take one off. It bends around islands and countries so that '
      + 'no inhabited place is split between two dates.',
    keyPoints: [
      { id: 'where', label: 'Roughly along 180°, in the middle of the Pacific',
        accept: [['180'], ['hundred and eighty'], ['pacific'], ['ocean'], ['meridian'], ['opposite']] },
      { id: 'add-or-drop', label: 'Going west a day is added; going east a day is dropped',
        accept: [['add'], ['gain'], ['lose'], ['subtract'], ['repeat'], ['skip'], ['west'], ['east'], ['day']] },
      { id: 'zigzag', label: 'It bends around land so no country is split between two dates',
        accept: [['zigzag'], ['bend'], ['curve'], ['island'], ['country'], ['not straight'], ['avoid'], ['split']] },
    ],
  },
  {
    topic: 'date-line', topicLabel: 'The International Date Line', chapter: EARTH,
    question: 'Explain why the world needs such a line at all, using what happens as you keep '
            + 'travelling in one direction.',
    modelAnswer:
      'Going west, the clock is put back an hour for every fifteen degrees, and after going right '
      + 'round the whole twenty-four hours have been taken off. The traveller would arrive back '
      + 'having lost a whole day compared with the people who stayed at home. A place is therefore '
      + 'fixed where the date is changed, so the calendar comes out right.',
    keyPoints: [
      { id: 'hour-each-zone', label: 'An hour is gained or lost every 15 degrees',
        accept: [['hour'], ['15'], ['fifteen'], ['zone'], ['put back'], ['each']] },
      { id: 'adds-to-a-day', label: 'Right round the world that adds up to a whole 24 hours',
        accept: [['24'], ['twenty four'], ['whole day'], ['full circle'], ['round the world'], ['add up'], ['total']] },
      { id: 'fix-somewhere', label: 'So one place is fixed where the date changes, keeping calendars right',
        accept: [['fix'], ['somewhere'], ['change the date'], ['calendar'], ['correct'], ['agree'], ['adjust'], ['same day']] },
    ],
  },

  // ── Discovery & Decline ───────────────────────────────────────────────
  {
    topic: 'harappan-discovery', topicLabel: 'Discovery & Decline', chapter: HAR,
    question: 'Describe how the Harappan civilisation came to be found again after thousands of '
            + 'years.',
    modelAnswer:
      'Workers building a railway line in Punjab in the eighteen fifties carried away old baked '
      + 'bricks from a mound to use as ballast, not knowing what they were. In the nineteen '
      + 'twenties archaeologists including Daya Ram Sahni and R. D. Banerji excavated Harappa and '
      + 'Mohenjodaro. Sir John Marshall announced that a civilisation as old as Egypt and '
      + 'Mesopotamia had been found in India.',
    keyPoints: [
      { id: 'railway-bricks', label: 'Railway builders carried away ancient bricks from a mound',
        accept: [['railway'], ['train'], ['brick'], ['mound'], ['track'], ['line'], ['worker']] },
      { id: 'excavation', label: 'Archaeologists excavated Harappa and Mohenjodaro in the 1920s',
        accept: [['excavat'], ['dig'], ['archaeolog'], ['sahni'], ['banerji'], ['1920'], ['mohenjo'], ['marshall']] },
      { id: 'significance', label: 'It proved a civilisation as old as Egypt or Mesopotamia',
        accept: [['egypt'], ['mesopotam'], ['old'], ['ancient'], ['world'], ['5000'], ['as old as']] },
    ],
  },
  {
    topic: 'harappan-discovery', topicLabel: 'Discovery & Decline', chapter: HAR,
    question: 'Give three explanations historians offer for why those great cities were abandoned.',
    modelAnswer:
      'Rivers may have changed course or dried up, so the water supply failed. Forests were cut '
      + 'down for firewood and to bake bricks, and heavy grazing wore out the land, so harvests '
      + 'fell. Floods, earthquakes and a breakdown of trade have all been suggested as well, and '
      + 'no single cause is agreed.',
    keyPoints: [
      { id: 'rivers', label: 'Rivers changed course or dried up',
        accept: [['river'], ['dried'], ['water'], ['course'], ['saraswati'], ['ghaggar'], ['change']] },
      { id: 'land-exhausted', label: 'Deforestation and grazing wore out the land, so harvests fell',
        accept: [['forest'], ['tree'], ['cut'], ['graz'], ['cattle'], ['soil'], ['fertil'], ['crop'], ['harvest'], ['firewood']] },
      { id: 'other-causes', label: 'Floods, earthquakes or a collapse of trade are also suggested',
        accept: [['flood'], ['earthquake'], ['trade'], ['invasion'], ['disease'], ['climate'], ['rain'], ['collapse']] },
    ],
  },

  // ── Cities & Town Planning ────────────────────────────────────────────
  {
    topic: 'harappan-cities', topicLabel: 'Cities & Town Planning', chapter: HAR,
    question: 'Describe how a Harappan city was laid out, and what that tells us about the people '
            + 'who built it.',
    modelAnswer:
      'The city was built in two parts, a raised citadel on the west and a larger lower town on '
      + 'the east where most people lived. Streets ran straight and crossed one another at right '
      + 'angles, dividing the town into neat blocks. Such careful planning shows there was a '
      + 'strong authority able to decide and enforce how the whole city was built.',
    keyPoints: [
      { id: 'two-parts', label: 'A raised citadel and a larger lower town',
        accept: [['citadel'], ['upper'], ['lower town'], ['two part'], ['raised'], ['high'], ['west'], ['east']] },
      { id: 'grid-streets', label: 'Straight streets crossing at right angles, in neat blocks',
        accept: [['straight'], ['right angle'], ['grid'], ['block'], ['cross'], ['plan'], ['square'], ['parallel']] },
      { id: 'implies-authority', label: 'Such planning implies a strong central authority',
        accept: [['authority'], ['ruler'], ['govern'], ['organis'], ['organiz'], ['control'], ['plan'], ['decide'], ['power']] },
    ],
  },
  {
    topic: 'harappan-cities', topicLabel: 'Cities & Town Planning', chapter: HAR,
    question: 'The drainage of these cities is often called their greatest achievement. Describe '
            + 'it and say why it impresses people so much.',
    modelAnswer:
      'Every house had its own bathing area and drain, connected to covered channels running '
      + 'under the streets. The channels were laid with a gentle slope so the water flowed away, '
      + 'and manholes were left at intervals so they could be cleaned. It impresses because it '
      + 'served ordinary homes and not just palaces, and many towns today still lack anything as '
      + 'good.',
    keyPoints: [
      { id: 'house-to-street', label: 'Each house drained into covered channels under the streets',
        accept: [['every house'], ['each house'], ['cover'], ['under'], ['street'], ['connect'], ['bath'], ['channel'], ['pipe']] },
      { id: 'engineering', label: 'Laid on a slope, with manholes for cleaning',
        accept: [['slope'], ['gradient'], ['flow'], ['manhole'], ['clean'], ['inspect'], ['gap'], ['brick']] },
      { id: 'why-impressive', label: 'It served ordinary homes, and many towns today lack as much',
        accept: [['ordinary'], ['common people'], ['every home'], ['not just'], ['today'], ['modern'], ['still'], ['even now'], ['advanced']] },
    ],
  },

  // ── Life & Economy ────────────────────────────────────────────────────
  {
    topic: 'harappan-life', topicLabel: 'Life & Economy', chapter: HAR,
    question: 'Describe how the Harappan people made their living, mentioning three kinds of work.',
    modelAnswer:
      'Many were farmers, growing wheat, barley, peas and cotton, and keeping cattle, sheep and '
      + 'buffalo. Craftspeople made pottery, beads of carnelian, copper and bronze tools, and '
      + 'wove cotton cloth. Traders carried goods to Mesopotamia and brought back metals, and '
      + 'weights and seals show the trade was carefully regulated.',
    keyPoints: [
      { id: 'farming', label: 'Farming — wheat, barley, peas, cotton — and keeping animals',
        accept: [['farm'], ['wheat'], ['barley'], ['cotton'], ['crop'], ['cattle'], ['sheep'], ['buffalo'], ['agricultur'], ['pea']] },
      { id: 'crafts', label: 'Crafts — pottery, beads, copper and bronze tools, weaving',
        accept: [['pottery'], ['bead'], ['carnelian'], ['copper'], ['bronze'], ['weav'], ['craft'], ['tool'], ['ornament'], ['shell']] },
      { id: 'trade', label: 'Trade with Mesopotamia, regulated by weights and seals',
        accept: [['trade'], ['mesopotam'], ['import'], ['export'], ['weight'], ['seal'], ['merchant'], ['exchange'], ['boat']] },
    ],
  },
  {
    topic: 'harappan-life', topicLabel: 'Life & Economy', chapter: HAR,
    question: 'Archaeologists say Harappan society was well organised without evidence of kings '
            + 'or armies. Explain what makes them think so.',
    modelAnswer:
      'Weights and measures were standard across cities hundreds of miles apart, which means '
      + 'somebody was enforcing a common system. Bricks everywhere were made to the same '
      + 'proportions, and the town planning was uniform. Yet almost no weapons, no grand palaces '
      + 'and no royal tombs have been found, so the authority does not look like a warrior king.',
    keyPoints: [
      { id: 'standard-weights', label: 'Standard weights and measures across distant cities',
        accept: [['weight'], ['measure'], ['standard'], ['same'], ['uniform'], ['common system']] },
      { id: 'uniform-bricks', label: 'Bricks and town planning followed the same pattern everywhere',
        accept: [['brick'], ['proportion'], ['ratio'], ['plan'], ['size'], ['everywhere'], ['pattern'], ['similar']] },
      { id: 'no-palaces', label: 'Almost no weapons, palaces or royal tombs have been found',
        accept: [['weapon'], ['palace'], ['tomb'], ['not found'], ['absent'], ['grave'], ['no evidence'], ['nothing']] },
    ],
  },

  // ── Seals & Script ────────────────────────────────────────────────────
  {
    topic: 'harappan-seals', topicLabel: 'Seals & Script', chapter: HAR,
    question: 'Describe what a Harappan seal was made of and what it was used for.',
    modelAnswer:
      'Most were cut from steatite, a soft stone, and were small enough to hold in the palm. '
      + 'Each carried an animal figure and a short line of signs above it. Pressed into wet clay '
      + 'on a bundle of goods, the seal left a mark showing who had sent it and that the bundle '
      + 'had not been opened.',
    keyPoints: [
      { id: 'material', label: 'Cut from steatite, a soft stone, and small enough to hold',
        accept: [['steatite'], ['stone'], ['soft'], ['small'], ['square'], ['palm'], ['terracotta'], ['clay']] },
      { id: 'what-is-on-it', label: 'An animal figure and a short line of signs',
        accept: [['animal'], ['bull'], ['unicorn'], ['elephant'], ['tiger'], ['sign'], ['script'], ['writing'], ['picture']] },
      { id: 'use', label: 'Pressed into wet clay to mark ownership and show goods were unopened',
        accept: [['clay'], ['press'], ['mark'], ['owner'], ['trade'], ['goods'], ['bundle'], ['stamp'], ['sender'], ['seal it']] },
    ],
  },
  {
    topic: 'harappan-seals', topicLabel: 'Seals & Script', chapter: HAR,
    question: 'Thousands of pieces of Harappan writing survive, yet nobody can read a word of it. '
            + 'Explain why.',
    modelAnswer:
      'The inscriptions are extremely short, most only a few signs long, so there is little to '
      + 'work from. There is no bilingual text pairing it with a language we already know, as the '
      + 'Rosetta Stone gave for Egyptian. Nobody knows what language it recorded either, and the '
      + 'signs are too many to be an alphabet.',
    keyPoints: [
      { id: 'too-short', label: 'The inscriptions are very short, only a few signs each',
        accept: [['short'], ['few sign'], ['brief'], ['small'], ['little'], ['not enough'], ['length']] },
      { id: 'no-bilingual', label: 'There is no bilingual text, as the Rosetta Stone gave for Egypt',
        accept: [['bilingual'], ['rosetta'], ['two language'], ['known language'], ['compare'], ['translat'], ['key'], ['egypt']] },
      { id: 'unknown-language', label: 'The language behind it is unknown, and the signs are too many for an alphabet',
        accept: [['unknown'], ['what language'], ['spoke'], ['too many'], ['alphabet'], ['hundred'], ['not know']] },
    ],
  },

  // ── Seal Picture Questions ────────────────────────────────────────────
  {
    topic: 'harappan-seal-images', topicLabel: 'Seal Picture Questions', chapter: HAR,
    question: 'The animal most often carved on these seals is a one-horned creature scholars call '
            + 'the unicorn. Say what else appears beside it and why the carvings matter to us.',
    modelAnswer:
      'Beside the animal there is usually a short row of signs, and often an object in front of '
      + 'it that may be a feeding trough or a stand for offerings. The carvings matter because '
      + 'they are among the finest art these people left, and they tell us which animals mattered '
      + 'to them. They also carry almost all the surviving samples of their writing.',
    keyPoints: [
      { id: 'signs-and-object', label: 'A short row of signs, and an object like a trough before the animal',
        accept: [['sign'], ['script'], ['writing'], ['trough'], ['object'], ['stand'], ['front'], ['symbol'], ['line']] },
      { id: 'art-and-animals', label: 'They are fine art and show which animals mattered',
        accept: [['art'], ['skill'], ['craft'], ['important'], ['worship'], ['beautiful'], ['detail'], ['finest']] },
      { id: 'source-of-script', label: 'They carry nearly all the surviving writing',
        accept: [['nearly all'], ['only source'], ['survive'], ['evidence'], ['record'], ['main'], ['sample']] },
    ],
  },
  {
    topic: 'harappan-seal-images', topicLabel: 'Seal Picture Questions', chapter: HAR,
    question: 'A seal shows a figure seated cross-legged surrounded by animals. Explain what '
            + 'scholars have suggested about it, and why they cannot be certain.',
    modelAnswer:
      'Some have suggested the seated figure is a god, sometimes called a proto-Shiva, because '
      + 'the pose resembles later images of Shiva as lord of the beasts. Others say it may be a '
      + 'chief, a priest or simply a scene from a story. Nobody can be sure, because the writing '
      + 'cannot be read and there is nothing to confirm any of the guesses.',
    keyPoints: [
      { id: 'deity-theory', label: 'It may be a god — sometimes called proto-Shiva, lord of beasts',
        accept: [['god'], ['shiva'], ['deity'], ['pashupati'], ['worship'], ['divine'], ['religio']] },
      { id: 'other-readings', label: 'It might instead be a chief, a priest or a scene from a story',
        accept: [['chief'], ['priest'], ['king'], ['story'], ['ordinary'], ['ruler'], ['person'], ['may be']] },
      { id: 'cannot-be-sure', label: 'Certainty is impossible while the script cannot be read',
        accept: [['cannot read'], ['script'], ['not sure'], ['guess'], ['no proof'], ['unknown'], ['evidence'], ['undecipher']] },
    ],
  },
]
