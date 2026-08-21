import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  categories,
  getCategory,
  getProductsByCategory,
  SERIES_NAMES,
  toPublic,
} from "@/data/catalog";
import ProductGrid from "@/components/products/ProductGrid";
import Container from "@/components/layout/Container";
import AnimateIn from "@/components/AnimateIn";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = getCategory(params.slug);
  if (!cat) return {};
  return { title: cat.name, description: cat.tagline };
}

export default function CategoryPage({ params }: Props) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();

  const catProducts = getProductsByCategory(cat.slug).map(toPublic);

  // Build series list only for series that actually appear in this category
  const seriesSlugsInCat = [...new Set(catProducts.map(p => p.series))];
  const seriesList = seriesSlugsInCat.length > 1
    ? seriesSlugsInCat.map(s => ({ slug: s, name: SERIES_NAMES[s] ?? s }))
    : undefined;

  return (
    <>
      {/* ── Category hero ─────────────────────────────────── */}
      <div className="relative overflow-hidden pt-32 pb-20 bg-mist">
        <div className="absolute inset-0">
          <img
            src={cat.image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            width={1200}
            height={1200}
          />
          <div className="absolute inset-0 bg-mist/92" />
        </div>

        <Container className="relative z-10">
          <AnimateIn>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-1.5 text-xs text-steel">
                <li>
                  <Link href="/products/" className="hover:text-navy transition-colors duration-150">
                    Products
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-40">/</li>
                <li className="text-navy">{cat.name}</li>
              </ol>
            </nav>

            <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
              Category
            </p>

            <h1 className="mb-5 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-navy">
              {cat.name}.
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-steel">
              {cat.tagline}
            </p>

            <p className="mt-3 text-sm text-steel/70">
              {catProducts.length} products
            </p>
          </AnimateIn>
        </Container>
      </div>

      {/* ── Products grid ─────────────────────────────────── */}
      <section className="bg-porcelain py-12 md:py-16">
        <Container>
          <ProductGrid
            products={catProducts}
            seriesNames={SERIES_NAMES}
            seriesList={seriesList}
          />
        </Container>
      </section>

      {/* ── Inquiry CTA ───────────────────────────────────── */}
      <section className="bg-navy-deep py-16 md:py-24">
        <Container>
          <AnimateIn>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-porcelain/50">
                  Get in touch
                </p>
                <h2 className="font-display text-h2 text-porcelain">
                  Enquire about {cat.name}.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact/"
                  className="rounded-sm bg-porcelain px-8 py-3 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-porcelain/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-porcelain focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
                >
                  Enquire now
                </Link>
                <a
                  href="tel:+919706041000"
                  className="rounded-sm border border-porcelain/40 px-8 py-3 text-sm font-semibold text-porcelain transition-colors duration-200 hover:border-porcelain hover:bg-porcelain/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-porcelain focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
                >
                  +91 97060 41000
                </a>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}
