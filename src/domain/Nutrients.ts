import { Vitamin } from './Vitamin.ts';
import { Mineral } from './Mineral.ts';
import { Macro } from './Macro.ts';

export type Nutrients = {
  macro: Macro;
  vitamins: Partial<Record<Vitamin, number>>;
  minerals: Partial<Record<Mineral, number>>;
};
