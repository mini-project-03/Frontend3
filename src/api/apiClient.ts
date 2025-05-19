import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { AuthAPI } from './authAPI';

const apiURL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.url === '/users/refresh-token') {
      console.log('[요청 인터셉터] refresh-token 요청이므로 Authorization 생략');
      return config;
    }

    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`[요청 인터셉터] Authorization 헤더 추가: Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 ||
      error.response?.status === 500 && !originalRequest._retry) {
      console.warn('[응답 인터셉터] 401 에러 발생. 토큰 재발급 시도...');
      originalRequest._retry = true;

      try {
        // refreshToken으로 새 accessToken 요청
        const newAccessToken = await AuthAPI.refreshAccessToken();
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 새 토큰으로 Authorization 헤더 갱신
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log('[응답 인터셉터] 토큰 재발급 성공. 원 요청 재시도.');

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('[응답 인터셉터] 토큰 재발급 실패', refreshError);

        // 상태 초기화 및 로그인 페이지 이동 등 추가 처리 가능
        useAuthStore.getState().clearAccessToken();
        useAuthStore.getState().clearUserInfo();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
