import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-[#FFF5F7] to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#FFD700]/20 blur-3xl"></div>
        <div className="absolute top-1/3 -right-10 w-60 h-60 rounded-full bg-[#FF2D55]/10 blur-3xl"></div>
        <div className="absolute -bottom-10 left-1/4 w-40 h-40 rounded-full bg-[#4FD1C5]/10 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FF2D55]/10 text-[#FF2D55] text-sm font-medium mb-6">
            <Sparkles size={16} className="mr-2" />
            <span>Novidade para Páscoa 2023</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Cartões de Páscoa que vão{" "}
            <span className="bg-gradient-to-r from-[#FF2D55] to-[#FFD700] text-transparent bg-clip-text">bombar</span>{" "}
            no seu TikTok
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Crie cartões personalizados incríveis em segundos e compartilhe com seus amigos. Designs modernos e
            criativos por apenas R$4,99.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/editor">
              <Button size="lg" className="bg-[#FF2D55] hover:bg-[#FF1A45] text-white">
                Criar meu cartão agora
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline">
                Ver templates
              </Button>
            </Link>
          </div>

          <div className="mt-12 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF2D55] to-[#FFD700] rounded-lg blur-sm"></div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=600&width=1200"
                alt="Exemplo de cartão de Páscoa"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-full shadow-lg p-3 border-2 border-[#FF2D55]">
              <div className="text-[#FF2D55] font-bold">R$4,99</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

