import { create } from 'zustand';

interface AuthState {
  user: {
    id: string;
    email: string;
    role: 'admin' | 'warehouse_admin' | 'user';
    accessToken: string;
  } | null;
  setUser: (user: { id: string; email: string; role: 'admin' | 'warehouse_admin' | 'user'; accessToken: string }) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
