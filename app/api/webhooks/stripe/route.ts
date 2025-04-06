import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51RALWZD5JvW9zM7PPkysHAwyEf1i2t5nErXDCGEajiaJI5e47SUhkUwIPzb0KyGQFiyeIW9G8GoJ622JeYsHiFq200EHOZtTot", {
  apiVersion: "2025-03-31.basil",
})

// Inicializa o cliente do Supabase
const supabaseUrl = process.env.SUPABASE_URL || "https://uthophxqgveapbjvvzqd.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0aG9waHhxZ3ZlYXBianZ2enFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzQxODE3OSwiZXhwIjoyMDU4OTk0MTc5fQ.266I-yb0IoT-NOob4ob1CtwaXNcxFwnRfifRBtUPzXE"
const supabase = createClient(supabaseUrl, supabaseKey)

// Webhook para receber eventos do Stripe
export async function POST(request: NextRequest) {
  const payload = await request.text()
  const sig = request.headers.get("stripe-signature") || ""

  let event

  try {
    // Verificar a assinatura do webhook
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET || "")
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ success: false, error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Processar o evento
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    // Extrair metadados da sessão
    const { templateId, mensagem, nome, fotoUrl } = session.metadata || {}

    // Registrar o pagamento no banco de dados
    try {
      const { data, error } = await supabase.from("payments").insert([
        {
          session_id: session.id,
          customer_email: session.customer_email,
          amount: session.amount_total,
          status: session.payment_status,
          template_id: templateId,
          mensagem,
          nome,
          foto_url: fotoUrl,
        },
      ])

      if (error) {
        console.error("Erro ao registrar pagamento:", error)
      }
    } catch (error) {
      console.error("Falha ao registrar pagamento:", error)
    }
  }

  return NextResponse.json({ received: true })
}

