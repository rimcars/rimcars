"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  Heart,
  Share2,
  Gauge,
  Fuel,
  Cog,
  Calendar,
  CarIcon,
  Shield,
  Info,
  Check,
  User,
  Phone,
  MapPin,
} from "lucide-react";
import { UiCar } from "../types";

interface CarDetailsClientProps {
  car: UiCar;
}

export function CarDetailsClient({ car }: CarDetailsClientProps) {
  // Create a gallery from the car's image (or use a placeholder)
  const gallery = car.image ? [car.image] : ["/placeholder.svg"];

  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // التحقق مما إذا كانت السيارة في المفضلة
    const savedFavorites = localStorage.getItem("carFavorites");
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      setIsFavorite(favorites.includes(car.id));
    }
  }, [car.id]);

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem("carFavorites");
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (favorites.includes(car.id)) {
      favorites = favorites.filter((id: string) => id !== car.id);
      setIsFavorite(false);
    } else {
      favorites.push(car.id);
      setIsFavorite(true);
    }

    localStorage.setItem("carFavorites", JSON.stringify(favorites));
  };

  return (
    <div className="container py-8">
      {/* مسار التنقل والإجراءات */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="/cars"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            العودة إلى القائمة
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={toggleFavorite}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite ? "fill-primary text-primary" : ""
              }`}
            />
            {isFavorite ? "تم الحفظ" : "حفظ"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Share2 className="h-4 w-4" />
            مشاركة
          </Button>
        </div>
      </div>

      {/* عنوان السيارة والسعر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">{car.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{car.brand}</Badge>
            {car.year && <Badge variant="outline">{car.year}</Badge>}
            <Badge variant="outline">{car.fuelType}</Badge>
          </div>
        </div>
        <div className="text-3xl font-bold">
          {car.price.toLocaleString()} MRU
        </div>
      </div>

      {/* معرض صور السيارة */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4 mb-8">
        <div className="relative aspect-[16/9] bg-muted rounded-lg overflow-hidden">
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt={car.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          {gallery.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-[16/9] bg-muted rounded-lg overflow-hidden cursor-pointer border-2 ${
                selectedImage === image
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${car.name} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* المواصفات */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">حول {car.brand} هذه</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {car.year && (
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">السنة</div>
                  <div className="font-medium">{car.year}</div>
                </div>
              </div>
            )}
            {car.condition && (
              <div className="flex items-center gap-2">
                <CarIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">الحالة</div>
                  <div className="font-medium">{car.condition}</div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Fuel className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">نوع الوقود</div>
                <div className="font-medium">{car.fuelType}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Cog className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">ناقل الحركة</div>
                <div className="font-medium">{car.transmission}</div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold mb-4">المواصفات الفنية</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">الماركة</span>
              <span className="font-medium">{car.brand}</span>
            </div>
            {car.year && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">سنة الصنع</span>
                <span className="font-medium">{car.year}</span>
              </div>
            )}
            {car.condition && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">الحالة</span>
                <span className="font-medium">{car.condition}</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">ناقل الحركة</span>
              <span className="font-medium">{car.transmission}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">نوع الوقود</span>
              <span className="font-medium">{car.fuelType}</span>
            </div>
            {car.mileage !== null && car.mileage !== undefined && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">عدد الكيلومترات</span>
                <span className="font-medium">
                  {car.mileage.toLocaleString()} كم
                </span>
              </div>
            )}
            {car.location && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">الموقع</span>
                <span className="font-medium">{car.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* جانب الإجراءات */}
        <div className="md:col-span-1">
          <div className="bg-muted p-6 rounded-lg sticky top-4">
            <h3 className="text-lg font-semibold mb-4">معلومات البائع</h3>

            {car.sellerName || car.sellerPhone ? (
              <div className="space-y-4 mb-6">
                {car.sellerName && (
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">الاسم</div>
                      <div className="font-medium">{car.sellerName}</div>
                    </div>
                  </div>
                )}

                {car.sellerPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        رقم الهاتف
                      </div>
                      <div className="font-medium" dir="ltr">
                        {car.sellerPhone}
                      </div>
                    </div>
                  </div>
                )}

                {car.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        الموقع
                      </div>
                      <div className="font-medium">{car.location}</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground mb-4">
                لا توجد معلومات اتصال متاحة للبائع
              </div>
            )}

            <h3 className="text-lg font-semibold mb-4">مهتم بهذه السيارة؟</h3>
            <div className="space-y-3">
              {car.sellerPhone ? (
                <Button className="w-full" asChild>
                  <a href={`tel:${car.sellerPhone}`}>
                    اتصل بالبائع
                    <Phone className="h-4 w-4 mr-2" />
                  </a>
                </Button>
              ) : (
                <Button className="w-full">جدولة قيادة تجريبية</Button>
              )}
              <Button variant="outline" className="w-full">
                طلب المزيد من المعلومات
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          استكشف المزيد من السيارات
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {/* You can fetch and display more cars here when implemented */}
          <div className="rounded-lg border p-4 flex flex-col items-center justify-center text-center h-48 bg-muted">
            <p className="text-muted-foreground">
              استكشف المزيد من السيارات المتاحة
            </p>
            <Link href="/cars">
              <Button variant="outline" className="mt-4">
                عرض جميع السيارات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
