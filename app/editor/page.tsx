"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, Check, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import dynamic from "next/dynamic"
import UploadProgress from "@/components/upload-progress"

// Importar o componente SplitEditor dinamicamente para evitar erros de SSR
const SplitEditor = dynamic(() => import("@/components/split-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col md:flex-row gap-6 h-[600px] animate-pulse">
      <div className="w-full md:w-1/2 bg-gray-100 rounded-lg"></div>
      <div className="w-full md:w-1/2 bg-gray-100 rounded-lg"></div>
    </div>
  ),
})

// Importar o componente CardPreview dinamicamente
const CardPreview = dynamic(() => import("@/components/card-preview"), {
  ssr: false,
  loading: () => (
    <div className="relative h-[400px] w-full max-w-[300px] mx-auto bg-gray-100 rounded-lg animate-pulse"></div>
  ),
})

// Importar o componente CardGenerator dinamicamente
const CardGenerator = dynamic(() => import("@/components/card-generator"), {
  ssr: false,
  loading: () => (
    <div className="relative h-[400px] w-full max-w-[300px] mx-auto bg-gray-100 rounded-lg animate-pulse"></div>
  ),
})

interface Template {
  id: number
  nome: string
  previewUrl: string
  descricao: string
}

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

// Tamanho máximo do arquivo em bytes (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024

