import { SuiteHero } from "@/components/hero/suite-hero";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { AboutSection } from "@/components/sections/about";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/layout/footer";
import { OntologyExplainer } from "@/components/sections/ontology-explainer";

export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth">
      <SuiteHero />
      <OntologyExplainer />
      <ProductShowcase />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
}
