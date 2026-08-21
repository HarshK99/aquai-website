import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonPath = join(__dirname, "../data/products.json");

const categoryMap = {
  "ultra-slim-shower-k-ultra-slim-shower": "Bathing and Fittings",

  "daizy-towel-rack": "Accessories and storage",
  "daizy-towel-rod": "Accessories and storage",
  "daizy-robe-hook": "Accessories and storage",
  "daizy-towel-ring": "Accessories and storage",
  "daizy-soap-dish": "Accessories and storage",
  "daizy-toilet-paper-holder": "Accessories and storage",
  "daizy-glass-liquid-soap-dispenser": "Accessories and storage",
  "daizy-glass-tumbler-holder": "Accessories and storage",
  "daizy-glass-soap-dish": "Accessories and storage",
  "daizy-ss-grab-bar": "Safety and supports",

  "elite-towel-rack-gold": "Accessories and storage",
  "elite-towel-rod-gold": "Accessories and storage",
  "elite-robe-hook-gold": "Accessories and storage",
  "elite-glass-tumbler-holder-gold": "Accessories and storage",
  "elite-towel-ring-gold": "Accessories and storage",
  "elite-toilet-paper-holder-gold": "Accessories and storage",
  "elite-glass-liquid-soap-dispenser-gold": "Accessories and storage",
  "elite-glass-soap-dish-gold": "Accessories and storage",
  "elite-towel-rack-rose-gold": "Accessories and storage",
  "elite-towel-rod-rose-gold": "Accessories and storage",
  "elite-robe-hook-rose-gold": "Accessories and storage",
  "elite-glass-tumbler-holder-rose-gold": "Accessories and storage",
  "elite-towel-ring-rose-gold": "Accessories and storage",
  "elite-toilet-paper-holder-rose-gold": "Accessories and storage",
  "elite-glass-liquid-soap-dispenser-rose-gold": "Accessories and storage",
  "elite-glass-soap-dish-rose-gold": "Accessories and storage",
  "elite-towel-rack-chrome": "Accessories and storage",
  "elite-towel-rod-chrome": "Accessories and storage",
  "elite-robe-hook-chrome": "Accessories and storage",
  "elite-glass-tumbler-holder-chrome": "Accessories and storage",
  "elite-towel-ring-chrome": "Accessories and storage",
  "elite-toilet-paper-holder-chrome": "Accessories and storage",
  "elite-glass-liquid-soap-dispenser-chrome": "Accessories and storage",
  "elite-glass-soap-dish-chrome": "Accessories and storage",

  "brava-towel-rod": "Accessories and storage",
  "brava-glass-tumbler-holder": "Accessories and storage",
  "brava-towel-ring": "Accessories and storage",
  "brava-glass-soap-dish": "Accessories and storage",
  "brava-glass-liquid-soap-dispenser": "Accessories and storage",
  "brava-dual-liquid-soap-dispenser": "Accessories and storage",

  "premium-sinks-s-s-sink-satin-satin": "SS Sink",
  "premium-sinks-s-s-sink-glossy-glossy": "SS Sink",
  "premium-sinks-s-s-sink-double-bowl-satin": "SS Sink",

  "shower-bathroom-accessories-square-shower-arm": "Bathing and Fittings",
  "shower-bathroom-accessories-oval-shower-arm": "Bathing and Fittings",
  "shower-bathroom-accessories-round-shower-arm-heavy": "Bathing and Fittings",
  "shower-bathroom-accessories-floor-trap-drain": "Drainage water management",
  "shower-bathroom-accessories-ss-square-line-grating-heavy": "Drainage water management",
  "shower-bathroom-accessories-cockroach-trap-for-floor-trap": "Drainage water management",
  "shower-bathroom-accessories-one-pic-fix-jali": "Drainage water management",
  "shower-bathroom-accessories-long-drain-channel-for-shower": "Drainage water management",

  "shower-bathroom-accessories-rack-bolt-kit": "Hardware and installations",
  "shower-bathroom-accessories-wash-basin-bolt-kit": "Hardware and installations",
  "shower-bathroom-accessories-ewc-floor-mounting-kit": "Hardware and installations",
  "shower-bathroom-accessories-urinal-clamp-kit": "Hardware and installations",
  "shower-bathroom-accessories-brass-extension-nipple-heavy": "Hardware and installations",
  "shower-bathroom-accessories-brass-hex-nipple": "Hardware and installations",
  "shower-bathroom-accessories-brass-wall-mixer-legs": "Hardware and installations",

  "shower-bathroom-accessories-brass-waste-coupling-full-thread": "Hardware and installations",
  "shower-bathroom-accessories-sink-waste-coupling-pvc-body": "Hardware and installations",
  "shower-bathroom-accessories-pillar-cock-flange": "Hardware and installations",
  "shower-bathroom-accessories-cpvc-ball-valve": "Hardware and installations",
  "shower-bathroom-accessories-cp-angle-valve-turbo-cp": "Hardware and installations",
  "shower-bathroom-accessories-sink-waste-coupling-square-ss304-pvc-body": "Hardware and installations",

  "shower-bathroom-accessories-pvc-dual-flush-cistern": "Sanitary ware",
  "shower-bathroom-accessories-pvc-single-flush-push-cistern": "Sanitary ware",
  "shower-bathroom-accessories-pvc-smart-seat-cover": "Sanitary ware",
  "shower-bathroom-accessories-urinal-spreader-for-hindware": "Sanitary ware",

  "standard-sinks-s-s-sink-standard": "SS Sink",
};

const data = JSON.parse(readFileSync(jsonPath, "utf8"));

let assigned = 0;
let unmatched = [];

data.products = data.products.map(({ colors, ...p }) => {  // strip colors field
  const category = categoryMap[p.slug] ?? null;
  if (!category) unmatched.push(p.slug);
  else assigned++;
  return { ...p, category };
});

writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");
console.log(`✓ ${assigned} products assigned, colors field removed`);
if (unmatched.length) console.warn("⚠ unmatched slugs:", unmatched);
