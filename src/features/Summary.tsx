import { Ingredient } from '../domain/NutrientsItem.ts';
import { Mineral, Minerals } from '../domain/Mineral.ts';
import { Vitamin, Vitamins } from '../domain/Vitamin.ts';
import { Row } from './Row.tsx';

type Props = {
  ingredients: Ingredient[];
  minerals: Mineral[];
};

export function Summary({ ingredients, minerals }: Readonly<Props>) {
  const summary = sum(ingredients);
  return <Row ingredient={summary} minerals={minerals} />;
}

const initial = () => ({
  name: 'Total',
  nutrients: {
    macro: {
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    minerals: Minerals.reduce(
      (acc, mineral) => {
        acc[mineral] = 0;
        return acc;
      },
      {} as Record<Mineral, number>
    ),
    vitamins: Vitamins.reduce(
      (acc, vitamin) => {
        acc[vitamin] = 0;
        return acc;
      },
      {} as Record<Vitamin, number>
    ),
  },
});

export function sum(ingredients: Ingredient[]): Ingredient {
  return ingredients.reduce((acc, ingredient) => {
    acc.nutrients.macro.fat += ingredient.nutrients.macro.fat;
    acc.nutrients.macro.carbs += ingredient.nutrients.macro.carbs;
    acc.nutrients.macro.protein += ingredient.nutrients.macro.protein;

    Minerals.forEach((mineral) => {
      acc.nutrients.minerals[mineral]! += ingredient.nutrients.minerals[mineral] ?? 0;
    });

    Vitamins.forEach((vitamin) => {
      acc.nutrients.vitamins[vitamin]! += ingredient.nutrients.vitamins[vitamin] ?? 0;
    });

    return acc;
  }, initial());
}
