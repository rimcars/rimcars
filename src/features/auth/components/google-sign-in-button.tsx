"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";

export function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get the return URL from search params or default to dashboard
      const returnTo = searchParams.get("returnTo") || "/dashboard";

      // Construct the callback URL with proper parameters
      const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;
      const redirectTo = `${callbackUrl}?returnTo=${encodeURIComponent(
        returnTo
      )}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("❌ Google sign-in error:", error);

        // Handle specific OAuth errors
        let userFriendlyMessage = "فشل في تسجيل الدخول باستخدام جوجل";
        if (error.message.includes("popup")) {
          userFriendlyMessage =
            "تم إغلاق النافذة المنبثقة. الرجاء المحاولة مرة أخرى.";
        } else if (error.message.includes("network")) {
          userFriendlyMessage = "خطأ في الشبكة. تحقق من اتصال الإنترنت.";
        } else if (error.message.includes("unauthorized")) {
          userFriendlyMessage = "غير مصرح. تحقق من إعدادات جوجل.";
        }

        setError(userFriendlyMessage);
      }
    } catch (error) {
      console.error("❌ Error signing in with Google:", error);
      setError("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={signInWithGoogle}
        className="w-full bg-background hover:bg-muted text-muted-foreground font-normal"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-primary/30" />
            <span>جاري تسجيل الدخول...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>تسجيل الدخول باستخدام جوجل</span>
            <FcGoogle className="h-5 w-5" />
          </div>
        )}
      </Button>
      {error && (
        <p className="text-sm text-destructive text-center bg-destructive/10 p-2 rounded-md">
          {error}
        </p>
      )}
    </div>
  );
}
