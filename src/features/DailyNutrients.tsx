import { NutrientsItem } from '../domain/NutrientsItem.ts';

export type DailyNutrientsProps = {
  day: number;
  items: Array<NutrientsItem>;
};

export function DailyNutrients({ day, items }: Readonly<DailyNutrientsProps>) {
  return (
    <div>
      <h1 className="text-3xl">{day}</h1>
      {items.map(({ id, description }) => (
        <div id={id} key={id}>
          {description}
        </div>
      ))}
    </div>
  );
}
