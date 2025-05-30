"use client";

import React from "react";
import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const carBrandLogos = [
  { src: "/logos/audi.png", alt: "Audi Logo" },
  { src: "/logos/bmw.png", alt: "BMW Logo" },
  { src: "/logos/chevrolet.png", alt: "Chevrolet Logo" },
  { src: "/logos/land-rover.png", alt: "Land Rover Logo" },
  { src: "/logos/aston-martin.png", alt: "Aston Martin Logo" },
  { src: "/logos/bentley.png", alt: "Bentley Logo" },
  { src: "/logos/nissan.png", alt: "Nissan Logo" },
  { src: "/logos/mitsubishi.png", alt: "Mitsubishi Logo" },
  { src: "/logos/lexus.png", alt: "Lexus Logo" },
  { src: "/logos/ford.png", alt: "Ford Logo" },
  { src: "/logos/honda.png", alt: "Honda Logo" },
  { src: "/logos/mercedes.png", alt: "Mercedes Logo" },
  { src: "/logos/toyota.png", alt: "Toyota Logo" },
  { src: "/logos/volkswagen.png", alt: "Volkswagen Logo" },
];

export function BrandSlider() {
  // Use a much smaller gap on mobile, larger on desktop
  const [gap, setGap] = React.useState(16);
  const [blurWidth, setBlurWidth] = React.useState('w-20');
  const [logoSize, setLogoSize] = React.useState({ height: 48, width: 80 });

  React.useEffect(() => {
    const updateSettings = () => {
      // Mobile: minimal gap, smaller logos, smaller blur
      if (window.innerWidth < 640) {
        setGap(4);
        setBlurWidth('w-8'); // Even smaller blur overlay
        setLogoSize({ height: 40, width: 64 }); // Slightly smaller logos
      } else if (window.innerWidth < 1024) {
        setGap(16);
        setBlurWidth('w-16');
        setLogoSize({ height: 44, width: 72 });
      } else {
        setGap(32);
        setBlurWidth('w-20');
        setLogoSize({ height: 48, width: 80 });
      }
    };

    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, []);

  return (
    <section className="bg-background pb-16 md:pb-32">
      <div className="group relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">أفضل العلامات التجارية</p>
          </div>
          <div className="relative py-6 w-full overflow-hidden">
            <InfiniteSlider speedOnHover={20} speed={40} gap={gap}>
              {carBrandLogos.map((logo) => (
                <div className="flex shrink-0" key={logo.src}>
                  <Image
                    className="mx-auto object-contain dark:invert-0 h-10 sm:h-11 lg:h-12 w-auto"
                    src={logo.src}
                    alt={logo.alt}
                    height={logoSize.height}
                    width={logoSize.width}
                    priority={false}
                  />
                </div>
              ))}
            </InfiniteSlider>
            <div className={`bg-linear-to-r from-background absolute inset-y-0 left-0 ${blurWidth}`}></div>
            <div className={`bg-linear-to-l from-background absolute inset-y-0 right-0 ${blurWidth}`}></div>
            <ProgressiveBlur
              className={`pointer-events-none absolute left-0 top-0 h-full ${blurWidth}`}
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className={`pointer-events-none absolute right-0 top-0 h-full ${blurWidth}`}
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandSlider;