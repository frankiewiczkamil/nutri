import { Mineral } from '../domain/Mineral.ts';
import { Ingredient } from '../domain/NutrientsItem.ts';
import { toFixedIfNecessary } from '../util/number.ts';
import { Macroelement } from '../domain/Macro.ts';
import { Vitamin } from '../domain/Vitamin.ts';

type Props = {
  selectedMinerals: Mineral[];
  selectedVitamins: Vitamin[];
  selectedMacroelements: Macroelement[];
  ingredient: Ingredient;
};

export function Row({ selectedMinerals, selectedMacroelements, selectedVitamins, ingredient }: Readonly<Props>) {
  return (
    <div className="border-b">
      <span className="text-sm">{ingredient.name}</span>
      <div className="flex flex-row">
        {selectedMacroelements.map((m) => (
          <div className="flex-1" key={m}>
            {toFixedIfNecessary(ingredient.nutrients.macro[m] ?? 0, 1)}
          </div>
        ))}
        {selectedMinerals.map((m) => (
          <div className="flex-1" key={m}>
            {toFixedIfNecessary(ingredient.nutrients.minerals[m] ?? 0, 1)}
          </div>
        ))}
        {selectedVitamins.map((v) => (
          <div className="flex-1" key={v}>
            {toFixedIfNecessary(ingredient.nutrients.vitamins[v] ?? 0, 1)}
          </div>
        ))}
      </div>
    </div>
  );
}
