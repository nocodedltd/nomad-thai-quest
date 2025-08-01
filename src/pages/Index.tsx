import { HeroSection } from "@/components/landing/hero-section";
import { LearningPaths } from "@/components/landing/learning-paths";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LearningPaths />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default Index;
