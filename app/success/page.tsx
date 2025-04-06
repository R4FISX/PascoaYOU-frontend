"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Loader2, Check, Download, Share2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

// Inicializa o cliente do Supabase (client-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://uthophxqgveapbjvvzqd.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0aG9waHhxZ3ZlYXBianZ2enFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzQxODE3OSwiZXhwIjoyMDU4OTk0MTc5fQ.266I-yb0IoT-NOob4ob1CtwaXNcxFwnRfifRBtUPzXE"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const cardId = searchParams.get("card_id")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cardUrl, setCardUrl] = useState<string | null>(null)
  const [cardDetails, setCardDetails] = useState<{
    mensagem: string
    nome?: string
  } | null>(null)

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (!sessionId && !cardId) {
        setError("Informações da sessão de pagamento não encontradas")
        setLoading(false)
        return
      }

      try {
        // Primeiro, tentar buscar o cartão pelo ID diretamente do Supabase
        if (cardId) {
          const { data: cardData, error: cardError } = await supabase
            .from("cards")
            .select("*")
            .eq("id", cardId)
            .single()

          if (cardData && !cardError) {
            setCardUrl(cardData.card_url)
            setCardDetails({
              mensagem: cardData.mensagem,
              nome: cardData.nome,
            })
            setLoading(false)
            return
          }
        }

        // Se não encontrou pelo ID ou ocorreu erro, tentar pela API
        const response = await fetch("/api/get-card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            cardId,
          }),
        })

        if (!response.ok) {
          throw new Error(`Erro ao buscar cartão: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (data.success) {
          setCardUrl(data.cardUrl)
          setCardDetails({
            mensagem: data.mensagem,
            nome: data.nome,
          })
        } else {
          throw new Error(data.error || "Erro ao buscar detalhes do cartão")
        }
      } catch (error: any) {
        console.error("Falha ao buscar cartão:", error)
        setError(
          `Ocorreu um erro ao buscar seu cartão: ${error.message || "Erro desconhecido"}. Por favor, entre em contato com o suporte.`,
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCardDetails()
  }, [sessionId, cardId])

  const handleShare = async () => {
    if (cardUrl && navigator.share) {
      try {
        await navigator.share({
          title: "Meu Cartão de Páscoa Personalizado",
          text: "Veja o cartão de Páscoa que eu criei!",
          url: cardUrl,
        })
      } catch (error) {
        console.error("Erro ao compartilhar:", error)
      }
    } else {
      // Fallback para copiar o link
      navigator.clipboard.writeText(cardUrl || window.location.href)
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
                <p className="text-muted-foreground">Buscando seu cartão personalizado...</p>
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
                <div className="relative h-[400px] w-full max-w-[300px] overflow-hidden rounded-lg shadow-lg">
                  {cardUrl ? (
                    <Image src={cardUrl || "/placeholder.svg"} alt="Cartão gerado" fill className="object-contain" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-500">Imagem não disponível</p>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-6">
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Sua mensagem:</h3>
                    <p className="italic">{cardDetails?.mensagem || ""}</p>
                    {cardDetails?.nome && <p className="mt-2 font-medium">Para: {cardDetails.nome}</p>}
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-pink-500 hover:bg-pink-600" asChild>
                      <a href={cardUrl || "#"} download="cartao-pascoa-personalizado.png">
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