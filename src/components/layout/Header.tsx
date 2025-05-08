import { useNavigate } from 'react-router-dom';
import image1 from '/public/image 1.png';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-background px-6 py-4 flex justify-between items-center border-b border-gray-700">
      <div className="flex items-center">
        <span className="text-primary text-3xl font-baloo-bhaijaan font-semibold mr-2">Momuk</span>
        <img src={image1} alt="Momuk Logo" className="w-8 h-8" />
      </div>
      <button //TODO : 버튼은 공통 컴포넌트로 분리
        className="text-white bg-primary hover:bg-pink-600 px-4 py-2 rounded transition"
        onClick={() => navigate('/login')}
      >
        Login
      </button>
    </header>
  );
};

export default Header;
