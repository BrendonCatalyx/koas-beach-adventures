/**
 * DESTINATION DATA
 * -----------------
 * Every stop on Koa's route, live or not. world.html renders the map and
 * every destination page from this file alone.
 *
 * mapX / mapY are percentages (0-100) for stylised placement on the map —
 * not literal coordinates, just relative position so the layout reads
 * roughly like the real Pacific without needing a mapping library.
 *
 * TO ADD A NEW DESTINATION: copy a record, fill it in, set status to "live"
 * when the book publishes. No new page required.
 */

export default [
  {
    slug: "byron-bay",
    name: "Byron Bay",
    region: "Australia",
    status: "live",
    hook: "Where the story starts — lighthouse, surf, and a goanna who reads the tide better than anyone.",
    wildlife: ["Goannas", "Migrating whales offshore", "Seabirds along the headland"],
    culture: "Cape Byron's lighthouse and the coastal walking trails that wind around the headland.",
    friendSlug: "dune",
    bookSlug: "byron-bay",
    didYouKnow: "Cape Byron is mainland Australia's most easterly point — it's one of the first places on the continent to see the sun rise each day.",
    mapX: 12, mapY: 74
  },
  {
    slug: "hawaii",
    name: "Hawaii",
    region: "United States",
    status: "live",
    hook: "Volcano trails, honu turtles offshore, and a wild boar who knows every one of them by name.",
    wildlife: ["Honu (green sea turtles)", "Nēnē (Hawaiian goose)", "Humpback whales, in season"],
    culture: "Volcanic trails and coastline shaped by some of the most active volcanoes on Earth.",
    friendSlug: "moku",
    bookSlug: "hawaii",
    didYouKnow: "Hawaiian green sea turtles can hold their breath for up to five hours while resting underwater.",
    mapX: 16, mapY: 16
  },
  {
    slug: "solomon-islands",
    name: "Solomon Islands",
    region: "Pacific",
    status: "in-production",
    hook: "A thousand-island journey — lagoons, forest canopy, and a dugong who needs a hand.",
    wildlife: ["Dugongs", "Coral reef fish", "Prehensile-tailed skinks"],
    culture: "Village life woven through mangroves, reef, and rainforest across hundreds of islands.",
    friendSlug: "boko",
    bookSlug: "solomon-islands",
    didYouKnow: "The Solomon Islands has over 900 islands — nobody's ever agreed on the exact count.",
    mapX: 36, mapY: 46
  },
  {
    slug: "fiji",
    name: "Fiji",
    region: "Pacific",
    status: "planned",
    hook: "Sea turtles and reef, coming in Book 4.",
    wildlife: ["Sea turtles", "Coral reefs"],
    culture: null,
    friendSlug: "fiji-frog",
    bookSlug: "fiji",
    didYouKnow: null,
    mapX: 56, mapY: 60
  },
  {
    slug: "samoa",
    name: "Samoa",
    region: "Pacific",
    status: "planned",
    hook: "Waterfalls and rainforest, coming in Book 5.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "samoa",
    didYouKnow: null,
    mapX: 63, mapY: 50
  },
  {
    slug: "vanuatu",
    name: "Vanuatu",
    region: "Pacific",
    status: "planned",
    hook: "Volcanoes and adventure, coming in Book 6.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "vanuatu",
    didYouKnow: null,
    mapX: 48, mapY: 58
  },
  {
    slug: "tahiti",
    name: "Tahiti",
    region: "Pacific",
    status: "planned",
    hook: "Lagoons and sailing, coming in Book 7.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "tahiti",
    didYouKnow: null,
    mapX: 76, mapY: 62
  },
  {
    slug: "cook-islands",
    name: "Cook Islands",
    region: "Pacific",
    status: "planned",
    hook: "Hidden coves and stars, coming in Book 8.",
    wildlife: [],
    culture: null,
    friendSlug: "cook-islands-kakerori",
    bookSlug: "cook-islands",
    didYouKnow: null,
    mapX: 70, mapY: 50
  },
  {
    slug: "tonga",
    name: "Tonga",
    region: "Pacific",
    status: "planned",
    hook: "Humpback whales, coming in Book 9.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "tonga",
    didYouKnow: null,
    mapX: 60, mapY: 68
  },
  {
    slug: "palau",
    name: "Palau",
    region: "Pacific",
    status: "planned",
    hook: "Jellyfish Lake and conservation, coming in Book 10.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "palau",
    didYouKnow: null,
    mapX: 25, mapY: 32
  },
  {
    slug: "new-caledonia",
    name: "New Caledonia",
    region: "Pacific",
    status: "planned",
    hook: "Mangroves and lagoons, coming in Book 11.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "new-caledonia",
    didYouKnow: null,
    mapX: 45, mapY: 68
  },
  {
    slug: "niue",
    name: "Niue",
    region: "Pacific",
    status: "planned",
    hook: "Sea caves and dolphins, coming in Book 12.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "niue",
    didYouKnow: null,
    mapX: 68, mapY: 58
  },
  {
    slug: "kiribati",
    name: "Kiribati",
    region: "Pacific",
    status: "planned",
    hook: "Ocean life and island resilience, coming in Book 13.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "kiribati",
    didYouKnow: null,
    mapX: 58, mapY: 35
  },
  {
    slug: "tuvalu",
    name: "Tuvalu",
    region: "Pacific",
    status: "planned",
    hook: "Community and caring for the sea, coming in Book 14.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "tuvalu",
    didYouKnow: null,
    mapX: 55, mapY: 45
  },
  {
    slug: "papua-new-guinea",
    name: "Papua New Guinea",
    region: "Pacific",
    status: "planned",
    hook: "Birds of paradise and forests, coming in Book 15.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "papua-new-guinea",
    didYouKnow: null,
    mapX: 30, mapY: 42
  },
  {
    slug: "marshall-islands",
    name: "Marshall Islands",
    region: "Pacific",
    status: "planned",
    hook: "Traditional navigation, coming in Book 16.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "marshall-islands",
    didYouKnow: null,
    mapX: 48, mapY: 25
  },
  {
    slug: "micronesia",
    name: "Micronesia",
    region: "Pacific",
    status: "planned",
    hook: "Ancient stone ruins and reefs, coming in Book 17.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "micronesia",
    didYouKnow: null,
    mapX: 32, mapY: 25
  },
  {
    slug: "nauru",
    name: "Nauru",
    region: "Pacific",
    status: "planned",
    hook: "Island restoration, coming in Book 18.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "nauru",
    didYouKnow: null,
    mapX: 42, mapY: 38
  },
  {
    slug: "norfolk-island",
    name: "Norfolk Island",
    region: "Pacific",
    status: "planned",
    hook: "History and seabirds, coming in Book 19.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "norfolk-island",
    didYouKnow: null,
    mapX: 30, mapY: 80
  },
  {
    slug: "great-pacific-voyage",
    name: "Koa's Great Pacific Voyage",
    region: "Everywhere at once",
    status: "planned",
    hook: "Every friend Koa has ever met, together for the series finale — Book 20.",
    wildlife: [],
    culture: null,
    friendSlug: null,
    bookSlug: "great-pacific-voyage",
    didYouKnow: null,
    mapX: 50, mapY: 50
  }
];
