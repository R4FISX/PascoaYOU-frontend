import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Inicializa o cliente do Supabase
const supabaseUrl = process.env.SUPABASE_URL || "https://uthophxqgveapbjvvzqd.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0aG9waHhxZ3ZlYXBianZ2enFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzQxODE3OSwiZXhwIjoyMDU4OTk0MTc5fQ.266I-yb0IoT-NOob4ob1CtwaXNcxFwnRfifRBtUPzXE"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    // Processar o upload do arquivo
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    // Validação do tipo de arquivo
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, error: "O arquivo deve ser uma imagem" }, { status: 400 })
    }

    // Converter o arquivo para um buffer
    const buffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(buffer)

    // Nome único para o arquivo
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
    const filePath = `uploads/${fileName}`

    // Verificar se o bucket existe, se não, usar um caminho padrão
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketName = buckets?.some((bucket) => bucket.name === "pascoayou") ? "pascoayou" : "default-bucket"

    // Upload para o Supabase Storage
    const { data, error } = await supabase.storage.from(bucketName).upload(filePath, fileBuffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: true,
    })

    if (error) {
      console.error("Erro no upload para o Supabase:", error)

      // Em ambiente de desenvolvimento, use um URL simulado
      if (process.env.NODE_ENV === "development") {
        return NextResponse.json({
          success: true,
          uploadUrl: `/placeholder.svg?height=400&width=300&text=Imagem+Carregada`,
          message: "Simulação de upload em ambiente de desenvolvimento",
        })
      }

      return NextResponse.json(
        { success: false, error: "Falha ao fazer upload da imagem: " + error.message },
        { status: 500 },
      )
    }

    // Gerar URL pública para a imagem
    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath)

    return NextResponse.json({
      success: true,
      uploadUrl: publicUrlData.publicUrl,
      message: "Imagem enviada com sucesso!",
    })
  } catch (error: any) {
    console.error("Erro ao fazer upload:", error)

    // Em ambiente de desenvolvimento, use um URL simulado
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({
        success: true,
        uploadUrl: `/placeholder.svg?height=400&width=300&text=Imagem+Carregada`,
        message: "Simulação de upload em ambiente de desenvolvimento",
      })
    }

    return NextResponse.json(
      { success: false, error: "Falha ao processar o upload: " + (error.message || "Erro desconhecido") },
      { status: 500 },
    )
  }
}

// Para gerar URLs pré-assinadas (presigned URLs) para upload direto
export async function GET() {
  try {
    // Em ambiente de desenvolvimento, retornar uma URL simulada
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({
        success: true,
        presignedUrl: "#",
        path: "uploads/simulado.jpg",
        message: "URL de upload simulada em ambiente de desenvolvimento",
      })
    }

    // Verificar se o bucket existe
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketName = buckets?.some((bucket) => bucket.name === "pascoayou") ? "pascoayou" : "default-bucket"

    // Gerar um nome de arquivo único
    const fileName = `uploads/${Date.now()}-direct-upload.jpg`

    // Gerar URL pré-assinada para upload direto
    const { data, error } = await supabase.storage.from(bucketName).createSignedUploadUrl(fileName)

    if (error) {
      console.error("Erro ao gerar URL assinada:", error)
      return NextResponse.json(
        { success: false, error: "Falha ao gerar URL de upload: " + error.message },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      presignedUrl: data.signedUrl,
      path: fileName,
      message: "URL de upload gerada com sucesso!",
    })
  } catch (error: any) {
    console.error("Erro ao gerar URL de upload:", error)
    return NextResponse.json(
      { success: false, error: "Falha ao gerar URL de upload: " + (error.message || "Erro desconhecido") },
      { status: 500 },
    )
  }
}

