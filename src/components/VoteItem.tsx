import { useUIStore } from '@/stores/uiStore';
import { useVoteStore } from '@/stores/voteStore';
import { VoteResponse } from '@/types/vote';
import { useRequireAuth } from '@/hooks/api/auth/useRequireAuth';
import React from 'react';

// interface VoteItemProps {
//   title: string;
//   participants: number;
//   recruit: number;
//   id: number;
//   meetingStartTime: string;
//   creatorId: string;
// }

interface VoteItemProps {
  vote: VoteResponse; // VoteResponse 타입 사용
}

const VoteItem: React.FC<VoteItemProps> = ({ vote }) => {
  const { voteId, title, participants, recruit, meetingStartTime, creatorId, image } = vote;
  const votePercentage = recruit > 0 ? (participants / recruit) * 100 : 0;

  const images = [
    '/food1.png',
    '/food2.png',
    '/food3.png',
    '/food4.png',
    '/food5.png',
    '/food6.png',
    '/food7.png',
    '/food8.png',
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  const setSelectedVote = useVoteStore((s) => s.setSelectedVote);
  const openVoteDetail = useUIStore((s) => s.openVoteDetail);
  const { requireAuth } = useRequireAuth();
  const fetchParticipantList = useVoteStore((s) => s.fetchParticipantList);

  const handleClick = () => {
    requireAuth(() => {
      setSelectedVote(vote);
      openVoteDetail();
      fetchParticipantList(vote.voteId);
    });
  };

  return (
    <div
      key={voteId}
      onClick={handleClick}
      className="cursor-pointer bg-item-background p-6 rounded-md shadow-md w-[309px] h-[427px] hover:opacity-90 transition"
    >
      <div className="mb-4">
        <img
          src={randomImage}
          alt={title}
          className="w-[260px] h-[260px] object-cover rounded-t-lg mb-4"
        />

        <h3 className="text-l font-semibold mt-2 text-primary">{title}</h3>

        <p className="text-white mt-2">{creatorId}</p>

        <div className="flex justify-between text-white mt-2">
          <p>{formatDate(meetingStartTime)}</p>
          <p className="text-secondary">
            {participants || 0}/{recruit || 0}
          </p>
        </div>

        <div className="bg-white w-full h-6 rounded-full mt-2">
          <div
            className="bg-secondary h-6 rounded-full"
            style={{ width: `${votePercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VoteItem;
