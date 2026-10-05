export interface Batch {
  lot: string;
  date: string;
  scanned: number;
  flagged: number;
  flagRatePct: number;
}

export const BATCHES: readonly Batch[] = [
  { lot: "LOT-261005-D", date: "2026-10-05", scanned: 2840, flagged: 9, flagRatePct: 0.32 },
  { lot: "LOT-261005-C", date: "2026-10-05", scanned: 2950, flagged: 7, flagRatePct: 0.24 },
  { lot: "LOT-261005-B", date: "2026-10-05", scanned: 3480, flagged: 12, flagRatePct: 0.34 },
  { lot: "LOT-261005-A", date: "2026-10-05", scanned: 3210, flagged: 9, flagRatePct: 0.28 },
  { lot: "LOT-261004-F", date: "2026-10-04", scanned: 3120, flagged: 8, flagRatePct: 0.26 },
  { lot: "LOT-261004-E", date: "2026-10-04", scanned: 3300, flagged: 10, flagRatePct: 0.3 },
];

export const BATCH_REJECTS = [
  { time: "13:42:18", itemId: "ITM-0412871", lane: "2", reason: "Biofilm-like fluorescence", verification: "Confirmed removed" },
  { time: "13:41:52", itemId: "ITM-0412876", lane: "1", reason: "Fecal-like fluorescence", verification: "Pending" },
  { time: "13:39:27", itemId: "ITM-0412855", lane: "2", reason: "Surface anomaly (reflectance)", verification: "Not confirmed" },
  { time: "13:37:04", itemId: "ITM-0412839", lane: "1", reason: "Biofilm-like fluorescence", verification: "Confirmed removed" },
] as const;

export const BATCH_WARNING_LIMIT = "0.50";
export const BATCH_REPORT_NOTICE = "Report generation is not part of this prototype.";
