import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonPath = join(__dirname, "../data/products.json");
const data = JSON.parse(readFileSync(jsonPath, "utf8"));

const SBA = "shower-bathroom-accessories";

// ── 1. Fix product names ────────────────────────────────────────────────────
const NAME_FIXES = {
  [`${SBA}-3-waste-coupling-k-type-long`]: "Waste Coupling K Type Long",
  [`${SBA}-sink-waste-coupling-square-ss304-pvc-body`]: "Sink Waste Coupling Heavy Square",
  [`${SBA}-triangle-floor-drain-plain-tiles`]: "Triangle Floor Drain Plain Tiles Insert",
  [`${SBA}-floor-drain-locking-type`]: "Floor Drain Locking Type Round Hole",
  [`${SBA}-clean-out-locking-cover`]: "Clean-Out Locking Cover",
};

data.products = data.products.map(p => {
  if (NAME_FIXES[p.slug]) {
    console.log(`  ~ rename: ${p.product_name} → ${NAME_FIXES[p.slug]}`);
    return { ...p, product_name: NAME_FIXES[p.slug], type: NAME_FIXES[p.slug] };
  }
  return p;
});

// ── 2. Update d_p / code_no / size / material_grade for existing products ───
const UPDATES = {
  // Ultra Slim Shower (base: 100x100mm)
  "ultra-slim-shower-k-ultra-slim-shower": { d_p: 430, code_no: "BH-139-4", size: "100×100 mm", material_grade: "SS 202", features: ["Mirror Finish"] },

  // Shower Arms
  [`${SBA}-square-shower-arm`]:        { d_p: 280, code_no: "BH-129-9",  size: "225 mm", material_grade: "SS 202" },
  [`${SBA}-oval-shower-arm`]:          { d_p: 270, code_no: "BH-131-9",  size: "225 mm", material_grade: "SS 202" },
  [`${SBA}-round-shower-arm-heavy`]:   { d_p: 410, code_no: "BH-136-12", size: "300 mm", material_grade: "SS 202" },

  // Floor Drains
  [`${SBA}-floor-trap-drain`]:         { d_p: 420, code_no: "BH-1001",   size: "125×125 mm", material_grade: "SS 304", box_pkg: "50 PCS", features: ["Plate: 1.5mm", "Frame: 1mm"] },
  [`${SBA}-cockroach-trap-for-floor-trap`]: { d_p: 470, code_no: "BH-1115", material_grade: "SS 304", box_pkg: "50 PCS" },
  [`${SBA}-one-pic-fix-jali`]:         { d_p: 150, code_no: "BH-1007",   size: "150×150 mm", material_grade: "SS 202", box_pkg: "50 PCS", features: ["For 110mm dia drain"] },

  // Products added in v2 – now updating d_p
  [`${SBA}-long-drain-cover`]:         { d_p: 10880, code_no: "BH-EXT150-4", size: "150×1000×4 mm", material_grade: "SS 304", features: ["Premium SS-304 drainage cover plate"] },
  [`${SBA}-triangle-floor-drain-plain-tiles`]: { d_p: 2550, code_no: "BH-5104", size: "250×250×60 mm", material_grade: "SS 304", features: ["Triangle shape shower insert"] },
  [`${SBA}-floor-drain-locking-type`]: { d_p: 380, code_no: "BH-1101",  size: "125×125 mm", material_grade: "SS 304", features: ["Round hole secure design"] },
  [`${SBA}-corner-drain-l-type`]:      { d_p: 1800, code_no: "BH-2107", size: "150×150 mm", material_grade: "SS 304", features: ["L-Type space saving"] },
  [`${SBA}-clean-out-locking-cover`]:  { d_p: 660, code_no: "BH-2108",  size: "125×125 mm", material_grade: "SS 304", features: ["Locking mechanism"] },
  [`${SBA}-3-waste-coupling-k-type-long`]: { d_p: 420, code_no: "BH-1116CP", size: "32×150 mm", material_grade: "SS/ABS", features: ["Extending long neck"] },

  // Gratings
  [`${SBA}-ss-square-line-grating-heavy`]: { d_p: 170, code_no: "BH-2105A", size: "75×75 mm", material_grade: "SS 304", box_pkg: "12 PCS", features: ["2mm Thick"] },
  [`${SBA}-long-drain-channel-for-shower`]: { d_p: 3550, code_no: "BH-1013-B", size: "100×450 mm", material_grade: "SS 304", features: ["Satin Silver"] },

  // Hardware
  [`${SBA}-rack-bolt-kit`]:            { d_p: 490, code_no: "BH-101",  size: "16×165 mm", material_grade: "SS 202", features: ["Heavy anchor with cosmetic cap"] },
  [`${SBA}-wash-basin-bolt-kit`]:      { d_p: 140, code_no: "BH-105",  size: "10×120 mm", material_grade: "SS 202" },
  [`${SBA}-ewc-floor-mounting-kit`]:   { d_p: 49,  code_no: "BH-115",  material_grade: "SS 202", box_pkg: "100 PCS" },
  [`${SBA}-urinal-clamp-kit`]:         { d_p: 140, code_no: "BH-114",  material_grade: "SS 202", features: ["Standard urinal wall hanger"] },
  [`${SBA}-brass-extension-nipple-heavy`]: { d_p: 160, code_no: "NB-001", size: "25 mm", material_grade: "Heavy Brass", box_pkg: "54 PCS", features: ["Chrome plated hex thread extender"] },
  [`${SBA}-brass-hex-nipple`]:         { d_p: 160, code_no: "SBI-001", size: "15 mm", material_grade: "Heavy Brass", box_pkg: "35 PCS" },
  [`${SBA}-brass-wall-mixer-legs`]:    { d_p: 640, code_no: "NBSP-101", material_grade: "Heavy Brass", features: ["Pairs offset connection set"] },
  [`${SBA}-brass-waste-coupling-full-thread`]: { d_p: 530, code_no: "NB-021", size: "32×80 mm", material_grade: "Forged Brass", box_pkg: "56 PCS", features: ["Premium chrome plating"] },
  [`${SBA}-sink-waste-coupling-pvc-body`]: { d_p: 280, code_no: "AI-SI-ACC-100", size: "100 mm", material_grade: "SS Top, PVC Body", box_pkg: "100 PCS" },
  [`${SBA}-sink-waste-coupling-square-ss304-pvc-body`]: { d_p: 530, code_no: "AI-SI-ACC-101SQ", size: "100 mm", material_grade: "SS 304, PVC Body", box_pkg: "50 PCS", features: ["Square grid pattern"] },
  [`${SBA}-pillar-cock-flange`]:       { d_p: 40, code_no: "BH-5000",  material_grade: "SS 304", box_pkg: "25 PCS", features: ["Mirror finish"] },
  [`${SBA}-cpvc-ball-valve`]:          { d_p: 170, code_no: "TB-BV-020", size: "20 mm", material_grade: "CPVC", box_pkg: "200 PCS", features: ["Industrial grade turn valve"] },
  [`${SBA}-cp-angle-valve-turbo-cp`]:  { d_p: 560, code_no: "ANB-001",  size: "15 mm", material_grade: "Brass/CP", box_pkg: "250 PCS", features: ["Turbo single piece packaging"] },

  // Clamps (added in v2)
  [`${SBA}-double-nail-clamp-upvc-pipe`]: { d_p: 3.1, code_no: "BP-U015", size: "15 mm", material_grade: "Plastic/Steel", box_pkg: "100 PCS" },
  [`${SBA}-double-nail-clamp-cpvc-pipe`]: { d_p: 3.1, code_no: "BP-C020", size: "20 mm", material_grade: "Plastic/Steel", box_pkg: "100 PCS" },

  // Mirror Cabinet (added in v2)
  [`${SBA}-ss-mirror-cabinet`]: { d_p: 7650, code_no: "GI-MC2014", size: "350×500×140 mm", material_grade: "SS 202", features: ["Sleek Design", "Rust Resistant", "Concealed Fittings", "Mirror Finish"] },

  // Sanitary Ware
  [`${SBA}-pvc-single-flush-push-cistern`]: { d_p: 1050, code_no: "RP-7030", size: "10 Ltrs", material_grade: "PVC/ABS", box_pkg: "10 PCS", features: ["Side-push robust design"] },
  [`${SBA}-pvc-dual-flush-cistern`]:   { d_p: 1700, code_no: "RP-7050", size: "3/7 Ltrs", material_grade: "PVC/ABS", box_pkg: "10 PCS", features: ["Water-saving dual activator"] },
  [`${SBA}-pvc-smart-seat-cover`]:     { d_p: 495, code_no: "RP-1001",  material_grade: "PVC", box_pkg: "20 PCS", features: ["Standard white soft seat"] },
  [`${SBA}-urinal-spreader-for-hindware`]: { d_p: 660, code_no: "NBSP-201", material_grade: "Brass/ABS", box_pkg: "5 PCS", features: ["Specialty spreader nozzle"] },

  // Daizy
  "daizy-towel-rack":                  { d_p: 3230, code_no: "DC-201-24", size: "600 mm", material_grade: "SS 304", features: ["Double rod rack"] },
  "daizy-towel-rod":                   { d_p: 1110, code_no: "DC-202-18", size: "450 mm", material_grade: "SS 304", features: ["Single towel rod"] },
  "daizy-robe-hook":                   { d_p: 350,  code_no: "DC-203",    material_grade: "SS 304", features: ["Double robe peg"] },
  "daizy-towel-ring":                  { d_p: 1000, code_no: "DC-206-F",  material_grade: "SS 304", features: ["Premium wall ring"] },
  "daizy-soap-dish":                   { d_p: 660,  code_no: "DC-208",    material_grade: "SS 304", features: ["Metal slotted dish"] },
  "daizy-toilet-paper-holder":         { d_p: 1360, code_no: "DC-209",    material_grade: "SS 304", features: ["Wall-mounted with flap cover"] },
  "daizy-glass-liquid-soap-dispenser": { d_p: 1010, code_no: "DC-210",    material_grade: "SS 304/Glass", features: ["Frosted glass container"] },
  "daizy-glass-tumbler-holder":        { d_p: 930,  code_no: "DC-211",    material_grade: "SS 304/Glass", features: ["Frosted glass tumbler"] },
  "daizy-glass-soap-dish":             { d_p: 930,  code_no: "DC-212",    material_grade: "SS 304/Glass", features: ["Frosted glass soap plate"] },
  "daizy-ss-grab-bar":                 { d_p: 820,  code_no: "BH-127-12", size: "300 mm", material_grade: "SS 202", features: ["Anti-slip wall safety handle"] },

  // Elite – Gold
  "elite-towel-rack-gold":             { d_p: 5480, code_no: "EGD-1601-24", size: "600 mm", material_grade: "SS 304", features: ["Gold plated luxury rack"] },
  "elite-towel-rod-gold":              { d_p: 1790, code_no: "EGD-1602-18", size: "450 mm", material_grade: "SS 304", features: ["Gold plated single rod"] },
  "elite-robe-hook-gold":              { d_p: 880,  code_no: "EGD-1603",    material_grade: "SS 304", features: ["Gold plated robe peg"] },
  "elite-glass-tumbler-holder-gold":   { d_p: 1440, code_no: "EGD-1605",    material_grade: "SS 304/Glass", features: ["Gold plated tumbler container"] },
  "elite-towel-ring-gold":             { d_p: 1440, code_no: "EGD-1606",    material_grade: "SS 304", features: ["Gold plated wall ring"] },
  "elite-toilet-paper-holder-gold":    { d_p: 2080, code_no: "EGD-1609",    material_grade: "SS 304", features: ["Gold plated paper stand with cover"] },
  "elite-glass-liquid-soap-dispenser-gold": { d_p: 1620, code_no: "EGD-1610", material_grade: "SS 304/Glass", features: ["Gold plated luxury pump dispenser"] },
  "elite-glass-soap-dish-gold":        { d_p: 1210, code_no: "EGD-1612",    material_grade: "SS 304/Glass", features: ["Gold plated wall dish"] },

  // Elite – Rose Gold
  "elite-towel-rack-rose-gold":        { d_p: 5480, code_no: "ERGD-1601-24", size: "600 mm", material_grade: "SS 304", features: ["Rose Gold plated luxury rack"] },
  "elite-towel-rod-rose-gold":         { d_p: 1790, code_no: "ERGD-1602-18", size: "450 mm", material_grade: "SS 304", features: ["Rose Gold plated single rod"] },
  "elite-robe-hook-rose-gold":         { d_p: 880,  code_no: "ERGD-1603",    material_grade: "SS 304", features: ["Rose Gold plated robe peg"] },
  "elite-glass-tumbler-holder-rose-gold": { d_p: 1440, code_no: "ERGD-1605", material_grade: "SS 304/Glass", features: ["Rose Gold plated tumbler container"] },
  "elite-towel-ring-rose-gold":        { d_p: 1440, code_no: "ERGD-1606",    material_grade: "SS 304", features: ["Rose Gold plated wall ring"] },
  "elite-toilet-paper-holder-rose-gold": { d_p: 2080, code_no: "ERGD-1609", material_grade: "SS 304", features: ["Rose Gold paper stand with cover"] },
  "elite-glass-liquid-soap-dispenser-rose-gold": { d_p: 1620, code_no: "ERGD-1610", material_grade: "SS 304/Glass", features: ["Rose Gold luxury pump dispenser"] },
  "elite-glass-soap-dish-rose-gold":   { d_p: 1210, code_no: "ERGD-1612",    material_grade: "SS 304/Glass", features: ["Rose Gold plated wall dish"] },

  // Elite – Chrome
  "elite-towel-rack-chrome":           { d_p: 3940, code_no: "EC-1601-24",  size: "600 mm", material_grade: "SS 304", features: ["Premium chrome plated rack"] },
  "elite-towel-rod-chrome":            { d_p: 1170, code_no: "EC-1602-18",  size: "450 mm", material_grade: "SS 304", features: ["Premium chrome plated single rod"] },
  "elite-robe-hook-chrome":            { d_p: 570,  code_no: "EC-1603",     material_grade: "SS 304", features: ["Chrome plated double hook"] },
  "elite-glass-tumbler-holder-chrome": { d_p: 890,  code_no: "ERGD-1605",   material_grade: "SS 304/Glass", features: ["Chrome plated holder"] },
  "elite-towel-ring-chrome":           { d_p: 870,  code_no: "EC-1606",     material_grade: "SS 304", features: ["Chrome plated wall ring"] },
  "elite-toilet-paper-holder-chrome":  { d_p: 1140, code_no: "EC-1609",     material_grade: "SS 304", features: ["Chrome toilet paper stand with cover"] },
  "elite-glass-liquid-soap-dispenser-chrome": { d_p: 1060, code_no: "EC-1610", material_grade: "SS 304/Glass", features: ["Chrome luxury pump dispenser"] },
  "elite-glass-soap-dish-chrome":      { d_p: 850,  code_no: "EC-1612",     material_grade: "SS 304/Glass", features: ["Chrome plated wall dish"] },

  // Brava
  "brava-towel-rod":                   { d_p: 3300, code_no: "BMB-1602",  size: "600 mm", material_grade: "SS 304", features: ["Matt Black luxury single rod"] },
  "brava-glass-tumbler-holder":        { d_p: 1400, code_no: "BMB-1605",  material_grade: "SS 304/Glass", features: ["Matt Black tumbler holder with glass"] },
  "brava-towel-ring":                  { d_p: 1470, code_no: "BMB-1606",  material_grade: "SS 304", features: ["Matt Black wall towel ring"] },
  "brava-glass-soap-dish":             { d_p: 1580, code_no: "BMB-1608",  material_grade: "SS 304/Glass", features: ["Matt Black wall soap dish with glass"] },
  "brava-glass-liquid-soap-dispenser": { d_p: 1580, code_no: "BMB-1610",  material_grade: "SS 304/Glass", features: ["Matt Black luxury glass soap pump"] },
  "brava-dual-liquid-soap-dispenser":  { d_p: 3150, code_no: "BMB-1616",  material_grade: "SS 304/Glass", features: ["Double pump glass dispenser set"] },

  // Sinks – Premium
  "premium-sinks-s-s-sink-satin-satin":      { d_p: 14330, code_no: "AI-SI-241809-1 HM", size: "24×18×9 in (610×455×230 mm)", material_grade: "SS 304", features: ["1mm Thick", "Handmade Clean Edges", "Ceramic Noise Coating", "Square Waste Coupling included"] },
  "premium-sinks-s-s-sink-glossy-glossy":    { d_p: 7640,  code_no: "AI-SI-241809-1 HY", size: "24×18×9 in (610×455×230 mm)", material_grade: "SS 304", features: ["1mm Thick", "Curve Corners", "Ceramic Noise Coating", "Heavy Round Waste Coupling included"] },
  "premium-sinks-s-s-sink-double-bowl-satin":{ d_p: 21680, code_no: "AI-SI-371809-8 HM", size: '37×18×9 in (940×455×230 mm)', material_grade: "SS 304", features: ["0.8mm Thick", "Satin Finish", "Ceramic Noise Coating", 'Double Bowl (17"×16" each)'] },

  // Sinks – Standard
  "standard-sinks-s-s-sink-standard": { d_p: 2400, code_no: "AI-SI-181608-8", size: "18×16×8 in", material_grade: "Stainless Steel", box_pkg: "1 PC", features: ["1mm Ceramic Coating"] },
};

