"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Loader2, Check, Download, Share2 } from "lucide-react"
import dynamic from "next/dynamic"

const CardPreview = dynamic(() => import("@/components/card-preview"), {
  ssr: false,
  loading: () => (
    <div className="relative h-[400px] w-full max-w-[300px] mx-auto bg-gray-100 rounded-lg animate-pulse"></div>
  ),
})

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cardUrl, setCardUrl] = useState<string | null>(null)
  const [cardDetails, setCardDetails] = useState<{
    mensagem: string
    nome?: string
    templateId?: number
    templateUrl?: string
    fotoUrl?: string
    imageState?: any
  } | null>(null)

  useEffect(() => {
    const generateFinalCard = async () => {
      if (!sessionId) {
        setError("Sessão de pagamento não encontrada")
        setLoading(false)
        return
      }

      try {
        // Gerar o cartão final após o pagamento confirmado
        const response = await fetch("/api/generate-card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            // Não precisamos enviar os outros dados pois eles estão
            // armazenados nos metadados da sessão do Stripe
            isPreview: false,
          }),
        })

        const data = await response.json()

        if (data.success) {
          setCardUrl(data.cardUrl)
          setCardDetails({
            mensagem: data.mensagem,
            nome: data.nome,
            templateId: data.templateId,
            templateUrl: data.templateUrl,
            fotoUrl: data.fotoUrl,
            imageState: data.imageState,
          })
        } else {
          setError(`Erro ao gerar cartão: ${data.error}`)
        }
      } catch (error) {
        console.error("Falha ao gerar cartão final:", error)
        setError("Ocorreu um erro ao gerar seu cartão. Por favor, entre em contato com o suporte.")
      } finally {
        setLoading(false)
      }
    }

    generateFinalCard()
  }, [sessionId])

  const handleShare = async () => {
    if (cardUrl && navigator.share) {
      try {
        await navigator.share({
          title: "Meu Cartão de Páscoa Personalizado",
          text: "Veja o cartão de Páscoa que eu criei!",
          url: window.location.origin + cardUrl,
        })
      } catch (error) {
        console.error("Erro ao compartilhar:", error)
      }
    } else {
      // Fallback para copiar o link
      navigator.clipboard.writeText(window.location.origin + cardUrl)
      alert("Link copiado para a área de transferência!")
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 py-12">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-pink-800 mb-2">Pagamento Confirmado!</h1>
              <p className="text-muted-foreground max-w-md">
                Seu cartão de Páscoa personalizado foi gerado com sucesso. Agora você pode baixá-lo e compartilhá-lo.
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-pink-500 mb-4" />
                <p className="text-muted-foreground">Gerando seu cartão personalizado...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Link href="/editor">
                  <Button variant="outline">Voltar para o Editor</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {cardUrl ? (
                  <div className="relative h-[400px] w-full max-w-[300px] overflow-hidden rounded-lg shadow-lg">
                    <Image src={cardUrl || "/placeholder.svg"} alt="Cartão gerado" fill className="object-contain" />
                  </div>
                ) : (
                  <CardPreview
                    templateId={cardDetails?.templateId || 1}
                    templateUrl={cardDetails?.templateUrl || ""}
                    imageUrl={cardDetails?.fotoUrl || ""}
                    mensagem={cardDetails?.mensagem || ""}
                    nome={cardDetails?.nome}
                    imageState={cardDetails?.imageState}
                  />
                )}

                <div className="flex-1 space-y-6">
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Sua mensagem:</h3>
                    <p className="italic">{cardDetails?.mensagem || ""}</p>
                    {cardDetails?.nome && <p className="mt-2 font-medium">Para: {cardDetails.nome}</p>}
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-pink-500 hover:bg-pink-600" asChild>
                      <a href={cardUrl || "#"} download>
                        <Download className="mr-2 h-4 w-4" />
                        Baixar Cartão
                      </a>
                    </Button>

                    <Button variant="outline" className="w-full" onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartilhar
                    </Button>

                    <Link href="/">
                      <Button variant="ghost" className="w-full">
                        Voltar para a Página Inicial
                      </Button>
                    </Link>
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    Obrigado por usar nosso serviço! Esperamos que seus amigos e familiares gostem do seu cartão de
                    Páscoa personalizado.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

