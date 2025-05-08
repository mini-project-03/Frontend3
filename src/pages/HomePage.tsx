import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-5 py-12">
      <div className="bg-primary text-2xl font-semibold mb-5">HomePage</div>
      <div className="bg-secondary font-roboto"> test1</div>
      <div className="bg-error font-oswald"> test2</div>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        로그인
      </button>
      <div className="text-2xl font-semibold mb-5">HomePage</div>
    </div>
  );
};

export default HomePage;
