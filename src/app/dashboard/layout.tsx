import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { UserMenu } from "@/components/layout/header/UserMenu";
import { getUserWithProfile } from "@/app/actions";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserWithProfile();
  if (user?.role !== "seller") {
    redirect("/");
  }
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar userInitial={user} />
      <SidebarInset>
        {/* Inline dashboard header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 rtl">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-mr-1" />
            <Separator orientation="vertical" className="ml-2 h-4" />
          </div>
          <div className="flex items-center gap-2 px-4">
            <UserMenu user={user} />
            <ModeToggle />
          </div>
        </header>
        {/* page main content */}
        {children}
        {/* page main content ends */}
      </SidebarInset>
    </SidebarProvider>
  );
}
