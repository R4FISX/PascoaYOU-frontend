import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16", // Use uma versão estável e atual
})

export async function POST(request: NextRequest) {
  try {
    // Verificar se a chave do Stripe está configurada
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY não está configurada");
      return NextResponse.json(
        { success: false, error: "Configuração de pagamento incompleta" },
        { status: 500 }
      );
    }

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
              // Remova a imagem se não tiver uma URL real
              // ou substitua por uma URL válida do seu servidor
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
        templateId: templateId?.toString() || "",
        mensagem: mensagem || "",
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
  } catch (error: any) {
    console.error("Erro ao criar sessão de checkout:", error)
    // Incluir mais detalhes sobre o erro para depuração
    const errorMessage = error.message || "Falha ao processar pagamento";
    return NextResponse.json({ 
      success: false, 
      error: errorMessage 
    }, { status: 500 })
  }
}