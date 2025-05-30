"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Share2,
  Gauge,
  Fuel,
  Cog,
  Calendar,
  CarIcon,
  Shield,
  Check,
  User,
  Phone,
  MapPin,
  MessageCircle,
  Eye,
  Info,
} from "lucide-react";
import { UiCar, getCarShareData } from "../types";
import { BasicShareModal } from "./basic-share-modal";
import { FavoriteButton } from "@/features/favorites";
import { CarImageGallery } from "./car-image-gallery";

interface CarDetailsClientProps {
  car: UiCar;
}

export function CarDetailsClient({ car }: CarDetailsClientProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { url: shareUrl, title: shareTitle } = getCarShareData(car);
  const isNew = car.condition === "جديد";

  // Prepare images array for gallery
  const carImages =
    car.images && car.images.length > 0
      ? car.images
      : [car.image || "/placeholder.svg"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header Navigation */}
      <div className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/cars"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
              <span>العودة إلى القائمة</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsShareModalOpen(true)}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                مشاركة
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 space-y-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <CarImageGallery images={carImages} carName={car.name} />

            {/* Car badges overlay for mobile */}
            <div className="flex items-center gap-2 lg:hidden">
              {car.year && (
                <Badge
                  variant={isNew ? "default" : "secondary"}
                  className="shadow-sm"
                >
                  {car.year}
                </Badge>
              )}
              {isNew && (
                <Badge className="bg-green-500 text-white shadow-sm">
                  جديد
                </Badge>
              )}
              {car.location && (
                <Badge variant="outline">
                  <MapPin className="h-3 w-3 me-1" />
                  {car.location}
                </Badge>
              )}
            </div>
          </div>

          {/* Car Information */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{car.brand}</Badge>
                {car.model && <Badge variant="outline">{car.model}</Badge>}
                <Badge variant="outline">{car.fuelType}</Badge>
              </div>
              <h1 className="text-4xl font-bold leading-tight">{car.name}</h1>
              <div className="text-4xl font-bold text-primary">
                {car.price.toLocaleString()}
                <span className="text-lg font-normal text-muted-foreground ml-2">
                  MRU
                </span>
              </div>
            </div>

            {/* Quick Specs */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Gauge className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">
                        {car.mileage && car.mileage > 0
                          ? `${car.mileage.toLocaleString()} كم`
                          : "جديد"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        المسافة المقطوعة
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">
                        {car.year || "غير محدد"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        سنة الصنع
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Fuel className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{car.fuelType}</div>
                      <div className="text-sm text-muted-foreground">
                        نوع الوقود
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Cog className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{car.transmission}</div>
                      <div className="text-sm text-muted-foreground">
                        ناقل الحركة
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() =>
                  car.sellerPhone &&
                  window.open(`tel:${car.sellerPhone}`, "_self")
                }
                disabled={!car.sellerPhone}
              >
                <Phone className="h-4 w-4" />
                {car.sellerPhone ? "اتصل بالبائع" : "رقم الهاتف غير متوفر"}
              </Button>
            </div>

            {/* Seller Info */}
            {car.sellerName && (
              <Card className="border-0 shadow-md bg-blue-50/50 dark:bg-blue-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-blue-900 dark:text-blue-100">
                        {car.sellerName}
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        البائع
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Description */}
        {car.description && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5" />
                وصف السيارة
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {car.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Detailed Specifications */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CarIcon className="h-5 w-5" />
              المواصفات التفصيلية
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">المواصفات العامة</h3>
                <div className="space-y-3">
                  {[
                    { label: "الماركة", value: car.brand },
                    { label: "الطراز", value: car.model || "غير محدد" },
                    { label: "سنة الصنع", value: car.year || "غير محدد" },
                    { label: "نوع الوقود", value: car.fuelType },
                    { label: "ناقل الحركة", value: car.transmission },
                  ].map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-muted"
                    >
                      <span className="text-muted-foreground">
                        {spec.label}:
                      </span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">الحالة والمسافة</h3>
                <div className="space-y-3">
                  {[
                    { label: "الحالة", value: car.condition },
                    {
                      label: "المسافة المقطوعة",
                      value:
                        car.mileage && car.mileage > 0
                          ? `${car.mileage.toLocaleString()} كم`
                          : "جديد",
                    },
                    { label: "الموقع", value: car.location || "غير محدد" },
                  ].map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-muted"
                    >
                      <span className="text-muted-foreground">
                        {spec.label}:
                      </span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card className="border-0 shadow-md bg-yellow-50/50 dark:bg-yellow-900/20">
          <CardContent className="p-6">
            <h3 className="font-semibold flex items-center gap-2 mb-4 text-yellow-800 dark:text-yellow-200">
              <Shield className="h-5 w-5" />
              نصائح للأمان والشراء الآمن
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "تأكد من فحص السيارة جيداً قبل الشراء",
                "اطلب الأوراق الثبوتية للسيارة",
                "تجنب دفع أي مبالغ قبل رؤية السيارة",
                "قم بتجربة قيادة السيارة قبل الشراء",
                "تأكد من صحة أرقام الهيكل والمحرك",
                "استعن بخبير فحص السيارات إذا أمكن",
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-yellow-800 dark:text-yellow-200">
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Share Modal */}
      <BasicShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={shareUrl}
        title={shareTitle}
      />
    </div>
  );
}
