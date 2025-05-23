"use client";

import { useState, useCallback, useEffect } from "react";
import { CarCard } from "./car-card";
import { FilterSidebar } from "./filter-sidebar";
import { Button } from "@/components/ui/button";
import { Filter, X, Heart, Search } from "lucide-react";
import { UiCar } from "../types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  isUserAuthenticated, 
  getUserFavorites, 
  addToFavorites, 
  removeFromFavorites 
} from "@/app/actions";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface CarListingProps {
  initialCars: UiCar[];
}

export function CarListing({ initialCars }: CarListingProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Update handleFilterChange to also filter by searchTerm
  const handleFilterChange = useCallback((filtered: UiCar[]) => {
    let result = filtered;
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(searchLower) ||
          car.brand.toLowerCase().includes(searchLower)
      );
    }
    setFilteredCars(result);
  }, [searchTerm]);

  // Add effect to filter when searchTerm changes
  useEffect(() => {
    handleFilterChange(allCars);
  }, [searchTerm, allCars, handleFilterChange]);

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
        {/* Mobile search bar with filter icon */}
        <div className="block md:hidden mb-4">
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="ابحث عن ماركة أو موديل"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-full pl-10 pr-12 py-2 text-sm border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full md:hidden"
              onClick={() => setIsFilterOpen(true)}
              aria-label="عرض الفلاتر"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
        {/* Desktop header */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">المركبات المميزة</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter drawer */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetContent side="left" className="p-0 w-80">
              <div className="p-4 mt-12">
                <FilterSidebar
                  onFilterChange={handleFilterChange}
                  allCars={allCars}
                />
              </div>
            </SheetContent>
          </Sheet>
          {/* Desktop sidebar */}
          <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              allCars={allCars}
            />
          </div>
          {/* Car grid ... unchanged */}
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
