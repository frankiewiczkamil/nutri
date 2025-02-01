import { Ingredient, NutrientsItem } from '../domain/NutrientsItem.ts';
import { Header } from './Header.tsx';
import { Row } from './Row.tsx';
import { Mineral } from '../domain/Mineral.ts';
import { Summary } from './Summary.tsx';
import { Macroelement } from '../domain/Macro.ts';
import { Vitamin } from '../domain/Vitamin.ts';

export type DailyNutrientsProps = {
  day: number;
  items: Array<NutrientsItem>;
  selectedMacroelements: Macroelement[];
  selectedMinerals: Mineral[];
  selectedVitamins: Vitamin[];
};

export function DailyNutrients({ day, items, selectedVitamins, selectedMinerals, selectedMacroelements }: Readonly<DailyNutrientsProps>) {
  const flattenedIngredients: Ingredient[] = items.flatMap((i) => i.nutrients ?? []);
  return (
    <div className="space-y-4">
      <h1 className="text-3xl">{new Date(day).toLocaleDateString()}</h1>
      <Header selectedMinerals={selectedMinerals} selectedVitamins={selectedVitamins} selectedMacroelements={selectedMacroelements} />
      {items.map(({ id, description, nutrients }) => (
        <div id={id} key={id}>
          <span className="italic underline">{description}</span>
          {nutrients?.map((i) => (
            <Row
              ingredient={i}
              key={i.name}
              selectedMacroelements={selectedMacroelements}
              selectedMinerals={selectedMinerals}
              selectedVitamins={selectedVitamins}
            />
          ))}
          <Summary ingredients={nutrients ?? []} minerals={selectedMinerals} vitamins={selectedVitamins} macroelements={selectedMacroelements} />
        </div>
      ))}
      <Summary ingredients={flattenedIngredients} minerals={selectedMinerals} vitamins={selectedVitamins} macroelements={selectedMacroelements} />
    </div>
  );
}
