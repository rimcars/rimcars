"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Heart, Share2, Gauge, Fuel, Cog, Calendar, CarIcon, Shield, Info, Check } from "lucide-react"

interface Car {
  id: number
  name: string
  price: number
  year: number
  image: string
  speed: number
  mileage: number
  fuelType: string
  transmission: string
  brand: string
  description: string
  engine: string
  horsepower: number
  acceleration: number
  colors: string[]
  features: string[]
  gallery: string[]
}

interface CarDetailsClientProps {
  car: Car
  allCars: Car[]
}

export function CarDetailsClient({ car, allCars }: CarDetailsClientProps) {
  const [selectedImage, setSelectedImage] = useState(car.gallery[0])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // التحقق مما إذا كانت السيارة في المفضلة
    const savedFavorites = localStorage.getItem("carFavorites")
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites)
      setIsFavorite(favorites.includes(car.id))
    }
  }, [car.id])

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem("carFavorites")
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : []

    if (favorites.includes(car.id)) {
      favorites = favorites.filter((id: number) => id !== car.id)
      setIsFavorite(false)
    } else {
      favorites.push(car.id)
      setIsFavorite(true)
    }

    localStorage.setItem("carFavorites", JSON.stringify(favorites))
  }

  return (
    <div className="container py-8">
      {/* مسار التنقل والإجراءات */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4 mr-1" />
            العودة إلى القائمة
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={toggleFavorite}>
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : ""}`} />
            {isFavorite ? "تم الحفظ" : "حفظ"}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
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
            <Badge variant="outline">{car.year}</Badge>
            <Badge variant="outline">{car.fuelType}</Badge>
          </div>
        </div>
        <div className="text-3xl font-bold">${car.price.toLocaleString()}</div>
      </div>

      {/* معرض صور السيارة */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4 mb-8">
        <div className="relative aspect-[16/9] bg-muted rounded-lg overflow-hidden">
          <Image src={selectedImage || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          {car.gallery.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={`relative aspect-[16/9] bg-muted rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === image ? "border-primary" : "border-transparent"}`}
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

      {/* علامات تبويب تفاصيل السيارة */}
      <Tabs defaultValue="overview" className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="specifications">المواصفات</TabsTrigger>
          <TabsTrigger value="features">الميزات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">حول {car.brand} هذه</h2>
              <p className="text-muted-foreground">{car.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">السنة</div>
                    <div className="font-medium">{car.year}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">السرعة القصوى</div>
                    <div className="font-medium">{car.speed} كم/س</div>
                  </div>
                </div>
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
            </div>

            <div className="space-y-6">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">مهتم بهذه السيارة؟</h3>
                <div className="space-y-3">
                  <Button className="w-full">جدولة قيادة تجريبية</Button>
                  <Button variant="outline" className="w-full">
                    طلب المزيد من المعلومات
                  </Button>
                  <Button variant="outline" className="w-full">
                    التحقق من التوفر
                  </Button>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">الألوان المتاحة</h3>
                <div className="flex flex-wrap gap-3">
                  {car.colors.map((color, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">المواصفات الفنية</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">المحرك</span>
                  <span className="font-medium">{car.engine}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">القوة الحصانية</span>
                  <span className="font-medium">{car.horsepower} حصان</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">التسارع (0-100 كم/س)</span>
                  <span className="font-medium">{car.acceleration} ثانية</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">السرعة القصوى</span>
                  <span className="font-medium">{car.speed} كم/س</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">ناقل الحركة</span>
                  <span className="font-medium">{car.transmission}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">نوع الوقود</span>
                  <span className="font-medium">{car.fuelType}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">الأداء</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <CarIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">أداء متميز</h3>
                    <p className="text-sm text-muted-foreground">مصممة لديناميكيات قيادة استثنائية</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Gauge className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">تحكم استجابي</h3>
                    <p className="text-sm text-muted-foreground">توجيه دقيق وانعطاف رشيق</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">أمان متقدم</h3>
                    <p className="text-sm text-muted-foreground">ميزات أمان شاملة لراحة البال</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">الميزات والتجهيزات</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {car.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="bg-muted p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Info className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">معلومات إضافية</h3>
            </div>
            <p className="text-muted-foreground">
              تأتي هذه السيارة مع حزمة ضمان شاملة وصيانة مجانية للسنة الأولى. اتصل
              بفريق المبيعات لدينا للحصول على مزيد من التفاصيل حول خيارات التمويل والحزم الإضافية المتاحة.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* سيارات مشابهة */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">قد يعجبك أيضًا</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCars
            .filter((c) => c.id !== car.id)
            .slice(0, 3)
            .map((similarCar) => (
              <Link href={`/cars/${similarCar.id}`} key={similarCar.id} className="block">
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src={similarCar.image || "/placeholder.svg"}
                      alt={similarCar.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{similarCar.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold">${similarCar.price.toLocaleString()}</span>
                      <Badge variant="outline">{similarCar.year}</Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

