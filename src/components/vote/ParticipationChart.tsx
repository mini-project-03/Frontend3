interface Props {
  rate: number;
}

export default function ParticipationChart({ rate }: Props) {
  return (
    <div className="w-28 h-28 relative">
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-zinc-700"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-primary"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeDasharray={`${rate}, 100`}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-primary font-bold text-lg">
        {rate}%
      </div>
    </div>
  );
}
