import { useNavigate } from 'react-router-dom';
import image1 from '/public/image 1.png';
import { useAuthStore } from '@/stores/authStore.ts';
import LogoutButton from '@/components/LogoutButton.tsx';

const Header = () => {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <header className="container mx-auto w-full bg-background px-6 py-4 flex justify-between items-center border-b border-gray-700">
      <div className="flex items-center">
        <span className="text-primary text-3xl font-baloo-bhaijaan font-semibold mr-2">Momuk</span>
        <img src={image1} alt="Momuk Logo" className="w-8 h-8" />
      </div>
      <div className="flex gap-2">
        {!accessToken ? (
          <button
            className="text-white bg-primary hover:bg-pink-600 px-4 py-2 rounded transition"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        ) : (
          <LogoutButton />
        )}
      </div>
    </header>
  );
};

export default Header;
