import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  username: string | null;
  token: string | null;
  photo: string | null;
  setAuth: (username: string, token: string) => void;
  setPhoto: (url: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: null,
      token: null,
      photo: null,
      setAuth: (username, token) => set({ username, token }),
      setPhoto: (url) => set({ photo: url }),
      clearAuth: () =>
        set({
          username: null,
          token: null,
          photo: null,
        }),
    }),
    {
      name: "WILL HEALTH", // Key in localStorage
    }
  )
);
