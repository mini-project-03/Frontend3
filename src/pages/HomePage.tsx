import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { VoteAPI } from '@/api/voteAPI';
// import { mockVotes } from '@/data/mockVotes';
import VoteItem from '@/components/VoteItem';
import { useUIStore } from '@/stores/uiStore';
import { useRequireAuth } from '@/hooks/api/auth/useRequireAuth';
import VoteFormModal from '@/components/vote/form/VoteFormModal';
import VoteDetailModal from '@/components/vote/detail/VoteDetailModal';
import { VoteResponse } from '@/types/vote'; // VoteResponse 타입 사용

const HomePage = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState<VoteResponse[]>([]);
  const { requireAuth } = useRequireAuth();
  const openVoteForm = useUIStore((s) => s.openVoteForm);

  // 음식 데이터 가져오기
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await VoteAPI.getVotes();
        setVotes(response);
      } catch (error) {
        console.error('음식 데이터를 가져오는 데 실패:', error);
      }
    };

    fetchVotes();
  }, []);

  // 투표 생성 후 데이터를 화면에 반영
  const handleCreateVote = (newVote: any) => {
    setVotes((prevVotes) => [newVote, ...prevVotes]); // 새로운 투표 추가
  };

  const handleOpenModal = () => {
    requireAuth(openVoteForm);
  };

  return (
    <div className="container overflow-hidden mx-auto px-4 py-4 flex gap-6">
      <div className="flex-1 grid gap-4 overflow-y-auto h-[770px] grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
        {votes.map((vote) => (
          <div key={vote.voteId} className="bg-gray-800 p-4 rounded-lg">
            <VoteItem vote={vote} />
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
