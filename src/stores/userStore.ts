import { create } from 'zustand';

interface User {
  id: string;
  name: string;
}

interface UserState {
  user: User | null;
  login: (id: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  login: (id) => set({ user: { id, name: id } }),
  logout: () => set({ user: null }),
}));
