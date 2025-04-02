"use client";

import React, { useRef, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ImageUpload, { ImageUploadRef } from "./image-upload";
import { Listing, listingFormSchema } from "../../types";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Define the props type
type ListingFormProps = {
  initialData: Partial<Listing> | null;
  action: (formData: FormData) => Promise<{ error: string | null; data?: any }>;
};

export default function ListingForm({ initialData, action }: ListingFormProps) {
  const router = useRouter();
  const imageUploadRef = useRef<ImageUploadRef>(null);
  const [loading, setLoading] = useState(false);

  // We no longer need a separate state for images - they're managed by the ImageUpload component
  const [validationError, setValidationError] = useState<string | null>(null);

  // Create form without image validation in the schema
  const form = useForm<z.infer<typeof listingFormSchema>>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      car_name: initialData?.car_name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      old_price: initialData?.old_price || undefined,
      make: initialData?.make || "",
      model: initialData?.model || "",
      year: initialData?.year || undefined,
      mileage: initialData?.mileage || undefined,
      location: initialData?.location || "",
      condition: initialData?.condition || "used",
      transmission: initialData?.transmission || "automatic",
      fuel_type: initialData?.fuel_type || "petrol",
      images: initialData?.images || [],
    },
  });

  // Clear validation error when checking image status
  useEffect(() => {
    if (!imageUploadRef.current) return;

    const hasImages =
      imageUploadRef.current.hasLocalFiles() ||
      imageUploadRef.current.getImagesForForm().length > 0;

    if (hasImages) {
      setValidationError(null);
    }
  }, []);

  async function onSubmit(values: z.infer<typeof listingFormSchema>) {
    try {
      // Don't allow submission in loading state
      if (loading) return;

      // Get image status directly from the ref
      const hasLocalFiles = imageUploadRef.current?.hasLocalFiles() || false;
      const currentImages = imageUploadRef.current?.getImagesForForm() || [];

      // Manual validation for images
      if (currentImages.length === 0 && !hasLocalFiles) {
        setValidationError("يجب إضافة صورة واحدة على الأقل");
        return;
      }

      // Start loading
      setLoading(true);

      try {
        // Upload any pending local images
        if (hasLocalFiles && imageUploadRef.current) {
          // This now returns the array of newly uploaded URLs
          await imageUploadRef.current.uploadAllFiles();

          // Small delay to ensure state is properly updated
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Get the final list of all images from the component AFTER upload
        const allImages = imageUploadRef.current?.getImagesForForm() || [];

        if (allImages.length === 0) {
          toast.error("فشل في رفع الصور");
          setLoading(false);
          return;
        }

        // Create FormData
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === "images") {
            // Use the images directly from our component state
            formData.append(key, JSON.stringify(allImages));
          } else if (value !== null && value !== undefined) {
            formData.append(key, value.toString());
          }
        });

        // Submit the form
        const result = await action(formData);

        if (result.error) {
          toast.error(result.error);
          setLoading(false);
          return;
        }

        toast.success(
          initialData ? "تم تحديث السيارة بنجاح" : "تم إضافة السيارة بنجاح"
        );

        // Redirect to listings page after successful submission
        router.push("/dashboard/listings");
      } catch (error) {
        toast.error("حدث خطأ أثناء معالجة الصور أو حفظ البيانات");
        setLoading(false);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء حفظ البيانات");
      setLoading(false);
    }
  }

  // Determine the loading message
  const getButtonText = () => {
    if (loading) {
      return initialData ? "تحديث السيارة" : "إضافة سيارة";
    }
    return initialData ? "تحديث السيارة" : "إضافة سيارة";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">معلومات أساسية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="car_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم السيارة</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="مثال: مرسيدس C200 2023"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الموقع</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="مثال: الرياض، حي السلام"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السعر</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : ""
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="old_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السعر القديم (اختياري)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الحالة</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="اختر حالة السيارة"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">جديد</SelectItem>
                        <SelectItem value="used">مستعمل</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الوصف</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="أدخل وصفًا للسيارة..."
                          className="resize-none"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Car Details Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">تفاصيل السيارة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الشركة المصنعة</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="مثال: مرسيدس، تويوتا"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الموديل</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="مثال: كامري، C200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>سنة الصنع</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="مثال: 2023"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عدد الكيلومترات</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="مثال: 50000"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transmission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ناقل الحركة</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="اختر نوع ناقل الحركة"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="automatic">أوتوماتيك</SelectItem>
                        <SelectItem value="manual">يدوي</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fuel_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع الوقود</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="اختر نوع الوقود"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="petrol">بنزين</SelectItem>
                        <SelectItem value="diesel">ديزل</SelectItem>
                        <SelectItem value="electric">كهرباء</SelectItem>
                        <SelectItem value="hybrid">هجين</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Images Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">صور السيارة</h3>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      ref={imageUploadRef}
                      value={initialData?.images || []}
                      disabled={loading}
                      onChange={(url: string) => {
                        // We don't need to update form state here
                        // The images are managed within the ImageUpload component
                        // and retrieved at form submission time
                      }}
                      onRemove={(url: string) => {
                        // We don't need to update form state here
                        // The images are managed within the ImageUpload component
                        // and retrieved at form submission time
                      }}
                    />
                  </FormControl>
                  {validationError && (
                    <div className="text-red-500 text-sm mt-2">
                      {validationError}
                    </div>
                  )}
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button disabled={loading} className="mr-auto" type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {getButtonText()}
        </Button>
      </form>
    </Form>
  );
}
