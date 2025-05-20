import React, { useEffect } from 'react';
import { useVoteStore } from '@/stores/voteStore';
import { useAuthStore } from '@/stores/authStore';
import { VoteResponse } from '@/types/vote';
import VoteItem from '@/components/vote/item/VoteItem';
import VoteDetailModal from '@/components/vote/detail/VoteDetailModal';

const MyPage: React.FC = () => {
  const { votes, fetchVotes, selectedVote } = useVoteStore();
  const { userInfo } = useAuthStore();

  useEffect(() => {
    fetchVotes();
  }, [fetchVotes]);

  if (!userInfo) {
    return <p className="text-center mt-10 text-gray-400">로그인 시 내 투표글을 볼 수 있어요!</p>;
  }

  const myCreatedVotes: VoteResponse[] = votes.filter((vote) => vote.creatorId === userInfo.userId);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">내가 만든 투표글</h1>
      {myCreatedVotes.length === 0 ? (
        <p className="text-center text-gray-400">아직 만든 투표글이 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCreatedVotes.map((vote) => (
            <li key={vote.voteId} className="bg-gray-800 p-4 rounded-lg">
              <VoteItem vote={vote} />
            </li>
          ))}
        </ul>
      )}

      {selectedVote && <VoteDetailModal />}
    </div>
  );
};

export default MyPage;
