import { useUIStore } from '@/stores/uiStore';
import { useVoteStore } from '@/stores/voteStore';
import { VoteResponse } from '@/types/vote';
import { useRequireAuth } from '@/hooks/api/auth/useRequireAuth';
import React from 'react';
import VoteOptionsMenu from './VoteOptionsMenu'; // 위치에 맞게 경로 조정
import { useAuthStore } from '@/stores/authStore'; // 실제 로그인 정보 가져오기
import { VoteAPI } from '@/api/voteAPI';
import { FOOD_IMAGE_PATHS } from '@/constants/imagePaths';

interface VoteItemProps {
  vote: VoteResponse;
}

const VoteItem: React.FC<VoteItemProps> = ({ vote }) => {
  const { voteId, title, participants, recruit, meetingStartTime, creatorId, image, status } = vote;
  const votePercentage = recruit > 0 ? (participants / recruit) * 100 : 0;
  const isClosed = status === 'closed';

  const userInfo = useAuthStore((s) => s.userInfo);
  const isCreator = creatorId === userInfo?.userId;

  const setSelectedVote = useVoteStore((s) => s.setSelectedVote);
  const deleteVote = useVoteStore((s) => s.deleteVote);
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

  const images = FOOD_IMAGE_PATHS;
  const randomImage = images[Math.floor(Math.random() * images.length)];

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
          className={`w-[260px] h-[260px] object-cover rounded-t-lg ${isClosed ? 'blur-sm' : ''}`}
        />
        <div className="flex items-center justify-between">
          {isClosed && (
            <div className="absolute bg-[#BBBBBB]/60 inset-0 rounded-md flex items-center justify-center">
              <div className=" bg-opacity-60 text-black text-2xl font-bold rounded-md px-2 py-1">
                마감된 투표입니다!
              </div>
            </div>
          )}
        </div>
        <h3 className="text-l font-semibold mt-2 text-primary">{title}</h3>{' '}
      </div>

      <p className="text-white mt-2">{creatorId}</p>
      <div className="flex justify-between text-white mt-2">
        <p>{formatDate(meetingStartTime)}</p>
        <p className="text-secondary">
          {participants}/{recruit}
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
