"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100 bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="PascoaYou Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-purple-700">PascoaYou</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link href="#how-it-works" className="text-sm font-medium text-purple-900 hover:text-purple-700">
            Como Funciona
          </Link>
          <Link href="#templates" className="text-sm font-medium text-purple-900 hover:text-purple-700">
            Templates
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-purple-900 hover:text-purple-700">
            Preços
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-purple-900 hover:text-purple-700">
            Depoimentos
          </Link>
          <Link href="#faq" className="text-sm font-medium text-purple-900 hover:text-purple-700">
            FAQ
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button className="bg-yellow-500 text-purple-900 hover:bg-yellow-400">Criar Meu Cartão</Button>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-purple-900 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 pb-6 pt-2">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-purple-900 hover:text-purple-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="#templates"
              className="text-sm font-medium text-purple-900 hover:text-purple-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-purple-900 hover:text-purple-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Preços
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-purple-900 hover:text-purple-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Depoimentos
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-purple-900 hover:text-purple-700"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Button className="w-full bg-yellow-500 text-purple-900 hover:bg-yellow-400">Criar Meu Cartão</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

