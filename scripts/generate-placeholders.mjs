/**
 * Generates 1200×1200 mist-background placeholder JPEGs for every product
 * image and series cover missing from public/products/.
 * Idempotent — never overwrites an existing file.
 * Usage: node scripts/generate-placeholders.mjs
 *
 * Text layout (DESIGN.md spec):
 *   - Eyebrow: series slug + finish, steel, Manrope-style 22px uppercase
 *   - Name: product_name, navy, Prata-style 52px serif
 *   - Sub: type, steel 26px
 */
import sharp from "sharp";
import { readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const data = JSON.parse(
  readFileSync(join(root, "data", "products.json"), "utf-8")
);

// XML-safe escape for SVG text content
function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Break a long string into lines of at most maxChars
function wrapText(text, maxChars = 22) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    if (current && (current + " " + word).length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildSvg({ title, eyebrow, sub }) {
  const nameLines = wrapText(title, 20);
  const nameFontSize = 52;
  const nameLineHeight = 64;
  const eyebrowFontSize = 22;
  const subFontSize = 26;

  // Vertical layout: total block height, centered in 1200
  const blockHeight =
    (eyebrow ? eyebrowFontSize + 24 : 0) +
    nameLines.length * nameLineHeight +
    (sub ? subFontSize + 20 : 0);
  let y = (1200 - blockHeight) / 2 + (eyebrow ? eyebrowFontSize : nameFontSize);

  const parts = [];

  if (eyebrow) {
    parts.push(
      `<text x="600" y="${Math.round(y)}" text-anchor="middle"
        font-family="Helvetica Neue, Arial, sans-serif"
        font-size="${eyebrowFontSize}" font-weight="600" fill="#5C6B7A"
        letter-spacing="3">${esc(eyebrow.toUpperCase())}</text>`
    );
    y += eyebrowFontSize + 24;
  }

  for (const line of nameLines) {
    parts.push(
      `<text x="600" y="${Math.round(y)}" text-anchor="middle"
        font-family="Georgia, &apos;Times New Roman&apos;, serif"
        font-size="${nameFontSize}" font-weight="400" fill="#196db5">${esc(line)}</text>`
    );
    y += nameLineHeight;
  }

  if (sub) {
    y += 20;
    parts.push(
      `<text x="600" y="${Math.round(y)}" text-anchor="middle"
        font-family="Helvetica Neue, Arial, sans-serif"
        font-size="${subFontSize}" font-weight="400" fill="#5C6B7A">${esc(sub)}</text>`
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="1200" fill="#EFF1F0"/>
  ${parts.join("\n  ")}
</svg>`;
}

async function generate(outputPath, svgContent) {
  const dir = dirname(outputPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  await sharp(Buffer.from(svgContent))
    .jpeg({ quality: 85 })
    .toFile(outputPath);
}

// image path from JSON → absolute file path under public/
function toFilePath(imagePath) {
  // imagePath is like "/products/series/slug.jpeg"
  const parts = imagePath.replace(/^\//, "").split("/");
  return join(root, "public", ...parts);
}

let generated = 0;
let skipped = 0;

// ── Product placeholders ─────────────────────────────────────────────────────
for (const p of data.products) {
  const filePath = toFilePath(p.image);

  if (existsSync(filePath)) {
    skipped++;
    continue;
  }

  const eyebrow = `${p.series.replace(/-/g, " ")} — ${p.finish}`;
  const svg = buildSvg({
    title: p.product_name,
    eyebrow,
    sub: p.type !== p.product_name ? p.type : null,
  });

  await generate(filePath, svg);
  console.log(`✓ ${p.image}`);
  generated++;
}

// ── Series cover placeholders ────────────────────────────────────────────────
for (const s of data.series) {
  const filePath = toFilePath(s.image);

  if (existsSync(filePath)) {
    skipped++;
    continue;
  }

  const svg = buildSvg({
    title: s.name,
    eyebrow: "SERIES",
    sub: s.tagline ?? null,
  });

  await generate(filePath, svg);
  console.log(`✓ ${s.image}`);
  generated++;
}

console.log(
  `\nDone. Generated ${generated} placeholder(s). Skipped ${skipped} existing file(s).`
);
console.log(`Total under public/products/: ${generated + skipped} file(s).`);
