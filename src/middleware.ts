import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

// Routes that require seller role
const sellerRoutes: string[] = [
  "/dashboard/settings",
  "/dashboard/listings",
  "/dashboard/overview",
  // Add more seller-only routes as needed
];

// Public routes that should bypass auth check
const publicRoutes: string[] = [
  "/",
  "/cars",
  "/cars/[id]",
  "/auth",
  "/login",
  "/register",
];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the route is public
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if the route requires seller role
  const requiresSellerRole = sellerRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  // If the route doesn't require seller role, allow access
  if (!requiresSellerRole) {
    return NextResponse.next();
  }

  // For protected routes, check auth
  try {
    const supabase = createClient(request);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If no user and route requires seller role, redirect to login
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check if user has seller role
    const userRole = user.user_metadata?.role;

    // If user is not a seller, redirect to home page
    if (userRole !== "seller") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // User is authenticated and authorized, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    // On error, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
