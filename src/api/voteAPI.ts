import { useAuthStore } from '@/stores/authStore';
import { apiClient } from './apiClient';
import { VoteRequest, VoteResponse } from '@/types/vote';

// export interface Vote {
//   voteId: number;
//   creatorId: string;
//   title: string;
//   description: string;
//   deadline: string;
//   meetingStartTime: string;
//   meetingEndTime: string;
//   recruit: number;
//   participants: number;
//   status: string;
//   createdAt: string;
//   restaurantName: string;
//   latitude: number;
//   longitude: number;
//   image: string;
//   votes: number;
//   totalVotes: number;
// }

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

  participate: async (voteId: number) => {
    const accessToken = useAuthStore.getState().accessToken;
    const { data } = await apiClient.post(`/votes/${voteId}/participants`, undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  },

  updateVote: async (voteId: number, voteData: VoteRequest) => {
    const { data } = await apiClient.put(`/votes/${voteId}`, voteData);
    return data;
  },
};
