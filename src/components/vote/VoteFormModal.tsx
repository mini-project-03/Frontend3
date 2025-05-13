import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import ConfirmModal from '../ui/confirmModal'; // ✅ 추가

import { useUIStore } from '@/stores/uiStore';
import { useVoteStore } from '@/stores/voteStore';
import { Vote } from '@/types/vote';

export default function VoteFormModal({ onCreateVote }: { onCreateVote: (newVote: Vote) => void }) {
  const { isVoteFormOpen, closeVoteForm } = useUIStore();
  const createVote = useVoteStore((s) => s.createVote);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recruit, setRecruit] = useState(4);
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [meetingEndTime, setMeetingEndTime] = useState('');
  const [deadline, setDeadline] = useState('');

  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // ✅ 모달 상태 추가

  function toDatetimeLocalFormat(date: Date) {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  useEffect(() => {
    if (meetingStartTime) {
      const start = new Date(meetingStartTime);
      const tenMinutesBefore = new Date(start.getTime() - 10 * 60 * 1000);
      setDeadline(toDatetimeLocalFormat(tenMinutesBefore));
    }
  }, [meetingStartTime]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setRecruit(4);
    setMeetingStartTime('');
    setMeetingEndTime('');
    setDeadline('');
  };

  const handleCreate = () => {
    if (!title || !meetingStartTime || !meetingEndTime) {
      alert('모든 항목을 올바르게 입력해주세요.');
      return;
    }

    const now = new Date();
    const start = new Date(meetingStartTime);
    const end = new Date(meetingEndTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert('유효한 날짜를 입력해주세요.');
      return;
    }

    if (start < now) {
      alert('약속 시작 시간은 현재 시각보다 이후여야 합니다.');
      return;
    }

    if (start >= end) {
      alert('시작 시간은 마감 시간보다 앞서야 합니다.');
      return;
    }

    if (recruit < 1 || recruit > 30) {
      alert('모집 인원은 1명 이상 30명 이하로 설정해주세요.');
      return;
    }

    const voteData: Omit<Vote, 'id'> = {
      title,
      description,
      recruit,
      meetingStartTime,
      meetingEndTime,
      deadline,
      voteId: 0,
      creatorId: '김씨', // 실제 사용자 ID로 대체
      participants: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    onCreateVote(voteData);
    resetForm();
    closeVoteForm();
    setIsConfirmOpen(true); // ✅ 확인 모달 띄우기
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
            max={30}
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
