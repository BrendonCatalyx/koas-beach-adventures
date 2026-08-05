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

  // ---------- Two-tier navigation ----------
  // Deliberately split by audience, not just by section. `nav` is what a
  // CHILD wants — big, exploratory, always visible while scrolling.
  // `parentNav` is the quieter utility row above it — Shop, About, and
  // Search all live there instead of competing for space in the main nav.
  // (This supersedes an earlier version that put Shop as a prominent
  // button inside the primary nav — kept here as a one-line explanation
  // since that was an explicit, considered design decision to reverse.)
  nav: [
    { label: "Explore",          href: "/world/" },
    { label: "Meet the Friends", href: "/crew/" },
    { label: "Books",            href: "/books/" },
    { label: "Watch",            href: "/watch/" },
    { label: "Activities",       href: "/activities/" }
  ],

  parentNav: [
    { label: "Parents & Teachers", href: "/learn/" },
    { label: "About", href: "/about/" }
  ],

  // Update these two lines whenever a new destination vote begins — the
  // homepage voting block reads them directly.
  currentVote: {
    question: "Where should Koa travel next?",
    note: "Vote in our polls on Instagram, TikTok, and YouTube — every vote helps choose Koa's next adventure."
  },

  footer: {
    columns: [
      {
        heading: "Explore",
        links: [
          { label: "The World", href: "/world/" },
          { label: "The Crew", href: "/crew/" },
          { label: "Watch", href: "/watch/" },
          { label: "Read", href: "/books/" },
          { label: "Activities", href: "/activities/" }
        ]
      },
      {
        heading: "Join In",
        links: [
          { label: "Free Activities", href: "/activities/" },
          { label: "Beach Shack", href: "/beach-shack/" }
        ]
      },
      {
        heading: "About",
        links: [
          { label: "Who is Koa?", href: "/about/" },
          { label: "Parents & Teachers", href: "/learn/" }
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
    baseNote: "Real places. Real animals. Real adventures."
  },

  // Placeholder — swap with real profile URLs when available.
  // Social channels — links with href "#" are HIDDEN site-wide until a real URL
  // is pasted here (same drop-in-and-it-works pattern as the art system).
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
