"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge, Fuel, Milestone, Cog, Heart } from "lucide-react";
import Link from "next/link";
import { UiCar } from "../types";

interface CarCardProps {
  car: UiCar;
  isFavorite: boolean;
  onToggleFavorite: (carId: string) => void;
}

export function CarCard({ car, isFavorite, onToggleFavorite }: CarCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={car.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {car.year && (
          <Badge className="absolute top-2 right-2 bg-primary">
            {car.year}
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 bg-white/80 hover:bg-white/90 text-primary rounded-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(car.id);
          }}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-primary" : ""}`} />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-lg line-clamp-1">{car.name}</h3>
          <Badge variant="outline">{car.brand}</Badge>
        </div>
        <div className="text-2xl font-bold mb-4">
          {car.price.toLocaleString()} MRU
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span>{car.speed} كم/س</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Milestone className="h-4 w-4 text-muted-foreground" />
            <span>
              {car.mileage && car.mileage > 0
                ? `${car.mileage.toLocaleString()} كم`
                : "جديد"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Fuel className="h-4 w-4 text-muted-foreground" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Cog className="h-4 w-4 text-muted-foreground" />
            <span>{car.transmission}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/cars/${car.id}`} className="w-full">
          <Button className="w-full" variant="default">
            عرض التفاصيل
          </Button>
        </Link>
        <Button className="w-full" variant="outline">
          طلب تجربة
        </Button>
      </CardFooter>
    </Card>
  );
}
