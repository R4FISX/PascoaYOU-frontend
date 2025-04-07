"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#FF2D55] to-[#FFD700] text-transparent bg-clip-text">
            PáscoaTok
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/templates" className="text-sm font-medium hover:text-[#FF2D55] transition-colors">
            Templates
          </Link>
          <Link href="/como-funciona" className="text-sm font-medium hover:text-[#FF2D55] transition-colors">
            Como Funciona
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-[#FF2D55] transition-colors">
            Blog
          </Link>
          <Link href="/editor">
            <Button className="bg-[#FF2D55] hover:bg-[#FF1A45] text-white">Criar Cartão</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 bg-background">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/templates"
              className="text-sm font-medium p-2 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              href="/como-funciona"
              className="text-sm font-medium p-2 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium p-2 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link href="/editor" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-[#FF2D55] hover:bg-[#FF1A45] text-white">Criar Cartão</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

