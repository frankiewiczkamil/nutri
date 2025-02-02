import './App.css';
import { DailyNutrients } from './features/DailyNutrients.tsx';
import { AddItem } from './features/AddItem.tsx';
import { useEffect, useState } from 'react';
import { getMidnightTimestamp } from './util/date.ts';
import { addItem, getPastDaysMetadata, readItemsByDay } from './infra/storage/store.ts';
import { NutrientsItem } from './domain/NutrientsItem.ts';
import { ask, getGroqApiKey } from './infra/ai/groq.ts';
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
import { AiSettings } from './features/ai-provider/AiSettings.tsx';
import { settings } from './assets/icons/settings.tsx';
import { tune } from './assets/icons/tune.tsx';

export type State = 'initializing' | 'loading' | 'loaded' | 'error';
export type Osd = 'tune' | 'settings' | 'none';

function App() {
  const [day, setDay] = useState(getMidnightTimestamp(Date.now()));
  const [daysMetadata, setDaysMetadata] = useState<Record<number, number>>({});
  const [items, setItems] = useState<NutrientsItem[]>([]);
  const [state, setState] = useState<State>('initializing');
  const [selectedVitamins, setSelectedVitamins] = useState<Vitamin[]>(getSelectedVitamins() || ['C', 'B12']);
  const [selectedMinerals, setSelectedMinerals] = useState<Mineral[]>(getSelectedMinerals() || ['potassium', 'sodium', 'magnesium']);
  const [selectedMacroelements, setSelectedMacroelements] = useState<Macroelement[]>(getSelectedMacroelements() || ['fat']);
  const [osd, setOsd] = useState<Osd>(!getGroqApiKey() ? 'settings' : 'none');
  async function add(description: string) {
    const newItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      description,
      nutrients: await ask(description),
    };
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
      <nav className="bg-black text-white flex justify-between">
        <DayPicker daysMetadata={daysMetadata} pickDay={pickDay} selectedDay={day} />
        <div className="flex align-bottom">
          <button className="pr-1" onClick={() => setOsd('tune')}>
            {tune}
          </button>
          <button className="pr-1" onClick={() => setOsd('settings')}>
            {settings}
          </button>
        </div>
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
        {osd === 'settings' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-3 shadow-lg max-w-lg w-full flex flex-col space-y-4">
              <AiSettings />
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 self-end" onClick={() => setOsd('none')}>
                Ok
              </button>
            </div>
          </div>
        )}
        {osd === 'tune' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-3 shadow-lg max-w-lg w-full flex flex-col">
              <NutriPicker
                selectedMacroelements={selectedMacroelements}
                selectedMinerals={selectedMinerals}
                selectedVitamins={selectedVitamins}
                toggleMacroelement={toggleMacroelement}
                toggleMineral={toggleMineral}
                toggleVitamin={toggleVitamin}
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 self-end" onClick={() => setOsd('none')}>
                Ok
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function getDaysMetadata(today: number) {
  const daysMetadata = getPastDaysMetadata();
  if (daysMetadata[today] === undefined) {
    daysMetadata[today] = 0;
  }
  return daysMetadata;
}
export default App;
