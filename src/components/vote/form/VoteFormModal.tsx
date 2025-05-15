import { useUIStore } from '@/stores/uiStore';
import { useRef, useState } from 'react';

import { VoteRequest } from '@/types/vote';
import VoteFormContent from './VoteFormContent';
import Modal from '@/components/ui/Modal';
import ConfirmModal from '@/components/ui/confirmModal';
import { useVoteStore } from '@/stores/voteStore';

export default function VoteFormModal() {
  const { isVoteFormOpen, closeVoteForm } = useUIStore();
  const createVote = useVoteStore((s) => s.createVote);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const fetchVotes = useVoteStore((s) => s.fetchVotes);
  const resetRef = useRef<() => void>(() => {}); // 폼 초기화용 ref

  const handleFormSubmit = async (data: VoteRequest) => {
    await createVote(data); // 1. 투표 생성
    await fetchVotes(); // 2. 투표 목록 fetch
    closeVoteForm(); // 3. 폼 모달 닫기
    setIsConfirmOpen(true); // 4. 확인 모달 열기
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
        title="투표가 만들어졌어요!"
        description="같이 갈 팀원을 만나보아요 😊"
        onClose={handleConfirmClose}
      />
    </>
  );
}
