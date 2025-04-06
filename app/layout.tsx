import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PascoaYoo - Crie Cartões de Páscoa Personalizados",
  description: "Crie e compartilhe cartões de Páscoa personalizados com seus amigos e familiares em minutos.",
  keywords: ["páscoa", "cartões", "personalizados", "easter", "cards"],
  openGraph: {
    title: "PascoaYoo - Crie Cartões de Páscoa Personalizados",
    description: "Crie e compartilhe cartões de Páscoa personalizados com seus amigos e familiares em minutos.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PascoaYoo",
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

