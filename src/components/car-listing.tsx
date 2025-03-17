"use client"

import { useState, useCallback, useEffect } from "react"
import { CarCard } from "@/components/car-card"
import { FilterSidebar } from "@/components/filter-sidebar"
import { Button } from "@/components/ui/button"
import { Filter, X, Heart } from "lucide-react"

// بيانات السيارات النموذجية
const cars = [
  {
    id: 1,
    name: "مرسيدس-بنز الفئة E",
    price: 62000,
    year: 2023,
    image: "/placeholder.svg?height=300&width=500",
    speed: 250,
    mileage: 0,
    fuelType: "هجين",
    transmission: "أوتوماتيك",
    brand: "مرسيدس-بنز",
  },
  {
    id: 2,
    name: "بي إم دبليو الفئة 5",
    price: 58000,
    year: 2023,
    image: "/placeholder.svg?height=300&width=500",
    speed: 240,
    mileage: 0,
    fuelType: "بنزين",
    transmission: "أوتوماتيك",
    brand: "بي إم دبليو",
  },
  {
    id: 3,
    name: "أودي A6",
    price: 59500,
    year: 2023,
    image: "/placeholder.svg?height=300&width=500",
    speed: 245,
    mileage: 0,
    fuelType: "ديزل",
    transmission: "أوتوماتيك",
    brand: "أودي",
  },
  {
    id: 4,
    name: "تسلا موديل 3",
    price: 48000,
    year: 2023,
    image: "/placeholder.svg?height=300&width=500",
    speed: 225,
    mileage: 0,
    fuelType: "كهربائي",
    transmission: "أوتوماتيك",
    brand: "تسلا",
  },
  {
    id: 5,
    name: "لكزس ES",
    price: 52000,
    year: 2023,
    image: "/placeholder.svg?height=300&width=500",
    speed: 210,
    mileage: 0,
    fuelType: "هجين",
    transmission: "أوتوماتيك",
    brand: "لكزس",
  },
  {
    id: 6,
    name: "فولفو S90",
    price: 54000,
    year: 2023,
    image: "/placeholder.svg?height=300&width=500",
    speed: 230,
    mileage: 0,
    fuelType: "هجين",
    transmission: "أوتوماتيك",
    brand: "فولفو",
  },
]

export function CarListing() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredCars, setFilteredCars] = useState(cars)
  const [favorites, setFavorites] = useState<number[]>([])

  // تحميل المفضلة من التخزين المحلي عند التحميل الأولي
  useEffect(() => {
    const savedFavorites = localStorage.getItem("carFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // حفظ المفضلة في التخزين المحلي عند تغييرها
  useEffect(() => {
    localStorage.setItem("carFavorites", JSON.stringify(favorites))
  }, [favorites])

  // استخدام useCallback لتخزين معالج تغيير الفلتر
  const handleFilterChange = useCallback((filtered: typeof cars) => {
    setFilteredCars(filtered)
  }, [])

  // تبديل حالة المفضلة للسيارة
  const toggleFavorite = useCallback((carId: number) => {
    setFavorites((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId)
      } else {
        return [...prev, carId]
      }
    })
  }, [])

  // الحصول على السيارات المفضلة من القائمة المفلترة
  const favoriteCars = filteredCars.filter((car) => favorites.includes(car.id))

  // الحصول على السيارات غير المفضلة من القائمة المفلترة
  const nonFavoriteCars = filteredCars.filter((car) => !favorites.includes(car.id))

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">المركبات المميزة</h2>
          <Button variant="outline" className="md:hidden flex items-center gap-2" onClick={() => setIsFilterOpen(true)}>
            <Filter className="h-4 w-4" />
            الفلاتر
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* شريط الفلتر للجوال */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 bg-background md:hidden">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold">الفلاتر</h3>
                  <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <FilterSidebar onFilterChange={handleFilterChange} allCars={cars} />
                </div>
                <div className="p-4 border-t">
                  <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                    تطبيق الفلاتر
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* شريط الفلتر للكمبيوتر */}
          <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
            <FilterSidebar onFilterChange={handleFilterChange} allCars={cars} />
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
                        <CarCard key={`fav-${car.id}`} car={car} isFavorite={true} onToggleFavorite={toggleFavorite} />
                      ))}
                    </div>
                  </div>
                )}

                {/* قسم السيارات الأخرى */}
                {nonFavoriteCars.length > 0 && (
                  <div className="space-y-4">
                    {favoriteCars.length > 0 && <h3 className="text-xl font-semibold">مركبات أخرى</h3>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {nonFavoriteCars.map((car) => (
                        <CarCard key={car.id} car={car} isFavorite={false} onToggleFavorite={toggleFavorite} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-xl font-semibold mb-2">لا توجد سيارات تطابق الفلاتر الخاصة بك</h3>
                <p className="text-muted-foreground mb-6">حاول تعديل معايير الفلتر</p>
                <Button onClick={() => setFilteredCars(cars)}>إعادة ضبط الفلاتر</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

