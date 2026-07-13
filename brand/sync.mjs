// Copy the asset subset a consuming repo needs into its public/ folder.
//   node sync.mjs react-dropzone [targetDir]
//   node sync.mjs file-selector  [targetDir]
// Defaults to the sibling repo checkout next to react-dropzone/.github.
import {copyFileSync, mkdirSync, existsSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(DIR, "assets");

// Shared favicon + the consumer's own lockup. The mark itself is referenced by
// raw URL in READMEs, so it is intentionally NOT copied.
const SHARED = ["favicon.svg", "favicon.ico"];
const CONSUMERS = {
  "react-dropzone": [...SHARED, "dropzone-lockup.svg", "dropzone-lockup-dark.svg"],
  "file-selector": [...SHARED, "fileselector-lockup.svg", "fileselector-lockup-dark.svg"],
};

const name = process.argv[2];
const files = CONSUMERS[name];
if (!files) {
  console.error(`Unknown consumer "${name}". Expected one of: ${Object.keys(CONSUMERS).join(", ")}`);
  process.exit(1);
}

// brand lives at ~/Work/.github/brand → sibling repos (~/Work/<name>) are two levels up.
const target = process.argv[3] ?? path.resolve(DIR, "..", "..", name, "public");
if (!existsSync(path.dirname(target))) {
  console.error(`Target repo not found: ${path.dirname(target)}\nPass an explicit path: node sync.mjs ${name} /path/to/${name}/public`);
  process.exit(1);
}
mkdirSync(target, {recursive: true});

for (const f of files) copyFileSync(path.join(ASSETS, f), path.join(target, f));
console.log(`✓ synced ${files.length} files → ${target}\n  ${files.join("\n  ")}`);
