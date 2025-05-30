"use client";

import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { UserAvatar } from "@/components/ui/user-avatar";
import { FavoritesCounter } from "@/features/favorites";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { DatabaseUser } from "@/types";

interface MobileNavigationProps {
  user: DatabaseUser | null;
  navItems: Array<{ name: string; href: string }>;
  onLogout: () => void;
}

// Navigation Link component that auto-closes the sheet
function MobileNavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-muted/80 transition-all duration-200 hover:translate-x-1 active:scale-95 ${className}`}
      >
        {children}
      </Link>
    </SheetClose>
  );
}

// Button component that auto-closes the sheet
function MobileNavButton({
  onClick,
  children,
  className = "",
  variant = "outline" as const,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "outline" | "destructive" | "default";
}) {
  return (
    <SheetClose asChild>
      <Button
        onClick={onClick}
        variant={variant}
        className={`w-full justify-start gap-3 h-11 transition-all duration-200 active:scale-95 ${className}`}
      >
        {children}
      </Button>
    </SheetClose>
  );
}

// Logo component
function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/rimcars-logo.png"
      alt="RIMCARS Logo"
      width={120}
      height={40}
      className={cn("h-auto w-auto", className)}
      priority
    />
  );
}

export function MobileNavigation({
  user,
  navItems,
  onLogout,
}: MobileNavigationProps) {
  return (
    <div className="flex flex-col h-full max-h-screen bg-background">
      {/* Header - Compact */}
      <div className="p-4 border-b bg-muted/30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Logo className="w-20" />
          <div className="flex-1" />
          <ModeToggle />
        </div>
        <h2 className="text-right text-base font-semibold text-foreground mt-2">
          قائمة التنقل
        </h2>
      </div>

      {/* User Profile Section (if logged in) - Compact */}
      {user && (
        <div className="p-4 border-b bg-muted/10 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background border shadow-sm">
            <UserAvatar
              imageUrl={user.avatar_url}
              name={user.name}
              email={user.email}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {user.role === "seller"
                  ? "بائع"
                  : user.role === "admin"
                  ? "مدير"
                  : "مشتري"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Main Navigation */}
        <nav className="p-4" dir="rtl">
          <div className="space-y-1">
            {/* Public Navigation Items */}
            {navItems.map((item) => (
              <MobileNavLink key={item.name} href={item.href}>
                <span className="font-medium">{item.name}</span>
              </MobileNavLink>
            ))}

            {/* Favorites with Counter */}
            <MobileNavLink href="/favorites">
              <FavoritesCounter asLink={false} showLabel={true} />
            </MobileNavLink>
          </div>
        </nav>
      </div>

      {/* Auth Section - Fixed at bottom */}
      <div className="border-t bg-muted/20 p-4 flex-shrink-0">
        {!user ? (
          <div className="space-y-3">
            <SheetClose asChild>
              <Link href="/login" className="w-full">
                <Button className="w-full h-11 font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-95">
                  تسجيل الدخول
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/signup" className="w-full">
                <Button
                  variant="outline"
                  className="w-full h-11 font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
                >
                  إنشاء حساب جديد
                </Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <MobileNavButton
            onClick={onLogout}
            variant="destructive"
            className="mt-0 font-semibold shadow-sm hover:shadow-md"
          >
            <LogOut className="h-5 w-5" />
            تسجيل الخروج
          </MobileNavButton>
        )}
      </div>
    </div>
  );
}
