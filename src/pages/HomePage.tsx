import { useNavigate } from 'react-router-dom';
import { useUIStore } from '@/stores/uiStore';
import VoteFormModal from '@/components/vote/VoteFormModal';

const HomePage = () => {
  const navigate = useNavigate();
  const openVoteForm = useUIStore((s) => s.openVoteForm);

  const handleClick = () => {
    navigate('/login');
  };

  const handleOpenModal = () => {
    openVoteForm();
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
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        투표 생성 모달 열기
      </button>
      <VoteFormModal />
      <div className="text-2xl font-semibold mb-5">HomePage</div>
    </div>
  );
};

export default HomePage;
