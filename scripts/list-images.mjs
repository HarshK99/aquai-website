/**
 * Prints every expected image path (product images + series covers).
 * Usage: node scripts/list-images.mjs
 * Useful for confirming filenames before dropping in real photos.
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const data = JSON.parse(readFileSync(join(root, "data", "products.json"), "utf-8"));

console.log("=== Product images ===");
for (const p of data.products) {
  console.log(p.image);
}

console.log("\n=== Series covers ===");
for (const s of data.series) {
  console.log(s.image);
}

console.log(`\nTotal: ${data.products.length} product images + ${data.series.length} series covers = ${data.products.length + data.series.length} files`);
