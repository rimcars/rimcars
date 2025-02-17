import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

// Routes that don't require authentication
const publicRoutes = [
  '/', // Root page is public
  '/login', // Login page
  '/signup', // Registration page
  '/verify-email', // Email verification page
  '/forgot-password', // Password recovery
  '/reset-password', // Password reset
  '/auth/callback' // Auth callback handling
];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the route is public (no auth needed)
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith('/auth/')
  );

  // Allow public routes to proceed without authentication
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, check auth
  try {
    const supabase = createClient(request);
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      // If no session, redirect to signin
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Get user metadata to check role
    const {
      data: { user: userData }
    } = await supabase.auth.getUser();
    const userRole = userData?.user_metadata?.role;

    // If trying to access dashboard without admin role
    if (pathname.startsWith('/dashboard') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // User is authenticated and authorized, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    // On error, redirect to signin
    return NextResponse.redirect(new URL('/login', request.url));
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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
