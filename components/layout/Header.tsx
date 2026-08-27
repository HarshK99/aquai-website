"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryItem {
  slug: string;
  name: string;
}

interface Props {
  categoryList: CategoryItem[];
}

const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scaleY: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -4,
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
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

export default function Header({ categoryList }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const pathname = usePathname();
  const catRef = useRef<HTMLDivElement>(null);

  const onHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setCatOpen(false);
  }, [pathname]);

  const transparent = onHomePage && !scrolled;

  const headerBg = transparent ? "bg-transparent" : "bg-porcelain/95 backdrop-blur-md";
  const headerBorder = scrolled ? "border-b border-chrome" : "border-b border-transparent";
  const navBase = transparent ? "text-porcelain/75 hover:text-porcelain" : "text-steel hover:text-navy";
  const navActive = transparent ? "text-porcelain" : "text-navy";
  const ctaClass = transparent
    ? "border border-porcelain/40 text-porcelain hover:border-porcelain/70 hover:bg-porcelain/10"
    : "bg-navy text-porcelain hover:bg-navy-deep";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors duration-200 ${isActive(href) ? navActive : navBase}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerBg} ${headerBorder}`}
    >
      <nav
        className="mx-auto flex h-20 max-w-content items-center justify-between px-6 lg:px-10"
        aria-label="Main navigation"
      >
        {/* ── Logo ─────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current rounded-sm"
        >
          <Image
            src="/logo.png"
            alt="Aquai"
            width={120}
            height={40}
            className="h-20 w-auto object-contain transition-[filter] duration-300"
            priority
          />
        </Link>

        {/* ── Desktop nav ──────────────────────────────────── */}
        <ul className="hidden lg:flex items-center gap-8" role="list">
          <li>
            <Link href="/" className={linkClass("/")}>Home</Link>
          </li>
          <li>
            <Link href="/products/" className={linkClass("/products/")}>Products</Link>
          </li>

          {/* Categories dropdown */}
          <li>
            <div ref={catRef} className="relative">
              <button
                onClick={() => setCatOpen((v) => !v)}
                aria-expanded={catOpen}
                aria-haspopup="listbox"
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                  pathname.startsWith("/category/") ? navActive : navBase
                }`}
              >
                Categories
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
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
                {catOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ transformOrigin: "top center" }}
                    role="listbox"
                    aria-label="Categories"
                    className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-sm border border-chrome bg-porcelain py-2 shadow-lg"
                  >
                    {categoryList.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}/`}
                        role="option"
                        className="block px-5 py-2.5 text-sm text-steel transition-colors hover:bg-mist hover:text-navy"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>

          <li>
            <Link href="/about/" className={linkClass("/about/")}>About</Link>
          </li>
          <li>
            <Link href="/contact/" className={linkClass("/contact/")}>Contact</Link>
          </li>
        </ul>

        {/* ── Desktop CTA ──────────────────────────────────── */}
        <div className="hidden lg:flex">
          <Link
            href="/contact/"
            className={`inline-flex items-center rounded-sm px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 ${ctaClass}`}
          >
            Enquire Now
          </Link>
        </div>

        {/* ── Mobile hamburger ─────────────────────────────── */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current rounded-sm"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {["top", "mid", "bot"].map((id, i) => (
            <span
              key={id}
              className={`block h-px w-6 transition-all duration-200 ${
                transparent ? "bg-porcelain" : "bg-navy-deep"
              } ${
                i === 0 && menuOpen
                  ? "translate-y-[3.5px] rotate-45"
                  : i === 1 && menuOpen
                  ? "opacity-0"
                  : i === 2 && menuOpen
                  ? "-translate-y-[3.5px] -rotate-45"
                  : ""
              }`}
            />
          ))}
        </button>
      </nav>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden overflow-hidden border-t border-chrome bg-porcelain"
          >
            <ul className="flex flex-col gap-1 px-6 py-4" role="list">
              {[
                { href: "/", label: "Home" },
                { href: "/products/", label: "Products" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block border-b border-chrome/50 py-3 text-base font-medium text-navy"
                  >
                    {label}
                  </Link>
                </li>
              ))}

              <li>
                <p className="pt-3 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                  Categories
                </p>
                <ul className="flex flex-col gap-0.5 border-b border-chrome/50 pb-3">
                  {categoryList.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/category/${cat.slug}/`}
                        className="block py-2 pl-3 text-sm text-steel transition-colors hover:text-navy"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {[
                { href: "/about/", label: "About" },
                { href: "/contact/", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block py-3 text-base font-medium text-steel ${href !== "/contact/" ? "border-b border-chrome/50" : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}

              <li className="pb-2 pt-4">
                <Link
                  href="/contact/"
                  className="block rounded-sm bg-navy py-3 text-center text-sm font-medium text-porcelain"
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
