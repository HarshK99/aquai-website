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
import ProductCard from "@/components/products/ProductCard";
import ProductShowcase from "@/components/products/ProductShowcase";
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

  return (
    <>
      {/* ── 55/45 product layout (image tint + colour selector) ──── */}
      <ProductShowcase
        product={toPublic(product)}
        seriesName={seriesName}
        type={product.type}
        category={cat ? { name: cat.name, slug: cat.slug } : null}
      />

      {/* ── Related products ──────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-mist py-16 md:py-24">
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
