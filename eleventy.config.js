import { characterAvatarSVG, tileArtSVG, boatSVG, shellSVG } from "./lib/placeholder-art.mjs";
import { getRelated, findBySlug } from "./lib/related.mjs";
import { resolveVideoStatus, posterExists, videosFor } from "./lib/video-status.mjs";

export default function (eleventyConfig) {
  // ---------- Static assets, copied as-is into the build output ----------
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/app.js");
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  // ---------- Placeholder art, rendered into real HTML at build time ----------
  // (previously ran client-side; now the SVG is in the static HTML itself,
  // which is what makes it visible to link-preview crawlers and to a
  // "view source" check — see the handbook's SEO section for why this matters)
  eleventyConfig.addShortcode("characterAvatar", characterAvatarSVG);
  eleventyConfig.addShortcode("tileArt", tileArtSVG);
  eleventyConfig.addShortcode("boat", boatSVG);
  eleventyConfig.addShortcode("shell", shellSVG);

  // ---------- Content lookups, usable inside templates as {{ fnName(args) }} ----------
  // IMPORTANT DISTINCTION: addShortcode registers a custom Nunjucks TAG
  // ({% name args %}) — that's correct for the SVG generators above, which
  // are used exactly that way. It is NOT a callable expression function.
  // For functions called as {{ fn(args) }} or inside {% set %}, the right
  // API is addNunjucksGlobal (wraps Nunjucks' native env.addGlobal).
  eleventyConfig.addNunjucksGlobal("findBySlug", findBySlug);
  eleventyConfig.addNunjucksGlobal("getRelated", (type, slug, characters, destinations, books) =>
    getRelated(type, slug, { characters, destinations, books })
  );
  eleventyConfig.addNunjucksGlobal("didYouKnowFacts", (destinations) =>
    destinations.filter(d => d.didYouKnow).map(d => d.didYouKnow)
  );

  // ---------- Video helpers ----------
  eleventyConfig.addNunjucksGlobal("resolveVideoStatus", resolveVideoStatus);
  eleventyConfig.addNunjucksGlobal("posterExists", posterExists);
  eleventyConfig.addNunjucksGlobal("videosFor", videosFor);

  // ---------- Dev server ----------
  eleventyConfig.setServerOptions({ port: 8080 });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
