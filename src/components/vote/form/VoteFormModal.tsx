import { useUIStore } from '@/stores/uiStore';
import { useRef, useState } from 'react';
import { VoteRequest } from '@/types/vote';
import VoteFormContent from './VoteFormContent';
import Modal from '@/components/ui/Modal';
import ConfirmModal from '@/components/ui/confirmModal';
import { useVoteStore } from '@/stores/voteStore';
import { useNavigate } from 'react-router-dom';

export default function VoteFormModal() {
  const navigate = useNavigate();
  const { isVoteFormOpen, closeVoteForm, voteFormMode, voteToEdit } = useUIStore();
  const createVote = useVoteStore((s) => s.createVote);
  const updateVote = useVoteStore((s) => s.updateVote);
  const fetchVotes = useVoteStore((s) => s.fetchVotes);
  const setSelectedVote = useVoteStore((s) => s.setSelectedVote);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const resetRef = useRef<() => void>(() => {}); // 폼 초기화용 ref

  const handleFormSubmit = async (data: VoteRequest) => {
    await fetchVotes();
    closeVoteForm();
    setIsConfirmOpen(true);
    if (voteFormMode === 'edit' && voteToEdit) {
      await updateVote(voteToEdit.voteId, data);
      setSelectedVote({
        ...voteToEdit,
        ...data,
      });

      alert('투표가 수정되었습니다.');
      closeVoteForm();
      navigate('/');
      return;
    } else {
      await createVote(data);
    }
    await fetchVotes();
    closeVoteForm();
    setIsConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
    resetRef.current();
  };

  return (
    <>
      <Modal isOpen={isVoteFormOpen} onClose={closeVoteForm}>
        <VoteFormContent
          onSubmit={handleFormSubmit}
          onReset={(resetFn) => {
            resetRef.current = resetFn;
          }}
        />
      </Modal>
      <ConfirmModal
        isOpen={isConfirmOpen}
        title={voteFormMode === 'edit' ? '투표가 수정되었어요!' : '투표가 만들어졌어요!'}
        description="같이 갈 팀원을 만나보아요 😊"
        onClose={handleConfirmClose}
      />
    </>
  );
}
