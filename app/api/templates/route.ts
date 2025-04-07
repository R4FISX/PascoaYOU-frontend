import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Dados simulados dos templates
const templates = [
  {
    id: 1,
    nome: "Religioso",
    previewUrl: "/images/templates/religioso.jpg",
    descricao: "Template com símbolos religiosos da Páscoa, ideal para mensagens de fé e reflexão.",
  },
  {
    id: 2,
    nome: "Divertido",
    previewUrl: "/images/templates/divertido.jpg",
    descricao: "Design alegre e colorido com coelhinhos e ovos, perfeito para mensagens descontraídas.",
  },
  {
    id: 3,
    nome: "Infantil",
    previewUrl: "/images/templates/infantil.jpg",
    descricao: "Template com desenhos animados e cores vibrantes, especial para crianças.",
  },
  {
    id: 4,
    nome: "Elegante",
    previewUrl: "/images/templates/elegante.jpg",
    descricao: "Design sofisticado com tons suaves e detalhes dourados para uma mensagem mais formal.",
  },
  {
    id: 5,
    nome: "Natureza",
    previewUrl: "/images/templates/natureza.jpg",
    descricao: "Template com flores e elementos da primavera, simbolizando renovação.",
  },
  {
    id: 6,
    nome: "Minimalista",
    previewUrl: "/images/templates/minimalista.jpg",
    descricao: "Design clean e moderno, com poucos elementos para destacar sua mensagem.",
  },
]

export async function GET() {
  try {
    // Simula um pequeno atraso para emular uma chamada de API real
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({
      success: true,
      templates,
    })
  } catch (error) {
    console.error("Erro ao buscar templates:", error)
    return NextResponse.json({ success: false, error: "Falha ao carregar os templates" }, { status: 500 })
  }
}

