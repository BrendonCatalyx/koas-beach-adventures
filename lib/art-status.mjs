/**
 * ART STATUS RESOLVER
 * ---------------------
 * Same principle as lib/video-status.mjs: whether a character or
 * destination shows real art or a placeholder is determined by whether a
 * file actually exists on disk at build time — not by a manually-edited
 * flag. Checks a few common extensions so it doesn't matter whether an
 * export lands as .png, .jpg, or .webp.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_ROOT = path.join(__dirname, "..", "src");
const EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

function findExisting(folder, slug) {
  for (const ext of EXTENSIONS) {
    const rel = `/assets/${folder}/${slug}${ext}`;
    if (fs.existsSync(path.join(SRC_ROOT, rel.replace(/^\//, "")))) {
      return rel;
    }
  }
  return null;
}

/** Returns the real art path if it exists on disk, otherwise null (→ template falls back to placeholder). */
export function characterArtPath(character) {
  return findExisting("characters", character.slug);
}

/** Transparent-background cutout of a character (for placing inside scenes, e.g. the
 * Choose Your Adventure doorways). Auto-detected like all other art. */
export function characterCutoutPath(character) {
  return findExisting("characters/cutouts", character.slug);
}

/** Character standing in their painted home environment — used as detail-page hero art. */
export function characterScenePath(character) {
  return findExisting("characters/scenes", character.slug);
}

export function destinationArtPath(destination) {
  return findExisting("destinations", destination.slug);
}

export function bookArtPath(book) {
  return findExisting("books", book.slug);
}

/** The most recently published destination — used to anchor the atlas boat marker. */
export function lastLiveDestination(destinations) {
  const live = destinations.filter(d => d.status === "live");
  return live.length ? live[live.length - 1] : destinations[0];
}

/** Live destinations reduced to just {slug, mapX, mapY} — for the client-side atlas-boat sailing animation. */
export function liveRoutePoints(destinations) {
  return destinations.filter(d => d.status === "live").map(d => ({ slug: d.slug, mapX: d.mapX, mapY: d.mapY }));
}

/** Smooth SVG path (Catmull-Rom → cubic Bezier) through live destinations, in series order — an organic
 * wandering route instead of straight dashed segments between pins. */
export function routePathD(destinations) {
  const pts = destinations.filter(d => d.status === "live").map(d => [d.mapX, d.mapY]);
  if (pts.length < 2) return "";
  function toBezier(p0, p1, p2, p3) {
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    return [c1, c2, p2];
  }
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const [c1, c2, end] = toBezier(p0, p1, p2, p3);
    d += ` C ${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${end[0]},${end[1]}`;
  }
  return d;
}

/** Hero video: checks src/assets/videos/hero.mp4 (and common alternates) plus its poster. */
export function heroVideoPath() {
  for (const ext of [".mp4", ".webm"]) {
    const rel = `/assets/videos/hero${ext}`;
    if (fs.existsSync(path.join(SRC_ROOT, rel.replace(/^\//, "")))) return rel;
  }
  return null;
}

export function heroPosterPath() {
  return findExisting("videos/posters", "hero");
}

/** Koa's Welcome voice line — auto-detected exactly like the hero video/art. No file yet, so the sound
 * control simply doesn't render until one exists. Checks src/assets/audio/koa-welcome.{mp3,m4a}. */
export function heroVoicePath() {
  for (const ext of [".mp3", ".m4a"]) {
    const rel = `/assets/audio/koa-welcome${ext}`;
    if (fs.existsSync(path.join(SRC_ROOT, rel.replace(/^\//, "")))) return rel;
  }
  return null;
}
