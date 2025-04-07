"use client"

import { useEffect, useRef, useState } from "react"
import { Stage, Layer, Image } from "react-konva"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RotateCw, ZoomIn, Sparkles } from "lucide-react"

interface ImageEditorProps {
  imageUrl: string
  initialState?: string
  onStateChange: (stateJson: string) => void
}

interface ImageState {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  scaleX: number
  scaleY: number
}

export default function ImageEditor({ imageUrl, initialState, onStateChange }: ImageEditorProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [state, setState] = useState<ImageState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
  })

  const imageRef = useRef<any>(null)
  const stageRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Load image and initial state
  useEffect(() => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    img.onload = () => {
      setImage(img)

      // Calculate initial dimensions to fit container
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const containerHeight = 300 // Fixed height for editor

        const aspectRatio = img.width / img.height
        let newWidth, newHeight

        if (img.width > img.height) {
          newWidth = Math.min(containerWidth, img.width)
          newHeight = newWidth / aspectRatio
        } else {
          newHeight = Math.min(containerHeight, img.height)
          newWidth = newHeight * aspectRatio
        }

        // Try to parse initial state if provided
        if (initialState) {
          try {
            const parsedState = JSON.parse(initialState)
            setState(parsedState)
          } catch (e) {
            // If parsing fails, use calculated dimensions
            setState({
              ...state,
              width: newWidth,
              height: newHeight,
              x: (containerWidth - newWidth) / 2,
              y: (containerHeight - newHeight) / 2,
            })
          }
        } else {
          // No initial state, use calculated dimensions
          setState({
            ...state,
            width: newWidth,
            height: newHeight,
            x: (containerWidth - newWidth) / 2,
            y: (containerHeight - newHeight) / 2,
          })
        }
      }
    }
  }, [imageUrl, initialState])

  // Update parent component when state changes
  useEffect(() => {
    onStateChange(JSON.stringify(state))
  }, [state, onStateChange])

  const handleZoom = (direction: "in" | "out") => {
    const scaleFactor = direction === "in" ? 1.1 : 0.9

    setState({
      ...state,
      scaleX: state.scaleX * scaleFactor,
      scaleY: state.scaleY * scaleFactor,
    })
  }

  const handleRotate = () => {
    setState({
      ...state,
      rotation: (state.rotation + 90) % 360,
    })
  }

  const handleReset = () => {
    if (image && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = 300

      const aspectRatio = image.width / image.height
      let newWidth, newHeight

      if (image.width > image.height) {
        newWidth = Math.min(containerWidth, image.width)
        newHeight = newWidth / aspectRatio
      } else {
        newHeight = Math.min(containerHeight, image.height)
        newWidth = newHeight * aspectRatio
      }

      setState({
        ...state,
        width: newWidth,
        height: newHeight,
        x: (containerWidth - newWidth) / 2,
        y: (containerHeight - newHeight) / 2,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      })
    }
  }

  const applyFilter = (filter: string) => {
    // In a real implementation, you would apply CSS filters or canvas filters
    // For this example, we'll just log the filter type
    console.log(`Applying filter: ${filter}`)
  }

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex justify-center mb-4 space-x-2">
        <Button variant="outline" size="sm" onClick={() => handleZoom("in")}>
          <ZoomIn className="h-4 w-4 mr-1" /> Zoom
        </Button>
        <Button variant="outline" size="sm" onClick={handleRotate}>
          <RotateCw className="h-4 w-4 mr-1" /> Girar
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden" style={{ height: "300px" }}>
        <Stage width={containerRef.current?.offsetWidth || 400} height={300} ref={stageRef}>
          <Layer>
            {image && (
              <Image
                ref={imageRef}
                image={image}
                x={state.x}
                y={state.y}
                width={state.width}
                height={state.height}
                rotation={state.rotation}
                scaleX={state.scaleX}
                scaleY={state.scaleY}
                draggable
                onDragEnd={(e) => {
                  setState({
                    ...state,
                    x: e.target.x(),
                    y: e.target.y(),
                  })
                }}
              />
            )}
          </Layer>
        </Stage>
      </div>

      <div className="mt-4">
        <Label>Zoom</Label>
        <Slider
          value={[state.scaleX * 50]}
          min={10}
          max={100}
          step={1}
          onValueChange={(value) => {
            const scale = value[0] / 50
            setState({
              ...state,
              scaleX: scale,
              scaleY: scale,
            })
          }}
        />
      </div>

      <div className="mt-4">
        <Label>Filtros TikTok</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {["Normal", "Vintage", "Bright", "Dramatic"].map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="sm"
              className="h-auto py-2 flex flex-col items-center"
              onClick={() => applyFilter(filter)}
            >
              <Sparkles className="h-4 w-4 mb-1" />
              <span className="text-xs">{filter}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

