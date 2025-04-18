import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Force dynamic rendering for the route handler
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/";
  const type = requestUrl.searchParams.get("type");

  if (!code) {
    return NextResponse.redirect(
      new URL(`/login?error=No code provided`, request.url)
    );
  }

  try {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(
        new URL(`/login?error=${error.message}`, request.url)
      );
    }

    // If this is email verification, redirect to dashboard
    if (type === "email_verification") {
      // For email verification, redirect to dashboard
      return NextResponse.redirect(
        new URL(`/dashboard?verified=true`, requestUrl.origin)
      );
    }

    // For other auth callbacks (like password reset), use the next parameter
    return NextResponse.redirect(
      new URL(`${next}?verified=true`, requestUrl.origin)
    );
  } catch (error) {
    console.error("Unknown error in auth callback:", error);
    return NextResponse.redirect(
      new URL(`/login?error=Unknown error occurred`, request.url)
    );
  }
}
