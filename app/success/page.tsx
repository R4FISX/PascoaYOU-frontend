"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Check, Share2, Download, InstagramIcon as Tiktok, Instagram, MessageSquare } from "lucide-react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [card, setCard] = useState<any>(null)

  useEffect(() => {
    const fetchCard = async () => {
      if (!sessionId) {
        setError("ID da sessão não encontrado")
        setIsLoading(false)
        return
      }

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // In a real implementation, this would call the API to get the card data
        setCard({
          id: "card_123",
          template_id: "template-1",
          message: "Feliz Páscoa! Que esta data seja repleta de alegria e renovação.",
          name: "Maria Silva",
          email: "maria@example.com",
          card_url: "/placeholder.svg?height=600&width=800&text=Card+Final",
          status: "paid",
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCard()
  }, [sessionId])

  const handleShare = (platform: string) => {
    if (card?.card_url) {
      let shareUrl = ""

      switch (platform) {
        case "tiktok":
          // TikTok doesn't have a direct web share API, so we'll just copy the link
          navigator.clipboard
            .writeText(card.card_url)
            .then(() => alert("Link copiado! Abra o TikTok e cole o link para compartilhar."))
            .catch((err) => console.error("Erro ao copiar link:", err))
          break
        case "instagram":
          // Instagram doesn't have a direct web share API, so we'll just copy the link
          navigator.clipboard
            .writeText(card.card_url)
            .then(() => alert("Link copiado! Abra o Instagram e cole o link para compartilhar."))
            .catch((err) => console.error("Erro ao copiar link:", err))
          break
        case "whatsapp":
          shareUrl = `https://wa.me/?text=${encodeURIComponent("Veja meu cartão de Páscoa personalizado! " + card.card_url)}`
          window.open(shareUrl, "_blank")
          break
        default:
          // Use Web Share API if available
          if (navigator.share) {
            navigator
              .share({
                title: "Meu Cartão de Páscoa",
                text: "Veja o cartão de Páscoa que eu criei!",
                url: card.card_url,
              })
              .catch((err) => {
                console.error("Erro ao compartilhar:", err)
              })
          } else {
            // Fallback for browsers that don't support navigator.share
            navigator.clipboard
              .writeText(card.card_url)
              .then(() => alert("Link copiado para a área de transferência!"))
              .catch((err) => console.error("Erro ao copiar link:", err))
          }
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin mb-4 text-[#FF2D55]" />
            <p className="text-lg">Carregando seu cartão...</p>
          </div>
        ) : error ? (
          <Card className="border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Ops! Algo deu errado</h1>
              <p className="mb-6 text-muted-foreground">{error}</p>
              <Link href="/">
                <Button className="bg-[#FF2D55] hover:bg-[#FF1A45]">Voltar para a Página Inicial</Button>
              </Link>
            </CardContent>
          </Card>
        ) : card ? (
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-100 rounded-full p-3">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center mb-2">Pagamento Confirmado!</h1>
              <p className="text-center text-muted-foreground mb-8">
                Seu cartão de Páscoa está pronto para bombar nas redes sociais
              </p>

              <div className="mb-8 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF2D55] to-[#FFD700] rounded-lg blur-sm"></div>
                <div className="relative">
                  <img
                    src={card.card_url || "/placeholder.svg"}
                    alt="Seu cartão de Páscoa"
                    className="w-full rounded-md shadow-md"
                  />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-lg mb-3">Compartilhe nas redes sociais</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-auto py-3"
                    onClick={() => handleShare("tiktok")}
                  >
                    <Tiktok className="h-6 w-6 mb-1" />
                    <span className="text-xs">TikTok</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-auto py-3"
                    onClick={() => handleShare("instagram")}
                  >
                    <Instagram className="h-6 w-6 mb-1" />
                    <span className="text-xs">Instagram</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-auto py-3"
                    onClick={() => handleShare("whatsapp")}
                  >
                    <MessageSquare className="h-6 w-6 mb-1" />
                    <span className="text-xs">WhatsApp</span>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="flex-1 bg-[#FF2D55] hover:bg-[#FF1A45]" onClick={() => handleShare("default")}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar Cartão
                </Button>

                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    // In a real implementation, this would download the image
                    alert("Em uma implementação real, isso baixaria a imagem do cartão.")
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Cartão
                </Button>
              </div>

              <div className="mt-8 bg-[#FFF5F7] rounded-lg p-4">
                <p className="text-center text-sm text-muted-foreground">
                  Um email com o link do seu cartão também foi enviado para {card.email}
                </p>
              </div>

              <div className="mt-8 text-center">
                <Link href="/">
                  <Button variant="link" className="text-[#FF2D55]">
                    Voltar para a Página Inicial
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}

