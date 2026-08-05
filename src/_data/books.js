/**
 * BOOK DATA
 * ----------
 * The full 20-book series roadmap. read.html (served at /books) renders
 * the shelf and every book detail page (/books/{slug}) from this file alone.
 *
 * Slugs match the matching destination slug wherever the book is set
 * one-to-one — keeps URLs like /books/byron-bay clean and predictable.
 *
 * amazonUrl is only set for books that are actually live on KDP — leave it
 * null for anything not yet published, and the template shows "In the
 * works" instead of a dead link.
 */

export default [
  {
    slug: "byron-bay",
    seriesNumber: 1,
    title: "Byron Bay",
    status: "live",
    destinationSlug: "byron-bay",
    friendSlug: "dune",
    blurb: "Koa travels the coastlines with a surfboard and a recycling sack — and today, that means Byron Bay: a tangled net, a new friend named Dune, and two little islands hiding a secret out past the waves.",
    amazonUrl: "https://amzn.asia/d/0auLDoSy"
  },
  {
    slug: "hawaii",
    seriesNumber: 2,
    title: "Waves at Waikiki",
    status: "live",
    destinationSlug: "hawaii",
    friendSlug: "moku",
    blurb: "The wind carries Koa to Hawaii: a wild boar named Moku, an island born from fire, and a first wave to catch.",
    amazonUrl: "https://amzn.asia/d/0bvBruAU"
  },
  {
    slug: "solomon-islands",
    seriesNumber: 3,
    title: "The Thousand Islands",
    status: "live",
    destinationSlug: "solomon-islands",
    friendSlug: "boko",
    blurb: "Koa sails into the Solomon Islands — nearly a thousand tiny islands! With Boko the laid-back skink and Guss the cheerful cuscus, he helps a gentle dugong and meets one of the rarest owls on Earth.",
    amazonUrl: "https://amzn.asia/d/0dhrwszM"
  },
  { slug: "fiji", seriesNumber: 4, title: "Fiji", status: "planned", destinationSlug: "fiji", friendSlug: "fiji-frog", blurb: "Sea turtles and reefs — coming soon.", amazonUrl: null },
  { slug: "samoa", seriesNumber: 5, title: "Samoa", status: "planned", destinationSlug: "samoa", friendSlug: null, blurb: "Waterfalls and rainforest — coming soon.", amazonUrl: null },
  { slug: "vanuatu", seriesNumber: 6, title: "Vanuatu", status: "planned", destinationSlug: "vanuatu", friendSlug: null, blurb: "Volcanoes and adventure — coming soon.", amazonUrl: null },
  { slug: "tahiti", seriesNumber: 7, title: "Tahiti", status: "planned", destinationSlug: "tahiti", friendSlug: null, blurb: "Lagoons and sailing — coming soon.", amazonUrl: null },
  { slug: "cook-islands", seriesNumber: 8, title: "Cook Islands", status: "planned", destinationSlug: "cook-islands", friendSlug: "cook-islands-kakerori", blurb: "Hidden coves and stars — coming soon.", amazonUrl: null },
  { slug: "tonga", seriesNumber: 9, title: "Tonga", status: "planned", destinationSlug: "tonga", friendSlug: null, blurb: "Humpback whales — coming soon.", amazonUrl: null },
  { slug: "palau", seriesNumber: 10, title: "Palau", status: "planned", destinationSlug: "palau", friendSlug: null, blurb: "Jellyfish Lake and conservation — coming soon.", amazonUrl: null },
  { slug: "new-caledonia", seriesNumber: 11, title: "New Caledonia", status: "planned", destinationSlug: "new-caledonia", friendSlug: null, blurb: "Mangroves and lagoons — coming soon.", amazonUrl: null },
  { slug: "niue", seriesNumber: 12, title: "Niue", status: "planned", destinationSlug: "niue", friendSlug: null, blurb: "Sea caves and dolphins — coming soon.", amazonUrl: null },
  { slug: "kiribati", seriesNumber: 13, title: "Kiribati", status: "planned", destinationSlug: "kiribati", friendSlug: null, blurb: "Ocean life and island resilience — coming soon.", amazonUrl: null },
  { slug: "tuvalu", seriesNumber: 14, title: "Tuvalu", status: "planned", destinationSlug: "tuvalu", friendSlug: null, blurb: "Community and caring for the sea — coming soon.", amazonUrl: null },
  { slug: "papua-new-guinea", seriesNumber: 15, title: "Papua New Guinea", status: "planned", destinationSlug: "papua-new-guinea", friendSlug: null, blurb: "Birds of paradise and forests — coming soon.", amazonUrl: null },
  { slug: "marshall-islands", seriesNumber: 16, title: "Marshall Islands", status: "planned", destinationSlug: "marshall-islands", friendSlug: null, blurb: "Traditional navigation — coming soon.", amazonUrl: null },
  { slug: "micronesia", seriesNumber: 17, title: "Micronesia", status: "planned", destinationSlug: "micronesia", friendSlug: null, blurb: "Ancient stone ruins and reefs — coming soon.", amazonUrl: null },
  { slug: "nauru", seriesNumber: 18, title: "Nauru", status: "planned", destinationSlug: "nauru", friendSlug: null, blurb: "Island restoration — coming soon.", amazonUrl: null },
  { slug: "norfolk-island", seriesNumber: 19, title: "Norfolk Island", status: "planned", destinationSlug: "norfolk-island", friendSlug: null, blurb: "History and seabirds — coming soon.", amazonUrl: null },
  { slug: "great-pacific-voyage", seriesNumber: 20, title: "Koa's Great Pacific Voyage", status: "planned", destinationSlug: "great-pacific-voyage", friendSlug: null, blurb: "Every friend, together — the series finale.", amazonUrl: null }
];
