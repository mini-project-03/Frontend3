import { useUIStore } from '@/stores/uiStore';
import { useVoteStore } from '@/stores/voteStore';
import { VoteResponse } from '@/types/vote';
import { useRequireAuth } from '@/hooks/api/auth/useRequireAuth';
import React from 'react';
import { useAuthStore } from '@/stores/authStore';

interface VoteItemProps {
  vote: VoteResponse;
}

const VoteItem: React.FC<VoteItemProps> = ({ vote }) => {
  const { voteId, title, participants, recruit, meetingStartTime, creatorId, status } = vote;
  const votePercentage = recruit > 0 ? (participants / recruit) * 100 : 0;
  const isClosed = status === 'closed';

  const userInfo = useAuthStore((s) => s.userInfo);
  const isCreator = creatorId === userInfo?.userId;

  const setSelectedVote = useVoteStore((s) => s.setSelectedVote);
  const openVoteDetail = useUIStore((s) => s.openVoteDetail);
  const { requireAuth } = useRequireAuth();

  const handleClick = () => {
    if (isClosed) return;
    requireAuth(() => {
      setSelectedVote(vote);
      openVoteDetail(vote);
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  const images = [
    '/food1.png', '/food2.png', '/food3.png', '/food4.png',
    '/food5.png', '/food6.png', '/food7.png', '/food8.png',
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div
      onClick={handleClick}
      className={`relative group cursor-pointer bg-[#1F1F1F] p-4 rounded-2xl shadow-lg w-full max-w-[300px] transition-transform duration-300 hover:scale-[1.03] ${
        isClosed ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      {/* 이미지 영역 */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={randomImage}
          alt={title}
          className={`w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105 ${isClosed ? 'blur-sm' : ''}`}
        />
        {isClosed && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">마감된 투표입니다</span>
          </div>
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-base font-semibold text-white truncate">{title}</h3>
        <p className="text-sm text-gray-400">{creatorId}</p>

        <div className="flex justify-between items-center text-sm text-white mt-1">
          <span>{formatDate(meetingStartTime)}</span>
          <span className="text-indigo-400 font-semibold">{participants}/{recruit}</span>
        </div>

        {/* 진행률 바 */}
        <div className="w-full bg-gray-700 h-2 rounded-full mt-2 mb-0">
          <div
            className="bg-indigo-400 h-2 rounded-full transition-all"
            style={{ width: `${votePercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VoteItem;
