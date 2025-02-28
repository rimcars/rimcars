'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import type { LoginFormValues } from '../validations/login-schema';

export async function login(values: LoginFormValues , isSeller: boolean) {
  const supabase = await createClient();

  const { error , data } = await supabase.auth.signInWithPassword(values);

  // console.log("data from the login", data);

  if (error) {
    return { error: error.message };
  }

  if (!isSeller) {
    console.log("You are not a seller");
    return { error: "You are not a seller" };
  }


  revalidatePath('/', 'layout');

}
