import React from "react";
import Link from "next/link";
import {
  Heart,
  User as UserIcon,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/ui/user-avatar";
import type { DatabaseUser } from "@/types";

interface UserMenuDropdownProps {
  children: React.ReactNode;
  user: DatabaseUser | null;
  onSignOut: () => Promise<void>;
  isLoading?: boolean;
}

export function UserMenuDropdown({
  children,
  user,
  onSignOut,
  isLoading = false,
}: UserMenuDropdownProps) {
  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoading}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 p-0 shadow-xl border border-muted-foreground/10"
        sideOffset={4}
        avoidCollisions={true}
        collisionPadding={16}
      >
        {/* User Info Header */}
        <DropdownMenuLabel>
          <div className="p-4 border-b bg-muted/30">
            <div className="flex items-center gap-3">
              <UserAvatar
                imageUrl={user.avatar_url}
                name={user.name}
                email={user.email}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none truncate">
                  {user.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground mt-1 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        {/* Menu Items */}
        <div className="p-2" dir="rtl">
          {/* Seller Options */}
          {user.role === "seller" && (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 cursor-pointer w-full px-3 py-2 rounded-md hover:bg-muted/80 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">لوحة التحكم</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 cursor-pointer w-full px-3 py-2 rounded-md hover:bg-muted/80 transition-colors"
                >
                  <Settings className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">الإعدادات</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
            </>
          )}

          {/* Common User Options */}
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex items-center gap-3 cursor-pointer w-full px-3 py-2 rounded-md hover:bg-muted/80 transition-colors"
            >
              <UserIcon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">الملف الشخصي</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/favorites"
              className="flex items-center gap-3 cursor-pointer w-full px-3 py-2 rounded-md hover:bg-muted/80 transition-colors"
            >
              <Heart className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">المفضلة</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          {/* Logout */}
          <DropdownMenuItem
            onClick={onSignOut}
            disabled={isLoading}
            className="flex items-center gap-3 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 w-full px-3 py-2 rounded-md hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">
              {isLoading ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
