export type Role = "Operator" | "QA Supervisor" | "Maintenance" | "Admin";

export const ROLES: readonly Role[] = ["Operator", "QA Supervisor", "Maintenance", "Admin"];

export const META = {
  product: "Synapse Inspect",
  version: "v1.0",
  site: "Demo Plant",
  line: "Line 03, Poultry Primary",
  activeRecipe: { id: "RCP-PLT-01", name: "Poultry Breast Fillet", version: "1.0", status: "Validated" },
  shift: "Shift B, 14:00 to 22:00",
  user: { id: "u.qa02", role: "QA Supervisor" as Role },
  clockStatic: "2026-10-05 14:35:12 IST",
  systemState: "Running",
} as const;
