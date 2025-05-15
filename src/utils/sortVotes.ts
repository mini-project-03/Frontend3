import { VoteResponse } from '@/types/vote';

export const sortVotes = (votes: VoteResponse[]) => {
  return votes.sort((a, b) => {
    if (a.status !== b.status) return a.status === 'closed' ? 1 : -1;
    return new Date(a.meetingStartTime).getTime() - new Date(b.meetingStartTime).getTime();
  });
};
