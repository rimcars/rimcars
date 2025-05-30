"use server";

import { createClient } from "@/utils/supabase/client";

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

export async function resendVerificationEmail(email: string) {
  const supabase = await createClient();

  try {
    // Construct the email redirect URL with proper fallbacks
    const emailRedirectTo = getEmailVerificationRedirectUrl();

    console.log(
      `Resending verification email to ${email} with redirect: ${emailRedirectTo}`
    );

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo,
      },
    });

    if (error) {
      console.error("Resend verification email error:", error);

      // Handle specific resend errors
      if (error.message.includes("rate limit")) {
        return {
          error:
            "تم إرسال عدد كبير من الطلبات. الرجاء الانتظار قبل المحاولة مرة أخرى.",
          success: false,
        };
      } else if (error.message.includes("not found")) {
        return { error: "البريد الإلكتروني غير موجود", success: false };
      }

      return { error: error.message, success: false };
    }

    console.log(`Verification email resent successfully to ${email}`);
    return {
      success: true,
      error: null,
      message: "تم إرسال رابط التحقق مرة أخرى إلى بريدك الإلكتروني",
    };
  } catch (error) {
    console.error("Unexpected error resending verification email:", error);
    return {
      error: "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.",
      success: false,
    };
  }
}
