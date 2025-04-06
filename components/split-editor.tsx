"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Maximize, Minimize, RotateCw, RefreshCw, Move, Contrast, SunMedium } from "lucide-react"

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

interface SplitEditorProps {
  templateId: number
  templateUrl: string
  imageUrl: string
  mensagem: string
  nome?: string
  initialState: ImageState
  onChange: (state: ImageState) => void
}

export default function SplitEditor({
  templateId,
  templateUrl,
  imageUrl,
  mensagem,
  nome,
  initialState,
  onChange,
}: SplitEditorProps) {
  const [state, setState] = useState<ImageState>({
    ...initialState,
    brightness: initialState.brightness || 100,
    contrast: initialState.contrast || 100,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Atualizar o estado quando as props mudarem
  useEffect(() => {
    setState({
      ...initialState,
      brightness: initialState.brightness || 100,
      contrast: initialState.contrast || 100,
    })
  }, [initialState])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Função para atualizar o estado e notificar o componente pai
  const updateState = (newState: Partial<ImageState>) => {
    const updatedState = { ...state, ...newState }
    setState(updatedState)
    onChange(updatedState)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    updateState({
      x: state.x + deltaX,
      y: state.y + deltaY,
    })

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      e.preventDefault()
      setIsDragging(true)
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    e.preventDefault()

    const deltaX = e.touches[0].clientX - dragStart.x
    const deltaY = e.touches[0].clientY - dragStart.y

    updateState({
      x: state.x + deltaX,
      y: state.y + deltaY,
    })

    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleReset = () => {
    updateState({
      x: 150,
      y: 150,
      width: 200,
      height: 200,
      rotation: 0,
      opacity: 1,
      brightness: 100,
      contrast: 100,
    })
  }

  const handleZoomIn = () => {
    updateState({
      width: state.width * 1.1,
      height: state.height * 1.1,
    })
  }

  const handleZoomOut = () => {
    updateState({
      width: state.width * 0.9,
      height: state.height * 0.9,
    })
  }

  if (!isMounted) {
    return (
      <div className="flex flex-col md:flex-row gap-6 h-[600px] animate-pulse">
        <div className="w-full md:w-1/2 bg-gray-100 rounded-lg"></div>
        <div className="w-full md:w-1/2 bg-gray-100 rounded-lg"></div>
      </div>
    )
  }

  const filterStyle = `brightness(${state.brightness}%) contrast(${state.contrast}%)`

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Preview do cartão final (lado esquerdo) */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium mb-4 text-center">Seu cartão está pronto!</h3>
        <div className="relative h-[400px] w-full max-w-[300px] mx-auto overflow-hidden rounded-lg shadow-md">
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
          {imageUrl && (
            <div
              className="absolute"
              style={{
                left: `${state.x}px`,
                top: `${state.y}px`,
                width: `${state.width}px`,
                height: `${state.height}px`,
                transform: `rotate(${state.rotation}deg)`,
                opacity: state.opacity,
                filter: filterStyle,
                pointerEvents: "none",
              }}
            >
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Imagem do usuário"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}

          {/* Mensagem personalizada */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80">
            <p className="text-center italic">{mensagem}</p>
            {nome && <p className="text-center font-medium mt-1">Para: {nome}</p>}
          </div>
        </div>

        <div className="mt-6 p-4 bg-pink-50 rounded-lg">
          <h4 className="font-medium mb-2">Detalhes do pagamento:</h4>
          <p className="text-lg font-bold text-pink-600 mb-2">R$ 4,99</p>
          <p className="text-sm text-muted-foreground">
            Pagamento único para gerar e compartilhar seu cartão personalizado.
          </p>
        </div>
      </div>

      {/* Área de edição da imagem (lado direito) */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium mb-4">Editar Imagem</h3>

        <div
          ref={editorRef}
          className="relative h-[400px] w-full bg-gray-100 rounded-lg overflow-hidden border"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* Template de fundo (versão esmaecida para edição) */}
          <div className="absolute inset-0 opacity-30">
            <Image
              src={templateUrl || `/placeholder.svg?height=600&width=400&text=Template+${templateId}`}
              alt={`Template ${templateId} (background)`}
              fill
              className="object-cover"
              style={{ pointerEvents: "none" }}
            />
          </div>

          {/* Imagem do usuário editável */}
          {imageUrl && (
            <div
              ref={imageRef}
              className="absolute"
              style={{
                left: `${state.x}px`,
                top: `${state.y}px`,
                width: `${state.width}px`,
                height: `${state.height}px`,
                transform: `rotate(${state.rotation}deg)`,
                opacity: state.opacity,
                filter: filterStyle,
                border: "2px dashed rgba(236, 72, 153, 0.5)",
                borderRadius: "4px",
              }}
            >
              <Image src={imageUrl || "/placeholder.svg"} alt="Imagem editável" fill style={{ objectFit: "contain" }} />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-2 bg-white/80 text-xs text-center">
            <Move className="inline-block h-3 w-3 mr-1" /> Arraste para mover • Use os controles abaixo para ajustar
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomIn} className="flex-1">
            <Maximize className="h-4 w-4 mr-2" />
            Aumentar
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomOut} className="flex-1">
            <Minimize className="h-4 w-4 mr-2" />
            Diminuir
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="flex-1">
            <RefreshCw className="h-4 w-4 mr-2" />
            Resetar
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <RotateCw className="h-4 w-4" /> Rotação
            </label>
            <Slider
              value={[state.rotation]}
              min={0}
              max={360}
              step={1}
              onValueChange={(value) => updateState({ rotation: value[0] })}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">Opacidade</label>
            <Slider
              value={[state.opacity * 100]}
              min={20}
              max={100}
              step={1}
              onValueChange={(value) => updateState({ opacity: value[0] / 100 })}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <SunMedium className="h-4 w-4" /> Brilho
            </label>
            <Slider
              value={[state.brightness || 100]}
              min={50}
              max={150}
              step={1}
              onValueChange={(value) => updateState({ brightness: value[0] })}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Contrast className="h-4 w-4" /> Contraste
            </label>
            <Slider
              value={[state.contrast || 100]}
              min={50}
              max={150}
              step={1}
              onValueChange={(value) => updateState({ contrast: value[0] })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}