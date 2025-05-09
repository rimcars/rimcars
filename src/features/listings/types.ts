import { z } from "zod";
import { Database } from "@/types/database.types";

// Database types
export type Listing = Database["public"]["Tables"]["listings"]["Row"];
export type ListingInsert = Database["public"]["Tables"]["listings"]["Insert"];
export type ListingUpdate = Database["public"]["Tables"]["listings"]["Update"];

// For use in form and application logic (stricter than DB types)
export type StrictListingFields = {
  car_name: string;
  description?: string;
  price: number;
  old_price?: number | null;
  make: string;
  model: string;
  year: number;
  mileage: number;
  location: string;
  condition: "new" | "used";
  transmission: "manual" | "automatic";
  fuel_type: "petrol" | "diesel" | "electric" | "hybrid";
  images: string[];
  seller_name?: string;
  seller_phone?: string;
};

// Enums from database
export type CarCondition = Database["public"]["Enums"]["car_condition"];
export type FuelType = Database["public"]["Enums"]["fuel_type"];
export type TransmissionType = Database["public"]["Enums"]["transmission_type"];

// Listing form schema for validation
export const listingFormSchema = z.object({
  car_name: z.string().min(3, { message: "اسم السيارة مطلوب" }),
  description: z.string().optional(),
  price: z.number().positive({ message: "السعر يجب أن يكون رقماً موجباً" }),
  old_price: z.number().positive().optional().nullable(),
  make: z.string().min(1, { message: "الشركة المصنعة مطلوبة" }),
  model: z.string().min(1, { message: "الموديل مطلوب" }),
  year: z
    .number()
    .int()
    .min(1900, { message: "السنة يجب أن تكون بين 1900 والسنة الحالية" })
    .max(new Date().getFullYear() + 1, { message: "السنة غير صالحة" }),
  mileage: z
    .number()
    .int()
    .min(0, { message: "عدد الكيلومترات يجب أن يكون موجباً" }),
  location: z.string().min(1, { message: "الموقع مطلوب" }),
  condition: z.enum(["new", "used"]),
  transmission: z.enum(["manual", "automatic"]),
  fuel_type: z.enum(["petrol", "diesel", "electric", "hybrid"]),
  images: z.array(z.string()),
  seller_name: z.string().min(1, { message: "اسم البائع مطلوب" }),
  seller_phone: z.string().min(6, { message: "رقم الهاتف مطلوب" }),
});

export type ListingFormValues = z.infer<typeof listingFormSchema>;
