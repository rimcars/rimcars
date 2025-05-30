"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/features/public-listings/components/car-card";
import { UiCar } from "@/features/public-listings/types";

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

// Simple conversion function for featured cars
function convertCarToUiCar(car: Car): UiCar {
  // Map fuel_type to Arabic display names
  const fuelTypeMap: Record<string, string> = {
    petrol: "بنزين",
    diesel: "ديزل",
    electric: "كهربائي",
    hybrid: "هجين",
  };

  // Map transmission to Arabic display names
  const transmissionMap: Record<string, string> = {
    automatic: "أوتوماتيك",
    manual: "يدوي",
  };

  // Map condition to Arabic display names
  const conditionMap: Record<string, string> = {
    new: "جديد",
    used: "مستعمل",
  };

  return {
    id: car.id,
    name: car.car_name,
    price: car.price,
    year: car.year,
    image: car.images?.[0] || null,
    images: car.images || [],
    mileage: car.mileage,
    fuelType: fuelTypeMap[car.fuel_type || ""] || car.fuel_type || "غير محدد",
    transmission:
      transmissionMap[car.transmission || ""] || car.transmission || "غير محدد",
    brand: car.make || "غير محدد",
    model: car.model,
    condition: conditionMap[car.condition] || car.condition || "غير محدد",
    location: car.location,
    sellerName: car.seller_name,
    sellerPhone: car.seller_phone,
  };
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  // Convert the cars to UiCar format for CarCard component
  const uiCars = cars.map(convertCarToUiCar);

  return (
    <section className="py-16 bg-background">
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
          {uiCars.map((car) => (
            <CarCard key={car.id} car={car} />
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
