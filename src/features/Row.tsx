import { Mineral } from '../domain/Mineral.ts';
import { Ingredient } from '../domain/NutrientsItem.ts';
import { toFixedIfNecessary } from '../util/number.ts';

type Props = {
  minerals: Mineral[];
  ingredient: Ingredient;
};

export function Row({ minerals, ingredient }: Readonly<Props>) {
  return (
    <div className="border-b">
      <span className="text-sm">{ingredient.name}</span>
      <div className="flex flex-row">
        {minerals.map((m) => (
          <div className="flex-1" key={m}>
            {toFixedIfNecessary(ingredient.nutrients.minerals[m] ?? 0, 1)}
          </div>
        ))}
      </div>
    </div>
  );
}
