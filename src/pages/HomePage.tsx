import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FoodAPI } from '@/api/foodAPI';
import FoodItem from '@/components/FoodItem';

const HomePage = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState<any[]>([]);

  const handleClick = () => {
    navigate('/login');
  };

  // 임시 음식 데이터(테스트용이라서 나중에 삭제할 예정임두)
  const testFoods = [
    {
      voteId: 1,
      title: '김밥 먹을 사람?',
      votes: 4,
      totalVotes: 6,
      meetingStartTime: '2023-12-01T12:00:00',
      creatorId: '김씨',
    },
    {
      voteId: 2,
      title: '비빔밥 먹을 사람?',
      votes: 3,
      totalVotes: 5,
      meetingStartTime: '2023-12-02T12:00:00',
      creatorId: '이씨',
    },
    {
      voteId: 3,
      title: '짜장면 먹을 사람?',
      votes: 2,
      totalVotes: 7,
      meetingStartTime: '2023-12-03T12:00:00',
      creatorId: '배씨',
    },
    {
      voteId: 4,
      title: '피자 먹을 사람?',
      votes: 1,
      totalVotes: 3,
      meetingStartTime: '2023-12-04T12:00:00',
      creatorId: '홍씨',
    },
    {
      voteId: 5,
      title: '햄버거 먹을 사람?',
      votes: 6,
      totalVotes: 8,
      meetingStartTime: '2023-12-05T12:00:00',
      creatorId: '박씨',
    },
    {
      voteId: 6,
      title: '무신사 먹을 사람?',
      votes: 6,
      totalVotes: 8,
      meetingStartTime: '2023-12-05T12:00:00',
      creatorId: '박2씨',
    },
  ];

  // 음식 데이터 가져오기
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodData = await FoodAPI.getFoods();
        setFoods(foodData);
      } catch (error) {
        console.error('음식 데이터를 가져오는 데 실패:', error);
        setFoods(testFoods);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="container overflow-hidden mx-auto px-4 py-4 flex gap-6">
      <div className="flex-1 grid gap-4 overflow-y-auto h-[770px] grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
        {foods.map((food) => (
          <div key={food.voteId} className="bg-gray-800 p-4 rounded-lg">
            <FoodItem
              title={food.title}
              votes={food.votes}
              totalVotes={food.totalVotes}
              id={food.voteId}
              meetingStartTime={food.meetingStartTime}
              creatorId={food.creatorId}
            />
          </div>
        ))}
      </div>

      {/* 랭킹은 일단 비워두겠숩니ㅏ */}
      <div className="w-1/4 bg-secondary h-[770px] rounded-lg p-4 flex flex-col justify-around items-center">
        <h2 className="text-black mb-4">랭킹...아직 준비중...좀만 기달 </h2>
      </div>

      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
export default HomePage;
