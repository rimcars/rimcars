import { CarListing } from "@/features/public-listings/components/car-listing";
import { getAllListings } from "@/features/public-listings/actions";
import { convertListingToUiCar } from "@/features/public-listings/types";

// Enable ISG with revalidation every 30 minutes
export const revalidate = 1800; // 30 minutes

export default async function CarsPage() {
  // Fetch listings from server using public client
  const { data: listings, error } = await getAllListings();

  // Handle error case gracefully
  if (error) {
    console.error("Failed to fetch listings:", error);
  }

  // Convert listings to UI format
  const cars = listings ? listings.map(convertListingToUiCar) : [];

  return (
    <div className="min-h-screen">
      <CarListing initialCars={cars} />
    </div>
  );
}
