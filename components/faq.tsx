"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default function Faq() {
  const faqItems = [
    {
      question: "Como funciona o modelo freemium?",
      answer:
        "Você pode criar e compartilhar cartões básicos gratuitamente. Para acessar templates premium, remover a marca d'água e baixar em alta resolução, você pode fazer um micropagamento único de R$4,99 por cartão, sem assinaturas ou taxas ocultas.",
    },
    {
      question: "Preciso ter conhecimentos de design?",
      answer:
        "Não! Nossa plataforma foi desenvolvida para ser intuitiva e fácil de usar. Você escolhe um template, personaliza com suas mensagens e elementos, e pronto! Não é necessário nenhum conhecimento de design ou programação.",
    },
    {
      question: "Como compartilho meu cartão?",
      answer:
        "Após finalizar seu cartão, você receberá um link único que pode ser compartilhado por WhatsApp, e-mail, SMS ou redes sociais. Quem receber o link poderá acessar o cartão interativo em qualquer dispositivo com acesso à internet.",
    },
    {
      question: "Por quanto tempo o cartão fica disponível?",
      answer:
        "Seus cartões ficam disponíveis por 1 ano a partir da data de criação. Você pode acessar todos os seus cartões criados na sua conta a qualquer momento durante este período.",
    },
    {
      question: "Posso usar o PascoaYou em dispositivos móveis?",
      answer:
        "Sim! O PascoaYou é totalmente responsivo e funciona em qualquer dispositivo: computadores, tablets e smartphones. Você pode criar e enviar cartões de onde estiver.",
    },
  ]

  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl md:text-5xl">
              Perguntas Frequentes
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Encontre respostas para as dúvidas mais comuns sobre o PascoaYou
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          <p className="text-center text-gray-500">
            Não encontrou o que procurava? Entre em contato com nosso suporte.
          </p>
          <Button className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700">
            <MessageCircle className="h-4 w-4" />
            Falar com Suporte
          </Button>
        </div>
      </div>
    </section>
  )
}

