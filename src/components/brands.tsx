import Image from "next/image"
import { Button } from "@/components/ui/button"

const brands = [
  { name: "Mercedes-Benz", logo: "/placeholder.svg?height=80&width=160" },
  { name: "BMW", logo: "/placeholder.svg?height=80&width=160" },
  { name: "Audi", logo: "/placeholder.svg?height=80&width=160" },
  { name: "Tesla", logo: "/placeholder.svg?height=80&width=160" },
  { name: "Lexus", logo: "/placeholder.svg?height=80&width=160" },
  { name: "Volvo", logo: "/placeholder.svg?height=80&width=160" },
]

export function Brands() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Premium Brands</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We partner with the world&apos;s leading automotive manufacturers to bring you the finest selection of premium
            vehicles.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border hover:shadow-md transition-shadow"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={`${brand.name} logo`}
                width={160}
                height={80}
                className="h-12 w-auto object-contain mb-4"
              />
              <span className="font-medium">{brand.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Brands
          </Button>
        </div>
      </div>
    </section>
  )
}

