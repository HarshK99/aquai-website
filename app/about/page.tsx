import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aquai makes premium bath accessories and kitchen sinks - products built for the life of a building, not the length of a warranty.",
};

const principles = [
  {
    title: "Material honesty",
    body: "Every product specification lists the exact alloy grade and coating process. We do not round up quality claims.",
  },
  {
    title: "Finish precision",
    body: "Chrome, Gold, Rose Gold, and Matt Black finishes are applied through controlled PVD and electroplating lines. Each surface is inspected before packaging.",
  },
  {
    title: "Functional permanence",
    body: "Designed for the life of a building. Our stainless steel does not rust in standard residential and commercial environments - that is a factual property of the alloy, not a marketing claim.",
  },
  {
    title: "Curated distribution",
    body: "Sold through selected dealers and distributors who can advise customers on specification and installation. Not available through mass retail.",
  },
];

const facts = [
  {
    label: "Premium Grade Steel",
    detail:
      "The same alloy standard used in food processing, surgical instruments, and marine applications. Non-reactive, non-corroding.",
  },
  {
    label: "PVD Coating",
    detail:
      "Physical vapour deposition for Gold and Rose Gold finishes. Harder than electroplated coatings; resistant to tarnish and daily abrasion.",
  },
  {
    label: "In-house QC",
    detail:
      "Every piece is surface-checked before it leaves the factory. Finish consistency across a full bathroom set is a non-negotiable.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Page header ──────────────────────────────────── */}
      <div className="bg-mist pt-24 pb-10 md:pt-40 md:pb-20">
        <Container>
          <AnimateIn>
            <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
              About Aquai
            </p>
            <h1 className="max-w-2xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] text-navy">
              Made from material.
              <br />
              Built for decades.
            </h1>
          </AnimateIn>
        </Container>
      </div>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="bg-porcelain py-12 md:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <AnimateIn>
              <p className="mb-6 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                Our story
              </p>
              <h2 className="mb-6 font-display text-h2 text-navy">
                The product is the material.
              </h2>
              <div className="space-y-4 text-base leading-[1.75] text-steel">
                <p>
                  Aquai was founded by people who had spent years watching
                  well-designed products fail at the surface level - literally.
                  Finishes that faded, chrome that pitted, satin that lost its
                  sheen within two years of installation.
                </p>
                <p>
                  The solution was to start further upstream: with metallurgy.
                  Premium-grade stainless steel is the foundation of every
                  Aquai product - the same alloy trusted in surgical
                  instruments and food-grade equipment because it does not
                  corrode under normal conditions of moisture and cleaning agents.
                </p>
                <p>
                  From there, it is about process discipline: the right
                  plating chemistry, the right coating thickness, the right
                  inspection before packaging. Products that look the same on
                  day one and day three thousand.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <div className="aspect-[4/5] overflow-hidden bg-mist">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/products/elite/_series-cover.jpeg"
                  alt="Elite series bath accessories in Gold, Rose Gold, and Chrome finishes"
                  width={800}
                  height={1000}
                  className="h-full w-full object-contain p-10"
                  loading="lazy"
                />
              </div>
            </AnimateIn>
          </div>
        </Container>
      </section>

      {/* ── Manufacturing ────────────────────────────────── */}
      <section className="bg-mist py-12 md:py-28">
        <Container>
          <AnimateIn>
            <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
              Manufacturing
            </p>
            <h2 className="mb-8 md:mb-14 font-display text-h2 text-navy">
              Process over promise.
            </h2>
          </AnimateIn>
          <div className="grid gap-8 md:grid-cols-3">
            {facts.map((f, i) => (
              <AnimateIn key={f.label} delay={i * 0.08}>
                <div className="border-t border-chrome pt-6">
                  <h3 className="mb-3 font-body text-base font-semibold text-navy">
                    {f.label}
                  </h3>
                  <p className="text-sm leading-[1.75] text-steel">{f.detail}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Principles ───────────────────────────────────── */}
      <section className="bg-porcelain py-12 md:py-28">
        <Container>
          <AnimateIn>
            <p className="mb-4 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
              Principles
            </p>
            <h2 className="mb-8 md:mb-14 font-display text-h2 text-navy">
              How we work.
            </h2>
          </AnimateIn>
          <div className="grid gap-8 sm:grid-cols-2">
            {principles.map((p, i) => (
              <AnimateIn key={p.title} delay={i * 0.07}>
                <div className="border-t border-chrome pt-6">
                  <h3 className="mb-3 font-body text-base font-semibold text-navy">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-[1.75] text-steel">{p.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-navy-deep py-12 md:py-24">
        <Container>
          <AnimateIn>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-porcelain/80">
                  Catalogue & enquiries
                </p>
                <h2 className="font-display text-h2 text-porcelain">
                  See the full collection.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products/"
                  className="rounded-sm bg-porcelain px-8 py-3 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-porcelain/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-porcelain focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
                >
                  View all products
                </Link>
                <Link
                  href="/contact/"
                  className="rounded-sm border border-porcelain/40 px-8 py-3 text-sm font-semibold text-porcelain transition-colors duration-200 hover:border-porcelain hover:bg-porcelain/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-porcelain focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}
