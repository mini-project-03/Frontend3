import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedBoxId, setSelectedBoxId] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [mascot, setMascot] = useState('');
  const [showTransition, setShowTransition] = useState(false);
  const [startShrink, setStartShrink] = useState(false);

  const foodCategories = [
    { id: 1, name: '한식', emoji: '🍲', bgColor: 'bg-[#8bd3dd]' },
    { id: 2, name: '중식', emoji: '🥢', bgColor: 'bg-[#f3d2c1]' },
    { id: 3, name: '양식', emoji: '🍝', bgColor: 'bg-[#fcd5ce]' },
    { id: 4, name: '일식', emoji: '🍣', bgColor: 'bg-[#b6e5d8]' },
    { id: 5, name: '인도식', emoji: '🍛', bgColor: 'bg-[#ffd166]' },
    { id: 6, name: '카페', emoji: '☕', bgColor: 'bg-[#e9c46a]' },
  ];

  const mascots = ['🐧', '🐻', '🐱', '🐶', '🦊', '🐰'];

  const mascotLines: Record<string, string> = {
    한식: '따끈한 국밥 어때요? 🍲',
    중식: '짜장면은 못 참지! 🥢',
    양식: '오늘은 파스타 데이~ 🍝',
    일식: '스시 먹고 힐링하자! 🍣',
    인도식: '커리 먹으러 가요! 🍛',
    카페: '달콤한 디저트 시간 ☕',
  };

  useEffect(() => {
    if (selectedBoxId !== null) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
        const randomMascot = mascots[Math.floor(Math.random() * mascots.length)];
        setMascot(randomMascot);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [selectedBoxId]);

  const handleBoxClick = (boxId: number) => {
    if (selectedBoxId !== null) return;
    setSelectedBoxId(boxId);
  };

  const handleReset = () => {
    setSelectedBoxId(null);
    setIsRevealed(false);
    setMascot('');
  };

  const handleGoHome = () => {
    setShowTransition(true);
    setTimeout(() => {
      setStartShrink(true);
    }, 800);
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

  const selectedCategory =
    selectedBoxId !== null
      ? foodCategories.find((category) => category.id === selectedBoxId)
      : null;

  return (
    <div className="min-h-screen bg-[#fef6e4] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-[#f582ae]">오늘 뭐 먹을까?</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {foodCategories.map((category) => (
            <motion.div
              key={category.id}
              onClick={() => handleBoxClick(category.id)}
              whileHover={selectedBoxId === null ? { scale: 1.05 } : {}}
              className={`
                ${category.bgColor} h-56 rounded-xl flex flex-col items-center justify-center 
                ${selectedBoxId === null ? 'cursor-pointer shadow-md' : ''}
                transition-all duration-500 
                ${selectedBoxId === category.id ? 'animate-reveal' : ''}
                ${selectedBoxId !== null && selectedBoxId !== category.id ? 'opacity-40' : ''}
              `}
            >
              {selectedBoxId === category.id ? (
                <>
                  <div className="text-2xl font-bold">{category.name}</div>
                  <div className="text-5xl mt-2">{category.emoji}</div>
                </>
              ) : (
                <span className="text-5xl">❓</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* 모달 */}
        {isRevealed && selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/30"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full flex flex-col items-center gap-6"
            >
              <div className="text-2xl font-bold text-[#001858] text-center">
                {selectedCategory.name}을 먹으러 갈 사람을 찾아볼까요?
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="relative bg-gray-100 text-gray-800 text-center px-4 py-2 rounded-lg shadow-md max-w-xs">
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-100 rotate-45 shadow-md" />
                  <div className="text-sm">{mascotLines[selectedCategory.name]}</div>
                </div>
                <div className="text-6xl animate-bounce">{mascot}</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleGoHome}
                  className="bg-[#f582ae] hover:bg-[#e56b9f] text-white font-bold py-3 px-6 rounded-full transition-all"
                >
                  🏠 Momuk으로
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleReset}
                  className="bg-[#3da9fc] hover:bg-[#2d8fd5] text-white font-bold py-3 px-6 rounded-full transition-all"
                >
                  🔄 다시 뽑기
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* 화면 전환 애니메이션 */}
      {showTransition && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#fef6e4]"
        >
          <motion.img
            src="/image 16.png" // public 폴더 기준 경로
            alt="Transition Image"
            initial={{ scale: 0 }}
            animate={{ scale: startShrink ? 0.3 : 1.5 }}
            transition={{ duration: 0.7 }}
            className="w-40 h-40"
          />
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;
