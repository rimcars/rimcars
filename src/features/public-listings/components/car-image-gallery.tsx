"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface CarImageGalleryProps {
  images: string[];
  carName: string;
}

export function CarImageGallery({ images, carName }: CarImageGalleryProps) {
  // Filter out empty or invalid images and add placeholder if needed
  const validImages = images.filter(Boolean);
  const galleryImages =
    validImages.length > 0 ? validImages : ["/placeholder.svg"];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Setup carousel API
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setActiveImageIndex(api.selectedScrollSnap());
    });
  }, [api]);

  // Navigation functions
  const nextImage = () => {
    if (galleryImages.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    if (galleryImages.length === 0) return;
    setActiveImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  // Open dialog with specific image
  const openDialog = (index: number) => {
    setActiveImageIndex(index);
    setIsDialogOpen(true);
  };

  // Render the image carousel modal
  const renderImageCarousel = () => {
    return (
      <div className="relative h-full w-full bg-black">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={() => setIsDialogOpen(false)}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Main Image Display */}
        <div className="relative h-full w-full overflow-hidden">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 h-full w-full transition-opacity duration-500",
                activeImageIndex === index
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              )}
            >
              <Image
                src={image}
                alt={`${carName} - صورة ${index + 1}`}
                fill
                className="object-contain"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - RTL aware */}
        {galleryImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-4 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={prevImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-4 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={nextImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-20 right-4 rounded-lg bg-black/70 px-4 py-2 text-white backdrop-blur-sm font-medium">
          {activeImageIndex + 1} / {galleryImages.length}
        </div>

        {/* Thumbnails Navigation */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-center gap-2 overflow-x-auto px-4">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={cn(
                    "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                    activeImageIndex === index
                      ? "border-white"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image}
                    alt={`مصغرة ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Mobile carousel view
  const mobileView = (
    <div className="block lg:hidden">
      <div className="relative">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: galleryImages.length > 1,
            direction: "rtl",
          }}
          dir="rtl"
        >
          <CarouselContent className="mr-0 ml-0">
            {galleryImages.map((image, index) => (
              <CarouselItem key={index}>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <div
                      className="relative h-80 w-full cursor-pointer overflow-hidden rounded-xl group"
                      onClick={() => openDialog(index)}
                    >
                      <Image
                        src={image}
                        alt={`${carName} - صورة ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={index === 0}
                        sizes="100vw"
                      />
                      {/* Zoom overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] h-[95vh] p-0 border-0">
                    <VisuallyHidden>
                      <DialogTitle>معرض صور {carName}</DialogTitle>
                    </VisuallyHidden>
                    {renderImageCarousel()}
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>

          {galleryImages.length > 1 && (
            <>
              <CarouselNext className="!absolute !top-1/2 !right-2 !left-auto z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-white/90 text-gray-900 shadow-xl hover:bg-white border-2 border-white/20">
                <ChevronRight className="h-6 w-6" />
              </CarouselNext>
              <CarouselPrevious className="!absolute !top-1/2 !left-2 !right-auto z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-white/90 text-gray-900 shadow-xl hover:bg-white border-2 border-white/20">
                <ChevronLeft className="h-6 w-6" />
              </CarouselPrevious>
            </>
          )}
        </Carousel>

        {/* Mobile image counter */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-3 right-3 z-30 rounded-lg bg-black/70 px-3 py-1.5 text-white font-medium text-sm">
            {current + 1} / {count}
          </div>
        )}
      </div>
    </div>
  );

  // Desktop grid view
  const desktopView = (
    <div className="hidden lg:block">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div
          className={cn(
            "grid gap-2 h-96",
            galleryImages.length === 1 && "grid-cols-1",
            galleryImages.length === 2 && "grid-cols-2",
            galleryImages.length >= 3 && "grid-cols-4"
          )}
        >
          {/* Main large image */}
          <DialogTrigger asChild>
            <div
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-xl group",
                galleryImages.length >= 3 && "col-span-2 row-span-2"
              )}
              onClick={() => openDialog(0)}
            >
              <Image
                src={galleryImages[0]}
                alt={`${carName} - الصورة الرئيسية`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Zoom overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </DialogTrigger>

          {/* Additional images */}
          {galleryImages.slice(1, 5).map((image, index) => (
            <DialogTrigger asChild key={index}>
              <div
                className="relative cursor-pointer overflow-hidden rounded-xl group"
                onClick={() => openDialog(index + 1)}
              >
                <Image
                  src={image}
                  alt={`${carName} - صورة ${index + 2}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                {/* Show more images overlay */}
                {index === 3 && galleryImages.length > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
                    <span className="text-lg font-medium">
                      +{galleryImages.length - 5} صورة
                    </span>
                  </div>
                )}
                {/* Zoom overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </DialogTrigger>
          ))}
        </div>

        <DialogContent className="max-w-[95vw] h-[95vh] p-0 border-0">
          <VisuallyHidden>
            <DialogTitle>معرض صور {carName}</DialogTitle>
          </VisuallyHidden>
          {renderImageCarousel()}
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <div className="space-y-4">
      {mobileView}
      {desktopView}
    </div>
  );
}
