import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import HowItWorks from "@/components/how-it-works"
import TemplatesShowcase from "@/components/templates-showcase"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/pricing"
import Faq from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <TemplatesShowcase />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}

