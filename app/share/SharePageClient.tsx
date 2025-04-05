"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Mail, Copy, Check, PhoneIcon as WhatsApp } from "lucide-react"
import { useState } from "react"

export default function SharePageClient() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-purple-900">Seu Cartão Está Pronto!</h1>
            <p className="mt-2 text-gray-600">Compartilhe seu cartão de Páscoa personalizado com amigos e familiares</p>
          </div>

          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle>Compartilhar Cartão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative rounded-md border p-4">
                <div className="flex items-center">
                  <Input readOnly value="https://pascoayou.com/c/abc123" className="pr-20" />
                  <ShareLinkButton />
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Compartilhar nas redes sociais</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span className="sr-only">Facebook</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                    <WhatsApp className="h-5 w-5 text-green-500" />
                    <span className="sr-only">WhatsApp</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                    <Linkedin className="h-5 w-5 text-blue-700" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <span className="sr-only">Email</span>
                  </Button>
                </div>
              </div>

              <div className="rounded-md bg-purple-50 p-4">
                <p className="text-sm text-purple-800">
                  Seu cartão ficará disponível por 1 ano a partir de hoje. Você pode acessá-lo a qualquer momento em sua
                  conta.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Ver Meu Cartão</Button>
              <Link href="/templates">
                <Button className="bg-purple-600 text-white hover:bg-purple-700">Criar Outro Cartão</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}

function ShareLinkButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("https://pascoayou.com/c/abc123")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="ghost" size="sm" className="absolute right-1 top-1 h-8" onClick={handleCopy}>
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      <span className="ml-1">{copied ? "Copiado!" : "Copiar"}</span>
    </Button>
  )
}

