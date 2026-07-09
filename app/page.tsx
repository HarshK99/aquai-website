import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export default function Home() {
  return (
    <>
      {/* Hero placeholder — Phase 2 will replace this */}
      <div className="min-h-screen bg-navy-deep flex items-center justify-center pt-20">
        <Container>
          <div className="text-center py-32">
            <p className="font-body text-xs uppercase tracking-[0.14em] text-porcelain/50 mb-6">
              Premium Bath Accessories &amp; SS304 Sinks
            </p>
            <h1 className="font-display text-hero text-porcelain">Aquai</h1>
          </div>
        </Container>
      </div>

      {/* Content placeholder */}
      <Section mist>
        <Container>
          <p className="font-body text-xs uppercase tracking-[0.14em] text-steel mb-4">
            Coming in Phase 2
          </p>
          <h2 className="font-display text-h2 text-navy">
            Five series. 44 products.
          </h2>
        </Container>
      </Section>
    </>
  );
}
