import type { Metadata } from "next"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Quote, ThumbsUp, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Depoimentos | PascoaYou",
  description: "Veja o que nossos clientes estão dizendo sobre os cartões de Páscoa interativos.",
}

export default function DepoimentosPage() {
  const testimonialCategories = [
    { id: "todos", label: "Todos" },
    { id: "recentes", label: "Mais Recentes" },
    { id: "populares", label: "Mais Populares" },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Ana Silva",
      role: "Mãe e Professora",
      location: "São Paulo, SP",
      date: "28/03/2025",
      content:
        "Adorei a simplicidade! Consegui criar um cartão lindo para minha família em menos de 5 minutos. As crianças ficaram encantadas com a interatividade e os adultos impressionados com a qualidade.",
      rating: 5,
      likes: 42,
      replies: 3,
      template: "Coelho Feliz",
      avatar: "/placeholder.svg?height=80&width=80",
      category: "recentes",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      role: "Designer Gráfico",
      location: "Rio de Janeiro, RJ",
      date: "25/03/2025",
      content:
        "Mesmo sendo designer, apreciei a praticidade do PascoaYou. Os templates são bem feitos e as opções de personalização são suficientes para criar algo único. A interface é intuitiva e as animações são suaves.",
      rating: 5,
      likes: 38,
      replies: 2,
      template: "Ovos Decorados",
      avatar: "/placeholder.svg?height=80&width=80",
      category: "populares",
    },
    {
      id: 3,
      name: "Mariana Costa",
      role: "Estudante",
      location: "Belo Horizonte, MG",
      date: "20/03/2025",
      content:
        "Fiz um cartão para minha avó que mora longe e ela ficou emocionada! A interface é super intuitiva e o resultado final ficou muito profissional. O preço é justo pelo resultado final.",
      rating: 4,
      likes: 27,
      replies: 1,
      template: "Jardim de Páscoa",
      avatar: "/placeholder.svg?height=80&width=80",
      category: "recentes",
    },
    {
      id: 4,
      name: "Roberto Almeida",
      role: "Empresário",
      location: "Curitiba, PR",
      date: "15/03/2025",
      content:
        "Utilizei o serviço para enviar cartões personalizados para meus clientes. O feedback foi excelente! Muitos comentaram sobre a originalidade e o cuidado que tivemos. Certamente isso fortaleceu nosso relacionamento comercial.",
      rating: 5,
      likes: 56,
      replies: 4,
      template: "Caça aos Ovos",
      avatar: "/placeholder.svg?height=80&width=80",
      category: "populares",
    },
    {
      id: 5,
      name: "Fernanda Gomes",
      role: "Professora",
      location: "Salvador, BA",
      date: "10/03/2025",
      content:
        "Criei cartões com meus alunos para um projeto de Páscoa. Foi uma atividade divertida e educativa! As crianças adoraram ver suas criações ganhando vida com as animações. Os pais também ficaram encantados com o resultado.",
      rating: 5,
      likes: 63,
      replies: 7,
      template: "Coelho Feliz",
      avatar: "/placeholder.svg?height=80&width=80",
      category: "populares",
    },
    {
      id: 6,
      name: "Lucas Ferreira",
      role: "Fotógrafo",
      location: "Brasília, DF",
      date: "01/03/2025",
      content:
        "Como fotógrafo, valorizo muito a qualidade visual. Fiquei impressionado com a nitidez das imagens e a fluidez das animações. Consegui integrar minhas fotos perfeitamente ao template escolhido.",
      rating: 4,
      likes: 31,
      replies: 3,
      template: "Cesta de Páscoa",
      avatar: "/placeholder.svg?height=80&width=80",
      category: "recentes",
    },
  ]

  const featuredTestimonials = testimonials.filter((t) => t.likes > 40).slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <section className="bg-purple-700 py-16 text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Depoimentos dos Nossos Clientes
              </h1>
              <p className="mb-8 text-lg text-purple-100">
                Descubra o que as pessoas estão dizendo sobre nossos cartões interativos
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium">4.8/5</span>
                </div>
                <div className="h-6 w-px bg-purple-400"></div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">15,000+</span>
                  <span>Cartões Enviados</span>
                </div>
                <div className="h-6 w-px bg-purple-400"></div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">98%</span>
                  <span>Clientes Satisfeitos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold text-purple-900">Depoimentos em Destaque</h2>
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
              {featuredTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-purple-100 bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="relative">
                      <Quote className="absolute -left-1 -top-1 h-6 w-6 text-purple-200" />
                      <p className="pl-5 text-gray-600">"{testimonial.content}"</p>
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      <span>Template: {testimonial.template}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-gray-100 pt-4">
                    <div className="flex w-full items-center justify-between text-sm">
                      <span className="text-gray-500">{testimonial.date}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4 text-purple-600" />
                          <span>{testimonial.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-purple-600" />
                          <span>{testimonial.replies}</span>
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                <h2 className="text-2xl font-bold text-purple-900">Todos os Depoimentos</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Filtrar por:</span>
                  <Tabs defaultValue="todos">
                    <TabsList>
                      {testimonialCategories.map((category) => (
                        <TabsTrigger key={category.id} value={category.id}>
                          {category.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="border-purple-100 bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{testimonial.role}</span>
                            <span>•</span>
                            <span>{testimonial.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2 flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">"{testimonial.content}"</p>
                      <div className="mt-3 text-sm text-gray-500">
                        <span>Template: {testimonial.template}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-100 pt-4">
                      <div className="flex w-full items-center justify-between text-sm">
                        <span className="text-gray-500">{testimonial.date}</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4 text-purple-600" />
                            <span>{testimonial.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4 text-purple-600" />
                            <span>{testimonial.replies}</span>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl rounded-xl bg-purple-50 p-8 shadow-sm">
              <div className="mb-6 text-center">
                <h2 className="mb-2 text-2xl font-bold text-purple-900">Compartilhe Sua Experiência</h2>
                <p className="text-gray-600">
                  Adoraríamos saber como foi sua experiência com nossos cartões interativos.
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
                  <label className="text-sm font-medium">Sua Avaliação</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className="rounded-full p-1 hover:text-yellow-400 focus:outline-none"
                      >
                        <Star className="h-6 w-6" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="template" className="text-sm font-medium">
                    Template Utilizado
                  </label>
                  <Input id="template" placeholder="Ex: Coelho Feliz, Caça aos Ovos, etc." />
                </div>

                <div className="space-y-2">
                  <label htmlFor="testimonial" className="text-sm font-medium">
                    Seu Depoimento
                  </label>
                  <Textarea id="testimonial" placeholder="Conte-nos como foi sua experiência..." rows={5} />
                </div>

                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Enviar Depoimento</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

