import { create } from 'zustand';

interface UIState {
  isVoteFormOpen: boolean;
  isVoteDetailOpen: boolean;
  openVoteForm: () => void;
  closeVoteForm: () => void;
  openVoteDetail: () => void;
  closeVoteDetail: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isVoteFormOpen: false,
  isVoteDetailOpen: false,
  openVoteForm: () => set({ isVoteFormOpen: true }),
  closeVoteForm: () => set({ isVoteFormOpen: false }),
  openVoteDetail: () => set({ isVoteDetailOpen: true }),
  closeVoteDetail: () => set({ isVoteDetailOpen: false }),
}));
