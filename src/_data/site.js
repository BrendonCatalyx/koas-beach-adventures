/**
 * SITE CONFIGURATION
 * -------------------
 * The single source of truth for everything that isn't book/character/
 * destination content. If you ever build an admin panel, this file (plus
 * data/*.js) is what it would edit — that's the intent behind keeping it
 * separate from both the templates and the content data.
 *
 * Nothing in any template should hardcode a nav label, a footer link, a
 * social URL, or an SEO default — it should all be read from here, so
 * changing "Explore" to "Discover" site-wide is a one-line edit, not a
 * find-and-replace across twelve HTML files.
 */

export default {
  siteName: "Koa's Beach Adventures",
  tagline: "Explore. Learn. Protect.",
  defaultDescription: "Books, friends, real places, and real animals — explore Koa's world.",
  siteUrl: "https://catalyxkids.com.au", // update if the production domain differs
  defaultOgImage: "/assets/ui/social-share-default.jpg", // placeholder — swap once exported

  nav: [
    { label: "Explore", href: "/world/" },
    { label: "Crew",    href: "/crew/" },
    { label: "Watch",   href: "/watch/" },
    { label: "Read",    href: "/books/" },
    { label: "Play",    href: "/play/" },
    { label: "Rangers", href: "/rangers/" }
  ],

  headerExtra: [
    { label: "🔍 Search", href: "/search/" },
    { label: "For Grown-Ups", href: "/learn/" },
    { label: "🛍️ Beach Shack", href: "/beach-shack/" }
  ],

  footer: {
    columns: [
      {
        heading: "Explore",
        links: [
          { label: "The World", href: "/world/" },
          { label: "The Crew", href: "/crew/" },
          { label: "Watch", href: "/watch/" },
          { label: "Read", href: "/books/" },
          { label: "Play", href: "/play/" }
        ]
      },
      {
        heading: "Join In",
        links: [
          { label: "Beach Rangers", href: "/rangers/" },
          { label: "Beach Shack", href: "/beach-shack/" }
        ]
      },
      {
        heading: "About",
        links: [
          { label: "Who is Koa?", href: "/about/" },
          { label: "Catalyx One", href: "/about/#catalyx-one" },
          { label: "Support the Mission", href: "/about/#support" },
          { label: "For Parents & Teachers", href: "/learn/" }
        ]
      },
      {
        heading: "Legal",
        links: [
          { label: "Privacy", href: "/privacy/" },
          { label: "Terms", href: "/terms/" }
        ]
      }
    ],
    baseNote: "A portion of proceeds funds the development of Catalyx One"
  },

  // Placeholder — swap with real profile URLs when available.
  social: [
    { label: "Instagram", icon: "📸", href: "#" },
    { label: "Facebook",  icon: "👍", href: "#" },
    { label: "Pinterest", icon: "📌", href: "#" },
    { label: "TikTok",    icon: "🎵", href: "#" },
    { label: "YouTube",   icon: "▶️", href: "#" }
  ],

  // Feature flags — the intended pattern for turning things on/off without
  // hunting through templates. Nothing reads most of these yet; they exist
  // so future features have an established place to be gated from day one.
  features: {
    globalSearch: true,
    characterPassports: true,
    seasonalContent: false,   // architecture exists (see data/*.js "season" hook), content not yet produced
    digitalCollection: false, // deliberately out of scope for v2.0 — see Phase 3 decision
    videoEmbeds: false        // flip on once real Higgsfield embeds replace the placeholder cards
  }
};
