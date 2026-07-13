// ─────────────────────────────────────────────────────────────────────────
//  Canonical geometry + palette for the dropzone / file-selector identity.
//  This is the SINGLE SOURCE OF TRUTH. Every asset is derived from here, so a
//  change to the mark happens in one place. See ../BRAND.md for the spec.
// ─────────────────────────────────────────────────────────────────────────

// Palette (see BRAND.md §Color).
export const C = {
  accent: {light: "#E23A2C", dark: "#F0574A"}, // Vermilion — the arrow
  zone: {light: "#C9B8B4", dark: "#5C4741"}, // Zone grey — the dashes
  ink: "#2A1D1B", // wordmark on light
  paper: "#F6EEEB", // wordmark on dark
  deep: "#B01B22",
  tile: {light: ["#F4604E", "#C11B26"], dark: ["#FF6B57", "#D0201F"]},
};

// Geometry on the 96 × 96 grid. The arrow is vertically centered in the zone:
// zone spans y 9.5–86.5 (centre 48); the arrow spans y 29–65 so its head mass
// sits on the centre line rather than riding high.
export const G = {
  rect: {x: 9.5, y: 9.5, w: 77, h: 77, rx: 22},
  shaft: "M48 29 V62",
  head: "M31 47 L48 65 L65 47",
};

const svg = (viewBox, w, h, inner, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${viewBox}" fill="none" role="img" aria-label="${label}">
  <title>${label}</title>
${inner}
</svg>
`;

// The mark's inner geometry — reused by the standalone marks AND the lockups.
export function markGroup({accent, zone, zoneStroke = 5, arrowStroke = 8, dash = "13 12"} = {}) {
  const {x, y, w, h, rx} = G.rect;
  return `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="none" stroke="${zone}" stroke-width="${zoneStroke}" stroke-linecap="round" stroke-dasharray="${dash}"/>
  <g stroke="${accent}" stroke-width="${arrowStroke}" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="${G.shaft}"/>
    <path d="${G.head}"/>
  </g>`;
}

// ── standalone marks ──────────────────────────────────────────────────────

export const logoSVG = () =>
  svg("0 0 96 96", 256, 256, markGroup({accent: C.accent.light, zone: C.zone.light}), "dropzone");

export const avatarSVG = () =>
  // Extra padding so nothing clips in a circular avatar crop.
  svg("-14 -14 124 124", 512, 512, markGroup({accent: C.accent.light, zone: C.zone.light}), "dropzone");

export const faviconSVG = () =>
  // Tightened crop + heavier strokes so the mark holds at 16 px.
  svg(
    "3 3 90 90",
    64,
    64,
    markGroup({accent: C.accent.light, zone: C.zone.light, zoneStroke: 5.5, arrowStroke: 9, dash: "12 11"}),
    "dropzone",
  );

export const monoSVG = () => {
  const {x, y, w, h, rx} = G.rect;
  const inner = `  <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" stroke-width="5" stroke-dasharray="13 12" opacity="0.45"/>
    <path d="${G.shaft}" stroke-width="8"/>
    <path d="${G.head}" stroke-width="8"/>
  </g>`;
  return svg("0 0 96 96", 256, 256, inner, "dropzone");
};

export const tileSVG = (theme = "light") => {
  const [g1, g2] = C.tile[theme];
  const inner = `  <defs>
    <linearGradient id="dz-tile" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${g1}"/><stop offset="1" stop-color="${g2}"/>
    </linearGradient>
  </defs>
  <rect width="96" height="96" rx="24" fill="url(#dz-tile)"/>
  <rect x="20" y="20" width="56" height="56" rx="15" fill="none" stroke="#ffffff" stroke-opacity="0.42" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="9 8"/>
  <g stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M48 32 V58"/>
    <path d="M36 48 L48 61 L60 48"/>
  </g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 96 96" role="img" aria-label="dropzone tile">
  <title>dropzone tile</title>
${inner}
</svg>
`;
};
