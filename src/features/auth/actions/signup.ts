"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import type { RegisterFormValues } from "../validations/register-schema";

export async function isUserExist(email: string) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (profile?.id) {
    return { id: profile.id };
  }

  return null;
}

/**
 * Constructs the email verification redirect URL with proper fallbacks
 */
function getEmailVerificationRedirectUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const verifyRedirect = process.env.NEXT_PUBLIC_VERIFY_EMAIL_REDIRECT;

  if (!siteUrl) {
    console.warn("NEXT_PUBLIC_SITE_URL not set, using localhost");
  }

  const baseUrl = siteUrl || "http://localhost:3000";
  const redirectPath = verifyRedirect || "auth/callback";

  // Clean up the redirect path (remove leading slash if present)
  const cleanPath = redirectPath.replace(/^\//, "");

  return `${baseUrl}/${cleanPath}?type=email_verification`;
}

export async function signupUser(
  values: RegisterFormValues,
  isSeller: boolean
) {
  const supabase = await createClient();

  try {
    // Construct the email redirect URL with proper fallbacks
    const emailRedirectTo = getEmailVerificationRedirectUrl();

    console.log(
      `Signup: Creating user ${values.email} with redirect: ${emailRedirectTo}`
    );

    // First sign up the user in auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.name,
          role: isSeller ? "seller" : "buyer",
        },
        emailRedirectTo,
      },
    });

    if (authError) {
      console.error("Signup error:", authError);

      // Handle specific signup errors
      if (authError.message.includes("already registered")) {
        return { error: "هذا البريد الإلكتروني مسجل بالفعل" };
      } else if (authError.message.includes("password")) {
        return { error: "كلمة المرور ضعيفة جداً" };
      } else if (authError.message.includes("email")) {
        return { error: "عنوان البريد الإلكتروني غير صالح" };
      }

      return { error: authError.message };
    }

    if (!authData?.user?.id) {
      return { error: "فشل في إنشاء المستخدم" };
    }

    console.log(`Signup successful for user: ${authData.user.email}`);
    revalidatePath("/", "layout");

    return {
      success: true,
      message: "تم إرسال رابط التحقق إلى بريدك الإلكتروني",
      userId: authData.user.id,
    };
  } catch (error) {
    console.error("Unexpected signup error:", error);
    return { error: "فشل في إنشاء المستخدم" };
  }
}
