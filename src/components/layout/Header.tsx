import { useNavigate, useLocation } from 'react-router-dom';
import image1 from '/public/image 1.png';
import { useAuthStore } from '@/stores/authStore.ts';
import LogoutButton from '@/components/LogoutButton.tsx';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useAuthStore((state) => state.accessToken);
  const userInfo = useAuthStore((state) => state.userInfo);

  const isLoginPage = location.pathname === '/login';

  return (
    <header className="w-full bg-[#1E2030]/80 backdrop-blur-md border-b border-[#2f3244] shadow-md">
      <div className="max-w-[95rem] mx-auto flex justify-between items-center px-[2.5rem] pr-[0.5rem] py-3">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-primary text-2xl font-bold font-baloo-bhaijaan select-none">
            Momuk
          </span>
          <img
            src={image1}
            alt="Momuk Logo"
            className="w-8 h-8 object-contain"
            style={{ marginBottom: '2px' }} // 이미지 위치 살짝 위로 조정 (필요시)
          />
        </div>

        <div className="flex items-center gap-4">
          {accessToken && userInfo?.userId && (
            <span className="text-sm text-white/70 whitespace-nowrap">
              반갑습니다 <span className="font-semibold text-white">{userInfo.userId}</span>님!
            </span>
          )}

          {!accessToken && !isLoginPage && (
            <button
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md transition"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}

          {accessToken && <LogoutButton />}
        </div>
      </div>
    </header>
  );
};

export default Header;
