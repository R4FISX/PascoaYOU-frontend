import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSection() {
  const faqs = [
    {
      question: "Quanto custa para criar um cartão?",
      answer:
        "O preço é único: R$4,99 por cartão. Não há taxas adicionais ou assinaturas. Você paga apenas pelo cartão que criar.",
    },
    {
      question: "Como funciona o processo de criação?",
      answer:
        "É muito simples! Você escolhe um template, personaliza com sua mensagem e foto, visualiza o resultado final e, após o pagamento, recebe o cartão pronto para compartilhar nas redes sociais.",
    },
    {
      question: "Posso editar meu cartão depois de pagar?",
      answer:
        "Infelizmente, após a finalização do pagamento, não é possível editar o cartão. Por isso, recomendamos que você revise bem o preview antes de finalizar a compra.",
    },
    {
      question: "Como recebo meu cartão após o pagamento?",
      answer:
        "Após o pagamento, você será redirecionado para uma página onde poderá baixar e compartilhar seu cartão. Além disso, enviaremos um e-mail com o link para acessar seu cartão a qualquer momento.",
    },
    {
      question: "Posso usar o cartão em todas as redes sociais?",
      answer:
        "Sim! Seu cartão é otimizado para compartilhamento em qualquer rede social, incluindo TikTok, Instagram, Facebook, WhatsApp e outras plataformas.",
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer:
        "Aceitamos cartões de crédito e débito das principais bandeiras, além de PIX. O processamento de pagamento é feito de forma segura através do Stripe.",
    },
  ]

  return (
    <section className="py-20 bg-[#FFF5F7]">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-muted-foreground">
            Tire suas dúvidas sobre nosso serviço de cartões de Páscoa personalizados.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-2">Ainda tem dúvidas?</p>
          <a href="mailto:contato@pascoatok.com" className="text-[#FF2D55] font-medium hover:underline">
            Entre em contato conosco
          </a>
        </div>
      </div>
    </section>
  )
}

