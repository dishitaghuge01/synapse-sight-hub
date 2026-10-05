export const KPIS = {
  itemsScanned: 12480,
  flagged: 37,
  flagRatePct: 0.3,
  rejects: 37,
  throughputPerMin: 142,
  meanLatencyMs: 13.7,
  uptimePct: 98.7,
} as const;

export const FLAG_RATE_LIMITS = { warning: 0.5, alarm: 0.8 } as const;
