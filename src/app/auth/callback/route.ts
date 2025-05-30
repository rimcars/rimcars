import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Force dynamic rendering for the route handler
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const type = requestUrl.searchParams.get("type");
  const returnTo = requestUrl.searchParams.get("returnTo");
  const next = requestUrl.searchParams.get("next");

  // Default redirect destinations based on verification type
  const getDefaultRedirect = (verificationType?: string | null) => {
    const baseUrl = requestUrl.origin;

    if (verificationType === "email_verification") {
      // Use environment variable or fallback to dashboard
      const verifyRedirect = process.env.NEXT_PUBLIC_VERIFY_EMAIL_REDIRECT;
      if (verifyRedirect) {
        return `${baseUrl}/${verifyRedirect.replace(/^\//, "")}?verified=true`;
      }
      return `${baseUrl}/dashboard?verified=true`;
    }

    // For OAuth (Google, etc.) or other auth types
    if (returnTo) {
      return `${baseUrl}${
        returnTo.startsWith("/") ? returnTo : `/${returnTo}`
      }`;
    }

    if (next) {
      return `${baseUrl}${next.startsWith("/") ? next : `/${next}`}`;
    }

    // Default fallback
    return `${baseUrl}/dashboard`;
  };

  // Handle missing code parameter
  if (!code) {
    console.error("Auth callback: No code provided");
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Authentication failed - no code provided"
        )}`,
        requestUrl.origin
      )
    );
  }

  try {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback error:", error);

      // Handle specific error types with better user messages
      let errorMessage = "Authentication failed";
      if (error.message.includes("expired")) {
        errorMessage = "Authentication link has expired. Please try again.";
      } else if (error.message.includes("invalid")) {
        errorMessage = "Invalid authentication link. Please try again.";
      } else if (error.message.includes("used")) {
        errorMessage = "Authentication link has already been used.";
      }

      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(errorMessage)}`,
          requestUrl.origin
        )
      );
    }

    // Successful authentication - determine redirect destination
    const redirectUrl = getDefaultRedirect(type);

    console.log(
      `Auth callback success: ${data.user?.email} | Type: ${type} | Redirecting to: ${redirectUrl}`
    );

    return NextResponse.redirect(new URL(redirectUrl));
  } catch (error) {
    console.error("Unknown error in auth callback:", error);
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "An unexpected error occurred during authentication"
        )}`,
        requestUrl.origin
      )
    );
  }
}
