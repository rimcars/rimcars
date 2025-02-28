"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { navItems } from "@/constants/nav-items";
import { ChevronsUpDown, GalleryVerticalEnd, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { Icons } from "@/components/icons";
import { getUser, signOut } from "@/app/actions";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Seller } from "@/types/seller";
import { useUser } from "@/hooks/use-user";

export const company = {
  name: "Acme Inc",
  logo: GalleryVerticalEnd,
  plan: "مؤسسة",
};

export default function AppSidebar({ userInitial }: { userInitial: Seller }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const [sidebarRef, setSidebarRef] = useState<HTMLDivElement | null>(null);

  // Use the custom hook for real-time user data
  const { user } = useUser();

  // Fallback to initial user data if the hook hasn't loaded yet
  const currentUser = user || userInitial;

  // Handle mobile navigation
  const handleNavigation = (url: string) => {
    router.push(url);
    // Close sidebar on mobile
    setOpenMobile(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
      toast.success("تم تسجيل الخروج بنجاح");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("فشل تسجيل الخروج");
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      side="right"
      ref={setSidebarRef}
      className="border-sidebar-border"
    >
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex flex-row-reverse gap-3 py-3 px-3 text-sidebar-foreground">
          <div className="flex aspect-square size-9 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <company.logo className="size-5" />
          </div>
          <div className="grid flex-1 text-right text-sm leading-tight">
            <span className="truncate font-semibold">{company.name}</span>
            <span className="truncate text-xs text-sidebar-foreground/70">
              {company.plan}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden px-2 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-right font-medium text-sidebar-foreground/70 px-3 py-2">
            لوحة التحكم
          </SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isActive}
                  >
                    <button
                      className={`flex w-full flex-row-reverse items-center gap-3 rounded-md px-3 py-2.5 text-right transition-all hover:bg-sidebar-accent/50 dark:hover-elevation-dark ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground"
                      }`}
                      onClick={() => handleNavigation(item.url)}
                      data-active={isActive}
                    >
                      <div
                        className={`flex items-center justify-center size-5 ${
                          isActive
                            ? "text-sidebar-primary"
                            : "text-sidebar-foreground/70"
                        }`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <span className={isActive ? "font-medium" : ""}>
                        {item.title}
                      </span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="w-full rounded-md px-2 py-2 hover:bg-sidebar-accent/50 dark:hover-elevation-dark data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-9 w-9 rounded-md border border-sidebar-border">
                    <AvatarImage
                      src={currentUser?.avatar_url || "/logo.png"}
                      alt={currentUser?.name || "/logo.png"}
                    />
                    <AvatarFallback className="rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                      {currentUser?.name?.slice(0, 2)?.toUpperCase() || "DU"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-right text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {currentUser?.name}
                    </span>
                    <span className="truncate text-xs text-sidebar-foreground/70">
                      {currentUser?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="mr-auto size-4 text-sidebar-foreground/70" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex flex-row-reverse items-center gap-2 px-2 py-2 text-right text-sm">
                    <Avatar className="h-9 w-9 rounded-md border border-sidebar-border">
                      <AvatarImage
                        src={currentUser?.avatar_url || "/logo.png"}
                        alt={currentUser?.name || "/logo.png"}
                      />
                      <AvatarFallback className="rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                        {currentUser?.name?.slice(0, 2)?.toUpperCase() || "DU"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-right text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {currentUser?.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {currentUser?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex flex-row-reverse"
                >
                  <LogOut className="ml-2 h-4 w-4" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail className="border-sidebar-border" />
    </Sidebar>
  );
}
