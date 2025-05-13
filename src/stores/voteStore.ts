// import { mockParticipants } from '@/data/mockParticipants';
import { mockVotes } from '@/data/mockVotes';
import { User } from '@/types/user';
import { Vote } from '@/types/vote';
import { create } from 'zustand';

interface VoteState {
  votes: Vote[];
  selectedVote: Vote | null;
  participantList: User[] | null;
  fetchVotes: () => void;
  createVote: (vote: Omit<Vote, 'voteId' | 'participants' | 'status' | 'createdAt'>) => void;
  setSelectedVote: (vote: Vote) => void;
  clearSelectedVote: () => void;
  participateInVote: (voteId: number, user: User) => void;
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
  clearSelectedVote: () => set({ selectedVote: null }),

  participateInVote: (voteId, user) => {
    set((state) => {
      const updatedVotes = state.votes.map((vote) => {
        if (vote.voteId === voteId) {
          return {
            ...vote,
            participants: vote.participants + 1,
          };
        }
        return vote;
      });

      const updatedSelectedVote =
        state.selectedVote?.voteId === voteId
          ? { ...state.selectedVote, participants: state.selectedVote.participants + 1 }
          : state.selectedVote;

      return {
        votes: updatedVotes,
        selectedVote: updatedSelectedVote,
      };
    });
  },
}));
