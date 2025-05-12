import { useMutation } from '@tanstack/react-query';
import { AuthAPI } from '@/api/authAPI';

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (formData: { userId: string; userPwd: string }) => AuthAPI.login(formData),
  });
