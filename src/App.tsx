import './App.css';
import { DailyNutrients } from './features/DailyNutrients.tsx';
import { AddItem } from './features/AddItem.tsx';
import { useEffect, useState } from 'react';
import { getMidnightTimestamp } from './util/date.ts';
import { addItem, getPastDaysMetadata, readItemsByDay } from './infra/storage/store.ts';
import { NutrientsItem } from './domain/NutrientsItem.ts';
import { ask } from './infra/ai/groq.ts';
import { DayPicker } from './features/day-picker/DayPicker.tsx';

export type State = 'initializing' | 'loading' | 'loaded' | 'error';

function App() {
  const [day, setDay] = useState(getMidnightTimestamp(Date.now()));
  const [daysMetadata, setDaysMetadata] = useState<Record<number, number>>({});
  const [items, setItems] = useState<NutrientsItem[]>([]);
  const [state, setState] = useState<State>('initializing');

  async function add(description: string) {
    const newItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      description,
      nutrients: await ask(description),
    };
    console.log(newItem);
    // const newItem = generateFakeItem(desc);
    addItem(newItem);
    setItems([newItem, ...items]);
  }

  async function pickDay(day: number) {
    setDay(day);
    setState('loading');
    setItems(await readItemsByDay(day));
    setState('loaded');
  }

  useEffect(() => {
    async function init() {
      setItems(await readItemsByDay(day));
      setDaysMetadata(getDaysMetadata(day));
      setState('loaded');
    }
    init();
  }, []);

  return (
    <>
      <nav>
        <DayPicker daysMetadata={daysMetadata} pickDay={pickDay} selectedDay={day} />
      </nav>
      <main className="p-2">
        <AddItem add={add} />
        {state !== 'initializing' && <DailyNutrients day={day} items={items} />}
      </main>
    </>
  );
}

function getDaysMetadata(today: number) {
  const daysMetadata = getPastDaysMetadata();
  if (daysMetadata[today] === undefined) {
    daysMetadata[today] = 0;
  }
  console.log(daysMetadata);
  return daysMetadata;
}
export default App;
