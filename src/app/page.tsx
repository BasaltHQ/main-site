import { SuiteHero } from "@/components/hero/suite-hero";
import { SuiteProducts } from "@/components/sections/suite-products";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { AboutSection } from "@/components/sections/about";
import { CTASection } from "@/components/sections/cta-section";
import { NeuromimeticSlideshow } from "@/components/sections/neuromimetic-slideshow";
import { OntologyExplainer } from "@/components/sections/ontology-explainer";

export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth">
      <SuiteHero />
      <NeuromimeticSlideshow />
      <OntologyExplainer />
      <ProductShowcase />
      <SuiteProducts />
      <AboutSection />
      <CTASection />
    </div>
  );
}
