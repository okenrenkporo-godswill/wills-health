import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  username: string | null;
  token: string | null;
  setAuth: (username: string, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: null,
      token: null,
      setAuth: (username, token) => set({ username, token }),
      clearAuth: () => set({ username: null, token: null }),
    }),
    {
      name: "WILL HEALTH", // key in localStorage
    }
  )
);
