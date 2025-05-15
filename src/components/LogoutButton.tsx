import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '@/api/authAPI';
import { useAuthStore } from '@/stores/authStore.ts';

const LogoutButton = () => {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);
  const clearUserInfo = useAuthStore((state) => state.clearUserInfo);

  const handleLogout = async () => {
    try {
      if (accessToken) {
        await AuthAPI.logout(accessToken);
      }
    } catch (error) {
      // 401은 무시해도 괜찮음
      console.warn('Logout request failed, proceeding with client-side cleanup.', error);
    } finally {
      clearAccessToken();
      clearUserInfo();
      navigate('/');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-pink-600 hover:bg-primary text-white px-4 py-2 rounded  transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
