"use client";

import { CarListing } from "@/components/car-listing";
import { Brands } from "@/components/brands";
import Hero from "@/components/hero";

export default function CarsPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CarListing />
      <Brands />
    </div>
  );
} 