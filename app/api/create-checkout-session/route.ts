import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51RALWZD5JvW9zM7PPkysHAwyEf1i2t5nErXDCGEajiaJI5e47SUhkUwIPzb0KyGQFiyeIW9G8GoJ622JeYsHiFq200EHOZtTot", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, templateId, mensagem, nome, fotoUrl, imageState } = body

    // Validação básica
    if (!email) {
      return NextResponse.json({ success: false, error: "Email é obrigatório" }, { status: 400 })
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
      success_url: `${process.env.DOMAIN || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN || "http://localhost:3000"}/editor?canceled=true`,
      customer_email: email,
      metadata: {
        templateId: templateId.toString(),
        mensagem,
        nome: nome || "",
        fotoUrl: fotoUrl || "",
        imageState: imageState ? JSON.stringify(imageState) : "",
      },
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url,
    })
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error)
    return NextResponse.json({ success: false, error: "Falha ao processar pagamento" }, { status: 500 })
  }
}