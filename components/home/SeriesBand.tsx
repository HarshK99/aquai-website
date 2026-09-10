"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { hairlineDraw } from "@/lib/motion";
import AnimateIn from "@/components/AnimateIn";
import Container from "@/components/layout/Container";
import type { Category } from "@/data/catalog";
import BlendedProductImage from "@/components/products/BlendedProductImage";
import collectionImageBackgrounds from "@/data/collection-image-backgrounds.json";
interface Props {
  categoryList: Category[];
  scene?: boolean;
}

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: Math.min(i * 0.08, 0.4),
    },
  }),
};

export default function SeriesBand({ categoryList, scene = false }: Props) {
  return (
    <section className="bg-porcelain py-12 md:py-24" aria-label="Our categories">
      <Container>
        {/* Heading row */}
        <div className="mb-6 md:mb-10 flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0 max-w-full">
            <AnimateIn disabled={scene}>
              <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                Collections
              </p>
            </AnimateIn>
            <motion.div
              className="mb-4 h-px w-12 origin-left bg-chrome/70"
              variants={hairlineDraw}
              initial={scene ? false : "hidden"}
              animate={scene ? "visible" : undefined}
              whileInView={scene ? undefined : "visible"}
              viewport={{ once: true }}
            />
            <AnimateIn disabled={scene} delay={0.15}>
              <h2 className="font-display text-h2 text-navy [overflow-wrap:anywhere]">Our collections.</h2>
            </AnimateIn>
          </div>
          <AnimateIn disabled={scene} delay={0.2} className="flex-shrink-0">
            <Link
              href="/products/"
              className="inline-flex min-h-11 items-center font-body text-xs sm:text-sm font-medium text-steel underline-offset-4 hover:text-navy hover:underline"
            >
              View all products
            </Link>
          </AnimateIn>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {categoryList.map((cat, i) => {
            const profile = collectionImageBackgrounds[cat.image as keyof typeof collectionImageBackgrounds];
            return (
            <motion.div
              key={cat.slug}
              custom={i}
              variants={cardReveal}
              initial={scene ? false : "hidden"}
              animate={scene ? "visible" : undefined}
              whileInView={scene ? undefined : "visible"}
              viewport={{ once: true, margin: "-60px" }}
              className="min-w-0"
            >
              <Link
                href={`/category/${cat.slug}/`}
                className="group relative block overflow-hidden rounded-sm lg:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                aria-label={cat.name}
              >
                {/* Category cover image */}
                <div className="relative aspect-square lg:aspect-[3/4] overflow-hidden bg-mist">
                  {profile ? (
                    <BlendedProductImage
                      src={cat.image}
                      alt={cat.name}
                      {...profile}
                      spread="12px"
                      edgeFade={cat.slug === "hardware-and-installations"
                        ? { horizontal: "3%", vertical: "3%" }
                        : { horizontal: "1%", vertical: "2%" }}
                      className="p-3 lg:p-6 transition-transform duration-[700ms] ease-smooth group-hover:scale-[1.04]"
                      loading={i < 3 ? "eager" : "lazy"}
                    />
                  ) : (
                  // New covers retain their normal rendering until sampled.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cat.image}
                    alt={cat.name}
                    width={400}
                    height={533}
                    className="h-full w-full object-contain p-3 lg:p-6 transition-transform duration-[700ms] ease-smooth group-hover:scale-[1.04]"

                    loading={i < 3 ? "eager" : "lazy"}
                  />
                  )}
                  {/* Dark gradient for text */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 hidden lg:block bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent"
                  />
                </div>

                {/* Text */}
                <div className="pt-3 lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-4">
                  <p className="font-body text-sm font-medium text-navy leading-snug [overflow-wrap:anywhere] lg:font-display lg:text-base lg:text-porcelain">
                    {cat.name}
                  </p>
                  <p className="mt-1 hidden lg:line-clamp-2 font-body text-xs text-porcelain/90 leading-snug">
                    {cat.tagline}
                  </p>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </div>


      </Container>
    </section>
  );
}
