// pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

import image1 from '/public/image 1.png'
import image2 from '/public/register.png'

const Register = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, email: '', password: '' }); // 입력시 오류 초기화
  };

  // 이메일 유효성 검사
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!isValidEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, password: '비밀번호가 일치하지 않습니다.' }));
      return;
    }

    // 여기서 서버로 데이터를 보낼 수 있어요 (예: axios.post)
    console.log('회원가입 정보:', formData);

    // 회원가입 후 로그인 페이지로 이동
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#1E2030] flex items-center justify-center px-4">
      <div className="bg-[#1E2030] text-white rounded-lg shadow-md w-full max-w-6xl flex flex-col md:flex-row p-6 md:p-10">
        {/* 왼쪽 */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start mb-8 md:mb-0">
          <div className="flex items-center mb-4">
            <span className="text-pink-300 text-3xl font-bold mr-2">Momuk</span>
            <img src={image1} alt="Momuk Logo" className="w-8 h-8" />
          </div>
          <img src={image2} alt="Illustration" className="w-3/4 md:w-full" />
        </div>

        {/* 오른쪽 폼 */}
        <div className="md:w-1/2 md:pl-12 flex flex-col justify-center w-full">
          <h2 className="text-lg font-semibold mb-6 text-center md:text-left">
            등록을 위해 양식을 작성해 주세요!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full name:" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Id:" name="id" value={formData.id} onChange={handleChange} />
            <Input
              label="Email:"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              type="email"
            />
            <Input
              label="Password:"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              label="Confirm Password:"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.password}
            />

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-semibold mt-4"
            >
              Register
            </button>
          </form>

          <p className="text-sm mt-4 text-center">
            이미 계정이 있으신가요?{' '}
            <span
              className="text-gray-300 cursor-pointer hover:underline"
              onClick={() => navigate('/')}
            >
              로그인
            </span>
          </p>

          <div className="flex justify-center gap-4 mt-4 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-blue-400" />
            <FaWhatsapp className="cursor-pointer hover:text-green-400" />
            <FaTelegramPlane className="cursor-pointer hover:text-sky-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Input 컴포넌트
const Input = ({
                 label,
                 name,
                 value,
                 onChange,
                 error,
                 type = 'text',
               }: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}) => (
  <div>
    <label className="block mb-1 text-sm">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-md bg-transparent border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
    />
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

export default Register;
