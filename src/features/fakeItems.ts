import { Ingredient, NutrientsItem } from "../domain/NutrientsItem.ts";
import { Nutrients } from "../domain/Nutrients.ts";

export function generateFakeItem(description: string): NutrientsItem {
  const id = Math.random().toString();
  return {
    id,
    description,
    nutrients: [generateFakeIngredient(`${description.substring(0, 15)}`)],
  };
}

export function generateFakeIngredient(name: string): Ingredient {
  return {
    name,
    nutrients: generateFakeNutrients(),
  };
}

function generateFakeNutrients(): Nutrients {
  return {
    macro: {
      fat: Math.random() * 100,
      carbs: Math.random() * 100,
      protein: Math.random() * 100,
    },
    minerals: {
      magnesium: Math.random() * 100,
      potassium: Math.random() * 100,
      sodium: Math.random() * 100,
      molybdenum: Math.random() * 100,
      phosphorus: Math.random() * 100,
      selenium: Math.random() * 100,
      zinc: Math.random() * 100,
      chloride: Math.random() * 100,
      chromium: Math.random() * 100,
      copper: Math.random() * 100,
      iodine: Math.random() * 100,
      iron: Math.random() * 100,
      manganese: Math.random() * 100,
      calcium: Math.random() * 100,
    },
    vitamins: {
      A: Math.random() * 100,
      B1: Math.random() * 100,
      B2: Math.random() * 100,
      B3: Math.random() * 100,
      B5: Math.random() * 100,
      B6: Math.random() * 100,
      B7: Math.random() * 100,
      B9: Math.random() * 100,
      B11: Math.random() * 100,
      B12: Math.random() * 100,
      C: Math.random() * 100,
      D: Math.random() * 100,
      E: Math.random() * 100,
      K: Math.random() * 100,
    },
  };
}
