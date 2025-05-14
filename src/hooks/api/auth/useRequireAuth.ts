// src/hooks/useRequireAuth.ts
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export const useRequireAuth = () => {
  const accessToken = useAuthStore((s) => s.accessToken);

  const requireAuth = (onSuccess: () => void) => {
    if (!accessToken) {
      toast.error('로그인이 필요합니다. 먼저 로그인 해주세요.');
      return;
    }
    onSuccess();
  };

  const isLoggedIn = !!accessToken;

  return { isLoggedIn, requireAuth };
};
