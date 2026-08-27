"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { hairlineDraw } from "@/lib/motion";
import AnimateIn from "@/components/AnimateIn";
import Container from "@/components/layout/Container";
import type { Category } from "@/data/catalog";

interface Props {
  categoryList: Category[];
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

export default function SeriesBand({ categoryList }: Props) {
  return (
    <section className="bg-porcelain py-16 md:py-24" aria-label="Our categories">
      <Container>
        {/* Heading row */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <AnimateIn>
              <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                Collections
              </p>
            </AnimateIn>
            <motion.div
              className="mb-4 h-px w-12 origin-left bg-chrome/70"
              variants={hairlineDraw}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
            <AnimateIn delay={0.15}>
              <h2 className="font-display text-h2 text-navy">Our collections.</h2>
            </AnimateIn>
          </div>
          <AnimateIn delay={0.2} className="hidden sm:block flex-shrink-0">
            <Link
              href="/products/"
              className="font-body text-sm font-medium text-steel underline-offset-4 hover:text-navy hover:underline"
            >
              View all products
            </Link>
          </AnimateIn>
        </div>

        {/* Cards */}
        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 xl:grid-cols-4">
          {categoryList.map((cat, i) => (
            <motion.div
              key={cat.slug}
              custom={i}
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="min-w-[200px] flex-shrink-0 lg:min-w-0"
            >
              <Link
                href={`/category/${cat.slug}/`}
                className="group relative block overflow-hidden rounded-sm bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                aria-label={cat.name}
              >
                {/* Category cover image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    width={400}
                    height={533}
                    className="h-full w-full object-contain p-6 transition-transform duration-[700ms] ease-smooth group-hover:scale-[1.04]"
                    style={{
                      maskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, black 45%, transparent 88%)",
                      WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, black 45%, transparent 88%)",
                    }}
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                  {/* Dark gradient for text */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent"
                  />
                </div>

                {/* Text */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-base text-porcelain leading-tight">
                    {cat.name}
                  </p>
                  <p className="mt-1 font-body text-xs text-porcelain/60 leading-snug line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href="/products/"
            className="font-body text-sm font-medium text-steel underline-offset-4 hover:text-navy hover:underline"
          >
            View all products
          </Link>
        </div>
      </Container>
    </section>
  );
}
