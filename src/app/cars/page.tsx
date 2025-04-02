import { CarListing } from "@/features/public-listings/components/car-listing";
import { Brands } from "@/features/public-listings/components/brands";
import { getAllListings } from "@/features/public-listings/actions";
import { convertListingToUiCar } from "@/features/public-listings/types";

export const dynamic = "force-dynamic";

export default async function CarsPage() {
  // Fetch listings from server
  const { data: listings, error } = await getAllListings();

  // Convert listings to UI format
  const cars = listings ? listings.map(convertListingToUiCar) : [];

  return (
    <div className="min-h-screen">
      <CarListing initialCars={cars} />
      <Brands />
    </div>
  );
}
