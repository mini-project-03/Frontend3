import { useAuthStore } from '@/stores/authStore';
import { apiClient } from './apiClient';
import { VoteRequest, VoteResponse } from '@/types/vote';
import axios from 'axios';

export const VoteAPI = {
  getVotes: async () => {
    const { data } = await apiClient.get<VoteResponse[]>('/votes');

    const votesWithImages = data.map((vote) => ({
      ...vote,
      image: `/images/${vote.image}`,
    }));

    return votesWithImages;
  },

  // 특정 음식 투표 가져오기
  getFoodById: async (voteId: number) => {
    const { data } = await apiClient.get<VoteResponse>(`/votes/${voteId}`);
    return data;
  },

  createVote: async (voteData: VoteRequest) => {
    const accessToken = useAuthStore.getState().accessToken;
    const { data } = await apiClient.post('/votes', voteData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  },

  updateVote: async (voteId: number, voteData: VoteRequest) => {
    const accessToken = useAuthStore.getState().accessToken;

    try {
      const { data } = await apiClient.put(`/votes/${voteId}`, voteData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  },

  deleteVote: async (voteId: number) => {
    const accessToken = useAuthStore.getState().accessToken;
    try {
      const res = await apiClient.delete(`/votes/${voteId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  closeVote: async (voteId: number) => {
    const accessToken = useAuthStore.getState().accessToken;
    const { data } = await apiClient.patch(`/votes/${voteId}/close`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  },
};
