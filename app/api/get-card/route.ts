import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"

// Inicializa o cliente do Supabase
const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, cardId } = body

    // Validação básica
    if (!sessionId && !cardId) {
      return NextResponse.json({ success: false, error: "ID da sessão ou do cartão é obrigatório" }, { status: 400 })
    }

    let card = null

    // Buscar pelo ID do cartão
    if (cardId) {
      const { data, error } = await supabase.from("cards").select("*").eq("id", cardId).single()

      if (data && !error) {
        card = data
      }
    }

    // Se não encontrou pelo ID do cartão, buscar pelo ID da sessão
    if (!card && sessionId) {
      const { data, error } = await supabase.from("cards").select("*").eq("session_id", sessionId).single()

      if (data && !error) {
        card = data
      } else {
        // Se ainda não encontrou, verificar a sessão do Stripe
        try {
          const session = await stripe.checkout.sessions.retrieve(sessionId)

          if (session.metadata?.cardId) {
            const { data: cardData, error: cardError } = await supabase
              .from("cards")
              .select("*")
              .eq("id", session.metadata.cardId)
              .single()

            if (cardData && !cardError) {
              card = cardData
            }
          }
        } catch (stripeError) {
          console.error("Erro ao buscar sessão do Stripe:", stripeError)
        }
      }
    }

    if (!card) {
      return NextResponse.json({ success: false, error: "Cartão não encontrado" }, { status: 404 })
    }

    // Atualizar o status do cartão para 'paid' se ainda estiver como 'pending'
    if (card.status === "pending") {
      const { error: updateError } = await supabase
        .from("cards")
        .update({
          status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("id", card.id)

      if (updateError) {
        console.error("Erro ao atualizar status do cartão:", updateError)
      }
    }

    return NextResponse.json({
      success: true,
      cardUrl: card.card_url,
      mensagem: card.mensagem,
      nome: card.nome,
      templateId: card.template_id,
      fotoUrl: card.foto_url,
      imageState: card.image_state,
    })
  } catch (error: any) {
    console.error("Erro ao buscar cartão:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao buscar o cartão: " + (error.message || "Erro desconhecido"),
      },
      { status: 500 },
    )
  }
}

