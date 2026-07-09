// data/catalog.ts — typed access layer over data/products.json.
// products.json is the single source of truth (full catalogue data incl. dealer
// prices). This file controls WHAT is allowed to reach the browser.

import raw from "./products.json";

// ---------- Full catalogue types (internal / build-time only) ----------

export type Series = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export type CatalogProduct = {
  slug: string;
  product_name: string;
  type: string;                 // display category, e.g. "Towel Rack", "Kitchen Sink"
  series: string;               // Series.slug
  finish: string;               // "Chrome" | "Gold" | "Rose Gold" | "Matt Black" | ...
  material_grade: string;       // "SS 304" | "SS 202" | ...
  image: string;                // /products/<series>/<slug>.jpeg
  code_no: string | null;       // model number — INTERNAL for now
  d_p: number | null;           // dealer price ₹ — INTERNAL, never render
  size: string | null;
  thickness: string | null;
  features: string[];
  bowl_dimensions: { bowl_a: string; bowl_b: string } | null;
  box_pkg: string | null;
  capacity: string | null;
  featured: boolean;
};

// ---------- Public view (safe to pass to client components) ----------
// ONLY these fields may ever reach a "use client" component or be rendered.
// To show more later (e.g. size, code_no, price), add the field HERE — one place.

export type PublicProduct = Pick<
  CatalogProduct,
  "slug" | "product_name" | "type" | "series" | "finish" | "image" | "featured"
>;

export const toPublic = (p: CatalogProduct): PublicProduct => ({
  slug: p.slug,
  product_name: p.product_name,
  type: p.type,
  series: p.series,
  finish: p.finish,
  image: p.image,
  featured: p.featured,
});

// ---------- Data + helpers ----------

export const series: Series[] = raw.series;
export const products: CatalogProduct[] = raw.products as CatalogProduct[];

export const getSeries = (slug: string) =>
  series.find((s) => s.slug === slug);

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsBySeries = (slug: string) =>
  products.filter((p) => p.series === slug);

export const getFeaturedProducts = () =>
  products.filter((p) => p.featured);

export const getRelatedProducts = (product: CatalogProduct, n = 4) =>
  products
    .filter((p) => p.series === product.series && p.slug !== product.slug)
    .slice(0, n);

// Finishes available within a series (used for Elite finish filter/badges)
export const getSeriesFinishes = (slug: string) =>
  [...new Set(getProductsBySeries(slug).map((p) => p.finish))];

/*
RULES (enforced by CLAUDE.md):
1. Server components may import `products` freely — build-time only, nothing ships.
2. Any client component ("use client") must receive PublicProduct[] via toPublic()
   — never raw CatalogProduct objects and never this module's `products` export.
3. Never render d_p or code_no anywhere until the client approves showing them.
*/
