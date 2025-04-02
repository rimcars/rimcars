"use client";

import { UploadIcon, FileIcon, Trash, Star, Loader2 } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import Dropzone, {
  type DropzoneProps,
  type FileRejection,
} from "react-dropzone";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useControllableState } from "@/hooks/use-controllable-state";
import { cn, formatBytes } from "@/lib/utils";

interface FileWithPreview extends File {
  preview: string;
  id: string;
}

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value?: File[];

  /**
   * Function to be called when the value changes.
   * @type React.Dispatch<React.SetStateAction<File[]>>
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;

  /**
   * Function to be called when files are uploaded.
   * @type (files: File[]) => Promise<void>
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  onUpload?: (files: File[]) => Promise<void>;

  /**
   * Progress of the uploaded files.
   * @type Record<string, number> | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps["accept"];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps["maxSize"];

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFiles={5}
   */
  maxFiles?: DropzoneProps["maxFiles"];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;
}

export function FileUploader(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = { "image/*": [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    multiple = true,
    disabled = false,
    className,
    ...dropzoneProps
  } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });

  const [isUploading, setIsUploading] = useState(false);

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      console.log("Files dropped:", acceptedFiles.length, "accepted files");

      if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
        toast.error("لا يمكن رفع أكثر من ملف واحد في المرة الواحدة");
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
        toast.error(`لا يمكن رفع أكثر من ${maxFiles} ملفات`);
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: `${file.name}-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
        })
      );

      console.log("Created new files with preview:", newFiles.length);

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;
      console.log("Setting files to:", updatedFiles.length, "total files");

      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          const errorMessages = errors.map((e) => e.message).join(", ");
          toast.error(`${file.name}: ${errorMessages}`);
        });
      }

      if (
        onUpload &&
        updatedFiles.length > 0 &&
        updatedFiles.length <= maxFiles
      ) {
        setIsUploading(true);
        const target =
          updatedFiles.length > 1 ? `${updatedFiles.length} ملفات` : `ملف`;

        // Call onUpload without toast
        onUpload(updatedFiles)
          .then(() => {
            setFiles([]);
            setIsUploading(false);
          })
          .catch((err) => {
            setIsUploading(false);
            toast.error(err.message || `فشل في رفع ${target}`);
          });
      }
    },
    [files, maxFiles, multiple, onUpload, setFiles]
  );

  function onRemove(fileToRemove: FileWithPreview) {
    if (!files || isUploading) return;

    // Revoke the preview URL for the removed file
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    const newFiles = files.filter(
      (file) => (file as FileWithPreview).id !== fileToRemove.id
    );
    setFiles(newFiles);
    onValueChange?.(newFiles);
  }

  // Revoke preview urls when component unmounts or files change
  React.useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const isDisabled =
    disabled || isUploading || (files?.length ?? 0) >= maxFiles;

  return (
    <div className={cn("w-full space-y-4", className)} {...dropzoneProps}>
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={maxFiles > 1 || multiple}
        disabled={isDisabled}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              "flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4 transition-colors",
              isDragActive
                ? "border-primary/50 bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50",
              isDisabled && "pointer-events-none opacity-60",
              className
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <UploadIcon
                className={cn("h-8 w-8", isDragActive && "text-primary")}
              />
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">
                    جاري رفع الملفات...
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium">
                    اسحب وأفلت الملفات هنا، أو انقر لتحديد الملفات
                  </p>
                  <p className="text-xs text-muted-foreground">
                    الحد الأقصى لحجم الملف: {formatBytes(maxSize)}
                  </p>
                  {maxFiles && (
                    <p className="text-xs text-muted-foreground">
                      الحد الأقصى للملفات: {maxFiles}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </Dropzone>

      {files?.length ? (
        <div className="w-full rounded-lg border p-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {files.map((file, i) => (
              <div
                key={(file as FileWithPreview).id || `${file.name}-${i}`}
                className="group relative aspect-square w-full overflow-hidden rounded-lg border bg-background"
              >
                {isFileWithPreview(file) && file.type.startsWith("image/") ? (
                  <>
                    <Image
                      src={file.preview}
                      alt={file.name}
                      className="object-cover transition-all group-hover:scale-105"
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    {i === 0 && (
                      <div
                        className="absolute left-1 top-1 rounded-full bg-yellow-500 p-1"
                        title="صورة مصغرة"
                      >
                        <Star className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <FileIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onRemove(file as FileWithPreview)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">حذف {file.name}</span>
                  </Button>
                </div>
                {progresses?.[file.name] != null && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center text-xs text-white">
                    {Math.round(progresses[file.name])}%
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-center">
                  <p className="truncate text-xs text-white">{file.name}</p>
                  <p className="text-xs text-white/70">
                    {formatBytes(file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function isFileWithPreview(file: File): file is FileWithPreview {
  return "preview" in file && typeof file.preview === "string" && "id" in file;
}
