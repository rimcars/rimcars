import { useState, useEffect } from "react";
import { getUser } from "@/app/actions";
import { Seller } from "@/types/seller";

// Custom event for user data updates
export const USER_UPDATED_EVENT = "user_data_updated";

/**
 * Custom hook to manage user data with real-time updates
 * This hook will listen for user data updates and refresh the data accordingly
 */
export function useUser() {
  const [user, setUser] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userData = await getUser();
      if (userData.role === "seller") {
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchUserData();
  }, []);

  // Listen for user data update events
  useEffect(() => {
    // Event handler for user data updates
    const handleUserUpdate = () => {
      fetchUserData();
    };

    // Add event listener
    window.addEventListener(USER_UPDATED_EVENT, handleUserUpdate);

    // Cleanup
    return () => {
      window.removeEventListener(USER_UPDATED_EVENT, handleUserUpdate);
    };
  }, []);

  // Function to trigger user data update event
  const triggerUserUpdate = () => {
    window.dispatchEvent(new Event(USER_UPDATED_EVENT));
  };

  return { user, loading, triggerUserUpdate };
}
