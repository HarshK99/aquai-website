import { categories } from "@/data/catalog";
import Hero from "@/components/home/Hero";
import SeriesBand from "@/components/home/SeriesBand";
import StoryTeaser from "@/components/home/StoryTeaser";
import InquiryCTA from "@/components/home/InquiryCTA";

export default function Home() {
  return (
    <>
      {/* ① Hero - full-screen, dark, animated */}
      <Hero />

      {/* ② Category band */}
      <SeriesBand categoryList={categories} />

      {/* ④ Story teaser */}
      <StoryTeaser />

      {/* ⑤ Inquiry CTA */}
      <InquiryCTA />
    </>
  );
}
