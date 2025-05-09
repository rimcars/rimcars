"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ListingFormValues, StrictListingFields } from "./types";
import {
  deleteCarImages,
  uploadCarImages,
  isValidImageUrl,
} from "@/utils/car-images";
import { getUser } from "@/app/actions";

// Create a new listing
export async function createListing(data: StrictListingFields) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const user = await getUser();

    if (!user) {
      return { data: null, error: "غير مصرح لك بإضافة سيارة" };
    }

    const { data: listing, error } = await supabase
      .from("listings")
      .insert({
        ...data,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/dashboard/listings");
    return { data: listing, error: null };
  } catch (error) {
    return { data: null, error: "فشل في إضافة السيارة" };
  }
}

// Get all listings for current user
export async function getUserListings() {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const user = await getUser();

    if (!user) {
      return { data: null, error: "غير مصرح لك بعرض السيارات" };
    }

    const { data: listings, error } = await supabase
      .from("listings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { data: listings, error: null };
  } catch (error) {
    return { data: null, error: "فشل في جلب السيارات" };
  }
}

// Get a single listing by ID
export async function getListingById(id: string) {
  try {
    const supabase = await createClient();

    const { data: listing, error } = await supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return { data: listing, error: null };
  } catch (error) {
    return { data: null, error: "فشل في جلب بيانات السيارة" };
  }
}

// Update a listing
export async function updateListing(id: string, data: StrictListingFields) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const user = await getUser();

    if (!user) {
      return { data: null, error: "غير مصرح لك بتعديل هذه السيارة" };
    }

    // Fetch the listing to check ownership and get existing images
    const { data: existingListing, error: fetchError } = await supabase
      .from("listings")
      .select("user_id, images")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Verify ownership or admin status
    if (existingListing?.user_id !== user.id && user.role !== "admin") {
      return { data: null, error: "غير مصرح لك بتعديل هذه السيارة" };
    }

    // Find images that were removed and need to be deleted from storage
    const existingImages = existingListing.images || [];
    const newImages = data.images || [];

    // Images that exist in old array but not in new array were removed
    const removedImages = existingImages.filter(
      (url: string) => !newImages.includes(url)
    );

    // Delete removed images from storage if there are any
    if (removedImages.length > 0) {
      try {
        await deleteCarImages(removedImages);
      } catch (deleteError) {
        // Continue with update even if image deletion fails
        // We don't want to block the update if storage cleanup fails
      }
    }

    // Update the listing
    const { data: listing, error } = await supabase
      .from("listings")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/dashboard/listings");
    revalidatePath(`/dashboard/listings/${id}`);
    return { data: listing, error: null };
  } catch (error) {
    return { data: null, error: "فشل في تحديث بيانات السيارة" };
  }
}

// Delete a listing
export async function deleteListing(id: string) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const user = await getUser();

    if (!user) {
      return { error: "غير مصرح لك بحذف هذه السيارة" };
    }

    // First get the listing to access its images and verify ownership
    const { data: listing, error: fetchError } = await supabase
      .from("listings")
      .select("images, user_id")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Verify ownership or admin status
    if (listing.user_id !== user.id && user.role !== "admin") {
      return { error: "غير مصرح لك بحذف هذه السيارة" };
    }

    // Delete the images from storage
    if (listing && listing.images && listing.images.length > 0) {
      await deleteCarImages(listing.images);
    }

    // Then delete the listing
    const { error } = await supabase.from("listings").delete().eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard/listings");
    return { error: null };
  } catch (error) {
    return { error: "حدث خطأ أثناء حذف السيارة" };
  }
}

// Convert from form data to strict format
function parseFormData(formData: any): StrictListingFields {
  // Ensure year and mileage are numbers
  const year =
    typeof formData.year === "number"
      ? formData.year
      : formData.year
      ? Number(formData.year)
      : new Date().getFullYear();

  const mileage =
    typeof formData.mileage === "number"
      ? formData.mileage
      : formData.mileage
      ? Number(formData.mileage)
      : 0;

  return {
    car_name: formData.car_name,
    description: formData.description,
    price: formData.price,
    old_price: formData.old_price,
    make: formData.make || "",
    model: formData.model || "",
    year,
    mileage,
    location: formData.location || "",
    condition: formData.condition,
    transmission: formData.transmission,
    fuel_type: formData.fuel_type,
    images: formData.images,
    seller_name: formData.seller_name || "",
    seller_phone: formData.seller_phone || "",
  };
}

// Handle form submission for both create and update
export async function handleListingFormAction(
  formData: FormData,
  listingId?: string
) {
  try {
    // Parse form data
    const car_name = formData.get("car_name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const old_price =
      formData.get("old_price") && formData.get("old_price") !== ""
        ? parseFloat(formData.get("old_price") as string)
        : null;
    const make = formData.get("make") as string;
    const model = formData.get("model") as string;
    const year =
      formData.get("year") && formData.get("year") !== ""
        ? parseInt(formData.get("year") as string)
        : null;
    const mileage =
      formData.get("mileage") && formData.get("mileage") !== ""
        ? parseInt(formData.get("mileage") as string)
        : null;
    const location = formData.get("location") as string;
    const condition = formData.get("condition") as "new" | "used";
    const transmission = formData.get("transmission") as "manual" | "automatic";
    const fuel_type = formData.get("fuel_type") as
      | "petrol"
      | "diesel"
      | "electric"
      | "hybrid";
    const seller_name = formData.get("seller_name") as string;
    const seller_phone = formData.get("seller_phone") as string;

    // Get images JSON string from form data
    const imagesJson = formData.get("images") as string;

    // Parse images JSON with more detailed logging
    let images: string[] = [];
    try {
      if (!imagesJson) {
        return { data: null, error: "لم يتم توفير صور للسيارة" };
      }

      try {
        images = JSON.parse(imagesJson) as string[];
      } catch (parseError) {
        return { data: null, error: "صيغة بيانات الصور غير صالحة" };
      }

      // Validate images are URLs
      const validImages = images.filter((url) => isValidImageUrl(url));

      // Use only valid image URLs
      images = validImages;

      // Validate image count
      if (images.length === 0) {
        return { data: null, error: "يجب إضافة صورة واحدة على الأقل" };
      }
    } catch (error) {
      return { data: null, error: "حدث خطأ أثناء معالجة الصور" };
    }

    const data = {
      car_name,
      description,
      price,
      old_price,
      make,
      model,
      year,
      mileage,
      location,
      condition,
      transmission,
      fuel_type,
      images,
      seller_name,
      seller_phone,
    };

    try {
      // Convert form data to strict format
      const strictData = parseFormData(data);

      // Skip update if listingId is 'new'
      if (listingId && listingId !== "new") {
        // Update existing listing
        return updateListing(listingId, strictData);
      }

      // Create new listing
      return createListing(strictData);
    } catch (actionError) {
      return { data: null, error: "فشل في حفظ البيانات" };
    }
  } catch (error) {
    return { data: null, error: "حدث خطأ أثناء معالجة الطلب" };
  }
}
