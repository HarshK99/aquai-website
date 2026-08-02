import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  series,
  getSeries,
  getProductsBySeries,
  getProductsBySubgroup,
  toPublic,
} from "@/data/catalog";
import ProductGrid from "@/components/products/ProductGrid";
import SubgroupNav from "@/components/products/SubgroupNav";
import { toAnchor } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/layout/Container";
import AnimateIn from "@/components/AnimateIn";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return series.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = getSeries(params.slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.tagline,
  };
}

export default function SeriesPage({ params }: Props) {
  const s = getSeries(params.slug);
  if (!s) notFound();

  const seriesProducts = getProductsBySeries(s.slug).map(toPublic);
  const seriesNames = Object.fromEntries(series.map((sr) => [sr.slug, sr.name]));

  const isBrava = s.slug === "brava";
  const isElite = s.slug === "elite";
  const hasSubgroups = s.subgroups && s.subgroups.length > 0;

  return (
    <>
      {/* ── Series hero band ─────────────────────────────── */}
      <div
        className={`relative overflow-hidden pt-32 pb-20 ${
          isBrava ? "bg-navy-deep" : "bg-mist"
        }`}
      >
        {/* Background cover image with overlay */}
        <div className="absolute inset-0">
          <img
            src={s.image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            width={1200}
            height={1200}
          />
          <div
            className={`absolute inset-0 ${
              isBrava ? "bg-navy-deep/88" : "bg-mist/92"
            }`}
          />
        </div>

        {/* Text */}
        <Container className="relative z-10">
          <AnimateIn>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol
                className={`flex items-center gap-1.5 text-xs ${
                  isBrava ? "text-porcelain/50" : "text-steel"
                }`}
              >
                <li>
                  <Link
                    href="/products/"
                    className={`transition-colors duration-150 ${
                      isBrava
                        ? "hover:text-porcelain"
                        : "hover:text-navy"
                    }`}
                  >
                    Products
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-40">
                  /
                </li>
                <li className={isBrava ? "text-porcelain" : "text-navy"}>
                  {s.name}
                </li>
              </ol>
            </nav>

            <p
              className={`mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.14em] ${
                isBrava ? "text-porcelain/50" : "text-steel"
              }`}
            >
              Collection
            </p>

            <h1
              className={`mb-5 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] ${
                isBrava ? "text-porcelain" : "text-navy"
              }`}
            >
              {s.name}.
            </h1>

            <p
              className={`max-w-lg text-base leading-relaxed ${
                isBrava ? "text-porcelain/65" : "text-steel"
              }`}
            >
              {s.tagline}
            </p>

            <p
              className={`mt-3 text-sm ${
                isBrava ? "text-porcelain/45" : "text-steel/70"
              }`}
            >
              {seriesProducts.length} products
            </p>
          </AnimateIn>
        </Container>
      </div>

      {/* ── Subgroup sticky nav (S&BA only) ──────────────── */}
      {hasSubgroups && <SubgroupNav subgroups={s.subgroups!} />}

      {/* ── Products grid ──────────────────────────────────── */}
      {hasSubgroups ? (
        /* Subgroup-sectioned layout */
        <div className="bg-porcelain py-12 md:py-16">
          {s.subgroups!.map((sg) => {
            const sgProducts = getProductsBySubgroup(s.slug, sg).map(toPublic);
            if (!sgProducts.length) return null;
            return (
              <section key={sg} id={toAnchor(sg)} className="scroll-mt-32 mb-16 last:mb-0">
                <Container>
                  <AnimateIn>
                    <h2 className="mb-8 font-display text-h2 text-navy">{sg}</h2>
                  </AnimateIn>
                  <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
                    {sgProducts.map((p, i) => (
                      <AnimateIn key={p.slug} delay={i * 0.05}>
                        <ProductCard product={p} seriesName={seriesNames[p.series]} />
                      </AnimateIn>
                    ))}
                  </div>
                </Container>
              </section>
            );
          })}
        </div>
      ) : (
        /* Flat grid with filter (Elite / Daizy / Brava etc.) */
        <section className="bg-porcelain py-12 md:py-16">
          <Container>
            {isElite && (
              <AnimateIn className="mb-4">
                <p className="text-sm text-steel">
                  Elite is available in three finishes — use the chips below to
                  filter.
                </p>
              </AnimateIn>
            )}
            <ProductGrid
              products={seriesProducts}
              seriesNames={seriesNames}
              fixedSeries={s.slug}
            />
          </Container>
        </section>
      )}

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
                  Enquire about {s.name}.
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
