import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Image, Share2, Sparkles } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Palette className="h-10 w-10 text-[#FF2D55]" />,
      title: "Templates Exclusivos",
      description:
        "Escolha entre diversos designs modernos e criativos, perfeitos para compartilhar no TikTok e Instagram.",
    },
    {
      icon: <Image className="h-10 w-10 text-[#4FD1C5]" />,
      title: "Personalização Total",
      description: "Adicione sua foto, mensagem personalizada e ajuste o design para criar um cartão único.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-[#FFD700]" />,
      title: "Compartilhamento Fácil",
      description: "Compartilhe seu cartão diretamente no TikTok, Instagram, WhatsApp e outras redes sociais.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-[#6EE7B7]" />,
      title: "Preço Único",
      description: "Apenas R$4,99 por cartão, sem taxas adicionais ou assinaturas.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Como funciona</h2>
          <p className="text-muted-foreground">
            Criar um cartão de Páscoa personalizado nunca foi tão fácil e divertido. Siga estes passos simples e
            impressione seus amigos e familiares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-2 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#FF2D55] flex items-center justify-center text-white font-bold">
              1
            </div>
            <div className="w-16 h-1 bg-gray-200"></div>
            <div className="w-12 h-12 rounded-full bg-[#4FD1C5] flex items-center justify-center text-white font-bold">
              2
            </div>
            <div className="w-16 h-1 bg-gray-200"></div>
            <div className="w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center text-white font-bold">
              3
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Escolha um template</h3>
              <p className="text-muted-foreground">Selecione entre diversos designs modernos e criativos.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Personalize</h3>
              <p className="text-muted-foreground">Adicione sua foto, mensagem e ajuste o design.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Compartilhe</h3>
              <p className="text-muted-foreground">Pague R$4,99 e compartilhe seu cartão nas redes sociais.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

