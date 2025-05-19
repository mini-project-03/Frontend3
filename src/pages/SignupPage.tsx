import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { AuthAPI } from '../api/authAPI';
import AuthLayout, { AuthType } from '@/components/auth/AuthLayout';
import { toast } from 'sonner';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData: Record<string, string>) => {
    try {
      const signupData = {
        userId: formData.userId,
        userPwd: formData.password,
        userName: formData.fullName,
        emailId: formData.email.split('@')[0],
        emailDomain: formData.email.split('@')[1],
      };
      const response = await AuthAPI.signup(signupData);
      toast.success(response.message);
      navigate('/home');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <AuthLayout type={AuthType.SIGNUP}>
      <AuthForm
        title="등록을 위해 양식을 작성해 주세요!"
        fields={[
          { id: 'fullName', label: '이름' },
          { id: 'userId', label: '아이디' },
          { id: 'email', label: '이메일' },
          { id: 'password', label: '비밀번호', type: 'password' },
          { id: 'confirmPassword', label: '비밀번호 확인', type: 'password' },
        ]}
        buttonText="회원가입"
        onSubmit={handleSignup}
        bottomText={
          <p className="text-sm mt-4 text-center">
            이미 계정이 있으신가요?{' '}
            <span
              className="text-gray-300 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              로그인
            </span>
          </p>
        }
      />
    </AuthLayout>
  );
};

export default SignupPage;
