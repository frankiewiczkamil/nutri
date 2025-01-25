export const UNIT = {
  kilogram: 3,
  gram: 0,
  miligram: -3,
  mikrogram: -6,
  nanogram: -9,
  picogram: -12,
} as const;

export type Unit = (typeof UNIT)[keyof typeof UNIT];
