import { CarListing } from "@/features/public-listings/components/car-listing";
import { Brands } from "@/features/public-listings/components/brands";
import { getAllListings } from "@/features/public-listings/actions";
import { convertListingToUiCar } from "@/features/public-listings/types";
import Footer from "@/components/footer-section";
import Header from "@/components/header";
import { getUser } from "@/app/actions";
import { User } from "@supabase/supabase-js"; // or your user type
export const dynamic = "force-dynamic";

export default async function CarsPage() {
  // Get user data
  const user = await getUser();
  
  // Fetch listings from server
  const { data: listings, error } = await getAllListings();

  // Convert listings to UI format
  const cars = listings ? listings.map(convertListingToUiCar) : [];

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <CarListing initialCars={cars} />
      <Footer /> 
    </div>
  );
}
