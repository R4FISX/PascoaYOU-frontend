"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TemplateSelector from "@/components/editor/template-selector"
import CardCustomizer from "@/components/editor/card-customizer"
import CardPreview from "@/components/editor/card-preview"
import type { Template } from "@/lib/types"
import { templates } from "@/lib/templates"

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState("template")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [cardData, setCardData] = useState({
    message: "",
    name: "",
    email: "",
    imageState: "{}",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("cardData")
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setCardData(parsedData)

      if (parsedData.templateId) {
        const template = templates.find((t) => t.id === parsedData.templateId)
        if (template) {
          setSelectedTemplate(template)
        }
      }

      if (parsedData.imagePreview) {
        setImagePreview(parsedData.imagePreview)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "cardData",
      JSON.stringify({
        ...cardData,
        templateId: selectedTemplate?.id,
        imagePreview,
      }),
    )
  }, [cardData, selectedTemplate, imagePreview])

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    setActiveTab("customize")
  }

  const handleCustomizationChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (file: File) => {
    setImageFile(file)

    // Create a preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      const preview = reader.result as string
      setImagePreview(preview)
    }
    reader.readAsDataURL(file)
  }

  const handleImageStateChange = (stateJson: string) => {
    setCardData((prev) => ({ ...prev, imageState: stateJson }))
  }

  const handlePreviewClick = () => {
    setActiveTab("preview")
  }

  const canProceedToCustomize = selectedTemplate !== null
  const canProceedToPreview = selectedTemplate !== null && cardData.message.trim() !== "" && imagePreview !== null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Crie seu Cartão de Páscoa</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="template">1. Escolha o Template</TabsTrigger>
          <TabsTrigger value="customize" disabled={!canProceedToCustomize}>
            2. Personalize
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!canProceedToPreview}>
            3. Preview & Checkout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="template">
          <TemplateSelector
            templates={templates}
            onSelect={handleTemplateSelect}
            selectedTemplateId={selectedTemplate?.id}
          />
        </TabsContent>

        <TabsContent value="customize">
          {selectedTemplate && (
            <CardCustomizer
              template={selectedTemplate}
              cardData={cardData}
              imagePreview={imagePreview}
              onChange={handleCustomizationChange}
              onImageUpload={handleImageUpload}
              onImageStateChange={handleImageStateChange}
              onPreviewClick={handlePreviewClick}
            />
          )}
        </TabsContent>

        <TabsContent value="preview">
          {selectedTemplate && imagePreview && (
            <CardPreview template={selectedTemplate} cardData={cardData} imagePreview={imagePreview} />
          )}
        </TabsContent>
      </Tabs>

      {error && <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">{error}</div>}
    </div>
  )
}

