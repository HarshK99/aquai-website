import { series, getFeaturedProducts, toPublic } from "@/data/catalog";
import Hero from "@/components/home/Hero";
import SeriesBand from "@/components/home/SeriesBand";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StoryTeaser from "@/components/home/StoryTeaser";
import InquiryCTA from "@/components/home/InquiryCTA";
import AnimateIn from "@/components/AnimateIn";
import Container from "@/components/layout/Container";
import Link from "next/link";

export default function Home() {
  const featuredProducts = getFeaturedProducts().map(toPublic);
  const seriesNames = Object.fromEntries(series.map((s) => [s.slug, s.name]));

  return (
    <>
      {/* ① Hero — full-screen, dark, animated */}
      <Hero />

      {/* ② Series band — 5 series cards */}
      <SeriesBand seriesList={series} />

      {/* ③ Featured products grid */}
      <section className="bg-porcelain py-16 md:py-24 lg:py-32" aria-label="Featured products">
        <Container>
          <AnimateIn className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                Featured
              </p>
              <h2 className="font-display text-h2 text-navy">Our finest work.</h2>
            </div>
            <Link
              href="/products/"
              className="hidden flex-shrink-0 font-body text-sm font-medium text-steel underline-offset-4 hover:text-navy hover:underline sm:block"
            >
              All 44 products
            </Link>
          </AnimateIn>

          <FeaturedProducts products={featuredProducts} seriesNames={seriesNames} />

          <div className="mt-12 sm:hidden">
            <Link
              href="/products/"
              className="font-body text-sm font-medium text-steel underline-offset-4 hover:text-navy hover:underline"
            >
              All 44 products
            </Link>
          </div>
        </Container>
      </section>

      {/* ④ Story teaser */}
      <StoryTeaser />

      {/* ⑤ Inquiry CTA */}
      <InquiryCTA />
    </>
  );
}
