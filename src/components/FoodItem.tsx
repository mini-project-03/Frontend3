import React from 'react';

interface FoodItemProps {
  title: string;
  votes: number;
  totalVotes: number;
  id: number;
  meetingStartTime: string;
  creatorId: string;
}

const FoodItem: React.FC<FoodItemProps> = ({
  title,
  votes,
  totalVotes,
  id,
  meetingStartTime,
  creatorId,
}) => {
  const votePercentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

  const images = [
    '/public/food1.png',
    '/public/food2.png',
    '/public/image 15.png',
    '/public/image 16.png',
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  // 약속 시간 형식화 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  return (
    <div key={id} className="bg-item-background p-6 rounded-md shadow-md w-[309px] h-[427px]">
      <div className="mb-4">
        <img
          src={randomImage}
          alt={title}
          className="w-[260px] h-[260px] object-cover rounded-t-lg mb-4"
        />

        <h3 className="text-l font-semibold mt-2 text-primary">{title}</h3>

        <p className="text-white mt-2">작성자: {creatorId}</p>

        <div className="flex justify-between text-white mt-2">
          <p>{formatDate(meetingStartTime)}</p>
          <p className="text-secondary">
            {votes}/{totalVotes}
          </p>
        </div>

        <div className="w-full h-4 rounded-full mt-2">
          <div
            className="bg-secondary h-4 rounded-full"
            style={{ width: `${votePercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
