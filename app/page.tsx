import { categories } from "@/data/catalog";
import Hero from "@/components/home/Hero";
import SeriesBand from "@/components/home/SeriesBand";
import StoryTeaser from "@/components/home/StoryTeaser";
import InquiryCTA from "@/components/home/InquiryCTA";
import FocusTransition from "@/components/motion/FocusTransition";

export default function Home() {
  return (
    <>
      {/* ① Hero - full-screen, dark, animated */}
      <FocusTransition hero={<Hero />} headerSelector="[data-site-header]">
        <SeriesBand categoryList={categories} scene />
      </FocusTransition>

      {/* ④ Story teaser */}
      <StoryTeaser />

      {/* ⑤ Inquiry CTA */}
      <InquiryCTA />
    </>
  );
}
