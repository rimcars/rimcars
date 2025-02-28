"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import type { ResetPasswordValues } from "../validations/reset-password-schema";

// Define error types for better type safety
export type ResetPasswordError =
  | "link_expired"
  | "invalid_link"
  | "same_password"
  | "rate_limit"
  | "session_expired"
  | "generic_error";

export type ResetPasswordResponse = {
  success: boolean;
  error?: ResetPasswordError;
  message?: string;
  seconds?: number;
};

/**
 * Server action to handle password reset.
 * This function updates the user's password in Supabase Auth.
 *
 * @param values - The form values containing the new password and code
 */
export async function resetPassword(
  values: ResetPasswordValues
): Promise<ResetPasswordResponse> {
  const supabase = await createClient();

  try {
    // Exchange the code for a session if provided and not empty
    if (!values.code || values.code.trim() === "") {
      return {
        success: false,
        error: "invalid_link",
        message: "رابط إعادة تعيين كلمة المرور غير صالح",
      };
    }

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
      values.code
    );

    if (exchangeError) {
      console.error(
        "Error exchanging code for session:",
        exchangeError.message
      );

      if (exchangeError.message.includes("expired")) {
        return {
          success: false,
          error: "link_expired",
          message: "انتهت صلاحية رابط إعادة تعيين كلمة المرور",
        };
      }

      return {
        success: false,
        error: "invalid_link",
        message: "رابط إعادة تعيين كلمة المرور غير صالح",
      };
    }

    // Update the user's password
    const { error: updateError } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (updateError) {
      console.error("Error updating password:", updateError.message);

      // Handle same password error
      if (
        updateError.message.includes("same as your old") ||
        updateError.message.includes("should be different from the old")
      ) {
        return {
          success: false,
          error: "same_password",
          message: "لا يمكن استخدام كلمة المرور السابقة",
        };
      }

      // Handle rate limiting errors
      const rateLimitMatch = updateError.message.match(/after (\d+) seconds/);
      if (rateLimitMatch) {
        const seconds = parseInt(rateLimitMatch[1]);
        return {
          success: false,
          error: "rate_limit",
          message: `الرجاء الانتظار ${seconds} ثانية قبل المحاولة مرة أخرى`,
          seconds,
        };
      }

      // Handle session expired error
      if (
        updateError.message.includes("session expired") ||
        updateError.message.includes("session missing")
      ) {
        return {
          success: false,
          error: "session_expired",
          message: "انتهت صلاحية الجلسة. الرجاء المحاولة مرة أخرى",
        };
      }

      // Handle generic errors
      return {
        success: false,
        error: "generic_error",
        message: "حدث خطأ أثناء إعادة تعيين كلمة المرور",
      };
    }

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "تم إعادة تعيين كلمة المرور بنجاح",
    };
  } catch (error) {
    console.error("Unexpected error during password reset:", error);
    return {
      success: false,
      error: "generic_error",
      message: "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى",
    };
  }
}
