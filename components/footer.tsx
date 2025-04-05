import Link from "next/link"
import { Facebook, Instagram, Mail, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-purple-100 bg-white py-12 md:py-16">
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-purple-900">PascoaYou</h3>
          <p className="text-sm text-gray-500">
            Crie cartões de Páscoa personalizados em minutos, sem precisar ser designer.
          </p>
        </div>

        <div className="grid gap-2">
          <h3 className="text-sm font-semibold text-purple-900">Links Úteis</h3>
          <nav className="grid gap-2">
            <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">
              Sobre Nós
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">
              Blog
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">
              Carreiras
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">
              Parcerias
            </Link>
          </nav>
        </div>

        <div className="grid gap-2">
          <h3 className="text-sm font-semibold text-purple-900">Legal</h3>
          <nav className="grid gap-2">
            <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">
              Termos de Uso
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">
              Política de Cookies
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-purple-700">
              LGPD
            </Link>
          </nav>
        </div>

        <div className="grid gap-2">
          <h3 className="text-sm font-semibold text-purple-900">Contato</h3>
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <Mail className="h-4 w-4" />
            <a href="mailto:contato@pascoayou.com.br" className="hover:text-purple-700">
              contato@pascoayou.com.br
            </a>
          </p>
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-purple-900">Siga-nos</h4>
            <div className="mt-2 flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-purple-700">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-purple-700">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-purple-700">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-8 border-t border-gray-100 pt-6">
        <p className="text-center text-sm text-gray-500">© 2025 PascoaYou. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

