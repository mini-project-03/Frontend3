import { FOOD_IMAGE_PATHS } from '@/constants/imagePaths';
import { useAnimation } from 'framer-motion';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useUIStore } from '@/stores/uiStore';
import RouletteItems from './RouletteItems';
import SelectedItemHighlight from './SelectedItemHighlight';
import { useRequireAuth } from '@/hooks/api/auth/useRequireAuth.ts';
import VoteFormModal from '@/components/vote/form/VoteFormModal.tsx';

const REPEAT_COUNT = 8;
const PADDING = 40;
const VISIBLE_ITEM_COUNT = 4;

const Roulette = () => {
  const controls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedGlobalIndex, setSelectedGlobalIndex] = useState<number | null>(null);
  const [containerHeight, setContainerHeight] = useState(window.innerHeight * 0.85);

  const openVoteForm = useUIStore((s) => s.openVoteForm); // ✅ 투표 모달 열기 함수
  const { requireAuth } = useRequireAuth();

  // 창 크기 변화에 따라 룰렛 높이 조정
  useEffect(() => {
    const handleResize = (): void => {
      setContainerHeight(window.innerHeight * 0.85);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 각 항목 높이 계산
  const visibleAreaHeight = useMemo(() => containerHeight - PADDING * 2, [containerHeight]);
  const itemHeight = useMemo(() => visibleAreaHeight / VISIBLE_ITEM_COUNT, [visibleAreaHeight]);
  const centerIndexOffset = useMemo(() => (VISIBLE_ITEM_COUNT - 1) / 2, []);

  // 전체 아이템 목록 생성 (반복 포함)
  const allItems = useMemo(
    () =>
      Array(REPEAT_COUNT)
        .fill(0)
        .flatMap(() => FOOD_IMAGE_PATHS),
    [],
  );

  // 룰렛 실행
  const handleStartRoulette = useCallback(async (): Promise<void> => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedIndex(null);
    setSelectedGlobalIndex(null);

    await controls.set({ y: 0 });

    const totalSpins = 30 + Math.floor(Math.random() * 10);
    const targetIndex = Math.floor(Math.random() * FOOD_IMAGE_PATHS.length);
    const globalTargetIndex = totalSpins + targetIndex;
    const totalOffset = (globalTargetIndex - centerIndexOffset) * itemHeight;

    await controls.start({
      y: -totalOffset,
      transition: { duration: 3, ease: [0.1, 0.7, 0.4, 1] },
    });

    setSelectedIndex(targetIndex);
    setSelectedGlobalIndex(globalTargetIndex);
    setIsSpinning(false);
  }, [controls, isSpinning, centerIndexOffset, itemHeight]);

  //투표 만들기 함수
  const handleOpenVoteForm = () => {
    requireAuth(() => {
      openVoteForm();
    });
  };

  return (
    <>
      <div className="flex flex-col items-center w-full h-full px-4 py-6 bg-gradient-to-br from-yellow-100 to-white rounded-2xl shadow-lg">
        <h1 className="text-gray-800 text-2xl font-semibold tracking-tight mb-4">🍽️ 오늘 모먹?</h1>

        <div
          className="relative w-full max-w-md overflow-hidden rounded-xl shadow-md"
          style={{ height: visibleAreaHeight }}
        >
          <RouletteItems
            controls={controls}
            allItems={allItems}
            selectedGlobalIndex={selectedGlobalIndex}
            selectedIndex={selectedIndex}
            itemHeight={itemHeight}
          />
          {selectedGlobalIndex !== null && <SelectedItemHighlight selectedIndex={selectedIndex} />}
        </div>

        <div className="mt-6 flex gap-3 w-full max-w-md">
          <button
            onClick={handleStartRoulette}
            disabled={isSpinning}
            className={`flex-1 px-4 py-3 rounded-full font-semibold tracking-wide text-white shadow transition-colors duration-300 ${
              isSpinning ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover'
            }`}
          >
            {isSpinning ? '돌리는 중...' : '메뉴 뽑기'}
          </button>

          <button
            onClick={handleOpenVoteForm}
            className="flex-1 px-4 py-3 bg-secondary text-white font-bold rounded-full shadow hover:bg-secondary-hover transition text-center"
            type="button"
          >
            투표 만들기
          </button>
        </div>
      </div>
      <VoteFormModal />
    </>
  );
};

export default Roulette;
