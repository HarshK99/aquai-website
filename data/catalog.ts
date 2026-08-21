// data/catalog.ts - typed access layer over data/products.json.
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
  subgroups?: string[];   // ordered sub-group labels (Shower & Bathroom Accessories only)
};

export type CatalogProduct = {
  slug: string;
  product_name: string;
  type: string;
  series: string;
  subgroup: string | null;        // sub-group label within a category page
  finish: string | null;
  material_grade: string | null;
  image: string;
  gallery: string[];
  code_no: string | null;         // model number - INTERNAL
  d_p: number | null;             // dealer price ₹ - INTERNAL, never render
  size: string | null;
  thickness: string | null;
  features: string[];
  variants: string[];             // listed on the product page (not separate slugs)
  category: string | null;        // base category (one of 7 defined categories)
  bowl_dimensions: { bowl_a: string; bowl_b: string } | null;
  box_pkg: string | null;
  capacity: string | null;
  featured: boolean;
};

// ---------- Public view (safe to pass to client components) ----------
// ONLY these fields may ever reach a "use client" component or be rendered.
// To expose more later (size, code_no, price), add the field here - one place.

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

// ---------- Data + helpers ----------

export const series: Series[]          = raw.series as Series[];
export const products: CatalogProduct[] = raw.products as CatalogProduct[];

export const getSeries     = (slug: string) => series.find(s => s.slug === slug);
export const getProduct    = (slug: string) => products.find(p => p.slug === slug);

export const getProductsBySeries   = (slug: string) =>
  products.filter(p => p.series === slug);

export const getProductsBySubgroup = (seriesSlug: string, subgroup: string) =>
  products.filter(p => p.series === seriesSlug && p.subgroup === subgroup);

export const getFeaturedProducts   = () => products.filter(p => p.featured);

export const getRelatedProducts    = (product: CatalogProduct, n = 4) =>
  products
    .filter(p => p.series === product.series && p.slug !== product.slug)
    .sort((a, b) => {
      // prefer same subgroup, then same finish
      const sameSubgroup = (x: CatalogProduct) => x.subgroup === product.subgroup ? -1 : 1;
      const sameFinish   = (x: CatalogProduct) => x.finish === product.finish ? -1 : 1;
      return sameSubgroup(a) - sameSubgroup(b) || sameFinish(a) - sameFinish(b);
    })
    .slice(0, n);

export const getSeriesFinishes = (slug: string) =>
  [...new Set(getProductsBySeries(slug).map(p => p.finish).filter(Boolean))];

export const getSubgroups = (slug: string): string[] =>
  series.find(s => s.slug === slug)?.subgroups ?? [];

/*
RULES (enforced by CLAUDE.md):
1. Server components may import `products` freely - build-time only.
2. Client components ("use client") must receive PublicProduct[] via toPublic().
   Never pass raw CatalogProduct objects or import this module client-side.
3. Never render d_p or code_no anywhere.
4. Leak canary after every build: grep -r "21680" out/ must return nothing.
*/
