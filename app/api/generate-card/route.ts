import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"
import { v4 as uuidv4 } from "uuid"

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

// Função auxiliar para validar os dados de entrada
function validateInput(body: any, isPreview: boolean) {
  // Validação comum para ambos os fluxos
  if (!body.templateId) {
    return { valid: false, error: "ID do template é obrigatório" }
  }

  if (!body.mensagem || body.mensagem.trim() === "") {
    return { valid: false, error: "Mensagem é obrigatória" }
  }

  // Validação específica para o fluxo de checkout
  if (!isPreview) {
    if (!body.email || body.email.trim() === "") {
      return { valid: false, error: "Email é obrigatório para checkout" }
    }

    if (!body.cardId) {
      return { valid: false, error: "ID do cartão é obrigatório para checkout" }
    }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  console.log("🔄 Iniciando processamento da requisição generate-card")

  try {
    const body = await request.json()
    console.log("📦 Payload recebido:", {
      ...body,
      // Omitir dados sensíveis ou muito grandes nos logs
      imageState: body.imageState ? "presente" : "ausente",
      imageDataUrl: body.imageDataUrl ? "presente (base64)" : "ausente",
    })

    const { templateId, mensagem, nome, fotoUrl, imageState, sessionId, email, cardId } = body
    const isPreview = body.isPreview === true

    console.log(`🔍 Modo: ${isPreview ? "Preview" : "Checkout"}`)

    // Validar os dados de entrada
    const validation = validateInput(body, isPreview)
    if (!validation.valid) {
      console.log("❌ Validação falhou:", validation.error)
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    // === FLUXO DE PREVIEW ===
    if (isPreview) {
      console.log("🖼️ Gerando preview do cartão")

      // Simular processamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Gerar um ID temporário para o preview
      const previewId = `preview_${uuidv4()}`

      // Retornar dados de preview sem salvar no banco ou criar sessão
      return NextResponse.json({
        success: true,
        previewId,
        previewUrl: `/placeholder.svg?height=600&width=400&text=Preview+${templateId}`,
        mensagem,
        nome: nome || null,
        templateId,
        templateUrl: `/placeholder.svg?height=600&width=400&text=Template+${templateId}`,
        fotoUrl: fotoUrl || null,
        imageState: imageState || null,
      })
    }

    // === FLUXO DE CHECKOUT ===
    console.log("💳 Iniciando fluxo de checkout")

    // Verificar se o cartão existe no banco de dados
    const { data: cardData, error: cardError } = await supabase.from("cards").select("*").eq("id", cardId).single()

    if (cardError || !cardData) {
      console.error("❌ Erro ao buscar cartão:", cardError)
      return NextResponse.json(
        {
          success: false,
          error: "Cartão não encontrado. Por favor, tente novamente.",
        },
        { status: 404 },
      )
    }

    console.log("✅ Cartão encontrado:", cardData.id)

    // Criar uma sessão de checkout no Stripe
    console.log("🔄 Criando sessão de checkout no Stripe")
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Cartão de Páscoa Personalizado",
              description: "Acesso à criação de cartões de Páscoa personalizados",
              images: [cardData.card_url || "https://example.com/easter-card-preview.jpg"],
            },
            unit_amount: 499, // R$ 4,99 em centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.DOMAIN || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}&card_id=${cardId}`,
      cancel_url: `${process.env.DOMAIN || "http://localhost:3000"}/editor?canceled=true`,
      customer_email: email,
      metadata: {
        cardId,
        templateId: templateId.toString(),
        mensagem,
        nome: nome || "",
        fotoUrl: fotoUrl || "",
      },
    })

    console.log("✅ Sessão de checkout criada:", session.id)

    // Atualizar o registro do cartão com o ID da sessão do Stripe
    const { error: updateError } = await supabase
      .from("cards")
      .update({
        session_id: session.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", cardId)

    if (updateError) {
      console.error("⚠️ Erro ao atualizar registro do cartão:", updateError)
      // Não falhar a requisição por causa disso, apenas logar o erro
    } else {
      console.log("✅ Registro do cartão atualizado com session_id")
    }

    // Retornar os dados da sessão de checkout
    return NextResponse.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url,
      cardId,
    })
  } catch (error: any) {
    console.error("❌ Erro ao processar requisição:", error)

    // Determinar o código de status apropriado
    let statusCode = 500
    if (error.type === "StripeInvalidRequestError") {
      statusCode = 400
    }

    return NextResponse.json(
      {
        success: false,
        error: `Falha ao processar a requisição: ${error.message || "Erro desconhecido"}`,
      },
      { status: statusCode },
    )
  } finally {
    console.log("🏁 Finalizando processamento da requisição generate-card")
  }
}

