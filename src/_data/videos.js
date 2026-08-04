/**
 * VIDEO DATA
 * -----------
 * Real content, not hypothetical. Higgsfield is the production tool —
 * these records point at where the EXPORTED file should live once
 * Brendon drops it in. The `status` field below is a documentation note
 * only; the actual live/awaiting-export state is auto-detected at build
 * time from whether the file exists on disk (see lib/video-status.mjs).
 * That means: dropping the real .mp4 into src/assets/videos/ with the
 * exact filename below is the ONLY step required to make it live — no
 * edit to this file, no template change.
 *
 * SOURCE TYPES:
 *  "self-hosted" — an exported .mp4 in src/assets/videos/, served directly
 *                   by Netlify. Best for short (<20s), compressed preview
 *                   clips — character intros, destination teasers.
 *  "youtube"      — set youtubeId once published. Best for longer content
 *                    (behind-the-scenes, full explainers) so Netlify isn't
 *                    serving large video files. See HANDBOOK.md.
 *
 * CATEGORIES: meet-the-crew | destinations | adventure-moments |
 *             behind-the-adventure | shorts
 */

const VIDEOS = [
  {
    slug: "koa-welcome",
    title: "Welcome to Koa's World",
    category: "meet-the-crew",
    characterSlugs: ["koa", "gully"],
    destinationSlug: null,
    bookSlug: null,
    source: "self-hosted",
    file: "/assets/videos/koa-welcome.mp4",
    poster: "/assets/videos/posters/koa-welcome.jpg",
    duration: "00:12",
    caption: "Meet Koa and begin the adventure.",
    featured: true,
    status: "awaiting-export"
  },
  {
    slug: "gully-intro",
    title: "Gully Being Gully",
    category: "meet-the-crew",
    characterSlugs: ["gully"],
    destinationSlug: null,
    bookSlug: null,
    source: "self-hosted",
    file: "/assets/videos/gully-intro.mp4",
    poster: "/assets/videos/posters/gully-intro.jpg",
    duration: "00:08",
    caption: "Silly, clumsy, and completely unbothered by it.",
    featured: false,
    status: "awaiting-export"
  },
  {
    slug: "dune-intro",
    title: "Dune Reads the Tides",
    category: "meet-the-crew",
    characterSlugs: ["dune"],
    destinationSlug: "byron-bay",
    bookSlug: null,
    source: "self-hosted",
    file: "/assets/videos/dune-intro.mp4",
    poster: "/assets/videos/posters/dune-intro.jpg",
    duration: "00:10",
    caption: "Byron Bay's sharpest eyes, watching the sea.",
    featured: true,
    status: "awaiting-export"
  },
  {
    slug: "moku-intro",
    title: "Moku Catches a Wave",
    category: "meet-the-crew",
    characterSlugs: ["moku"],
    destinationSlug: "hawaii",
    bookSlug: null,
    source: "self-hosted",
    file: "/assets/videos/moku-intro.mp4",
    poster: "/assets/videos/posters/moku-intro.jpg",
    duration: "00:09",
    caption: "Hawaii's toughest surfer, first into the water.",
    featured: true,
    status: "awaiting-export"
  },
  {
    slug: "boko-intro",
    title: "Boko's Quiet Lagoon",
    category: "meet-the-crew",
    characterSlugs: ["boko"],
    destinationSlug: "solomon-islands",
    bookSlug: null,
    source: "self-hosted",
    file: "/assets/videos/boko-intro.mp4",
    poster: "/assets/videos/posters/boko-intro.jpg",
    duration: "00:11",
    caption: "Slow down. The lagoon isn't going anywhere.",
    featured: false,
    status: "awaiting-export"
  },
  {
    slug: "byron-bay-adventure",
    title: "Byron Bay, From Above",
    category: "destinations",
    characterSlugs: ["koa", "dune"],
    destinationSlug: "byron-bay",
    bookSlug: "byron-bay",
    source: "self-hosted",
    file: "/assets/videos/byron-bay-adventure.mp4",
    poster: "/assets/videos/posters/byron-bay-adventure.jpg",
    duration: "00:15",
    caption: "Lighthouse, surf, and the whole coastline.",
    featured: true,
    status: "awaiting-export"
  },
  {
    slug: "hawaii-adventure",
    title: "Hawaii's Volcano Trails",
    category: "destinations",
    characterSlugs: ["koa", "moku"],
    destinationSlug: "hawaii",
    bookSlug: "hawaii",
    source: "self-hosted",
    file: "/assets/videos/hawaii-adventure.mp4",
    poster: "/assets/videos/posters/hawaii-adventure.jpg",
    duration: "00:14",
    caption: "Volcano trails and honu turtles offshore.",
    featured: false,
    status: "awaiting-export"
  },
  {
    slug: "solomon-islands-adventure",
    title: "The Thousand Islands",
    category: "destinations",
    characterSlugs: ["koa", "boko", "guss"],
    destinationSlug: "solomon-islands",
    bookSlug: "solomon-islands",
    source: "self-hosted",
    file: "/assets/videos/solomon-islands-adventure.mp4",
    poster: "/assets/videos/posters/solomon-islands-adventure.jpg",
    duration: "00:16",
    caption: "A lagoon, a forest, and a dugong who needs help.",
    featured: false,
    status: "awaiting-export"
  },
  {
    slug: "making-koas-world",
    title: "Making Koa's World",
    category: "behind-the-adventure",
    characterSlugs: [],
    destinationSlug: null,
    bookSlug: null,
    source: "youtube",
    youtubeId: null,
    poster: "/assets/videos/posters/making-koas-world.jpg",
    duration: null,
    caption: "How each book comes to life — a longer piece, hosted on YouTube once published, not self-hosted, to keep the site fast.",
    featured: false,
    status: "awaiting-export"
  }
];

export default VIDEOS;
