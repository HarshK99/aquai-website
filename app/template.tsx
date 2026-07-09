"use client";
import { motion } from "framer-motion";
import { pageFade } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageFade} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}
