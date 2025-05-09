import { Vote } from '../types/vote';

export const mockVotes: Vote[] = [
  {
    id: 1,
    title: '김밥천국 점심 투표',
    imageUrl: 'https://source.unsplash.com/400x300/?hotpot',
    description: '김밥, 라면, 덮밥 중에 뭐 먹을래?',
    max: 5,
    meetingStart: '2025-05-08T12:00:00',
    meetingEnd: '2025-05-08T13:00:00',
    deadline: '2025-05-08T11:30:00',
  },
  {
    id: 2,
    title: '학식 or 배달 투표',
    imageUrl: 'https://source.unsplash.com/400x300/?chicken',
    description: '편하게 먹을까, 나가서 먹을까?',
    max: 4,
    meetingStart: '2025-05-08T18:00:00',
    meetingEnd: '2025-05-08T19:00:00',
    deadline: '2025-05-08T17:00:00',
  },
];
