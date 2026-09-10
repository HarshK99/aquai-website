"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroStagger, heroLine, fadeRise } from "@/lib/motion";
import Container from "@/components/layout/Container";

// Use the portrait composition on phones and the original scene on larger screens.
const DESKTOP_SRC = "/hero/hero-home.png";
const MOBILE_SRC = "/hero/hero-home-mobile.webp";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-navy-deep"
      aria-label="Hero"
    >
      {/* ── Full-bleed background image + Ken Burns ─────────────────── */}
      <div className="absolute inset-0">
        {/* Keep the complete fixture visible throughout loading. */}
        <div
          className="absolute inset-0"
        >
          <picture className="contents">
            {/* Portrait composition for phones */}
            <source media="(max-width: 767px)" srcSet={MOBILE_SRC} type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DESKTOP_SRC}
              alt=""
              aria-hidden="true"
              width={1672}
              height={941}
              className="h-full w-full object-cover object-right-top md:object-center"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>

        {/* ── Gradient overlay: navy-deep 50% left → transparent right ── */}
        {/* Stronger on mobile where text is full-width; fades to right on desktop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,24,48,0.80) 0%, rgba(10,24,48,0.72) 28%, rgba(10,24,48,0.45) 52%, rgba(10,24,48,0.10) 75%, transparent 100%)",
          }}
        />
        {/* Mobile: additional bottom fill for readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(10,24,48,0.94) 0%, rgba(10,24,48,0.72) 28%, rgba(10,24,48,0.08) 65%, rgba(10,24,48,0.25) 100%)",
          }}
        />
      </div>

      {/* ── Bottom chrome hairline ───────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-chrome/20"
      />

      {/* ── Content - left third on desktop ─────────────────────────── */}
      <Container className="relative z-10 flex min-h-[min(640px,95svh)] items-end md:min-h-screen md:items-center">
        <div className="w-full max-w-xl px-1 pb-12 pt-64 md:px-0 md:py-44 md:max-w-[60%] lg:max-w-[58%]">

          {/* Eyebrow */}
          <motion.p
            className="mb-5 md:mb-8 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-porcelain/90"
            variants={fadeRise}
            initial="hidden"
            animate="visible"
          >
            Premium Bath Accessories
          </motion.p>

          {/* Headline - staggered lines */}
          <motion.h1
            className="font-display text-[clamp(2rem,8.5vw,2.5rem)] md:text-hero text-porcelain leading-[1.12]"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="block" variants={heroLine}>
              Crafted for
            </motion.span>
            <motion.span className="block" variants={heroLine}>
              Lasting Elegance
            </motion.span>
          </motion.h1>

          {/* CTAs */}
          <motion.div
            className="mt-7 md:mt-10 flex flex-wrap gap-4"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  ease: [0.22, 1, 0.36, 1],
                  duration: 0.5,
                  delay: 0.8,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            <Link
              href="/products/"
              className="inline-flex items-center gap-2 rounded-sm bg-porcelain px-6 py-3.5 font-body text-sm font-medium text-navy-deep transition-colors duration-200 hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-porcelain focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
            >
              View Collection
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
