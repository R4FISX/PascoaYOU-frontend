import { NextResponse } from "next/server"

// Simulação de dados de templates
const templates = [
  {
    id: "template1",
    name: "Coelho Feliz",
    description: "Um coelho animado que pula e revela sua mensagem de Páscoa.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "Mensagem de Páscoa",
    free: true,
  },
  {
    id: "template2",
    name: "Caça aos Ovos",
    description: "Um jogo interativo onde o destinatário procura ovos escondidos para revelar sua mensagem.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "Interativo",
    free: false,
  },
  {
    id: "template3",
    name: "Cesta de Páscoa",
    description: "Uma cesta que se abre revelando chocolates e sua mensagem personalizada.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "Boas Festas",
    free: true,
  },
  {
    id: "template4",
    name: "Ovos Decorados",
    description: "Ovos coloridos que se quebram para mostrar fotos e mensagens especiais.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "Mensagem de Páscoa",
    free: false,
  },
  {
    id: "template5",
    name: "Jardim de Páscoa",
    description: "Um jardim primaveril que floresce com sua mensagem de Páscoa.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "Boas Festas",
    free: true,
  },
  {
    id: "template6",
    name: "Ressurreição",
    description: "Uma animação inspiradora celebrando o verdadeiro significado da Páscoa.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "Feliz Ressurreição",
    free: false,
  },
]

export async function GET() {
  // Simular um pequeno atraso para demonstrar carregamento
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(templates)
}

