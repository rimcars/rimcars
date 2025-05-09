"use client";

import { FileUploader } from "@/components/ui/file-uploader";
import { useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash, Loader2 } from "lucide-react";
import React from "react";
import { uploadCarImages } from "@/utils/car-images";

interface ImageUploadProps {
  value: string[];
  disabled?: boolean;
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
}

// Define the exposed ref methods
export interface ImageUploadRef {
  uploadAllFiles: () => Promise<void>;
  hasLocalFiles: () => boolean;
}

interface LocalFile {
  id: string;
  file: File;
  preview: string;
}

const ImageUpload = forwardRef<ImageUploadRef, ImageUploadProps>(
  function ImageUpload({ value, disabled, onChange, onRemove }, ref) {
    const [loading, setLoading] = useState(false);
    const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);

    // Handle file selection without immediate upload
    const handleFileSelection = useCallback(
      async (files: File[]): Promise<void> => {
        setLoading(true);
        try {
          console.log("Handling file selection:", files.length, "files");
          const newLocalFiles = files.map((file) => ({
            id: Math.random().toString(36).substring(2, 15),
            file,
            preview: URL.createObjectURL(file),
          }));

          setLocalFiles((prev) => {
            const updated = [...prev, ...newLocalFiles];
            console.log("Updated local files count:", updated.length);
            return updated;
          });
        } catch (error) {
          console.error("Error handling file selection:", error);
          toast.error("حدث خطأ أثناء معالجة الملفات المحددة");
        } finally {
          setLoading(false);
        }
        return Promise.resolve();
      },
      []
    );

    // Remove a local file (not yet uploaded)
    const removeLocalFile = useCallback((fileId: string) => {
      setLocalFiles((prev) => {
        const fileToRemove = prev.find((f) => f.id === fileId);
        if (fileToRemove?.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
        const updated = prev.filter((f) => f.id !== fileId);
        console.log("Removed local file, remaining:", updated.length);
        return updated;
      });
    }, []);

    // Upload all pending local files using server action
    const uploadAllFiles = useCallback(
      async (silentMode = true) => {
        if (localFiles.length === 0) {
          console.log("No local files to upload");
          return;
        }

        console.log("Starting upload of", localFiles.length, "files");
        setLoading(true);

        try {
          // Extract files from local files array
          const filesToUpload = localFiles.map((item) => item.file);

          console.log("Preparing files for upload:", filesToUpload.length);

          try {
            // Call the utility function to upload files
            console.log("Calling uploadCarImages function");
            const urls = await uploadCarImages(filesToUpload);

            if (!urls || urls.length === 0) {
              console.error("No URLs returned from upload function");
              toast.error("لم يتم استلام روابط الصور من الخادم");
              return;
            }

            console.log("Upload successful, received URLs:", urls);

            // Add new URLs to the form
            console.log("Adding URLs to form:", urls.length);

            // We'll use a different approach to update the parent component
            const updatedUrls: string[] = [];
            urls.forEach((url) => {
              console.log("Adding URL to form:", url);
              updatedUrls.push(url);
              // Call onChange for each URL to update the parent component
              onChange(url);
            });

            console.log("All URLs added to parent component");

            // Clear local files after successful upload
            setLocalFiles([]);

            // Only show success toast if not in silent mode
            if (!silentMode) {
              toast.success(`تم رفع ${urls.length} صورة بنجاح`);
            }
          } catch (uploadError) {
            console.error("Error calling uploadCarImages:", uploadError);
            toast.error("فشل في رفع الصور");
            return;
          }
        } catch (error) {
          console.error("Error uploading images:", error);
          toast.error("فشل في رفع الصور");
          throw error; // Re-throw for proper error handling in parent component
        } finally {
          setLoading(false);
        }
      },
      [localFiles, onChange]
    );

    // Check if there are any local files
    const hasLocalFiles = useCallback(() => {
      const result = localFiles.length > 0;
      console.log(
        "hasLocalFiles called, result:",
        result,
        "localFiles count:",
        localFiles.length
      );
      return result;
    }, [localFiles]);

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        uploadAllFiles,
        hasLocalFiles,
      }),
      [uploadAllFiles, hasLocalFiles]
    );

    // Cleanup previews when component unmounts
    React.useEffect(() => {
      return () => {
        localFiles.forEach((file) => {
          if (file.preview) URL.revokeObjectURL(file.preview);
        });
      };
    }, [localFiles]);

    // Debug effect
    React.useEffect(() => {
      console.log("Current local files count:", localFiles.length);
    }, [localFiles]);

    return (
      <div className="space-y-4">
        {/* Show existing uploaded images */}
        {value.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {value.map((url) => (
              <div
                key={url}
                className="group relative aspect-square w-full overflow-hidden rounded-lg border bg-background"
              >
                <Image
                  src={url}
                  alt="صورة السيارة"
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onRemove(url)}
                    disabled={disabled || loading}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">حذف الصورة</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show local file previews */}
        {localFiles.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">
                الصور المحددة ({localFiles.length})
              </h4>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {localFiles.map((file) => (
                <div
                  key={file.id}
                  className="group relative aspect-square w-full overflow-hidden rounded-lg border bg-background"
                >
                  <Image
                    src={file.preview}
                    alt={file.file.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeLocalFile(file.id)}
                      disabled={disabled || loading}
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

        <FileUploader
          disabled={disabled || loading}
          onUpload={handleFileSelection}
          multiple
          maxFiles={10 - value.length - localFiles.length}
          accept={{ "image/*": [] }}
          maxSize={1024 * 1024 * 5} // 5MB
        />
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
