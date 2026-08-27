"use client";
import { motion } from "framer-motion";
import { imageReveal } from "@/lib/motion";

interface Props {
  src: string;
  alt: string;
}

export default function ProductImageReveal({ src, alt }: Props) {
  return (
    <motion.div
      className="bg-mist aspect-square lg:aspect-[4/5] overflow-hidden"
      variants={imageReveal}
      initial="hidden"
      animate="visible"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={1200}
        height={1200}
        className="h-full w-full object-contain p-10 md:p-16"
        loading="eager"
        fetchPriority="high"
      />
    </motion.div>
  );
}
