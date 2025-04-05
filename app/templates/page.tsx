import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TemplateGallery from "@/components/template-gallery"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter } from "lucide-react"

export const metadata: Metadata = {
  title: "Templates | PascoaYou",
  description: "Explore nossa coleção de templates de cartões de Páscoa interativos para personalizar e compartilhar.",
}

export default function TemplatesPage() {
  const categories = [
    { id: "todos", label: "Todos" },
    { id: "mensagem", label: "Mensagem de Páscoa" },
    { id: "interativo", label: "Interativo" },
    { id: "boas-festas", label: "Boas Festas" },
    { id: "ressurreicao", label: "Feliz Ressurreição" },
  ]

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
                Escolha o design perfeito para seu cartão de Páscoa personalizado
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
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                <h2 className="text-2xl font-bold text-purple-900">Todos os Templates</h2>
                <div className="flex items-center gap-4">
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

                <TemplateGallery />
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

