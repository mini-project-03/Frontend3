import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import ConfirmModal from '@/components/ui/confirmModal';
import { useUIStore } from '@/stores/uiStore';
import { useVoteStore } from '@/stores/voteStore';
import { VoteRequest } from '@/types/vote';
import { validateVoteForm } from '@/utils/validation';
import { toDatetimeLocalFormat } from '@/utils/dateFormatter';

export default function VoteFormContent({ onSubmit }: { onSubmit: (data: VoteRequest) => void }) {
  const { isVoteFormOpen, closeVoteForm } = useUIStore();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recruit, setRecruit] = useState(4);
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [meetingEndTime, setMeetingEndTime] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (meetingStartTime) {
      const start = new Date(meetingStartTime);
      const tenMinutesBefore = new Date(start.getTime() - 10 * 60 * 1000);
      setDeadline(toDatetimeLocalFormat(tenMinutesBefore));
    }
  }, [meetingStartTime]);

  const handleCreate = () => {
    const result = validateVoteForm({ title, meetingStartTime, meetingEndTime, recruit });
    if (!result.valid) {
      alert(result.message);
      return;
    }

    const voteData: Omit<VoteRequest, 'id'> = {
      title,
      description,
      recruit,
      meetingStartTime,
      meetingEndTime,
      deadline,
      voteId: 0,
      creatorId: '김씨',
      participants: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    onSubmit(voteData as Vote);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setRecruit(4);
    setMeetingStartTime('');
    setMeetingEndTime('');
    setDeadline('');
  };

  return (
    <>
      <Modal isOpen={isVoteFormOpen} onClose={closeVoteForm}>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-white text-xl font-bold whitespace-nowrap">투표 제목</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="투표 제목을 입력하세요"
            className="w-80 p-2.5 rounded border border-gray-400 bg-transparent text-white"
          />
        </div>

        <div className="text-sm items-baseline text-white mt-4 mb-2 flex gap-1">
          <span className="text-2xl">👤</span>
          <span className="text-base mr-3">모집자</span>
          <span className="text-gray-400">여기는 사용자 이름</span>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <label className="text-white whitespace-nowrap">약속 시작 시간</label>
          <input
            type="datetime-local"
            value={meetingStartTime}
            onChange={(e) => setMeetingStartTime(e.target.value)}
            className="p-1 rounded bg-zinc-700 text-white"
          />
        </div>

        <div className="flex items-center gap-4 mt-3">
          <label className="text-white whitespace-nowrap">약속 마감 시간</label>
          <input
            type="datetime-local"
            value={meetingEndTime}
            onChange={(e) => setMeetingEndTime(e.target.value)}
            className="p-1 rounded bg-zinc-700 text-white"
          />
        </div>

        <div className="flex items-center gap-4 mt-3">
          <label className="text-white whitespace-nowrap">투표 마감 시간</label>
          <input
            type="datetime-local"
            value={deadline}
            readOnly
            className="p-1 rounded bg-zinc-700 text-white opacity-70 cursor-not-allowed"
          />
        </div>

        <div className="flex items-center gap-4 mt-3">
          <label className="text-white whitespace-nowrap">투표 모집 인원</label>
          <input
            type="number"
            value={recruit}
            onChange={(e) => setRecruit(Number(e.target.value))}
            min={1}
            max={20}
            className="p-1 rounded bg-zinc-700 text-white"
          />
        </div>

        <div className="flex items-end gap-4 mt-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="투표 내용을 입력해주세요."
            className="w-full h-24 p-2 rounded-md bg-zinc-700 resize-none text-white"
          />

          <button
            onClick={handleCreate}
            className="bg-primary hover:bg-primary-hover text-white px-3 py-2 rounded flex justify-center items-center gap-2 whitespace-nowrap"
          >
            <span>➕</span>투표 생성
          </button>
        </div>
      </Modal>

      {/* ✅ 확인 모달 렌더링 */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="투표가 만들어졌어요!"
        description="같이 갈 팀원을 만나보아요 😊"
        onClose={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
