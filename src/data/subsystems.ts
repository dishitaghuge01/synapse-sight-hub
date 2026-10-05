export type SubsystemStatus = "normal" | "warning" | "alarm";

export interface Subsystem {
  name: string;
  status: SubsystemStatus;
  detail: string;
}

export const SUBSYSTEMS: readonly Subsystem[] = [
  { name: "Camera", status: "normal", detail: "Streaming" },
  { name: "Lighting", status: "warning", detail: "405 nm intensity 94% of reference" },
  { name: "Edge node", status: "normal", detail: "Inference nominal" },
  { name: "PLC link", status: "normal", detail: "OPC UA connected" },
  { name: "Actuator", status: "warning", detail: "1 reject not confirmed" },
];
