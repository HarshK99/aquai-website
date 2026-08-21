import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import Container from "@/components/layout/Container";

export default function InquiryCTA() {
  return (
    <section className="bg-navy-deep py-16 md:py-24 lg:py-32" aria-label="Inquire">
      {/* Top chrome hairline */}
      <span aria-hidden="true" className="block h-px bg-chrome/15 mb-16 md:mb-24" />

      <Container>
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <p className="mb-5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-porcelain/40">
            Enquiries
          </p>
          <h2 className="font-display text-h2 text-porcelain mb-6 leading-tight">
            Let&apos;s discuss your project.
          </h2>
          <p className="font-body text-base text-porcelain/55 leading-relaxed mb-10">
            Dealers, architects, and homeowners welcome. Reach out to our
            authorised distributor - Core Entrade India Pvt. Ltd.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-sm bg-porcelain px-8 py-3.5 font-body text-sm font-medium text-navy-deep transition-colors duration-200 hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-porcelain focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
            >
              Enquire Now
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="tel:+919706041000"
              className="inline-flex items-center gap-2 font-body text-sm text-porcelain/60 transition-colors duration-200 hover:text-porcelain"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 2h2.5l1 3-1.5 1.5A9.5 9.5 0 009 10l1.5-1.5 3 1V12a1 1 0 01-1 1C6.268 13 3 9.732 3 5.5A2.5 2.5 0 013 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              +91 97060 41000
            </a>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
