import Link from "next/link";
import type { Series } from "@/data/catalog";
import AnimateIn from "@/components/AnimateIn";
import Container from "@/components/layout/Container";

interface Props {
  seriesList: Series[];
}

export default function SeriesBand({ seriesList }: Props) {
  return (
    <section className="bg-porcelain py-16 md:py-24" aria-label="Our series">
      <Container>
        <AnimateIn className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
              Collections
            </p>
            <h2 className="font-display text-h2 text-navy">Our collections.</h2>
          </div>
          <Link
            href="/products/"
            className="hidden flex-shrink-0 font-body text-sm font-medium text-steel underline-offset-4 hover:text-navy hover:underline sm:block"
          >
            View all products
          </Link>
        </AnimateIn>

        {/* Horizontal scroll on mobile, 5-col grid on desktop */}
        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 xl:grid-cols-4">
          {seriesList.map((s, i) => (
            <Link
              key={s.slug}
              href={`/series/${s.slug}/`}
              className="group relative min-w-[200px] flex-shrink-0 overflow-hidden rounded-sm bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 lg:min-w-0"
              aria-label={s.name}
            >
              {/* Series cover image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.name}
                  width={400}
                  height={533}
                  className="h-full w-full object-contain p-6 transition-transform duration-[700ms] ease-smooth group-hover:scale-[1.04]"
                  loading={i < 3 ? "eager" : "lazy"}
                  style={{
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, black 45%, transparent 88%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, black 45%, transparent 88%)",
                  }}
                />
                {/* Dark gradient overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent"
                />
              </div>

              {/* Text over overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-base text-porcelain leading-tight">
                  {s.name}
                </p>
                <p className="mt-1 font-body text-xs text-porcelain/60 leading-snug line-clamp-2">
                  {s.tagline}
                </p>
              </div>
            </Link>
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
