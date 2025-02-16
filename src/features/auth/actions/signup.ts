'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import type { RegisterFormValues } from '../validations/register-schema';

export async function isUserExist(email: string) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (profile?.id) {
    return { id: profile.id };
  }

  return null;
}

export async function signupUser(values: RegisterFormValues) {
  const supabase = await createClient();

  try {
    // First sign up the user in auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/${process.env.NEXT_PUBLIC_VERIFY_EMAIL_REDIRECT}?type=email_verification`
      }
    });

    if (authError) {
      console.log(authError);
      return { error: authError.message };
    }

    if (!authData?.user?.id) {
      return { error: 'Failed to create user' };
    }

    revalidatePath('/', 'layout');
  } catch (error) {
    console.log(error);
    return { error: 'Failed to create user' };
  }
}
