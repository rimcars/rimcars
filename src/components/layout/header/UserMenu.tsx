"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { UserMenuDropdown } from "./UserMenuDropdown";
import { signOut } from "@/app/actions";
import type { DatabaseUser } from "@/types";

interface UserMenuProps {
  user: DatabaseUser | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      router.push("/");
      toast.success("تم تسجيل الخروج بنجاح");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("فشل تسجيل الخروج");
    } finally {
      setIsLoading(false);
    }
  };

  // If no user data available, show login button
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button variant="ghost" className="font-medium">
            تسجيل الدخول
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="font-medium">إنشاء حساب</Button>
        </Link>
      </div>
    );
  }

  return (
    <UserMenuDropdown
      user={user}
      onSignOut={handleSignOut}
      isLoading={isLoading}
    >
      <Button
        variant="ghost"
        className="relative rounded-full p-0 h-10 w-10"
        aria-label="قائمة المستخدم"
        disabled={isLoading}
      >
        <UserAvatar
          imageUrl={user.avatar_url}
          name={user.name}
          email={user.email}
          size="sm"
        />
      </Button>
    </UserMenuDropdown>
  );
}
