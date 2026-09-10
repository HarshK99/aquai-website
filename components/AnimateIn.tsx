"use client";
import { motion } from "framer-motion";
import { fadeRise } from "@/lib/motion";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  disabled?: boolean;
}

export default function AnimateIn({ children, className, delay = 0, disabled = false }: Props) {
  if (disabled) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6, delay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
