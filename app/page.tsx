import { series, getProductsBySeries } from "@/data/catalog";
import Hero from "@/components/home/Hero";
import SeriesBand from "@/components/home/SeriesBand";
import StoryTeaser from "@/components/home/StoryTeaser";
import InquiryCTA from "@/components/home/InquiryCTA";

export default function Home() {
  // Use the first product image from each series as its card cover
  const seriesWithCovers = series.map((s) => {
    const firstProduct = getProductsBySeries(s.slug)[0];
    return { ...s, image: firstProduct?.image ?? s.image };
  });

  return (
    <>
      {/* ① Hero — full-screen, dark, animated */}
      <Hero />

      {/* ② Series band */}
      <SeriesBand seriesList={seriesWithCovers} />

      {/* ④ Story teaser */}
      <StoryTeaser />

      {/* ⑤ Inquiry CTA */}
      <InquiryCTA />
    </>
  );
}
