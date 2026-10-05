export type Verdict = "Clean" | "Flag";

export interface Item {
  id: string;
  time: string;
  lane: number;
  scoreFromZeroToOne: number;
  verdict: Verdict;
}

export const SCORE_THRESHOLD = 0.6;

export const RECENT_ITEMS: readonly Item[] = [
  { id: "ITM-0412880", time: "14:35:09", lane: 1, scoreFromZeroToOne: 0.08, verdict: "Clean" },
  { id: "ITM-0412879", time: "14:35:08", lane: 3, scoreFromZeroToOne: 0.12, verdict: "Clean" },
  { id: "ITM-0412878", time: "14:35:06", lane: 2, scoreFromZeroToOne: 0.05, verdict: "Clean" },
  { id: "ITM-0412877", time: "14:35:04", lane: 1, scoreFromZeroToOne: 0.19, verdict: "Clean" },
  { id: "ITM-0412876", time: "14:35:03", lane: 2, scoreFromZeroToOne: 0.71, verdict: "Flag" },
  { id: "ITM-0412875", time: "14:35:01", lane: 3, scoreFromZeroToOne: 0.1, verdict: "Clean" },
  { id: "ITM-0412874", time: "14:34:59", lane: 1, scoreFromZeroToOne: 0.07, verdict: "Clean" },
  { id: "ITM-0412873", time: "14:34:58", lane: 2, scoreFromZeroToOne: 0.15, verdict: "Clean" },
  { id: "ITM-0412872", time: "14:34:56", lane: 3, scoreFromZeroToOne: 0.22, verdict: "Clean" },
  { id: "ITM-0412871", time: "14:34:54", lane: 2, scoreFromZeroToOne: 0.84, verdict: "Flag" },
  { id: "ITM-0412870", time: "14:34:53", lane: 1, scoreFromZeroToOne: 0.09, verdict: "Clean" },
  { id: "ITM-0412869", time: "14:34:51", lane: 3, scoreFromZeroToOne: 0.11, verdict: "Clean" },
];

export const GEOMETRY = {
  scanToActuatorDistanceM: 2.4,
  beltSpeedMps: 1.2,
  ejectionCountdownS: 2.0,
} as const;
