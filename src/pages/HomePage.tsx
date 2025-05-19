// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useVoteStore } from '@/stores/voteStore';
import VoteItem from '@/components/vote/item/VoteItem';
// import { useUIStore } from '@/stores/uiStore';
// import { useRequireAuth } from '@/hooks/api/auth/useRequireAuth';
// import VoteFormModal from '@/components/vote/form/VoteFormModal';
import VoteDetailModal from '@/components/vote/detail/VoteDetailModal';
import Roulette from '@/components/ui/Roulette/Roulette';

const HomePage = () => {
  const votes = useVoteStore((s) => s.votes);
  const fetchVotes = useVoteStore((s) => s.fetchVotes);
  const selectedVote = useVoteStore((s) => s.selectedVote);

  useEffect(() => {
    fetchVotes();
  }, []);

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const visibleVotes = votes.filter((vote) => {
    const meetingTime = new Date(vote.meetingStartTime);
    return meetingTime >= todayStart;
  });

  return (
    <div className="container overflow-hidden mx-auto px-4 py-4 flex gap-6">
      <div className="flex-1 grid gap-4 overflow-y-auto h-[770px] grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
        {visibleVotes
          .slice()
          .sort((a, b) => {
            if (a.status !== b.status) return a.status === 'closed' ? 1 : -1;
            return new Date(a.meetingStartTime).getTime() - new Date(b.meetingStartTime).getTime();
          })
          .map((vote) => (
            <div key={vote.voteId} className="bg-gray-800 p-4 rounded-lg">
              <VoteItem vote={vote} />
            </div>
          ))}
      </div>
      {selectedVote && <VoteDetailModal />}

      <div className="w-1/4 bg-item-background h-[770px] rounded-lg p-4 flex flex-col justify-between items-center">
        {/* 룰렛 들어갈 자리 */}
        <Roulette />
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
