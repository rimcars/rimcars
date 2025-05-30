"use client";

import { useState, useCallback, useEffect } from "react";
import { CarCard } from "./car-card";
import { FilterSidebar } from "./filter-sidebar";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { UiCar } from "../types";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface CarListingProps {
  initialCars: UiCar[];
}

export function CarListing({ initialCars }: CarListingProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredCars, setFilteredCars] = useState<UiCar[]>(initialCars);

  // Handle filter changes from FilterSidebar
  const handleFilterChange = useCallback((filtered: UiCar[]) => {
    setFilteredCars(filtered);
  }, []);

  // Initialize filtered cars
  useEffect(() => {
    setFilteredCars(initialCars);
  }, [initialCars]);

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">المركبات المميزة</h2>
            <p className="text-muted-foreground">
              اكتشف أفضل السيارات المتاحة لدينا
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(true)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              فلترة
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              allCars={initialCars}
            />
          </div>

          {/* Mobile Filter Sheet */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetContent side="right" className="p-0 w-80">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="font-semibold">الفلاتر</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6">
                <FilterSidebar
                  onFilterChange={handleFilterChange}
                  allCars={initialCars}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Cars Grid */}
          <div className="flex-1">
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  لم يتم العثور على مركبات تطابق البحث
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
