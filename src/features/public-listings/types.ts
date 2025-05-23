import { Listing } from "../listings/types";

// UI Car type used by the car components
export interface UiCar {
  id: string;
  name: string;
  price: number;
  year: number | null;
  image: string;
  mileage: number | null;
  fuelType: string;
  transmission: string;
  brand: string; // From make field
  condition: string; // From condition field
  location: string | null; // Add location from database
  sellerName: string | null; // Add seller name
  sellerPhone: string | null; // Add seller phone
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
    // Use the first image or a placeholder
    image:
      listing.images && listing.images.length > 0
        ? listing.images[0]
        : "/placeholder.svg?height=300&width=500",
    mileage: listing.mileage,
    fuelType: fuelTypeMap[listing.fuel_type] || listing.fuel_type,
    transmission: transmissionMap[listing.transmission] || listing.transmission,
    brand: listing.make || "",
    condition: conditionMap[listing.condition] || listing.condition,
    location: listing.location,
    sellerName: listing.seller_name,
    sellerPhone: listing.seller_phone,
  };
}
