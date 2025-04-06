"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

interface UploadProgressProps {
  progress: number
  status: "idle" | "uploading" | "success" | "error"
  message?: string
}

export default function UploadProgress({ progress, status, message }: UploadProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    // Animação suave do progresso
    const animationFrame = requestAnimationFrame(() => {
      setAnimatedProgress((prev) => {
        if (Math.abs(prev - progress) < 1) return progress
        return prev + (progress - prev) * 0.2
      })
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [progress])

  if (status === "idle") return null

  return (
    <div className="mt-2 space-y-2">
      {status === "uploading" && (
        <>
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-pink-500" />
            <p className="text-sm text-muted-foreground">Enviando imagem...</p>
          </div>
          <Progress value={animatedProgress} className="h-2" />
          <p className="text-xs text-right text-muted-foreground">{Math.round(animatedProgress)}%</p>
        </>
      )}

      {status === "success" && (
        <div className="p-2 bg-green-50 text-green-700 rounded-md text-sm">
          {message || "Imagem enviada com sucesso!"}
        </div>
      )}

      {status === "error" && (
        <div className="p-2 bg-red-50 text-red-700 rounded-md text-sm">
          {message || "Erro ao enviar imagem. Tente novamente."}
        </div>
      )}
    </div>
  )
}

