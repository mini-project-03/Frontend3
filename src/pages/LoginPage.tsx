import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import AuthLayout, { AuthType } from '@/components/auth/AuthLayout';
import { useLoginMutation } from '@/hooks/api/auth/useLoginMutation';

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: login, isPending } = useLoginMutation();

  const handleLogin = async (formData: Record<string, string>) => {
    try {
      const response = await login({
        userId: formData.userId,
        userPwd: formData.password,
      });

      alert(`${response.userInfo.userName}님 환영합니다!`);
      navigate('/');
    } catch (error: any) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <AuthLayout type={AuthType.LOGIN}>
      <AuthForm
        title="모 먹을지 고민중? 함께 할 사람을 찾아보세요!"
        fields={[
          { id: 'userId', label: '아이디' },
          { id: 'password', label: '비밀번호', type: 'password' },
        ]}
        buttonText={isPending ? '로그인 중...' : '로그인'}
        onSubmit={handleLogin}
        bottomText={
          <p className="text-sm mt-4 text-center">
            계정이 없으신가요?{' '}
            <span
              className="text-gray-300 cursor-pointer hover:underline"
              onClick={() => navigate('/signup')}
            >
              회원가입
            </span>
          </p>
        }
      />
    </AuthLayout>
  );
};

export default LoginPage;
