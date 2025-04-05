import { CheckCircle2, Edit, Send, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorks() {
  const steps = [
    {
      icon: <CheckCircle2 className="h-10 w-10 text-purple-600" />,
      title: "Escolha seu Template",
      description: "Navegue pela galeria temática e selecione o design que mais combina com sua mensagem.",
    },
    {
      icon: <Edit className="h-10 w-10 text-purple-600" />,
      title: "Personalize",
      description: "Edite textos, ajuste cores e insira pequenos ícones para deixar seu cartão com a sua cara.",
    },
    {
      icon: <Send className="h-10 w-10 text-purple-600" />,
      title: "Finalize e Pague (Opcional)",
      description:
        "Pré-visualize seu cartão e, se optar por recursos premium, efetue um micropagamento para liberar a versão final sem marca d'água.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-purple-600" />,
      title: "Compartilhe",
      description:
        "Gere um link único e compartilhe seu cartão com amigos e familiares via redes sociais, e-mail ou mensagem.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl md:text-5xl">
              Como Funciona
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Criar seu cartão de Páscoa personalizado é simples e rápido. Siga estes passos:
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-purple-100 transition-all duration-300 hover:shadow-md"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <CardHeader className="relative pb-0">
                <div className="mb-2">{step.icon}</div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-900">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative pt-4">
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

