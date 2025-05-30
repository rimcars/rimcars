"use client";

import { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFavoritesStore } from "../store/favoritesStore";
import { FavoriteCarCard } from "./favorite-car-card";
import { FavoriteCar } from "../types";
import { createClient } from "@/utils/supabase/client";
import { UiCar, convertListingToUiCar } from "@/features/public-listings/types";

export function FavoritesPage() {
  const { favorites, getFavoriteCount } = useFavoritesStore();
  const [favoriteCars, setFavoriteCars] = useState<FavoriteCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch car details for favorited cars
  useEffect(() => {
    async function fetchFavoriteCars() {
      if (favorites.length === 0) {
        setFavoriteCars([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const supabase = createClient();

        const { data: listings, error } = await supabase
          .from("listings")
          .select("*")
          .in("id", favorites);

        if (error) throw error;

        if (listings) {
          const cars: FavoriteCar[] = listings.map(convertListingToUiCar);
          setFavoriteCars(cars);
        }
      } catch (err) {
        console.error("Error fetching favorite cars:", err);
        setError("حدث خطأ أثناء تحميل السيارات المفضلة");
      } finally {
        setIsLoading(false);
      }
    }

    fetchFavoriteCars();
  }, [favorites]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">المفضلة</h1>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            جاري تحميل السيارات المفضلة...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center space-y-4">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-bold">خطأ في تحميل المفضلة</h1>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()}>
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (favorites.length === 0 || favoriteCars.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">المفضلة</h1>
          <p className="text-muted-foreground mt-2">
            السيارات التي أضفتها للمفضلة
          </p>
        </div>

        <div className="text-center space-y-4 py-12">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-xl font-semibold">لا توجد سيارات في المفضلة</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            ابحث عن السيارات التي تعجبك وأضفها للمفضلة للوصول إليها بسهولة.
          </p>
          <Button asChild>
            <Link href="/">
              <ShoppingCart className="h-4 w-4 me-2" />
              تصفح السيارات
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Show favorites
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">المفضلة</h1>
        <p className="text-muted-foreground mt-2">
          لديك {getFavoriteCount()} سيارة في المفضلة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteCars.map((car) => (
          <FavoriteCarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
