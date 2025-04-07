import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ana Silva",
      handle: "@anasilva",
      avatar: "/placeholder.svg?height=100&width=100&text=AS",
      content:
        "Amei os templates! Fiz um cartão super fofo para minha família e bombou no TikTok. Já recebi mais de 10 mil visualizações!",
      rating: 5,
      platform: "TikTok",
    },
    {
      name: "Pedro Santos",
      handle: "@pedrosantos",
      avatar: "/placeholder.svg?height=100&width=100&text=PS",
      content:
        "Super fácil de personalizar e o resultado ficou incrível. Meus seguidores adoraram e vários perguntaram onde eu tinha feito.",
      rating: 5,
      platform: "Instagram",
    },
    {
      name: "Juliana Costa",
      handle: "@jucosta",
      avatar: "/placeholder.svg?height=100&width=100&text=JC",
      content:
        "Melhor investimento que fiz para a Páscoa! O cartão ficou lindo e consegui personalizar exatamente do jeito que eu queria.",
      rating: 4,
      platform: "TikTok",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">O que nossos clientes dizem</h2>
          <p className="text-muted-foreground">
            Centenas de pessoas já criaram cartões incríveis e compartilharam nas redes sociais. Veja o que eles estão
            dizendo sobre nossa plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.handle}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < testimonial.rating ? "text-[#FFD700] fill-[#FFD700]" : "text-gray-300"}
                      />
                    ))}
                </div>

                <p className="mb-4">{testimonial.content}</p>

                <div className="text-sm text-muted-foreground flex items-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      testimonial.platform === "TikTok" ? "bg-black" : "bg-gradient-to-r from-purple-500 to-pink-500"
                    }`}
                  ></span>
                  Via {testimonial.platform}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="bg-[#FFF5F7] rounded-lg p-6 max-w-2xl">
            <div className="flex items-center justify-center mb-4">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={24} className="text-[#FFD700] fill-[#FFD700]" />
                  ))}
              </div>
              <span className="ml-2 font-bold text-lg">4.9/5</span>
            </div>
            <p className="text-center text-muted-foreground">
              Baseado em mais de 500 avaliações de clientes satisfeitos
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

