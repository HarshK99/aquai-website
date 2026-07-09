/**
 * Compresses and resizes every JPEG under public/products/ to max 1200px, quality 80.
 * In-place. Safe to re-run (already-small images are skipped).
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdirSync, statSync, renameSync, existsSync } from "fs";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const productsDir = join(root, "public", "products");

if (!existsSync(productsDir)) {
  console.log("public/products/ not found — run generate-placeholders.mjs first.");
  process.exit(0);
}

function collectJpegs(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectJpegs(full));
    } else if ([".jpg", ".jpeg"].includes(extname(full).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

const files = collectJpegs(productsDir);
let optimized = 0;
let skipped = 0;

for (const file of files) {
  const meta = await sharp(file).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  if (w <= 1200 && h <= 1200) {
    skipped++;
    continue;
  }

  const tmp = file + ".opt.jpeg";
  await sharp(file)
    .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toFile(tmp);

  renameSync(tmp, file);
  console.log(`✓ ${file.replace(root, "").replace(/\\/g, "/")}  (${w}×${h} → 1200px max)`);
  optimized++;
}

console.log(`\nOptimized ${optimized} image(s). Skipped ${skipped} (already ≤1200px).`);
