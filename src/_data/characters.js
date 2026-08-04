/**
 * CHARACTER DATA
 * ---------------
 * This is the entire crew, as data. crew.html renders every card and every
 * detail page FROM this file — there is no separate HTML page per character.
 *
 * TO ADD A NEW CHARACTER (e.g. when Book 4's Fiji frog is ready):
 *   1. Copy an existing record below.
 *   2. Fill in the fields. `slug` becomes the URL: crew.html?c=your-slug
 *   3. Set status to "live". Save the file.
 *   That's it — no new page, no template edit, nothing else to touch.
 *
 * `art` points to where the real Higgsfield-generated portrait should live
 * (matching your existing img/ naming convention). Until that file exists,
 * app.js falls back to a drawn placeholder in the character's `swatch` color
 * so the site never shows a broken image.
 */

export default [
  {
    slug: "koa",
    name: "Koa",
    species: "Koala",
    role: "The one who started it all",
    home: "Byron Bay — where his journey began",
    homeSlug: "byron-bay",
    bio: "Koa is curious about everything and worried about nothing for long. He travels the Pacific coastline by coastline, and everywhere he lands, he makes a promise: I'll help care for your home, if you'll show it to me.",
    favouriteFood: "Ripe mango, eaten standing up on a surfboard",
    favouriteBeach: "Byron Bay's Main Beach, right at sunrise",
    favouriteSaying: "There's always time for one more wave.",
    funFacts: [
      "Never travels without his woven recycling satchel",
      "Has caught a wave in every single book so far",
      "Cannot whistle. Has never stopped trying."
    ],
    booksSlugs: ["byron-bay", "hawaii", "solomon-islands"],
    swatch: "#C9A46C",
    status: "live"
  },
  {
    slug: "gully",
    name: "Gully",
    species: "Seagull",
    role: "Koa's first mate (self-appointed)",
    home: "Wherever the wind takes him — currently, badly steering the boat",
    homeSlug: null,
    bio: "Gully found Koa tangled in fishing net on page one and has not left his side since. He is silly, clumsy, and completely without shame about it — and he is, without question, everyone's favourite.",
    favouriteFood: "Whatever's on someone else's plate",
    favouriteBeach: "The one with the most kites to get tangled in",
    favouriteSaying: "I meant to do that.",
    funFacts: [
      "Exactly half the height of everyone else in the crew — always",
      "Has never once stolen anything. He is simply unlucky.",
      "Steers the boat. This has never gone well."
    ],
    booksSlugs: ["byron-bay", "hawaii", "solomon-islands"],
    swatch: "#DCE4DC",
    status: "live"
  },
  {
    slug: "dune",
    name: "Dune",
    species: "Goanna",
    role: "Byron Bay's sharpest eyes",
    home: "Byron Bay",
    homeSlug: "byron-bay",
    bio: "Dune reads the coastline like a book — tides, tracks, and which way the birds are about to turn. He taught Koa to catch his first real wave, and he's still keeping an eye on the horizon for him.",
    favouriteFood: "Beetles, if Gully doesn't get there first",
    favouriteBeach: "The rocks below Cape Byron Lighthouse",
    favouriteSaying: "Read the tide before you read the wave.",
    funFacts: [
      "Can tell the weather is turning a full day before anyone else",
      "Has a permanent staring contest with the lighthouse",
      "Was the first friend Koa ever made on the road"
    ],
    booksSlugs: ["byron-bay"],
    swatch: "#B8935A",
    status: "live"
  },
  {
    slug: "moku",
    name: "Moku",
    species: "Wild boar",
    role: "Hawaii's volcano-trail guide",
    home: "Hawaii",
    homeSlug: "hawaii",
    bio: "Moku knows every trail on the island and every honu (sea turtle) that surfaces offshore by name. Tougher than he looks, and first into the water every single time.",
    favouriteFood: "Fresh pineapple, always",
    favouriteBeach: "Wherever the honu are surfacing that morning",
    favouriteSaying: "Paddle out, worry later.",
    funFacts: [
      "Has a mohawk tuft that will not lie flat, ever",
      "Named every honu in his home bay",
      "Taught Koa the volcano trail in under a day"
    ],
    booksSlugs: ["hawaii"],
    swatch: "#7C8B6F",
    status: "live"
  },
  {
    slug: "boko",
    name: "Boko",
    species: "Prehensile-tailed skink",
    role: "The Solomon Islands' calmest resident",
    home: "Solomon Islands",
    homeSlug: "solomon-islands",
    bio: "Boko moves slowly and sees everything — the lagoon, the forest, the tide, all at once. He wears woven reed sunglasses and a matching bag, and nothing seems to rattle him.",
    favouriteFood: "Ripe forest figs, eaten one at a time",
    favouriteBeach: "The quiet lagoon past the mangroves",
    favouriteSaying: "Slow down. The lagoon isn't going anywhere.",
    funFacts: [
      "His tail is striped — greenish-grey and cream, like the mangrove light",
      "Carves alongside his grandfather when he isn't exploring",
      "Has never once been in a hurry"
    ],
    booksSlugs: ["solomon-islands"],
    swatch: "#8FA08C",
    status: "in-production"
  },
  {
    slug: "guss",
    name: "Guss",
    species: "Cuscus",
    role: "The Solomon Islands' highest lookout",
    home: "Solomon Islands",
    homeSlug: "solomon-islands",
    bio: "Guss lives for the view from the tallest branch he can find, binoculars always around his neck. Big grin, bigger enthusiasm — he's the one who spots things everyone else misses.",
    favouriteFood: "Whatever's easiest to reach from wherever he's currently perched",
    favouriteBeach: "None — he prefers the forest canopy, thank you",
    favouriteSaying: "Best view's always higher up!",
    funFacts: [
      "Never without his binoculars",
      "Wears the same teal wristbands on both wrists, every day",
      "Spotted the dugong before anyone else did"
    ],
    booksSlugs: ["solomon-islands"],
    swatch: "#6E7C8C",
    status: "in-production"
  },
  {
    slug: "fiji-frog",
    name: "Coming in Book 4",
    species: "Fiji tree frog",
    role: "Fiji's newest friend",
    home: "Fiji",
    homeSlug: "fiji",
    bio: "Still finding his voice — Koa meets him properly when the Fiji adventure begins.",
    favouriteFood: null,
    favouriteBeach: null,
    favouriteSaying: null,
    funFacts: [],
    booksSlugs: ["fiji"],
    swatch: "#9BB98C",
    status: "planned"
  },
  {
    slug: "cook-islands-kakerori",
    name: "Coming in Book 8",
    species: "Kākerōri (Rarotonga flycatcher)",
    role: "Cook Islands' newest friend",
    home: "Cook Islands",
    homeSlug: "cook-islands",
    bio: "Still finding his voice — Koa meets him properly when the Cook Islands adventure begins.",
    favouriteFood: null,
    favouriteBeach: null,
    favouriteSaying: null,
    funFacts: [],
    booksSlugs: ["cook-islands"],
    swatch: "#C4633A",
    status: "planned"
  }
];
