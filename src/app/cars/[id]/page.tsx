"use client";

import { CarDetailsClient } from "@/components/car-details-client"

// Sample data - replace with your actual data source
const sampleCar = {
  id: 1,
  name: "Tesla Model 3",
  price: 45000,
  year: 2023,
  image: "/cars/tesla-model-3.jpg",
  speed: 233,
  mileage: 0,
  fuelType: "Electric",
  transmission: "Automatic",
  brand: "Tesla",
  description: "The Tesla Model 3 is an all-electric four-door sedan...",
  engine: "Dual Motor",
  horsepower: 450,
  acceleration: 3.1,
  colors: ["Red", "White", "Black", "Blue"],
  features: [
    "Autopilot",
    "15\" Touchscreen",
    "Premium Audio",
    "Glass Roof"
  ],
  gallery: [
    "/cars/tesla-model-3.jpg",
    "/cars/tesla-model-3-interior.jpg",
    "/cars/tesla-model-3-side.jpg",
    "/cars/tesla-model-3-back.jpg"
  ]
};

const sampleCars = [sampleCar]; // Add more cars for the "You might also like" section

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the car data based on params.id
  return <CarDetailsClient car={sampleCar} allCars={sampleCars} />;
}

