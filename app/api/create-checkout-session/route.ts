import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
    "sk_test_51RALWZD5JvW9zM7PPkysHAwyEf1i2t5nErXDCGEajiaJI5e47SUhkUwIPzb0KyGQFiyeIW9G8GoJ622JeYsHiFq200EHOZtTot",
  {
    apiVersion: "2023-10-16",
  },
)

// Inicializa o cliente do Supabase
const supabaseUrl = process.env.SUPABASE_URL || "https://uthophxqgveapbjvvzqd.supabase.co"
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0aG9waHhxZ3ZlYXBianZ2enFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzQxODE3OSwiZXhwIjoyMDU4OTk0MTc5fQ.266I-yb0IoT-NOob4ob1CtwaXNcxFwnRfifRBtUPzXE"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, templateId, mensagem, nome, fotoUrl, imageState, cardId } = body

    // Validação básica
    if (!email) {
      return NextResponse.json({ success: false, error: "Email é obrigatório" }, { status: 400 })
    }

    if (!cardId) {
      return NextResponse.json({ success: false, error: "ID do cartão é obrigatório" }, { status: 400 })
    }

    // Criar uma sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Cartão de Páscoa Personalizado",
              description: "Acesso à criação de cartões de Páscoa personalizados",
              images: ["https://example.com/easter-card-preview.jpg"], // Substitua por uma imagem real
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
        imageState: imageState ? JSON.stringify(imageState) : "",
      },
    })

    // Atualizar o registro do cartão com o ID da sessão do Stripe
    const { error: updateError } = await supabase
      .from("cards")
      .update({
        session_id: session.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", cardId)

    if (updateError) {
      console.error("Erro ao atualizar registro do cartão:", updateError)
    }

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url,
    })
  } catch (error: any) {
    console.error("Erro ao criar sessão de checkout:", error)
    return NextResponse.json(
      { success: false, error: "Falha ao processar pagamento: " + (error.message || "Erro desconhecido") },
      { status: 500 },
    )
  }
}

