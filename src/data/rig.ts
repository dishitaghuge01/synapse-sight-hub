export const RIG = {
  camera: { name: "VNIR line camera", status: "Streaming", sensorTempC: 36, lineRatePerS: 1500 },
  fluorescenceLight: { name: "405 nm LED line bar", intensityPctOfRef: 94, tempC: 41, hours: 1284 },
  reflectanceLight: { name: "Broadband LED line bar", intensityPctOfRef: 100, tempC: 38, hours: 1102 },
  strobeSync: { mode: "Alternating N / N+1", state: "Locked" },
  encoder: { beltSpeedMps: 1.2, state: "Locked" },
  edgeCompute: { name: "Edge compute module", gpuLoadPct: 46, tempC: 58, inferenceMs: 3.5, queueDepth: 2 },
  plcLink: { protocol: "OPC UA", state: "Connected", heartbeatMs: 8 },
  actuator: { fired: 37, confirmedRemoved: 35, notConfirmed: 1, pending: 1 },
  enclosure: { rating: "IP69K", internalTempC: 33, shroudDoorInterlock: "Closed" },
} as const;
