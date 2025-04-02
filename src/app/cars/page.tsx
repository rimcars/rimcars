"use client";

import { CarListing } from "@/components/car-listing";
import { Brands } from "@/components/brands";

export default function CarsPage() {
  return (
    <div className="min-h-screen">
      <CarListing />
      <Brands />
    </div>
  );
} 