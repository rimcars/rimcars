import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addFavorite(carId: string, userId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("favorites")
    .insert([{ car_id: carId, user_id: userId }]);
  if (error) throw error;
  revalidatePath("/");
}

export async function removeFavorite(carId: string, userId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("car_id", carId)
    .eq("user_id", userId);
  if (error) throw error;
  revalidatePath("/");
}