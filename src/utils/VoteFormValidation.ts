export function validateVoteForm({
  title,
  meetingStartTime,
  meetingEndTime,
  deadline,
  recruit,
}: {
  title: string;
  meetingStartTime: string;
  meetingEndTime: string;
  deadline: string;
  recruit: number;
}): { valid: boolean; message: string } {
  const now = new Date();
  const start = new Date(meetingStartTime);
  const end = new Date(meetingEndTime);
  const deadlineDate = new Date(deadline);

  if (!title || !meetingStartTime || !meetingEndTime) {
    return { valid: false, message: '모든 항목을 올바르게 입력해주세요.' };
  }
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { valid: false, message: '유효한 날짜를 입력해주세요.' };
  }
  if (start < now) {
    return { valid: false, message: '약속 시작 시간은 현재 시각보다 이후여야 합니다.' };
  }
  if (start >= end) {
    return { valid: false, message: '시작 시간은 마감 시간보다 앞서야 합니다.' };
  }
  if (deadlineDate < now) {
    return { valid: false, message: '투표 마감 시간은 현재 시각보다 이후여야 합니다.' };
  }
  if (recruit < 1 || recruit > 30) {
    return { valid: false, message: '모집 인원은 1명 이상 30명 이하로 설정해주세요.' };
  }
  return { valid: true, message: '' };
}
