import { useUIStore } from '@/stores/uiStore';
import { useVoteStore } from '@/stores/voteStore';
import { VoteResponse } from '@/types/vote';
import { useRequireAuth } from '@/hooks/api/auth/useRequireAuth';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { VoteAPI } from '@/api/voteAPI';

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
  const fetchParticipantList = useVoteStore((s) => s.fetchParticipantList);
  const openVoteDetail = useUIStore((s) => s.openVoteDetail);
  const { requireAuth } = useRequireAuth();

  const [isParticipated, setIsParticipated] = useState(false);

  useEffect(() => {
    const checkParticipation = async () => {
      if (isClosed && userInfo) {
        try {
          const list = await VoteAPI.getParticipantList(voteId);
          const found = list.some((p) => String(p.id) === String(userInfo.userId));
          setIsParticipated(found);
        } catch (err) {
          console.error('참여 여부 확인 실패:', err);
        }
      }
    };
    checkParticipation();
  }, [isClosed, userInfo, voteId]);

  const handleOpenResult = () => {
    setSelectedVote(vote);
    openVoteDetail(vote);
    fetchParticipantList(vote.voteId);
  };

  const handleClick = () => {
    if (isClosed) return;
    requireAuth(() => {
      handleOpenResult();
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

  return (
    <div
      key={voteId}
      onClick={handleClick}
      className={`relative bg-item-background p-6 rounded-md shadow-md w-[309px] h-[427px] transition ${
        isClosed ? 'opacity-50' : 'hover:opacity-90 cursor-pointer'
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
            <div className="absolute bg-[#BBBBBB]/70 inset-0 rounded-md flex flex-col items-center justify-center">
              <div className=" bg-opacity-60 text-black text-2xl font-bold rounded-md px-2 py-1">
                마감된 투표입니다!
              </div>

              {isParticipated && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenResult();
                  }}
                  className="px-4 py-1 bg-white text-black rounded hover:bg-secondary hover:text-black transition"
                >
                  결과 확인
                </button>
              )}
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
