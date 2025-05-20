import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = (
  {
    isOpen,
    title,
    description,
    onClose,
  }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#ECF9FF] rounded-2xl p-6 w-80 shadow-xl flex flex-col items-center relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            {/* 고정된 이미지 */}
            <img
              src="/image 1.png"
              alt="캐릭터"
              className="w-20 h-20 -mt-16 mb-4"
            />

            {/* 텍스트 영역 */}
            <h2 className="text-lg font-bold text-center text-gray-900 mb-2">{title}</h2>
            {description && (
              <p className="text-sm text-gray-700 text-center mb-4 whitespace-pre-line">
                {description}
              </p>
            )}

            {/* 확인 버튼 */}
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              확인
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
