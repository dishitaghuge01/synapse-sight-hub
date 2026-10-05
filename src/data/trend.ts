export interface TrendPoint {
  time: string;
  flagRatePct: number;
}

export const FLAG_RATE_TREND: readonly TrendPoint[] = [
  { time: "08:00", flagRatePct: 0.24 },
  { time: "08:30", flagRatePct: 0.27 },
  { time: "09:00", flagRatePct: 0.25 },
  { time: "09:30", flagRatePct: 0.29 },
  { time: "10:00", flagRatePct: 0.31 },
  { time: "10:30", flagRatePct: 0.28 },
  { time: "11:00", flagRatePct: 0.26 },
  { time: "11:30", flagRatePct: 0.3 },
  { time: "12:00", flagRatePct: 0.33 },
  { time: "12:30", flagRatePct: 0.29 },
  { time: "13:00", flagRatePct: 0.27 },
  { time: "13:30", flagRatePct: 0.31 },
  { time: "14:00", flagRatePct: 0.3 },
  { time: "14:30", flagRatePct: 0.3 },
];
