export interface Vote {
  voteId: number;
  creatorId: string;
  title: string;
  description: string;
  deadline: string;
  meetingStartTime: string;
  meetingEndTime: string;
  recruit: number;
  participants: number;
  status: 'active' | 'closed';
  createdAt: string;
}
