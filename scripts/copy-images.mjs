/**
 * Copies real product photos from source folder to public/products/
 * Converts PNG/JPG → JPEG using sharp. Overwrites existing files.
 */
import sharp from "sharp";
import { mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEST_BASE = join(__dirname, "../public/products");
const SRC = "D:\\Downloads\\AQUAI PRODUCT-20260821T105351Z-1-001\\AQUAI PRODUCT";

async function copy(srcRel, destSlug, destSeries) {
  const src = join(SRC, srcRel);
  const destDir = join(DEST_BASE, destSeries);
  const dest = join(destDir, `${destSeries}-${destSlug}.jpeg`);
  mkdirSync(destDir, { recursive: true });
  try {
    await sharp(src).jpeg({ quality: 85 }).toFile(dest);
    console.log(`  ✓  ${destSeries}/${destSeries}-${destSlug}.jpeg`);
  } catch (e) {
    console.error(`  ✗  ${srcRel} → ${dest}: ${e.message}`);
  }
}

// series shorthands
const SBA = "shower-bathroom-accessories";
const DAIZY = "daizy";
const ELITE = "elite";
const BRAVA = "brava";
const PREMIUM = "premium-sinks";
const STANDARD = "standard-sinks";
const SLIM = "ultra-slim-shower-k";

// maps: [srcRelPath, destProductSlugSuffix, destSeries]
// destSeries + "-" + destProductSlugSuffix = final dest filename
const MAPPINGS = [
  // ── Root level ─────────────────────────────────────────────────────────────
  ["Aquai Long Drain Cover.jpg",          "long-drain-cover",                      SBA],
  ["Double Nail Clamp CPVC Pipe.jpg",     "double-nail-clamp-cpvc-pipe",           SBA],
  ["Double Nail Clamp UPVC Pipe.jpg",     "double-nail-clamp-upvc-pipe",           SBA],
  ["FORGED BRASS NOZZLE BIB COCK.png",   "forged-brass-nozzle-bib-cock",          SBA],
  ["SS Mirror Cabinet.png",               "ss-mirror-cabinet",                     SBA],

  // ── AQUAI/ ─────────────────────────────────────────────────────────────────
  ["AQUAI\\Anti Cockroach Trap Bowl Type.png",            "anti-cockroach-trap-bowl-type",          SBA],
  ["AQUAI\\Brass Extension Nipple Heavy.png",             "brass-extension-nipple-heavy",           SBA],
  ["AQUAI\\Brass Hex Nipple.png",                         "brass-hex-nipple",                       SBA],
  ["AQUAI\\Brass Wall Mixer Legs (pair).png",             "brass-wall-mixer-legs",                  SBA],
  ["AQUAI\\Brass Waste Coupling Full Thread.png",         "brass-waste-coupling-full-thread",       SBA],
  ["AQUAI\\Clean Out Locking Cover.png",                  "clean-out-locking-cover",                SBA],
  ["AQUAI\\Cockroach Trap For Floor Trap.png",            "cockroach-trap-for-floor-trap",          SBA],
  ["AQUAI\\Corner Drain L Type.png",                      "corner-drain-l-type",                    SBA],
  ["AQUAI\\CP Angle Valve Turbo.png",                     "cp-angle-valve-turbo-cp",                SBA],
  ["AQUAI\\Cpvc Ball Valve.png",                          "cpvc-ball-valve",                        SBA],
  ["AQUAI\\EWC Floor Mounting Kit.png",                   "ewc-floor-mounting-kit",                 SBA],
  ["AQUAI\\Floor Drain Locking Type Round Hole .png",     "floor-drain-locking-type",               SBA],
  ["AQUAI\\Floor Trap Drain With Tiles Insert.png",       "floor-trap-drain",                       SBA],
  ["AQUAI\\Long Drain Channel For Shower Line Design .png","long-drain-channel-for-shower",         SBA],
  ["AQUAI\\Long Drain Channel Slimline SS304.png",        "long-drain-channel-slimline",            SBA],
  ["AQUAI\\One Pic Fix Jali.png",                         "one-pic-fix-jali",                       SBA],
  ["AQUAI\\Oval Shower Arm.png",                          "oval-shower-arm",                        SBA],
  ["AQUAI\\Pillar Cock Flange.png",                       "pillar-cock-flange",                     SBA],
  ["AQUAI\\Pop Up Floor Drain.png",                       "pop-up-floor-drain",                     SBA],
  ["AQUAI\\Pvc Dual Flush Cistern.png",                   "pvc-dual-flush-cistern",                 SBA],
  ["AQUAI\\Pvc Long Bend.png",                            "pvc-long-bend",                          SBA],
  ["AQUAI\\Pvc Single Flush Pish Cistern.png",            "pvc-single-flush-push-cistern",          SBA],
  ["AQUAI\\Pvc Smart Seat Cover.png",                     "pvc-smart-seat-cover",                   SBA],
  ["AQUAI\\Pvc Urinal waste Pipe with Tail White.png",    "pvc-urinal-waste-pipe-with-tail-white",  SBA],
  ["AQUAI\\Pvc Waste Hose Pipe Heavy White.png",          "pvc-waste-hose-pipe-heavy-white",        SBA],
  ["AQUAI\\Pvc waste Pipe Corrugated.png",                "pvc-waste-pipe-corrugated",              SBA],
  ["AQUAI\\Rack Bold Kit L Type.png",                     "rack-bolt-kit",                          SBA],
  ["AQUAI\\Round J4 & Square Flange.png",                 "round-flange",                           SBA],
  ["AQUAI\\Round J4 & Square Flange.png",                 "square-flange",                          SBA],
  ["AQUAI\\Round Shower Arm Heavy.png",                   "round-shower-arm-heavy",                 SBA],
  ["AQUAI\\Sink Waste Coupling Heavy Round SS 304 Pvc Body.png", "sink-waste-coupling-heavy-round", SBA],
  ["AQUAI\\Sink Waste Coupling Heavy Square SS304 Pvc Body.png", "sink-waste-coupling-square-ss304-pvc-body", SBA],
  ["AQUAI\\Sink Waste Coupling Pvc Body.png",             "sink-waste-coupling-pvc-body",           SBA],
  ["AQUAI\\Sink Waste Coupling SS Body.png",              "sink-waste-coupling-ss-body",            SBA],
  ["AQUAI\\Square Shower Arm .png",                       "square-shower-arm",                      SBA],
  ["AQUAI\\SS Doom Floor Grating.png",                    "ss-doom-floor-grating",                  SBA],
  ["AQUAI\\SS Hose Connection Pipe with SS 304 Nut.png",  "ss-hose-connection-pipe",                SBA],
  ["AQUAI\\SS Line Wall Grating.png",                     "ss-line-wall-grating",                   SBA],
  ["AQUAI\\SS Sink Standard Single bowl with drain board.png", "s-s-sink-standard",               STANDARD],
  ["AQUAI\\SS Square Line Grating Heavy Plain.png",       "ss-square-line-grating-heavy",           SBA],
  ["AQUAI\\SS Waste Coupling.png",                        "ss-waste-coupling",                      SBA],
  ["AQUAI\\Traingle Floor Drain Plain Tiles Insert SS-304.png", "triangle-floor-drain-plain-tiles", SBA],
  ["AQUAI\\Ultra Slim Shower K Series.png",               "ultra-slim-shower",                      SLIM],
  ["AQUAI\\Urinal Clamp Kit.png",                         "urinal-clamp-kit",                       SBA],
  ["AQUAI\\Urinal Spreader for Hindware.png",             "urinal-spreader-for-hindware",           SBA],
  ["AQUAI\\Wash Basin Bolt Kit.png",                      "wash-basin-bolt-kit",                    SBA],
  ["AQUAI\\Waste Coupling K Tyoke Long.png",              "3-waste-coupling-k-type-long",           SBA],

  // ── BRAVA SERIES/ ──────────────────────────────────────────────────────────
  ["BRAVA SERIES\\Dual Liquid Soap Dispenser.jpg",  "dual-liquid-soap-dispenser",  BRAVA],
  ["BRAVA SERIES\\Glass Liquid Soap Dispenser.jpg", "glass-liquid-soap-dispenser", BRAVA],
  ["BRAVA SERIES\\Glass Soap Dish.jpg",             "glass-soap-dish",             BRAVA],
  ["BRAVA SERIES\\Glass Tumbler Holder.jpg",        "glass-tumbler-holder",        BRAVA],
  ["BRAVA SERIES\\Towel Ring.jpg",                  "towel-ring",                  BRAVA],
  ["BRAVA SERIES\\Towel Rod.jpg",                   "towel-rod",                   BRAVA],

  // ── DAIZY SERIES/ ──────────────────────────────────────────────────────────
  ["DAIZY SERIES\\Glass Liquid Soap Dispenser.png", "glass-liquid-soap-dispenser", DAIZY],
  ["DAIZY SERIES\\Glass Soap Dish.png",             "glass-soap-dish",             DAIZY],
  ["DAIZY SERIES\\Glass Tumbler Holder.png",        "glass-tumbler-holder",        DAIZY],
  ["DAIZY SERIES\\Robe Hook.png",                   "robe-hook",                   DAIZY],
  ["DAIZY SERIES\\Soap Dish.png",                   "soap-dish",                   DAIZY],
  ["DAIZY SERIES\\SS Grab Bar.png",                 "ss-grab-bar",                 DAIZY],
  ["DAIZY SERIES\\Toilet Paper Holder.png",         "toilet-paper-holder",         DAIZY],
  ["DAIZY SERIES\\Towel Rack.png",                  "towel-rack",                  DAIZY],
  ["DAIZY SERIES\\Towel Ring.png",                  "towel-ring",                  DAIZY],
  ["DAIZY SERIES\\Towel Rod.png",                   "towel-rod",                   DAIZY],

  // ── ELITE SERIES CHROME FINISH/ ────────────────────────────────────────────
  ["ELITE SERIES CHROME FINISH\\Glass Liquid Soap  Dispenser .jpg", "glass-liquid-soap-dispenser-chrome", ELITE],
  ["ELITE SERIES CHROME FINISH\\Glass Soap Dish.jpg",               "glass-soap-dish-chrome",             ELITE],
  ["ELITE SERIES CHROME FINISH\\Glass Tumbler Holder.jpg",          "glass-tumbler-holder-chrome",        ELITE],
  ["ELITE SERIES CHROME FINISH\\Robe Hook.jpg",                     "robe-hook-chrome",                   ELITE],
  ["ELITE SERIES CHROME FINISH\\Toilet Paper Holder.jpg",           "toilet-paper-holder-chrome",         ELITE],
  ["ELITE SERIES CHROME FINISH\\Towel Rack.jpg",                    "towel-rack-chrome",                  ELITE],
  ["ELITE SERIES CHROME FINISH\\Towel Ring.jpg",                    "towel-ring-chrome",                  ELITE],
  ["ELITE SERIES CHROME FINISH\\Towel Rod.jpg",                     "towel-rod-chrome",                   ELITE],

  // ── ELITE SERIES GOLD FINISH/ ──────────────────────────────────────────────
  ["ELITE SERIES GOLD FINISH\\Glass Liquid Soap Dispenser.png", "glass-liquid-soap-dispenser-gold", ELITE],
  ["ELITE SERIES GOLD FINISH\\Glass Soap Dish.png",             "glass-soap-dish-gold",             ELITE],
  ["ELITE SERIES GOLD FINISH\\Glass Tumbler Holder.png",        "glass-tumbler-holder-gold",        ELITE],
  ["ELITE SERIES GOLD FINISH\\Robe Hook.png",                   "robe-hook-gold",                   ELITE],
  ["ELITE SERIES GOLD FINISH\\Toilet Paper Holder.png",         "toilet-paper-holder-gold",         ELITE],
  ["ELITE SERIES GOLD FINISH\\Towel Rack.png",                  "towel-rack-gold",                  ELITE],
  ["ELITE SERIES GOLD FINISH\\Towel Ring.png",                  "towel-ring-gold",                  ELITE],
  ["ELITE SERIES GOLD FINISH\\Towel Rod.png",                   "towel-rod-gold",                   ELITE],

  // ── ELITE SERIES ROSE GOLD FINISH/ ────────────────────────────────────────
  ["ELITE SERIES ROSE GOLD FINISH\\Glass Liquid Soap Dispenser.jpg", "glass-liquid-soap-dispenser-rose-gold", ELITE],
  ["ELITE SERIES ROSE GOLD FINISH\\Glass Soap Dish.jpg",             "glass-soap-dish-rose-gold",             ELITE],
  ["ELITE SERIES ROSE GOLD FINISH\\Glass Tumbler Holder.jpg",        "glass-tumbler-holder-rose-gold",        ELITE],
  ["ELITE SERIES ROSE GOLD FINISH\\Robe Hook.jpg",                   "robe-hook-rose-gold",                   ELITE],
  ["ELITE SERIES ROSE GOLD FINISH\\Toel Rack.png",                   "towel-rack-rose-gold",                  ELITE],
  ["ELITE SERIES ROSE GOLD FINISH\\Toilet Paper Holder.jpg",         "toilet-paper-holder-rose-gold",         ELITE],
  ["ELITE SERIES ROSE GOLD FINISH\\Towel Ring.jpg",                  "towel-ring-rose-gold",                  ELITE],
  ["ELITE SERIES ROSE GOLD FINISH\\Towel Rod.jpg",                   "towel-rod-rose-gold",                   ELITE],

  // ── SINK/ ──────────────────────────────────────────────────────────────────
  ["SINK\\S.S Sink Double Bowl.jpg",  "s-s-sink-double-bowl-satin",  PREMIUM],
  ["SINK\\S.S Sink Glossy .jpg",      "s-s-sink-glossy-glossy",      PREMIUM],
  ["SINK\\S.S Sink Satin.jpg",        "s-s-sink-satin-satin",        PREMIUM],
];

console.log(`Copying ${MAPPINGS.length} images...\n`);
let ok = 0, fail = 0;
for (const [srcRel, slugSuffix, series] of MAPPINGS) {
  const fullSrc = join(SRC, srcRel);
  const destDir = join(DEST_BASE, series);
  const dest = join(destDir, `${series}-${slugSuffix}.jpeg`);
  mkdirSync(destDir, { recursive: true });
  try {
    await sharp(fullSrc).jpeg({ quality: 85 }).toFile(dest);
    console.log(`  ✓  ${series}-${slugSuffix}.jpeg`);
    ok++;
  } catch (e) {
    console.error(`  ✗  ${srcRel}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ${ok} copied, ${fail} failed.`);
