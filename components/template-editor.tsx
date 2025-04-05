"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Upload, X, ImageIcon } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  imageUrl: string
  category: string
  free: boolean
}

export default function TemplateEditor() {
  const [template, setTemplate] = useState<Template | null>(null)
  const [message, setMessage] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Recuperar o template selecionado do localStorage
    const selectedTemplate = localStorage.getItem("selectedTemplate")
    if (selectedTemplate) {
      setTemplate(JSON.parse(selectedTemplate))
    } else {
      // Redirecionar para a galeria se não houver template selecionado
      router.push("/templates")
    }
  }, [router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Criar preview da imagem
      const objectUrl = URL.createObjectURL(file)
      setImagePreview(objectUrl)

      // Limpar o objectURL quando o componente for desmontado
      return () => URL.revokeObjectURL(objectUrl)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!template) {
      toast({
        title: "Erro",
        description: "Nenhum template selecionado.",
        variant: "destructive",
      })
      return
    }

    if (!message.trim()) {
      toast({
        title: "Mensagem obrigatória",
        description: "Por favor, adicione uma mensagem ao seu cartão.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Criar FormData para enviar os dados
      const formData = new FormData()
      formData.append("templateId", template.id)
      formData.append("message", message)
      if (image) {
        formData.append("image", image)
      }

      // Simulando o envio para a API
      // Na implementação real, seria algo como:
      // const response = await fetch('/api/cards', {
      //   method: 'POST',
      //   body: formData
      // })

      // Simulando um atraso para demonstração
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulando sucesso
      toast({
        title: "Cartão criado com sucesso!",
        description: "Seu cartão foi criado e está pronto para ser compartilhado.",
      })

      // Redirecionar para uma página de sucesso ou compartilhamento
      router.push("/share")
    } catch (error) {
      console.error("Erro ao criar cartão:", error)
      toast({
        title: "Erro ao criar cartão",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!template) {
    return <div className="flex justify-center p-8">Carregando...</div>
  }

  return (
    <div className="container max-w-4xl px-4 py-8 md:px-6">
      <Card className="border-purple-100">
        <CardHeader>
          <CardTitle className="text-2xl">Personalize seu cartão</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Template selecionado: {template.name}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="message">Sua mensagem personalizada</Label>
                  <Textarea
                    id="message"
                    placeholder="Digite sua mensagem especial aqui..."
                    className="h-32 resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">Adicionar imagem (opcional)</Label>
                  <div className="mt-2">
                    <Input
                      ref={fileInputRef}
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {!imagePreview ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-dashed border-2 h-32 flex flex-col items-center justify-center gap-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-6 w-6 text-gray-400" />
                        <span className="text-sm text-gray-500">Clique para fazer upload</span>
                      </Button>
                    ) : (
                      <div className="relative h-32 w-full overflow-hidden rounded-md">
                        <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Pré-visualização</Label>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <ImageIcon className="h-12 w-12 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">Pré-visualização do cartão</p>
                    {message && (
                      <div className="mt-4 max-w-xs rounded-md bg-white/80 p-3 text-sm backdrop-blur-sm">{message}</div>
                    )}
                  </div>
                  {/* Aqui seria renderizada uma pré-visualização real do cartão */}
                </div>
              </div>
            </div>

            {!template.free && (
              <div className="rounded-md bg-purple-50 p-4">
                <p className="text-sm text-purple-800">
                  Este é um template premium. Ao finalizar, você será redirecionado para realizar o pagamento de R$4,99.
                </p>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/templates")}>
            Voltar para galeria
          </Button>
          <Button
            type="submit"
            className="bg-purple-600 text-white hover:bg-purple-700"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Processando..." : "Criar Meu Cartão"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

