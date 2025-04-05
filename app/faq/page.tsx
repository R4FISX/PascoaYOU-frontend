import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "FAQ | PascoaYou",
  description: "Encontre respostas para suas dúvidas sobre a plataforma PascoaYou.",
}

export default function FaqPage() {
  const faqCategories = [
    {
      id: "geral",
      title: "Perguntas Gerais",
      items: [
        {
          question: "O que é o PascoaYou?",
          answer:
            "O PascoaYou é uma plataforma online que permite criar cartões de Páscoa interativos e personalizados para enviar a amigos e familiares. Nossos cartões combinam elementos visuais, animações e interatividade para criar uma experiência única e memorável.",
        },
        {
          question: "Preciso ter conhecimentos técnicos para criar um cartão?",
          answer:
            "Não! Nossa plataforma foi desenvolvida para ser intuitiva e fácil de usar. Você escolhe um template, personaliza com suas mensagens e fotos, e pronto! Não é necessário nenhum conhecimento de design ou programação.",
        },
        {
          question: "Posso acessar a plataforma pelo celular?",
          answer:
            "Sim! O PascoaYou é totalmente responsivo e funciona em qualquer dispositivo: computadores, tablets e smartphones. Você pode criar e enviar cartões de onde estiver.",
        },
        {
          question: "Preciso criar uma conta para usar o serviço?",
          answer:
            "Sim, é necessário criar uma conta gratuita para salvar seus cartões e gerenciar seus envios. O cadastro é rápido e pode ser feito com seu e-mail ou através de sua conta Google ou Facebook.",
        },
      ],
    },
    {
      id: "pagamentos",
      title: "Pagamentos",
      items: [
        {
          question: "Como funciona o modelo freemium?",
          answer:
            "Você pode criar e compartilhar cartões básicos gratuitamente. Para acessar templates premium, remover a marca d'água e baixar em alta resolução, você pode fazer um micropagamento único de R$4,99 por cartão, sem assinaturas ou taxas ocultas.",
        },
        {
          question: "Quais formas de pagamento são aceitas?",
          answer:
            "Aceitamos cartões de crédito e débito de todas as bandeiras, PIX e boleto bancário. Todas as transações são processadas com segurança através de gateways de pagamento certificados e criptografados.",
        },
        {
          question: "Posso solicitar reembolso?",
          answer:
            "Devido à natureza digital do produto, não oferecemos reembolsos após o envio do cartão. No entanto, se ocorrer algum problema técnico que impeça o destinatário de visualizar o cartão, entre em contato com nosso suporte para resolvermos a situação.",
        },
        {
          question: "Existe algum plano para empresas?",
          answer:
            "Sim! Temos planos especiais para empresas que desejam enviar cartões em grande quantidade. Entre em contato com nossa equipe comercial para conhecer as opções e valores.",
        },
      ],
    },
    {
      id: "criacao",
      title: "Criação de Cartões",
      items: [
        {
          question: "Posso adicionar minhas próprias fotos ao cartão?",
          answer:
            "Sim! Você pode fazer upload de suas fotos pessoais para personalizar o cartão. Aceitamos imagens nos formatos JPG, PNG e GIF com tamanho máximo de 10MB.",
        },
        {
          question: "É possível adicionar música ao cartão?",
          answer:
            "Sim! Oferecemos uma biblioteca de músicas temáticas de Páscoa, ou você pode fazer upload de sua própria música (formatos MP3 ou WAV, máximo 5MB).",
        },
        {
          question: "Posso editar um cartão depois de criá-lo?",
          answer:
            "Você pode editar seu cartão quantas vezes quiser antes de finalizar o pagamento e enviá-lo. Após o envio, não é possível fazer alterações.",
        },
        {
          question: "Existe limite de caracteres para as mensagens?",
          answer:
            "Sim, o limite varia de acordo com o template escolhido, mas geralmente é de 500 caracteres para a mensagem principal e 100 caracteres para mensagens secundárias.",
        },
      ],
    },
    {
      id: "envio",
      title: "Envio e Compartilhamento",
      items: [
        {
          question: "Como meu cartão é enviado ao destinatário?",
          answer:
            "Após finalizar seu cartão e efetuar o pagamento (se aplicável), você receberá um link único que pode ser compartilhado por WhatsApp, e-mail, SMS ou redes sociais. O destinatário clica no link para acessar o cartão interativo.",
        },
        {
          question: "Por quanto tempo o cartão fica disponível?",
          answer:
            "Seus cartões ficam disponíveis por 1 ano a partir da data de criação. Você pode acessar todos os seus cartões criados na sua conta a qualquer momento durante este período.",
        },
        {
          question: "Posso enviar o mesmo cartão para várias pessoas?",
          answer:
            "Sim! Você pode compartilhar o link do seu cartão com quantas pessoas quiser sem custo adicional. No entanto, se quiser personalizar o cartão para diferentes destinatários, será necessário criar cartões separados.",
        },
        {
          question: "O destinatário precisa ter uma conta para ver o cartão?",
          answer:
            "Não! O destinatário não precisa criar conta ou baixar nada. Basta clicar no link para visualizar o cartão em qualquer navegador web.",
        },
      ],
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <section className="bg-purple-700 py-16 text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Perguntas Frequentes</h1>
              <p className="mb-8 text-lg text-purple-100">Encontre respostas para suas dúvidas sobre o PascoaYou</p>
              <div className="relative mx-auto max-w-xl">
                <Input
                  type="text"
                  placeholder="Buscar por dúvidas ou palavras-chave..."
                  className="h-12 bg-white pl-4 pr-12 text-purple-900"
                />
                <Button className="absolute right-1 top-1 h-10 w-10 rounded-md bg-purple-600 p-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="sr-only">Buscar</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <Tabs defaultValue="geral" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-2 gap-2 md:grid-cols-4">
                  {faqCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="text-sm">
                      {category.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {faqCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <Accordion type="single" collapsible className="w-full">
                      {category.items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left text-lg font-medium">{item.question}</AccordionTrigger>
                          <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl rounded-xl bg-purple-50 p-8 shadow-sm">
              <div className="mb-6 text-center">
                <h2 className="mb-2 text-2xl font-bold text-purple-900">Ainda tem dúvidas?</h2>
                <p className="text-gray-600">
                  Nossa equipe de suporte está pronta para ajudar. Entre em contato conosco.
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nome
                    </label>
                    <Input id="name" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-mail
                    </label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Assunto
                  </label>
                  <Input id="subject" placeholder="Sobre o que você precisa de ajuda?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensagem
                  </label>
                  <Textarea id="message" placeholder="Descreva sua dúvida em detalhes..." rows={5} />
                </div>
                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Enviar Mensagem</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

