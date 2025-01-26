import { Nutrients } from './Nutrients.ts';

export type NutrientsItem = {
  id: string;
  timestamp: number;
  description: string;
  nutrients?: Array<Ingredient>;
  deleted?: boolean;
};

export type Ingredient = {
  name: string;
  nutrients: Nutrients;
};
