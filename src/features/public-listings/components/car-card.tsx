"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Gauge,
  Fuel,
  Milestone,
  Cog,
  Eye,
  Phone,
  MapPin,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { UiCar } from "../types";
import { FavoriteButton } from "@/features/favorites";

interface CarCardProps {
  car: UiCar;
}

export function CarCard({ car }: CarCardProps) {
  const isNew = car.condition === "جديد";

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-background border shadow-sm">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={car.name}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Row: Year Badge + Condition + Favorite */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            {car.year && (
              <Badge
                variant={isNew ? "default" : "secondary"}
                className="bg-white/90 text-foreground backdrop-blur-sm shadow-sm"
              >
                {car.year}
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-green-500 text-white shadow-sm">جديد</Badge>
            )}
          </div>
          <FavoriteButton carId={car.id} variant="floating" />
        </div>

        {/* Quick View on Hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          <Link href={`/cars/${car.id}`}>
            <Button
              size="sm"
              className="bg-white/90 text-foreground hover:bg-white shadow-sm"
            >
              <Eye className="h-4 w-4 me-1" />
              نظرة سريعة
            </Button>
          </Link>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Header: Brand + Name + Price */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-medium">
              {car.brand}
            </Badge>
            {car.model && (
              <span className="text-xs text-muted-foreground">{car.model}</span>
            )}
          </div>

          <div className="flex items-start justify-between">
            <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
              {car.name}
            </h3>
            <div className="text-xl font-bold text-primary">
              {car.price.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                MRU
              </span>
            </div>
          </div>
        </div>

        {/* Compact Specifications */}
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
          <div className="flex items-center gap-1">
            <Gauge className="h-3 w-3" />
            <span>
              {car.mileage && car.mileage > 0
                ? `${car.mileage.toLocaleString()} كم`
                : "جديد"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{car.year || "غير محدد"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-3 w-3" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Cog className="h-3 w-3" />
            <span>{car.transmission}</span>
          </div>
        </div>

        {/* Location (if available) */}
        {car.location && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{car.location}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Essential CTAs Only */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <Link href={`/cars/${car.id}`} className="flex-1">
            <Button
              className="w-full group/btn transition-all"
              variant="default"
            >
              <span>عرض التفاصيل</span>
              <ArrowLeft className="h-4 w-4 ms-2 transition-transform group-hover/btn:-translate-x-1" />
            </Button>
          </Link>

          <Button
            variant="outline"
            className="flex-1 transition-all hover:border-primary hover:text-primary"
            onClick={() =>
              car.sellerPhone && window.open(`tel:${car.sellerPhone}`, "_self")
            }
            disabled={!car.sellerPhone}
          >
            <Phone className="h-4 w-4 me-2" />
            {car.sellerPhone ? "اتصال" : "غير متوفر"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
