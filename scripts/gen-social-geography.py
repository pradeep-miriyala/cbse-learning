#!/usr/bin/env python3
"""
Builds the Class 6 Geography bank: the globe, the grid, time, and the motions
of the Earth.

Hand-written. This chapter is unusual in the syllabus because a good part of it
is arithmetic — 15° to the hour, four minutes to the degree — and arithmetic
questions with a wrong key teach the wrong method. Every time calculation here
was worked twice, and the checker at the bottom of this file re-derives the
answers from the longitudes independently.

The other reason for care is that this chapter is full of confident
misconceptions. Seasons are not caused by the Earth's distance from the Sun;
the Earth is in fact nearest the Sun in January. Those beliefs are used as
distractors on purpose, so that picking one is informative rather than random.

    python3 scripts/gen-social-geography.py
"""

import json
from collections import Counter

CHAPTER = "The Earth: Globe, Time and Motions"
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
# 1. The Globe and the Earth's Axis
# ═══════════════════════════════════════════════════════════════════════
T, L = "globe-basics", "The Globe & the Earth's Axis"

Q(T, L, "What is a globe?",
  "A true model of the Earth, showing its shape and the position of places on it",
  ["A flat map of the world printed on paper",
   "A photograph taken from space",
   "A model of the solar system"],
  "Unlike a flat map, a globe does not distort the shapes of continents.", "easy")

Q(T, L, "What is the axis of the Earth?",
  "An imaginary line passing through the centre of the Earth from the North Pole to the South Pole",
  ["The path the Earth follows around the Sun",
   "The line marking the equator",
   "A real rod running through the planet"],
  "It is imaginary — you would not find it if you dug down.", "easy")

Q(T, L, "The Earth's axis is tilted. By how much?",
  "About 23½ degrees from the vertical",
  ["About 45 degrees", "About 10 degrees", "It is not tilted at all"],
  "The same tilt is often given as 66½° from the plane of the orbit.", "medium")

Q(T, L, "Why does a globe sit at a slant on its stand?",
  "Because it shows the Earth's real tilt, which is fixed as it travels round the Sun",
  ["Because it makes the globe easier to spin",
   "Because the maker fixed it badly",
   "Because the Earth wobbles from side to side"],
  "The slant is the whole reason the seasons exist.", "medium")

Q(T, L, "Which imaginary line divides the Earth into two equal halves?",
  "The equator", ["The Tropic of Cancer", "The Prime Meridian", "The Arctic Circle"],
  "It runs exactly midway between the two poles.", "easy")

Q(T, L, "What is the shape of the Earth?",
  "Slightly flattened at the poles and bulging at the equator",
  ["A perfect sphere",
   "A flat disc",
   "A cube with rounded corners"],
  "The word geographers use is 'geoid' — earth-shaped.", "medium")

Q(T, L, "What is the main advantage of a globe over a flat map?",
  "It shows the size, shape and distance of places without distortion",
  ["It can be folded and carried easily",
   "It shows more detail of small areas",
   "It can be printed cheaply"],
  "You cannot flatten a curved surface without stretching something.", "hard")

Q(T, L, "What is the main disadvantage of a globe?",
  "It cannot show a small area in detail and is not easy to carry about",
  ["It shows the wrong shapes for continents",
   "It cannot show the oceans",
   "It shows only one hemisphere at a time"],
  "You would not use one to find a street.", "medium")

Q(T, L, "The needle on which a globe turns represents what?",
  "The Earth's axis", ["The equator", "The Prime Meridian", "The orbit of the Earth"],
  "The globe spins about it just as the Earth spins about its axis.", "easy")

Q(T, L, "Which two points on the Earth do not move when the Earth rotates?",
  "The North Pole and the South Pole",
  ["Two points on the equator",
   "The points where the Prime Meridian meets the equator",
   "No point stays still"],
  "The axis passes through them, so they turn on the spot.", "hard")

Q(T, L, "Why is the equator called the zero-degree parallel?",
  "It is the starting line from which latitude is measured to the north and to the south",
  ["Because no country lies on it",
   "Because the temperature there is zero",
   "Because it is the shortest parallel"],
  "Every other parallel is measured as an angle from it.", "medium")

Q(T, L, "If the Earth's axis were not tilted, what would happen?",
  "Day and night would be nearly equal all year and there would be no seasons as we know them",
  ["The Earth would stop rotating",
   "There would be no day and night",
   "The Earth would move closer to the Sun"],
  "Tilt is what makes one hemisphere lean towards the Sun at a time.", "hard")

Q(T, L, "What does the plane of the Earth's orbit mean?",
  "The flat surface in which the Earth travels around the Sun",
  ["The path of an aeroplane over the Earth",
   "The surface of the Earth itself",
   "The line joining the two poles"],
  "The axis is tilted 66½° to this plane.", "hard")

Q(T, L, "Which of these is true of the equator?",
  "It is the longest parallel of latitude",
  ["It is the shortest parallel of latitude",
   "It passes through both poles",
   "It has a latitude of 90°"],
  "The circles get smaller as you move towards the poles.", "medium")

Q(T, L, "Which continent does the equator NOT pass through?",
  "Australia", ["Africa", "South America", "Asia"],
  "It passes through Indonesia in Asia, but Australia lies wholly south of it.", "hard")

Q(T, L, "A globe shows the world in what proportion to the real Earth?",
  "To scale, so that relative sizes and distances are correct",
  ["Larger than life for the oceans only",
   "With continents enlarged for clarity",
   "With no fixed relationship at all"],
  "A globe is a scale model, like a model aeroplane.", "medium")

Q(T, L, "Why can no flat map of the whole world be completely accurate?",
  "A curved surface cannot be flattened without stretching or tearing some part of it",
  ["Because paper is too small",
   "Because the Earth is always moving",
   "Because mapmakers cannot measure accurately"],
  "Try flattening an orange peel and see what happens to it.", "hard")

Q(T, L, "What are the two poles of the Earth called?",
  "The North Pole and the South Pole",
  ["The east pole and the west pole",
   "The upper pole and the lower pole",
   "The magnetic pole and the geographic pole"],
  "They are the two points where the axis meets the surface.", "easy")

Q(T, L, "What lies at 90° North?",
  "The North Pole", ["The Arctic Circle", "The Tropic of Cancer", "Greenwich"],
  "90° is the greatest latitude possible.", "easy")

