import { VoteResponse } from '@/types/vote';
import { create } from 'zustand';
type VoteFormMode = 'create' | 'edit';

interface UIState {
  isVoteFormOpen: boolean;
  isVoteDetailOpen: boolean;
  voteFormMode: VoteFormMode;
  voteToEdit: VoteResponse | null;
  openVoteForm: (vote?: VoteResponse) => void;
  closeVoteForm: () => void;
  openVoteDetail: (vote: VoteResponse) => void;
  closeVoteDetail: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isVoteFormOpen: false,
  isVoteDetailOpen: false,
  voteFormMode: 'create',
  voteToEdit: null,

  openVoteForm: (vote) => {
    if (vote) {
      set({
        isVoteFormOpen: true,
        voteFormMode: 'edit',
        voteToEdit: vote,
      });
    } else {
      set({
        isVoteFormOpen: true,
        voteFormMode: 'create',
        voteToEdit: null,
      });
    }
  },

  closeVoteForm: () => set({ isVoteFormOpen: false, voteFormMode: 'create', voteToEdit: null }),

  openVoteDetail: () => set({ isVoteDetailOpen: true }),
  closeVoteDetail: () => set({ isVoteDetailOpen: false }),
}));
