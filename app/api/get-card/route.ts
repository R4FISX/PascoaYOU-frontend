import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabase } from "@/lib/supabase"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const cardId = searchParams.get("cardId")
    const sessionId = searchParams.get("sessionId")

    if (!cardId && !sessionId) {
      return NextResponse.json(
        {
          success: false,
          error: "cardId ou sessionId é obrigatório",
        },
        { status: 400 },
      )
    }

    let card

    // Try to find card by ID first
    if (cardId) {
      const { data, error } = await supabase.from("cards").select("*").eq("id", cardId).single()

      if (!error && data) {
        card = data
      } else {
        console.error("Error fetching card by ID:", error)
      }
    }

    // If not found by ID or we're using sessionId, try to find by session
    if (!card && sessionId) {
      const { data, error } = await supabase.from("cards").select("*").eq("session_id", sessionId).single()

      if (!error && data) {
        card = data
      } else {
        console.error("Error fetching card by session ID:", error)

        // If still not found, try to get cardId from Stripe session metadata
        try {
          const session = await stripe.checkout.sessions.retrieve(sessionId)

          if (session.metadata?.cardId) {
            const { data: cardData, error: cardError } = await supabase
              .from("cards")
              .select("*")
              .eq("id", session.metadata.cardId)
              .single()

            if (!cardError && cardData) {
              card = cardData

              // Update the session_id if it's not set
              if (!card.session_id) {
                await supabase.from("cards").update({ session_id: sessionId }).eq("id", card.id)
              }
            }
          }
        } catch (stripeError) {
          console.error("Error fetching Stripe session:", stripeError)
        }
      }
    }

    if (!card) {
      return NextResponse.json(
        {
          success: false,
          error: "Cartão não encontrado",
        },
        { status: 404 },
      )
    }

    // If we have a sessionId, check payment status and update card status if needed
    if (sessionId && card.status === "pending") {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status === "paid") {
          // Update card status to paid
          const { error: updateError } = await supabase
            .from("cards")
            .update({
              status: "paid",
              // In a real implementation, you would generate the final card image here
              // and update the card_url field
              card_url: card.photo_url, // For now, just use the uploaded image
            })
            .eq("id", card.id)

          if (updateError) {
            console.error("Error updating card status:", updateError)
          } else {
            card.status = "paid"
            card.card_url = card.photo_url
          }
        }
      } catch (stripeError) {
        console.error("Error checking payment status:", stripeError)
      }
    }

    return NextResponse.json({
      success: true,
      card,
    })
  } catch (error) {
    console.error("Error in get-card:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

