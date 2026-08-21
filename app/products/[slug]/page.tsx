import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  products,
  SERIES_NAMES,
  getProduct,
  getCategoryForProduct,
  getRelatedProducts,
  toPublic,
} from "@/data/catalog";
import FinishBadge from "@/components/products/FinishBadge";
import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/layout/Container";
import AnimateIn from "@/components/AnimateIn";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.product_name,
    description: product.finish
      ? `${product.product_name} in ${product.finish} finish - ${product.type} from Aquai.`
      : `${product.product_name} - ${product.type} from Aquai.`,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const seriesName = SERIES_NAMES[product.series] ?? product.series;
  const cat = getCategoryForProduct(product);

  const related = getRelatedProducts(product, 4).map(toPublic);

  const whatsappText = encodeURIComponent(
    product.finish
      ? `Hi, I'd like to enquire about the Aquai ${product.product_name} (${product.finish}).`
      : `Hi, I'd like to enquire about the Aquai ${product.product_name}.`
  );
  const whatsappUrl = `https://wa.me/919706041000?text=${whatsappText}`;

  return (
    <>
      {/* ── 55/45 product layout ──────────────────────────── */}
      <div className="bg-porcelain pt-20">
        <div className="lg:grid lg:grid-cols-[55fr_45fr] lg:items-start">
          {/* Left: image */}
          <div className="bg-mist aspect-square lg:aspect-[4/5] overflow-hidden">
            <img
              src={product.image}
              alt={product.finish ? `${product.product_name} in ${product.finish} finish` : product.product_name}
              width={1200}
              height={1200}
              className="h-full w-full object-contain p-10 md:p-16"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          {/* Right: info (sticky on desktop) */}
          <aside className="px-6 py-10 lg:px-12 lg:sticky lg:top-20 lg:max-h-[calc(100vh-80px)] lg:overflow-y-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-steel">
                <li>
                  <Link
                    href="/products/"
                    className="hover:text-navy transition-colors duration-150"
                  >
                    Products
                  </Link>
                </li>
                {cat && (
                  <>
                    <li aria-hidden="true" className="opacity-40">/</li>
                    <li>
                      <Link
                        href={`/category/${cat.slug}/`}
                        className="hover:text-navy transition-colors duration-150"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  </>
                )}
                <li aria-hidden="true" className="opacity-40">/</li>
                <li className="text-navy">{product.product_name}</li>
              </ol>
            </nav>

            {/* Series eyebrow */}
            <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
              {seriesName}
            </p>

            {/* Product name */}
            <h1 className="mb-5 font-display text-[clamp(1.75rem,3.5vw,2.625rem)] leading-[1.1] text-navy">
              {product.product_name}
            </h1>

            {/* Finish badge */}
            <div className="mb-6">
              <FinishBadge finish={product.finish} />
            </div>

            {/* Hairline divider */}
            <div className="mb-5 h-px bg-chrome/40" />

            {/* Type */}
            <p className="mb-4 text-sm text-steel">{product.type}</p>

            {/* Variants (e.g. Floor Trap Drain - With Tiles Insert / Line Design) */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                  Available variants
                </p>
                <ul className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <li
                      key={v}
                      className="rounded-sm border border-chrome px-3 py-1 text-xs text-steel"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!product.variants?.length && <div className="mb-8" />}

            {/* CTA buttons */}
            <div className="space-y-3">
              <Link
                href="/contact/"
                className="block w-full rounded-sm bg-navy py-3 text-center text-sm font-semibold text-porcelain transition-colors duration-200 hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
              >
                Enquire now
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-sm border border-navy py-3 text-center text-sm font-semibold text-navy transition-colors duration-200 hover:bg-navy hover:text-porcelain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
              >
                WhatsApp
              </a>
            </div>

            {/* Brand note */}
            <p className="mt-8 text-[11px] text-steel/60">
              Distributed by Core Entrade India Pvt. Ltd.
            </p>
          </aside>
        </div>
      </div>

      {/* ── Related products ──────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-porcelain py-16 md:py-24">
          <Container>
            <AnimateIn>
              <h2 className="mb-10 font-display text-h2 text-navy">
                Related products.
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
              {related.map((p, i) => (
                <AnimateIn key={p.slug} delay={i * 0.07}>
                  <ProductCard product={p} seriesName={SERIES_NAMES[p.series]} />
                </AnimateIn>
              ))}
            </div>
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
                  Interested in this product?
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
                  href={`tel:+919706041000`}
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
