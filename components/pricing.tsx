import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export default function Pricing() {
  const freePlan = {
    features: [
      { name: "Acesso a templates básicos", included: true },
      { name: "Personalização de texto", included: true },
      { name: "Compartilhamento via link", included: true },
      { name: "Marca d'água PascoaYou", included: true },
      { name: "Suporte por email", included: true },
      { name: "Templates premium", included: false },
      { name: "Remoção de marca d'água", included: false },
      { name: "Download em alta resolução", included: false },
    ],
  }

  const premiumPlan = {
    features: [
      { name: "Acesso a templates básicos", included: true },
      { name: "Personalização de texto", included: true },
      { name: "Compartilhamento via link", included: true },
      { name: "Marca d'água PascoaYou", included: false },
      { name: "Suporte por email", included: true },
      { name: "Templates premium", included: true },
      { name: "Remoção de marca d'água", included: true },
      { name: "Download em alta resolução", included: true },
    ],
  }

  return (
    <section id="pricing" className="bg-purple-50 py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl md:text-5xl">
              Modelo Freemium Simples
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Comece gratuitamente e desbloqueie recursos premium quando precisar
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle>Plano Gratuito</CardTitle>
              <CardDescription>Perfeito para experimentar a plataforma</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">R$0</span>
                <span className="text-sm text-gray-500"> para sempre</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3">
                {freePlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300" />
                    )}
                    <span className={feature.included ? "" : "text-gray-400"}>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Começar Grátis</Button>
            </CardFooter>
          </Card>

          <Card className="border-purple-100">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1"></div>
            <CardHeader>
              <CardTitle>Recursos Premium</CardTitle>
              <CardDescription>Desbloqueie recursos avançados por cartão</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">R$4,99</span>
                <span className="text-sm text-gray-500"> por cartão</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3">
                {premiumPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300" />
                    )}
                    <span className={feature.included ? "" : "text-gray-400"}>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-yellow-500 text-purple-900 hover:bg-yellow-400">Desbloquear Premium</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Aceitamos cartões de crédito, débito, PIX e boleto bancário.</p>
          <p className="mt-2">Não há assinaturas ou cobranças recorrentes. Pague apenas pelo que usar.</p>
        </div>
      </div>
    </section>
  )
}

