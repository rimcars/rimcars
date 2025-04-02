import { z } from "zod";
import { Database } from "@/types/database.types";

// Database types
export type Listing = Database["public"]["Tables"]["listings"]["Row"];
export type ListingInsert = Database["public"]["Tables"]["listings"]["Insert"];
export type ListingUpdate = Database["public"]["Tables"]["listings"]["Update"];

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
  make: z.string().optional(),
  model: z.string().optional(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .optional()
    .nullable(),
  mileage: z.number().int().min(0).optional().nullable(),
  location: z.string().optional(),
  condition: z.enum(["new", "used"]),
  transmission: z.enum(["manual", "automatic"]),
  fuel_type: z.enum(["petrol", "diesel", "electric", "hybrid"]),
  images: z.array(z.string()),
});

export type ListingFormValues = z.infer<typeof listingFormSchema>;
