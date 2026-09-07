// lib/colorVariants.ts — colour-variant vocabulary + presentation helpers.
// Deliberately free of any data import so it is safe to use in client components
// (importing data/catalog.ts client-side would ship products.json, incl. d_p).

export const COLOR_VARIANTS = ["Black", "Gold", "Rose Gold"] as const;
export type ColorVariant = (typeof COLOR_VARIANTS)[number];

export const isColorVariant = (v: string): v is ColorVariant =>
  (COLOR_VARIANTS as readonly string[]).includes(v);

// Colour name → Tailwind swatch class (names differ from the finish tokens).
export const COLOR_SWATCH: Record<ColorVariant, string> = {
  Black: "bg-finish-mattblack",
  Gold: "bg-finish-gold",
  "Rose Gold": "bg-finish-rosegold",
};

// Approximate CSS filter that tints the brushed-steel photo toward each finish.
// Indicative only — replaced automatically when real per-colour photos land.
export const COLOR_FILTER: Record<ColorVariant, string> = {
  Gold: "sepia(0.6) saturate(1.7) hue-rotate(-8deg) brightness(0.98)",
  "Rose Gold": "sepia(0.45) saturate(1.5) hue-rotate(-18deg) brightness(1.02)",
  Black: "grayscale(1) brightness(0.42) contrast(1.15)",
};
