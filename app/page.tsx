import HeroSection from "@/components/landing/hero-section"
import FeaturesSection from "@/components/landing/features-section"
import TestimonialsSection from "@/components/landing/testimonials-section"
import TemplateShowcase from "@/components/landing/template-showcase"
import CTASection from "@/components/landing/cta-section"
import FAQSection from "@/components/landing/faq-section"

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <HeroSection />
      <FeaturesSection />
      <TemplateShowcase />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}