export default function EditorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const canceled = searchParams.get("canceled")
  const cardGeneratorRef = useRef<HTMLDivElement>(null)

  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [selectedTemplateUrl, setSelectedTemplateUrl] = useState<string>("")
  const [mensagem, setMensagem] = useState("")
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [uploadMessage, setUploadMessage] = useState("")
  const [fotoUrl, setFotoUrl] = useState("")
  const [generating, setGenerating] = useState(false)
  const [previewing, setPreviewing] = useState(false)
  const [generatedCard, setGeneratedCard] = useState<string | null>(null)
  const [generatedCardDataUrl, setGeneratedCardDataUrl] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("template")
  const [error, setError] = useState<string | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [imageState, setImageState] = useState<ImageState>({
    x: 150,
    y: 150,
    width: 200,
    height: 200,
    rotation: 0,
    opacity: 1,
    brightness: 100,
    contrast: 100,
  })
  const [isMounted, setIsMounted] = useState(false)

  // Carregar dados salvos do localStorage
  useEffect(() => {
    setIsMounted(true)

    // Recuperar dados do formulário
    const savedData = localStorage.getItem("editorFormData")
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        if (data.mensagem) setMensagem(data.mensagem)
        if (data.nome) setNome(data.nome)
        if (data.email) setEmail(data.email)
        if (data.selectedTemplate) setSelectedTemplate(data.selectedTemplate)
        if (data.fotoUrl) {
          setFotoUrl(data.fotoUrl)
        }
      } catch (error) {
        console.error("Erro ao carregar dados salvos:", error)
      }
    }

    // Carregar templates ao montar o componente
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/templates")
        const data = await response.json()

        if (data.success) {
          setTemplates(data.templates)
        } else {
          console.error("Erro ao carregar templates:", data.error)
          setError("Não foi possível carregar os templates. Tente novamente mais tarde.")
        }
      } catch (error) {
        console.error("Falha na requisição:", error)
        setError("Erro de conexão. Verifique sua internet e tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  // Atualizar a URL do template selecionado
  useEffect(() => {
    if (selectedTemplate && templates.length > 0) {
      const template = templates.find((t) => t.id === selectedTemplate)
      if (template) {
        setSelectedTemplateUrl(
          template.previewUrl !== ""
            ? template.previewUrl
            : `/placeholder.svg?height=400&width=300&text=${template.nome}`,
        )
      }
    }
  }, [selectedTemplate, templates])

  // Salvar dados do formulário no localStorage
  useEffect(() => {
    if (!isMounted) return

    const formData = {
      mensagem,
      nome,
      email,
      selectedTemplate,
      fotoUrl,
    }

    localStorage.setItem("editorFormData", JSON.stringify(formData))
  }, [mensagem, nome, email, selectedTemplate, fotoUrl, isMounted])

  useEffect(() => {
    // Verificar se o usuário cancelou o checkout
    if (canceled) {
      setError("O pagamento foi cancelado. Você pode tentar novamente quando estiver pronto.")
    }
  }, [canceled])

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplate(id)
  }

  // Função para simular o progresso do upload
  const simulateProgress = useCallback(() => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress > 95) {
        progress = 95
        clearInterval(interval)
      }
      setUploadProgress(progress)
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const validateFile = (file: File): { valid: boolean; message?: string } => {
    // Verificar o tipo do arquivo
    if (!file.type.startsWith("image/")) {
      return {
        valid: false,
        message: "O arquivo selecionado não é uma imagem. Por favor, selecione um arquivo de imagem (JPEG, PNG, GIF).",
      }
    }

    // Verificar o tamanho do arquivo
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        message: `O arquivo é muito grande. O tamanho máximo permitido é ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
      }
    }

    return { valid: true }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar o arquivo
    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.message)
      return
    }

    try {
      setUploading(true)
      setUploadStatus("uploading")
      setUploadProgress(0)
      setError(null)

      // Iniciar simulação de progresso
      const stopProgress = simulateProgress()

      // Criar FormData para enviar o arquivo
      const formData = new FormData()
      formData.append("file", file)

      // Enviar para a API de upload
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      // Parar a simulação de progresso
      stopProgress()
      setUploadProgress(100)

      // Verificar se a resposta é bem-sucedida antes de tentar analisar o JSON
      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        setFotoUrl(data.uploadUrl)
        // Resetar o estado da imagem para valores padrão
        setImageState({
          x: 150,
          y: 150,
          width: 200,
          height: 200,
          rotation: 0,
          opacity: 1,
          brightness: 100,
          contrast: 100,
        })
        setUploadStatus("success")
        setUploadMessage("Imagem enviada com sucesso!")
      } else {
        setUploadStatus("error")
        setUploadMessage(`Erro ao fazer upload: ${data.error}`)
        setError(`Erro ao fazer upload: ${data.error}`)
      }
    } catch (error: any) {
      console.error("Falha no upload:", error)
      setUploadStatus("error")
      setUploadMessage(`Falha ao enviar a imagem: ${error.message || "Erro desconhecido"}. Tente novamente.`)
      setError(`Falha ao enviar a imagem: ${error.message || "Erro desconhecido"}. Tente novamente.`)

      // Em ambiente de desenvolvimento, usar uma imagem de placeholder
      if (process.env.NODE_ENV === "development") {
        setFotoUrl("/placeholder.svg?height=400&width=300&text=Imagem+Simulada")
        setUploadStatus("success")
        setUploadMessage("Simulação de upload em ambiente de desenvolvimento")
      }
    } finally {
      setUploading(false)

      // Resetar o status após alguns segundos
      setTimeout(() => {
        setUploadStatus("idle")
      }, 5000)
    }
  }

  const handleCardGenerated = (dataUrl: string) => {
    setGeneratedCardDataUrl(dataUrl)
  }

  const handlePreviewCard = async () => {
    if (!selectedTemplate) {
      setError("Por favor, selecione um template")
      return
    }

    if (!mensagem.trim()) {
      setError("Por favor, adicione uma mensagem")
      return
    }

    try {
      setPreviewing(true)
      setError(null)

      // Gerar a imagem do cartão usando o CardGenerator
      if (cardGeneratorRef.current && cardGeneratorRef.current.generateImage) {
        // @ts-ignore - Chamando a função exposta pelo CardGenerator
        const imageDataUrl = await cardGeneratorRef.current.generateImage()

        if (imageDataUrl) {
          setGeneratedCardDataUrl(imageDataUrl)
          setActiveTab("preview")
          setPreviewing(false)
          return
        }
      }

      // Fallback para a API se a geração local falhar
      const response = await fetch("/api/generate-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          mensagem,
          nome,
          fotoUrl,
          imageState: fotoUrl ? imageState : null,
          isPreview: true,
        }),
      })

      // Verificar se a resposta é bem-sucedida antes de tentar analisar o JSON
      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        setGeneratedCard(data.previewUrl)
        setActiveTab("preview")
      } else {
        setError(`Erro ao gerar preview: ${data.error}`)
      }
    } catch (error: any) {
      console.error("Falha na geração do preview:", error)
      setError(`Falha ao gerar o preview do cartão: ${error.message || "Erro desconhecido"}. Tente novamente.`)

      // Em ambiente de desenvolvimento, usar uma imagem de placeholder para o preview
      if (process.env.NODE_ENV === "development") {
        setGeneratedCard("/placeholder.svg?height=600&width=400&text=Preview+Simulado")
        setActiveTab("preview")
      }
    } finally {
      setPreviewing(false)
    }
  }

  const handleCheckout = async () => {
    if (!email.trim()) {
      setError("Por favor, informe seu email para continuar")
      return
    }

    if (!selectedTemplate) {
      setError("Por favor, selecione um template")
      return
    }

    if (!mensagem.trim()) {
      setError("Por favor, adicione uma mensagem")
      return
    }

    try {
      setCheckoutLoading(true)
      setError(null)

      // Garantir que temos a imagem do cartão gerada
      if (!generatedCardDataUrl && cardGeneratorRef.current && cardGeneratorRef.current.generateImage) {
        // @ts-ignore - Chamando a função exposta pelo CardGenerator
        const imageDataUrl = await cardGeneratorRef.current.generateImage()
        if (imageDataUrl) {
          setGeneratedCardDataUrl(imageDataUrl)
        }
      }

      // Salvar a imagem do cartão no servidor antes de iniciar o checkout
      const saveResponse = await fetch("/api/save-card-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageDataUrl: generatedCardDataUrl,
          templateId: selectedTemplate,
          mensagem,
          nome,
          fotoUrl,
          imageState: fotoUrl ? imageState : null,
        }),
      })

      if (!saveResponse.ok) {
        throw new Error(`Erro ao salvar imagem: ${saveResponse.status} ${saveResponse.statusText}`)
      }

      const saveData = await saveResponse.json()

      if (!saveData.success) {
        throw new Error(`Erro ao salvar imagem do cartão: ${saveData.error}`)
      }

      const cardId = saveData.cardId

      // Criar sessão de checkout
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          templateId: selectedTemplate,
          mensagem,
          nome,
          fotoUrl,
          imageState: fotoUrl ? imageState : null,
          cardId: cardId, // Passar o ID do cartão salvo
        }),
      })

      // Verificar se a resposta é bem-sucedida antes de tentar analisar o JSON
      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success && data.checkoutUrl) {
        // Limpar dados do localStorage antes de redirecionar
        localStorage.removeItem("editorFormData")
        localStorage.removeItem("imageEditorState")

        // Redirecionar para a página de checkout do Stripe
        window.location.href = data.checkoutUrl
      } else {
        setError(`Erro ao iniciar checkout: ${data.error}`)
      }
    } catch (error: any) {
      console.error("Falha ao iniciar checkout:", error)
      setError(`Falha ao processar o pagamento: ${error.message || "Erro desconhecido"}. Tente novamente.`)

      // Em ambiente de desenvolvimento, redirecionar para a página de sucesso simulada
      if (process.env.NODE_ENV === "development") {
        // Limpar dados do localStorage antes de redirecionar
        localStorage.removeItem("editorFormData")
        localStorage.removeItem("imageEditorState")

        router.push("/success?session_id=sim_" + Date.now())
      }
    } finally {
      setCheckoutLoading(false)
    }
  }

  const handleImageChange = (newState: ImageState) => {
    setImageState(newState)
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <header className="bg-white border-b">
        <div className="container py-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <h1 className="text-3xl font-bold text-pink-800 mb-8 text-center">Crie seu Cartão de Páscoa Personalizado</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="template" value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="template">1. Escolha o Template</TabsTrigger>
            <TabsTrigger value="personalize">2. Personalize</TabsTrigger>
            <TabsTrigger value="preview">3. Visualize e Pague</TabsTrigger>
          </TabsList>

          <TabsContent value="template">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Selecione um modelo</h2>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all ${
                        selectedTemplate === template.id ? "ring-2 ring-pink-500 scale-105" : "hover:shadow-lg"
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <CardContent className="p-3">
                        <div className="relative h-[200px] w-full overflow-hidden rounded-md mb-3">
                          <Image
                            src={
                              template.previewUrl !== ""
                                ? template.previewUrl
                                : `/placeholder.svg?height=400&width=300&text=${template.nome}`
                            }
                            alt={template.nome}
                            fill
                            className="object-cover"
                          />
                          {selectedTemplate === template.id && (
                            <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-1">
                              <Check className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-medium">{template.nome}</h3>
                        <p className="text-sm text-muted-foreground">{template.descricao}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <Button
                  disabled={!selectedTemplate}
                  onClick={() => setActiveTab("personalize")}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  Continuar
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personalize">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Personalize seu cartão</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="Digite sua mensagem de Páscoa aqui..."
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nome do destinatário (opcional)</label>
                  <Input
                    placeholder="Para quem é este cartão?"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Seu email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="Informe seu email para receber o cartão"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Seu email será usado apenas para o processo de pagamento e entrega do cartão.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Adicionar foto (opcional)</label>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="relative" disabled={uploading}>
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Escolher imagem
                        </>
                      )}
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                      />
                    </Button>
                    {fotoUrl && (
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image src={fotoUrl || "/placeholder.svg"} alt="Foto enviada" fill className="object-cover" />
                      </div>
                    )}
                  </div>

                  <UploadProgress progress={uploadProgress} status={uploadStatus} message={uploadMessage} />

                  <p className="text-xs text-muted-foreground mt-2">
                    Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB.
                  </p>
                </div>

                {/* Editor de imagem dividido (apenas se tiver foto e template) */}
                {isMounted && fotoUrl && selectedTemplate && (
                  <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Editar Imagem</h3>

                    <SplitEditor
                      templateId={selectedTemplate}
                      templateUrl={selectedTemplateUrl}
                      imageUrl={fotoUrl}
                      mensagem={mensagem}
                      nome={nome}
                      initialState={imageState}
                      onChange={handleImageChange}
                    />
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("template")}>
                  Voltar
                </Button>
                <Button
                  disabled={!mensagem.trim() || previewing}
                  onClick={handlePreviewCard}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  {previewing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Gerando preview...
                    </>
                  ) : (
                    "Ver Preview"
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Seu cartão está pronto!</h2>

              {generatedCardDataUrl || generatedCard ? (
                <div className="flex flex-col items-center">
                  {/* Componente oculto para gerar a imagem final */}
                  <div className="hidden">
                    <CardGenerator
                      ref={cardGeneratorRef}
                      templateId={selectedTemplate || 1}
                      templateUrl={selectedTemplateUrl}
                      imageUrl={fotoUrl}
                      mensagem={mensagem}
                      nome={nome}
                      imageState={imageState}
                      onGenerate={handleCardGenerated}
                    />
                  </div>

                  {/* Exibir a imagem gerada */}
                  {generatedCardDataUrl ? (
                    <div className="relative h-[400px] w-full max-w-[300px] overflow-hidden rounded-lg shadow-lg mb-6">
                      <Image
                        src={generatedCardDataUrl || "/placeholder.svg"}
                        alt="Cartão gerado"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <CardPreview
                      templateId={selectedTemplate || 1}
                      templateUrl={selectedTemplateUrl}
                      imageUrl={fotoUrl}
                      mensagem={mensagem}
                      nome={nome}
                      imageState={imageState}
                      className="mb-6"
                    />
                  )}

                  <div className="space-y-4 w-full max-w-md">
                    <div className="bg-pink-50 p-4 rounded-lg mb-6">
                      <h3 className="font-medium mb-2">Detalhes do pagamento:</h3>
                      <p className="text-lg font-bold text-pink-600 mb-2">R$ 4,99</p>
                      <p className="text-sm text-muted-foreground">
                        Pagamento único para gerar e compartilhar seu cartão personalizado.
                      </p>
                    </div>

                    <Button
                      className="w-full bg-pink-500 hover:bg-pink-600"
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                    >
                      {checkoutLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        "Finalizar Pagamento (R$ 4,99)"
                      )}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Após o pagamento, você poderá baixar e compartilhar seu cartão.
                      <br />
                      Pagamento processado com segurança via Stripe.
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-2">Prévia da sua mensagem:</h3>
                      <div className="bg-pink-50 p-3 rounded-md">
                        <p className="italic">{mensagem}</p>
                        {nome && <p className="mt-2 font-medium">Para: {nome}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-muted-foreground mb-4">
                    Você ainda não gerou seu cartão. Volte para a etapa anterior e clique em "Ver Preview".
                  </p>
                  <Button variant="outline" onClick={() => setActiveTab("personalize")}>
                    Voltar para personalização
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

