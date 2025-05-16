"use client";

import { useState } from "react";
import { UiCar } from "@/features/public-listings/types";
import { CarCard } from "@/features/public-listings/components/car-card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, AlertCircle } from "lucide-react";
import Link from "next/link";
import { removeFromFavorites } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FavoritesClientProps {
  favoriteCars: UiCar[];
  userId: string;
  isEmpty: boolean;
  error?: string;
}

export function FavoritesClient({
  favoriteCars,
  userId,
  isEmpty,
  error,
}: FavoritesClientProps) {
  const router = useRouter();
  const [removingCarId, setRemovingCarId] = useState<string | null>(null);

  const handleRemoveFavorite = async (carId: string) => {
    try {
      setRemovingCarId(carId);
      await removeFromFavorites(carId);
      router.refresh(); // Refresh the page to update the UI
    } catch (error) {
      console.error("Error removing favorite:", error);
    } finally {
      setRemovingCarId(null);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/">العودة إلى الصفحة الرئيسية</Link>
        </Button>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">لا توجد سيارات في المفضلة</h2>
          <p className="text-muted-foreground mb-8 max-w-lg">
            يمكنك إضافة سيارات إلى المفضلة بالضغط على زر القلب في بطاقة السيارة
          </p>
          <Button asChild>
            <Link href="/cars">تصفح السيارات</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <h1 className="text-3xl font-bold">السيارات المفضلة</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/cars">
            <ShoppingCart className="h-4 w-4 me-2" />
            تصفح المزيد من السيارات
          </Link>
        </Button>
      </div>

      {favoriteCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={true}
              onToggleFavorite={() => handleRemoveFavorite(car.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">لا توجد سيارات في المفضلة</h2>
          <p className="text-muted-foreground mb-8 max-w-lg">
            يمكنك إضافة سيارات إلى المفضلة بالضغط على زر القلب في بطاقة السيارة
          </p>
          <Button asChild>
            <Link href="/cars">تصفح السيارات</Link>
          </Button>
        </div>
      )}
    </div>
  );
} 