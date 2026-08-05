/**
 * VIDEO STATUS RESOLVER
 * -----------------------
 * The `status` field inside a videos.js record is documentation only —
 * what actually determines whether a video renders as playable or as an
 * "awaiting export" placeholder is whether the real file exists on disk
 * at build time. That's the whole point: once Brendon drops
 * koa-welcome.mp4 into src/assets/videos/, it goes live on the next
 * build with ZERO data-file edits required.
 *
 * External (YouTube/Vimeo) videos can't be existence-checked the same
 * way — those go live the moment a real youtubeId/vimeoId is added.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_ROOT = path.join(__dirname, "..", "src");

export function fileExists(relativePath) {
  if (!relativePath) return false;
  const full = path.join(SRC_ROOT, relativePath.replace(/^\//, ""));
  return fs.existsSync(full);
}

/** Returns "live" or "awaiting-export" — the only two states templates need to branch on. */
export function resolveVideoStatus(video) {
  if (video.source === "youtube" || video.source === "vimeo") {
    return (video.youtubeId || video.vimeoId) ? "live" : "awaiting-export";
  }
  return fileExists(video.file) ? "live" : "awaiting-export";
}

export function posterExists(video) {
  return fileExists(video.poster);
}

/** Filters videos.js by any combination of character/destination/book/category. */
export function videosFor(videos, { characterSlug, destinationSlug, bookSlug, category, featuredOnly } = {}) {
  return videos.filter(v => {
    if (characterSlug && !(v.characterSlugs || []).includes(characterSlug)) return false;
    if (destinationSlug && v.destinationSlug !== destinationSlug) return false;
    if (bookSlug && v.bookSlug !== bookSlug) return false;
    if (category && v.category !== category) return false;
    if (featuredOnly && !v.featured) return false;
    return true;
  });
}

/** True if at least one video is actually playable (real file/ID exists) — used to decide whether the homepage Watch section is worth showing at all. */
export function anyLiveVideos(videos) {
  return videos.some(v => resolveVideoStatus(v) === "live");
}
