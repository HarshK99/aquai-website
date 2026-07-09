"use client";
import { motion } from "framer-motion";
import { gridStagger, gridItem } from "@/lib/motion";
import ProductCard from "@/components/products/ProductCard";
import type { PublicProduct } from "@/data/catalog";

interface Props {
  products: PublicProduct[];
  seriesNames: Record<string, string>;
}

export default function FeaturedProducts({ products, seriesNames }: Props) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      variants={gridStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {products.map((product, i) => (
        <motion.div key={product.slug} variants={gridItem}>
          <ProductCard
            product={product}
            seriesName={seriesNames[product.series]}
            priority={i < 3}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
