import Link from "next/link"
import { Instagram, InstagramIcon as Tiktok, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-[#FF2D55] to-[#FFD700] text-transparent bg-clip-text"
            >
              PáscoaTok
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Crie cartões de Páscoa personalizados e compartilhe nas suas redes sociais favoritas. Designs modernos e
              criativos por apenas R$4,99.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#FF2D55]"
              >
                <Tiktok size={20} />
                <span className="sr-only">TikTok</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#FF2D55]"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#FF2D55]"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium">Links Rápidos</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/templates" className="text-muted-foreground hover:text-[#FF2D55]">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-muted-foreground hover:text-[#FF2D55]">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-[#FF2D55]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/editor" className="text-muted-foreground hover:text-[#FF2D55]">
                  Criar Cartão
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium">Informações</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/termos" className="text-muted-foreground hover:text-[#FF2D55]">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-muted-foreground hover:text-[#FF2D55]">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-[#FF2D55]">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-[#FF2D55]">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} PáscoaTok. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">Desenvolvido com 💖 para a Páscoa</p>
        </div>
      </div>
    </footer>
  )
}

