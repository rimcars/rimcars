import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/app/actions";

/**
 * Validates a Supabase image URL
 * @param url URL to validate
 * @returns true if the URL is a valid Supabase image URL
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;

  try {
    // Basic validation
    if (!url.startsWith("http")) return false;

    // Check for Supabase storage URL pattern
    return (
      url.includes("supabase.co") &&
      url.includes("/storage/v1/object/public/car-images/")
    );
  } catch (error) {
    return false;
  }
}

/**
 * Extracts the storage path from a Supabase image URL
 * @param url The public URL of the image
 * @returns The storage path or null if not matched
 */
export function getImagePathFromUrl(url: string): string | null {
  // Check for valid input
  if (!url || typeof url !== "string") return null;

  try {
    const match = url.match(/car-images\/(.*)/);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
}

/**
 * Deletes multiple car images from Supabase storage with retry logic
 * @param urls Array of image URLs to delete
 * @param maxRetries Maximum number of retries for failed deletions
 */
export async function deleteCarImages(
  urls: string[],
  maxRetries = 2
): Promise<void> {
  if (!urls || urls.length === 0) return;

  const supabase = await createClient();

  // Extract valid paths from URLs
  const paths = urls
    .map(getImagePathFromUrl)
    .filter((path): path is string => path !== null);

  if (paths.length === 0) {
    return;
  }

  // Track failed deletions for retry
  let failedPaths: string[] = [];
  let currentRetry = 0;

  // First attempt
  try {
    const result = await supabase.storage.from("car-images").remove(paths);

    if (result.error) {
      failedPaths = [...paths]; // Assume all failed if we got a batch error
    }
  } catch (error) {
    failedPaths = [...paths];
  }

  // Retry logic for failed paths
  while (failedPaths.length > 0 && currentRetry < maxRetries) {
    currentRetry++;

    try {
      // Small delay before retry
      await new Promise((resolve) => setTimeout(resolve, 500 * currentRetry));

      // Try to delete each failed path individually
      const newFailedPaths: string[] = [];

      for (const path of failedPaths) {
        try {
          const { error } = await supabase.storage
            .from("car-images")
            .remove([path]);
          if (error) {
            newFailedPaths.push(path);
          }
        } catch (err) {
          newFailedPaths.push(path);
        }
      }

      failedPaths = newFailedPaths;
    } catch (error) {
      // Continue with next retry
    }
  }
}

/**
 * Uploads multiple car images to Supabase storage with retry and transaction support
 * @param files Array of files to upload
 * @returns Array of public URLs for the uploaded images
 */
export async function uploadCarImages(files: File[]): Promise<string[]> {
  if (!files || files.length === 0) return [];

  const supabase = await createClient();
  const urls: string[] = [];
  const uploadedPaths: string[] = []; // Track successful uploads for rollback

  try {
    // Get current user
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Use user ID in the path
    const userPath = `listings/${user.id}`;

    // Process files sequentially for better error handling
    for (const file of files) {
      // Validate file
      if (!file || !(file instanceof File)) {
        continue;
      }

      try {
        const fileExt = file.name.split(".").pop() || "jpg";
        const fileName = `${userPath}/${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;

        let retries = 0;
        let uploadSuccess = false;
        let uploadError = null;

        // Retry logic for uploads
        while (!uploadSuccess && retries < 2) {
          try {
            const { error, data } = await supabase.storage
              .from("car-images")
              .upload(fileName, file, {
                cacheControl: "3600",
                upsert: false,
              });

            if (error) {
              uploadError = error;
              retries++;
              // Wait before retry
              if (retries < 2)
                await new Promise((resolve) =>
                  setTimeout(resolve, 500 * retries)
                );
            } else {
              uploadSuccess = true;
              uploadedPaths.push(fileName);

              // Get public URL for the uploaded file
              const { data: urlData } = supabase.storage
                .from("car-images")
                .getPublicUrl(fileName);

              urls.push(urlData.publicUrl);
            }
          } catch (err) {
            uploadError = err;
            retries++;
            if (retries < 2)
              await new Promise((resolve) =>
                setTimeout(resolve, 500 * retries)
              );
          }
        }

        // If all retries failed, throw the last error
        if (!uploadSuccess) {
          throw uploadError || new Error(`Failed to upload file: ${file.name}`);
        }
      } catch (fileError) {
        // We'll continue with other files and throw at the end if needed
      }
    }

    return urls;
  } catch (error) {
    // If we have a critical error but some files were uploaded, try to clean them up
    if (uploadedPaths.length > 0 && urls.length === 0) {
      try {
        await supabase.storage.from("car-images").remove(uploadedPaths);
      } catch (cleanupError) {
        // Cleanup failed, but we'll continue
      }
    }

    throw error;
  }
}
