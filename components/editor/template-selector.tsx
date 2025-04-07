"use client"

import { useState } from "react"
import type { Template } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TemplateSelectorProps {
  templates: Template[]
  onSelect: (template: Template) => void
  selectedTemplateId?: string
}

export default function TemplateSelector({ templates, onSelect, selectedTemplateId }: TemplateSelectorProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "Todos" },
    { id: "moderno", name: "Modernos" },
    { id: "divertido", name: "Divertidos" },
    { id: "infantil", name: "Infantis" },
    { id: "religioso", name: "Religiosos" },
    { id: "elegante", name: "Elegantes" },
  ]

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6">Escolha um Template</h2>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="mb-6 flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter((template) => activeCategory === "all" || template.category === activeCategory)
              .map((template) => (
                <Card
                  key={template.id}
                  className={`overflow-hidden cursor-pointer transition-all ${
                    selectedTemplateId === template.id ? "ring-2 ring-[#FF2D55]" : "hover:shadow-md"
                  }`}
                  onClick={() => onSelect(template)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={template.imageUrl || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-[300px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="text-white">
                          <h3 className="font-bold text-lg">{template.name}</h3>
                          <p className="text-sm text-white/80">Categoria: {template.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>

                      {selectedTemplateId === template.id ? (
                        <Button className="w-full mt-3 bg-[#FF2D55] hover:bg-[#FF1A45]" size="sm">
                          Selecionado
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full mt-3" size="sm">
                          Selecionar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedTemplateId && (
        <div className="mt-8 text-center">
          <Button
            className="bg-[#FF2D55] hover:bg-[#FF1A45]"
            onClick={() => {
              const template = templates.find((t) => t.id === selectedTemplateId)
              if (template) onSelect(template)
            }}
          >
            Continuar para Personalização
          </Button>
        </div>
      )}
    </div>
  )
}

