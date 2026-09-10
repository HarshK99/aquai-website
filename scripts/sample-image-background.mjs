import sharp from "sharp";
import { access, readFile, writeFile } from "node:fs/promises";

// Sample empty margins, not the product. Inspect each source before reusing.
// Usage: node scripts/sample-image-background.mjs public/products/example.jpeg
async function sampleImageBackground(source) {
  const { data, info } = await sharp(source).removeAlpha().toColourspace("srgb")
    .raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const strip = Math.max(1, Math.floor(Math.min(width, height) * 0.01));

  function sample(regions) {
    const rgb = [[], [], []];
    for (const [left, top, right, bottom] of regions) {
      for (let y = top; y < bottom; y++) {
        for (let x = left; x < right; x++) {
          const offset = (y * width + x) * channels;
          rgb.forEach((values, channel) => values.push(data[offset + channel]));
        }
      }
    }
    const median = rgb.map(values => values.sort((a, b) => a - b)[Math.floor(values.length / 2)]);
    return `#${median.map(value => value.toString(16).padStart(2, "0")).join("")}`;
  }

  const middle = Math.floor(height / 2);
  return {
    source, width, height,
    background: {
      top: sample([[0, 0, width, strip]]),
      middle: sample([[0, middle - strip, strip, middle + strip], [width - strip, middle - strip, width, middle + strip]]),
      bottom: sample([[0, height - strip, width, height]]),
    },
  };
}

const source = process.argv[2];
if (!source) throw new Error("Provide an image path, --collections, or --products to sample.");

if (source === "--collections" || source === "--products") {
  const catalog = JSON.parse(await readFile("data/products.json", "utf8"));
  const entries = source === "--collections" ? catalog.categories : catalog.products;
  const output = source === "--collections"
    ? "data/collection-image-backgrounds.json" : "data/product-image-backgrounds.json";
  const profiles = {};
  for (const { image } of entries) {
    if (profiles[image]) continue;
    try {
      await access(`public${image}`);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      console.warn(`Missing source, skipped: ${image}`);
      continue;
    }
    const { width, height, background } = await sampleImageBackground(`public${image}`);
    profiles[image] = { width, height, background };
  }
  await writeFile(output, `${JSON.stringify(profiles, null, 2)}\n`);
  console.log(`Measured ${Object.keys(profiles).length} images; saved ${output}`);
} else {
  console.log(JSON.stringify(await sampleImageBackground(source), null, 2));
}
