import { useUIStore } from '@/stores/uiStore';
import { useVoteStore } from '@/stores/voteStore';
import { VoteResponse } from '@/types/vote';
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
  const { voteId, title, participants, recruit, meetingStartTime, creatorId, image, status } = vote;
  const votePercentage = recruit > 0 ? (participants / recruit) * 100 : 0;
  const isClosed = status === 'closed';

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

  const handleClick = () => {
    if (isClosed) return;
    setSelectedVote(vote);
    openVoteDetail(vote);
  };

  return (
    <div
      key={voteId}
      onClick={handleClick}
      className={`relative cursor-pointer bg-item-background p-6 rounded-md shadow-md w-[309px] h-[427px] hover:opacity-90 transition ${
        isClosed ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      <div className="mb-4">
        <img
          src={randomImage}
          alt={title}
          className={
            "w-[260px] h-[260px] object-cover rounded-t-lg mb-4 ${isClosed ? 'blur-sm' : ''}"
          }
        />

        {isClosed && (
          <div className="absolute bg-[#BBBBBB]/70 inset-0 rounded-md flex items-center justify-center">
            <div className=" bg-opacity-60 text-black text-2xl font-bold rounded-md px-2 py-1">
              마감된 투표입니다!
            </div>
          </div>
        )}
      </div>

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
  );
};

export default VoteItem;
