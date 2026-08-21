import type { Metadata } from "next";
import { products, categories, SERIES_NAMES, toPublic } from "@/data/catalog";
import ProductGrid from "@/components/products/ProductGrid";
import Container from "@/components/layout/Container";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse all 70 Aquai products across seven collections - bath accessories, kitchen sinks and bathroom fittings.",
};

export default function ProductsPage() {
  const publicProducts = products.map(toPublic);
  const categoryList = categories.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <>
      {/* Page header */}
      <div className="bg-mist pt-32 pb-12 md:pt-40 md:pb-16">
        <Container>
          <AnimateIn>
            <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
              Catalogue
            </p>
            <h1 className="font-display text-h2 text-navy">All products.</h1>
          </AnimateIn>
        </Container>
      </div>

      {/* Product grid */}
      <section className="bg-porcelain py-12 md:py-16">
        <Container>
          <ProductGrid
            products={publicProducts}
            seriesNames={SERIES_NAMES}
            categoryList={categoryList}
          />
        </Container>
      </section>
    </>
  );
}
