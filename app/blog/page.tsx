import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function BlogPage() {
  const posts = [
    {
      id: "post-1",
      title: "10 Ideias Criativas para Cartões de Páscoa que Bombam no TikTok",
      excerpt:
        "Descubra as tendências mais populares para criar cartões de Páscoa que vão viralizar nas redes sociais.",
      image: "/placeholder.svg?height=300&width=600&text=Blog+Post+1",
      date: "15 de março de 2023",
      category: "Tendências",
      slug: "ideias-criativas-cartoes-pascoa-tiktok",
    },
    {
      id: "post-2",
      title: "Como Criar o Cartão de Páscoa Perfeito para Compartilhar no Instagram",
      excerpt: "Dicas e truques para personalizar seu cartão de Páscoa e garantir muitas curtidas e compartilhamentos.",
      image: "/placeholder.svg?height=300&width=600&text=Blog+Post+2",
      date: "10 de março de 2023",
      category: "Tutoriais",
      slug: "cartao-pascoa-perfeito-instagram",
    },
    {
      id: "post-3",
      title: "A História dos Cartões de Páscoa e Como Eles Evoluíram na Era Digital",
      excerpt:
        "Uma jornada pela tradição dos cartões de Páscoa, desde os primeiros cartões impressos até os digitais compartilhados nas redes sociais.",
      image: "/placeholder.svg?height=300&width=600&text=Blog+Post+3",
      date: "5 de março de 2023",
      category: "História",
      slug: "historia-cartoes-pascoa-era-digital",
    },
    {
      id: "post-4",
      title: "5 Dicas para Tirar a Foto Perfeita para seu Cartão de Páscoa",
      excerpt: "Aprenda técnicas simples de fotografia para criar imagens incríveis para seus cartões personalizados.",
      image: "/placeholder.svg?height=300&width=600&text=Blog+Post+4",
      date: "1 de março de 2023",
      category: "Fotografia",
      slug: "dicas-foto-perfeita-cartao-pascoa",
    },
    {
      id: "post-5",
      title: "Por Que os Cartões Digitais São a Tendência da Páscoa 2023",
      excerpt:
        "Entenda como os cartões digitais estão substituindo os tradicionais e por que eles são a escolha perfeita para a Páscoa deste ano.",
      image: "/placeholder.svg?height=300&width=600&text=Blog+Post+5",
      date: "25 de fevereiro de 2023",
      category: "Tendências",
      slug: "cartoes-digitais-tendencia-pascoa-2023",
    },
    {
      id: "post-6",
      title: "Mensagens de Páscoa que Tocam o Coração: O Que Escrever no Seu Cartão",
      excerpt:
        "Inspirações e exemplos de mensagens para tornar seu cartão de Páscoa ainda mais especial e significativo.",
      image: "/placeholder.svg?height=300&width=600&text=Blog+Post+6",
      date: "20 de fevereiro de 2023",
      category: "Inspiração",
      slug: "mensagens-pascoa-tocam-coracao",
    },
  ]

  const categories = [
    { name: "Todas", slug: "todas" },
    { name: "Tendências", slug: "tendencias" },
    { name: "Tutoriais", slug: "tutoriais" },
    { name: "Inspiração", slug: "inspiracao" },
    { name: "Fotografia", slug: "fotografia" },
    { name: "História", slug: "historia" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog PáscoaTok</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Dicas, inspirações e tutoriais para criar cartões de Páscoa incríveis e compartilhar nas redes sociais.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Link key={category.slug} href={`/blog/categoria/${category.slug}`}>
            <Button
              variant={category.slug === "todas" ? "default" : "outline"}
              className={category.slug === "todas" ? "bg-[#FF2D55] hover:bg-[#FF1A45]" : ""}
            >
              {category.name}
            </Button>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FF2D55] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-[#FF2D55] font-medium">
                    Ler mais <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline">Carregar mais artigos</Button>
      </div>
    </div>
  )
}

