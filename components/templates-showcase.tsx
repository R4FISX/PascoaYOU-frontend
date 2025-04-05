"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TemplatesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const templates = [
    {
      id: 1,
      name: "Coelho Feliz",
      description: "Um coelho animado que pula e revela sua mensagem de Páscoa.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Mensagem de Páscoa",
      free: true,
    },
    {
      id: 2,
      name: "Caça aos Ovos",
      description: "Um jogo interativo onde o destinatário procura ovos escondidos para revelar sua mensagem.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Interativo",
      free: false,
    },
    {
      id: 3,
      name: "Cesta de Páscoa",
      description: "Uma cesta que se abre revelando chocolates e sua mensagem personalizada.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Boas Festas",
      free: true,
    },
    {
      id: 4,
      name: "Ovos Decorados",
      description: "Ovos coloridos que se quebram para mostrar fotos e mensagens especiais.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Mensagem de Páscoa",
      free: false,
    },
    {
      id: 5,
      name: "Jardim de Páscoa",
      description: "Um jardim primaveril que floresce com sua mensagem de Páscoa.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Boas Festas",
      free: true,
    },
    {
      id: 6,
      name: "Ressurreição",
      description: "Uma animação inspiradora celebrando o verdadeiro significado da Páscoa.",
      image: "/placeholder.svg?height=300&width=400",
      category: "Feliz Ressurreição",
      free: false,
    },
  ]

  const nextSlide = () => {
    if (currentIndex < templates.length - 1) {
      setCurrentIndex(currentIndex + 1)
      scrollToIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      scrollToIndex(currentIndex - 1)
    }
  }

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 3
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="templates" className="bg-purple-50 py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl md:text-5xl">
              Biblioteca de Templates
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Escolha entre diversos modelos interativos e personalize com seu toque especial
            </p>
          </div>
        </div>

        <div className="relative mt-12">
          <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 md:-left-6">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-white shadow-md"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Anterior</span>
            </Button>
          </div>

          <div ref={carouselRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pt-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="group relative min-w-[280px] flex-1 snap-center transition-all duration-300 hover:shadow-lg sm:min-w-[320px] md:min-w-[calc(33.333%-16px)]"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge className={template.free ? "bg-green-500 text-white" : "bg-purple-600 text-white"}>
                        {template.free ? "Grátis" : "Premium"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-sm">{template.description}</p>
                      <p className="mt-1 text-xs">Categoria: {template.category}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    <div className="mt-4 flex justify-end">
                      <Button className="bg-purple-600 text-white hover:bg-purple-700">
                        {template.free ? "Usar Template" : "Desbloquear"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 md:-right-6">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-white shadow-md"
              onClick={nextSlide}
              disabled={currentIndex === templates.length - 3}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Próximo</span>
            </Button>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button className="bg-purple-600 text-white hover:bg-purple-700">Ver Todos os Templates</Button>
        </div>
      </div>
    </section>
  )
}

