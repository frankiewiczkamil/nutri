import { Unit, UNIT } from "./Unit.ts";

export type Vitamin =
  | "A"
  | "B1"
  | "B2"
  | "B3"
  | "B5"
  | "B6"
  | "B7"
  | "B9"
  | "B11"
  | "B12"
  | "C"
  | "D"
  | "E"
  | "K";

const { mikrogram, miligram } = UNIT;

export const vitaminUnits: Record<Vitamin, Unit> = {
  A: mikrogram,
  B1: miligram,
  B2: miligram,
  B3: miligram,
  B5: miligram,
  B6: miligram,
  B7: mikrogram,
  B9: mikrogram,
  B11: mikrogram,
  B12: mikrogram,
  C: miligram,
  D: mikrogram,
  E: miligram,
  K: mikrogram,
} as const;
