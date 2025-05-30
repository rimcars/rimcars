import type { Tables } from "./database.types";

// Use the database user type directly for consistency
export type DatabaseUser = Tables<"users">;

// You can add more user-related types here as needed
export type UserRole = "buyer" | "seller" | "admin";

// Optional: Type for user authentication status
export interface UserAuthStatus {
  isAuthenticated: boolean;
  userId?: string;
}
