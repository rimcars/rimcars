import { UiCar } from "@/features/public-listings/types";

export interface FavoriteCar extends UiCar {
  addedAt?: string; // When it was added to favorites (optional)
}

export interface FavoritesResponse {
  favorites: string[];
  error: string | null;
}

export interface FavoriteAction {
  success: boolean;
  error: string | null;
}

export interface FavoritesState {
  favorites: string[];
}

export interface FavoritesPageProps {
  user: any;
  initialFavorites: string[];
}

export interface FavoritesClientProps {
  favoriteCars: FavoriteCar[];
  userId: string;
  isEmpty: boolean;
  error?: string;
}
