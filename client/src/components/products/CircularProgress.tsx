import { getScoreConfig } from "./ScoreBadge";

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({ 
  score, 
  size = 120, 
  strokeWidth = 10 
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  const config = getScoreConfig(score);

  // Map text classes to stroke colors for SVG
  let strokeColor = "stroke-primary";
  if (score >= 80) strokeColor = "stroke-emerald-500";
  else if (score >= 50) strokeColor = "stroke-amber-500";
  else strokeColor = "stroke-rose-500";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background Track */}
      <svg className="absolute transform -rotate-90" width={size} height={size}>
        <circle
          className="stroke-muted"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Fill */}
        <circle
          className={`${strokeColor} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className={`text-4xl font-black font-display tracking-tighter ${config.color}`}>
          {score}
        </span>
        <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-0.5">
          Score
        </span>
      </div>
    </div>
  );
}
