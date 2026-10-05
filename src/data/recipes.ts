export interface Recipe {
  id: string;
  name: string;
  version: string;
  status: "Validated";
  locked: boolean;
  beltSpeedMps: number;
  sensitivity: "Medium" | "High";
  threshold: number;
  excitationNm: number;
  fluorescenceExposureMs: number;
  reflectanceExposureMs: number;
}

export const RECIPES: readonly Recipe[] = [
  { id: "RCP-PLT-01", name: "Poultry Breast Fillet", version: "1.0", status: "Validated", locked: true, beltSpeedMps: 1.2, sensitivity: "Medium", threshold: 0.6, excitationNm: 405, fluorescenceExposureMs: 2.5, reflectanceExposureMs: 0.6 },
  { id: "RCP-LGR-01", name: "Leafy Greens", version: "1.0", status: "Validated", locked: true, beltSpeedMps: 0.9, sensitivity: "High", threshold: 0.55, excitationNm: 405, fluorescenceExposureMs: 3.0, reflectanceExposureMs: 0.8 },
];
