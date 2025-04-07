import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabase } from "@/lib/supabase"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { cardId, email, isPreview } = await request.json()

    console.log("Generate card request:", { cardId, email, isPreview })

    // Handle preview mode
    if (isPreview) {
      // For preview, we just return a mock URL
      // In a real implementation, you might generate a temporary preview image

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return NextResponse.json({
        success: true,
        previewId: `preview_${cardId || Date.now()}`,
        previewUrl: "/placeholder.svg?height=600&width=800&text=Preview+do+Cartão",
      })
    }

    // For actual checkout, validate required fields
    if (!cardId) {
      return NextResponse.json(
        {
          success: false,
          error: "ID do cartão é obrigatório",
        },
        { status: 400 },
      )
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email é obrigatório para checkout",
        },
        { status: 400 },
      )
    }

    // Get card data from database
    const { data: cardData, error: cardError } = await supabase.from("cards").select("*").eq("id", cardId).single()

    if (cardError || !cardData) {
      console.error("Error fetching card data:", cardError)
      return NextResponse.json(
        {
          success: false,
          error: "Cartão não encontrado",
        },
        { status: 404 },
      )
    }

    // Update email if not already set
    if (!cardData.email && email) {
      const { error: updateError } = await supabase.from("cards").update({ email }).eq("id", cardId)

      if (updateError) {
        console.error("Error updating email:", updateError)
      }
    }

    // Create Stripe checkout session
    const domain = process.env.DOMAIN || "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Cartão de Páscoa Personalizado",
              description: "Cartão de Páscoa digital personalizado para TikTok e Instagram",
            },
            unit_amount: 499, // R$ 4.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/editor`,
      customer_email: email,
      metadata: {
        cardId: cardId,
      },
    })

    // Update card with session ID
    const { error: updateError } = await supabase
      .from("cards")
      .update({
        session_id: session.id,
        email: email,
      })
      .eq("id", cardId)

    if (updateError) {
      console.error("Error updating session ID:", updateError)
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    })
  } catch (error) {
    console.error("Error in generate-card:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

