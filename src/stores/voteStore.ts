// import { mockParticipants } from '@/data/mockParticipants';
import { mockVotes } from '@/data/mockVotes';
import { User } from '@/types/user';
import { Vote } from '@/types/vote';
import { create } from 'zustand';

interface VoteState {
  votes: Vote[];
  participantList: User[] | null;
  fetchVotes: () => void;
  createVote: (vote: Omit<Vote, 'voteId' | 'participants' | 'status' | 'createdAt'>) => void;
}

export const useVoteStore = create<VoteState>((set) => ({
  votes: [],
  participantList: null,

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
}));
