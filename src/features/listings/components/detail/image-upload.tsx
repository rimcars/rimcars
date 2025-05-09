"use client";

import { FileUploader } from "@/components/ui/file-uploader";
import { useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash, Upload, Loader2 } from "lucide-react";
import React from "react";

// Define image types with status flags for better tracking
interface ImageItem {
  id: string;
  // For uploaded images
  url?: string;
  // For local images
  file?: File;
  preview?: string;
  // Status tracking
  status: "local" | "uploaded" | "uploading" | "removed";
}

interface ImageUploadProps {
  value: string[];
  disabled?: boolean;
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
}

// Define the exposed ref methods
export interface ImageUploadRef {
  uploadAllFiles: () => Promise<string[]>;
  hasLocalFiles: () => boolean;
  getImagesForForm: () => string[];
}

const ImageUpload = forwardRef<ImageUploadRef, ImageUploadProps>(
  function ImageUpload({ value, disabled, onChange, onRemove }, ref) {
    // Unified image state with status tracking
    const [images, setImages] = useState<ImageItem[]>(() => {
      // Initialize with existing uploaded images
      return value.map((url) => ({
        id: url, // Use URL as ID for uploaded images
        url,
        status: "uploaded",
      }));
    });

    const [loading, setLoading] = useState(false);

    // Add new local files to the unified state
    const handleFileSelection = useCallback(
      async (files: File[]): Promise<void> => {
        const newImages = files.map((file) => ({
          id: Math.random().toString(36).substring(2, 15),
          file,
          preview: URL.createObjectURL(file),
          status: "local" as const,
        }));

        setImages((prev) => [...prev, ...newImages]);

        // Call onChange if provided, to notify parent component that images were added
        if (newImages.length > 0 && onChange) {
          onChange("local-file-added");
        }

        return Promise.resolve();
      },
      [onChange]
    );

    // Remove an image (either local or uploaded)
    const removeImage = useCallback(
      (imageId: string) => {
        setImages((prev) => {
          // Find the image to handle cleanup
          const imageToRemove = prev.find((img) => img.id === imageId);

          // Revoke object URL for local images
          if (imageToRemove?.preview) {
            URL.revokeObjectURL(imageToRemove.preview);
          }

          // If it's an uploaded image, notify parent component
          if (imageToRemove?.status === "uploaded" && imageToRemove.url) {
            onRemove(imageToRemove.url);
          }

          // Remove from state
          return prev.filter((img) => img.id !== imageId);
        });
      },
      [onRemove]
    );

    // Upload all local files using API endpoint
    const uploadAllFiles = useCallback(
      async (silentMode = true): Promise<string[]> => {
        // Get only local files that need uploading
        const localImages = images.filter((img) => img.status === "local");

        if (localImages.length === 0) {
          return [];
        }

        setLoading(true);
        // Mark images as uploading
        setImages((prev) =>
          prev.map((img) =>
            img.status === "local"
              ? { ...img, status: "uploading" as const }
              : img
          )
        );

        try {
          // Create FormData for the API request
          const formData = new FormData();
          const filesToUpload = localImages
            .filter((img) => img.file)
            .map((img) => img.file!);

          filesToUpload.forEach((file) => {
            formData.append("files", file);
          });

          // Simple fetch call to the API endpoint
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`Upload failed (${response.status}):`, errorText);
            toast.error("فشل في رفع الصور");

            // Reset status back to local on error
            setImages((prev) =>
              prev.map((img) =>
                img.status === "uploading"
                  ? { ...img, status: "local" as const }
                  : img
              )
            );
            setLoading(false);
            return [];
          }

          const result = await response.json();

          if (result.error) {
            toast.error(result.error || "فشل في رفع الصور");
            // Reset status back to local on error
            setImages((prev) =>
              prev.map((img) =>
                img.status === "uploading"
                  ? { ...img, status: "local" as const }
                  : img
              )
            );
            setLoading(false);
            return [];
          }

          const { urls } = result;
          // Get an array to track uploaded URLs
          const uploadedUrls: string[] = [];

          // Update local images with their URLs and mark as uploaded
          if (urls && urls.length > 0) {
            // Process each URL in sequence to ensure state updates properly
            for (let i = 0; i < urls.length; i++) {
              const url = urls[i];
              uploadedUrls.push(url);

              // Find the first uploading image and update it
              setImages((prev) => {
                const updatedImages = [...prev];
                const uploadingIndex = updatedImages.findIndex(
                  (img) => img.status === "uploading"
                );

                if (uploadingIndex !== -1) {
                  updatedImages[uploadingIndex] = {
                    ...updatedImages[uploadingIndex],
                    url,
                    status: "uploaded" as const,
                  };

                  // Notify parent component
                  onChange(url);
                }

                return updatedImages;
              });

              // Small delay to ensure state updates properly
              await new Promise((resolve) => setTimeout(resolve, 50));
            }

            // Only show success toast if not in silent mode
            if (!silentMode) {
              toast.success(`تم رفع ${urls.length} صورة بنجاح`);
            }
          }

          setLoading(false);
          return uploadedUrls;
        } catch (error) {
          console.error("Error in uploadAllFiles:", error);
          toast.error("فشل في رفع الصور");

          // Reset status back to local
          setImages((prev) =>
            prev.map((img) =>
              img.status === "uploading"
                ? { ...img, status: "local" as const }
                : img
            )
          );

          setLoading(false);
          return [];
        }
      },
      [images, onChange]
    );

    // Check if there are any local files
    const hasLocalFiles = useCallback(() => {
      return images.some((img) => img.status === "local");
    }, [images]);

    // Get array of all uploaded image URLs for the form
    const getImagesForForm = useCallback(() => {
      return images
        .filter((img) => img.status === "uploaded" && img.url)
        .map((img) => img.url!);
    }, [images]);

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        uploadAllFiles,
        hasLocalFiles,
        getImagesForForm,
      }),
      [uploadAllFiles, hasLocalFiles, getImagesForForm]
    );

    // Cleanup previews when component unmounts
    React.useEffect(() => {
      return () => {
        images.forEach((img) => {
          if (img.preview) URL.revokeObjectURL(img.preview);
        });
      };
    }, [images]);

    // Count images by status for UI display
    const localImagesCount = images.filter(
      (img) => img.status === "local"
    ).length;
    const uploadingImagesCount = images.filter(
      (img) => img.status === "uploading"
    ).length;
    const uploadedImagesCount = images.filter(
      (img) => img.status === "uploaded"
    ).length;

    // Calculate remaining slots
    const remainingSlots = 10 - images.length;

    return (
      <div className="space-y-4">
        {/* Show all images in unified grid */}
        {images.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">
                الصور ({images.length})
                {uploadingImagesCount > 0 &&
                  ` • جاري الرفع (${uploadingImagesCount})`}
              </h4>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative aspect-square w-full overflow-hidden rounded-lg border bg-background"
                >
                  <Image
                    src={img.url || img.preview || ""}
                    alt="Car Image"
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />

                  {/* Status indicator for uploading */}
                  {img.status === "uploading" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Loader2 className="h-6 w-6 animate-spin text-white" />
                    </div>
                  )}

                  {/* Controls overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeImage(img.id)}
                      disabled={
                        disabled || loading || img.status === "uploading"
                      }
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">حذف الصورة</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File uploader */}
        <FileUploader
          disabled={disabled || loading || remainingSlots <= 0}
          onUpload={handleFileSelection}
          multiple
          maxFiles={remainingSlots > 0 ? remainingSlots : 0}
          accept={{ "image/*": [] }}
          maxSize={1024 * 1024 * 5} // 5MB
        />
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
