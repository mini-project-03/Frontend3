import { useVoteStore } from '@/stores/voteStore';
import { useUIStore } from '@/stores/uiStore';
import { formatTime } from '@/utils/dateFormatter';
import ParticipationChart from './ParticipationChart';
import Modal from '@/components/ui/Modal';
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';

export default function VoteDetailModal() {
  const {
    selectedVote,
    participateInVote,
    clearSelectedVote,
    fetchParticipantList,
    participantList,
  } = useVoteStore();

  const closeVoteDetail = useUIStore((s) => s.closeVoteDetail);

  const currentUserId = useAuthStore.getState().userInfo?.userId;
  const isLoading = !participantList;
  const isParticipated = participantList?.some((p) => String(p.id) === String(currentUserId));

  useEffect(() => {
    if (selectedVote) {
      fetchParticipantList(selectedVote.voteId);
    }
  }, [selectedVote]);

  if (!selectedVote) return null;

  const participationRate = Math.round((selectedVote.participants / selectedVote.recruit) * 100);

  const handleParticipate = async () => {
    if (!selectedVote) return;
    await participateInVote(selectedVote.voteId);
    await fetchParticipantList(selectedVote.voteId);
  };

  const handleClose = () => {
    clearSelectedVote();
    closeVoteDetail();
  };

  return (
    <Modal isOpen={!!selectedVote} onClose={handleClose}>
      <div className="relative p-2 w-[px] text-white rounded-xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        ></button>
        <div className="mb-1">
          <div className="text-2xl font-bold text-white">{selectedVote.title}</div>
          <div className="text-sm text-gray-400 text-right">{selectedVote.creatorId}</div>
        </div>
        <hr className="border-t border-gray-600 mt-2" />
        <p className="mt-4 mb-4 text-gray-200 whitespace-pre-line">{selectedVote.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>👥 참여자</span>
              <span className="text-gray-400">
                {selectedVote.participants} / {selectedVote.recruit}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>🕒 약속 시간</span>
              <span className="text-gray-400">
                {formatTime(selectedVote.meetingStartTime)} ~{' '}
                {formatTime(selectedVote.meetingEndTime)}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-sm text-white font-semibold">참여율</div>
            <ParticipationChart rate={participationRate} />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-white flex flex-col items-start gap-1 relative group w-fit">
            <img src="/participants.png" alt="Participants" className="w-11 h-8" />

            <p className="cursor-default">참여자</p>

            <div className="absolute left-full top-0 ml-3 hidden group-hover:block z-10 bg-white text-gray-800 text-sm rounded-md p-2 shadow-lg whitespace-nowrap border border-gray-200">
              {participantList && participantList.length > 0 ? (
                participantList.map((p, i) => <div key={i}>{p.name}</div>)
              ) : (
                <div>참여자 없음</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto flex justify-end">
          <button
            onClick={handleParticipate}
            disabled={isLoading || isParticipated}
            className={`w-[140px] py-2 px-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition ${
              isLoading
                ? 'bg-gray-300 text-white cursor-wait'
                : isParticipated
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-hover text-white'
            }`}
          >
            {isLoading ? '🔄 확인 중...' : isParticipated ? '✅ 참여 완료' : '👍 참여'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
