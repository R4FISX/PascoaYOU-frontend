import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TemplateEditor from "@/components/template-editor"

export const metadata: Metadata = {
  title: "Editor de Cartões | PascoaYou",
  description: "Personalize seu cartão de Páscoa com mensagens e imagens únicas.",
}

export default function EditorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-center text-3xl font-bold text-purple-900">Personalize Seu Cartão</h1>
            <TemplateEditor />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

