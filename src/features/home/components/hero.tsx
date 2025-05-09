import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProps {
  isLoggedIn: boolean;
}

export default function Hero({ isLoggedIn }: HeroProps) {
  return (
    <section className="relative overflow-hidden font-almarai min-h-[500px] lg:min-h-[600px] flex flex-col justify-end">
      {/* Blue background covers the whole hero */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="خلفية"
          src="/hero-bg.png"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content and car image */}
      <div className="relative z-10 flex flex-col lg:flex-row items-end lg:items-stretch max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-0 lg:pt-0 lg:pb-0">
        {/* Car image - on left for desktop, on top for mobile */}
        <div className="flex justify-center w-full lg:w-1/2 order-1 lg:order-none">
          <div className="relative w-full h-44 xs:h-56 sm:h-72 md:h-80 lg:h-[480px] xl:h-[540px] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-full lg:-mb-16">
            <Image
              alt="سيارة دفع رباعي"
              src="/hero.jpg"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
        {/* Text content */}
        <div className="flex flex-col justify-center text-right w-full lg:w-1/2 px-0 lg:pl-8 pb-6 lg:pb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-2 font-cairo leading-tight">
            <span className="block">اعثر على سيارة أحلامك</span>
            <span className="block text-foreground dark:text-white">
              في سيارات الريم
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-muted-foreground dark:text-gray-300 sm:max-w-xl font-tajawal">
            تصفح مجموعتنا الواسعة من السيارات الفاخرة. من السيدان الأنيقة إلى
            سيارات الدفع الرباعي القوية، اعثر على السيارة المثالية التي تناسب
            أسلوب حياتك وميزانيتك.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-xs mx-auto sm:mx-0 sm:max-w-none sm:justify-start">
            <Link href="/cars" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full rounded-xl shadow font-almarai text-base sm:text-lg"
              >
                تصفح السيارات
              </Button>
            </Link>
            {!isLoggedIn && (
              <Link href="/auth" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-xl shadow font-almarai text-base sm:text-lg dark:bg-transparent dark:border-white dark:text-white dark:hover:bg-white/10"
                >
                  بيع سيارتك
                </Button>
              </Link>
            )}
            {isLoggedIn && (
              <Link href="/dashboard/listings/new" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-xl shadow font-almarai text-base sm:text-lg dark:bg-transparent dark:border-white dark:text-white dark:hover:bg-white/10"
                >
                  بيع سيارتك
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
