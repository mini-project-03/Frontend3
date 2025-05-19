import React, { useState, useRef, useEffect } from 'react';

interface Props {
  isCreator: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const VoteOptionsMenu: React.FC<Props> = ({ isCreator, onEdit, onDelete, onClose }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isCreator) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="text-gray-400 hover:text-white text-xl transition-colors duration-150"
        title="옵션"
      >
        ⋯
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-zinc-900 text-white rounded-xl shadow-2xl border border-zinc-700 z-50 overflow-hidden">
          <button
            onClick={() => {
              toggleMenu();
              onEdit();
            }}
            className="w-full text-left px-4 py-2 hover:bg-zinc-800 transition-colors"
          >
            ✏️ 투표 수정
          </button>

          <button
            onClick={() => {
              toggleMenu();
              onDelete();
            }}
            className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-red-400 transition-colors"
          >
            🗑️ 투표 삭제
          </button>

          <button
            onClick={() => {
              toggleMenu();
              onClose();
            }}
            className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-green-400 transition-colors"
          >
            ✅ 투표 마감
          </button>
        </div>
      )}
    </div>
  );
};

export default VoteOptionsMenu;
