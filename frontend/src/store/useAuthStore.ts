import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logout as logoutApi } from '../api/auth';

export type UserRole = 'user' | 'admin';

export interface User {
  login: string;
  role: UserRole;
  created_at: string;
}

interface AuthState {
  user: User | null;

  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),

      logout: () => {
        logoutApi().catch(() => {});
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);