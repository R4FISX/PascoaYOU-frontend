import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Inicializa o cliente do Supabase
const supabaseUrl = process.env.SUPABASE_URL || "https://uthophxqgveapbjvvzqd.supabase.co"
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0aG9waHhxZ3ZlYXBianZ2enFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzQxODE3OSwiZXhwIjoyMDU4OTk0MTc5fQ.266I-yb0IoT-NOob4ob1CtwaXNcxFwnRfifRBtUPzXE"
const supabase = createClient(supabaseUrl, supabaseKey)

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
    "sk_test_51RALWZD5JvW9zM7PPkysHAwyEf1i2t5nErXDCGEajiaJI5e47SUhkUwIPzb0KyGQFiyeIW9G8GoJ622JeYsHiFq200EHOZtTot",
  {
    apiVersion: "2023-10-16",
  },
)

export async function POST(request: NextRequest) {
  console.log("🔄 Iniciando processamento da requisição get-card")

  try {
    const body = await request.json()
    console.log("📦 Payload recebido:", body)

    const { sessionId, cardId } = body

    // Validação básica
    if (!sessionId && !cardId) {
      console.log("❌ Validação falhou: ID da sessão ou do cartão é obrigatório")
      return NextResponse.json(
        {
          success: false,
          error: "ID da sessão ou do cartão é obrigatório",
        },
        { status: 400 },
      )
    }

    let card = null
    let paymentStatus = null

    // Buscar pelo ID do cartão
    if (cardId) {
      console.log("🔍 Buscando cartão pelo ID:", cardId)
      const { data, error } = await supabase.from("cards").select("*").eq("id", cardId).single()

      if (data && !error) {
        card = data
        console.log("✅ Cartão encontrado pelo ID")
      } else if (error) {
        console.log("⚠️ Erro ao buscar cartão pelo ID:", error)
      }
    }

    // Se não encontrou pelo ID do cartão, buscar pelo ID da sessão
    if (!card && sessionId) {
      console.log("🔍 Buscando cartão pelo ID da sessão:", sessionId)
      const { data, error } = await supabase.from("cards").select("*").eq("session_id", sessionId).single()

      if (data && !error) {
        card = data
        console.log("✅ Cartão encontrado pelo ID da sessão")
      } else if (error) {
        console.log("⚠️ Erro ao buscar cartão pelo ID da sessão:", error)

        // Se ainda não encontrou, verificar a sessão do Stripe
        try {
          console.log("🔍 Verificando sessão do Stripe:", sessionId)
          const session = await stripe.checkout.sessions.retrieve(sessionId)
          paymentStatus = session.payment_status

          console.log("✅ Sessão do Stripe encontrada, status:", paymentStatus)

          if (session.metadata?.cardId) {
            console.log("🔍 Buscando cartão pelo ID nos metadados:", session.metadata.cardId)
            const { data: cardData, error: cardError } = await supabase
              .from("cards")
              .select("*")
              .eq("id", session.metadata.cardId)
              .single()

            if (cardData && !cardError) {
              card = cardData
              console.log("✅ Cartão encontrado pelos metadados da sessão")
            } else if (cardError) {
              console.log("⚠️ Erro ao buscar cartão pelos metadados:", cardError)
            }
          }
        } catch (stripeError) {
          console.error("❌ Erro ao buscar sessão do Stripe:", stripeError)
        }
      }
    }

    if (!card) {
      console.log("❌ Cartão não encontrado")
      return NextResponse.json({ success: false, error: "Cartão não encontrado" }, { status: 404 })
    }

    // Verificar o status do pagamento no Stripe se temos o ID da sessão
    if (sessionId && !paymentStatus) {
      try {
        console.log("🔍 Verificando status do pagamento no Stripe")
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        paymentStatus = session.payment_status
        console.log("✅ Status do pagamento:", paymentStatus)
      } catch (stripeError) {
        console.error("⚠️ Erro ao verificar status do pagamento:", stripeError)
        // Não falhar a requisição por causa disso
      }
    }

    // Atualizar o status do cartão para 'paid' se o pagamento foi confirmado
    if ((paymentStatus === "paid" || sessionId) && card.status === "pending") {
      console.log("🔄 Atualizando status do cartão para 'paid'")
      const { error: updateError } = await supabase
        .from("cards")
        .update({
          status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("id", card.id)

      if (updateError) {
        console.error("⚠️ Erro ao atualizar status do cartão:", updateError)
        // Não falhar a requisição por causa disso
      } else {
        console.log("✅ Status do cartão atualizado para 'paid'")
      }
    }

    console.log("✅ Retornando dados do cartão")
    return NextResponse.json({
      success: true,
      cardUrl: card.card_url,
      mensagem: card.mensagem,
      nome: card.nome,
      templateId: card.template_id,
      fotoUrl: card.foto_url,
      imageState: card.image_state,
      status: card.status,
    })
  } catch (error: any) {
    console.error("❌ Erro ao buscar cartão:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao buscar o cartão: " + (error.message || "Erro desconhecido"),
      },
      { status: 500 },
    )
  } finally {
    console.log("🏁 Finalizando processamento da requisição get-card")
  }
}

