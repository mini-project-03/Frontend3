import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { useUIStore } from '@/stores/uiStore';
import { VoteRequest } from '@/types/vote';
import { validateVoteForm } from '@/utils/validation';
import { toDatetimeLocalFormat } from '@/utils/dateFormatter';
import { useAuthStore } from '@/stores/authStore';

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
    onReset(resetForm); // reset 함수 외부로 전달
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
            {isEdit ? (
              <>
                <span>✏️</span>수정 완료
              </>
            ) : (
              <>
                <span>➕</span>투표 생성
              </>
            )}
          </button>
        </div>
      </Modal>
    </>
  );
}
