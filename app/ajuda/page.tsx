import Link from "next/link"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, FileText, Video, HelpCircle, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Ajuda e Suporte | PáscInterativa",
  description: "Encontre respostas para suas dúvidas e obtenha suporte para criar seus cartões de Páscoa interativos.",
}

export default function AjudaPage() {
  const faqCategories = [
    {
      id: "geral",
      title: "Perguntas Gerais",
      items: [
        {
          question: "O que é a PáscInterativa?",
          answer:
            "A PáscInterativa é uma plataforma online que permite criar cartões de Páscoa interativos e personalizados para enviar a amigos e familiares. Nossos cartões combinam elementos visuais, animações e interatividade para criar uma experiência única e memorável.",
        },
        {
          question: "Preciso ter conhecimentos técnicos para criar um cartão?",
          answer:
            "Não! Nossa plataforma foi desenvolvida para ser intuitiva e fácil de usar. Você escolhe um template, personaliza com suas mensagens e fotos, e pronto! Não é necessário nenhum conhecimento de design ou programação.",
        },
        {
          question: "Posso acessar a plataforma pelo celular?",
          answer:
            "Sim! A PáscInterativa é totalmente responsiva e funciona em qualquer dispositivo: computadores, tablets e smartphones. Você pode criar e enviar cartões de onde estiver.",
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
          question: "Como funciona o sistema de pagamento?",
          answer:
            "Utilizamos um sistema de micropagamentos. Você paga apenas R$4,99 por cartão enviado. Não há assinaturas ou taxas mensais. Você pode criar quantos cartões quiser e só paga pelos que decidir enviar.",
        },
        {
          question: "Quais formas de pagamento são aceitas?",
          answer:
            "Aceitamos cartões de crédito e débito de todas as bandeiras, PIX e boleto bancário. Todas as transações são processadas com segurança através de gateways de pagamento certificados.",
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
            "Após finalizar seu cartão e efetuar o pagamento, você receberá um link único que pode ser compartilhado por WhatsApp, e-mail, SMS ou redes sociais. O destinatário clica no link para acessar o cartão interativo.",
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

  const guias = [
    {
      title: "Guia de Primeiros Passos",
      description: "Aprenda o básico para criar seu primeiro cartão interativo",
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      link: "#",
    },
    {
      title: "Vídeos Tutoriais",
      description: "Assista a tutoriais passo a passo sobre todas as funcionalidades",
      icon: <Video className="h-8 w-8 text-purple-600" />,
      link: "#",
    },
    {
      title: "Perguntas Frequentes",
      description: "Encontre respostas para as dúvidas mais comuns",
      icon: <HelpCircle className="h-8 w-8 text-purple-600" />,
      link: "#",
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <section className="bg-purple-700 py-16 text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Como Podemos Ajudar?</h1>
              <p className="mb-8 text-lg text-purple-100">
                Encontre respostas, guias e suporte para criar cartões incríveis
              </p>
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

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-center text-3xl font-bold text-purple-900">Guias e Recursos</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {guias.map((guia, index) => (
                  <Card key={index} className="border-purple-100 transition-all duration-300 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="mb-2">{guia.icon}</div>
                      <CardTitle>{guia.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{guia.description}</CardDescription>
                      <Link
                        href={guia.link}
                        className="mt-4 inline-block text-sm font-medium text-purple-600 hover:text-purple-800"
                      >
                        Acessar guia →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-center text-3xl font-bold text-purple-900">Perguntas Frequentes</h2>

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

              <div className="mb-8 grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg border border-purple-100 bg-white p-4">
                  <Mail className="h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="font-medium">E-mail</h3>
                    <p className="text-sm text-gray-500">Resposta em até 24h</p>
                    <a
                      href="mailto:suporte@pascinterativa.com.br"
                      className="text-sm font-medium text-purple-600 hover:text-purple-800"
                    >
                      suporte@pascinterativa.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-purple-100 bg-white p-4">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="font-medium">Chat ao Vivo</h3>
                    <p className="text-sm text-gray-500">Seg-Sex, 9h às 18h</p>
                    <button className="text-sm font-medium text-purple-600 hover:text-purple-800">
                      Iniciar conversa
                    </button>
                  </div>
                </div>
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

