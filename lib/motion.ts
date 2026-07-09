import type { Variants, Transition } from "framer-motion";

// Shared cubic-bezier — crisp deceleration
const ease = [0.22, 1, 0.36, 1] as const;

// Hero headline container — stagger lines 80ms apart
export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Hero headline individual line — pairs with heroStagger
export const heroLine: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease, duration: 0.7 },
  },
};

// Hero image — gentle scale in over 1.2s
export const heroImageScale: Variants = {
  hidden: { scale: 1.05, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { ease, duration: 1.2 },
  },
};

// Scroll-reveal — sections fade + rise 24px, use with whileInView + once:true
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease, duration: 0.6 },
  },
};

// Product grid container — stagger children 60ms on first reveal
export const gridStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

// Individual grid item — pairs with gridStagger
export const gridItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease, duration: 0.5 },
  },
};

// Chrome hairline draw — scaleX 0→1 from left origin
// Apply transformOrigin: "left" on the element
export const hairlineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { ease, duration: 0.35 },
  },
};

// Grid reflow — use as layout transition on motion.div with layout prop
// Smooth filter animation for Elite finish chips (0.4s)
export const gridReflow: Transition = {
  type: "spring",
  stiffness: 350,
  damping: 35,
  duration: 0.4,
};

// Page fade — 0.3s cross-dissolve for template.tsx transitions
export const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
