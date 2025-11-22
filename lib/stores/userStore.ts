/**
 * User Store
 * Global state management for user data
 */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  apiToken?: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,
        error: null,
        setUser: (user) => set({ user, error: null }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        clearUser: () => set({ user: null, error: null }),
      }),
      {
        name: "user-storage",
      }
    )
  )
);
