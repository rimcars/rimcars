"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/app/actions";

/**
 * Update user profile information
 */
export async function updateProfile(data: { name: string }) {
  try {
    const supabase = await createClient();

    // Get current user
    const user = await getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Update user profile in the database
    const { error } = await supabase
      .from("users")
      .update({
        name: data.name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      throw error;
    }

    // Revalidate the profile page to reflect changes
    revalidatePath("/dashboard/settings");
    // Also revalidate dashboard to update sidebar
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error };
  }
}

/**
 * Update user avatar
 */
export async function updateAvatar(file: File) {
  try {
    const supabase = await createClient();

    // Get current user
    const user = await getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Upload the file to storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatar_images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL for the uploaded file
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatar_images").getPublicUrl(filePath);

    // Update user profile with new avatar URL
    const { error: updateError } = await supabase
      .from("users")
      .update({
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      throw updateError;
    }

    // Revalidate all pages that display user data
    revalidatePath("/dashboard");

    return { success: true, avatarUrl: publicUrl };
  } catch (error) {
    console.error("Error updating avatar:", error);
    return { success: false, error };
  }
}

/**
 * Remove user avatar
 */
export async function removeAvatar() {
  try {
    const supabase = await createClient();

    // Get current user
    const user = await getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Update user profile to remove avatar URL
    const { error } = await supabase
      .from("users")
      .update({
        avatar_url: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      throw error;
    }

    // Revalidate all pages that display user data
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error removing avatar:", error);
    return { success: false, error };
  }
}

/**
 * Delete user account
 */
export async function deleteAccount() {
  try {
    const supabase = await createClient();

    // Get current user
    const user = await getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Delete user from the database
    const { error: deleteError } = await supabase
      .from("users")
      .delete()
      .eq("id", user.id);

    if (deleteError) {
      throw deleteError;
    }

    // Sign out the user
    await supabase.auth.signOut();

    return { success: true };
  } catch (error) {
    console.error("Error deleting account:", error);
    return { success: false, error };
  }
}
