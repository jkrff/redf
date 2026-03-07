import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ShieldAlert, ShieldCheck, Shield } from "lucide-react";

interface ScoreBadgeProps {
  score: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function getScoreConfig(score: number) {
  if (score >= 80) {
    return {
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-900",
      label: "Excellent",
      icon: ShieldCheck,
    };
  }
  if (score >= 50) {
    return {
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-900",
      label: "Moderate",
      icon: Shield,
    };
  }
  return {
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200 dark:border-rose-900",
    label: "Hazardous",
    icon: ShieldAlert,
  };
}

export function ScoreBadge({ score, className, size = "md" }: ScoreBadgeProps) {
  const config = getScoreConfig(score);
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5 rounded-lg border",
    md: "px-3 py-1.5 text-sm gap-2 rounded-xl border-2",
    lg: "px-4 py-2 text-base gap-2.5 rounded-2xl border-2",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div
      className={twMerge(
        clsx(
          "inline-flex items-center font-bold font-display shadow-sm",
          config.bg,
          config.color,
          config.border,
          sizeClasses[size],
          className
        )
      )}
    >
      <Icon className={iconSizes[size]} strokeWidth={2.5} />
      <span>{score}/100</span>
    </div>
  );
}
