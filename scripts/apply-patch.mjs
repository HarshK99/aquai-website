// Usage: node scripts/apply-patch.mjs patch.json
// paste the exported JSON into a file and pass it as the argument
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const patchFile = process.argv[2];

if (!patchFile) {
  console.error("Usage: node scripts/apply-patch.mjs <patch.json>");
  process.exit(1);
}

const patch = JSON.parse(readFileSync(patchFile, "utf8"));
const patchMap = Object.fromEntries(patch.map(p => [p.slug, p]));

const jsonPath = join(__dirname, "../data/products.json");
const data = JSON.parse(readFileSync(jsonPath, "utf8"));

let updated = 0;
data.products = data.products.map(p => {
  const patch = patchMap[p.slug];
  if (!patch) return p;
  updated++;
  return { ...p, category: patch.category, colors: patch.colors };
});

writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");
console.log(`✓ Updated ${updated} products`);
