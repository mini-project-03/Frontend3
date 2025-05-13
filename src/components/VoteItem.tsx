import React from 'react';

interface VoteItemProps {
  title: string;
  participants: number;
  recruit: number;
  id: number;
  meetingStartTime: string;
  creatorId: string;
}

const FoodItem: React.FC<VoteItemProps> = ({
  title,
  participants,
  recruit,
  id,
  meetingStartTime,
  creatorId,
}) => {
  const votePercentage = recruit > 0 ? (participants / recruit) * 100 : 0;

  const images = [
    '/public/food1.png',
    '/public/food2.png',
    '/public/food3.png',
    '/public/food4.png',
    '/public/food5.png',
    '/public/food6.png',
    '/public/food7.png',
    '/public/food8.png',
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];

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

        <p className="text-white mt-2">{creatorId}</p>

        <div className="flex justify-between text-white mt-2">
          <p>{formatDate(meetingStartTime)}</p>
          <p className="text-secondary">
            {participants || 0}/{recruit || 0}
          </p>
        </div>

        <div className="bg-white w-full h-6 rounded-full mt-2">
          <div
            className="bg-secondary h-6 rounded-full"
            style={{ width: `${votePercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
