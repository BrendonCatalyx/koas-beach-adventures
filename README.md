# Koa's Beach Adventures — Website

Prerendered static site, built with [Eleventy](https://11ty.dev). No React, no server, no database — real HTML generated at build time, deployed as static files to Netlify.

**Doing a specific task?** → See **[HANDBOOK.md](./HANDBOOK.md)** — how to add a book/character/destination, replace placeholder art, add a video, publish, update nav/colours/SEO/social links.

## Quickstart

```bash
npm install
npm run serve     # localhost:8080, live-reloads as you edit
npm run build     # one-off production build → _site/
```

## Project map

```
eleventy.config.js     Build config — passthrough copies, art shortcodes, related-content globals
netlify.toml            Netlify build settings (command + publish dir)
lib/
  placeholder-art.mjs    SVG generators for character/destination/book art (build-time)
  related.mjs             Cross-references data to build "Continue the adventure" links
  video-status.mjs        Auto-detects whether a video file exists on disk — the whole point of the video workflow
src/
  _data/
    site.js               Nav, footer, social links, SEO defaults — the one config file
    characters.js          Every crew member
    destinations.js        Every stop on the map (all 20)
    books.js                The full 20-book series
    videos.js               Every video — real content type, auto-detects live vs. awaiting-export
  _includes/
    layouts/base.njk       Every page's <head>, SEO tags, header/footer includes
    partials/               header.njk, footer.njk, related.njk, video-card.njk (all data-driven, no hardcoded links)
  crew/    index.njk (hub) + detail.njk (paginated → one real page per character)
  world/   index.njk (hub) + detail.njk (paginated → one real page per destination)
  books/   index.njk (hub) + detail.njk (paginated → one real page per book)
  watch.njk, activities.njk, shop.njk, about.njk, learn.njk, search.njk, privacy.njk, terms.njk
  search-index.11ty.js    Generates /search-index.json at build time
  styles.css, app.js       Design system + client runtime (only genuinely interactive behavior)
  assets/                  characters/ destinations/ books/ videos/ icons/ backgrounds/ ui/
```

## Why Eleventy (not the plain-HTML version this replaced)

The previous version of this site was hand-written static HTML with client-side JavaScript rendering content from data files at page-load time. That worked, but it meant Open Graph tags, Twitter Cards, and JSON-LD were all set *after* the page loaded — invisible to link-preview crawlers (Facebook, Twitter/X, Slack, iMessage), which fetch raw HTML and don't execute JavaScript. Sharing a link to a character page would show a generic title, not that character's actual name and bio.

Eleventy solves this by generating the real HTML — real `<title>`, real meta tags, real JSON-LD — for every character, destination, and book page at build time, while keeping the exact same content model: three data files, edited directly, with zero new templates needed as the series grows from 3 books to 20. See `HANDBOOK.md` for the day-to-day workflow, and `eleventy.config.js` / `lib/*.mjs` if you want to understand the mechanics.

## What's still placeholder

- **All art** (character portraits, destination images, book covers) is a generated SVG placeholder, not real Higgsfield exports. See "How to replace placeholder art" in the handbook.
- **Video files themselves** — the architecture is real and tested (see below), but no actual `.mp4` exports or YouTube IDs exist yet. Nine video records in `src/_data/videos.js` are ready and waiting at their exact expected filenames; dropping in the real export is the only step needed. See "How to add a new video" in the handbook.
- **Social links** in `src/_data/site.js` point to `#` — real profile URLs weren't available when this was built.
- **`privacy.njk` / `terms.njk`** are explicit placeholders, not real legal text — this site collects data from children and runs subscriptions, so this needs actual legal review, not invented boilerplate.
- **Default social-share image** (`src/assets/ui/social-share-default.jpg`) doesn't exist yet — export one before launch or shared links show a broken image.

## What's real and verified

Every claim below was checked against an actual build, not assumed:
- 62 pages built successfully (20 books + 8 characters + 20 destinations + 14 static/utility pages).
- Zero broken internal links, verified by crawling every generated page.
- Zero double-escaping or malformed HTML, verified across the full build output.
- JSON-LD present and valid on every live/in-production book and destination page, correctly absent on "planned" ones.
- `/search-index.json` generates 57 correct entries (8 characters + 20 destinations + 20 books + 9 videos) and the search page's live filtering works against it.
- Netlify's custom 404 (`/404.html`) is wired per Netlify's documented conventions.
- **The video auto-detection was actually tested, not just built**: a fake file was dropped into `src/assets/videos/koa-welcome.mp4` with zero edits to `videos.js`, rebuilt, and confirmed live everywhere the video appears (homepage, `/watch/`, Koa's and Gully's crew pages, search) — then removed and confirmed it cleanly reverted to the "awaiting export" placeholder. That round-trip is the entire point of the video architecture, so it seemed worth actually proving rather than assuming.
