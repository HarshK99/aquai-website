import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonPath = join(__dirname, "../data/products.json");
const data = JSON.parse(readFileSync(jsonPath, "utf8"));

// ── 1. Proper-case category names ──────────────────────────────────────
const CAT_RENAME = {
  "Drainage water management": "Drainage Water Management",
  "Accessories and storage":   "Accessories and Storage",
  "Bathing and Fittings":      "Bathing and Fittings",   // already OK
  "Sanitary ware":             "Sanitary Ware",
  "Safety and supports":       "Safety and Supports",
  "Hardware and installations":"Hardware and Installations",
  "SS Sink":                   "SS Sink",                // already OK
};

data.categories = data.categories.map(cat => ({
  ...cat,
  name: CAT_RENAME[cat.name] ?? cat.name,
}));

// ── 2. Update every product's category field to match ──────────────────
data.products = data.products.map(p => ({
  ...p,
  category: p.category ? (CAT_RENAME[p.category] ?? p.category) : null,
}));

// ── 3. Add Black/Gold/Rose Gold variants to specified existing products ─
const COLOR_OPTIONS = ["Black", "Gold", "Rose Gold"];

const ADD_COLORS_TO = new Set([
  // Cat 1 — all long drain channel products
  "shower-bathroom-accessories-long-drain-channel-for-shower",
  // Cat 1 — SS Square Line Grating Heavy
  "shower-bathroom-accessories-ss-square-line-grating-heavy",
  // Cat 1 — all floor trap drain products
  "shower-bathroom-accessories-floor-trap-drain",
  // ↓ new products added below also get colors via their variants field
]);

data.products = data.products.map(p => {
  if (!ADD_COLORS_TO.has(p.slug)) return p;
  const existing = new Set(p.variants);
  const merged = [...p.variants];
  for (const v of COLOR_OPTIONS) {
    if (!existing.has(v)) merged.push(v);
  }
  return { ...p, variants: merged };
});

// ── 4. Add new products (idempotent — skip if slug already present) ────
const existingSlugs = new Set(data.products.map(p => p.slug));

function makeProduct(slug, name, series, category, extras = {}) {
  return {
    slug,
    product_name: name,
    type: name,
    series,
    subgroup: extras.subgroup ?? null,
    finish: extras.finish ?? null,
    material_grade: extras.material_grade ?? null,
    image: `/products/${series}/${slug}.jpeg`,
    gallery: [],
    code_no: null,
    d_p: null,
    size: null,
    thickness: null,
    features: [],
    variants: extras.variants ?? [],
    bowl_dimensions: null,
    box_pkg: null,
    capacity: null,
    featured: false,
    category,
  };
}

const SBA = "shower-bathroom-accessories";

const newProducts = [
  // ── Cat 7 user → Hardware and Installations ──────────────────────────
  makeProduct(
    `${SBA}-double-nail-clamp-upvc-pipe`,
    "Double Nail Clamp for UPVC Pipe",
    SBA, "Hardware and Installations",
    { subgroup: "Fixing & Mounting Hardware" }
  ),
  makeProduct(
    `${SBA}-double-nail-clamp-cpvc-pipe`,
    "Double Nail Clamp for CPVC Pipe",
    SBA, "Hardware and Installations",
    { subgroup: "Fixing & Mounting Hardware" }
  ),

  // ── Cat 2 user → Accessories and Storage ─────────────────────────────
  makeProduct(
    `${SBA}-ss-mirror-cabinet`,
    "SS Mirror Cabinet",
    SBA, "Accessories and Storage",
    { material_grade: "SS 304" }
  ),

  // ── Cat 1 user → Drainage Water Management ───────────────────────────
  makeProduct(
    `${SBA}-long-drain-cover`,
    "Long Drain Cover",
    SBA, "Drainage Water Management",
    { subgroup: "Shower & Drainage" }
  ),
  makeProduct(
    `${SBA}-triangle-floor-drain-plain-tiles`,
    "Triangle Floor Drain Plain Tiles",
    SBA, "Drainage Water Management",
    { subgroup: "Shower & Drainage", variants: [...COLOR_OPTIONS] }
  ),
  makeProduct(
    `${SBA}-floor-drain-locking-type`,
    "Floor Drain Locking Type",
    SBA, "Drainage Water Management",
    { subgroup: "Shower & Drainage", variants: [...COLOR_OPTIONS] }
  ),
  makeProduct(
    `${SBA}-corner-drain-l-type`,
    "Corner Drain L Type",
    SBA, "Drainage Water Management",
    { subgroup: "Shower & Drainage", variants: [...COLOR_OPTIONS] }
  ),
  makeProduct(
    `${SBA}-clean-out-locking-cover`,
    "Clean Out Locking Cover",
    SBA, "Drainage Water Management",
    { subgroup: "Shower & Drainage", variants: [...COLOR_OPTIONS] }
  ),

  // ── Cat 3 user → Bathing and Fittings ────────────────────────────────
  makeProduct(
    `${SBA}-3-waste-coupling-k-type-long`,
    "3-Waste Coupling K Type Long",
    SBA, "Bathing and Fittings",
    { subgroup: "Plumbing & Valves", variants: [...COLOR_OPTIONS] }
  ),
];

let added = 0;
for (const p of newProducts) {
  if (!existingSlugs.has(p.slug)) {
    data.products.push(p);
    existingSlugs.add(p.slug);
    added++;
    console.log(`  + ${p.product_name}`);
  } else {
    console.log(`  ~ already exists: ${p.slug}`);
  }
}

writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");
console.log(`\n✓ Done. ${added} products added. Category names updated to proper case.`);
