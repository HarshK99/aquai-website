"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { imageReveal } from "@/lib/motion";
import {
  COLOR_SWATCH,
  COLOR_FILTER,
  isColorVariant,
  type ColorVariant,
} from "@/lib/colorVariants";
import type { PublicProduct } from "@/data/catalog";
import FinishBadge from "./FinishBadge";

interface Props {
  product: PublicProduct;
  seriesName: string;
  type: string;
  category: { name: string; slug: string } | null;
}

const chip = (active: boolean) =>
  `inline-flex shrink-0 items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1 ${
    active
      ? "bg-navy text-porcelain"
      : "border border-chrome bg-porcelain text-steel hover:border-navy/40 hover:text-navy"
  }`;

export default function ProductShowcase({
  product,
  seriesName,
  type,
  category,
}: Props) {
  const reduceMotion = useReducedMotion();
  const colors = product.variants.filter(isColorVariant);
  const [selected, setSelected] = useState<ColorVariant | null>(null);

  const filter = selected ? COLOR_FILTER[selected] : "none";

  const enquiryText = selected
    ? `Hi, I'd like to enquire about the Aquai ${product.product_name} (${selected}).`
    : `Hi, I'd like to enquire about the Aquai ${product.product_name}.`;
  const whatsappUrl = `https://wa.me/919706041000?text=${encodeURIComponent(enquiryText)}`;

  const imageAlt = selected
    ? `${product.product_name} — ${selected} finish (indicative)`
    : product.product_name;

  return (
    <div className="bg-porcelain pt-20">
      <div className="lg:grid lg:grid-cols-[55fr_45fr] lg:items-start">
        {/* Left: image */}
        <motion.div
          className="bg-product-bg aspect-square lg:aspect-[4/5] overflow-hidden"
          variants={imageReveal}
          initial="hidden"
          animate="visible"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={imageAlt}
            width={1200}
            height={1200}
            className="h-full w-full object-contain p-10 md:p-16"
            style={{
              filter,
              transition: reduceMotion
                ? undefined
                : "filter 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        {/* Right: info (sticky on desktop) */}
        <aside className="px-6 py-10 lg:px-12 lg:sticky lg:top-20 lg:max-h-[calc(100vh-80px)] lg:overflow-y-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-steel">
              <li>
                <Link
                  href="/products/"
                  className="hover:text-navy transition-colors duration-150"
                >
                  Products
                </Link>
              </li>
              {category && (
                <>
                  <li aria-hidden="true" className="opacity-40">/</li>
                  <li>
                    <Link
                      href={`/category/${category.slug}/`}
                      className="hover:text-navy transition-colors duration-150"
                    >
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden="true" className="opacity-40">/</li>
              <li className="text-navy">{product.product_name}</li>
            </ol>
          </nav>

          {/* Series eyebrow */}
          <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
            {seriesName}
          </p>

          {/* Product name */}
          <h1 className="mb-5 font-display text-[clamp(1.75rem,3.5vw,2.625rem)] leading-[1.1] text-navy">
            {product.product_name}
          </h1>

          {/* Finish badge */}
          <div className="mb-6">
            <FinishBadge finish={product.finish} />
          </div>

          {/* Hairline divider */}
          <div className="mb-5 h-px bg-chrome/40" />

          {/* Type */}
          <p className="mb-4 text-sm text-steel">{type}</p>

          {/* Colour selector */}
          {colors.length > 0 && (
            <div className="mb-8">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                Colour
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Select a colour"
              >
                <button
                  type="button"
                  className={chip(selected === null)}
                  aria-pressed={selected === null}
                  onClick={() => setSelected(null)}
                >
                  As shown
                </button>
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={chip(selected === c)}
                    aria-pressed={selected === c}
                    onClick={() => setSelected(c)}
                  >
                    <span
                      className={`h-2 w-2 rounded-full flex-shrink-0 ${COLOR_SWATCH[c]}`}
                      aria-hidden="true"
                    />
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {colors.length === 0 && <div className="mb-8" />}

          {/* CTA buttons */}
          <div className="space-y-3">
            <Link
              href="/contact/"
              className="block w-full rounded-sm bg-navy py-3 text-center text-sm font-semibold text-porcelain transition-colors duration-200 hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              Enquire now
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-sm border border-navy py-3 text-center text-sm font-semibold text-navy transition-colors duration-200 hover:bg-navy hover:text-porcelain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              WhatsApp
            </a>
          </div>

          {/* Brand note */}
          <p className="mt-8 text-[11px] text-steel/60">
            Distributed by Core Entrade India Pvt. Ltd.
          </p>
        </aside>
      </div>
    </div>
  );
}
