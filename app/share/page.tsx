import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SharePageClient from "./SharePageClient"

export const metadata: Metadata = {
  title: "Compartilhar Cartão | PascoaYou",
  description: "Compartilhe seu cartão de Páscoa personalizado com amigos e familiares.",
}

export default function SharePage() {
  return (
    <>
      <Header />
      <SharePageClient />
      <Footer />
    </>
  )
}

