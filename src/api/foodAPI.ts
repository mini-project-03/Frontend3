import { apiClient } from './apiClient';

export interface Food {
  voteId: number;
  creatorId: string;
  title: string;
  description: string;
  deadline: string;
  meetingStartTime: string;
  meetingEndTime: string;
  recruit: number;
  participants: number;
  status: string;
  createdAt: string;
  restaurantName: string;
  latitude: number;
  longitude: number;
  image: string;
  votes: number;
  totalVotes: number;
}

export const FoodAPI = {
  getFoods: async () => {
    const { data } = await apiClient.get<Food[]>('/votes');

    const foodsWithImages = data.map((food) => ({
      ...food,
      image: `/images/${food.image}`,
    }));

    return foodsWithImages;
  },

  // 특정 음식 투표 가져오기
  getFoodById: async (voteId: number) => {
    const { data } = await apiClient.get<Food>(`/votes/${voteId}`);
    return data;
  },

  createVote: async (voteData: Omit<Food, 'voteId'>) => {
    const { data } = await apiClient.post('/votes', voteData);
    return data;
  },

  updateVote: async (voteId: number, voteData: Food) => {
    const { data } = await apiClient.put(`/votes/${voteId}`, voteData);
    return data;
  },
};
