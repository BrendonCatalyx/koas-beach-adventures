# Koa's Beach Adventures — Developer Handbook

This is for future you. Not a stranger — you, six months from now, having forgotten exactly how this works. Each section is one task, start to finish.

If something here doesn't match what you find in the code, trust the code — this handbook can drift out of date, the code can't.

---

## First-time setup

```bash
npm install
npm run build     # builds once, outputs to _site/
npm run serve     # builds and serves locally with live reload at localhost:8080
```

`npm run serve` is what you want while working — it rebuilds automatically as you edit files.

---

## How to add a new book (e.g. Book 4, Fiji)

Three files, in this order:

**1. `src/_data/characters.js`** — find the `fiji-frog` record (it already exists as a placeholder). Change:
```js
status: "planned",   →   status: "live",
```
Then fill in `bio`, `favouriteFood`, `favouriteBeach`, `favouriteSaying`, `funFacts`.

**2. `src/_data/destinations.js`** — find the `fiji` record. Change its `status` to `"live"` (or `"in-production"` if the book isn't published yet but you want the page visible). Fill in `wildlife`, `culture`, `didYouKnow`.

**3. `src/_data/books.js`** — find the `fiji` record. Set `status: "live"` and add the real `amazonUrl` once it's published on KDP.

Run `npm run build`. That's it — `/crew/fiji-frog/`, `/world/fiji/`, and `/books/fiji/` all update, plus every hub page (`/crew/`, `/world/`, `/books/`) and the homepage, automatically. **No new template file, ever.** If you find yourself creating a new `.njk` file to add a book, character, or destination, stop — that means something's wrong, because the whole point of this architecture is that you never have to.

---

## How to add a brand-new character (not already in the roster)

Not every future book has a placeholder character waiting — for books further down the roadmap, add a fresh record to `src/_data/characters.js`:

```js
{
  slug: "your-slug",              // becomes the URL: /crew/your-slug/
  name: "Character Name",
  species: "...",
  role: "One line describing them",
  home: "Display text, e.g. 'Palau'",
  homeSlug: "palau",              // must match a real slug in destinations.js
  bio: "2-4 sentences.",
  favouriteFood: "...",
  favouriteBeach: "...",
  favouriteSaying: "...",
  funFacts: ["...", "...", "..."],
  booksSlugs: ["palau"],          // matches a slug in books.js
  swatch: "#RRGGBB",              // brand-consistent hex, used for placeholder art until real art exists
  status: "live"                  // "live" | "in-production" | "planned"
}
```

`homeSlug` and `booksSlugs` are what power the "Continue the adventure" block on every page (see `lib/related.mjs`) — get those two right and the cross-linking takes care of itself.

---

## How to add a new destination

Same idea, in `src/_data/destinations.js`:

```js
{
  slug: "your-slug",
  name: "Destination Name",
  region: "Pacific",              // or "Australia", "United States", etc.
  status: "live",
  hook: "One sentence, the emotional pitch for this place.",
  wildlife: ["Animal 1", "Animal 2"],
  culture: "A sentence on the place itself — landscape, not living cultural/religious traditions (see the Series Bible's cultural-sensitivity rule).",
  friendSlug: "matching-character-slug",
  bookSlug: "matching-book-slug",
  didYouKnow: "A real, specific fact.",
  mapX: 50, mapY: 50              // 0-100 stylised position on the World map — not real coordinates, just relative placement. Eyeball it against the existing entries.
}
```

---

## How to replace placeholder art with real Higgsfield exports

Right now every character portrait, destination image, and book cover is a generated SVG placeholder (see `lib/placeholder-art.mjs`) — a colored tile or circle in the entity's `swatch` color, not real artwork. This was a deliberate choice: it means every page looks intentional, not broken, while art production catches up.

To swap in the real thing for, say, Koa's character page:

1. Export the final art from Higgsfield, drop it in `src/assets/characters/koa.png` (matching folders exist for `characters/`, `destinations/`, `books/`).
2. In `src/crew/detail.njk`, find:
   ```njk
   <div class="art-frame" style="background:{{ character.swatch }};">{% characterAvatar character, 220 %}</div>
   ```
   Replace with:
   ```njk
   <div class="art-frame"><img src="/assets/characters/{{ character.slug }}.png" alt="{{ character.name }}" style="width:100%;height:100%;object-fit:cover;"></div>
   ```
3. Do the same in `src/crew/index.njk` (the grid card) and `src/index.njk` (the homepage crew lineup) once you're ready to replace it everywhere — you don't have to do all three at once; a mix of real art and placeholders is fine while you're mid-rollout.
4. Same pattern for destinations (`src/world/detail.njk`, `tileArt` calls) and books (`src/books/detail.njk`).

You don't need to touch `lib/placeholder-art.mjs` or remove anything — just stop calling the shortcode for whichever entity now has real art.

---

## How to add a new video (real workflow — video is a real content type)

Video is not a placeholder feature. `src/_data/videos.js` is a genuine content file, exactly like `characters.js`/`destinations.js`/`books.js`, and the site already has real rendering logic wired up for it: the homepage Watch section, `/watch/`, the "Watch [name]" section on every character/destination/book page, and search results all pull from this one file.

**Higgsfield is your production tool, not the site's video host.** The site needs the exported result — either a real `.mp4` file, or a published YouTube ID — not a Higgsfield project link.

### The key thing to understand: file existence, not a status flag, controls what's live

Every record in `videos.js` has a `status` field, but **that field is documentation only**. What actually determines whether a video plays or shows an "awaiting export" placeholder is whether the real file exists on disk at build time (see `lib/video-status.mjs`). This means:

> **Adding a real video is: export from Higgsfield → name the file correctly → drop it in the right folder → rebuild. That's it. No data-file edit required, unless you're also changing the title, caption, or which character/destination/book it's tagged to.**

This was tested during development: dropping a file into `src/assets/videos/koa-welcome.mp4` with zero changes to `videos.js` flipped that video from a placeholder card to a real, playing `<video>` element on the next build, everywhere it appears (homepage, `/watch/`, Koa's and Gully's crew pages, search). Removing the file reverted it just as cleanly.

### Exact naming — self-hosted clips

Export short (under ~20 seconds), compressed clips for anything that autoplays as a preview — character intros, destination teasers. Name and place them exactly as the matching record in `videos.js` expects:

```
src/assets/videos/koa-welcome.mp4
src/assets/videos/gully-intro.mp4
src/assets/videos/dune-intro.mp4
src/assets/videos/moku-intro.mp4
src/assets/videos/boko-intro.mp4
src/assets/videos/byron-bay-adventure.mp4
src/assets/videos/hawaii-adventure.mp4
src/assets/videos/solomon-islands-adventure.mp4
```

Poster images (shown before the video loads, and as the fallback if a visitor's connection/settings skip autoplay) go in the matching `posters/` subfolder, same base filename, `.jpg`:

```
src/assets/videos/posters/koa-welcome.jpg
src/assets/videos/posters/gully-intro.jpg
...
```

If you export a video the current `videos.js` doesn't already have a record for, add one — copy an existing self-hosted entry as your template, set `file` and `poster` to match your new filenames, and pick a `characterSlugs`/`destinationSlug`/`bookSlug` so it shows up in the right places automatically.

### When to use YouTube instead of self-hosting

**Self-hosted `.mp4` files are served directly by Netlify — fine for short preview clips, but heavy for anything longer.** For "Behind the Adventure" pieces, full explainers, or anything over ~30 seconds, publish to YouTube first and reference the video ID instead:

```js
{
  slug: "making-koas-world",
  category: "behind-the-adventure",
  source: "youtube",
  youtubeId: "dQw4w9WgXcQ",     // ← the real ID once published
  poster: "/assets/videos/posters/making-koas-world.jpg",
  ...
}
```

Same principle applies: the record already exists with `youtubeId: null` — filling in the real ID is the only change needed to go live. The site never embeds the YouTube iframe until someone actually clicks (a lightweight thumbnail-and-play-button "facade" loads instead), so a page with several YouTube videos on it doesn't pay YouTube's ~500KB+ embed weight for videos nobody's watched yet.

### What the site handles automatically, so you don't have to think about it

- **Lazy loading** — self-hosted videos don't download until they're actually scrolled near-visible (IntersectionObserver, `preload="none"`).
- **Autoplay when visible, pause when not** — handled per-video as it enters/leaves the viewport.
- **Reduced motion / data saver** — if a visitor has `prefers-reduced-motion` on, or their browser reports `navigator.connection.saveData`, videos don't autoplay at all — they show the poster and wait for a click.
- **Sound** — every video starts muted; each card has its own small sound-toggle button (not a single global "unmute everything" — a grid of several autoplaying videos shouldn't all switch to sound from one tap).
- **`playsinline`** — set on every self-hosted video, so it doesn't force fullscreen on mobile.

You genuinely don't need to touch `app.js`, any `.njk` template, or `styles.css` for the common case of adding a video that fits the existing categories and content types. Only touch the templates if you're introducing something structurally new — a video category the dropdown above doesn't cover, or a dedicated single-video detail page (which doesn't exist yet; if you want one, `src/crew/detail.njk` is the closest existing pattern to copy).

---

## How to publish to Netlify

**First time:**
1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In Netlify: "Add new site" → "Import an existing project" → pick the repo.
3. Netlify will read `netlify.toml` automatically — build command `npm run build`, publish directory `_site`. You shouldn't need to type these in manually, but if the UI asks: Build command = `npm run build`, Publish directory = `_site`.
4. Deploy. Every push to your main branch rebuilds and redeploys automatically from then on.

**Local preview of a production build** (to catch anything `npm run serve`'s live-reload might paper over):
```bash
npm run build
npx serve _site      # or: cd _site && python3 -m http.server 8080
```



---

## How to update navigation

Everything nav-related lives in **`src/_data/site.js`** — nowhere else.

```js
nav: [
  { label: "Explore", href: "/world/" },
  // add/remove/reorder entries here — every page picks this up automatically
],
headerExtra: [
  // the smaller links next to the nav (Search, For Grown-Ups, Beach Shack)
],
footer: {
  columns: [
    // each column is { heading, links: [{label, href}] }
  ]
}
```

Change it once, it updates on all 62+ pages, because `src/_includes/partials/header.njk` and `footer.njk` both just loop over this data. You should never need to touch either of those partial files just to change a link.

---

## How to update colours

**`src/styles.css`**, top of the file, inside `:root { }`:

```css
--teal: #4A7A7A;      /* primary — buttons, structure */
--rust: #C4633A;      /* ACCENT ONLY — see the Series Bible's palette-restraint rule */
--mustard: #D9A441;   /* ACCENT ONLY */
--cream: #F5EFE3;     /* base background */
```

Everything else in the stylesheet references these variables, not hardcoded hex values — change a token here, it cascades everywhere. **Resist the urge to make rust or mustard a primary/dominant color again** — that was V1's mistake, corrected in this version, and it's an explicit rule in the Series Bible, not just a preference.

---

## How to update SEO defaults

**`src/_data/site.js`**:
```js
siteUrl: "https://catalyxkids.com.au",   // update if the production domain ever changes
defaultDescription: "...",                // fallback when a page doesn't set its own
defaultOgImage: "/assets/ui/social-share-default.jpg",  // placeholder — see below
```

**Per-page SEO** (title, description, social preview) is set in each page's front matter — either as static values (`title: Watch` at the top of `src/watch.njk`) or, for data-driven pages, as `eleventyComputed` values (see `src/crew/detail.njk` for the pattern: `title: "{{ character.name | safe }}"`).

**The default social-share image is still a placeholder path that doesn't exist yet** (`src/assets/ui/social-share-default.jpg`) — export a real 1200×630px image from your brand assets and drop it at that exact path before launch, or every shared link will show a broken image in previews.

---

## How to update social links

**`src/_data/site.js`** → `social` array:
```js
social: [
  { label: "Instagram", icon: "📸", href: "#" },   // ← replace "#" with the real profile URL
  ...
]
```
These currently all point to `#` — nobody's real profile URLs were on hand when this was built. Swap them in whenever you have them; the homepage's Follow section reads straight from this array.

---

## Why this exists — the short version, for anyone else who opens this repo

The site is prerendered with [Eleventy](https://11ty.dev) from three content files (`characters.js`, `destinations.js`, `books.js`) plus one config file (`site.js`). Templates read that data and generate real static HTML at build time — every character, destination, and book gets a real prerendered page with correct SEO tags, not a client-rendered shell. No React, no server, no database. Deploys as static files to Netlify. Adding content means editing data files, never writing new templates, for anything already covered by the existing three content types.

If you're an AI assistant reading this to get oriented: the data model, the related-content cross-referencing (`lib/related.mjs`), and the placeholder-art system (`lib/placeholder-art.mjs`) are the load-bearing pieces. Everything else is fairly conventional Eleventy/Nunjucks.

## Audio, cutouts, and image formats (added in V1.0)

- **Koa's hero voice line**: drop a file at `src/assets/audio/koa-welcome.mp3` (or `.m4a`) and the
  accessible sound toggle appears on The Welcome automatically. Delete the file and the control
  disappears. No template edits — same file-existence pattern as all art. Verify any new VO take
  with a transcription check before shipping it.
- **Character cutouts**: `src/assets/characters/cutouts/<slug>.webp` holds transparent-background
  versions used where characters stand inside scenes (the Choose Your Adventure doorways).
  If a cutout is missing the doorway falls back to a circle-cropped portrait automatically.
  Cutouts are made locally (flood-fill the flat cream background to transparency, trim, export) —
  no credits needed.
- **Image format practice**: all character art ships as **512px WebP** (portraits display at
  ≤240px, so 512 covers retina). The art auto-detection checks `.png`, `.jpg`, `.jpeg`, `.webp`
  in that order — if you drop in a new PNG, it will win over an existing WebP of the same slug,
  so remove the old file when replacing art. Keep source-resolution masters in Higgsfield, not
  in the repo.
