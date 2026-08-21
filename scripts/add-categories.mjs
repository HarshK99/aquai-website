import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonPath = join(__dirname, "../data/products.json");
const data = JSON.parse(readFileSync(jsonPath, "utf8"));

data.categories = [
  {
    "slug": "drainage-water-management",
    "name": "Drainage water management",
    "tagline": "Floor traps, channels, grating and drainage solutions.",
    "description": "TODO",
    "image": "/products/shower-bathroom-accessories/shower-bathroom-accessories-floor-trap-drain.jpeg"
  },
  {
    "slug": "accessories-and-storage",
    "name": "Accessories and storage",
    "tagline": "Towel racks, hooks, dispensers and bathroom storage.",
    "description": "TODO",
    "image": "/products/elite/elite-towel-rack-gold.jpeg"
  },
  {
    "slug": "bathing-and-fittings",
    "name": "Bathing and Fittings",
    "tagline": "Overhead showers, shower arms and bath fittings.",
    "description": "TODO",
    "image": "/products/ultra-slim-shower-k/ultra-slim-shower-k-ultra-slim-shower.jpeg"
  },
  {
    "slug": "sanitary-ware",
    "name": "Sanitary ware",
    "tagline": "Cisterns, seat covers and sanitary fittings.",
    "description": "TODO",
    "image": "/products/shower-bathroom-accessories/shower-bathroom-accessories-pvc-dual-flush-cistern.jpeg"
  },
  {
    "slug": "safety-and-supports",
    "name": "Safety and supports",
    "tagline": "Grab bars and safety support fixtures.",
    "description": "TODO",
    "image": "/products/daizy/daizy-ss-grab-bar.jpeg"
  },
  {
    "slug": "hardware-and-installations",
    "name": "Hardware and installations",
    "tagline": "Mounting kits, valves and installation hardware.",
    "description": "TODO",
    "image": "/products/shower-bathroom-accessories/shower-bathroom-accessories-rack-bolt-kit.jpeg"
  },
  {
    "slug": "ss-sink",
    "name": "SS Sink",
    "tagline": "Handmade stainless steel kitchen sinks.",
    "description": "TODO",
    "image": "/products/premium-sinks/premium-sinks-s-s-sink-double-bowl-satin.jpeg"
  }
];

// Remove old series array
delete data.series;

writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");
console.log("✓ categories added, series array removed");
