export const Macroelements = ['fat', 'carbs', 'protein'] as const;

export type Macro = {
  fat: number;
  carbs: number;
  protein: number;
};

export type Macroelement = (typeof Macroelements)[number];
