import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import { useUIStore } from '@/stores/uiStore';
import { useVoteStore } from '@/stores/voteStore';
import { Vote } from '@/types/vote';

export default function VoteFormModal() {
  const { isVoteFormOpen, closeVoteForm } = useUIStore();
  const createVote = useVoteStore((s) => s.createVote);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [max, setMax] = useState(4);
  const [meetingStart, setMeetingStart] = useState('');
  const [meetingEnd, setMeetingEnd] = useState('');
  const [deadline, setDeadline] = useState('');

  function toDatetimeLocalFormat(date: Date) {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  useEffect(() => {
    if (meetingStart) {
      const start = new Date(meetingStart);
      const tenMinutesBefore = new Date(start.getTime() - 10 * 60 * 1000);
      setDeadline(toDatetimeLocalFormat(tenMinutesBefore));
    }
  }, [meetingStart]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setMax(4);
    setMeetingStart('');
    setMeetingEnd('');
    setDeadline('');
  };

  const handleCreate = () => {
    if (!title || !meetingStart || !meetingEnd) {
      alert('모든 항목을 올바르게 입력해주세요.');
      return;
    }

    const now = new Date();
    const start = new Date(meetingStart);
    const end = new Date(meetingEnd);

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

    if (max < 1 || max > 30) {
      alert('모집 인원은 1명 이상 100명 이하로 설정해주세요.');
      return;
    }

    const voteData: Omit<Vote, 'id'> = {
      title,
      description,
      max,
      meetingStart,
      meetingEnd,
      deadline,
      imageUrl: 'https://source.unsplash.com/400x300/?food',
    };

    console.log('생성된 투표: ', voteData);
    createVote(voteData);
    closeVoteForm();
    resetForm();
  };

  return (
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

      <div className="text-sm items-baseline text-white mt-4 mb-2 flex  gap-1">
        <span className="text-2xl">👤</span>
        <span className="text-base mr-3">모집자</span>
        <span className="text-gray-400">여기는 사용자 이름</span>
      </div>

      <div className="flex items-center gap-4 mt-3">
        <label className="text-white whitespace-nowrap">약속 시작 시간</label>
        <input
          type="datetime-local"
          value={meetingStart}
          onChange={(e) => setMeetingStart(e.target.value)}
          className="p-1 rounded bg-zinc-700 text-white"
        />
      </div>

      <div className="flex items-center gap-4 mt-3">
        <label className="text-white whitespace-nowrap">약속 마감 시간</label>
        <input
          type="datetime-local"
          value={meetingEnd}
          onChange={(e) => setMeetingEnd(e.target.value)}
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
          value={max}
          onChange={(e) => setMax(Number(e.target.value))}
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
          className="w-full h-24 p-2 rounded-md bg-zinc-700 resize-none"
        />

        <button
          onClick={handleCreate}
          className="bg-primary text-white px-3 py-2 rounded flex justify-center items-center gap-2 whitespace-nowrap"
        >
          <span>➕</span>투표 생성
        </button>
      </div>
    </Modal>
  );
}
