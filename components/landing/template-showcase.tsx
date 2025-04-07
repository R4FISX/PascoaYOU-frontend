import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function TemplateShowcase() {
  const templates = [
    {
      id: "template-1",
      name: "TikTok Vibes",
      image: "/placeholder.svg?height=400&width=300&text=Template+1",
      category: "moderno",
    },
    {
      id: "template-2",
      name: "Easter Aesthetic",
      image: "/placeholder.svg?height=400&width=300&text=Template+2",
      category: "divertido",
    },
    {
      id: "template-3",
      name: "Coelho Fofo",
      image: "/placeholder.svg?height=400&width=300&text=Template+3",
      category: "infantil",
    },
    {
      id: "template-4",
      name: "Páscoa Minimalista",
      image: "/placeholder.svg?height=400&width=300&text=Template+4",
      category: "elegante",
    },
    {
      id: "template-5",
      name: "Chocolate Lovers",
      image: "/placeholder.svg?height=400&width=300&text=Template+5",
      category: "divertido",
    },
    {
      id: "template-6",
      name: "Celebração Pascoal",
      image: "/placeholder.svg?height=400&width=300&text=Template+6",
      category: "religioso",
    },
  ]

  return (
    <section className="py-20 bg-[#FFF5F7]">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Templates que vão bombar</h2>
          <p className="text-muted-foreground">
            Escolha entre diversos designs modernos e criativos, perfeitos para o TikTok e Instagram. Todos os templates
            são totalmente personalizáveis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden group hover:shadow-xl transition-all">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-[300px] object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{template.name}</h3>
                      <p className="text-sm text-white/80">Categoria: {template.category}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/templates">
            <Button size="lg" className="bg-[#FF2D55] hover:bg-[#FF1A45] text-white">
              Ver todos os templates
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

