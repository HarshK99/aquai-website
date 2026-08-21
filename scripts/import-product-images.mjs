/**
 * One-time import: converts source PNGs to optimised JPEGs at correct product paths.
 * PNG → JPEG, max 1200px, quality 80, white background. Overwrites placeholders.
 * Usage: node scripts/import-product-images.mjs
 */
import sharp from "sharp";
import { existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC  = "D:/Downloads/AQUAI PRODUCT-20260802T043041Z-1-001/AQUAI PRODUCT";
const DEST = join(ROOT, "public/products");

const MAPPINGS = [
  // ── Shower & Bathroom Accessories ─────────────────────────────────────────
  ["AQUAI/Brass Extension Nipple Heavy.png",               "shower-bathroom-accessories/shower-bathroom-accessories-brass-extension-nipple-heavy.jpeg"],
  ["AQUAI/Brass Hex Nipple.png",                           "shower-bathroom-accessories/shower-bathroom-accessories-brass-hex-nipple.jpeg"],
  ["AQUAI/Brass Wall Mixer Legs (pair).png",               "shower-bathroom-accessories/shower-bathroom-accessories-brass-wall-mixer-legs.jpeg"],
  ["AQUAI/Brass Waste Coupling Full Thread.png",           "shower-bathroom-accessories/shower-bathroom-accessories-brass-waste-coupling-full-thread.jpeg"],
  ["AQUAI/Cockroach Trap For Floor Trap.png",              "shower-bathroom-accessories/shower-bathroom-accessories-cockroach-trap-for-floor-trap.jpeg"],
  ["AQUAI/CP Angle Valve Turbo.png",                       "shower-bathroom-accessories/shower-bathroom-accessories-cp-angle-valve-turbo-cp.jpeg"],
  ["AQUAI/Cpvc Ball Valve.png",                            "shower-bathroom-accessories/shower-bathroom-accessories-cpvc-ball-valve.jpeg"],
  ["AQUAI/EWC Floor Mounting Kit.png",                     "shower-bathroom-accessories/shower-bathroom-accessories-ewc-floor-mounting-kit.jpeg"],
  // Floor Trap Drain variants → using "With Tiles Insert" as main product image
  ["AQUAI/Floor Trap Drain With Tiles Insert.png",         "shower-bathroom-accessories/shower-bathroom-accessories-floor-trap-drain.jpeg"],
  // Long Drain Channel variants → using "Line Design" as main product image
  ["AQUAI/Long Drain Channel For Shower Line Design .png", "shower-bathroom-accessories/shower-bathroom-accessories-long-drain-channel-for-shower.jpeg"],
  ["AQUAI/One Pic Fix Jali.png",                           "shower-bathroom-accessories/shower-bathroom-accessories-one-pic-fix-jali.jpeg"],
  ["AQUAI/Oval Shower Arm.png",                            "shower-bathroom-accessories/shower-bathroom-accessories-oval-shower-arm.jpeg"],
  ["AQUAI/Pillar Cock Flange.png",                         "shower-bathroom-accessories/shower-bathroom-accessories-pillar-cock-flange.jpeg"],
  ["AQUAI/Pvc Dual Flush Cistern.png",                     "shower-bathroom-accessories/shower-bathroom-accessories-pvc-dual-flush-cistern.jpeg"],
  // Source has typo "Pish" - correct product slug uses "push"
  ["AQUAI/Pvc Single Flush Pish Cistern.png",              "shower-bathroom-accessories/shower-bathroom-accessories-pvc-single-flush-push-cistern.jpeg"],
  ["AQUAI/Pvc Smart Seat Cover.png",                       "shower-bathroom-accessories/shower-bathroom-accessories-pvc-smart-seat-cover.jpeg"],
  // Rack Bolt Kit variants → using "L Type" as main (first variant: L-Key Type)
  ["AQUAI/Rack Bold Kit L Type.png",                       "shower-bathroom-accessories/shower-bathroom-accessories-rack-bolt-kit.jpeg"],
  ["AQUAI/Round Shower Arm Heavy.png",                     "shower-bathroom-accessories/shower-bathroom-accessories-round-shower-arm-heavy.jpeg"],
  ["AQUAI/Sink Waste Coupling Pvc Body.png",               "shower-bathroom-accessories/shower-bathroom-accessories-sink-waste-coupling-pvc-body.jpeg"],
  ["AQUAI/Sink Waste Coupling Square SS304 Pvc Body.png",  "shower-bathroom-accessories/shower-bathroom-accessories-sink-waste-coupling-square-ss304-pvc-body.jpeg"],
  ["AQUAI/Square Shower Arm .png",                         "shower-bathroom-accessories/shower-bathroom-accessories-square-shower-arm.jpeg"],
  // SS Square Line Grating variants → using "With Hole" as main (first variant)
  ["AQUAI/SS Square Line Grating Heavy With Hole.png",     "shower-bathroom-accessories/shower-bathroom-accessories-ss-square-line-grating-heavy.jpeg"],
  ["AQUAI/Urinal Clamp Kit.png",                           "shower-bathroom-accessories/shower-bathroom-accessories-urinal-clamp-kit.jpeg"],
  ["AQUAI/Urinal Spreader for Hindware.png",               "shower-bathroom-accessories/shower-bathroom-accessories-urinal-spreader-for-hindware.jpeg"],
  ["AQUAI/Wash Basin Bolt Kit.png",                        "shower-bathroom-accessories/shower-bathroom-accessories-wash-basin-bolt-kit.jpeg"],

  // ── Standard Sinks ────────────────────────────────────────────────────────
  ["AQUAI/SS Sink Standard 1.png",                         "standard-sinks/standard-sinks-s-s-sink-standard.jpeg"],

  // ── Ultra Slim Shower K ───────────────────────────────────────────────────
  ["AQUAI/Ultra Slim Shower K Series.png",                 "ultra-slim-shower-k/ultra-slim-shower-k-ultra-slim-shower.jpeg"],

  // ── Daizy Series ─────────────────────────────────────────────────────────
  ["DAIZY SERIES/Glass Liquid Soap Dispenser.png",         "daizy/daizy-glass-liquid-soap-dispenser.jpeg"],
  ["DAIZY SERIES/Glass Soap Dish.png",                     "daizy/daizy-glass-soap-dish.jpeg"],
  ["DAIZY SERIES/Glass Tumbler Holder.png",                "daizy/daizy-glass-tumbler-holder.jpeg"],
  ["DAIZY SERIES/Robe Hook.png",                           "daizy/daizy-robe-hook.jpeg"],
  ["DAIZY SERIES/Soap Dish.png",                           "daizy/daizy-soap-dish.jpeg"],
  ["DAIZY SERIES/SS Grab Bar.png",                         "daizy/daizy-ss-grab-bar.jpeg"],
  ["DAIZY SERIES/Toilet Paper Holder.png",                 "daizy/daizy-toilet-paper-holder.jpeg"],
  ["DAIZY SERIES/Towel Rack.png",                          "daizy/daizy-towel-rack.jpeg"],
  ["DAIZY SERIES/Towel Ring.png",                          "daizy/daizy-towel-ring.jpeg"],
  ["DAIZY SERIES/Towel Rod.png",                           "daizy/daizy-towel-rod.jpeg"],

  // ── Elite Series - Gold finish only ──────────────────────────────────────
  // (Chrome and Rose Gold have no source images - placeholders remain)
  ["ELITE SERIES GOLD FINISH/Glass Liquid Soap Dispenser.png", "elite/elite-glass-liquid-soap-dispenser-gold.jpeg"],
  ["ELITE SERIES GOLD FINISH/Glass Soap Dish.png",             "elite/elite-glass-soap-dish-gold.jpeg"],
  ["ELITE SERIES GOLD FINISH/Glass Tumbler Holder.png",        "elite/elite-glass-tumbler-holder-gold.jpeg"],
  ["ELITE SERIES GOLD FINISH/Robe Hook.png",                   "elite/elite-robe-hook-gold.jpeg"],
  ["ELITE SERIES GOLD FINISH/Toilet Paper Holder.png",         "elite/elite-toilet-paper-holder-gold.jpeg"],
  ["ELITE SERIES GOLD FINISH/Towel Rack.png",                  "elite/elite-towel-rack-gold.jpeg"],
  ["ELITE SERIES GOLD FINISH/Towel Ring.png",                  "elite/elite-towel-ring-gold.jpeg"],
  ["ELITE SERIES GOLD FINISH/Towel Rod.png",                   "elite/elite-towel-rod-gold.jpeg"],
];

let converted = 0;
let failed = 0;

for (const [srcRel, destRel] of MAPPINGS) {
  const srcPath  = join(SRC, srcRel);
  const destPath = join(DEST, destRel);
  const label    = destRel.split("/").pop();

  if (!existsSync(srcPath)) {
    console.error(`  MISSING  ${srcRel}`);
    failed++;
    continue;
  }

  try {
    const img  = sharp(srcPath).rotate();
    const meta = await img.metadata();
    const w    = meta.width  ?? 0;
    const h    = meta.height ?? 0;

    const resized = (w > 1200 || h > 1200)
      ? img.resize({ width: Math.min(w, 1200), height: Math.min(h, 1200), fit: "inside", withoutEnlargement: true })
      : img;

    await resized
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 80 })
      .toFile(destPath);

    const kb = Math.round(statSync(destPath).size / 1024);
    console.log(`  ✓  ${label}  (${kb} KB)`);
    converted++;
  } catch (err) {
    console.error(`  ✗  ${label}: ${err.message}`);
    failed++;
  }
}

console.log(`\nDone. Converted: ${converted}   Failed: ${failed}`);
