import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="bg-gradient-to-r from-[#FF2D55] to-[#FFD700] rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pronto para criar seu cartão de Páscoa?</h2>
            <p className="text-white/90 text-lg mb-8">
              Crie um cartão personalizado em minutos e compartilhe com seus amigos e familiares. Designs modernos e
              criativos por apenas R$4,99.
            </p>
            <Link href="/editor">
              <Button size="lg" className="bg-white text-[#FF2D55] hover:bg-white/90">
                Criar meu cartão agora
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

