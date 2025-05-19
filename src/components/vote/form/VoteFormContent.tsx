import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { useUIStore } from '@/stores/uiStore';
import { VoteRequest } from '@/types/vote';
import { validateVoteForm } from '@/utils/VoteFormValidation';
import { toDatetimeLocalFormat } from '@/utils/dateFormatter';
import { useAuthStore } from '@/stores/authStore';
import { motion } from 'framer-motion';

export default function VoteFormContent({
  onSubmit,
  onReset,
}: {
  onSubmit: (data: VoteRequest) => void;
  onReset: (resetFn: () => void) => void;
}) {
  const { isVoteFormOpen, closeVoteForm, voteFormMode, voteToEdit } = useUIStore();
  const isEdit = voteFormMode === 'edit';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recruit, setRecruit] = useState(4);
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [meetingEndTime, setMeetingEndTime] = useState('');
  const [deadline, setDeadline] = useState('');

  const userInfo = useAuthStore((state) => state.userInfo);

  useEffect(() => {
    if (meetingStartTime) {
      const start = new Date(meetingStartTime);
      const tenMinutesBefore = new Date(start.getTime() - 10 * 60 * 1000);
      setDeadline(toDatetimeLocalFormat(tenMinutesBefore));
    }
  }, [meetingStartTime]);

  useEffect(() => {
    if (isEdit && voteToEdit) {
      setTitle(voteToEdit.title);
      setDescription(voteToEdit.description);
      setRecruit(voteToEdit.recruit);
      setMeetingStartTime(voteToEdit.meetingStartTime);
      setMeetingEndTime(voteToEdit.meetingEndTime);
      setDeadline(voteToEdit.deadline);
    }
  }, [isEdit, voteToEdit]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setRecruit(4);
    setMeetingStartTime('');
    setMeetingEndTime('');
    setDeadline('');
  };

  useEffect(() => {
    onReset(resetForm);
  }, []);

  const handleCreate = () => {
    const result = validateVoteForm({ title, meetingStartTime, meetingEndTime, recruit });
    if (!result.valid) {
      alert(result.message);
      return;
    }

    if (!userInfo) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    const voteData: VoteRequest = {
      creatorId: userInfo.userId,
      title,
      description,
      recruit,
      meetingStartTime,
      meetingEndTime,
      deadline,
      voteId: 0,
      participants: 0,
      status: 'active',
      createdAt: '',
    };

    onSubmit(voteData);
  };

  return (
    <Modal isOpen={isVoteFormOpen} onClose={closeVoteForm}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-lg bg-zinc-900 p-6 rounded-xl shadow-xl text-gray-200 space-y-4"
      >
        <div>
          <label className="block text-sm font-semibold mb-1">투표 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="투표 제목을 입력하세요"
            className="w-full px-3 py-2 rounded-md bg-zinc-800 border border-zinc-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        <div className="flex items-center text-sm gap-2">
          <span className="text-xl">👤</span>
          <span className="text-base">모집자</span>
          <span className="text-gray-400">{userInfo?.userName ?? '사용자 이름 없음'}</span>
        </div>

        <div className="grid grid-cols-[140px_1fr] items-center gap-2">
          <label className="text-sm">약속 시작 시간</label>
          <input
            type="datetime-local"
            value={meetingStartTime}
            onChange={(e) => setMeetingStartTime(e.target.value)}
            className="p-2 rounded-md bg-zinc-800 text-white border border-zinc-600"
          />

          <label className="text-sm">약속 마감 시간</label>
          <input
            type="datetime-local"
            value={meetingEndTime}
            onChange={(e) => setMeetingEndTime(e.target.value)}
            className="p-2 rounded-md bg-zinc-800 text-white border border-zinc-600"
          />

          <label className="text-sm">투표 마감 시간</label>
          <input
            type="datetime-local"
            value={deadline}
            readOnly
            className="p-2 rounded-md bg-zinc-700 text-white border border-zinc-600 opacity-60 cursor-not-allowed"
          />

          <label className="text-sm">투표 모집 인원</label>
          <input
            type="number"
            value={recruit}
            onChange={(e) => setRecruit(Number(e.target.value))}
            min={1}
            max={30}
            className="p-2 rounded-md bg-zinc-800 text-white border border-zinc-600"
          />
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="투표 내용을 입력해주세요."
            maxLength={200}
            className="w-full h-24 p-3 rounded-md bg-zinc-800 text-white border border-zinc-600 resize-none placeholder-gray-400"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleCreate}
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition"
          >
            {isEdit ? '✏️ 수정 완료' : '➕ 투표 생성'}
          </button>
        </div>
      </motion.div>
    </Modal>
  );
}
