import { mockVotes } from '@/data/mockVotes';
import { Vote } from '@/types/vote';
import { create } from 'zustand';

interface VoteState {
  votes: Vote[];
  createVote: (vote: Omit<Vote, 'id'>) => void;
}

export const useVoteStore = create<VoteState>((set) => ({
  votes: [],
  fetchVotes: () => {
    set({ votes: mockVotes });
  },
  createVote: (voteData) =>
    set((state) => ({
      votes: [
        ...state.votes,
        {
          ...voteData,
          id: Date.now(),
        },
      ],
    })),
}));
