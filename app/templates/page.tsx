import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Star, Eye, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Templates | PáscInterativa",
  description: "Explore nossa coleção de templates de cartões de Páscoa interativos para personalizar e compartilhar.",
}

export default function TemplatesPage() {
  const categories = [
    { id: "todos", label: "Todos" },
    { id: "populares", label: "Mais Populares" },
    { id: "novos", label: "Novidades" },
    { id: "infantil", label: "Infantil" },
    { id: "religioso", label: "Religioso" },
    { id: "empresarial", label: "Empresarial" },
  ]

  const templates = [
    {
      id: 1,
      name: "Coelho Feliz",
      description: "Um coelho animado que pula e revela sua mensagem de Páscoa.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["populares", "infantil"],
      rating: 4.9,
      views: 12500,
      likes: 8700,
      featured: true,
      new: false,
    },
    {
      id: 2,
      name: "Caça aos Ovos",
      description: "Um jogo interativo onde o destinatário procura ovos escondidos para revelar sua mensagem.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["populares", "infantil"],
      rating: 4.8,
      views: 10200,
      likes: 7500,
      featured: true,
      new: false,
    },
    {
      id: 3,
      name: "Cesta de Páscoa",
      description: "Uma cesta que se abre revelando chocolates e sua mensagem personalizada.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["populares", "empresarial"],
      rating: 4.7,
      views: 9800,
      likes: 7200,
      featured: false,
      new: false,
    },
    {
      id: 4,
      name: "Ovos Decorados",
      description: "Ovos coloridos que se quebram para mostrar fotos e mensagens especiais.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["infantil"],
      rating: 4.6,
      views: 8500,
      likes: 6300,
      featured: false,
      new: false,
    },
    {
      id: 5,
      name: "Jardim de Páscoa",
      description: "Um jardim primaveril que floresce com sua mensagem de Páscoa.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["religioso"],
      rating: 4.7,
      views: 7900,
      likes: 5800,
      featured: false,
      new: false,
    },
    {
      id: 6,
      name: "Chocolate Derretido",
      description: "Chocolate que derrete para formar sua mensagem personalizada.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["empresarial"],
      rating: 4.5,
      views: 7200,
      likes: 5100,
      featured: false,
      new: false,
    },
    {
      id: 7,
      name: "Ressurreição",
      description: "Uma animação inspiradora celebrando o verdadeiro significado da Páscoa.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["religioso"],
      rating: 4.9,
      views: 8800,
      likes: 7600,
      featured: true,
      new: false,
    },
    {
      id: 8,
      name: "Coelhinhos Dançantes",
      description: "Coelhinhos que dançam ao som da música escolhida por você.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["infantil"],
      rating: 4.8,
      views: 9200,
      likes: 7100,
      featured: false,
      new: true,
    },
    {
      id: 9,
      name: "Cartão Corporativo",
      description: "Design elegante e profissional ideal para envios empresariais.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["empresarial"],
      rating: 4.7,
      views: 6500,
      likes: 4800,
      featured: false,
      new: false,
    },
    {
      id: 10,
      name: "Última Ceia",
      description: "Uma representação artística da Última Ceia com mensagem personalizada.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["religioso"],
      rating: 4.9,
      views: 7800,
      likes: 6900,
      featured: false,
      new: false,
    },
    {
      id: 11,
      name: "Fábrica de Chocolates",
      description: "Uma fábrica animada produzindo chocolates com sua mensagem.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["infantil", "empresarial"],
      rating: 4.6,
      views: 8100,
      likes: 6200,
      featured: false,
      new: true,
    },
    {
      id: 12,
      name: "Cerimônia de Páscoa",
      description: "Uma cerimônia solene celebrando a ressurreição com espaço para sua mensagem.",
      image: "/placeholder.svg?height=300&width=400",
      category: ["religioso"],
      rating: 4.8,
      views: 7300,
      likes: 6100,
      featured: false,
      new: true,
    },
  ]

  const featuredTemplates = templates.filter((t) => t.featured)
  const newTemplates = templates.filter((t) => t.new)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <section className="bg-purple-700 py-16 text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Explore Nossos Templates
              </h1>
              <p className="mb-8 text-lg text-purple-100">
                Descubra designs interativos e personalizáveis para criar cartões de Páscoa únicos
              </p>
              <div className="relative mx-auto max-w-xl">
                <Input
                  type="text"
                  placeholder="Buscar templates..."
                  className="h-12 bg-white pl-4 pr-12 text-purple-900"
                />
                <Button className="absolute right-1 top-1 h-10 w-10 rounded-md bg-purple-600 p-0">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Buscar</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold text-purple-900">Templates em Destaque</h2>
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredTemplates.map((template) => (
                <Card key={template.id} className="group overflow-hidden border-purple-100">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 flex gap-2">
                      <Badge className="bg-yellow-500 text-yellow-950">Destaque</Badge>
                      {template.new && <Badge className="bg-green-500 text-green-950">Novo</Badge>}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-sm">{template.description}</p>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <span>{template.name}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{template.rating}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{template.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{template.likes.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="bg-purple-600 text-white hover:bg-purple-700">Usar Template</Button>
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
                <h2 className="text-2xl font-bold text-purple-900">Todos os Templates</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Input type="text" placeholder="Filtrar por nome..." className="h-9 w-[200px] pl-8" />
                    <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filtros</span>
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="todos">
                <TabsList className="mb-6 w-full justify-start overflow-auto">
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="todos" className="mt-0">
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {templates.map((template) => (
                      <Card key={template.id} className="group overflow-hidden border-purple-100">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={template.image || "/placeholder.svg"}
                            alt={template.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {(template.featured || template.new) && (
                            <div className="absolute left-3 top-3 flex gap-2">
                              {template.featured && <Badge className="bg-yellow-500 text-yellow-950">Destaque</Badge>}
                              {template.new && <Badge className="bg-green-500 text-green-950">Novo</Badge>}
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <p className="text-sm">{template.description}</p>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{template.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{template.rating}</span>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span>{template.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                <span>{template.likes.toLocaleString()}</span>
                              </div>
                            </div>
                            <Link href={`/templates/${template.id}`} className="text-purple-600 hover:text-purple-800">
                              Detalhes
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {categories.slice(1).map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-0">
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {templates
                        .filter((t) => t.category.includes(category.id))
                        .map((template) => (
                          <Card key={template.id} className="group overflow-hidden border-purple-100">
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <Image
                                src={template.image || "/placeholder.svg"}
                                alt={template.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              {(template.featured || template.new) && (
                                <div className="absolute left-3 top-3 flex gap-2">
                                  {template.featured && (
                                    <Badge className="bg-yellow-500 text-yellow-950">Destaque</Badge>
                                  )}
                                  {template.new && <Badge className="bg-green-500 text-green-950">Novo</Badge>}
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <p className="text-sm">{template.description}</p>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{template.name}</h3>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{template.rating}</span>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{template.views.toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Heart className="h-3 w-3" />
                                    <span>{template.likes.toLocaleString()}</span>
                                  </div>
                                </div>
                                <Link
                                  href={`/templates/${template.id}`}
                                  className="text-purple-600 hover:text-purple-800"
                                >
                                  Detalhes
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <div className="mt-10 flex justify-center">
                <Button className="bg-purple-600 text-white hover:bg-purple-700">Carregar Mais Templates</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl rounded-xl bg-purple-50 p-8 shadow-sm">
              <div className="text-center">
                <h2 className="mb-2 text-2xl font-bold text-purple-900">Não Encontrou o que Procura?</h2>
                <p className="mb-6 text-gray-600">
                  Podemos criar templates personalizados de acordo com suas necessidades específicas.
                </p>
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Solicitar Template Personalizado
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

