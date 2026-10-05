export const FLAG_RATE_BY_SHIFT: readonly { shift: string; flagRatePct: number }[] = [
  { shift: "Shift A", flagRatePct: 0.27 },
  { shift: "Shift B", flagRatePct: 0.3 },
  { shift: "Shift C", flagRatePct: 0.25 },
];

export const FLAG_CATEGORIES_NOTE = "Screening categories, not species identification";
export const FLAG_CATEGORIES_TOTAL = 37;

export const FLAG_CATEGORIES: readonly { category: string; count: number }[] = [
  { category: "Biofilm-like fluorescence", count: 17 },
  { category: "Fecal-like fluorescence", count: 11 },
  { category: "Surface anomaly (reflectance)", count: 6 },
  { category: "Borderline, low confidence", count: 3 },
];

export const REJECT_VERIFICATION = {
  totalRejects: 37,
  summary: { confirmedRemoved: 35, notConfirmed: 1, pending: 1 },
  exceptions: [
    { itemId: "ITM-0412855", status: "Not confirmed" },
    { itemId: "ITM-0412876", status: "Pending" },
  ],
} as const;
