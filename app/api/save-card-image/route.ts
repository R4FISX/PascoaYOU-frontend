import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

// Inicializa o cliente do Supabase
const supabaseUrl = process.env.SUPABASE_URL || "https://uthophxqgveapbjvvzqd.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0aG9waHhxZ3ZlYXBianZ2enFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzQxODE3OSwiZXhwIjoyMDU4OTk0MTc5fQ.266I-yb0IoT-NOob4ob1CtwaXNcxFwnRfifRBtUPzXE"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageDataUrl, templateId, mensagem, nome, fotoUrl, imageState } = body

    // Validação básica
    if (!imageDataUrl) {
      return NextResponse.json({ success: false, error: "Imagem do cartão é obrigatória" }, { status: 400 })
    }

    // Gerar um ID único para o cartão
    const cardId = uuidv4()

    // Extrair os dados da imagem base64
    const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, "")
    const buffer = Buffer.from(base64Data, "base64")

    // Nome do arquivo no storage
    const fileName = `cards/${cardId}.png`

    // Verificar se o bucket existe
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketName = buckets?.some((bucket) => bucket.name === "easter-cards") ? "easter-cards" : "default-bucket"

    // Upload da imagem para o Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage.from(bucketName).upload(fileName, buffer, {
      contentType: "image/png",
      cacheControl: "3600",
      upsert: true,
    })

    if (uploadError) {
      console.error("Erro ao fazer upload da imagem:", uploadError)
      return NextResponse.json(
        {
          success: false,
          error: "Falha ao salvar a imagem do cartão: " + uploadError.message,
        },
        { status: 500 },
      )
    }

    // Obter a URL pública da imagem
    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(fileName)
    const imageUrl = publicUrlData.publicUrl

    // Salvar os dados do cartão no banco de dados
    const { data: cardData, error: cardError } = await supabase
      .from("cards")
      .insert([
        {
          id: cardId,
          template_id: templateId,
          mensagem,
          nome: nome || null,
          foto_url: fotoUrl || null,
          image_state: imageState || null,
          card_url: imageUrl,
          status: "pending", // Pendente de pagamento
        },
      ])
      .select()

    if (cardError) {
      console.error("Erro ao salvar dados do cartão:", cardError)
      return NextResponse.json(
        {
          success: false,
          error: "Falha ao salvar os dados do cartão: " + cardError.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      cardId,
      imageUrl,
      message: "Imagem do cartão salva com sucesso!",
    })
  } catch (error: any) {
    console.error("Erro ao salvar imagem do cartão:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao processar a imagem do cartão: " + (error.message || "Erro desconhecido"),
      },
      { status: 500 },
    )
  }
}

