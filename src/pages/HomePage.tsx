import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FoodAPI } from '@/api/foodAPI';
import { mockVotes } from '@/data/mockVotes';
import FoodItem from '@/components/FoodItem';
import { useUIStore } from '@/stores/uiStore';
import VoteFormModal from '@/components/vote/VoteFormModal';
import VoteDetailModal from '@/components/vote/VoteDetailModal';

const HomePage = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState<any[]>([]);

  const openVoteForm = useUIStore((s) => s.openVoteForm);

  // 음식 데이터 가져오기
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        // const mockVotes = await FoodAPI.getFoods();
        setFoods(mockVotes);
      } catch (error) {
        console.error('음식 데이터를 가져오는 데 실패:', error);
        setFoods(mockVotes);
      }
    };

    fetchFoods();
  }, []);

  // 투표 생성 후 데이터를 화면에 반영
  const handleCreateVote = (newVote: any) => {
    setFoods((prevFoods) => [newVote, ...prevFoods]); // 새로운 투표 추가
  };

  const handleOpenModal = () => {
    openVoteForm();
  };

  return (
    <div className="container overflow-hidden mx-auto px-4 py-4 flex gap-6">
      <div className="flex-1 grid gap-4 overflow-y-auto h-[770px] grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
        {foods.map((vote) => (
          <div key={vote.voteId} className="bg-gray-800 p-4 rounded-lg">
            <FoodItem vote={vote} />
          </div>
        ))}
      </div>
      <VoteDetailModal />

      {/* 랭킹은 일단 비워두겠숩니ㅏ */}
      <div className="w-1/4 bg-secondary h-[770px] rounded-lg p-4 flex flex-col justify-around items-center">
        <h2 className="text-black mb-4">랭킹...아직 준비중...좀만 기달 </h2>
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mt-5"
        >
          투표 생성 모달 열기
        </button>

        <VoteFormModal onCreateVote={handleCreateVote} />
      </div>

      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
