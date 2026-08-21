// data/catalog.ts - typed access layer over data/products.json.
// products.json is the single source of truth (full catalogue data incl. dealer
// prices). This file controls WHAT is allowed to reach the browser.

import raw from "./products.json";

// ---------- Category (routing + display) ----------

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

// ---------- Full catalogue types (internal / build-time only) ----------

export type CatalogProduct = {
  slug: string;
  product_name: string;
  type: string;
  series: string;          // internal line (daizy, elite, brava …) — display only
  subgroup: string | null;
  finish: string | null;
  material_grade: string | null;
  image: string;
  gallery: string[];
  code_no: string | null;  // INTERNAL
  d_p: number | null;      // dealer price ₹ — INTERNAL, never render
  size: string | null;
  thickness: string | null;
  features: string[];
  variants: string[];
  category: string | null; // one of the 7 category names
  bowl_dimensions: { bowl_a: string; bowl_b: string } | null;
  box_pkg: string | null;
  capacity: string | null;
  featured: boolean;
};

// ---------- Public view (safe to pass to client components) ----------
// ONLY these fields may ever reach a "use client" component or be rendered.

export type PublicProduct = Pick<
  CatalogProduct,
  | "slug"
  | "product_name"
  | "type"
  | "series"
  | "subgroup"
  | "finish"
  | "image"
  | "variants"
  | "category"
  | "featured"
>;

export const toPublic = (p: CatalogProduct): PublicProduct => ({
  slug:         p.slug,
  product_name: p.product_name,
  type:         p.type,
  series:       p.series,
  subgroup:     p.subgroup,
  finish:       p.finish,
  image:        p.image,
  variants:     p.variants,
  category:     p.category,
  featured:     p.featured,
});

// ---------- Data ----------

export const categories: Category[]      = (raw as any).categories as Category[];
export const products:   CatalogProduct[] = raw.products as CatalogProduct[];

// Series display names — used on product cards & detail pages (not routed)
export const SERIES_NAMES: Record<string, string> = {
  "ultra-slim-shower-k":          "Ultra Slim Shower K",
  "daizy":                        "Daizy Series",
  "elite":                        "Elite Series",
  "brava":                        "Brava Series",
  "premium-sinks":                "Premium Sinks",
  "shower-bathroom-accessories":  "Shower & Bathroom Accessories",
  "standard-sinks":               "Standard Sinks",
};

// ---------- Helpers ----------

export const getCategory    = (slug: string) => categories.find(c => c.slug === slug);
export const getProduct     = (slug: string) => products.find(p => p.slug === slug);

export const getProductsByCategory = (slug: string) => {
  const cat = categories.find(c => c.slug === slug);
  return cat ? products.filter(p => p.category === cat.name) : [];
};

export const getProductsBySeries = (seriesSlug: string) =>
  products.filter(p => p.series === seriesSlug);

export const getFeaturedProducts = () => products.filter(p => p.featured);

export const getRelatedProducts = (product: CatalogProduct, n = 4) =>
  products
    .filter(p => p.series === product.series && p.slug !== product.slug)
    .sort((a, b) => {
      const sameSubgroup = (x: CatalogProduct) => x.subgroup === product.subgroup ? -1 : 1;
      const sameFinish   = (x: CatalogProduct) => x.finish   === product.finish   ? -1 : 1;
      return sameSubgroup(a) - sameSubgroup(b) || sameFinish(a) - sameFinish(b);
    })
    .slice(0, n);

export const getCategoryForProduct = (p: CatalogProduct) =>
  categories.find(c => c.name === p.category);

/*
RULES (enforced by CLAUDE.md):
1. Server components may import `products` freely - build-time only.
2. Client components ("use client") must receive PublicProduct[] via toPublic().
   Never pass raw CatalogProduct objects or import this module client-side.
3. Never render d_p or code_no anywhere.
4. Leak canary after every build: grep -r "21680" out/ must return nothing.
*/
