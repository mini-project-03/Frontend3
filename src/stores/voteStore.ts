import { VoteAPI } from '@/api/voteAPI';
import { User } from '@/types/user';
import { VoteRequest, VoteResponse } from '@/types/vote';
import axios from 'axios';
import { create } from 'zustand';
import { sortVotes } from '@/utils/sortVotes';

interface VoteState {
  votes: VoteResponse[];
  selectedVote: VoteResponse | null;
  participantList: User[] | null;
  fetchVotes: () => Promise<void>;
  createVote: (voteData: VoteRequest) => Promise<void>;
  updateVote: (voteId: number, voteData: VoteRequest) => Promise<void>;
  setSelectedVote: (vote: VoteResponse) => void;
  clearSelectedVote: () => void;
  participateInVote: (voteId: number, user: User) => void;
  deleteVote: (voteId: number) => void;
  closeVote: (voteId: number) => Promise<void>;
}

export const useVoteStore = create<VoteState>((set) => ({
  votes: [],
  participantList: null,
  selectedVote: null,

  fetchVotes: async () => {
    try {
      const voteList = await VoteAPI.getVotes();
      set({ votes: sortVotes(voteList) });
    } catch (err) {
      console.error('투표 목록 불러오기 실패:', err);
    }
  },

  setSelectedVote: (vote) => set({ selectedVote: vote }),
  clearSelectedVote: () => set({ selectedVote: null }),

  participateInVote: (voteId, user) => {
    set((state) => {
      const updatedVotes = state.votes.map((vote) =>
        vote.voteId === voteId ? { ...vote, participants: vote.participants + 1 } : vote,
      );

      const updatedSelectedVote =
        state.selectedVote?.voteId === voteId
          ? { ...state.selectedVote, participants: state.selectedVote.participants + 1 }
          : state.selectedVote;

      return {
        votes: sortVotes(updatedVotes),
        selectedVote: updatedSelectedVote,
      };
    });
  },

  createVote: async (voteData) => {
    try {
      const createdVote: VoteResponse = await VoteAPI.createVote(voteData);
      set((state) => {
        const updatedVotes = [...state.votes, createdVote];
        return { votes: sortVotes(updatedVotes) };
      });
    } catch (error) {
      console.error('투표 생성 실패:', error);
      if (axios.isAxiosError(error)) {
        console.error('⚠️ 서버 응답 메시지:', error.response?.data);
      }
    }
  },

  updateVote: async (voteId, voteData) => {
    try {
      const updated = await VoteAPI.updateVote(voteId, voteData);

      set((state) => {
        const originalVote = state.votes.find((v) => v.voteId === voteId);
        if (!originalVote) return { votes: state.votes };

        const updatedVote = { ...originalVote, ...updated };
        const updatedVotes = [...state.votes.filter((v) => v.voteId !== voteId), updatedVote];

        return {
          votes: sortVotes(updatedVotes),
          selectedVote: state.selectedVote?.voteId === voteId ? updatedVote : state.selectedVote,
        };
      });
    } catch (err) {
      console.error('투표 수정 실패:', err);
    }
  },
  deleteVote: async (voteId: number) => {
    try {
      await VoteAPI.deleteVote(voteId); // ✅ 실제 API 호출
      set((state) => ({
        votes: state.votes.filter((vote) => vote.voteId !== voteId),
      }));
    } catch (error) {
      console.error('Vote 삭제 실패:', error);
    }
  },

  closeVote: async (voteId) => {
    try {
      await VoteAPI.closeVote(voteId);
      set((state) => {
        const updatedVotes = state.votes.map((vote) =>
          vote.voteId === voteId ? { ...vote, isClosed: true } : vote,
        );
        const updatedSelectedVote =
          state.selectedVote?.voteId === voteId
            ? { ...state.selectedVote, isClosed: true }
            : state.selectedVote;

        return {
          votes: updatedVotes,
          selectedVote: updatedSelectedVote,
        };
      });
    } catch (error) {
      console.error('투표 마감 실패:', error);
    }
  },
}));
