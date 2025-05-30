"use server";

import { createPublicClient } from "@/utils/supabase/server";

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

    return { data: listings, error: null };
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

    return { data: listing, error: null };
  } catch (error) {
    console.error("Error fetching listing by ID:", error);
    return { data: null, error: "فشل في جلب بيانات السيارة" };
  }
}
