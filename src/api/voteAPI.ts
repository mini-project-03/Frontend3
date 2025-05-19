import { useAuthStore } from '@/stores/authStore';
import { apiClient } from './apiClient';
import { VoteRequest, VoteResponse } from '@/types/vote';
import { Participant } from '@/types/participant';

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
    const { data } = await apiClient.post('/votes', voteData);
    return data;
  },

  updateVote: async (voteId: number, voteData: VoteRequest) => {
    try {
      const { data } = await apiClient.put(`/votes/${voteId}`, voteData);
      return data;
    } catch (error) {
      throw error;
    }
  },

  deleteVote: async (voteId: number) => {
    try {
      const res = await apiClient.delete(`/votes/${voteId}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  closeVote: async (voteId: number) => {
    const { data } = await apiClient.patch(`/votes/${voteId}/close`);
    return data;
  },

  participate: async (voteId: number) => {
    const accessToken = useAuthStore.getState().accessToken;
    const { data } = await apiClient.post(`/votes/${voteId}/participants`, undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  },

  getParticipantList: async (voteId: number): Promise<Participant[]> => {
    const { data } = await apiClient.get(`/votes/${voteId}/participantList`);

    return data.map((d: any) => ({
      id: d.userId,
      name: d.userName,
    }));
  },

  cancelParticipation: async (voteId: number) => {
    const accessToken = useAuthStore.getState().accessToken;
    const { data } = await apiClient.delete(`/votes/${voteId}/participants`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  },
};
