"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroStagger, heroLine, fadeRise } from "@/lib/motion";
import Container from "@/components/layout/Container";

// Drop hero-home-mobile.jpeg (768×1024 portrait) into public/hero/ to enable
// the <source> swap — the <img> fallback handles it until then.
const DESKTOP_SRC = "/hero/hero-home.png";
const MOBILE_SRC = "/hero/hero-home-mobile.jpeg"; // swap in when file exists

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-navy-deep"
      aria-label="Hero"
    >
      {/* ── Full-bleed background image + Ken Burns ─────────────────── */}
      <div className="absolute inset-0">
        {/* Ken Burns: scale 1.06→1 over 8s; MotionConfig reducedMotion="user" makes it instant when reduced-motion is set */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "linear" }}
        >
          <picture className="contents">
            {/* Mobile crop — add public/hero/hero-home-mobile.jpeg to activate */}
            <source media="(max-width: 767px)" srcSet={MOBILE_SRC} type="image/jpeg" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DESKTOP_SRC}
              alt=""
              aria-hidden="true"
              width={1920}
              height={1080}
              className="h-full w-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </motion.div>

        {/* ── Gradient overlay: navy-deep 50% left → transparent right ── */}
        {/* Stronger on mobile where text is full-width; fades to right on desktop */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
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
              "linear-gradient(to top, rgba(10,24,48,0.70) 0%, transparent 55%)",
          }}
        />
      </div>

      {/* ── Bottom chrome hairline ───────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-chrome/20"
      />

      {/* ── Content — left third on desktop ─────────────────────────── */}
      <Container className="relative z-10 flex min-h-screen items-center">
        <div className="w-full max-w-xl py-36 md:py-44 md:max-w-[60%] lg:max-w-[58%]">

          {/* Eyebrow */}
          <motion.p
            className="mb-8 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-porcelain/50"
            variants={fadeRise}
            initial="hidden"
            animate="visible"
          >
            Premium Bath Accessories
          </motion.p>

          {/* Headline — staggered lines */}
          <motion.h1
            className="font-display text-hero text-porcelain leading-[1.05]"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="block" variants={heroLine}>
              Crafted for
            </motion.span>
            <motion.span className="block whitespace-nowrap" variants={heroLine}>
              Lasting Elegance.
            </motion.span>
          </motion.h1>

          {/* Chrome divider — draws in after headline */}
          <motion.div
            className="my-10 h-px w-20 bg-chrome/40"
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: {
                scaleX: 1,
                opacity: 1,
                transition: {
                  ease: [0.22, 1, 0.36, 1],
                  duration: 0.6,
                  delay: 0.55,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            style={{ transformOrigin: "left" }}
          />

          {/* Subtext */}
          <motion.p
            className="max-w-sm font-body text-base leading-relaxed text-porcelain/60 md:text-lg"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  ease: [0.22, 1, 0.36, 1],
                  duration: 0.6,
                  delay: 0.65,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            Your bathroom deserves more than ordinary. Aquai brings premium
            bath accessories and handmade kitchen sinks to homes that
            value quality built to last.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
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
            <Link
              href="/contact/"
              className="inline-flex items-center rounded-sm border border-porcelain/35 px-6 py-3.5 font-body text-sm font-medium text-porcelain/85 transition-colors duration-200 hover:border-porcelain/65 hover:text-porcelain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-porcelain/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
            >
              Enquire Now
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
