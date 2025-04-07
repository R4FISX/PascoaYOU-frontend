import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Inicializa o cliente do Supabase
const supabaseUrl = process.env.SUPABASE_URL || "https://uthophxqgveapbjvvzqd.supabase.co"
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0aG9waHhxZ3ZlYXBianZ2enFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzQxODE3OSwiZXhwIjoyMDU4OTk0MTc5fQ.266I-yb0IoT-NOob4ob1CtwaXNcxFwnRfifRBtUPzXE"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  console.log("🔄 Iniciando processamento da requisição save-card-image")

  try {
    const body = await request.json()
    console.log("📦 Payload recebido:", {
      templateId: body.templateId,
      mensagem: body.mensagem ? "presente" : "ausente",
      nome: body.nome || "não informado",
      fotoUrl: body.fotoUrl ? "presente" : "ausente",
      imageState: body.imageState ? "presente" : "ausente",
      imageDataUrl: body.imageDataUrl ? "presente (base64)" : "ausente",
      isPreview: body.isPreview === true ? "sim" : "não",
    })

    const { imageDataUrl, templateId, mensagem, nome, fotoUrl, imageState } = body
    const isPreview = body.isPreview === true

    // Validação básica
    if (!templateId) {
      console.log("❌ Validação falhou: ID do template é obrigatório")
      return NextResponse.json({ success: false, error: "ID do template é obrigatório" }, { status: 400 })
    }

    if (!mensagem || mensagem.trim() === "") {
      console.log("❌ Validação falhou: Mensagem é obrigatória")
      return NextResponse.json({ success: false, error: "Mensagem é obrigatória" }, { status: 400 })
    }

    // No modo preview, retornar um ID simulado sem salvar no banco
    if (isPreview) {
      console.log("🖼️ Modo preview detectado, retornando ID simulado")
      const previewId = `preview_${uuidv4()}`

      return NextResponse.json({
        success: true,
        cardId: previewId,
        imageUrl: `/placeholder.svg?height=600&width=400&text=Preview+${templateId}`,
        message: "Preview do cartão gerado com sucesso!",
      })
    }

    // Validação específica para o fluxo de checkout
    if (!imageDataUrl) {
      console.log("❌ Validação falhou: Imagem do cartão é obrigatória para checkout")
      return NextResponse.json({ success: false, error: "Imagem do cartão é obrigatória" }, { status: 400 })
    }

    // Gerar um ID único para o cartão
    const cardId = uuidv4()
    console.log("✅ ID do cartão gerado:", cardId)

    // Extrair os dados da imagem base64
    const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, "")
    const buffer = Buffer.from(base64Data, "base64")

    // Nome do arquivo no storage
    const fileName = `cards/${cardId}.png`

    // Verificar se o bucket existe
    console.log("🔍 Verificando buckets disponíveis")
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

    if (bucketsError) {
      console.error("❌ Erro ao listar buckets:", bucketsError)
      return NextResponse.json(
        {
          success: false,
          error: "Falha ao verificar buckets de armazenamento: " + bucketsError.message,
        },
        { status: 500 },
      )
    }

    const bucketName = buckets?.some((bucket) => bucket.name === "easter-cards") ? "easter-cards" : "default-bucket"
    console.log("✅ Bucket selecionado:", bucketName)

    // Upload da imagem para o Supabase Storage
    console.log("🔄 Iniciando upload da imagem para o Storage")
    const { data: uploadData, error: uploadError } = await supabase.storage.from(bucketName).upload(fileName, buffer, {
      contentType: "image/png",
      cacheControl: "3600",
      upsert: true,
    })

    if (uploadError) {
      console.error("❌ Erro ao fazer upload da imagem:", uploadError)
      return NextResponse.json(
        {
          success: false,
          error: "Falha ao salvar a imagem do cartão: " + uploadError.message,
        },
        { status: 500 },
      )
    }

    console.log("✅ Upload da imagem concluído:", fileName)

    // Obter a URL pública da imagem
    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(fileName)
    const imageUrl = publicUrlData.publicUrl
    console.log("✅ URL pública gerada:", imageUrl)

    // Salvar os dados do cartão no banco de dados
    console.log("🔄 Salvando dados do cartão no banco")
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
      console.error("❌ Erro ao salvar dados do cartão:", cardError)
      return NextResponse.json(
        {
          success: false,
          error: "Falha ao salvar os dados do cartão: " + cardError.message,
        },
        { status: 500 },
      )
    }

    console.log("✅ Dados do cartão salvos com sucesso")

    return NextResponse.json({
      success: true,
      cardId,
      imageUrl,
      message: "Imagem do cartão salva com sucesso!",
    })
  } catch (error: any) {
    console.error("❌ Erro ao salvar imagem do cartão:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao processar a imagem do cartão: " + (error.message || "Erro desconhecido"),
      },
      { status: 500 },
    )
  } finally {
    console.log("🏁 Finalizando processamento da requisição save-card-image")
  }
}

