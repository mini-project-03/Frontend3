import { useVoteStore } from '@/stores/voteStore';
import Modal from '../ui/Modal';
import { useUIStore } from '@/stores/uiStore';
import { formatTime } from '@/utils/dateFormatter';
import ParticipationChart from './ParticipationChart';

export default function VoteDetailModal() {
  const { selectedVote, participateInVote, clearSelectedVote } = useVoteStore();
  const closeVoteDetail = useUIStore((s) => s.closeVoteDetail);

  if (!selectedVote) return null;

  const participationRate = Math.round((selectedVote.participants / selectedVote.recruit) * 100);

  const currentUser = {
    id: 'user123',
    name: '홍길동',
  };

  const handleParticipate = () => {
    if (!selectedVote) return;
    participateInVote(selectedVote.voteId, currentUser); // currentUser는 로그인 유저
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
          <div className="text-sm text-white flex flex-col items-start gap-1">
            <img src="/participants.png" alt="Participants" className="w-11 h-8" />
            <p>참여자</p>
          </div>
        </div>

        <div className="mt-auto flex justify-end">
          <button
            onClick={handleParticipate}
            className="bg-primary hover:bg-primary-hover transition text-white py-2 px-7 rounded-lg font-semibold text-base flex items-center gap-2"
          >
            👍 참여
          </button>
        </div>
      </div>
    </Modal>
  );
}
