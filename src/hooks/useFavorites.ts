import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";

// Fetch all favorite car IDs for the user
export function useUserFavorites(userId: string | undefined) {
  return useQuery({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      console.log("Fetching favorites for user:", userId);
      
      if (!userId) {
        console.log("No user ID provided, returning empty favorites array");
        return [];
      }
      
      const { data, error } = await supabase
        .from("favorites")
        .select("car_id")
        .eq("user_id", userId);
        
      if (error) {
        console.error("Error fetching favorites:", error);
        throw error;
      }
      
      const favoriteIds = data
        .map((fav: { car_id: string | null }) => fav.car_id)
        .filter((id): id is string => !!id);
      
      console.log(`Found ${favoriteIds.length} favorites for user:`, favoriteIds);
      return favoriteIds;
    },
    enabled: !!userId,
  });
}

// Add a car to favorites
export function useAddFavorite(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (carId: string) => {
      console.log(`Adding car ${carId} to favorites for user ${userId}`);
      
      if (!userId) {
        const error = new Error("Cannot add favorite: No user ID provided");
        console.error(error);
        throw error;
      }
      
      const { data, error } = await supabase
        .from("favorites")
        .insert([{ user_id: userId, car_id: carId }]);
        
      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }
      
      console.log("Successfully added to favorites:", data);
      return data;
    },
    onSuccess: (_, carId) => {
      console.log(`Successfully added car ${carId} to favorites, invalidating queries`);
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
    onError: (error, carId) => {
      console.error(`Error adding car ${carId} to favorites:`, error);
    }
  });
}

// Remove a car from favorites
export function useRemoveFavorite(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (carId: string) => {
      console.log(`Removing car ${carId} from favorites for user ${userId}`);
      
      if (!userId) {
        const error = new Error("Cannot remove favorite: No user ID provided");
        console.error(error);
        throw error;
      }
      
      const { data, error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("car_id", carId);
        
      if (error) {
        console.error("Supabase delete error:", error);
        throw error;
      }
      
      console.log("Successfully removed from favorites:", data);
      return data;
    },
    onSuccess: (_, carId) => {
      console.log(`Successfully removed car ${carId} from favorites, invalidating queries`);
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
    onError: (error, carId) => {
      console.error(`Error removing car ${carId} from favorites:`, error);
    }
  });
}