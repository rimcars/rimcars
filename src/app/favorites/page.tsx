import { redirect } from "next/navigation";
import { getCurrentUser, getUserFavorites } from "@/app/actions";
import { FavoritesClient } from "./favorites-client";
import { createClient } from "@/utils/supabase/server";
import { UiCar, convertListingToUiCar } from "@/features/public-listings/types";

export const metadata = {
  title: "المفضلة | ريم كارز",
  description: "قائمة السيارات المفضلة لديك",
};

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  // Check if user is authenticated
  const user = await getCurrentUser();
  
  // If user not authenticated, redirect to login
  if (!user) {
    redirect("/auth/login?callbackUrl=/favorites");
  }

  // Get user's favorite car IDs
  const { favorites = [], error } = await getUserFavorites();
  
  // If no favorites or error, return empty array
  if (!favorites.length || error) {
    return (
      <FavoritesClient
        favoriteCars={[]}
        userId={user.id}
        isEmpty={true}
      />
    );
  }

  // Fetch car details for favorites
  const supabase = await createClient();
  const { data: listings, error: listingsError } = await supabase
    .from("listings")
    .select("*")
    .in("id", favorites);
  
  if (listingsError || !listings) {
    console.error("Error fetching favorite cars:", listingsError);
    return (
      <FavoritesClient
        favoriteCars={[]}
        userId={user.id}
        isEmpty={true}
        error="حدث خطأ أثناء استرجاع السيارات المفضلة"
      />
    );
  }

  // Convert listings to UI car format
  const favoriteCars: UiCar[] = listings.map(convertListingToUiCar);

  return (
    <FavoritesClient
      favoriteCars={favoriteCars}
      userId={user.id}
      isEmpty={favoriteCars.length === 0}
    />
  );
} 