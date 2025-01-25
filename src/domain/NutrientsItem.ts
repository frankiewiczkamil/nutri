import { Nutrients } from "./Nutrients.ts";

export type NutrientsItem = {
  id: string;
  description: string;
  nutrients: Array<Ingredient>;
};

export type Ingredient = {
  name: string;
  nutrients: Nutrients;
};
