interface Props {
  rate: number;
}

export default function ParticipationChart({ rate }: Props) {
  const circumference = 100;
  const offset = circumference - (rate / 100) * circumference;

  return (
    <div className="w-24 h-24 relative">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="15.9155"
          fill="none"
          stroke="#3f3f46" // zinc-700
          strokeWidth="4"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9155"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="100"
          strokeDashoffset={offset}
          className="text-primary transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-primary font-bold text-lg">
        {rate}%
      </div>
    </div>
  );
}
