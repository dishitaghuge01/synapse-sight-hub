export type AlarmPriority = "critical" | "high" | "medium" | "low";
export type AlarmState = "Active unacknowledged" | "Active acknowledged" | "Shelved" | "Cleared";

export interface Alarm {
  id: string;
  priority: AlarmPriority;
  message: string;
  state: AlarmState;
  raisedAt: string;
  clearedAt?: string;
  setpoint: string;
  deadband: string;
}

export const ALARMS: readonly Alarm[] = [
  { id: "AL-0107", priority: "critical", message: "Reject not confirmed for ITM-0412855", state: "Active unacknowledged", raisedAt: "14:31:40", setpoint: "Confirm within 3.0 s", deadband: "n/a" },
  { id: "AL-0106", priority: "high", message: "405 nm LED intensity below 95% of reference (94%)", state: "Active unacknowledged", raisedAt: "14:12:05", setpoint: "95%", deadband: "1%" },
  { id: "AL-0105", priority: "medium", message: "White reference older than 8 h (8 h 12 min)", state: "Active acknowledged", raisedAt: "14:23:00", setpoint: "8 h", deadband: "10 min" },
  { id: "AL-0104", priority: "low", message: "PLC heartbeat latency above 15 ms (17 ms)", state: "Shelved", raisedAt: "13:48:22", setpoint: "15 ms", deadband: "2 ms" },
  { id: "AL-0103", priority: "medium", message: "Flag rate above warning limit (0.52%)", state: "Cleared", raisedAt: "11:02:10", clearedAt: "11:20:45", setpoint: "0.50%", deadband: "0.05%" },
  { id: "AL-0102", priority: "low", message: "Shift handover note pending", state: "Cleared", raisedAt: "13:58:00", clearedAt: "14:02:30", setpoint: "n/a", deadband: "n/a" },
];
