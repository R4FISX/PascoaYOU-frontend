import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, CreditCard, Landmark, QrCode, Receipt, Shield, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Preços | PáscInterativa",
  description: "Conheça nossos planos e preços para criar cartões de Páscoa interativos personalizados.",
}

export default function PrecosPage() {
  const individualFeatures = [
    "Acesso a todos os templates",
    "Personalização completa",
    "Adicione fotos e músicas",
    "Compartilhamento ilimitado",
    "Suporte por email",
    "Disponível por 1 ano",
  ]

  const businessFeatures = [
    "Tudo do plano individual",
    "Personalização com logo da empresa",
    "Relatórios de visualização",
    "Envio em lote",
    "Suporte prioritário",
    "Disponível por 2 anos",
  ]

  const enterpriseFeatures = [
    "Tudo do plano empresarial",
    "Templates exclusivos",
    "Personalização completa da marca",
    "API para integração",
    "Gerente de conta dedicado",
    "Disponível por 3 anos",
  ]

  const paymentMethods = [
    {
      icon: <CreditCard className="h-10 w-10 text-purple-600" />,
      title: "Cartão de Crédito",
      description: "Aceitamos todas as bandeiras principais. Parcelamento em até 3x sem juros.",
    },
    {
      icon: <QrCode className="h-10 w-10 text-purple-600" />,
      title: "PIX",
      description: "Pagamento instantâneo com aprovação imediata.",
    },
    {
      icon: <Receipt className="h-10 w-10 text-purple-600" />,
      title: "Boleto Bancário",
      description: "Prazo de compensação de até 3 dias úteis.",
    },
    {
      icon: <Landmark className="h-10 w-10 text-purple-600" />,
      title: "Transferência Bancária",
      description: "Ideal para empresas. Faturamento para 30 dias.",
    },
  ]

  const faqItems = [
    {
      question: "Existe alguma taxa oculta?",
      answer:
        "Não, nossos preços são transparentes. Você paga apenas o valor indicado por cartão enviado, sem taxas adicionais ou cobranças recorrentes.",
    },
    {
      question: "Posso cancelar um pagamento?",
      answer:
        "Você pode cancelar um cartão antes de finalizá-lo e enviá-lo. Após o envio, não é possível solicitar reembolso, exceto em casos de problemas técnicos.",
    },
    {
      question: "Como funciona o plano empresarial?",
      answer:
        "O plano empresarial é ideal para empresas que desejam enviar cartões em grande quantidade. Oferecemos descontos progressivos baseados no volume, além de recursos exclusivos como relatórios de visualização e personalização com a marca da empresa.",
    },
    {
      question: "Preciso pagar novamente para editar um cartão?",
      answer:
        "Você pode editar seu cartão quantas vezes quiser antes de finalizar o pagamento e enviá-lo. Após o envio, será necessário criar um novo cartão caso deseje fazer alterações.",
    },
    {
      question: "Existe algum desconto para volume?",
      answer:
        "Sim! Oferecemos descontos progressivos para envios em grande quantidade. Para 10-50 cartões, oferecemos 10% de desconto. Para 51-100 cartões, 15% de desconto. Para mais de 100 cartões, entre em contato para um orçamento personalizado.",
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <section className="bg-purple-700 py-16 text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Preços Simples e Transparentes
              </h1>
              <p className="mb-8 text-lg text-purple-100">
                Escolha o plano ideal para suas necessidades e comece a criar cartões incríveis
              </p>
              <div className="inline-flex rounded-md bg-purple-800 p-1">
                <Tabs defaultValue="individual" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-transparent">
                    <TabsTrigger
                      value="individual"
                      className="data-[state=active]:bg-white data-[state=active]:text-purple-900"
                    >
                      Individual
                    </TabsTrigger>
                    <TabsTrigger
                      value="business"
                      className="data-[state=active]:bg-white data-[state=active]:text-purple-900"
                    >
                      Empresarial
                    </TabsTrigger>
                    <TabsTrigger
                      value="enterprise"
                      className="data-[state=active]:bg-white data-[state=active]:text-purple-900"
                    >
                      Corporativo
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="individual" className="w-full">
              <TabsContent value="individual" className="mt-0">
                <div className="mx-auto max-w-5xl">
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-purple-100 md:col-span-2">
                      <CardHeader>
                        <CardTitle>Plano Individual</CardTitle>
                        <CardDescription>Perfeito para uso pessoal e pequenas quantidades</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <span className="text-4xl font-bold">R$4,99</span>
                          <span className="text-sm text-gray-500"> por cartão</span>
                        </div>
                        <ul className="grid gap-2">
                          {individualFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="h-5 w-5 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Começar Agora</Button>
                      </CardFooter>
                    </Card>

                    <Card className="border-purple-100 bg-purple-50">
                      <CardHeader>
                        <CardTitle>Descontos por Volume</CardTitle>
                        <CardDescription>Economize ao enviar múltiplos cartões</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="rounded-lg border border-purple-100 bg-white p-4">
                          <div className="mb-1 font-medium">10-50 cartões</div>
                          <div className="text-sm text-gray-500">10% de desconto</div>
                          <div className="mt-2 text-lg font-bold text-purple-700">R$4,49 por cartão</div>
                        </div>
                        <div className="rounded-lg border border-purple-100 bg-white p-4">
                          <div className="mb-1 font-medium">51-100 cartões</div>
                          <div className="text-sm text-gray-500">15% de desconto</div>
                          <div className="mt-2 text-lg font-bold text-purple-700">R$4,24 por cartão</div>
                        </div>
                        <div className="rounded-lg border border-purple-100 bg-white p-4">
                          <div className="mb-1 font-medium">+100 cartões</div>
                          <div className="text-sm text-gray-500">Desconto personalizado</div>
                          <div className="mt-2 text-lg font-bold text-purple-700">Consulte-nos</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="business" className="mt-0">
                <div className="mx-auto max-w-5xl">
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-purple-100 md:col-span-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1"></div>
                      <CardHeader>
                        <CardTitle>Plano Empresarial</CardTitle>
                        <CardDescription>Ideal para pequenas e médias empresas</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <span className="text-4xl font-bold">R$3,99</span>
                          <span className="text-sm text-gray-500"> por cartão</span>
                        </div>
                        <ul className="grid gap-2">
                          {businessFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="h-5 w-5 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                          Falar com Consultor
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="border-purple-100 bg-purple-50">
                      <CardHeader>
                        <CardTitle>Descontos por Volume</CardTitle>
                        <CardDescription>Economize ao enviar múltiplos cartões</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="rounded-lg border border-purple-100 bg-white p-4">
                          <div className="mb-1 font-medium">100-500 cartões</div>
                          <div className="text-sm text-gray-500">15% de desconto</div>
                          <div className="mt-2 text-lg font-bold text-purple-700">R$3,39 por cartão</div>
                        </div>
                        <div className="rounded-lg border border-purple-100 bg-white p-4">
                          <div className="mb-1 font-medium">501-1000 cartões</div>
                          <div className="text-sm text-gray-500">20% de desconto</div>
                          <div className="mt-2 text-lg font-bold text-purple-700">R$3,19 por cartão</div>
                        </div>
                        <div className="rounded-lg border border-purple-100 bg-white p-4">
                          <div className="mb-1 font-medium">+1000 cartões</div>
                          <div className="text-sm text-gray-500">Desconto personalizado</div>
                          <div className="mt-2 text-lg font-bold text-purple-700">Consulte-nos</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="enterprise" className="mt-0">
                <div className="mx-auto max-w-5xl">
                  <Card className="border-purple-100">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-1"></div>
                    <CardHeader className="text-center">
                      <CardTitle>Plano Corporativo</CardTitle>
                      <CardDescription>
                        Solução completa para grandes empresas com necessidades específicas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="mb-6 text-center">
                        <span className="text-4xl font-bold">Personalizado</span>
                        <p className="mt-2 text-gray-500">
                          Preços customizados de acordo com suas necessidades específicas
                        </p>
                      </div>
                      <div className="grid max-w-3xl gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="mb-3 text-lg font-medium">Recursos Incluídos</h3>
                          <ul className="grid gap-2">
                            {enterpriseFeatures.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-green-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="mb-3 text-lg font-medium">Benefícios Exclusivos</h3>
                          <ul className="grid gap-2">
                            <li className="flex items-center gap-2">
                              <Star className="h-5 w-5 text-yellow-500" />
                              <span>Desenvolvimento de templates exclusivos</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Star className="h-5 w-5 text-yellow-500" />
                              <span>Integração com sistemas internos</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Star className="h-5 w-5 text-yellow-500" />
                              <span>Treinamento para equipe</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Star className="h-5 w-5 text-yellow-500" />
                              <span>Suporte 24/7</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button className="bg-purple-600 px-8 text-white hover:bg-purple-700">Solicitar Orçamento</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-purple-900">Formas de Pagamento</h2>
              <p className="mb-8 text-gray-500">Oferecemos diversas opções de pagamento para sua conveniência</p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
              {paymentMethods.map((method, index) => (
                <Card key={index} className="border-purple-100">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4">{method.icon}</div>
                    <h3 className="mb-2 font-medium">{method.title}</h3>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mx-auto mt-8 flex max-w-5xl items-center justify-center rounded-lg border border-purple-100 bg-purple-50 p-4">
              <Shield className="mr-3 h-6 w-6 text-purple-600" />
              <p className="text-sm text-gray-600">
                Todas as transações são processadas com segurança através de gateways de pagamento certificados e
                criptografados.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-3xl font-bold text-purple-900">
                Perguntas Frequentes sobre Pagamentos
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-medium">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 rounded-lg border border-purple-100 bg-purple-50 p-6 text-center">
                <h3 className="mb-2 text-lg font-medium text-purple-900">Ainda tem dúvidas?</h3>
                <p className="mb-4 text-gray-600">
                  Nossa equipe está pronta para ajudar com qualquer questão relacionada a pagamentos e preços.
                </p>
                <Button className="bg-purple-600 text-white hover:bg-purple-700">Falar com Suporte</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

