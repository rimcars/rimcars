"use client";

import { useState, useCallback, useEffect } from "react";
import { CarCard } from "./car-card";
import { FilterSidebar } from "./filter-sidebar";
import { Button } from "@/components/ui/button";
import { Filter, X, Heart } from "lucide-react";
import { UiCar } from "../types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  isUserAuthenticated, 
  getUserFavorites, 
  addToFavorites, 
  removeFromFavorites 
} from "@/app/actions";

interface CarListingProps {
  initialCars: UiCar[];
}

export function CarListing({ initialCars }: CarListingProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredCars, setFilteredCars] = useState<UiCar[]>(initialCars);
  const [allCars] = useState<UiCar[]>(initialCars);
  const [localFavorites, setLocalFavorites] = useState<string[]>([]);
  const queryClient = useQueryClient();
  
  // Check if user is authenticated using the server action
  const { data: authData, isLoading: isAuthLoading } = useQuery({
    queryKey: ['auth-status'],
    queryFn: async () => {
      console.log("Checking authentication status via server action...");
      const result = await isUserAuthenticated();
      console.log("Auth result from server:", result);
      return result;
    },
  });

  const isAuthenticated = authData?.isAuthenticated || false;
  const userId = authData?.userId;

  // Log auth status on each render
  useEffect(() => {
    console.log("Auth status from server:", { 
      isAuthenticated,
      userId,
      isAuthLoading 
    });
  }, [isAuthenticated, userId, isAuthLoading]);

  // Get user favorites using server action (for logged-in users)
  const { 
    data: favoritesData,
    isLoading: isFavoritesLoading,
  } = useQuery({
    queryKey: ['server-favorites', userId],
    queryFn: async () => {
      console.log("Fetching favorites via server action...");
      const result = await getUserFavorites();
      console.log("Favorites result from server:", result);
      return result;
    },
    enabled: isAuthenticated,
  });

  const dbFavorites = favoritesData?.favorites || [];

  // Load favorites from localStorage for non-logged-in users
  useEffect(() => {
    if (!isAuthenticated) {
      const savedFavorites = localStorage.getItem("carFavorites");
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        console.log("Loaded localStorage favorites:", parsedFavorites);
        setLocalFavorites(parsedFavorites);
      }
    }
  }, [isAuthenticated]);

  // Determine which favorites source to use
  const favorites = isAuthenticated ? dbFavorites : localFavorites;

  // Log favorites status
  useEffect(() => {
    console.log("Favorites status:", { 
      isAuthenticated,
      usingSource: isAuthenticated ? 'database' : 'localStorage',
      count: favorites.length, 
      favorites
    });
  }, [isAuthenticated, favorites]);
  
  // Add to favorites mutation
  const addFavoriteMutation = useMutation({
    mutationFn: async (carId: string) => {
      console.log("Adding favorite via server action:", carId);
      return await addToFavorites(carId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['server-favorites'] });
    },
    onError: (error) => {
      console.error("Error adding favorite:", error);
    }
  });

  // Remove from favorites mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: async (carId: string) => {
      console.log("Removing favorite via server action:", carId);
      return await removeFromFavorites(carId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['server-favorites'] });
    },
    onError: (error) => {
      console.error("Error removing favorite:", error);
    }
  });

  // Handle filter changes
  const handleFilterChange = useCallback((filtered: UiCar[]) => {
    setFilteredCars(filtered);
  }, []);

  // Toggle favorite status for a car
  const toggleFavorite = useCallback((carId: string) => {
    console.log("Toggle favorite called for:", carId);
    console.log("Current auth status:", { isAuthenticated, userId });
    
    const isFavorite = favorites.includes(carId);
    console.log("Is currently favorite:", isFavorite);
    
    if (isAuthenticated) {
      // Logged-in user - use server actions
      if (isFavorite) {
        console.log("Removing from favorites via server action...");
        removeFavoriteMutation.mutate(carId);
      } else {
        console.log("Adding to favorites via server action...");
        addFavoriteMutation.mutate(carId);
      }
    } else {
      // Non-logged-in user - use localStorage
      console.log("User not logged in, using localStorage");
      
      if (isFavorite) {
        // Remove from favorites
        const newFavorites = localFavorites.filter(id => id !== carId);
        setLocalFavorites(newFavorites);
        localStorage.setItem("carFavorites", JSON.stringify(newFavorites));
        console.log("Removed from localStorage favorites", newFavorites);
      } else {
        // Add to favorites
        const newFavorites = [...localFavorites, carId];
        setLocalFavorites(newFavorites);
        localStorage.setItem("carFavorites", JSON.stringify(newFavorites));
        console.log("Added to localStorage favorites", newFavorites);
      }
    }
  }, [isAuthenticated, userId, localFavorites, favorites, removeFavoriteMutation, addFavoriteMutation]);

  // Get favorite cars from the filtered list
  const favoriteCars = filteredCars.filter((car) => favorites.includes(car.id));

  // Get non-favorite cars from the filtered list
  const nonFavoriteCars = filteredCars.filter(
    (car) => !favorites.includes(car.id)
  );

  // Add a manual check for authentication
  const checkAuth = async () => {
    console.log("Manual auth check triggered...");
    try {
      const result = await isUserAuthenticated();
      console.log("Server auth check result:", result);
    } catch (error) {
      console.error("Auth check error:", error);
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">المركبات المميزة</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={checkAuth}>
              Check Auth
            </Button>
            <Button
              variant="outline"
              className="md:hidden flex items-center gap-2"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter className="h-4 w-4" />
              الفلاتر
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* شريط الفلتر للجوال */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 bg-background md:hidden">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold">الفلاتر</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <FilterSidebar
                    onFilterChange={handleFilterChange}
                    allCars={allCars}
                  />
                </div>
                <div className="p-4 border-t">
                  <Button
                    className="w-full"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    تطبيق الفلاتر
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* شريط الفلتر للكمبيوتر */}
          <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              allCars={allCars}
            />
          </div>

          {/* شبكة السيارات */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {filteredCars.length > 0 ? (
              <div className="space-y-10">
                {/* قسم المفضلة */}
                {favoriteCars.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary fill-primary" />
                      <h3 className="text-xl font-semibold">المفضلة لديك</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteCars.map((car) => (
                        <CarCard
                          key={`fav-${car.id}`}
                          car={car}
                          isFavorite={true}
                          onToggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* قسم السيارات الأخرى */}
                {nonFavoriteCars.length > 0 && (
                  <div className="space-y-4">
                    {favoriteCars.length > 0 && (
                      <h3 className="text-xl font-semibold">مركبات أخرى</h3>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {nonFavoriteCars.map((car) => (
                        <CarCard
                          key={car.id}
                          car={car}
                          isFavorite={false}
                          onToggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  لا توجد سيارات تطابق الفلاتر الخاصة بك
                </h3>
                <p className="text-muted-foreground mb-6">
                  حاول تعديل معايير الفلتر
                </p>
                <Button onClick={() => setFilteredCars(allCars)}>
                  إعادة ضبط الفلاتر
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
