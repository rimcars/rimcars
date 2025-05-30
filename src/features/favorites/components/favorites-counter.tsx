"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "../store/favoritesStore";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface FavoritesCounterProps {
  showLabel?: boolean;
  className?: string;
  asLink?: boolean;
}

export function FavoritesCounter({
  showLabel = false,
  className = "",
  asLink = true,
}: FavoritesCounterProps) {
  const { getFavoriteCount } = useFavoritesStore();
  const count = getFavoriteCount();

  const content = (
    <>
      {count === 0 ? (
        <>
          <Heart className="h-5 w-5" />
          {showLabel && <span>المفضلة</span>}
        </>
      ) : (
        <>
          <div className="relative">
            <Heart className="h-5 w-5 fill-current" />
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {count > 99 ? "99+" : count}
            </Badge>
          </div>
          {showLabel && <span>المفضلة ({count})</span>}
        </>
      )}
    </>
  );

  if (!asLink) {
    return (
      <div
        className={`flex items-center gap-2 ${
          count === 0 ? "text-muted-foreground" : "text-primary"
        } ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href="/favorites"
      className={`flex items-center gap-2 ${
        count === 0
          ? "text-muted-foreground hover:text-primary"
          : "text-primary hover:text-primary/80"
      } transition-colors relative ${className}`}
    >
      {content}
    </Link>
  );
}
