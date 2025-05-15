import React, { useState } from 'react';

interface Props {
  isCreator: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const VoteOptionsMenu: React.FC<Props> = ({ onEdit, onDelete, onClose }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // if (!isCreator) return null;

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="text-gray-400 hover:text-white text-xl">
        ⋯
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-zinc-800 text-white rounded shadow-lg z-50">
          <button
            onClick={() => {
              toggleMenu();
              onEdit();
            }}
            className="w-full text-left px-4 py-2 hover:bg-zinc-700"
          >
            투표 수정
          </button>

          <button
            onClick={() => {
              toggleMenu();
              onDelete();
            }}
            className="w-full text-left px-4 py-2 hover:bg-zinc-700 text-red-400"
          >
            투표 삭제
          </button>
          <button
            onClick={() => {
              toggleMenu();
              onClose();
            }}
            className="w-full text-left px-4 py-2 hover:bg-zinc-700 text-green-400"
          >
            투표 마감
          </button>
        </div>
      )}
    </div>
  );
};

export default VoteOptionsMenu;
