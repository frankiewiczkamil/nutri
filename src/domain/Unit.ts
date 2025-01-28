export const UNIT = {
  kilogram: 3,
  gram: 0,
  miligram: -3,
  mikrogram: -6,
  nanogram: -9,
  picogram: -12,
} as const;

export type Unit = (typeof UNIT)[keyof typeof UNIT];

export const unitLabels: Record<Unit, string> = {
  [UNIT.kilogram]: 'kg',
  [UNIT.gram]: 'g',
  [UNIT.miligram]: 'mg',
  [UNIT.mikrogram]: 'µg',
  [UNIT.nanogram]: 'ng',
  [UNIT.picogram]: 'pg',
};
