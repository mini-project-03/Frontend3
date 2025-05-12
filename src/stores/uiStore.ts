import { create } from 'zustand';

interface UIState {
  isVoteFormOpen: boolean;
  openVoteForm: () => void;
  closeVoteForm: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isVoteFormOpen: false,
  openVoteForm: () => set({ isVoteFormOpen: true }),
  closeVoteForm: () => set({ isVoteFormOpen: false }),
}));
