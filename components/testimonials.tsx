import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Ana Silva",
      role: "Mãe e Professora",
      content:
        "Adorei a simplicidade! Consegui criar um cartão lindo para minha família em menos de 5 minutos. As crianças ficaram encantadas com a interatividade.",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      role: "Designer Gráfico",
      content:
        "Mesmo sendo designer, apreciei a praticidade do PascoaYou. Os templates são bem feitos e as opções de personalização são suficientes para criar algo único.",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Mariana Costa",
      role: "Estudante",
      content:
        "Fiz um cartão para minha avó que mora longe e ela ficou emocionada! A interface é super intuitiva e o resultado final ficou muito profissional.",
      rating: 4,
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-4xl md:text-5xl">
              O Que Estão Dizendo
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Veja o que nossos usuários acharam da experiência de criar cartões com o PascoaYou
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-purple-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">"{testimonial.content}"</p>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-gray-500">Usuário verificado</div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-700">15,000+</p>
              <p className="text-sm text-gray-500">Cartões Criados</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-700">8,000+</p>
              <p className="text-sm text-gray-500">Compartilhamentos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-700">4.8/5</p>
              <p className="text-sm text-gray-500">Avaliação Média</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

