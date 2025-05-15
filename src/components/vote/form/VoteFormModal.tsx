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
    await createVote(data); // 1. 투표 생성
    await fetchVotes(); // 2. 투표 목록 fetch
    closeVoteForm(); // 3. 폼 모달 닫기
    setIsConfirmOpen(true); // 4. 확인 모달 열기
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
    closeVoteForm(); // 2. 폼 모달 닫기
    setIsConfirmOpen(true); // 3. 확인 모달 열기
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false); // 5. 확인 모달 닫기
    resetRef.current(); // 6. 폼 reset
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
