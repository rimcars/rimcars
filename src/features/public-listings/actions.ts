"use server";

import { createPublicClient } from "@/utils/supabase/server";
import type { Tables } from "@/types/database.types";

/**
 * Fetches latest car listings for homepage (limited count)
 * Uses public client for static generation compatibility
 * @param limit Number of listings to fetch (default: 10)
 * @returns Array of listings with guaranteed string values
 */
export async function getLatestListings(
  limit: number = 10
): Promise<Tables<"listings">[]> {
  try {
    const supabase = createPublicClient();

    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching latest listings:", error);
      return [];
    }

    // Ensure make, model, and car_name are always strings
    return (data || []).map((car) => ({
      ...car,
      make: car.make ?? "",
      model: car.model ?? "",
      car_name: car.car_name ?? "",
    }));
  } catch (error) {
    console.error("Error fetching latest listings:", error);
    return [];
  }
}

/**
 * Fetches all public car listings
 * Uses public client for static generation compatibility
 * @returns Object with data (listings array) or error
 */
export async function getAllListings() {
  try {
    const supabase = createPublicClient();

    const { data: listings, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Ensure consistent string values
    const normalizedListings = (listings || []).map((car) => ({
      ...car,
      make: car.make ?? "",
      model: car.model ?? "",
      car_name: car.car_name ?? "",
    }));

    return { data: normalizedListings, error: null };
  } catch (error) {
    console.error("Error fetching public listings:", error);
    return { data: null, error: "فشل في جلب السيارات" };
  }
}

/**
 * Fetches a single car listing by ID
 * Uses public client for static generation compatibility
 * @param id The listing ID
 * @returns Object with data (listing object) or error
 */
export async function getPublicListingById(id: string) {
  try {
    const supabase = createPublicClient();

    const { data: listing, error } = await supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    // Ensure consistent string values
    const normalizedListing = listing
      ? {
          ...listing,
          make: listing.make ?? "",
          model: listing.model ?? "",
          car_name: listing.car_name ?? "",
        }
      : null;

    return { data: normalizedListing, error: null };
  } catch (error) {
    console.error("Error fetching listing by ID:", error);
    return { data: null, error: "فشل في جلب بيانات السيارة" };
  }
}
