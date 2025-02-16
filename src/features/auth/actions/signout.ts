
"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOut(locale: string) {
  const supabase = await createClient();

    const { error } = await supabase.auth.signOut();
  
    if (error) {
      return { error: error.message };
    }
  
  revalidatePath("/", "layout");
  redirect(`/${locale}`);
}
