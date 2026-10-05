export const CALIBRATION = {
  darkReference: { takenAt: "06:23", age: "8 h 12 min", state: "Due" },
  whiteReference: { takenAt: "06:23", age: "8 h 12 min", state: "Due" },
  flatField: { takenAt: "06:23", state: "OK" },
  checkTile: "Pass",
  endmemberLibrary: { name: "EML v2.3", classes: 3 },
  model: "CNN-HSI v1.4.2",
  referenceAgeLimit: "8 h",
} as const;
