// ─────────────────────────────────────────────────────────────────────────
//  Regenerates every brand asset from lib/mark.mjs + Hanken Grotesk.
//  Portable: rasterization is done with sharp, so it runs anywhere (incl. CI),
//  no macOS tooling required.  Run:  npm install && npm run build
// ─────────────────────────────────────────────────────────────────────────
import {readFileSync, writeFileSync, mkdirSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";
import {C, markGroup, logoSVG, avatarSVG, faviconSVG, monoSVG, tileSVG} from "./lib/mark.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(DIR, "assets");
mkdirSync(OUT, {recursive: true});

// ── font ──
const FONT = path.join(DIR, "node_modules/@expo-google-fonts/hanken-grotesk/800ExtraBold/HankenGrotesk_800ExtraBold.ttf");
const fb = readFileSync(FONT);
const font = opentype.parse(fb.buffer.slice(fb.byteOffset, fb.byteOffset + fb.byteLength));

// ── wordmark helpers ──
const FS = 132;
const LETTER = -0.015 * FS;
function outline(str) {
  const full = new opentype.Path();
  let x = 0;
  for (const ch of str) {
    full.extend(font.getPath(ch, x, 0, FS));
    x += font.getAdvanceWidth(ch, FS) + LETTER;
  }
  const bb = full.getBoundingBox();
  return {d: full.toPathData(2), x1: bb.x1, x2: bb.x2, y1: bb.y1, y2: bb.y2};
}
const MARK = 118, GAP = 30, PAD = 12;
function scaledMark(accent, zone) {
  const s = MARK / 96;
  return `  <g transform="translate(${PAD} ${PAD}) scale(${s.toFixed(4)})">
${markGroup({accent, zone})}
  </g>`;
}
function lockup(word, {textFill, accent, zone}) {
  const t = outline(word);
  const midline = (t.y1 + t.y2) / 2;
  const baselineY = PAD + MARK / 2 - midline;
  const textX = PAD + MARK + GAP;
  const W = Math.round(textX + (t.x2 - t.x1) + PAD);
  const H = Math.round(MARK + PAD * 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="${word}">
  <title>${word}</title>
${scaledMark(accent, zone)}
  <path transform="translate(${(textX - t.x1).toFixed(1)} ${baselineY.toFixed(1)})" d="${t.d}" fill="${textFill}"/>
</svg>
`;
}
function wordmarkOnly(word) {
  const t = outline(word);
  const W = Math.round(t.x2 - t.x1 + PAD * 2);
  const H = Math.round(t.y2 - t.y1 + PAD * 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="${word}">
  <title>${word}</title>
  <path transform="translate(${(PAD - t.x1).toFixed(1)} ${(PAD - t.y1).toFixed(1)})" d="${t.d}" fill="currentColor"/>
</svg>
`;
}

// ── rasterization ──
async function png(svgStr, targetW) {
  const iw = Number(svgStr.match(/width="(\d+)"/)[1]);
  const density = Math.min(2400, Math.max(72, Math.round((72 * targetW * 2) / iw)));
  return sharp(Buffer.from(svgStr), {density}).resize({width: targetW}).png().toBuffer();
}
async function ico(faviconSvg, outPath) {
  const sizes = [16, 32, 48];
  const frames = [];
  for (const s of sizes) {
    const data = await sharp(Buffer.from(faviconSvg), {density: 400}).resize(s, s, {fit: "contain", background: {r: 0, g: 0, b: 0, alpha: 0}}).png().toBuffer();
    frames.push({size: s, data});
  }
  const H = 6, E = 16;
  const header = Buffer.alloc(H);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(frames.length, 4);
  let offset = H + E * frames.length;
  const entries = frames.map((f) => {
    const e = Buffer.alloc(E);
    e.writeUInt8(f.size, 0); e.writeUInt8(f.size, 1);
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
    e.writeUInt32LE(f.data.length, 8); e.writeUInt32LE(offset, 12);
    offset += f.data.length;
    return e;
  });
  writeFileSync(outPath, Buffer.concat([header, ...entries, ...frames.map((f) => f.data)]));
}

// ── write everything ──
const write = (name, str) => { writeFileSync(path.join(OUT, name), str); return str; };
const writePNG = async (name, svgStr, w) => writeFileSync(path.join(OUT, name), await png(svgStr, w));

const marks = {
  "logo.svg": logoSVG(),
  "avatar.svg": avatarSVG(),
  "favicon.svg": faviconSVG(),
  "logo-mono.svg": monoSVG(),
  "tile.svg": tileSVG("light"),
};
for (const [n, s] of Object.entries(marks)) write(n, s);

const lockups = {
  "dropzone-lockup.svg": lockup("dropzone", {textFill: C.ink, accent: C.accent.light, zone: C.zone.light}),
  "dropzone-lockup-dark.svg": lockup("dropzone", {textFill: C.paper, accent: C.accent.dark, zone: C.zone.dark}),
  "fileselector-lockup.svg": lockup("file-selector", {textFill: C.ink, accent: C.accent.light, zone: C.zone.light}),
  "fileselector-lockup-dark.svg": lockup("file-selector", {textFill: C.paper, accent: C.accent.dark, zone: C.zone.dark}),
  "wordmark.svg": wordmarkOnly("dropzone"),
};
for (const [n, s] of Object.entries(lockups)) write(n, s);

// rasters
await writePNG("logo.png", marks["logo.svg"], 512);
await writePNG("avatar.png", marks["avatar.svg"], 512);
await writePNG("tile.png", marks["tile.svg"], 512);
await writePNG("dropzone-lockup.png", lockups["dropzone-lockup.svg"], Math.round(Number(lockups["dropzone-lockup.svg"].match(/width="(\d+)"/)[1]) * 2));
await writePNG("fileselector-lockup.png", lockups["fileselector-lockup.svg"], Math.round(Number(lockups["fileselector-lockup.svg"].match(/width="(\d+)"/)[1]) * 2));
await ico(marks["favicon.svg"], path.join(OUT, "favicon.ico"));

const all = [...Object.keys(marks), ...Object.keys(lockups), "logo.png", "avatar.png", "tile.png", "dropzone-lockup.png", "fileselector-lockup.png", "favicon.ico"];
console.log(`✓ generated ${all.length} assets into assets/:\n  ${all.sort().join("\n  ")}`);
