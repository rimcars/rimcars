# Next.js Layout Strategy: Shared Header (Exclude Dashboard)

## 🎯 Goal

Share the main header across all public routes but exclude it from dashboard routes.

## 📁 Option 1: Route Groups (Recommended)

### File Structure:

```
src/app/
├── layout.tsx                    // Root layout (no header)
├── (public)/                     // Route group for public pages
│   ├── layout.tsx               // Public layout with header
│   ├── page.tsx                 // Home page
│   ├── about/
│   │   └── page.tsx
│   ├── cars/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   └── favorites/
│       └── page.tsx
├── (auth)/                       // Route group for auth pages
│   ├── layout.tsx               // Auth layout (different header/no header)
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
└── dashboard/                    // Dashboard routes (separate layout)
    ├── layout.tsx               // Dashboard layout with sidebar
    ├── page.tsx
    ├── listings/
    │   └── page.tsx
    └── settings/
        └── page.tsx
```

### Implementation:

#### 1. Root Layout (Minimal)

```tsx
// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-almarai">
        <Providers>
          <Toaster />
          {children}
          <StagewiseDevToolbar />
        </Providers>
      </body>
    </html>
  );
}
```

#### 2. Public Layout (With Header)

```tsx
// src/app/(public)/layout.tsx
import Header from "@/components/layout/header/main";
import { Footer } from "@/components/layout/footer";
import { getUserWithProfile } from "@/app/actions";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserWithProfile();

  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  );
}
```

#### 3. Dashboard Layout (Separate)

```tsx
// src/app/dashboard/layout.tsx
// (Keep existing dashboard layout as is)
```

## 📁 Option 2: Conditional Header in Root Layout

### Implementation:

```tsx
// src/app/layout.tsx
import { headers } from "next/headers";
import Header from "@/components/layout/header/main";
import { Footer } from "@/components/layout/footer";
import { getUserWithProfile } from "@/app/actions";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  // Exclude header from dashboard routes
  const isDashboard = pathname.startsWith("/dashboard");
  const user = await getUserWithProfile();

  return (
    <html lang="ar" dir="rtl">
      <body className="font-almarai">
        <Providers>
          <Toaster />
          {!isDashboard && <Header user={user} />}
          {children}
          {!isDashboard && <Footer />}
          <StagewiseDevToolbar />
        </Providers>
      </body>
    </html>
  );
}
```

### Middleware to set pathname:

```tsx
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}
```

## 📁 Option 3: Layout Composition Pattern

### Custom Layout Components:

```tsx
// src/components/layout/PublicPageLayout.tsx
import Header from "@/components/layout/header/main";
import { Footer } from "@/components/layout/footer";
import { getUserWithProfile } from "@/app/actions";

export async function PublicPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserWithProfile();

  return (
    <>
      <Header user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

### Usage in Pages:

```tsx
// src/app/page.tsx
import { PublicPageLayout } from "@/components/layout/PublicPageLayout";

export default async function HomePage() {
  return <PublicPageLayout>{/* Page content */}</PublicPageLayout>;
}
```

## 🏆 **Recommendation: Use Route Groups**

**Advantages:**

- ✅ Clear separation of concerns
- ✅ No conditional logic in layouts
- ✅ Better performance (no unnecessary renders)
- ✅ Easier to maintain and scale
- ✅ SEO-friendly
- ✅ Follows Next.js best practices

**Implementation Steps:**

1. Create route groups with parentheses
2. Move existing pages into appropriate groups
3. Create separate layouts for each group
4. Update imports and navigation

This approach gives you the cleanest architecture and best performance.
