import { Listing } from "../listings/types";

// UI Car type used by the car components - simplified to match database structure more closely
export interface UiCar {
  id: string;
  name: string; // car_name
  price: number;
  year?: number | null;
  image?: string | null;
  images?: string[]; // New field for multiple images
  mileage?: number | null;
  fuelType: string; // localized fuel_type
  transmission: string; // localized transmission
  brand: string; // make field
  model?: string | null; // model field from database
  condition: string; // localized condition
  description?: string | null; // description field from database
  location?: string | null;
  sellerName?: string | null; // seller_name
  sellerPhone?: string | null; // seller_phone
}

/**
 * Converts a database listing to the UI car format
 */
export function convertListingToUiCar(listing: Listing): UiCar {
  // Map fuel_type to Arabic display names
  const fuelTypeMap: Record<string, string> = {
    petrol: "بنزين",
    diesel: "ديزل",
    electric: "كهربائي",
    hybrid: "هجين",
  };

  // Map transmission to Arabic display names
  const transmissionMap: Record<string, string> = {
    automatic: "أوتوماتيك",
    manual: "يدوي",
  };

  // Map condition to Arabic display names
  const conditionMap: Record<string, string> = {
    new: "جديد",
    used: "مستعمل",
  };

  return {
    id: listing.id,
    name: listing.car_name,
    price: listing.price,
    year: listing.year,
    image: listing.images?.[0] || null,
    images: listing.images || [], // Support multiple images from database
    mileage: listing.mileage,
    fuelType: fuelTypeMap[listing.fuel_type] || listing.fuel_type || "غير محدد",
    transmission:
      transmissionMap[listing.transmission] ||
      listing.transmission ||
      "غير محدد",
    brand: listing.make || "غير محدد",
    model: listing.model, // Add model field
    condition:
      conditionMap[listing.condition] || listing.condition || "غير محدد",
    description: listing.description, // Add description field
    location: listing.location,
    sellerName: listing.seller_name,
    sellerPhone: listing.seller_phone,
  };
}

/**
 * Helper function to generate share URL and title for a car
 */
export function getCarShareData(
  car: UiCar,
  baseUrl?: string
): { url: string; title: string } {
  const url =
    baseUrl || (typeof window !== "undefined" ? window.location.href : "");
  const title = `${car.name} - ${car.price.toLocaleString()} MRU`;

  return { url, title };
}

// Utility functions for car display
export function formatCarPrice(price: number): string {
  return `${price.toLocaleString()} MRU`;
}

export function getCarDisplayName(car: UiCar): string {
  return car.model ? `${car.brand} ${car.model}` : car.brand;
}

export function formatMileage(mileage: number | null | undefined): string {
  if (!mileage || mileage <= 0) return "جديد";
  return `${mileage.toLocaleString()} كم`;
}
