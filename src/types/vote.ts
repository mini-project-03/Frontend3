interface VoteBase {
  creatorId: string;
  title: string;
  description: string;
  deadline: string;
  meetingStartTime: string;
  meetingEndTime: string;
  recruit: number;
}

export interface VoteRequest extends VoteBase {}

export interface VoteResponse extends VoteBase {
  voteId: number;
  participants: number;
  status: 'active' | 'closed';
  createdAt: string;
  image: string;
  votes: number;
  totalVotes: number;
}
