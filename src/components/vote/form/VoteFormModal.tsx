import { useUIStore } from '@/stores/uiStore';
import { useState } from 'react';

import { Vote } from '@/types/vote';
import VoteFormContent from './VoteFormContent';
import Modal from '@/components/ui/Modal';
import ConfirmModal from '@/components/ui/confirmModal';

export default function VoteFormModal({ onCreateVote }: { onCreateVote: (newVote: Vote) => void }) {
  const { isVoteFormOpen, closeVoteForm } = useUIStore();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleFormSubmit = (data: Vote) => {
    onCreateVote(data);
    closeVoteForm();
    setIsConfirmOpen(true);
  };

  return (
    <>
      <Modal isOpen={isVoteFormOpen} onClose={closeVoteForm}>
        <VoteFormContent onSubmit={handleFormSubmit} />
      </Modal>
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="투표가 만들어졌어요!"
        description="같이 갈 팀원을 만나보아요 😊"
        onClose={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
