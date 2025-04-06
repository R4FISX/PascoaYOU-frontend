import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"
// Nota: Em um ambiente real, você precisaria instalar e importar
// bibliotecas como 'canvas' ou 'sharp' para manipulação de imagens

// Inicializa o cliente do Supabase
const supabaseUrl = process.env.SUPABASE_URL || "https://uthophxqgveapbjvvzqd.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0aG9waHhxZ3ZlYXBianZ2enFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzQxODE3OSwiZXhwIjoyMDU4OTk0MTc5fQ.266I-yb0IoT-NOob4ob1CtwaXNcxFwnRfifRBtUPzXE"
const supabase = createClient(supabaseUrl, supabaseKey)

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51RALWZD5JvW9zM7PPkysHAwyEf1i2t5nErXDCGEajiaJI5e47SUhkUwIPzb0KyGQFiyeIW9G8GoJ622JeYsHiFq200EHOZtTot", {
  apiVersion: "2025-03-31.basil",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { templateId, mensagem, nome, fotoUrl, imageState, sessionId, isPreview } = body

    // Validação básica
    if (!templateId || !mensagem) {
      return NextResponse.json({ success: false, error: "Template e mensagem são obrigatórios" }, { status: 400 })
    }

    // Se não for preview, verificar o pagamento
    if (!isPreview && sessionId) {
      // Verificar se o pagamento foi concluído
      const session = await stripe.checkout.sessions.retrieve(sessionId)

      if (session.payment_status !== "paid") {
        return NextResponse.json({ success: false, error: "Pagamento não confirmado" }, { status: 400 })
      }
    }

    // Simulação do processamento de geração do cartão
    // Em um ambiente real, aqui você usaria bibliotecas como 'canvas' ou 'sharp'
    // para combinar o template com a mensagem, nome e foto do usuário
    // Incluindo o posicionamento da imagem conforme definido em imageState

    // Simula um tempo de processamento
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Gerar um nome único para o cartão
    const cardFileName = `card-${templateId}-${Date.now()}.jpg`
    const cardPath = `generated/${cardFileName}`

    // Em um ambiente real, aqui você geraria a imagem do cartão
    // e faria o upload para o Supabase Storage
    // Usando o imageState para posicionar a imagem corretamente no template

    // URL simulada do cartão gerado para ambiente de desenvolvimento
    let cardUrl = `/generated-cards/${cardFileName}`

    // Se não for preview e o ambiente for de produção, salvar no Supabase
    if (!isPreview) {
      // Aqui você salvaria a imagem gerada no Supabase Storage
      // Este é um exemplo simplificado, em produção você teria o buffer da imagem gerada

      // Exemplo de registro no banco de dados (opcional)
      const { data: cardData, error: cardError } = await supabase
        .from("cards")
        .insert([
          {
            template_id: templateId,
            mensagem,
            nome: nome || null,
            foto_url: fotoUrl || null,
            image_state: imageState || null,
            card_path: cardPath,
            session_id: sessionId || null,
          },
        ])
        .select()

      if (cardError) {
        console.error("Erro ao salvar dados do cartão:", cardError)
      }

      // URL real do cartão gerado em produção seria obtida do Supabase
      cardUrl =
        process.env.NODE_ENV === "production" ? `${process.env.SUPABASE_STORAGE_URL}/pascoayou/${cardPath}` : cardUrl
    }

    return NextResponse.json({
      success: true,
      cardUrl,
      previewUrl: "/placeholder.svg?height=600&width=400&text=Cartão+Gerado",
      mensagem: isPreview ? "Preview gerado com sucesso!" : "Cartão gerado com sucesso!",
    })
  } catch (error) {
    console.error("Erro ao gerar cartão:", error)
    return NextResponse.json({ success: false, error: "Falha ao gerar o cartão" }, { status: 500 })
  }
}