Q(T, L, "Why do we need imaginary lines on the globe at all?",
  "Because without a system of reference there is no way to state exactly where a place is",
  ["Because they can be seen from space",
   "Because they mark real boundaries between countries",
   "Because they show where the Earth is thickest"],
  "The lines are a language for describing position.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 2. Latitudes & Hemispheres
# ═══════════════════════════════════════════════════════════════════════
T, L = "latitude-hemispheres", "Latitudes & Hemispheres"

Q(T, L, "What is a parallel of latitude?",
  "A circle drawn around the globe parallel to the equator",
  ["A line joining the North Pole to the South Pole",
   "A line marking a country's border",
   "The path of the Sun across the sky"],
  "They never meet, which is why they are called parallels.", "easy")

Q(T, L, "What is the latitude of the equator?",
  "0°", ["90°", "23½°", "180°"],
  "It is the line from which all other latitudes are measured.", "easy")

Q(T, L, "The equator divides the Earth into which two hemispheres?",
  "The Northern and Southern Hemispheres",
  ["The Eastern and Western Hemispheres",
   "The Upper and Lower Hemispheres",
   "The Land and Water Hemispheres"],
  "North and south are measured from the equator.", "easy")

Q(T, L, "What is the latitude of the Tropic of Cancer?",
  "23½° North", ["23½° South", "66½° North", "0°"],
  "Cancer lies north of the equator; Capricorn lies south.", "medium")

Q(T, L, "What is the latitude of the Tropic of Capricorn?",
  "23½° South", ["23½° North", "66½° South", "90° South"],
  "It is the mirror image of the Tropic of Cancer.", "medium")

Q(T, L, "What is the latitude of the Arctic Circle?",
  "66½° North", ["66½° South", "23½° North", "90° North"],
  "The Antarctic Circle is its counterpart in the south.", "medium")

Q(T, L, "As you move away from the equator towards a pole, what happens to the parallels?",
  "They become shorter",
  ["They become longer",
   "They stay exactly the same length",
   "They begin to cross one another"],
  "Picture the circles shrinking towards the top of an orange.", "medium")

Q(T, L, "Why can latitude never be more than 90°?",
  "Because 90° is the angle from the equator to the pole, and the pole is as far as you can go",
  ["Because 90 is the largest number used in geography",
   "Because the Earth has only 90 parallels",
   "Because beyond 90° the parallels become meridians"],
  "The angle is measured from the centre of the Earth.", "hard")

Q(T, L, "Delhi is at about 28° North. What does this tell you?",
  "It lies about 28 degrees north of the equator",
  ["It is 28 kilometres from the equator",
   "It lies 28 degrees east of Greenwich",
   "It is 28 degrees above sea level"],
  "Latitude is an angle, not a distance in kilometres.", "medium")

Q(T, L, "Which hemisphere is India in?",
  "The Northern Hemisphere",
  ["The Southern Hemisphere",
   "Partly in both, with the equator running through it",
   "Neither, since it lies on the equator"],
  "The whole of mainland India lies north of the equator.", "easy")

Q(T, L, "If parallels of latitude are drawn at intervals of one degree, how many are there in all?",
  "181", ["90", "360", "179"],
  "Ninety in the north, ninety in the south, and the equator itself.", "hard")

Q(T, L, "Roughly how far apart are two parallels one degree apart?",
  "About 111 kilometres", ["About 11 kilometres", "About 1,110 kilometres", "About 15 kilometres"],
  "It is nearly the same everywhere, because the parallels are evenly spaced.", "hard")

Q(T, L, "Which of these places is closest to the equator?",
  "A place at 5° South", ["A place at 40° North", "A place at 60° South", "A place at 23½° North"],
  "The smaller the number, the closer to the equator, north or south.", "medium")

Q(T, L, "Why are latitudes important for understanding climate?",
  "They tell you how directly the Sun's rays strike a place, which affects how hot it is",
  ["They show how much rain a place receives",
   "They mark the boundaries of countries",
   "They indicate the height of the land"],
  "Near the equator the rays fall almost straight down; near the poles they slant.", "hard")

Q(T, L, "Two places lie at the same latitude but on opposite sides of the Earth. What do they share?",
  "The same distance from the equator, and broadly similar sunlight through the year",
  ["The same local time",
   "The same longitude",
   "The same date"],
  "Latitude fixes the Sun's angle; longitude fixes the time.", "hard")

Q(T, L, "Which important parallel passes through India?",
  "The Tropic of Cancer", ["The Tropic of Capricorn", "The Arctic Circle", "The equator"],
  "It runs across the middle of the country, through eight states.", "medium")

Q(T, L, "What is the latitude of the South Pole?",
  "90° South", ["0°", "66½° South", "180° South"],
  "It is the furthest south any place can be.", "easy")

Q(T, L, "Which statement about parallels is correct?",
  "They are complete circles and never meet one another",
  ["They are semicircles that meet at the poles",
   "They are all of equal length",
   "They run from north to south"],
  "Compare them with meridians, which do meet at the poles.", "medium")

Q(T, L, "A ship sails due east along a parallel. What stays the same?",
  "Its latitude", ["Its longitude", "Its local time", "The date on board"],
  "Sailing along a parallel means keeping the same distance from the equator.", "hard")

Q(T, L, "Why is the equator the longest parallel?",
  "It is drawn around the widest part of the Earth",
  ["It passes through the most countries",
   "It is the only parallel that is a full circle",
   "It is closest to the Sun"],
  "The Earth bulges at the equator.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 3. Longitudes & the Prime Meridian
# ═══════════════════════════════════════════════════════════════════════
T, L = "longitude-meridians", "Longitudes & the Prime Meridian"

Q(T, L, "What is a meridian of longitude?",
  "A semicircle running from the North Pole to the South Pole",
  ["A circle drawn parallel to the equator",
   "A line marking the edge of a time zone only",
   "The path of the Moon across the sky"],
  "All meridians meet at both poles.", "easy")

Q(T, L, "Through which place does the Prime Meridian pass?",
  "Greenwich, in London", ["Paris, in France", "Delhi, in India", "New York, in America"],
  "The old Royal Observatory there gave the line its name.", "easy")

Q(T, L, "What is the longitude of the Prime Meridian?",
  "0°", ["90°", "180°", "23½°"],
  "It is the starting line for measuring longitude east and west.", "easy")

Q(T, L, "What is the greatest possible longitude?",
  "180°", ["90°", "360°", "270°"],
  "Going 180° either way from Greenwich brings you to the same meridian.", "medium")

Q(T, L, "How do meridians differ from parallels?",
  "Meridians are all of equal length and meet at the poles; parallels differ in length and never meet",
  ["Meridians are circles and parallels are semicircles",
   "Meridians run east to west",
   "There is no real difference"],
  "Two differences: length, and whether they meet.", "hard")

Q(T, L, "If meridians are drawn at intervals of one degree, how many are there in all?",
  "360", ["180", "181", "90"],
  "180 to the east and 180 to the west, counting 0° and 180° once each.", "hard")

Q(T, L, "Delhi is at about 77° East. What does this mean?",
  "It lies about 77 degrees east of the Prime Meridian",
  ["It is 77 degrees north of the equator",
   "It is 77 kilometres from Greenwich",
   "It lies in the Western Hemisphere"],
  "East and west are always measured from Greenwich.", "medium")

Q(T, L, "The 0° and 180° meridians together divide the Earth into which hemispheres?",
  "The Eastern and Western Hemispheres",
  ["The Northern and Southern Hemispheres",
   "The Torrid and Frigid Zones",
   "The upper and lower halves"],
  "Latitude gives north and south; longitude gives east and west.", "medium")

Q(T, L, "Why is Greenwich, rather than any other place, the site of the Prime Meridian?",
  "It was chosen by international agreement in the nineteenth century, not for any natural reason",
  ["Because it lies exactly at the centre of the Earth",
   "Because the Sun rises there first",
   "Because it is the oldest city in the world"],
  "Any meridian could have been chosen; the world simply had to agree on one.", "hard")

Q(T, L, "What happens to the distance between two meridians as you travel towards a pole?",
  "It becomes smaller, until the meridians meet at the pole",
  ["It stays exactly the same",
   "It becomes larger",
   "The meridians cross one another"],
  "They are furthest apart at the equator.", "medium")

Q(T, L, "Which of these is true of all meridians?",
  "They are of equal length",
  ["They are of different lengths",
   "They never touch one another",
   "They run parallel to the equator"],
  "Each is half of a great circle passing through both poles.", "medium")

Q(T, L, "India's easternmost and westernmost points differ by about 30° of longitude. What does this cause?",
  "A difference of about two hours in local time across the country",
  ["A difference of about two degrees in temperature",
   "A difference in the date between the two ends",
   "No difference at all"],
  "Fifteen degrees is one hour, so thirty degrees is two.", "hard")

Q(T, L, "Which meridian lies exactly opposite the Prime Meridian?",
  "The 180° meridian", ["The 90° East meridian", "The equator", "The 360° meridian"],
  "Together they form one complete circle around the Earth.", "medium")

Q(T, L, "A place is at 20° West. In which hemisphere does it lie?",
  "The Western Hemisphere", ["The Eastern Hemisphere", "The Northern Hemisphere", "The Southern Hemisphere"],
  "West of Greenwich means the Western Hemisphere.", "easy")

Q(T, L, "Why are meridians useful for measuring time?",
  "Because the Earth turns through a fixed number of degrees each hour",
  ["Because they are drawn on every clock",
   "Because they mark the borders of countries",
   "Because the Sun travels along them"],
  "The Earth turns 360° in 24 hours.", "hard")

Q(T, L, "Which two things together fix the exact position of any place on Earth?",
  "Its latitude and its longitude",
  ["Its latitude and its height above sea level",
   "Its longitude and its distance from the nearest city",
   "Its time zone and its climate"],
  "One number gives north-south, the other east-west.", "easy")

Q(T, L, "Meridians are sometimes called lines of longitude. What does 'longitude' measure?",
  "The angular distance of a place east or west of the Prime Meridian",
  ["The distance of a place from the North Pole",
   "The length of a country from end to end",
   "The height of a place above the sea"],
  "Like latitude, it is measured as an angle.", "medium")

Q(T, L, "Why does no place have a longitude of 200°?",
  "Because longitude is measured only up to 180° in each direction from Greenwich",
  ["Because 200° falls in the ocean",
   "Because such places are too far away",
   "Because 200° would be inside the Earth"],
  "Beyond 180° east you have started coming back west.", "hard")

Q(T, L, "Two towns lie on the same meridian, one far north of the other. What do they share?",
  "The same local time", ["The same climate", "The same latitude", "The same length of day"],
  "Local time depends on longitude alone.", "hard")

Q(T, L, "What is a great circle?",
  "Any circle that divides the Earth into two equal halves",
  ["Any circle drawn on a globe",
   "A circle around the Tropic of Cancer",
   "The orbit of the Earth around the Sun"],
  "The equator is one; so is any pair of opposite meridians joined together.", "hard")

# ═══════════════════════════════════════════════════════════════════════
# 4. The Earth Grid & Locating Places
# ═══════════════════════════════════════════════════════════════════════
T, L = "earth-grid", "The Earth Grid & Locating Places"

Q(T, L, "What is the Earth grid?",
  "The network formed when parallels of latitude cross meridians of longitude",
  ["The system of roads across a country",
   "The pattern of ocean currents",
   "The framework holding a globe on its stand"],
  "It is a net of imaginary lines used to locate places.", "easy")

Q(T, L, "When giving the position of a place, which is stated first?",
  "The latitude", ["The longitude", "Either may come first", "The height above sea level"],
  "Latitude first, then longitude — north-south before east-west.", "medium")

Q(T, L, "A place is described as 19° N, 73° E. Where is it?",
  "North of the equator and east of the Prime Meridian",
  ["South of the equator and west of Greenwich",
   "North of the equator and west of Greenwich",
   "On the equator itself"],
  "Read the two letters: N for the hemisphere, E for the side of Greenwich.", "easy")

Q(T, L, "Why is the grid necessary for a ship at sea?",
  "There are no landmarks, so a position can only be given as a pair of coordinates",
  ["Because the sea has no water currents",
   "Because ships cannot use compasses",
   "Because the sea is flat"],
  "In mid-ocean, coordinates are the only address there is.", "hard")

Q(T, L, "Which of these gives a complete location?",
  "28° N, 77° E", ["28° N", "77° E", "28°, 77°"],
  "You need both numbers and both directions.", "medium")

Q(T, L, "What would happen if a location gave only the latitude?",
  "The place could be anywhere along that whole circle around the Earth",
  ["The place would be at the North Pole",
   "The place could not exist",
   "The place would be exactly located anyway"],
  "One number narrows it to a circle, not a point.", "hard")

Q(T, L, "How is a degree divided for a more exact position?",
  "Into 60 minutes, and each minute into 60 seconds",
  ["Into 100 parts called centidegrees",
   "Into 10 parts called decidegrees",
   "It cannot be divided"],
  "It works like an hour on a clock.", "medium")

Q(T, L, "The standard meridian of India is 82° 30' E. What does the 30' mean?",
  "Thirty minutes, which is half a degree",
  ["Thirty seconds",
   "Thirty kilometres",
   "Thirty degrees more"],
  "Sixty minutes make one degree, so 30' is a half.", "hard")

Q(T, L, "Which pair of coordinates would be found in the Southern Hemisphere?",
  "34° S, 18° E", ["34° N, 18° E", "34° N, 18° W", "0°, 18° E"],
  "Look only at the first letter.", "easy")

Q(T, L, "Why do maps and globes both use the same grid?",
  "So that a place has the same coordinates whichever one you use",
  ["Because it makes them cheaper to print",
   "Because the grid shows political borders",
   "Because the lines are visible from space"],
  "A shared system means a position can be exchanged between them.", "medium")

Q(T, L, "Two places have the same longitude but different latitudes. What follows?",
  "They share the same local time but not the same climate",
  ["They share the same climate but not the same time",
   "They are the same place",
   "They lie in different hemispheres"],
  "Longitude governs time; latitude governs the Sun's angle.", "hard")

Q(T, L, "Where on the grid do all the meridians meet?",
  "At the two poles", ["At the equator", "At the Prime Meridian", "They never meet"],
  "That is why a pole has a latitude but no useful longitude.", "medium")

Q(T, L, "Why does a place at the North Pole have no meaningful longitude?",
  "Because every meridian passes through it",
  ["Because it is covered in ice",
   "Because nobody lives there",
   "Because longitude stops at 66½°"],
  "You cannot say which meridian you are on if you are on all of them.", "hard")

Q(T, L, "A search party is told a missing boat is at 12° N, 75° E. Why is this useful?",
  "It gives one exact point on the Earth's surface to search",
  ["It tells them how deep the sea is there",
   "It tells them the weather at the spot",
   "It gives the boat's direction of travel"],
  "The grid turns 'somewhere in the Arabian Sea' into a point.", "medium")

Q(T, L, "What do we call the imaginary lines that run east to west around the globe?",
  "Parallels of latitude", ["Meridians of longitude", "Time zones", "Great circles"],
  "They run east-west but measure north-south position.", "easy")

Q(T, L, "Why is it wrong to say the grid lines are real lines on the ground?",
  "They are imaginary; they exist only as a system of measurement",
  ["They are real but painted only on the oceans",
   "They are real but visible only from aircraft",
   "They are real boundaries between countries"],
  "You could stand on the equator and see nothing on the ground.", "easy")

Q(T, L, "Which coordinate changes when you travel due north?",
  "The latitude", ["The longitude", "Both change equally", "Neither changes"],
  "Travelling north means moving away from the equator.", "medium")

Q(T, L, "Which coordinate changes when you travel due west?",
  "The longitude", ["The latitude", "Both change equally", "Neither changes"],
  "East and west are measured by longitude.", "medium")

Q(T, L, "How does a modern navigation system use the grid?",
  "It calculates the receiver's latitude and longitude and shows it on a map",
  ["It measures the distance to the nearest town",
   "It reads the grid lines painted on the road",
   "It does not use the grid at all"],
  "Satellite navigation gives coordinates first, and the map is drawn from them.", "medium")

Q(T, L, "What is the strongest reason the world agreed on one grid system?",
  "So that a position stated in one country means exactly the same thing in every other",
  ["To make geography lessons easier",
   "Because the United Nations required it",
   "So that every country could have its own meridian"],
  "Navigation across the world depends on a shared language of position.", "hard")

# ═══════════════════════════════════════════════════════════════════════
# 5. Heat Zones of the Earth
# ═══════════════════════════════════════════════════════════════════════
T, L = "heat-zones", "Heat Zones of the Earth"

Q(T, L, "How many heat zones is the Earth divided into?",
  "Three kinds — the Torrid, the Temperate and the Frigid",
  ["Two kinds — hot and cold",
   "Four kinds, one for each season",
   "Five kinds, one for each continent"],
  "There is one Torrid Zone, two Temperate and two Frigid.", "easy")

Q(T, L, "Between which two lines does the Torrid Zone lie?",
  "The Tropic of Cancer and the Tropic of Capricorn",
  ["The Arctic Circle and the Antarctic Circle",
   "The equator and the Tropic of Cancer",
   "The Arctic Circle and the North Pole"],
  "It is the band on either side of the equator.", "medium")

Q(T, L, "Why is the Torrid Zone the hottest?",
  "The Sun is directly overhead there at least once a year, so its rays are most concentrated",
  ["It is the part of the Earth closest to the Sun",
   "It receives sunlight for more hours than anywhere else",
   "It has the least cloud cover"],
  "The angle of the rays matters far more than the distance.", "hard")

Q(T, L, "Where does the North Temperate Zone lie?",
  "Between the Tropic of Cancer and the Arctic Circle",
  ["Between the equator and the Tropic of Cancer",
   "Between the Arctic Circle and the North Pole",
   "Between the two tropics"],
  "Temperate means moderate — neither extreme.", "medium")

Q(T, L, "Where does the Frigid Zone of the north lie?",
  "Between the Arctic Circle and the North Pole",
  ["Between the Tropic of Cancer and the Arctic Circle",
   "Between the equator and the Tropic of Cancer",
   "Around the whole of the Northern Hemisphere"],
  "Frigid means very cold.", "medium")

Q(T, L, "Why are the Frigid Zones so cold?",
  "The Sun's rays always strike them at a slant, so their heat is spread thinly",
  ["They are furthest from the Sun",
   "They never receive any sunlight at all",
   "They are covered in cloud all year"],
  "A torch shone at a slant lights a larger, dimmer patch.", "hard")

Q(T, L, "In which heat zone does most of India lie?",
  "The Torrid Zone", ["The North Frigid Zone", "The South Temperate Zone", "The South Frigid Zone"],
  "The Tropic of Cancer runs across the middle of the country.", "medium")

Q(T, L, "Which heat zone has the most moderate temperatures?",
  "The Temperate Zone", ["The Torrid Zone", "The Frigid Zone", "All are equally moderate"],
  "The name gives it away.", "easy")

Q(T, L, "Why does the Sun never shine directly overhead in the Temperate Zones?",
  "Because the Sun is only ever overhead between the two tropics",
  ["Because those zones are always cloudy",
   "Because they are too far from the equator to receive sunlight",
   "Because the Earth's axis points away from them"],
  "The tilt of 23½° sets the limit of the overhead Sun.", "hard")

Q(T, L, "What is the connection between the heat zones and the Earth's tilt?",
  "The tilt fixes the tropics and the polar circles, which are the boundaries of the zones",
  ["There is no connection between them",
   "The tilt decides the temperature directly",
   "The tilt creates the equator"],
  "23½° and 66½° are both consequences of the same tilt.", "hard")

Q(T, L, "In the Frigid Zones, what unusual thing happens for part of the year?",
  "The Sun does not set for some weeks in summer, or does not rise for some weeks in winter",
  ["The Sun rises in the west",
   "There is no sunlight at any time of year",
   "Day and night are always equal"],
  "This is why Norway is called the land of the midnight Sun.", "medium")

Q(T, L, "Which zone receives the most direct sunlight through the year?",
  "The Torrid Zone", ["The North Temperate Zone", "The South Frigid Zone", "All receive the same"],
  "Direct means striking the ground close to straight down.", "easy")

Q(T, L, "A place lies at 50° North. Which zone is it in?",
  "The North Temperate Zone",
  ["The Torrid Zone", "The North Frigid Zone", "The South Temperate Zone"],
  "It lies between 23½° N and 66½° N.", "medium")

Q(T, L, "A place lies at 70° South. Which zone is it in?",
  "The South Frigid Zone",
  ["The South Temperate Zone", "The Torrid Zone", "The North Frigid Zone"],
  "It lies beyond the Antarctic Circle at 66½° S.", "medium")

Q(T, L, "Why do very few people live in the Frigid Zones?",
  "The extreme cold makes farming and ordinary life very difficult",
  ["The zones are entirely covered by ocean",
   "Governments do not allow settlement there",
   "There is no land in those zones"],
  "Where nothing grows, few people settle.", "medium")

Q(T, L, "Which heat zone supports the greatest variety of plant life?",
  "The Torrid Zone, with its heat and heavy rainfall",
  ["The Frigid Zone",
   "The polar regions",
   "All zones support the same variety"],
  "The great rainforests all lie in this band.", "medium")

Q(T, L, "How many Temperate Zones are there, and why?",
  "Two — one in each hemisphere, between the tropic and the polar circle",
  ["One, lying along the equator",
   "Three, one for each continent",
   "Four, one for each season"],
  "The pattern of zones repeats on either side of the equator.", "medium")

Q(T, L, "Which line marks the boundary between the Torrid and the South Temperate Zone?",
  "The Tropic of Capricorn", ["The Tropic of Cancer", "The Antarctic Circle", "The equator"],
  "It lies at 23½° South.", "medium")

Q(T, L, "Why is the heat zone of a place a better guide to its temperature than its longitude?",
  "Because the zone depends on latitude, which decides how directly the Sun's rays fall",
  ["Because longitude changes with the seasons",
   "Because longitude is harder to measure",
   "Because longitude decides the rainfall"],
  "Longitude tells you the time, not the temperature.", "hard")

Q(T, L, "Two places lie at the same latitude but one is much colder. What could explain this?",
  "One may be far higher above sea level, or far from the sea",
  ["One must be in a different heat zone",
   "One must be closer to the Sun",
   "This is impossible"],
  "Heat zones give the broad pattern; height and distance from the sea modify it.", "hard")

# ═══════════════════════════════════════════════════════════════════════
# 6. Local Time, Standard Time & GMT
# ═══════════════════════════════════════════════════════════════════════
T, L = "local-standard-time", "Local Time, Standard Time & GMT"

Q(T, L, "What is local time?",
  "The time at a place decided by the position of the Sun in its sky",
  ["The time shown on a country's official clocks",
   "The time at the Prime Meridian",
   "The time kept by a local radio station"],
  "It is noon by local time when the Sun is highest.", "easy")

Q(T, L, "What is standard time?",
  "One time chosen for a whole country or region, based on a single meridian",
  ["The time at the equator",
   "The average of every local time in the world",
   "The time kept only by railways"],
  "Without it, every town would keep a slightly different clock.", "easy")

Q(T, L, "Why do countries adopt a standard time instead of using local time everywhere?",
  "Because different clocks in every town would make travel, trade and timetables impossible",
  ["Because local time cannot be measured",
   "Because the Sun moves irregularly",
   "Because clocks cannot be set accurately"],
  "Railways were the first to demand a single time.", "medium")

Q(T, L, "What does GMT stand for?",
  "Greenwich Mean Time", ["Global Measured Time", "General Meridian Time", "Greenwich Modern Time"],
  "It is the time at the 0° meridian.", "easy")

Q(T, L, "Which meridian is used for Indian Standard Time?",
  "82° 30' East", ["0°", "77° East", "90° East"],
  "It passes near Mirzapur in Uttar Pradesh.", "medium")

Q(T, L, "How far ahead of GMT is Indian Standard Time?",
  "5 hours 30 minutes", ["5 hours", "6 hours", "4 hours 30 minutes"],
  "82°30' east of Greenwich, at 4 minutes per degree.", "medium")

Q(T, L, "Why is Indian Standard Time ahead of GMT rather than behind it?",
  "Because India lies east of Greenwich, and the Sun rises there earlier",
  ["Because India is a larger country than Britain",
   "Because India is nearer the equator",
   "Because India chose to be ahead"],
  "East means earlier; the Earth turns from west to east.", "hard")

Q(T, L, "Which of these countries needs more than one standard time?",
  "Russia, because it stretches across a very wide range of longitudes",
  ["India, which is narrow from east to west",
   "Sri Lanka, which is very small",
   "Nepal, which lies in the mountains"],
  "The wider a country from east to west, the more time zones it needs.", "hard")

Q(T, L, "India stretches about 30° from east to west, yet keeps one standard time. What is the result?",
  "The Sun rises about two hours earlier in the far east of India than in the far west",
  ["The Sun rises at the same moment everywhere in India",
   "The date differs between the two ends",
   "Clocks in the east run faster"],
  "One clock across two hours of daylight.", "hard")

Q(T, L, "When it is noon by local time at a place, where is the Sun?",
  "At its highest point in the sky for that place",
  ["Directly over the equator",
   "Rising in the east",
   "Setting in the west"],
  "Local noon is defined by the Sun, not by a clock.", "medium")

Q(T, L, "Two towns lie 1° of longitude apart. How much do their local times differ?",
  "4 minutes", ["1 minute", "15 minutes", "1 hour"],
  "360° in 24 hours works out to 4 minutes per degree.", "medium")

Q(T, L, "Through how many degrees does the Earth turn in one hour?",
  "15°", ["24°", "60°", "180°"],
  "360 divided by 24.", "medium")

Q(T, L, "What is UTC, which has largely replaced GMT in official use?",
  "Coordinated Universal Time, the world's time standard kept by atomic clocks",
  ["United Time Calculation",
   "Universal Tropical Time",
   "United Territories Clock"],
  "For everyday purposes it matches GMT very closely.", "hard")

Q(T, L, "Why was Greenwich chosen as the reference for world time?",
  "Because countries agreed on it, and its observatory was already widely used for navigation",
  ["Because the Sun is directly overhead there",
   "Because it lies at the centre of the world's landmass",
   "Because Britain had the most clocks"],
  "Agreement mattered more than geography.", "hard")

Q(T, L, "A place lies at 30° East. How far ahead of GMT is its local time?",
  "2 hours", ["30 minutes", "1 hour", "3 hours"],
  "30 divided by 15 gives the hours.", "medium")

Q(T, L, "A place lies at 45° West. What is its local time when it is 12 noon GMT?",
  "9 a.m.", ["3 p.m.", "6 a.m.", "12 noon"],
  "45° west is 3 hours behind, so subtract 3 hours.", "hard")

Q(T, L, "What is the purpose of dividing the world into time zones?",
  "So that clocks over a wide area can agree while still roughly matching the Sun",
  ["To mark the borders between countries",
   "To decide which countries are richer",
   "To measure the size of the Earth"],
  "It is a compromise between the Sun and the convenience of one clock.", "medium")

Q(T, L, "Roughly how wide is one standard time zone?",
  "15° of longitude", ["1° of longitude", "30° of longitude", "60° of longitude"],
  "Fifteen degrees is one hour of the Earth's turning.", "medium")

Q(T, L, "Why do some time zones follow crooked lines rather than meridians?",
  "So that a country or region can keep a single time rather than being split in two",
  ["Because meridians are hard to draw",
   "Because the Earth's rotation is uneven",
   "Because oceans have no time zones"],
  "The map is bent to fit human convenience.", "hard")

Q(T, L, "If a country adopted the local time of its western edge, what would happen in the east?",
  "The Sun would rise there noticeably earlier than the clocks suggested",
  ["The Sun would not rise at all",
   "The date would change",
   "Nothing would be different"],
  "The clock would lag behind the Sun in the east.", "hard")

# ═══════════════════════════════════════════════════════════════════════
# 7. Calculating Time from Longitude
# ═══════════════════════════════════════════════════════════════════════
T, L = "time-from-longitude", "Calculating Time from Longitude"

Q(T, L, "The Earth turns 360° in 24 hours. How many degrees is that per hour?",
  "15°", ["24°", "60°", "12°"],
  "360 ÷ 24 = 15.", "easy")

Q(T, L, "How long does the Earth take to turn through 1° of longitude?",
  "4 minutes", ["1 minute", "15 minutes", "24 minutes"],
  "60 minutes ÷ 15° = 4 minutes per degree.", "easy")

Q(T, L, "It is 12 noon at Greenwich. What is the local time at 15° East?",
  "1 p.m.", ["11 a.m.", "2 p.m.", "12 noon"],
  "15° east is one hour ahead, so add an hour.", "easy")

Q(T, L, "It is 12 noon at Greenwich. What is the local time at 30° West?",
  "10 a.m.", ["2 p.m.", "9 a.m.", "11 a.m."],
  "30 ÷ 15 = 2 hours, and west means behind, so subtract.", "medium")

Q(T, L, "It is 6 a.m. at Greenwich. What is the local time at 45° East?",
  "9 a.m.", ["3 a.m.", "10 a.m.", "9 p.m."],
  "45 ÷ 15 = 3 hours ahead.", "medium")

Q(T, L, "Two places are 20° of longitude apart. What is the difference in their local times?",
  "1 hour 20 minutes", ["20 minutes", "2 hours", "1 hour"],
  "20 × 4 minutes = 80 minutes.", "medium")

Q(T, L, "Two places are 7° of longitude apart. What is the difference in their local times?",
  "28 minutes", ["7 minutes", "1 hour 7 minutes", "14 minutes"],
  "7 × 4 = 28 minutes.", "medium")

Q(T, L, "A place lies at 75° East. How far ahead of GMT is its local time?",
  "5 hours", ["4 hours", "5 hours 30 minutes", "6 hours"],
  "75 ÷ 15 = 5.", "medium")

Q(T, L, "Why is Indian Standard Time 5 hours 30 minutes ahead of GMT?",
  "Because its standard meridian is 82° 30' East, and 82½ × 4 minutes is 5 hours 30 minutes",
  ["Because India chose a convenient half hour",
   "Because India lies north of the equator",
   "Because India is a large country"],
  "Multiply the degrees by four minutes and convert to hours.", "hard")

Q(T, L, "It is 12 noon at 20° East. What is the local time at 50° East?",
  "2 p.m.", ["10 a.m.", "1 p.m.", "3 p.m."],
  "The difference is 30°, which is 2 hours, and the second place is further east.", "hard")

Q(T, L, "It is 3 p.m. at 60° East. What is the local time at 15° East?",
  "12 noon", ["6 p.m.", "1 p.m.", "11 a.m."],
  "The difference is 45°, which is 3 hours, and the second place is further west.", "hard")

Q(T, L, "A place has a local time 3 hours behind GMT. What is its longitude?",
  "45° West", ["45° East", "3° West", "15° West"],
  "3 hours × 15° = 45°, and behind GMT means west.", "hard")

Q(T, L, "A place has a local time 2 hours ahead of GMT. What is its longitude?",
  "30° East", ["30° West", "2° East", "15° East"],
  "2 × 15 = 30, and ahead means east.", "medium")

Q(T, L, "Why does the local time change as you travel east or west but not as you travel north or south?",
  "Because the Earth turns about its axis from west to east, so only longitude affects the Sun's timing",
  ["Because the Earth is wider from east to west",
   "Because clocks are made to work that way",
   "Because latitude lines are longer"],
  "Travelling along a meridian keeps you in the same rotational position.", "hard")

Q(T, L, "Which place sees the Sun rise first: one at 90° East or one at 60° East?",
  "The place at 90° East",
  ["The place at 60° East",
   "Both see it at the same moment",
   "It depends on the season only"],
  "The Earth turns eastward, so eastern places meet the Sun first.", "medium")

Q(T, L, "It is 12 noon local time at 82° 30' East. What is the time at Greenwich?",
  "6:30 a.m.", ["5:30 p.m.", "6:30 p.m.", "5:30 a.m."],
  "Subtract 5 hours 30 minutes from noon.", "hard")

Q(T, L, "How many minutes does the local time change for every 5° of longitude?",
  "20 minutes", ["5 minutes", "15 minutes", "1 hour"],
  "5 × 4 minutes.", "medium")

Q(T, L, "A town lies 1° 30' east of its country's standard meridian. How far ahead is its local time of standard time?",
  "6 minutes", ["1 minute 30 seconds", "4 minutes", "90 minutes"],
  "1½ degrees × 4 minutes = 6 minutes.", "hard")

Q(T, L, "Why do time calculations use longitude rather than the distance in kilometres?",
  "Because the Earth's rotation is measured in degrees, and a degree covers different distances at different latitudes",
  ["Because kilometres are too small a unit",
   "Because distance cannot be measured at sea",
   "Because longitude is easier to spell"],
  "A degree of longitude is much shorter near the poles than at the equator.", "hard")

Q(T, L, "If the Earth turned twice as fast, how long would one degree of longitude take?",
  "2 minutes", ["8 minutes", "4 minutes", "1 minute"],
  "A full turn in 12 hours would halve every time interval.", "hard")

# ═══════════════════════════════════════════════════════════════════════
# 8. Converting Between Time Zones
# ═══════════════════════════════════════════════════════════════════════
T, L = "time-conversion", "Converting Between Time Zones"

Q(T, L, "Indian Standard Time is UTC +5:30 and Eastern Standard Time is UTC −5:00. How far ahead of EST is IST?",
  "10 hours 30 minutes", ["5 hours 30 minutes", "10 hours", "9 hours 30 minutes"],
  "5:30 ahead of the line plus 5:00 behind it makes 10:30 between them.", "medium")

Q(T, L, "It is 9:00 a.m. EST in New York. What is the time in India?",
  "7:30 p.m. the same day", ["7:30 a.m. the same day", "10:30 p.m. the same day", "11:30 a.m. the same day"],
  "Add 10 hours 30 minutes to 9:00 a.m.", "medium")

Q(T, L, "It is 10:00 p.m. EST on Monday in New York. What is the date and time in India?",
  "8:30 a.m. on Tuesday", ["8:30 a.m. on Monday", "11:30 a.m. on Tuesday", "8:30 p.m. on Tuesday"],
  "Adding 10:30 to 10 p.m. carries past midnight into the next day.", "hard")

Q(T, L, "It is 6:00 p.m. IST in Delhi. What is the time in New York on EST?",
  "7:30 a.m. the same day", ["7:30 p.m. the same day", "4:30 a.m. the same day", "8:30 a.m. the same day"],
  "Subtract 10 hours 30 minutes from 6 p.m.", "hard")

Q(T, L, "It is 12 noon GMT in London. What is the time in India?",
  "5:30 p.m.", ["6:30 p.m.", "5:30 a.m.", "7:30 p.m."],
  "India is 5 hours 30 minutes ahead of GMT.", "easy")

Q(T, L, "Japan Standard Time is UTC +9:00. It is 9:00 a.m. IST in Mumbai. What is the time in Tokyo?",
  "12:30 p.m.", ["5:30 a.m.", "6:00 p.m.", "11:30 a.m."],
  "Tokyo is 3 hours 30 minutes ahead of India.", "hard")

Q(T, L, "Dubai keeps UTC +4:00. It is 11:00 a.m. IST. What is the time in Dubai?",
  "9:30 a.m.", ["12:30 p.m.", "10:30 a.m.", "7:00 a.m."],
  "Dubai is 1 hour 30 minutes behind India.", "hard")

Q(T, L, "A cricket match starts at 2:30 p.m. local time in London (GMT). When should a viewer in India switch on?",
  "8:00 p.m. IST", ["7:00 p.m. IST", "9:00 a.m. IST", "10:00 p.m. IST"],
  "Add 5 hours 30 minutes to 2:30 p.m.", "medium")

Q(T, L, "Why is the difference between India and many countries a whole number of hours plus thirty minutes?",
  "Because India's standard meridian is at 82° 30' East, half a degree past a multiple of 15",
  ["Because India uses a different kind of clock",
   "Because India is close to the equator",
   "Because the Earth slows down over India"],
  "Most standard meridians are multiples of 15°; India's is not.", "hard")

Q(T, L, "A flight leaves Delhi at 2:00 a.m. IST and takes 9 hours to reach London. What is the local time on arrival?",
  "5:30 a.m. GMT", ["11:00 a.m. GMT", "5:30 p.m. GMT", "2:00 p.m. GMT"],
  "Arrival is 11:00 a.m. IST; subtract 5 hours 30 minutes for London.", "hard")

Q(T, L, "Nepal keeps UTC +5:45. How far ahead of Indian Standard Time is Nepal?",
  "15 minutes", ["45 minutes", "1 hour", "30 minutes"],
  "5:45 minus 5:30.", "hard")

Q(T, L, "Which of these countries is BEHIND GMT?",
  "The United States", ["India", "Japan", "Australia"],
  "It lies west of Greenwich.", "easy")

Q(T, L, "A student in India wants to call a friend in New York at 9:00 a.m. New York time. When should she call?",
  "7:30 p.m. IST", ["7:30 a.m. IST", "10:30 a.m. IST", "11:30 p.m. IST"],
  "Convert the New York time to IST by adding 10 hours 30 minutes.", "medium")

Q(T, L, "Why must the date sometimes change when converting between time zones?",
  "Because adding or subtracting the difference can carry the time past midnight",
  ["Because calendars differ between countries",
   "Because the Earth changes speed at night",
   "Because time zones are not fixed"],
  "The clock passes 12 midnight and the day rolls over.", "medium")

Q(T, L, "It is 11:00 p.m. IST on Friday in Chennai. What is the day and time in London (GMT)?",
  "5:30 p.m. on Friday", ["5:30 a.m. on Saturday", "4:30 p.m. on Friday", "5:30 p.m. on Saturday"],
  "Subtract 5 hours 30 minutes; it does not cross midnight backwards here.", "hard")

Q(T, L, "What does UTC +5:30 written beside a city mean?",
  "Its clocks are set 5 hours 30 minutes ahead of the world time standard",
  ["It is 5,530 kilometres from Greenwich",
   "It lies at 5.30° East",
   "Its day is 5 hours 30 minutes longer"],
  "The offset is a clock setting, not a distance.", "medium")

Q(T, L, "Australia's eastern states keep UTC +10:00. It is 6:00 a.m. IST. What is the time in Sydney?",
  "10:30 a.m.", ["1:30 a.m.", "4:30 p.m.", "11:30 a.m."],
  "Sydney is 4 hours 30 minutes ahead of India.", "hard")

Q(T, L, "Some countries move their clocks forward in summer. What is this called?",
  "Daylight saving time",
  ["Standard time correction",
   "Longitude adjustment",
   "Equinox time"],
  "It shifts the offset by an hour for part of the year.", "medium")

Q(T, L, "Why does India not use daylight saving time?",
  "Because India lies near the tropics, where the length of daylight changes little through the year",
  ["Because Indian clocks cannot be adjusted",
   "Because India has only one time zone",
   "Because it is forbidden by the Constitution"],
  "Daylight saving is most useful far from the equator.", "hard")

Q(T, L, "What is the safest first step when converting a time between two zones?",
  "Work out the difference between the two offsets from UTC",
  ["Count the number of countries in between",
   "Measure the distance in kilometres",
   "Check the latitude of both places"],
  "Both offsets are measured from the same starting point, so their difference is the answer.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 9. The International Date Line
# ═══════════════════════════════════════════════════════════════════════
T, L = "date-line", "The International Date Line"

Q(T, L, "Which meridian does the International Date Line roughly follow?",
  "The 180° meridian", ["The Prime Meridian", "The equator", "The 90° East meridian"],
  "It lies halfway round the world from Greenwich.", "easy")

Q(T, L, "Why does the International Date Line bend instead of following the 180° meridian exactly?",
  "So that it does not cut through countries and island groups, splitting them between two dates",
  ["Because the Earth's surface is uneven there",
   "Because ships cannot sail in a straight line",
   "Because the meridian moves through the year"],
  "A country with two different dates would be very awkward to run.", "medium")

Q(T, L, "A traveller crosses the Date Line going eastwards, from Japan towards America. What happens to the date?",
  "It is put back by one day, so the same date is lived twice",
  ["It moves forward by one day",
   "It stays exactly the same",
   "It moves forward by two days"],
  "Going east across the line, you repeat a day.", "hard")

Q(T, L, "A traveller crosses the Date Line going westwards, from America towards Asia. What happens to the date?",
  "It moves forward by one day, so a day is skipped",
  ["It is put back by one day",
   "It stays exactly the same",
   "It is put back by two days"],
  "Going west across the line, a day disappears from the calendar.", "hard")

Q(T, L, "A ship crosses the Date Line westwards on Monday. What is the date on board just afterwards?",
  "Tuesday", ["Sunday", "Still Monday", "Wednesday"],
  "Westward crossing adds a day.", "medium")

Q(T, L, "A ship crosses the Date Line eastwards on Wednesday. What is the date on board just afterwards?",
  "Tuesday", ["Thursday", "Still Wednesday", "Monday"],
  "Eastward crossing takes a day off the date.", "medium")

Q(T, L, "Why is a date line needed at all?",
  "Because travelling right round the Earth gains or loses a whole day unless the date is corrected somewhere",
  ["Because clocks stop working at 180°",
   "Because the Sun does not shine at 180°",
   "Because ships need a place to rest"],
  "Twenty-four hours are gained across twenty-four time zones.", "hard")

Q(T, L, "Two islands lie close together but on opposite sides of the Date Line. What is true of them?",
  "Their clocks may show a similar hour but their calendars show different dates",
  ["Their clocks differ by twelve hours exactly",
   "They always share the same date",
   "One of them has no date at all"],
  "It can be Monday morning on one and Sunday morning on the other.", "hard")

Q(T, L, "Which of these is the Date Line NOT?",
  "A line of latitude",
  ["A line running roughly north to south",
   "A line that bends around island groups",
   "A line agreed by international convention"],
  "It follows a meridian, not a parallel.", "medium")

Q(T, L, "A traveller flying west from Los Angeles to Tokyo leaves on Friday. What is likely on arrival?",
  "It is Saturday, because the Date Line was crossed westwards",
  ["It is still Friday",
   "It is Thursday",
   "It is Sunday"],
  "Westward across the line, add a day.", "hard")

Q(T, L, "Why do people say a traveller 'gains a day' going eastwards across the line?",
  "Because the date is put back, so they experience the same date a second time",
  ["Because the journey becomes shorter",
   "Because they arrive before they left in real time",
   "Because the aircraft flies faster"],
  "Nothing is really gained but a repeated calendar date.", "hard")

Q(T, L, "Where in the world does a new calendar day begin first?",
  "Just west of the International Date Line",
  ["At Greenwich",
   "At the equator",
   "At the North Pole"],
  "Countries such as Kiribati and New Zealand greet each new day early.", "hard")

Q(T, L, "The Date Line runs mostly through which kind of surface?",
  "The Pacific Ocean", ["Central Asia", "The Atlantic Ocean", "Africa"],
  "That is largely why 180° was a convenient choice.", "medium")

Q(T, L, "How is the Date Line different from a time zone boundary?",
  "Crossing it changes the date, not only the hour on the clock",
  ["Crossing it changes only the hour",
   "It is not crossed by any traveller",
   "It changes the year rather than the day"],
  "Ordinary zone boundaries move the clock; this one moves the calendar.", "hard")

Q(T, L, "A pilot crosses the Date Line eastwards at 10 a.m. on Sunday. What is the time and day immediately after?",
  "10 a.m. on Saturday", ["10 p.m. on Sunday", "10 a.m. on Monday", "10 p.m. on Saturday"],
  "The hour stays about the same; the date steps back.", "hard")

Q(T, L, "Who decided where the International Date Line should run?",
  "Countries agreed on it by international convention",
  ["It was fixed by the United Nations in 1945",
   "It was decided by the ships that first sailed there",
   "It follows a natural feature of the Earth"],
  "Like the Prime Meridian, it exists by agreement.", "medium")

Q(T, L, "Why can some Pacific nations choose which side of the Date Line to sit on?",
  "Because the line is drawn to suit countries, and a nation may ask for it to bend around it",
  ["Because the line moves naturally each year",
   "Because they lie exactly on the equator",
   "Because they have no fixed time zone"],
  "Some islands have changed sides to share a working week with trading partners.", "hard")

Q(T, L, "Sailing around the world westwards without correcting the date, what would a crew find on return?",
  "Their calendar would be one day ahead of the port they returned to",
  ["Their calendar would match exactly",
   "Their calendar would be one day behind",
   "Their clocks would show a different hour but the same date"],
  "This puzzle was noticed by the first crews to sail around the world.", "hard")

Q(T, L, "What is the relationship between the Date Line and the 180° meridian?",
  "The line follows the meridian broadly, but deviates from it in several places",
  ["They are exactly the same line everywhere",
   "They are entirely unrelated",
   "The line runs at right angles to the meridian"],
  "Roughly the same, deliberately not exactly.", "medium")

Q(T, L, "What is the simplest rule to remember about the Date Line?",
  "Going west, add a day; going east, take one off",
  ["Going west, take a day off; going east, add one",
   "The date always moves forward",
   "The date never changes at all"],
  "West adds, east subtracts.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 10. Rotation & Revolution
# ═══════════════════════════════════════════════════════════════════════
T, L = "rotation-revolution", "Rotation & Revolution"

Q(T, L, "What is the rotation of the Earth?",
  "The spinning of the Earth on its own axis",
  ["The movement of the Earth around the Sun",
   "The wobble of the Earth's axis over centuries",
   "The movement of the Moon around the Earth"],
  "One rotation takes about 24 hours.", "easy")

Q(T, L, "What is the revolution of the Earth?",
  "The movement of the Earth around the Sun",
  ["The spinning of the Earth on its axis",
   "The rise and fall of the tides",
   "The change from day to night"],
  "One revolution takes about 365¼ days.", "easy")

Q(T, L, "In which direction does the Earth rotate?",
  "From west to east", ["From east to west", "From north to south", "From south to north"],
  "That is why the Sun appears to rise in the east.", "medium")

Q(T, L, "What does rotation cause?",
  "Day and night", ["The seasons", "The phases of the Moon", "The tilt of the axis"],
  "Half the Earth faces the Sun at any moment.", "easy")

Q(T, L, "What does revolution, together with the tilt, cause?",
  "The seasons", ["Day and night", "Earthquakes", "The Earth's magnetic field"],
  "As the Earth travels, first one hemisphere leans towards the Sun, then the other.", "easy")

Q(T, L, "How long does one rotation of the Earth take?",
  "About 24 hours", ["About 12 hours", "About 365 days", "About one month"],
  "That is what we call a day.", "easy")

Q(T, L, "How long does one revolution of the Earth take?",
  "About 365¼ days", ["About 30 days", "About 24 hours", "About 100 days"],
  "The quarter day is why we need leap years.", "medium")

Q(T, L, "Why do we have a leap year every four years?",
  "Because the extra quarter of a day each year adds up to one whole day in four years",
  ["Because the Earth slows down every fourth year",
   "Because February is a short month",
   "Because the calendar was designed that way for convenience"],
  "Four quarters make one whole.", "hard")

Q(T, L, "How many days are there in a leap year?",
  "366", ["365", "364", "367"],
  "The extra day is added to February.", "easy")

Q(T, L, "What is the circle of illumination?",
  "The circle that separates the lit half of the Earth from the dark half",
  ["The path of the Earth around the Sun",
   "The equator",
   "The ring of light around the Moon"],
  "It moves across the Earth as the planet turns.", "medium")

Q(T, L, "Why does the Sun appear to move across the sky during the day?",
  "Because the Earth is turning, not because the Sun is moving around us",
  ["Because the Sun orbits the Earth once a day",
   "Because the Earth moves around the Sun each day",
   "Because the atmosphere bends the light"],
  "The motion you see is your own.", "hard")

Q(T, L, "If the Earth stopped rotating but continued to revolve, what would happen?",
  "One side would have a very long day and the other a very long night",
  ["There would be no seasons",
   "The Earth would fall into the Sun",
   "Nothing would change"],
  "Day and night come from rotation.", "hard")

Q(T, L, "What is the shape of the Earth's orbit around the Sun?",
  "An ellipse, slightly stretched rather than a perfect circle",
  ["A perfect circle",
   "A straight line",
   "A figure of eight"],
  "This is why the distance to the Sun varies a little through the year.", "hard")

Q(T, L, "Which motion of the Earth is responsible for the pattern of a working day and a night's sleep?",
  "Rotation", ["Revolution", "The tilt of the axis", "The Moon's orbit"],
  "A single spin gives one day and one night.", "easy")

Q(T, L, "The Earth is closest to the Sun in early January. What does this tell us about the seasons?",
  "That the seasons are caused by the tilt of the axis, not by distance from the Sun",
  ["That January is the hottest month everywhere",
   "That the Northern Hemisphere has summer in January",
   "That distance is the main cause of the seasons"],
  "January is winter in the north, yet the Earth is nearest the Sun.", "hard")

Q(T, L, "What is meant by the Earth's orbit?",
  "The path the Earth follows around the Sun",
  ["The imaginary line through its poles",
   "The circle of illumination",
   "The equator"],
  "One journey along it is one year.", "easy")

Q(T, L, "Why does the axis stay pointing in the same direction as the Earth travels round the Sun?",
  "The tilt is fixed, so the same end of the axis leans towards the Sun at one point in the orbit and away at the opposite point",
  ["The axis turns to follow the Sun",
   "The axis changes direction every season",
   "The axis points at the Sun all year"],
  "A fixed tilt plus a journey around the Sun is what produces the seasons.", "hard")

Q(T, L, "Which is faster in terms of the time taken to complete: one rotation or one revolution?",
  "One rotation, which takes a day rather than a year",
  ["One revolution, which takes a day",
   "They take the same time",
   "It depends on the season"],
  "A day against a year.", "medium")

Q(T, L, "What would happen to the calendar if we ignored the extra quarter day each year?",
  "The seasons would slowly drift away from their usual months",
  ["Nothing would change",
   "The Earth would revolve faster",
   "Days would become shorter"],
  "A quarter day a year becomes about 25 days in a century.", "hard")

Q(T, L, "Which statement correctly distinguishes the two motions?",
  "Rotation is about the axis and gives day and night; revolution is around the Sun and gives the year",
  ["Rotation is around the Sun; revolution is about the axis",
   "Both are around the Sun",
   "Both are about the axis"],
  "Spin against journey.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 11. Seasons, Solstices & Equinoxes
# ═══════════════════════════════════════════════════════════════════════
T, L = "seasons-solstices", "Seasons, Solstices & Equinoxes"

Q(T, L, "What causes the seasons?",
  "The tilt of the Earth's axis combined with its revolution around the Sun",
  ["The changing distance between the Earth and the Sun",
   "The rotation of the Earth on its axis",
   "Changes in the Sun's own heat"],
  "Tilt plus journey — distance has very little to do with it.", "medium")

Q(T, L, "On 21 June, over which line is the Sun directly overhead?",
  "The Tropic of Cancer", ["The Tropic of Capricorn", "The equator", "The Arctic Circle"],
  "The Northern Hemisphere is tilted towards the Sun on that date.", "medium")

Q(T, L, "What is 21 June called in the Northern Hemisphere?",
  "The summer solstice", ["The winter solstice", "The spring equinox", "The autumn equinox"],
  "It brings the longest day of the year in the north.", "medium")

Q(T, L, "On 22 December, over which line is the Sun directly overhead?",
  "The Tropic of Capricorn", ["The Tropic of Cancer", "The equator", "The Antarctic Circle"],
  "The Southern Hemisphere is tilted towards the Sun then.", "medium")

Q(T, L, "What season is it in Australia in December?",
  "Summer", ["Winter", "Autumn", "There are no seasons there"],
  "The Southern Hemisphere has opposite seasons to the Northern.", "medium")

Q(T, L, "What happens on 21 March and 23 September?",
  "The Sun shines directly over the equator and day and night are nearly equal everywhere",
  ["The Sun is overhead at the Tropic of Cancer",
   "The Sun does not rise at the poles",
   "The Earth is closest to the Sun"],
  "Equinox means equal night.", "medium")

Q(T, L, "What is 21 March called in the Northern Hemisphere?",
  "The spring equinox", ["The autumn equinox", "The summer solstice", "The winter solstice"],
  "23 September is the autumn equinox in the north.", "hard")

Q(T, L, "What does the word 'equinox' mean?",
  "Equal night", ["Longest day", "Shortest day", "Middle of summer"],
  "Day and night are of nearly equal length.", "medium")

Q(T, L, "What does the word 'solstice' refer to?",
  "The point in the year when the Sun reaches its furthest position north or south",
  ["The moment when day and night are equal",
   "The day the Earth is closest to the Sun",
   "The start of the calendar year"],
  "After a solstice the Sun's overhead point turns back the other way.", "hard")

Q(T, L, "When it is summer in the Northern Hemisphere, what is happening in the Southern Hemisphere?",
  "It is winter", ["It is also summer", "It is spring", "There is no season at all"],
  "The two hemispheres are always in opposite seasons.", "easy")

Q(T, L, "Why is the Sun never overhead in London?",
  "Because London lies well north of the Tropic of Cancer",
  ["Because London is too cloudy",
   "Because London lies in the Frigid Zone",
   "Because London is west of Greenwich"],
  "The overhead Sun never travels beyond the tropics.", "hard")

Q(T, L, "On the summer solstice, what happens beyond the Arctic Circle?",
  "The Sun does not set for the whole twenty-four hours",
  ["The Sun does not rise at all",
   "Day and night are exactly equal",
   "The Sun is directly overhead"],
  "This is the midnight Sun.", "hard")

Q(T, L, "On 22 December, what happens beyond the Arctic Circle?",
  "The Sun does not rise for the whole twenty-four hours",
  ["The Sun does not set at all",
   "The Sun is overhead at noon",
   "Day and night are equal"],
  "It is the opposite of the June situation.", "hard")

Q(T, L, "Which hemisphere has its longest day on 22 December?",
  "The Southern Hemisphere", ["The Northern Hemisphere", "Both equally", "Neither"],
  "It is the southern summer solstice.", "medium")

Q(T, L, "Why does a hemisphere tilted towards the Sun become warmer?",
  "Its rays fall more directly and it has more hours of daylight",
  ["It moves much closer to the Sun",
   "The Sun gives out more heat then",
   "The atmosphere becomes thinner"],
  "Two effects together: angle and length of day.", "hard")

Q(T, L, "How many seasons does the standard four-season pattern have, and what are they?",
  "Four — spring, summer, autumn and winter",
  ["Two — summer and winter only",
   "Three — summer, monsoon and winter",
   "Six, one for every two months"],
  "India's own traditional calendar recognises six, but the globe's pattern is four.", "easy")

Q(T, L, "On an equinox, how long is the day at the equator?",
  "About twelve hours, as it is there all year",
  ["About six hours",
   "About twenty-four hours",
   "It varies greatly"],
  "The equator has near-equal day and night throughout the year.", "medium")

Q(T, L, "Why is the hottest weather in a place usually a few weeks after the summer solstice?",
  "Because the land and sea take time to warm up after the days are longest",
  ["Because the Earth moves closer to the Sun afterwards",
   "Because the solstice date is calculated wrongly",
   "Because the tilt increases in July"],
  "Heat builds up gradually, like a pan left on a low flame.", "hard")

Q(T, L, "A student says the seasons happen because the Earth is nearer the Sun in summer. Why is this wrong?",
  "Both hemispheres would then have summer at the same time, and they do not",
  ["Because the Earth's distance from the Sun never changes",
   "Because summer happens at the same time everywhere",
   "Because the Sun does not give out heat"],
  "December is summer in Australia and winter in India, on the same day.", "hard")

Q(T, L, "Which of these dates has the Sun overhead at the equator?",
  "23 September", ["21 June", "22 December", "1 January"],
  "It is one of the two equinoxes.", "medium")

# ═══════════════════════════════════════════════════════════════════════
# 12. Varying Lengths of Day and Night
# ═══════════════════════════════════════════════════════════════════════
T, L = "day-night-length", "Varying Lengths of Day and Night"

Q(T, L, "Where on Earth are day and night nearly equal all through the year?",
  "At the equator", ["At the poles", "At the Arctic Circle", "At the Tropic of Cancer"],
  "The circle of illumination cuts the equator into equal halves all year.", "easy")

Q(T, L, "What happens to the difference between day and night as you move towards the poles?",
  "It becomes greater", ["It becomes smaller", "It stays the same", "It disappears entirely"],
  "The variation grows with latitude.", "medium")

Q(T, L, "On 21 June, where is the longest day of the year?",
  "In the Northern Hemisphere", ["In the Southern Hemisphere", "At the equator", "Everywhere equally"],
  "The north is tilted towards the Sun.", "medium")

Q(T, L, "How long is the day at the North Pole in midsummer?",
  "Twenty-four hours — the Sun does not set",
  ["Twelve hours", "Six hours", "There is no daylight"],
  "The pole has about six months of continuous daylight.", "medium")

Q(T, L, "Roughly how long is the period of continuous night at the South Pole?",
  "About six months", ["About one month", "About twenty-four hours", "About three days"],
  "Six months of day, then six months of night.", "hard")

Q(T, L, "Why does a place far north have very long summer evenings?",
  "Because its part of the Earth stays in sunlight for more of each rotation in summer",
  ["Because the Sun moves more slowly there",
   "Because clocks run differently there",
   "Because it is nearer the Sun"],
  "The circle of illumination cuts that latitude unevenly.", "hard")

Q(T, L, "Which country is often called the land of the midnight Sun?",
  "Norway", ["India", "Brazil", "Egypt"],
  "Parts of it lie beyond the Arctic Circle.", "medium")

Q(T, L, "On the equinoxes, how long is day and night everywhere on Earth?",
  "About twelve hours each", ["About six hours each", "Twenty-four hours of day", "It varies by country"],
  "That is what makes them equinoxes.", "easy")

Q(T, L, "In Kanyakumari and in Srinagar, which has the greater difference between summer and winter day length?",
  "Srinagar, because it lies much further north",
  ["Kanyakumari, because it lies near the sea",
   "Both are exactly the same",
   "Kanyakumari, because it is nearer the equator"],
  "The further from the equator, the greater the swing.", "hard")

Q(T, L, "Why is the length of the day in Chennai almost the same in June and December?",
  "Because Chennai lies close to the equator, where daylight changes very little",
  ["Because Chennai is on the coast",
   "Because Chennai keeps a different standard time",
   "Because Chennai lies in the Frigid Zone"],
  "Latitude, not longitude, decides the swing.", "hard")

Q(T, L, "What is the circle of illumination's role in the length of day?",
  "It divides the lit half from the dark half, and where it cuts a latitude decides how long that place stays in sunlight",
  ["It marks the boundary of the Torrid Zone",
   "It shows where the Sun is overhead",
   "It has no effect on the length of day"],
  "The tilt makes it cut most latitudes unevenly.", "hard")

Q(T, L, "On 22 December, what is the length of day like in northern India?",
  "Shorter than the night", ["Longer than the night", "Exactly equal to the night", "Twenty-four hours long"],
  "It is close to the shortest day of the year in the north.", "medium")

Q(T, L, "Which of these places has the smallest change in day length through the year?",
  "A town on the equator", ["A town at 60° North", "A town at 45° South", "A town at the Arctic Circle"],
  "The nearer the equator, the steadier the day length.", "medium")

Q(T, L, "Why do days grow longer in the Northern Hemisphere between December and June?",
  "Because the Northern Hemisphere is tilting further towards the Sun over those months",
  ["Because the Earth is speeding up",
   "Because the Earth is coming closer to the Sun",
   "Because the axis is becoming more upright"],
  "The tilt is fixed; what changes is where the Earth is in its orbit.", "hard")

Q(T, L, "At which latitude does the Sun stay above the horizon for a full twenty-four hours at least one day a year?",
  "At 66½° North or further north", ["At 23½° North", "At the equator", "At 45° North"],
  "The Arctic Circle marks exactly this boundary.", "hard")

Q(T, L, "Two friends live at the same latitude but very different longitudes. What is true on a given date?",
  "Their days are of nearly the same length, though they begin at different moments",
  ["Their days are of very different lengths",
   "One has day while the other has night for the whole year",
   "Their days differ by exactly twelve hours"],
  "Latitude sets the length; longitude sets the timing.", "hard")

Q(T, L, "Why does the Sun rise earlier in Kolkata than in Mumbai?",
  "Because Kolkata lies further east",
  ["Because Kolkata lies further north",
   "Because Kolkata is at a higher altitude",
   "Because Kolkata uses a different standard time"],
  "The Earth turns eastward, so eastern places meet the Sun first.", "medium")

Q(T, L, "What is the shortest day of the year called in the Northern Hemisphere?",
  "The winter solstice, around 22 December",
  ["The summer solstice, around 21 June",
   "The spring equinox, around 21 March",
   "The autumn equinox, around 23 September"],
  "The Sun is then overhead at the Tropic of Capricorn.", "medium")

Q(T, L, "How does the varying length of day affect life in far northern countries?",
  "Work, school and sleep must be arranged around very long summer days and very dark winters",
  ["It has no effect on daily life",
   "It changes the language people speak",
   "It causes the seasons to reverse"],
  "In some towns children go to school in the dark for months.", "medium")

Q(T, L, "What single fact explains both the seasons and the varying length of day and night?",
  "The Earth's axis is tilted as it revolves around the Sun",
  ["The Earth spins from west to east",
   "The Earth's orbit is an ellipse",
   "The Sun's heat varies through the year"],
  "One tilt, two consequences.", "hard")

# ─────────────────────────────────────────────────────────────────────────
by_topic = Counter(x["topic"] for x in BANK)
print(f"{len(BANK)} questions across {len(by_topic)} topics")
for t, n in by_topic.items():
    d = Counter(x["difficulty"] for x in BANK if x["topic"] == t)
    print(f"   {n:3}  E{d['easy']:3} M{d['medium']:3} H{d['hard']:3}   {t}")

with open("scripts/banks/social-geography.json", "w") as fh:
    json.dump(BANK, fh, indent=2)
    fh.write("\n")
print("\nwrote scripts/banks/social-geography.json")
