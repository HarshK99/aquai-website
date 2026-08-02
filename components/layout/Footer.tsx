import Link from "next/link";
import Image from "next/image";
import { series } from "@/data/catalog";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-porcelain">
      {/* Chrome hairline at top */}
      <div className="h-px bg-chrome/20" />

      <div className="mx-auto max-w-content px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* ── Brand column ─────────────────────────── */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="Aquai home">
              <Image
                src="/logo.png"
                alt="Aquai"
                width={120}
                height={40}
                className="h-20 w-auto object-contain brightness-0 invert mb-5"
              />
            </Link>
            <p className="text-sm text-porcelain/60 leading-relaxed max-w-xs">
              Premium bath accessories and kitchen sinks. Crafted for lasting elegance.
            </p>
          </div>

          {/* ── Series links ─────────────────────────── */}
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-porcelain/40 font-semibold mb-5">
              Series
            </p>
            <ul className="flex flex-col gap-3">
              {series.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/series/${s.slug}/`}
                    className="text-sm text-porcelain/70 hover:text-porcelain transition-colors duration-200"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ───────────────────────── */}
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-porcelain/40 font-semibold mb-5">
              Authorised Distributor
            </p>
            <p className="text-sm font-medium text-porcelain/90 mb-4">
              Core Entrade India Pvt. Ltd.
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:+919706041000"
                  className="text-sm text-porcelain/70 hover:text-porcelain transition-colors duration-200"
                >
                  +91 97060 41000
                </a>
              </li>
              <li>
                <a
                  href="mailto:coregujarat@coreindia.co.in"
                  className="text-sm text-porcelain/70 hover:text-porcelain transition-colors duration-200 break-all"
                >
                  coregujarat@coreindia.co.in
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919706041000?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20Aquai%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-porcelain/70 hover:text-porcelain transition-colors duration-200"
                >
                  {/* WhatsApp icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-chrome/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-porcelain/40">
            &copy; {new Date().getFullYear()} Aquai. All rights reserved.
          </p>
          <p className="text-xs text-porcelain/40">
            Distributed by Core Entrade India Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
