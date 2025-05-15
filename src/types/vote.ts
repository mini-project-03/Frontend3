interface VoteBase {
  creatorId: string;
  title: string;
  description: string;
  deadline: string;
  meetingStartTime: string;
  meetingEndTime: string;
  recruit: number;
}

export interface VoteRequest extends VoteBase {
  voteId: number;
  participants: number;
  status: 'active' | 'closed';
  createdAt: string;
}

export interface VoteResponse extends VoteRequest {
  image: string;
  votes: number;
  totalVotes: number;
}
