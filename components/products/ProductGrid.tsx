"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gridReflow } from "@/lib/motion";
import ProductCard from "./ProductCard";
import type { PublicProduct } from "@/data/catalog";

const FINISH_SWATCH: Record<string, string> = {
  Gold: "bg-finish-gold",
  "Rose Gold": "bg-finish-rosegold",
  Chrome: "bg-finish-chrome",
};

const ELITE_FINISHES = ["Gold", "Rose Gold", "Chrome"] as const;

interface Props {
  products: PublicProduct[];
  seriesNames: Record<string, string>;
  /** Pass the full series list to show the series filter bar */
  seriesList?: { slug: string; name: string }[];
  /** Pre-select a series and hide the series filter (for series pages) */
  fixedSeries?: string;
}

const pill = (active: boolean) =>
  `inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1 ${
    active
      ? "bg-navy text-porcelain"
      : "border border-chrome bg-porcelain text-steel hover:border-navy/40 hover:text-navy"
  }`;

export default function ProductGrid({
  products,
  seriesNames,
  seriesList,
  fixedSeries,
}: Props) {
  const [selectedSeries, setSelectedSeries] = useState<string>(
    fixedSeries ?? "all"
  );
  const [selectedFinish, setSelectedFinish] = useState<string>("all");

  const showSeriesFilter = !fixedSeries && !!seriesList;
  const showFinishFilter =
    selectedSeries === "elite" || fixedSeries === "elite";

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (selectedSeries !== "all" && p.series !== selectedSeries)
          return false;
        if (selectedFinish !== "all" && p.finish !== selectedFinish)
          return false;
        return true;
      }),
    [products, selectedSeries, selectedFinish]
  );

  const handleSeriesChange = (slug: string) => {
    setSelectedSeries(slug);
    setSelectedFinish("all");
  };

  return (
    <div>
      {/* ── Series filter ─────────────────────────────────── */}
      {showSeriesFilter && (
        <div
          className="flex flex-wrap gap-2 mb-6"
          role="group"
          aria-label="Filter by series"
        >
          <button
            className={pill(selectedSeries === "all")}
            aria-pressed={selectedSeries === "all"}
            onClick={() => handleSeriesChange("all")}
          >
            All
            <span className="text-xs opacity-60">({products.length})</span>
          </button>
          {seriesList!.map((s) => {
            const count = products.filter((p) => p.series === s.slug).length;
            return (
              <button
                key={s.slug}
                className={pill(selectedSeries === s.slug)}
                aria-pressed={selectedSeries === s.slug}
                onClick={() => handleSeriesChange(s.slug)}
              >
                {s.name}
                <span className="text-xs opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Elite finish filter ───────────────────────────── */}
      <AnimatePresence>
        {showFinishFilter && (
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            role="group"
            aria-label="Filter by finish"
          >
            <button
              className={pill(selectedFinish === "all")}
              aria-pressed={selectedFinish === "all"}
              onClick={() => setSelectedFinish("all")}
            >
              All finishes
            </button>
            {ELITE_FINISHES.map((finish) => (
              <button
                key={finish}
                className={pill(selectedFinish === finish)}
                aria-pressed={selectedFinish === finish}
                onClick={() => setSelectedFinish(finish)}
              >
                <span
                  className={`h-2 w-2 rounded-full flex-shrink-0 ${FINISH_SWATCH[finish]}`}
                  aria-hidden="true"
                />
                {finish}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Result count ─────────────────────────────────── */}
      <p className="mb-8 text-xs text-steel" aria-live="polite" aria-atomic="true">
        {filtered.length === products.length
          ? `${products.length} products`
          : `${filtered.length} of ${products.length} products`}
      </p>

      {/* ── Grid ─────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((product) => (
            <motion.div
              key={product.slug}
              layout
              transition={gridReflow}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                transition: { duration: 0.12 },
              }}
            >
              <ProductCard
                product={product}
                seriesName={seriesNames[product.series]}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-steel">
          No products match the selected filters.
        </p>
      )}
    </div>
  );
}
