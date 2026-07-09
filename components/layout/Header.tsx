"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SeriesItem {
  slug: string;
  name: string;
}

interface Props {
  seriesList: SeriesItem[];
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products/", label: "Products" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scaleY: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -4,
    scaleY: 0.97,
    transition: { duration: 0.12, ease: "easeIn" },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function Header({ seriesList }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [seriesOpen, setSeriesOpen] = useState(false);
  const pathname = usePathname();
  const seriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (seriesRef.current && !seriesRef.current.contains(e.target as Node)) {
        setSeriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    setSeriesOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinkClass = (href: string) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive(href) ? "text-navy" : "text-steel hover:text-navy"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-porcelain border-b border-chrome"
          : "bg-porcelain border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-content px-6 lg:px-10 flex items-center justify-between h-20">
        {/* ── Logo ──────────────────────────────────────────────── */}
        <Link href="/" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-sm">
          <Image
            src="/logo.jpg"
            alt="Aquai"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* ── Desktop nav ────────────────────────────────────────── */}
        <ul className="hidden lg:flex items-center gap-8" role="list">
          <li>
            <Link href="/" className={navLinkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/products/" className={navLinkClass("/products/")}>
              Products
            </Link>
          </li>

          {/* Series dropdown */}
          <li>
            <div ref={seriesRef} className="relative">
              <button
                onClick={() => setSeriesOpen((v) => !v)}
                aria-expanded={seriesOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                  pathname.startsWith("/series/")
                    ? "text-navy"
                    : "text-steel hover:text-navy"
                }`}
              >
                Series
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${seriesOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {seriesOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ transformOrigin: "top center" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-porcelain border border-chrome rounded-sm shadow-lg py-2"
                  >
                    {seriesList.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/series/${s.slug}/`}
                        className="block px-5 py-2.5 text-sm text-steel hover:text-navy hover:bg-mist transition-colors"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>

          <li>
            <Link href="/about/" className={navLinkClass("/about/")}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact/" className={navLinkClass("/contact/")}>
              Contact
            </Link>
          </li>
        </ul>

        {/* ── Desktop CTA ─────────────────────────────────────────── */}
        <div className="hidden lg:flex">
          <Link
            href="/contact/"
            className="inline-flex items-center px-5 py-2.5 bg-navy text-porcelain text-sm font-medium rounded-sm hover:bg-navy-deep transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
          >
            Enquire Now
          </Link>
        </div>

        {/* ── Mobile hamburger ────────────────────────────────────── */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-sm"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-px w-6 bg-navy-deep transition-all duration-200 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-navy-deep transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-navy-deep transition-all duration-200 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden overflow-hidden border-t border-chrome bg-porcelain"
          >
            <ul className="px-6 py-4 flex flex-col gap-1" role="list">
              <li>
                <Link
                  href="/"
                  className="block py-3 text-base font-medium text-navy border-b border-chrome/50"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products/"
                  className="block py-3 text-base font-medium text-steel border-b border-chrome/50"
                >
                  Products
                </Link>
              </li>

              {/* Mobile: series expanded inline */}
              <li>
                <p className="pt-3 pb-2 text-xs uppercase tracking-[0.14em] text-steel font-semibold">
                  Series
                </p>
                <ul className="flex flex-col gap-0.5 pb-3 border-b border-chrome/50">
                  {seriesList.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/series/${s.slug}/`}
                        className="block py-2 pl-3 text-sm text-steel hover:text-navy transition-colors"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li>
                <Link
                  href="/about/"
                  className="block py-3 text-base font-medium text-steel border-b border-chrome/50"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/"
                  className="block py-3 text-base font-medium text-steel"
                >
                  Contact
                </Link>
              </li>

              <li className="pt-4 pb-2">
                <Link
                  href="/contact/"
                  className="block text-center py-3 bg-navy text-porcelain text-sm font-medium rounded-sm"
                >
                  Enquire Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
