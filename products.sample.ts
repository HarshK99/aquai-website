// data/products.ts - the single source of truth for all catalog content.
// Adding/editing a product = editing this file and re-running the build.

export type Series = {
  slug: string;          // "aura"
  name: string;          // "Aura Series"
  tagline: string;       // short line shown on series page + cards
  description: string;   // 2–3 sentences for the series page intro
  image: string;         // "/products/aura/_series-cover.webp"
};

export type Product = {
  slug: string;          // "aura-towel-bar-600" - used in URL, must be unique
  name: string;          // "Towel Bar 600mm"
  series: string;        // must match a Series.slug
  image: string;         // "/products/aura/aura-towel-bar-600.webp"
  gallery?: string[];    // optional extra images for the detail page
  description: string;   // 2–4 sentences
  specs?: {
    material?: string;   // "Solid brass"
    finish?: string;     // "Polished chrome"
    size?: string;       // "600 × 75 × 60 mm"
    mounting?: string;   // "Concealed wall mount"
  };
  featured?: boolean;    // shown on home page
};

export const series: Series[] = [
  {
    slug: "aura",
    name: "Aura Series",
    tagline: "Minimal lines, mirror finish.",
    description:
      "Clean geometry in solid brass with a polished chrome finish. Designed for modern bathrooms where hardware should whisper, not shout.",
    image: "/products/aura/_series-cover.webp",
  },
  // ...add remaining series
];

export const products: Product[] = [
  {
    slug: "aura-towel-bar-600",
    name: "Towel Bar 600mm",
    series: "aura",
    image: "/products/aura/aura-towel-bar-600.webp",
    description:
      "A single uninterrupted bar in solid brass. Concealed fixings keep the line clean from every angle.",
    specs: {
      material: "Solid brass",
      finish: "Polished chrome",
      size: "600 × 75 × 60 mm",
      mounting: "Concealed wall mount",
    },
    featured: true,
  },
  // ...49 more products
];

// Helpers the site should use (implement in same file):
// getProductsBySeries(slug), getProduct(slug), getFeaturedProducts(),
// getRelatedProducts(product, n) - same series, excluding itself.
