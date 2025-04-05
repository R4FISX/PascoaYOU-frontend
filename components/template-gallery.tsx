"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"

interface Template {
  id: string
  name: string
  description: string
  imageUrl: string
  category: string
  free: boolean
}

export default function TemplateGallery() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await fetch("/api/templates")

        // Simulando dados para demonstração, já que não temos um backend real
        if (!response.ok) {
          const mockTemplates = [
            {
              id: "template1",
              name: "Coelho Feliz",
              description: "Um coelho animado que pula e revela sua mensagem de Páscoa.",
              imageUrl: "/placeholder.svg?height=300&width=400",
              category: "Mensagem de Páscoa",
              free: true,
            },
            {
              id: "template2",
              name: "Caça aos Ovos",
              description: "Um jogo interativo onde o destinatário procura ovos escondidos para revelar sua mensagem.",
              imageUrl: "/placeholder.svg?height=300&width=400",
              category: "Interativo",
              free: false,
            },
            {
              id: "template3",
              name: "Cesta de Páscoa",
              description: "Uma cesta que se abre revelando chocolates e sua mensagem personalizada.",
              imageUrl: "/placeholder.svg?height=300&width=400",
              category: "Boas Festas",
              free: true,
            },
            {
              id: "template4",
              name: "Ovos Decorados",
              description: "Ovos coloridos que se quebram para mostrar fotos e mensagens especiais.",
              imageUrl: "/placeholder.svg?height=300&width=400",
              category: "Mensagem de Páscoa",
              free: false,
            },
            {
              id: "template5",
              name: "Jardim de Páscoa",
              description: "Um jardim primaveril que floresce com sua mensagem de Páscoa.",
              imageUrl: "/placeholder.svg?height=300&width=400",
              category: "Boas Festas",
              free: true,
            },
            {
              id: "template6",
              name: "Ressurreição",
              description: "Uma animação inspiradora celebrando o verdadeiro significado da Páscoa.",
              imageUrl: "/placeholder.svg?height=300&width=400",
              category: "Feliz Ressurreição",
              free: false,
            },
          ]
          setTemplates(mockTemplates)
        } else {
          const data = await response.json()
          setTemplates(data)
        }
      } catch (error) {
        console.error("Erro ao carregar templates:", error)
        toast({
          title: "Erro ao carregar templates",
          description: "Não foi possível carregar os templates. Tente novamente mais tarde.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  const handleSelectTemplate = (template: Template) => {
    if (!template.free) {
      toast({
        title: "Template Premium",
        description: "Este é um template premium. Você precisará fazer um micropagamento para utilizá-lo.",
      })
    }

    // Armazenar o template selecionado e redirecionar para o editor
    localStorage.setItem("selectedTemplate", JSON.stringify(template))
    router.push("/editor")
  }

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="aspect-[4/3] w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3 mt-2" />
              <div className="mt-4 flex justify-end">
                <Skeleton className="h-10 w-28" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {templates.map((template) => (
        <Card
          key={template.id}
          className="group relative overflow-hidden border-purple-100 transition-all duration-300 hover:shadow-lg"
        >
          <CardContent className="p-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
              <Image
                src={template.imageUrl || "/placeholder.svg"}
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
                <Button
                  className="bg-purple-600 text-white hover:bg-purple-700"
                  onClick={() => handleSelectTemplate(template)}
                >
                  {template.free ? "Usar Template" : "Desbloquear"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

