import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Gauge, Fuel, Cog, User, MapPin } from "lucide-react";

interface Car {
  id: string;
  car_name: string;
  make: string;
  model: string;
  year: number | null;
  price: number;
  condition: string;
  images: string[];
  mileage?: number | null;
  fuel_type?: string;
  transmission?: string;
  location?: string | null;
  seller_name?: string | null;
  seller_phone?: string | null;
}

interface FeaturedCarsProps {
  cars: Car[];
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  return (
    <section className="py-16 bg-muted/40">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            السيارات المميزة
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            اكتشف مجموعتنا المختارة من السيارات الفاخرة
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((car) => (
            <Card
              key={car.id}
              className="overflow-hidden transition-all hover:shadow-lg group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={car.images[0] || "/car-placeholder.jpg"}
                  alt={car.car_name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <Badge
                  variant={car.condition === "new" ? "default" : "secondary"}
                  className="absolute top-2 right-2"
                >
                  {car.condition === "new" ? "جديد" : "مستعمل"}
                </Badge>

                {/* Seller info overlay on hover */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-white">
                  {car.seller_name && (
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4" />
                      <span>{car.seller_name}</span>
                    </div>
                  )}
                  {car.location && (
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{car.location}</span>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-white border-white hover:bg-white hover:text-black"
                    asChild
                  >
                    <Link href={`/cars/${car.id}`}>عرض التفاصيل</Link>
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-lg truncate">
                    {car.car_name}
                  </h3>
                  <span className="text-primary font-bold text-xl">
                    {car.price.toLocaleString()} MRU
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {car.year || "—"}
                  </span>
                  {typeof car.mileage === "number" && (
                    <span className="flex items-center gap-1">
                      <Gauge className="h-4 w-4" />
                      {car.mileage.toLocaleString()} كم
                    </span>
                  )}
                  {car.fuel_type && (
                    <span className="flex items-center gap-1">
                      <Fuel className="h-4 w-4" />
                      {car.fuel_type === "petrol"
                        ? "بنزين"
                        : car.fuel_type === "diesel"
                        ? "ديزل"
                        : car.fuel_type === "electric"
                        ? "كهرباء"
                        : "هجين"}
                    </span>
                  )}
                  {car.transmission && (
                    <span className="flex items-center gap-1">
                      <Cog className="h-4 w-4" />
                      {car.transmission === "automatic" ? "أوتوماتيك" : "يدوي"}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  {car.make} {car.model}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Link href={`/cars/${car.id}`} className="w-full">
                  <Button className="w-full" variant="default">
                    عرض التفاصيل
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/cars">
            <Button size="lg">عرض جميع السيارات</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
