import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  userId: string;
  userName: string;
  emailId: string;
  emailDomain: string;
  joinDate: string;
}

interface AuthState {
  accessToken: string | null;
  userInfo: UserInfo | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  setUserInfo: (user: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userInfo: null,
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
      setUserInfo: (user) => set({ userInfo: user }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
