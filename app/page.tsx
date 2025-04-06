import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Mail, TwitterIcon as TikTok } from "lucide-react"
import { Check } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Image src="/images/easter-logo.svg" alt="PascoaYoo Logo" width={40} height={40} />
            <span className="text-xl font-bold text-pink-500">PascoaYoo</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-pink-500">
              Como Funciona
            </Link>
            <Link href="#templates" className="text-sm font-medium text-muted-foreground hover:text-pink-500">
              Modelos
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-pink-500">
              Preço
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-pink-500">
              Depoimentos
            </Link>
            <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-pink-500">
              Contato
            </Link>
          </nav>
          <Link href="/editor">
            <Button className="bg-pink-500 hover:bg-pink-600">Criar seu Cartão</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-yellow-50 to-pink-50">
          <div className="absolute inset-0 opacity-10">
            <Image src="/images/easter-pattern.svg" alt="Easter Pattern" fill className="object-cover" />
          </div>
          <div className="container relative flex flex-col items-center text-center">
            <div className="inline-block rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800 mb-6">
              Páscoa 2025
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-pink-800 mb-6">
              Crie seu Cartão de Páscoa
              <br />
              Personalizado em Minutos!
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground mb-8">
              Surpreenda seus amigos e familiares com cartões de Páscoa únicos e personalizados. Escolha um modelo,
              adicione sua mensagem e compartilhe com quem você ama.
            </p>
            <Link href="/editor">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-lg">
                Comece Agora <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="relative h-[200px] w-full overflow-hidden rounded-xl shadow-lg transform transition-transform hover:scale-105">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Cartão de Páscoa Exemplo 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[200px] w-full overflow-hidden rounded-xl shadow-lg transform transition-transform hover:scale-105">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Cartão de Páscoa Exemplo 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[200px] w-full overflow-hidden rounded-xl shadow-lg transform transition-transform hover:scale-105">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Cartão de Páscoa Exemplo 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-pink-800 mb-4">Como Funciona</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Criar seu cartão de Páscoa personalizado é simples e rápido. Siga estes três passos:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-yellow-50">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Escolha o Template</h3>
                <p className="text-muted-foreground">
                  Selecione entre nossos modelos religiosos, divertidos ou infantis para começar.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-green-50">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Personalize seu Cartão</h3>
                <p className="text-muted-foreground">
                  Adicione sua mensagem, nome, foto e escolha animações para tornar seu cartão único.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-blue-50">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Gere e Compartilhe</h3>
                <p className="text-muted-foreground">
                  Após o pagamento, receba um link ou GIF para compartilhar nas redes sociais ou WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="py-20 bg-pink-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-pink-800 mb-4">Nossos Modelos</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Escolha entre uma variedade de templates lindos e personalizáveis para criar seu cartão perfeito.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="group relative overflow-hidden rounded-xl shadow-md bg-white">
                  <div className="relative h-[250px] w-full overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=500&width=400&text=Template ${item}`}
                      alt={`Template ${item}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Template {item}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item % 3 === 0 ? "Religioso" : item % 3 === 1 ? "Divertido" : "Infantil"}
                    </p>
                    <Link href="/editor">
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        Usar este modelo
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-pink-800 mb-4">Preço Único</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Crie seu cartão de Páscoa personalizado por um valor acessível e único.
              </p>
            </div>

            <div className="max-w-md mx-auto bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-pink-800 mb-2">Cartão de Páscoa Personalizado</h3>
                <div className="flex justify-center items-baseline my-6">
                  <span className="text-5xl font-extrabold text-pink-600">R$ 4,99</span>
                  <span className="ml-1 text-xl text-pink-600">/cartão</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Pagamento único para criar e compartilhar seu cartão personalizado.
                </p>

                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Escolha entre diversos templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Personalize com sua mensagem</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Adicione fotos pessoais</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Compartilhe facilmente nas redes sociais</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Pagamento seguro via Stripe</span>
                  </li>
                </ul>

                <Link href="/editor">
                  <Button size="lg" className="w-full bg-pink-500 hover:bg-pink-600">
                    Criar Meu Cartão
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground mt-4">
                  Após personalizar, realize o pagamento e receba seu cartão para compartilhar com amigos e familiares!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-pink-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-pink-800 mb-4">Depoimentos</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Veja o que nossos usuários estão dizendo sobre nossos cartões de Páscoa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-yellow-50 border border-yellow-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-200 mr-3"></div>
                  <div>
                    <h4 className="font-medium">Maria Silva</h4>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Adorei poder personalizar um cartão de Páscoa para minha família! Foi super fácil e rápido."
                </p>
              </div>

              <div className="p-6 rounded-xl bg-green-50 border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-200 mr-3"></div>
                  <div>
                    <h4 className="font-medium">João Santos</h4>
                    <div className="flex text-green-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Os modelos são lindos e a plataforma é super intuitiva. Consegui criar cartões para toda a família!"
                </p>
              </div>

              <div className="p-6 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-200 mr-3"></div>
                  <div>
                    <h4 className="font-medium">Ana Oliveira</h4>
                    <div className="flex text-blue-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Meus sobrinhos amaram os cartões animados que criei para eles. Vou usar novamente no próximo ano!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para criar seu cartão de Páscoa?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Comece agora e surpreenda seus entes queridos com uma mensagem especial nesta Páscoa.
            </p>
            <Link href="/editor">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-white/90">
                Criar Meu Cartão Agora
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-pink-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/images/easter-logo-white.svg" alt="PascoaYoo Logo" width={40} height={40} />
                <span className="text-xl font-bold">PascoaYoo</span>
              </div>
              <p className="text-white/70">
                Crie cartões de Páscoa personalizados para compartilhar com quem você ama.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#how-it-works" className="text-white/70 hover:text-white">
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="#templates" className="text-white/70 hover:text-white">
                    Modelos
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-white/70 hover:text-white">
                    Preço
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-white/70 hover:text-white">
                    Depoimentos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Siga-nos</h3>
              <div className="flex flex-col items-start gap-4">
                <a
                  href="https://www.tiktok.com/@seuusuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <TikTok className="h-6 w-6" />
                  <span className="font-medium">Nos siga no TikTok</span>
                </a>

                <div className="flex items-center gap-2 mt-4">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:contato@eastercards.com" className="text-white/70 hover:text-white">
                    contato@eastercards.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/50 text-sm">
            &copy; {new Date().getFullYear()} PascoaYoo. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

