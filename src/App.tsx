import './App.css';
import { DailyNutrients } from './features/DailyNutrients.tsx';
import { AddItem } from './features/AddItem.tsx';
import { useEffect, useState } from 'react';
import { getMidnightTimestamp } from './util/date.ts';
import { addItem, readItemsByDay } from './infra/storage/store.ts';
import { NutrientsItem } from './domain/NutrientsItem.ts';
import { ask } from './infra/ai/groq.ts';

export type State = 'initializing' | 'loading' | 'loaded' | 'error';

function App() {
  const [day] = useState(getMidnightTimestamp(Date.now()));
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

  useEffect(() => {
    async function init() {
      setItems(await readItemsByDay(day));
      setState('loaded');
    }
    init();
  }, []);

  return (
    <div className={'p-2 max-w-md mx-auto'}>
      <AddItem add={add} />
      {state !== 'initializing' && <DailyNutrients day={day} items={items} />}
    </div>
  );
}

export default App;
