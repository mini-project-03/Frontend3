import { VoteAPI } from '@/api/voteAPI';
import { User } from '@/types/user';
import { VoteRequest, VoteResponse } from '@/types/vote';
import axios from 'axios';
import { create } from 'zustand';

interface VoteState {
  votes: VoteResponse[];
  selectedVote: VoteResponse | null;
  participantList: User[] | null;
  fetchVotes: () => Promise<void>;
  createVote: (voteData: VoteRequest) => Promise<void>;
  setSelectedVote: (vote: VoteResponse) => void;
  clearSelectedVote: () => void;
  participateInVote: (voteId: number, user: User) => void;
}

export const useVoteStore = create<VoteState>((set) => ({
  votes: [],
  participantList: null,
  selectedVote: null,

  fetchVotes: async () => {
    try {
      const voteList = await VoteAPI.getVotes();
      set({ votes: voteList });
    } catch (err) {
      console.error('투표 목록 불러오기 실패:', err);
    }
  },

  createVote: async (voteData) => {
    try {
      // 1. 서버에 요청
      const createdVote: VoteResponse = await VoteAPI.createVote(voteData);
      // console.log('✅ newVote 응답:', createdVote);

      // // 2. 응답받은 데이터를 상태에 추가
      // set((state) => ({
      //   votes: [...state.votes, createdVote],
      // }));
    } catch (error) {
      console.error('투표 생성 실패:', error);

      // ✅ 여기에 이거 추가!
      if (axios.isAxiosError(error)) {
        console.error('⚠️ 서버 응답 메시지:', error.response?.data);
      }
    }
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
