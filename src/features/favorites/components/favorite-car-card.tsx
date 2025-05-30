"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge, Fuel, Milestone, Cog } from "lucide-react";
import Link from "next/link";
import { FavoriteCar } from "../types";
import { FavoriteButton } from "./favorite-button";

interface FavoriteCarCardProps {
  car: FavoriteCar;
}

export function FavoriteCarCard({ car }: FavoriteCarCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg bg-background">
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
        {/* Use our new FavoriteButton component */}
        <FavoriteButton carId={car.id} variant="floating" />
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
            <span>
              {car.mileage && car.mileage > 0
                ? `${car.mileage.toLocaleString()} كم`
                : "جديد"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Milestone className="h-4 w-4 text-muted-foreground" />
            <span>{car.year ? car.year : "غير محدد"}</span>
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

        {/* Show when added to favorites if available */}
        {car.addedAt && (
          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
            أُضيف للمفضلة في {new Date(car.addedAt).toLocaleDateString("ar")}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/cars/${car.id}`} className="flex-1">
          <Button className="w-full" variant="default">
            عرض التفاصيل
          </Button>
        </Link>
        <Button className="flex-1" variant="outline">
          طلب تجربة
        </Button>
      </CardFooter>
    </Card>
  );
}
