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
  /** Pass to show a category filter bar (all-products page) */
  categoryList?: { slug: string; name: string }[];
  /** Pass to show a series filter bar within a category page */
  seriesList?: { slug: string; name: string }[];
  /** Pre-select a series and hide the series filter (for series pages) */
  fixedSeries?: string;
}

const pill = (active: boolean) =>
  `inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1 ${
    active
      ? "bg-navy text-porcelain"
      : "border border-chrome bg-porcelain text-steel hover:border-navy/40 hover:text-navy"
  }`;

export default function ProductGrid({
  products,
  seriesNames,
  categoryList,
  seriesList,
  fixedSeries,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeries, setSelectedSeries] = useState<string>(
    fixedSeries ?? "all"
  );
  const [selectedFinish, setSelectedFinish] = useState<string>("all");

  const showCategoryFilter = !!categoryList;
  const showSeriesFilter = !fixedSeries && !!seriesList;
  const showFinishFilter =
    selectedSeries === "elite" || fixedSeries === "elite";

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (selectedCategory !== "all") {
          const catName = categoryList?.find(c => c.slug === selectedCategory)?.name;
          if (catName && p.category !== catName) return false;
        }
        if (selectedSeries !== "all" && p.series !== selectedSeries)
          return false;
        if (selectedFinish !== "all" && p.finish !== selectedFinish)
          return false;
        return true;
      }),
    [products, selectedCategory, selectedSeries, selectedFinish, categoryList]
  );

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedSeries("all");
    setSelectedFinish("all");
  };

  const handleSeriesChange = (slug: string) => {
    setSelectedSeries(slug);
    setSelectedFinish("all");
  };

  return (
    <div>
      {/* ── Sticky filter bar ────────────────────────────── */}
      {(showCategoryFilter || showSeriesFilter || showFinishFilter) && (
        <div className="sticky top-[var(--header-height)] z-10 bg-mist/95 backdrop-blur-sm border-b border-chrome/40 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 py-3 mb-4 md:mb-6">
          {showCategoryFilter && (
            <label className="block md:hidden text-xs font-medium text-steel">
              Category
              <select
                aria-label="Category"
                className="mt-2 min-h-11 w-full min-w-0 rounded-sm border border-chrome bg-porcelain px-3 py-2 text-base text-navy"
                value={selectedCategory}
                onChange={(event) => handleCategoryChange(event.target.value)}
              >
                <option value="all">All categories ({products.length})</option>
                {categoryList!.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name} ({products.filter((product) => product.category === category.name).length})
                  </option>
                ))}
              </select>
            </label>
          )}
          {showSeriesFilter && (
            <label className="block md:hidden text-xs font-medium text-steel">
              Series
              <select
                aria-label="Series"
                className="mt-2 min-h-11 w-full min-w-0 rounded-sm border border-chrome bg-porcelain px-3 py-2 text-base text-navy"
                value={selectedSeries}
                onChange={(event) => handleSeriesChange(event.target.value)}
              >
                <option value="all">All series ({products.length})</option>
                {seriesList!.map((series) => (
                  <option key={series.slug} value={series.slug}>
                    {series.name} ({products.filter((product) => product.series === series.slug).length})
                  </option>
                ))}
              </select>
            </label>
          )}
          {/* Category filter */}
          {showCategoryFilter && (
            <div
              className="hidden md:flex gap-2 overflow-x-auto"
              role="group"
              aria-label="Filter by category"
            >
              <button
                className={pill(selectedCategory === "all")}
                aria-pressed={selectedCategory === "all"}
                onClick={() => handleCategoryChange("all")}
              >
                All
                <span className="text-xs opacity-60">({products.length})</span>
              </button>
              {categoryList!.map((cat) => {
                const count = products.filter((p) => p.category === cat.name).length;
                return (
                  <button
                    key={cat.slug}
                    className={pill(selectedCategory === cat.slug)}
                    aria-pressed={selectedCategory === cat.slug}
                    onClick={() => handleCategoryChange(cat.slug)}
                  >
                    {cat.name}
                    <span className="text-xs opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Series filter */}
          {showSeriesFilter && (
            <div
              className={`hidden md:flex gap-2 overflow-x-auto ${showCategoryFilter ? "mt-2" : ""}`}
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

          {/* Elite finish filter */}
          <AnimatePresence>
            {showFinishFilter && (
              <motion.div
                className="flex flex-wrap gap-2 mt-2"
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
        </div>
      )}

      {/* ── Result count ─────────────────────────────────── */}
      <p className="mb-5 md:mb-8 text-xs text-steel" aria-live="polite" aria-atomic="true">
        {filtered.length === products.length
          ? `${products.length} products`
          : `${filtered.length} of ${products.length} products`}
      </p>

      {/* ── Grid ─────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((product, i) => (
            <motion.div
              className="min-w-0"
              key={product.slug}
              layout
              custom={i}
              transition={gridReflow}
              initial={{ opacity: 0, y: 16 }}
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              variants={{
                visible: (i: number) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: Math.min(i * 0.05, 0.3),
                  },
                }),
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
