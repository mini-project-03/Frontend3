import React from 'react';

interface AlertProps {
  title: string;
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-item-background rounded-xl shadow-lg p-6 w-80 flex flex-col items-center">
        <img src="/public/image 1.png" alt="Vote Icon" className="w-16 h-16 mb-4" />
        <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
        <p className="text-secondary text-center mb-4">{message}</p>
        <button
          className="bg-login-btn text-white py-2 px-6 rounded-lg hover:bg-opacity-80 transition"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
