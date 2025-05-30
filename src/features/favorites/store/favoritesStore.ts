import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  // State
  favorites: string[];

  // Actions
  addFavorite: (carId: string) => void;
  removeFavorite: (carId: string) => void;
  toggleFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  clearAllFavorites: () => void;
  getFavoriteCount: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      // Initial state
      favorites: [],

      // Add a car to favorites
      addFavorite: (carId: string) => {
        const { favorites } = get();
        if (!favorites.includes(carId)) {
          set({ favorites: [...favorites, carId] });
        }
      },

      // Remove a car from favorites
      removeFavorite: (carId: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((id) => id !== carId) });
      },

      // Toggle favorite status (most useful method)
      toggleFavorite: (carId: string) => {
        const { favorites } = get();
        if (favorites.includes(carId)) {
          set({ favorites: favorites.filter((id) => id !== carId) });
        } else {
          set({ favorites: [...favorites, carId] });
        }
      },

      // Check if a car is favorited
      isFavorite: (carId: string) => {
        return get().favorites.includes(carId);
      },

      // Clear all favorites
      clearAllFavorites: () => {
        set({ favorites: [] });
      },

      // Get total count
      getFavoriteCount: () => {
        return get().favorites.length;
      },
    }),
    {
      name: "car-favorites", // localStorage key
    }
  )
);
