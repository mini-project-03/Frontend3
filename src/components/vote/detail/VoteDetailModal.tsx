import { useVoteStore } from '@/stores/voteStore';
import { useUIStore } from '@/stores/uiStore';
import { formatTime } from '@/utils/dateFormatter';
import ParticipationChart from './ParticipationChart';
import Modal from '@/components/ui/Modal';
import VoteOptionsMenu from '../item/VoteOptionsMenu';
import { useAuthStore } from '@/stores/authStore';

export default function VoteDetailModal() {
  const { selectedVote, participateInVote, clearSelectedVote, deleteVote, closeVote } =
    useVoteStore();

  const closeVoteDetail = useUIStore((s) => s.closeVoteDetail);
  const openVoteForm = useUIStore((s) => s.openVoteForm);
  const { fetchVotes } = useVoteStore();

  const userInfo = useAuthStore((s) => s.userInfo);

  if (!selectedVote) return null;

  const participationRate = Math.round((selectedVote.participants / selectedVote.recruit) * 100);

  const handleParticipate = () => {
    if (!selectedVote || !userInfo) return;

    const user = {
      id: userInfo.userId,
      name: userInfo.userName,
    };

    participateInVote(selectedVote.voteId, user);
  };

  const isCreator = userInfo?.userId === selectedVote.creatorId;

  const handleClose = () => {
    clearSelectedVote();
    closeVoteDetail();
    fetchVotes();
  };
  const handleEdit = () => {
    if (!isCreator) {
      alert('작성자만 수정할 수 있습니다.');
      return;
    }
    openVoteForm(selectedVote);
  };

  const handleDelete = async () => {
    if (!isCreator) {
      alert('작성자만 삭제할 수 있습니다.');
      return;
    }
    await deleteVote(selectedVote.voteId);
    alert('투표가 성공적으로 삭제되었습니다.');

    await fetchVotes();
    handleClose();
  };

  const handleForceClose = async () => {
    if (!isCreator) {
      alert('작성자만 마감할 수 있습니다.');
      return;
    }
    await closeVote(selectedVote.voteId);
    alert('투표가 마감되었습니다.');
    handleClose();
  };

  return (
    <Modal isOpen={!!selectedVote} onClose={handleClose}>
      <div className="relative p-4 w-full text-white rounded-xl">
        <div className="absolute right-4 top-4 flex gap-2 items-center">
          <VoteOptionsMenu
            isCreator={isCreator}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClose={handleForceClose}
          />
        </div>

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
