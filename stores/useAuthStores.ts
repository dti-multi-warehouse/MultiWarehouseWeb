import { create } from 'zustand';

interface User {
  id: string | undefined;
  email: string | undefined;
  role: 'ADMIN' | 'WAREHOUSE_ADMIN' | 'USER' | undefined;
  accessToken: string | undefined;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  isAuthenticated: () => {
    const user = get().user;
    return user !== null;
  },

  isAdmin: () => {
    const user = get().user;
    return user?.role === 'ADMIN' || user?.role === 'WAREHOUSE_ADMIN';
  },
}));
