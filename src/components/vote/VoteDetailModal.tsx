import { useVoteStore } from '@/stores/voteStore';
import Modal from '../ui/Modal';
import { useUIStore } from '@/stores/uiStore';

export default function VoteDetailModal() {
  const { participantList } = useVoteStore();
  const { selectedVote, closeVoteDetail } = useUIStore();

  if (!selectedVote) return null;

  const participationRate = Math.round((selectedVote.participants / selectedVote.recruit) * 100);

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}월 ${d.getDate()}일 ${d.getHours()}시`;
  };

  return (
    <Modal isOpen={!!selectedVote} onClose={closeVoteDetail}>
      <div className="relative p-2 w-[px] text-white rounded-xl">
        <button
          onClick={closeVoteDetail}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        ></button>

        <div className="text-xl font-bold mb-1">{selectedVote.title}</div>
        <div className="text-sm text-gray-300 mb-4">{selectedVote.creatorId}</div>
        <p className="mb-4 text-gray-200 whitespace-pre-line">{selectedVote.description}</p>

        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>👥 참여자</span>
              <span className="text-gray-400">
                {selectedVote.participants} / {selectedVote.recruit}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>🕒 약속 시간</span>
              <span className="text-gray-400">
                {formatTime(selectedVote.meetingStartTime)} ~{' '}
                {formatTime(selectedVote.meetingEndTime)}
              </span>
            </div>
          </div>

          <div className="w-20 h-20 relative">
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-zinc-700"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-pink-400"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${participationRate}, 100`}
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-pink-400 font-bold text-sm">
              {participationRate}%
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-white mb-2">참여자</div>
          {/* <div className="flex flex-wrap gap-2">
            {participantList.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 px-2 py-1 bg-zinc-700 rounded text-sm text-white"
              >
                {user.name}
              </div>
            ))}
          </div> */}
        </div>

        <button className="w-full bg-primary hover:bg-primary-variant text-white py-2 rounded font-bold mt-4">
          👍 참여
        </button>
      </div>
    </Modal>
  );
}
