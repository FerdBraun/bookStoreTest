import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'user' | 'admin';

export interface User {
  login: string;
  role: UserRole;
}

/**
 * Auth state is based on server session (cookie `us`)
 * We do NOT store token on client side.
 */

interface AuthState {
  user: User | null;

  setUser: (user: User | null) => void;
  logout: () => void;

  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),

      logout: () => set({ user: null }),

      isAuthenticated: () => !!get().user,

      isAdmin: () => get().user?.role === 'admin',
    }),
    {
      name: 'auth-storage',

      /**
       * Optional but important:
       * We only persist user info for UI convenience.
       * Server session (cookie) is still the source of truth.
       */
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);