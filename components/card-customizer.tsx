"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { Template } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import ImageEditor from "./image-editor"
import { Sparkles } from "lucide-react"

interface CardCustomizerProps {
  template: Template
  cardData: {
    message: string
    name: string
    email: string
    imageState: string
  }
  imagePreview: string | null
  onChange: (field: string, value: string) => void
  onImageUpload: (file: File) => void
  onImageStateChange: (stateJson: string) => void
  onPreviewClick: () => void
}

export default function CardCustomizer({
  template,
  cardData,
  imagePreview,
  onChange,
  onImageUpload,
  onImageStateChange,
  onPreviewClick,
}: CardCustomizerProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione uma imagem válida.")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB.")
      return
    }

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      onImageUpload(file)
      setIsUploading(false)
    }, 1000)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6">Personalize seu Cartão</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="mb-6">
                <Label htmlFor="message" className="text-base font-medium">
                  Mensagem do Cartão
                </Label>
                <Textarea
                  id="message"
                  placeholder="Digite sua mensagem de Páscoa..."
                  value={cardData.message}
                  onChange={(e) => onChange("message", e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="name" className="text-base font-medium">
                  Seu Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome..."
                  value={cardData.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="email" className="text-base font-medium">
                  Seu Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email..."
                  value={cardData.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Necessário para receber seu cartão após o pagamento
                </p>
              </div>

              <div>
                <Label className="text-base font-medium">Sua Foto</Label>
                <div className="mt-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    disabled={isUploading}
                    className="w-full"
                  >
                    {isUploading ? "Carregando..." : imagePreview ? "Trocar Imagem" : "Carregar Imagem"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Ajuste sua Imagem</h3>
                <div className="inline-flex items-center px-2 py-1 rounded-full bg-[#FF2D55]/10 text-[#FF2D55] text-xs font-medium">
                  <Sparkles size={12} className="mr-1" />
                  <span>TikTok Ready</span>
                </div>
              </div>

              {imagePreview ? (
                <ImageEditor
                  imageUrl={imagePreview}
                  initialState={cardData.imageState}
                  onStateChange={onImageStateChange}
                />
              ) : (
                <div className="bg-muted h-64 flex items-center justify-center rounded-md">
                  <p className="text-muted-foreground">Carregue uma imagem para ajustá-la</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Button
              onClick={onPreviewClick}
              disabled={!imagePreview || cardData.message.trim() === ""}
              className="bg-[#FF2D55] hover:bg-[#FF1A45]"
              size="lg"
            >
              Continuar para Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

