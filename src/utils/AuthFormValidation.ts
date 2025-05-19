export const validateField = (id: string, value: string): string => {
  switch (id) {
    case 'fullName':
      return value.trim() === '' ? '이름을 입력해주세요.' : '';
    case 'userId':
      return value.length < 3 ? '아이디는 3자 이상이어야 합니다.' : '';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : '유효한 이메일 형식을 입력해주세요.';
    case 'password':
      return value.length < 4 ? '비밀번호는 4자 이상이어야 합니다.' : '';
    case 'confirmPassword':
      return value.trim() === '' ? '비밀번호 확인을 입력해주세요.' : '';
    default:
      return '';
  }
};

export const validateForm = (
  formData: Record<string, string>,
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const key in formData) {
    const error = validateField(key, formData[key]);
    if (error) {
      isValid = false;
      errors[key] = error;
    }
  }

  if ('password' in formData && 'confirmPassword' in formData) {
    if (formData.password !== formData.confirmPassword) {
      isValid = false;
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
  }

  return { isValid, errors };
};
