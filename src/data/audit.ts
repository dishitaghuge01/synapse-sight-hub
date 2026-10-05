import type { Role } from "./meta";

export interface AuditEntry {
  time: string;
  userId: string;
  role: Role;
  setting: string;
  from: string;
  to: string;
}

export const AUDIT_LOG: readonly AuditEntry[] = [
  { time: "2026-10-05 13:58", userId: "u.qa02", role: "QA Supervisor", setting: "Shift handover note", from: "none", to: "added" },
  { time: "2026-10-05 08:03", userId: "u.maint01", role: "Maintenance", setting: "405 nm LED bar", from: "replaced module 2", to: "reference re-measured" },
  { time: "2026-10-05 06:23", userId: "u.maint01", role: "Maintenance", setting: "White reference", from: "previous", to: "recaptured" },
  { time: "2026-10-04 21:40", userId: "u.qa02", role: "QA Supervisor", setting: "Active recipe", from: "RCP-LGR-01", to: "RCP-PLT-01" },
  { time: "2026-10-04 09:15", userId: "u.admin", role: "Admin", setting: "RCP-PLT-01", from: "Draft", to: "Validated v1.0" },
  { time: "2026-10-03 16:02", userId: "u.admin", role: "Admin", setting: "User u.operator1", from: "none", to: "created, role Operator" },
];
