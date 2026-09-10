"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FocusTransition.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  hero: ReactNode;
  children: ReactNode;
  /** Optional fixed navigation that follows the outgoing scene. */
  headerSelector?: string;
}

export default function FocusTransition({ hero, children, headerSelector }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const defocusRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const outgoing = heroRef.current!;
    const incoming = nextRef.current!;
    const defocus = defocusRef.current!;
    const header = headerSelector ? document.querySelector<HTMLElement>(headerSelector) : null;
    const media = gsap.matchMedia();

    media.add({ motion: "(prefers-reduced-motion: no-preference)", mobile: "(max-width: 767px)", tall: "(min-height: 560px)" }, (context) => {
      if (!context.conditions?.motion || !context.conditions.tall) return;
      const mobile = context.conditions.mobile;
      root.dataset.focusActive = "true";
      const distance = () => window.innerHeight * (mobile ? 1.9 : 2.4);
      const scene = header ? [outgoing, header] : [outgoing];
      const syncAccess = (progress: number) => {
        outgoing.inert = progress >= 0.6;
        incoming.inert = progress < 0.94;
        if (header) header.inert = progress > 0.6 && progress < 0.96;
        const phase = progress < 0.84 ? "hero" : "collections";
        if (root.dataset.focusPhase !== phase) root.dataset.focusPhase = phase;
      };

      gsap.set(incoming, { scale: 1.055, y: 32, filter: `blur(${mobile ? 8 : 12}px) contrast(0.8)`, transformOrigin: "50% 25%" });
      gsap.set(scene, { transformOrigin: "50% 45%", transformPerspective: 1400, force3D: true });
      gsap.set(defocus, { "--focus-front": "125%" });
      if (header) gsap.set(header, { filter: "blur(0px) contrast(1)" });
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "hero-focus", trigger: root, start: "top top", end: () => `+=${distance()}`,
          pin: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => syncAccess(self.progress),
          onRefresh: (self) => syncAccess(self.progress),
        },
      });

      // A soft mask carries defocus and shadow upward; the uncovered hero stays sharp.
      timeline.to(scene, { scale: 1.008, y: -2, duration: 0.2 }, 0)
        .to(scene, { scale: 1.075, z: -24, y: -12, duration: 0.42 }, 0.2)
        .to(defocus, { "--focus-front": "-25%", duration: 0.58 }, 0.1)
        .to(scene, { autoAlpha: 0, duration: 0.24 }, 0.6)
        .to(incoming, { scale: 1, y: 0, filter: "blur(0px) contrast(1)", duration: 0.3, ease: "sine.inOut" }, 0.64)
        .set(incoming, { clearProps: "filter,transform,transformOrigin" }, 0.95)
        .to({}, { duration: 0.05 }, 0.95);

      if (header) {
        timeline.to(header, { filter: "blur(8px) contrast(0.85)", duration: 0.12 }, 0.6)
          .set(header, { scale: 1, y: 0, z: 0, filter: "blur(4px) contrast(1)" }, 0.85)
          .to(header, { autoAlpha: 1, filter: "blur(0px) contrast(1)", duration: 0.1 }, 0.86)
          .set(header, { clearProps: "filter,transform,transformOrigin" }, 0.97);
      }
      syncAccess(timeline.scrollTrigger?.progress ?? 0);
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      let disposed = false;
      document.fonts.ready.then(() => { if (!disposed) refresh(); });
      return () => {
        disposed = true;
        window.removeEventListener("load", refresh);
        delete root.dataset.focusActive;
        delete root.dataset.focusPhase;
        outgoing.inert = false;
        incoming.inert = false;
        if (header) header.inert = false;
      };
    });
    return () => media.revert();
  }, [headerSelector]);

  return (
    <div ref={rootRef} className={styles.root} data-focus-transition>
      <div ref={heroRef} className={styles.hero}>
        {hero}
        <div ref={defocusRef} className={styles.defocus} aria-hidden="true" />
      </div>
      <div ref={nextRef} className={styles.next}>{children}</div>
    </div>
  );
}
