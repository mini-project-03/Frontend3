import { Vote } from '@/types/vote';
import { create } from 'zustand';

interface UIState {
  isVoteFormOpen: boolean;
  selectedVote: Vote | null;
  openVoteForm: () => void;
  closeVoteForm: () => void;
  openVoteDetail: (vote: Vote) => void;
  closeVoteDetail: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isVoteFormOpen: false,
  selectedVote: null,
  openVoteForm: () => set({ isVoteFormOpen: true }),
  closeVoteForm: () => set({ isVoteFormOpen: false }),
  openVoteDetail: (vote) => set({ selectedVote: vote }),
  closeVoteDetail: () => set({ selectedVote: null }),
}));
