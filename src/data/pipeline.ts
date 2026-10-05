export interface PipelineStage {
  step: number;
  stage: string;
  detail: string;
  ms: number;
}

export const PIPELINE_LABEL = "Illustrative design targets, not measured";

export const PIPELINE_STAGES: readonly PipelineStage[] = [
  { step: 1, stage: "Capture", detail: "Strobed fluorescence (N) and reflectance (N+1)", ms: 4.0 },
  { step: 2, stage: "Calibration", detail: "Dark and white reference, flat-field", ms: 0.8 },
  { step: 3, stage: "Fluorescence unmixing", detail: "Food autofluorescence vs contaminant", ms: 2.1 },
  { step: 4, stage: "MNF band reduction", detail: "Reflectance cube", ms: 1.2 },
  { step: 5, stage: "Feature fusion", detail: "Channel concatenation", ms: 0.4 },
  { step: 6, stage: "2D CNN", detail: "Classification on fused features", ms: 3.5 },
  { step: 7, stage: "Spatial filter and threshold", detail: "Adaptive threshold", ms: 0.5 },
  { step: 8, stage: "PLC signal", detail: "OPC UA to rejection actuator", ms: 1.2 },
];

export const PIPELINE_TOTAL_MS = 13.7;

export const PIPELINE_NOTE = "Per-item processing time. Actuator travel time (2.00 s) is separate.";
