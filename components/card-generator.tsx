"use client"

import { useRef, useEffect } from "react"
import html2canvas from "html2canvas"
import CardPreview from "./card-preview"

interface CardGeneratorProps {
  templateId: number
  templateUrl: string
  imageUrl?: string
  mensagem: string
  nome?: string
  imageState?: any
  onGenerate: (imageDataUrl: string) => void
  className?: string
}

export default function CardGenerator({
  templateId,
  templateUrl,
  imageUrl,
  mensagem,
  nome,
  imageState,
  onGenerate,
  className = "",
}: CardGeneratorProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Função para gerar a imagem do cartão usando html2canvas
  const generateCardImage = async () => {
    if (!cardRef.current) return null

    try {
      // Capturar o elemento com html2canvas
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,      // Para imagens de outros domínios
        scale: 2,           // Qualidade melhorada
        backgroundColor: null, // Fundo transparente
        logging: false,
      })

      // Converter o canvas para URL de dados (base64)
      const imageDataUrl = canvas.toDataURL("image/png")
      onGenerate(imageDataUrl)
      return imageDataUrl
    } catch (error) {
      console.error("Erro ao gerar imagem do cartão:", error)
      return null
    }
  }

  // Expor a função de geração para o componente pai
  useEffect(() => {
    if (cardRef.current) {
      // @ts-ignore - Adicionando a função ao elemento para acesso externo
      cardRef.current.generateImage = generateCardImage
    }
  }, [templateId, templateUrl, imageUrl, mensagem, nome, imageState])

  return (
    <div className={className}>
      <div ref={cardRef} className="card-container">
        <CardPreview
          templateId={templateId}
          templateUrl={templateUrl}
          imageUrl={imageUrl}
          mensagem={mensagem}
          nome={nome}
          imageState={imageState}
          showShadow={false}
        />
      </div>
    </div>
  )
}