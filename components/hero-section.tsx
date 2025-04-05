"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-10 top-20 h-20 w-20 animate-float opacity-60">
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt="Easter egg"
            width={80}
            height={80}
            className="h-full w-full"
          />
        </div>
        <div className="absolute -right-10 top-40 h-16 w-16 animate-float-delay opacity-60">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Easter bunny"
            width={64}
            height={64}
            className="h-full w-full"
          />
        </div>
        <div className="absolute bottom-20 left-1/4 h-24 w-24 animate-float-slow opacity-60">
          <Image
            src="/placeholder.svg?height=96&width=96"
            alt="Easter basket"
            width={96}
            height={96}
            className="h-full w-full"
          />
        </div>
        <div className="absolute bottom-40 right-1/4 h-16 w-16 animate-float opacity-60">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Easter egg"
            width={64}
            height={64}
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                className="text-4xl font-bold tracking-tighter text-purple-900 sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Crie Seu Cartão de Páscoa Personalizado em Minutos!
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-lg text-purple-700 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Envie mensagens especiais com um toque único, sem precisar ser designer. Comece grátis!
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button className="group relative overflow-hidden bg-yellow-500 px-8 py-6 text-lg font-semibold text-purple-900 hover:bg-yellow-400">
                <span className="relative z-10">Criar Meu Cartão</span>
                <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-purple-500 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative h-[300px] w-full max-w-[500px] overflow-hidden rounded-xl shadow-2xl md:h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Editor de cartões PascoaYou"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
                  Ver demonstração
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

