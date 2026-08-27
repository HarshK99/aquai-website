"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { hairlineDraw } from "@/lib/motion";
import AnimateIn from "@/components/AnimateIn";
import Container from "@/components/layout/Container";

export default function StoryTeaser() {

  return (
    <section className="bg-mist py-16 md:py-24 lg:py-32" aria-label="About Aquai">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Image */}
          <AnimateIn className="relative overflow-hidden rounded-sm bg-mist aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/elite/elite-towel-rack-gold.jpeg"
              alt="Aquai Elite Series Gold Towel Rack"
              width={800}
              height={600}
              className="h-full w-full object-contain p-10"
              loading="lazy"
            />
            {/* 1px navy accent at bottom - chrome hairline motif */}
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-navy" />
          </AnimateIn>

          {/* Text */}
          <AnimateIn delay={0.1}>
            <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
              About Aquai
            </p>
            <h2 className="font-display text-h2 text-navy mb-6 leading-tight">
              Built from<br />the inside out.
            </h2>
            <p className="font-body text-base leading-relaxed text-steel mb-4">
              Every Aquai product starts with a decision about material - steel
              that does not rust, finishes that do not fade, and processes built
              to hold up through decades of daily use.
            </p>
            <p className="font-body text-base leading-relaxed text-steel mb-8">
              Whether it is a towel rack, a soap dispenser or a kitchen sink -
              every Aquai fixture is held to the same uncompromising standard.
            </p>
            {/* Chrome hairline before link — animates in on scroll */}
            <motion.span
              aria-hidden="true"
              className="block h-px w-12 origin-left bg-chrome mb-6"
              variants={hairlineDraw}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
            <Link
              href="/about/"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-navy underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            >
              Our Story
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </AnimateIn>
        </div>
      </Container>
    </section>
  );
}
