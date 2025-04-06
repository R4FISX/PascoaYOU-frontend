"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { RotateCw, ZoomIn, RefreshCw, Contrast, SunMedium, Maximize, Minimize } from "lucide-react"

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

interface SimpleImageEditorProps {
  imageUrl: string
  initialState: ImageState
  onChange: (state: ImageState) => void
  onReset?: () => void
}

export default function SimpleImageEditor({ imageUrl, initialState, onChange, onReset }: SimpleImageEditorProps) {
  const [state, setState] = useState<ImageState>({
    ...initialState,
    brightness: initialState.brightness || 100,
    contrast: initialState.contrast || 100,
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [originalState, setOriginalState] = useState<ImageState | null>(null)

  // Salvar o estado original para poder resetar
  useEffect(() => {
    if (!originalState) {
      setOriginalState({
        ...initialState,
        brightness: initialState.brightness || 100,
        contrast: initialState.contrast || 100,
      })
    }
  }, [initialState, originalState])

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

    // Salvar o estado no localStorage
    const savedState = localStorage.getItem("imageEditorState")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        setState(parsedState)
        onChange(parsedState)
      } catch (error) {
        console.error("Erro ao carregar estado salvo:", error)
      }
    }

    // Limpar o estado quando o componente for desmontado
    return () => {
      localStorage.removeItem("imageEditorState")
    }
  }, [])

  // Função para atualizar o estado e notificar o componente pai
  const updateState = (newState: Partial<ImageState>) => {
    const updatedState = { ...state, ...newState }
    setState(updatedState)
    onChange(updatedState)

    // Salvar o estado no localStorage
    localStorage.setItem("imageEditorState", JSON.stringify(updatedState))
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
    if (originalState) {
      setState(originalState)
      onChange(originalState)
      localStorage.removeItem("imageEditorState")
    }

    if (onReset) {
      onReset()
    }
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
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Carregando editor de imagem...</p>
        </div>
      </div>
    )
  }

  const filterStyle = `brightness(${state.brightness}%) contrast(${state.contrast}%)`

  return (
    <div className="space-y-4">
      <div ref={containerRef} className="border rounded-lg overflow-hidden bg-white">
        <div
          className="w-full h-[400px] bg-gray-100 relative overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
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
            }}
          >
            <Image src={imageUrl || "/placeholder.svg"} alt="Imagem editável" fill style={{ objectFit: "contain" }} />
          </div>
        </div>
        <div className="p-2 text-xs text-center text-muted-foreground">
          Arraste para mover • Use os controles abaixo para ajustar
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className="mb-4"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <ZoomIn className="h-4 w-4" /> Opacidade
          </label>
          <Slider
            value={[state.opacity * 100]}
            min={20}
            max={100}
            step={1}
            onValueChange={(value) => updateState({ opacity: value[0] / 100 })}
            className="mb-4"
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
            className="mb-4"
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
            className="mb-4"
          />
        </div>
      </div>
    </div>
  )
}

