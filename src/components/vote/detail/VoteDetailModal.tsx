import { useVoteStore } from '@/stores/voteStore';
import { useUIStore } from '@/stores/uiStore';
import { formatTime } from '@/utils/dateFormatter';
import ParticipationChart from './ParticipationChart';
import Modal from '@/components/ui/Modal';
import VoteOptionsMenu from '../item/VoteOptionsMenu';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import ConfirmModal from '@/components/ui/confirmModal';

export default function VoteDetailModal() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [localIsParticipated, setLocalIsParticipated] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  const {
    selectedVote,
    fetchVotes,
    deleteVote,
    closeVote,
    participateInVote,
    clearSelectedVote,
    fetchParticipantList,
    participantList,
    cancelParticipationInVote,
  } = useVoteStore();

  const closeVoteDetail = useUIStore((s) => s.closeVoteDetail);
  const openVoteForm = useUIStore((s) => s.openVoteForm);
  const userInfo = useAuthStore((s) => s.userInfo);
  const currentUserId = userInfo?.userId ?? null;

  if (!selectedVote) return null;
  const isFull = selectedVote!.participants >= selectedVote!.recruit;

  const isLoading = !participantList;
  const isButtonDisabled = isLoading || (!localIsParticipated && isFull);
  const isCreator = userInfo?.userId === selectedVote.creatorId;
  const creator = participantList?.find((p) => p.id === selectedVote.creatorId);

  useEffect(() => {
    if (selectedVote) {
      fetchParticipantList(selectedVote.voteId);
    }
  }, [selectedVote]);

  useEffect(() => {
    if (participantList && currentUserId) {
      const isParticipating = participantList.some((p) => String(p.id) === String(currentUserId));
      setLocalIsParticipated(isParticipating);
    }
  }, [participantList, currentUserId]);

  const participationRate = Math.round((selectedVote.participants / selectedVote.recruit) * 100);

  const handleParticipate = async () => {
    if (!selectedVote || !userInfo) return;

    try {
      await participateInVote(selectedVote.voteId);
      setIsConfirmOpen(true);
      await fetchParticipantList(selectedVote.voteId);
    } catch (error) {
      console.error('참여 실패:', error);
      alert('참여에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancelParticipation = async () => {
    if (!selectedVote) return;

    try {
      await cancelParticipationInVote(selectedVote.voteId);
      setIsCancelConfirmOpen(true);
      await fetchParticipantList(selectedVote.voteId);
    } catch (error) {
      console.error('참여 취소 실패:', error);
      alert('참여 취소에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
          <div className="text-sm text-gray-400 text-right">
            {creator ? `${selectedVote.creatorId} ${creator.name}` : selectedVote.creatorId}
          </div>
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
            onClick={localIsParticipated ? handleCancelParticipation : handleParticipate}
            disabled={isButtonDisabled}
            className={`w-[140px] py-2 px-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition ${
              isLoading
                ? 'bg-gray-300 text-white cursor-wait'
                : 'bg-primary hover:bg-primary-hover text-white'
            }`}
          >
            {isLoading
              ? '🔄 확인 중...'
              : localIsParticipated
                ? '❌ 참여 취소'
                : isFull
                  ? '🚫 모집 완료'
                  : '👍 참여'}
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="참여가 완료되었어요!"
        description="약속된 시간에 만나요 😊"
        onClose={() => setIsConfirmOpen(false)}
      />
      <ConfirmModal
        isOpen={isCancelConfirmOpen}
        title="아쉬워요 😢"
        description="다음에 꼭 함께해요!"
        onClose={() => setIsCancelConfirmOpen(false)}
      />
    </Modal>
  );
}
