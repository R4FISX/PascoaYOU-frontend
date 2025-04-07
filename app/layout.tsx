import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Easter Cards - Crie Cartões de Páscoa Personalizados",
  description: "Crie e compartilhe cartões de Páscoa personalizados com seus amigos e familiares em minutos.",
  keywords: ["páscoa", "cartões", "personalizados", "easter", "cards"],
  openGraph: {
    title: "Easter Cards - Crie Cartões de Páscoa Personalizados",
    description: "Crie e compartilhe cartões de Páscoa personalizados com seus amigos e familiares em minutos.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Easter Cards",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

