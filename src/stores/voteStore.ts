// import { mockParticipants } from '@/data/mockParticipants';
import { mockVotes } from '@/data/mockVotes';
import { User } from '@/types/user';
import { Vote } from '@/types/vote';
import { create } from 'zustand';

interface VoteState {
  votes: Vote[];
  participantList: User[] | null;
  selectedVote: Vote | null;
  fetchVotes: () => void;
  createVote: (vote: Omit<Vote, 'voteId' | 'participants' | 'status' | 'createdAt'>) => void;
  setSelectedVote: (vote: Vote) => void;
}

export const useVoteStore = create<VoteState>((set) => ({
  votes: [],
  participantList: null,
  selectedVote: null,

  fetchVotes: () => {
    set({ votes: mockVotes });
  },

  createVote: (voteData) => {
    const newVote: Vote = {
      ...voteData,
      voteId: Date.now(),
      participants: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ votes: [...state.votes, newVote] }));
  },

  setSelectedVote: (vote) => set({ selectedVote: vote }),
}));
