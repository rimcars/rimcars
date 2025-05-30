"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "../store/favoritesStore";
import { toast } from "sonner";

interface FavoriteButtonProps {
  carId: string;
  variant?: "default" | "floating";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function FavoriteButton({
  carId,
  variant = "default",
  size = "default",
  className = "",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(carId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Simple toggle with instant feedback
    toggleFavorite(carId);

    // Show user-friendly toast
    if (isFav) {
      toast.success("تم إزالة السيارة من المفضلة");
    } else {
      toast.success("تم إضافة السيارة للمفضلة");
    }
  };

  if (variant === "floating") {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-2 left-2 bg-white/80 hover:bg-white/90 text-primary rounded-full transition-colors ${className}`}
        onClick={handleToggle}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isFav ? "fill-red-500 text-red-500" : "text-gray-600"
          }`}
        />
        <span className="sr-only">
          {isFav ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        </span>
      </Button>
    );
  }

  return (
    <Button
      variant={isFav ? "default" : "outline"}
      size={size}
      className={`transition-colors ${className}`}
      onClick={handleToggle}
    >
      <Heart
        className={`h-4 w-4 me-2 transition-colors ${
          isFav ? "fill-current" : ""
        }`}
      />
      {isFav ? "في المفضلة" : "أضف للمفضلة"}
    </Button>
  );
}
