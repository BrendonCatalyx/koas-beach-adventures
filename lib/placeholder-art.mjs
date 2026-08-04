/**
 * PLACEHOLDER ART GENERATORS
 * ----------------------------
 * Previously ran in the browser (app.js) because pages rendered client-side.
 * Now runs at BUILD TIME as Eleventy shortcodes — the generated SVG is baked
 * into the static HTML, so it shows up in "view source" and in a link
 * preview crawler, not just after JS executes. Same visual output as v2.0.
 *
 * ART SWAP: once real Higgsfield exports land in /src/assets/{characters,
 * destinations,books}/, replace calls to these in the .njk templates with
 * a plain <img src="/assets/.../{{ slug }}.png">.
 */

export function characterAvatarSVG(character, size = 120){
  const initial = (character.name || '?').charAt(0);
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="${character.name} portrait placeholder">
    <circle cx="50" cy="50" r="50" fill="${character.swatch}"/>
    <circle cx="50" cy="50" r="50" fill="#000" opacity="0.05"/>
    <text x="50" y="60" font-family="Fredoka, sans-serif" font-size="38" font-weight="600" fill="#fff" text-anchor="middle">${initial}</text>
  </svg>`;
}

export function tileArtSVG(seedColor, label, size = 240){
  const safeId = 'g-' + String(label).replace(/[^a-zA-Z0-9]/g,'');
  return `
  <svg width="100%" height="100%" viewBox="0 0 240 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label} illustration placeholder">
    <defs>
      <linearGradient id="${safeId}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${seedColor}"/>
        <stop offset="1" stop-color="#1F3438" stop-opacity=".35"/>
      </linearGradient>
    </defs>
    <rect width="240" height="240" fill="url(#${safeId})"/>
    <circle cx="190" cy="40" r="26" fill="#fff" opacity=".18"/>
    <path d="M0 170 Q60 140 120 170 T240 170 V240 H0 Z" fill="#fff" opacity=".14"/>
  </svg>`;
}

export function boatSVG(size = 64, bobbing = true){
  return `
  <svg class="boat-marker${bobbing ? ' bob' : ''}" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true">
    <line class="mast" x1="50" y1="20" x2="50" y2="58"/>
    <path class="sail" d="M50,22 L50,55 L26,55 Z"/>
    <rect class="patch-a" x="31" y="34" width="8" height="8" rx="1"/>
    <rect class="patch-b" x="40" y="44" width="7" height="7" rx="1"/>
    <path class="hull" d="M18,58 L82,58 L72,78 Q50,86 28,78 Z"/>
  </svg>`;
}

export function shellSVG(){
  return `<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
    <path d="M32 6 C46 6 56 22 56 40 C56 48 46 52 32 52 C18 52 8 48 8 40 C8 22 18 6 32 6 Z" fill="#F5EFE3"/>
    <path d="M32 12 L32 48 M32 16 L20 44 M32 16 L44 44 M32 22 L14 42 M32 22 L50 42" stroke="#B8935A" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`;
}
