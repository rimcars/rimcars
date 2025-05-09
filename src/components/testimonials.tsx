import Image from 'next/image';

const testimonials = [
  {
    content: "I found my dream car on RimCars within a week of searching. The process was seamless and I couldn't be happier with my purchase!",
    author: "Sarah Johnson",
    role: "BMW X5 Owner",
    avatar: "/testimonial-1.jpg"
  },
  {
    content: "As a seller, I appreciate how easy RimCars makes it to list and manage my inventory. I've sold three cars through the platform already!",
    author: "Michael Rodriguez",
    role: "Car Dealer",
    avatar: "/testimonial-2.jpg"
  },
  {
    content: "The detailed filters helped me find exactly what I was looking for. Great platform with an excellent selection of premium vehicles.",
    author: "Emily Chen",
    role: "Mercedes C-Class Owner",
    avatar: "/testimonial-3.jpg"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it, hear from our satisfied customers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.author}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">{testimonial.content}</p>
              <div className="absolute -right-2 -top-2 text-4xl text-primary opacity-10">❝</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 