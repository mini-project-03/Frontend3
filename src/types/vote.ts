export interface VoteRequest {
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

export interface VoteResponse extends VoteRequest {
  voteId: number;
  participants: number;
  status: 'active' | 'closed';
  createdAt: string;
  image: string;
  votes: number;
  totalVotes: number;
}
