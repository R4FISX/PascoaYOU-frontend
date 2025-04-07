"use client"

import { useState } from "react"
import type { Template } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Share2, Download, Sparkles } from "lucide-react"

interface CardPreviewProps {
  template: Template
  cardData: {
    message: string
    name: string
    email: string
    imageState: string
  }
  imagePreview: string
}

export default function CardPreview({ template, cardData, imagePreview }: CardPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // For demo purposes, we'll just use the template image as preview
  const demoPreviewUrl = template.imageUrl

  const generatePreview = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real implementation, this would call the API to generate the preview
      setPreviewUrl(demoPreviewUrl)
      setPreviewId("preview_123")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCheckout = async () => {
    if (!cardData.email) {
      setError("Por favor, informe seu email para continuar")
      return
    }

    setIsCheckingOut(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real implementation, this would call the API to create a checkout session
      // and redirect to Stripe

      // For demo, we'll just simulate a redirect
      alert("Em uma implementação real, você seria redirecionado para o checkout do Stripe.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      setIsCheckingOut(false)
    }
  }

  // Generate preview on component mount
  useState(() => {
    generatePreview()
  })

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6">Preview do seu Cartão</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card className="border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-[400px] bg-muted">
                  <Loader2 className="h-8 w-8 animate-spin mb-4 text-[#FF2D55]" />
                  <p>Gerando preview do cartão...</p>
                </div>
              ) : previewUrl ? (
                <div className="relative">
                  <img src={previewUrl || "/placeholder.svg"} alt="Preview do cartão" className="w-full h-auto" />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                    <Sparkles className="h-5 w-5 text-[#FF2D55]" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-medium">{cardData.message}</p>
                    {cardData.name && <p className="text-white/80 text-sm">De: {cardData.name}</p>}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] bg-muted">
                  <p className="text-muted-foreground">{error || "Erro ao gerar preview"}</p>
                  <Button variant="outline" className="mt-4" onClick={generatePreview}>
                    Tentar Novamente
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {previewUrl && (
            <div className="mt-4 flex justify-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar Preview
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Baixar Preview
              </Button>
            </div>
          )}
        </div>

        <div>
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Resumo do Pedido</h3>

              <div className="space-y-4">
                <div>
                  <p className="font-medium">Template:</p>
                  <p>{template.name}</p>
                </div>

                <div>
                  <p className="font-medium">Mensagem:</p>
                  <p className="whitespace-pre-line">{cardData.message}</p>
                </div>

                {cardData.name && (
                  <div>
                    <p className="font-medium">Nome:</p>
                    <p>{cardData.name}</p>
                  </div>
                )}

                <div>
                  <p className="font-medium">Email:</p>
                  <p>{cardData.email || "Não informado"}</p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>R$ 4,99</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Preço único, sem taxas adicionais</p>
                </div>
              </div>

              <Button
                className="w-full mt-6 bg-[#FF2D55] hover:bg-[#FF1A45]"
                onClick={handleCheckout}
                disabled={isCheckingOut || !previewUrl}
                size="lg"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Finalizar Compra - R$ 4,99"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-2">
                Pagamento processado com segurança via Stripe
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 bg-[#FFF5F7] rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Sparkles className="h-5 w-5 text-[#FF2D55] mr-2" />
              <h4 className="font-medium">Dica TikTok</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Seu cartão está otimizado para o TikTok! Use a hashtag #PascoaTok ao compartilhar para aumentar suas
              chances de viralizar.
            </p>
          </div>
        </div>
      </div>

      {error && <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">{error}</div>}
    </div>
  )
}

