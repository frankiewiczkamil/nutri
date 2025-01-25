import { Vitamin } from "./Vitamin.ts";
import { Mineral } from "./Mineral.ts";

export type Nutrients = {
  macro: Macro;
  vitamins: Partial<Record<Vitamin, number>>;
  minerals: Partial<Record<Mineral, number>>;
};

type Macro = {
  fat: number;
  carbs: number;
  protein: number;
};
