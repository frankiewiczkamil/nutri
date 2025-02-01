import './App.css';
import { DailyNutrients } from './features/DailyNutrients.tsx';
import { AddItem } from './features/AddItem.tsx';
import { useEffect, useState } from 'react';
import { getMidnightTimestamp } from './util/date.ts';
import { addItem, getPastDaysMetadata, readItemsByDay } from './infra/storage/store.ts';
import { NutrientsItem } from './domain/NutrientsItem.ts';
import { ask } from './infra/ai/groq.ts';
import { DayPicker } from './features/day-picker/DayPicker.tsx';
import { Vitamin } from './domain/Vitamin.ts';
import { Mineral } from './domain/Mineral.ts';
import { Macroelement } from './domain/Macro.ts';
import {
  getSelectedMacroelements,
  getSelectedMinerals,
  getSelectedVitamins,
  updateSelectedMacroelements,
  updateSelectedMinerals,
  updateSelectedVitamins,
} from './infra/storage/settings.ts';
import { NutriPicker } from './features/nutri-picker.tsx';

export type State = 'initializing' | 'loading' | 'loaded' | 'error';

function App() {
  const [day, setDay] = useState(getMidnightTimestamp(Date.now()));
  const [daysMetadata, setDaysMetadata] = useState<Record<number, number>>({});
  const [items, setItems] = useState<NutrientsItem[]>([]);
  const [state, setState] = useState<State>('initializing');
  const [selectedVitamins, setSelectedVitamins] = useState<Vitamin[]>(getSelectedVitamins() || ['C', 'B12']);
  const [selectedMinerals, setSelectedMinerals] = useState<Mineral[]>(getSelectedMinerals() || ['potassium', 'sodium', 'magnesium']);
  const [selectedMacroelements, setSelectedMacroelements] = useState<Macroelement[]>(getSelectedMacroelements() || ['fat']);

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

  function toggleVitamin(vitamin: Vitamin) {
    const updatedVitamins = selectedVitamins.includes(vitamin) ? selectedVitamins.filter((v) => v !== vitamin) : [...selectedVitamins, vitamin];
    setSelectedVitamins(updatedVitamins);
    updateSelectedVitamins(updatedVitamins);
  }

  function toggleMineral(mineral: Mineral) {
    const updatedMinerals = selectedMinerals.includes(mineral) ? selectedMinerals.filter((m) => m !== mineral) : [...selectedMinerals, mineral];
    setSelectedMinerals(updatedMinerals);
    updateSelectedMinerals(updatedMinerals);
  }

  function toggleMacroelement(macroelement: Macroelement) {
    const updatedMacroelements = selectedMacroelements.includes(macroelement)
      ? selectedMacroelements.filter((m) => m !== macroelement)
      : [...selectedMacroelements, macroelement];
    setSelectedMacroelements(updatedMacroelements);
    updateSelectedMacroelements(updatedMacroelements);
  }

  return (
    <>
      <nav>
        <DayPicker daysMetadata={daysMetadata} pickDay={pickDay} selectedDay={day} />
      </nav>
      <main className="p-2">
        <AddItem add={add} />
        {state !== 'initializing' && (
          <DailyNutrients
            day={day}
            items={items}
            selectedVitamins={selectedVitamins}
            selectedMinerals={selectedMinerals}
            selectedMacroelements={selectedMacroelements}
          />
        )}
        <div className="pt-5">
          <NutriPicker
            selectedMacroelements={selectedMacroelements}
            selectedMinerals={selectedMinerals}
            selectedVitamins={selectedVitamins}
            toggleMacroelement={toggleMacroelement}
            toggleMineral={toggleMineral}
            toggleVitamin={toggleVitamin}
          />
        </div>
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
