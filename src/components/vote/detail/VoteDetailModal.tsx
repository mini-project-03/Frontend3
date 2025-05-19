import { useVoteStore } from '@/stores/voteStore';
import { useUIStore } from '@/stores/uiStore';
import { formatTime } from '@/utils/dateFormatter';
import ParticipationChart from './ParticipationChart';
import Modal from '@/components/ui/Modal';
import VoteOptionsMenu from '../item/VoteOptionsMenu';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import ConfirmModal from '@/components/ui/confirmModal';
import { toast } from 'sonner';

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
  const isClosed = selectedVote.status === 'closed';

  const isLoading = !participantList;
  const isCreator = userInfo?.userId === selectedVote.creatorId;
  const creator = participantList?.find((p) => p.id === selectedVote.creatorId);

  const isButtonDisabled =
    isLoading || isClosed || (!localIsParticipated && isFull) || (localIsParticipated && isCreator);

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

    if (isClosed) {
      toast.warning('마감된 투표는 참여가 불가능합니다.');
      return;
    }

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

    if (isClosed) {
      toast.warning('마감된 투표는 참여 취소가 불가능합니다.');
      return;
    }

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
    if (!isCreator || isClosed) {
      alert('작성자만 삭제할 수 있습니다.');
      return;
    }
    try {
      await deleteVote(selectedVote.voteId);
      toast.success('투표가 성공적으로 삭제되었습니다.');
      await fetchVotes();
      handleClose();
    } catch (err) {
      console.error('투표 삭제 실패:', err);
      alert('투표 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleForceClose = async () => {
    if (!isCreator || isClosed) {
      alert('작성자만 마감할 수 있습니다.');
      return;
    }
    await closeVote(selectedVote.voteId);
    toast.success('투표가 마감되었습니다.');
    handleClose();
  };

  return (
    <Modal isOpen={!!selectedVote} onClose={handleClose}>
      <div className="relative p-4 w-full text-white rounded-xl">
        <div className="absolute right-4 top-4 flex gap-2 items-center">
          {!isClosed && isCreator && (
            <VoteOptionsMenu
              isCreator={isCreator}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onClose={handleForceClose}
            />
          )}
        </div>

        <div className="mb-1">
          <div className="text-2xl font-bold text-white">{selectedVote.title}</div>
          <div className="text-sm text-gray-400 text-right">
            {creator ? `${selectedVote.creatorId} ${creator.name}` : selectedVote.creatorId}
          </div>
        </div>
        <hr className="border-t border-gray-600 mt-2" />
        <p className="mt-4 mb-4 text-gray-200 whitespace-pre-line break-words">
          {selectedVote.description}
        </p>

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
            onClick={(e) => {
              e.preventDefault();
              if (isClosed) {
                toast.warning('마감된 투표는 참여가 불가능합니다.');
                return;
              }
              if (localIsParticipated) {
                handleCancelParticipation();
              } else {
                handleParticipate();
              }
            }}
            className={`w-[140px] py-2 px-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition ${
              isLoading ||
              isClosed ||
              (!localIsParticipated && isFull) ||
              (localIsParticipated && isCreator)
                ? 'bg-gray-500 text-white cursor-not-allowed'
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
