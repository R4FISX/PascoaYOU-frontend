"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface ImageState {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  brightness?: number
  contrast?: number
}

interface CardPreviewProps {
  templateId: number
  templateUrl: string
  imageUrl?: string
  mensagem: string
  nome?: string
  imageState?: ImageState
  className?: string
  showShadow?: boolean
}

export default function CardPreview({
  templateId,
  templateUrl,
  imageUrl,
  mensagem,
  nome,
  imageState,
  className = "",
  showShadow = true,
}: CardPreviewProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div
        className={`relative h-[400px] w-full max-w-[300px] mx-auto bg-gray-100 rounded-lg animate-pulse ${className}`}
      ></div>
    )
  }

  // Determinar qual template usar baseado no ID
  // Isso é uma simulação - em produção, você teria uma lógica mais robusta
  const getTemplateStyle = () => {
    switch (templateId) {
      case 1: // Religioso
        return {
          bgColor: "bg-blue-50",
          textColor: "text-blue-800",
          borderColor: "border-blue-200",
        }
      case 2: // Divertido
        return {
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
        }
      case 3: // Infantil
        return {
          bgColor: "bg-cyan-50",
          textColor: "text-cyan-800",
          borderColor: "border-cyan-200",
        }
      case 4: // Elegante
        return {
          bgColor: "bg-purple-50",
          textColor: "text-purple-800",
          borderColor: "border-purple-200",
        }
      case 5: // Natureza
        return {
          bgColor: "bg-green-50",
          textColor: "text-green-800",
          borderColor: "border-green-200",
        }
      case 6: // Minimalista
        return {
          bgColor: "bg-gray-50",
          textColor: "text-gray-800",
          borderColor: "border-gray-200",
        }
      default:
        return {
          bgColor: "bg-pink-50",
          textColor: "text-pink-800",
          borderColor: "border-pink-200",
        }
    }
  }

  const style = getTemplateStyle()
  const filterStyle = imageState
    ? `brightness(${imageState.brightness}%) contrast(${imageState.contrast}%)`
    : "brightness(100%) contrast(100%)"

  return (
    <div
      className={`relative h-[400px] w-full max-w-[300px] mx-auto overflow-hidden rounded-lg ${style.bgColor} ${showShadow ? "shadow-lg" : ""} ${className}`}
    >
      {/* Template de fundo */}
      <div className="absolute inset-0">
        <Image
          src={templateUrl || `/placeholder.svg?height=600&width=400&text=Template+${templateId}`}
          alt={`Template ${templateId}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Imagem do usuário posicionada conforme os ajustes */}
      {imageUrl && imageState && (
        <div
          className="absolute"
          style={{
            left: `${imageState.x}px`,
            top: `${imageState.y}px`,
            width: `${imageState.width}px`,
            height: `${imageState.height}px`,
            transform: `rotate(${imageState.rotation}deg)`,
            opacity: imageState.opacity,
            filter: filterStyle,
            pointerEvents: "none",
          }}
        >
          <Image src={imageUrl || "/placeholder.svg"} alt="Imagem do usuário" fill style={{ objectFit: "contain" }} />
        </div>
      )}

      {/* Mensagem personalizada */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80">
        <p className="text-center italic">{mensagem}</p>
        {nome && <p className="text-center font-medium mt-1">Para: {nome}</p>}
      </div>
    </div>
  )
}