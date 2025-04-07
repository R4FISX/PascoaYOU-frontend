import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { supabase } from "@/lib/supabase"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { image, templateId, message, name, email, imageState } = await request.json()

    // Validate required fields
    if (!image) {
      return NextResponse.json(
        {
          success: false,
          error: "Imagem do cartão é obrigatória",
        },
        { status: 400 },
      )
    }

    if (!templateId) {
      return NextResponse.json(
        {
          success: false,
          error: "Template é obrigatório",
        },
        { status: 400 },
      )
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Mensagem é obrigatória",
        },
        { status: 400 },
      )
    }

    // Generate a unique ID for the card
    const cardId = uuidv4()

    // Convert base64 image to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "")
    const buffer = Buffer.from(base64Data, "base64")

    // Upload image to Supabase Storage
    const fileName = `${cardId}.png`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("easter-cards")
      .upload(fileName, buffer, {
        contentType: "image/png",
        upsert: true,
      })

    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao fazer upload da imagem",
        },
        { status: 500 },
      )
    }

    // Get public URL for the uploaded image
    const {
      data: { publicUrl },
    } = supabase.storage.from("easter-cards").getPublicUrl(fileName)

    // Save card data to database
    const { data: cardData, error: cardError } = await supabase
      .from("cards")
      .insert({
        id: cardId,
        template_id: templateId,
        message: message,
        name: name || null,
        email: email || null,
        photo_url: publicUrl,
        image_state: imageState || "{}",
        status: "pending",
      })
      .select()

    if (cardError) {
      console.error("Error saving card data:", cardError)
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao salvar dados do cartão",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      cardId: cardId,
      imageUrl: publicUrl,
    })
  } catch (error) {
    console.error("Error in save-card-image:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

