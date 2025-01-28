import { Ingredient, NutrientsItem } from '../domain/NutrientsItem.ts';
import { Header } from './Header.tsx';
import { Row } from './Row.tsx';
import { Mineral } from '../domain/Mineral.ts';
import { Summary } from './Summary.tsx';

export type DailyNutrientsProps = {
  day: number;
  items: Array<NutrientsItem>;
};

export function DailyNutrients({ day, items }: Readonly<DailyNutrientsProps>) {
  const minerals: Mineral[] = ['potassium', 'sodium', 'magnesium', 'zinc', 'copper'];
  const flattenedIngredients: Ingredient[] = items.flatMap((i) => i.nutrients ?? []);
  return (
    <div className="space-y-4">
      <h1 className="text-3xl">{new Date(day).toLocaleDateString()}</h1>
      <Header minerals={minerals} />
      {items.map(({ id, description, nutrients }) => (
        <div id={id} key={id}>
          <span className="italic underline">{description}</span>
          {nutrients?.map((i) => <Row ingredient={i} key={i.name} minerals={minerals} />)}
          <Summary ingredients={nutrients ?? []} minerals={minerals} />
        </div>
      ))}
      <Summary ingredients={flattenedIngredients} minerals={minerals} />
    </div>
  );
}
