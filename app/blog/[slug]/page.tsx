import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Calendar, User, Tag } from "lucide-react"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real implementation, you would fetch the post data based on the slug
  const post = {
    title: "10 Ideias Criativas para Cartões de Páscoa que Bombam no TikTok",
    excerpt: "Descubra as tendências mais populares para criar cartões de Páscoa que vão viralizar nas redes sociais.",
    content: `
      <p>A Páscoa está chegando e, com ela, a oportunidade de criar conteúdos criativos e envolventes para o TikTok. Os cartões de Páscoa digitais são uma tendência que tem ganhado cada vez mais espaço nas redes sociais, especialmente entre o público jovem.</p>
      
      <p>Neste artigo, vamos explorar 10 ideias criativas para cartões de Páscoa que têm tudo para bombar no TikTok e outras redes sociais. Vamos lá?</p>
      
      <h2>1. Cartões com Transições Suaves</h2>
      
      <p>Os vídeos com transições suaves são um sucesso no TikTok. Crie um cartão que comece com uma imagem simples e, com uma transição elegante, revele uma mensagem de Páscoa personalizada. Esse tipo de conteúdo costuma gerar muitos compartilhamentos.</p>
      
      <h2>2. Cartões Interativos</h2>
      
      <p>Cartões que convidam o espectador a interagir, seja tocando na tela ou respondendo a uma pergunta, tendem a aumentar o engajamento. Por exemplo, você pode criar um cartão que pede para o usuário "tocar para revelar" uma surpresa de Páscoa.</p>
      
      <h2>3. Cartões com Filtros Divertidos</h2>
      
      <p>Utilize os filtros populares do TikTok para criar cartões de Páscoa únicos. Filtros que adicionam orelhas de coelho ou narizes de coelho são perfeitos para a ocasião e sempre fazem sucesso.</p>
      
      <h2>4. Cartões com Música Trending</h2>
      
      <p>Incorpore músicas que estão em alta no TikTok aos seus cartões de Páscoa. A escolha certa da trilha sonora pode fazer toda a diferença no alcance do seu conteúdo.</p>
      
      <h2>5. Cartões com Desafios</h2>
      
      <p>Crie um cartão que proponha um desafio relacionado à Páscoa, como encontrar ovos escondidos na imagem ou completar uma frase sobre a data. Desafios são uma forma eficaz de gerar engajamento.</p>
      
      <h2>6. Cartões com Efeitos de Texto</h2>
      
      <p>Utilize efeitos de texto criativos para destacar sua mensagem de Páscoa. Textos que aparecem gradualmente ou que têm animações especiais chamam mais atenção.</p>
      
      <h2>7. Cartões com Duetos</h2>
      
      <p>Crie um cartão que convide outros usuários a fazerem um dueto, como uma coreografia simples com tema de Páscoa ou uma reação à sua mensagem.</p>
      
      <h2>8. Cartões com Histórias em Partes</h2>
      
      <p>Divida sua mensagem de Páscoa em uma série de cartões que contam uma história. Isso incentiva os seguidores a acompanharem todo o conteúdo.</p>
      
      <h2>9. Cartões com Revelações Surpreendentes</h2>
      
      <p>Crie um cartão que comece de uma forma e termine de outra completamente diferente, surpreendendo o espectador. Por exemplo, um vídeo que começa com um ovo comum e termina com uma explosão de cores e confetes.</p>
      
      <h2>10. Cartões Personalizados com Fotos</h2>
      
      <p>Por fim, os cartões que permitem adicionar fotos pessoais sempre têm um apelo especial. Crie templates que permitam aos usuários inserir suas próprias fotos para criar cartões únicos e personalizados.</p>
      
      <h2>Conclusão</h2>
      
      <p>A Páscoa é uma época perfeita para explorar sua criatividade e criar conteúdos que se destacam nas redes sociais. Com essas ideias, você está pronto para criar cartões de Páscoa que vão bombar no TikTok e outras plataformas.</p>
      
      <p>E se você quer facilitar ainda mais esse processo, experimente nossa plataforma de criação de cartões de Páscoa personalizados. Com apenas alguns cliques, você pode criar um cartão incrível e compartilhá-lo diretamente nas suas redes sociais favoritas.</p>
    `,
    image: "/placeholder.svg?height=500&width=1000&text=Blog+Post+Header",
    date: "15 de março de 2023",
    author: "Ana Silva",
    category: "Tendências",
    tags: ["cartões de páscoa", "tiktok", "redes sociais", "tendências", "páscoa 2023"],
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft size={16} className="mr-2" /> Voltar para o Blog
          </Button>
        </Link>

        <div className="mb-8">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto rounded-lg shadow-md" />
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar size={16} className="mr-1" />
            {post.date}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <User size={16} className="mr-1" />
            {post.author}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Tag size={16} className="mr-1" />
            {post.category}
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>

        <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="border-t pt-6 mt-12">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h3 className="font-medium mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link key={index} href={`/blog/tag/${tag.replace(/\s+/g, "-").toLowerCase()}`}>
                    <Button variant="outline" size="sm">
                      {tag}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
            <Button className="mt-4 sm:mt-0 bg-[#FF2D55] hover:bg-[#FF1A45]">
              <Share2 size={16} className="mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>

        <div className="mt-12 bg-[#FFF5F7] rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Crie seu próprio cartão de Páscoa!</h3>
          <p className="mb-4">
            Inspire-se nas ideias deste artigo e crie um cartão personalizado para compartilhar nas redes sociais.
          </p>
          <Link href="/editor">
            <Button className="bg-[#FF2D55] hover:bg-[#FF1A45]">Criar Cartão Agora</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

