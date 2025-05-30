"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js"; // or your user type

interface HeroSectionProps {
  user: User | null;
}

export function HeroSection({ user }: HeroSectionProps) {
  return (
    <>
      
      <main className="overflow-x-hidden">
        <section>
          <div className="py-6 md:py-20">
            <div className="relative mx-auto flex max-w-6xl px-6 items-center lg:items-stretch flex-col md:flex-row">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-right flex flex-col justify-center">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl font-cairo">
                  <span className="block">اعثر على سيارة أحلامك</span>
                  <span className="block text-foreground dark:text-white">
                    في بورصتي
                  </span>
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg font-tajawal">
                  تصفح مجموعتنا الواسعة من السيارات الفاخرة. من السيدان الأنيقة
                  إلى سيارات الدفع الرباعي القوية، اعثر على السيارة المثالية
                  التي تناسب أسلوب حياتك وميزانيتك.
                </p>
                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="px-5 text-base font-almarai"
                  >
                    <Link href="/cars">
                      <span className="text-nowrap">تصفح السيارات</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="px-5 text-base font-almarai"
                  >
                    <Link href="/dashboard/listings/new">
                      <span className="text-nowrap">بيع سيارتك</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center w-full lg:w-1/2 order-1 lg:order-none">
                <div className="relative w-full h-44 xs:h-56 sm:h-72 md:h-80 lg:h-[480px] xl:h-[540px] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-full lg:-mb-16">
                  <Image
                    src="/hero.jpg"
                    alt="سيارة دفع رباعي"
                    fill
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