let updatedCount = 0;
data.products = data.products.map(p => {
  const u = UPDATES[p.slug];
  if (!u) return p;
  updatedCount++;
  return { ...p, ...u };
});
console.log(`\n✓ Updated ${updatedCount} existing products with pricing/spec data.`);

// ── 3. Add 19 new products ──────────────────────────────────────────────────
const existingSlugs = new Set(data.products.map(p => p.slug));
const COLORS = ["Black", "Gold", "Rose Gold"];

function newProduct(slug, name, category, extras = {}) {
  return {
    slug,
    product_name: name,
    type: name,
    series: SBA,
    subgroup: extras.subgroup ?? null,
    finish: extras.finish ?? null,
    material_grade: extras.material_grade ?? null,
    image: `/products/${SBA}/${slug}.jpeg`,
    gallery: [],
    code_no: extras.code_no ?? null,
    d_p: extras.d_p ?? null,
    size: extras.size ?? null,
    thickness: null,
    features: extras.features ?? [],
    variants: extras.variants ?? [],
    bowl_dimensions: null,
    box_pkg: extras.box_pkg ?? null,
    capacity: null,
    featured: false,
    category,
  };
}

const additions = [
  newProduct(`${SBA}-pop-up-floor-drain`, "Pop-Up Floor Drain", "Drainage Water Management", {
    d_p: 900, code_no: "BH-2103", size: "125×125 mm", material_grade: "SS 304", box_pkg: "50 PCS", features: ["Pop-Up Mechanism"],
  }),
  newProduct(`${SBA}-anti-cockroach-trap-bowl-type`, "Anti-Cockroach Trap Bowl Type", "Drainage Water Management", {
    d_p: 450, code_no: "BH-1115-07", size: "For 125mm Drain", material_grade: "SS 304", features: ["Premium bowl type cockroach blocker"],
  }),
  newProduct(`${SBA}-ss-doom-floor-grating`, "SS Doom Floor Grating", "Drainage Water Management", {
    d_p: 35, code_no: "VI-ACC-03", size: "80 mm", material_grade: "Stainless Steel", box_pkg: "72 PCS",
    variants: ["Standard", "With Hole"], features: ["Classic dome design"],
  }),
  newProduct(`${SBA}-ss-line-wall-grating`, "SS Line Wall Grating", "Drainage Water Management", {
    d_p: 42, code_no: "VI-ACC-09", size: "100 mm", material_grade: "Stainless Steel", box_pkg: "72 PCS", features: ["Wall drain jali"],
  }),
  newProduct(`${SBA}-long-drain-channel-slimline`, "Long Drain Channel Slimline", "Drainage Water Management", {
    d_p: 3910, code_no: "BH-4111", size: "30×600 mm", material_grade: "SS 304", features: ["Super slim profile drain"],
  }),
  newProduct(`${SBA}-ss-waste-coupling`, "SS Waste Coupling", "Hardware and Installations", {
    d_p: 250, code_no: "VI-ACC-01", size: "32×80 mm", material_grade: "Stainless Steel", box_pkg: "56 PCS", features: ["Corrosion resistant design"],
  }),
  newProduct(`${SBA}-sink-waste-coupling-ss-body`, "Sink Waste Coupling SS Body", "Hardware and Installations", {
    d_p: 290, code_no: "VI-ACC-12", size: "100 mm", material_grade: "SS Body & Strainer", box_pkg: "50 PCS", features: ["All steel sink drain"],
  }),
  newProduct(`${SBA}-sink-waste-coupling-heavy-round`, "Sink Waste Coupling Heavy Round", "Hardware and Installations", {
    d_p: 530, code_no: "AI-SI-ACC-101R", size: "100 mm", material_grade: "SS 304, PVC Body", box_pkg: "50 PCS", features: ["Round grid pattern"],
  }),
  newProduct(`${SBA}-round-flange`, "Round Flange", "Hardware and Installations", {
    d_p: 25, code_no: "VI-ACC-02", size: "70 mm", material_grade: "SS 202", box_pkg: "50 PCS", features: ["Wall aesthetic ring"],
  }),
  newProduct(`${SBA}-square-flange`, "Square Flange", "Hardware and Installations", {
    d_p: 54, code_no: "NM-6099", size: "50×50 mm", material_grade: "SS 202", box_pkg: "48 PCS", features: ["Square cover collar"],
  }),
  newProduct(`${SBA}-pvc-long-bend`, "PVC Long Bend", "Sanitary Ware", {
    d_p: 60, code_no: "RP-SP-09", material_grade: "PVC", features: ["Extends toilet/flush bend pipes"],
  }),
  newProduct(`${SBA}-pvc-waste-pipe-corrugated`, "PVC Waste Pipe Corrugated", "Hardware and Installations", {
    d_p: 100, code_no: "AP-ACC-02", size: "32×875 mm", material_grade: "PVC", box_pkg: "100 PCS", features: ["Standard kitchen/washbasin drain pipe"],
  }),
  newProduct(`${SBA}-pvc-waste-hose-pipe-heavy-white`, "PVC Waste Hose Pipe Heavy White", "Hardware and Installations", {
    d_p: 190, code_no: "AP-ACC-01", size: "32×900 mm", material_grade: "PVC", box_pkg: "100 PCS", features: ["Thick walls heavy duty hose"],
  }),
  newProduct(`${SBA}-pvc-urinal-waste-pipe-with-tail-white`, "PVC Urinal Waste Pipe With Tail White", "Hardware and Installations", {
    d_p: 190, code_no: "AP-ACC-06", size: "32×900 mm", material_grade: "PVC", box_pkg: "100 PCS", features: ["Corrugated bendable pipe with adapter tail"],
  }),
  newProduct(`${SBA}-ss-hose-connection-pipe`, "SS Hose Connection Pipe", "Hardware and Installations", {
    d_p: 340, code_no: "AP-ACC-08", size: "15×300 mm", material_grade: "SS 304 Braided", box_pkg: "150 pair", features: ["Pairs connector hoses"],
  }),
  newProduct(`${SBA}-forged-brass-nozzle-bib-cock`, "Forged Brass Nozzle Bib Cock", "Hardware and Installations", {
    d_p: 580, code_no: "ANB-501", size: "15 mm", material_grade: "Forged Brass", box_pkg: "2 PCS", features: ["Premium heavy duty faucet"],
  }),
  newProduct(`${SBA}-cpvc-circuit-testing-plug`, "CPVC Circuit Testing Plug", "Hardware and Installations", {
    d_p: 8, code_no: "SE-C-001", size: "15 mm", material_grade: "UPVC", box_pkg: "100 PCS", features: ["Circuit testing plug"],
  }),
  newProduct(`${SBA}-upvc-metal-clamp`, "UPVC Metal Clamp", "Hardware and Installations", {
    d_p: 6.6, code_no: "SUMC15", size: "15 mm", material_grade: "UPVC Covered Metal", box_pkg: "200 PCS", features: ["Saijal brand clamp"],
  }),
  newProduct(`${SBA}-cpvc-metal-clamp`, "CPVC Metal Clamp", "Hardware and Installations", {
    d_p: 6.1, code_no: "SCMC20", size: "20 mm", material_grade: "CPVC Covered Metal", box_pkg: "200 PCS", features: ["Saijal brand clamp"],
  }),
];

let added = 0;
for (const p of additions) {
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
console.log(`\n✓ Done. ${added} products added, ${updatedCount} products updated.`);
