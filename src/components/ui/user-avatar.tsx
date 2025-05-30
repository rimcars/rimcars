import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  imageUrl?: string | null;
  name?: string | null;
  email?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function UserAvatar({
  imageUrl,
  name,
  email,
  size = "sm",
  className,
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-9 w-9",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const displayName = name || email?.split("@")[0] || "مستخدم";
  const avatarClasses = sizeClasses[size];
  const textSize = textSizeClasses[size];

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt="الصورة الشخصية"
        width={size === "lg" ? 48 : size === "md" ? 40 : 36}
        height={size === "lg" ? 48 : size === "md" ? 40 : 36}
        className={cn(
          avatarClasses,
          "rounded-full object-cover border-2 border-white shadow-md",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        avatarClasses,
        "flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white font-bold border-2 border-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer",
        className
      )}
    >
      <span className={cn(textSize, "font-bold")}>
        {displayName.charAt(0).toUpperCase()}
      </span>
    </div>
  );
} 