import { useNavigate } from 'react-router-dom'; // 라우터 훅 import

import image1 from '/public/image 1.png'
import image15 from '/public/image 15.png'
import image16 from '/public/image 16.png'
import line1 from '/public/Line 1.svg'
import line2 from '/public/Line 2.svg'
import { LoginRequest } from '@/types/auth';
import { useState } from 'react';
import { AuthAPI } from '@/api/authAPI.ts';

export const Login = () => {
  const navigate = useNavigate(); // navigate 훅 초기화

  const [formData, setFormData] = useState<LoginRequest>({
    userId: '',
    userPwd: '',
  });

  const handleLogin = async () => {
    try {
      const response = await AuthAPI.login(formData);
      console.log(response);
      navigate('/');


    }catch(error) {
      alert('로그인에 실패')
    }
  };

  return (
    <div className="bg-[#252836] flex justify-center items-center min-h-screen px-4">
      <div className="bg-[#252836] border border-black rounded-md w-full max-w-md p-6 relative">
        {/* 상단 로고 */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#ffa49b] text-lg font-semibold">Momuk</span>
          <img src={image1} alt="Momuk Icon" className="w-6 h-6 object-cover" />
        </div>

        {/* 이미지와 폼 영역 */}
        <div className="flex gap-4 items-start">
          {/* 왼쪽 이미지 */}
          <div className="relative w-[120px] h-[120px]">
            <img src={image15} alt="Background" className="absolute w-[100px] h-[100px] top-[10px] left-[10px] object-cover" />
            <img src={image16} alt="Foreground" className="absolute w-[120px] h-[120px] top-0 left-0 object-cover" />
          </div>

          {/* 오른쪽 폼 */}
          <div className="flex-1">
            <p className="text-white text-sm font-medium leading-5 mb-4">
              "뭐 먹을지 고민?
              <br />
              함께할 사람을 찾아보세요!"
            </p>

            <div className="text-white text-2xl font-normal mb-4">LOGIN</div>

            <label className="text-gray-400 text-xs">Id</label>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              className="w-full p-2 mb-2 text-sm text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            />
            <img src={line1} alt="Line1" className="w-full h-px mb-3" />

            <label className="text-gray-400 text-xs">Password</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full p-2 mb-2 text-sm text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.userPwd}
              onChange={(e) => setFormData({ ...formData, userPwd: e.target.value })}
            />
            <img src={line2} alt="Line2" className="w-full h-px mb-3" />

            <button
              className="bg-[#3C5BFE] w-full text-white py-2 text-sm rounded-md mt-2 hover:bg-[#2a43c7] transition"
              onClick={handleLogin}
            >
              login
            </button>

            {/* 회원가입 이동 추가 */}
            <div
              className="text-white text-xs text-right mt-2 cursor-pointer hover:underline"
              onClick={() => navigate('/Register')}
            >
              회원가입
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
