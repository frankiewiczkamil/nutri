import { Vitamin, Vitamins } from '../domain/Vitamin.ts';
import { Mineral, Minerals } from '../domain/Mineral.ts';
import { Macroelement, Macroelements } from '../domain/Macro.ts';

type Props = {
  selectedMacroelements: Macroelement[];
  selectedMinerals: Mineral[];
  selectedVitamins: Vitamin[];
  toggleMacroelement: (macroelement: Macroelement) => void;
  toggleMineral: (mineral: Mineral) => void;
  toggleVitamin: (vitamin: Vitamin) => void;
};

export function NutriPicker({ selectedMinerals, selectedVitamins, selectedMacroelements, toggleMacroelement, toggleMineral, toggleVitamin }: Readonly<Props>) {
  return (
    <div className={'flex flex-col'}>
      <h3 className="font-bold mb-2">Calculated Nutritiens</h3>
      <span className="flex flex-row space-x-3">
        {Macroelements.map((m) => (
          <span className="" key={m}>
            <label htmlFor={'pick-' + m}>{m}</label>
            <input className="ml-1" type="checkbox" id={'pick-' + m} checked={selectedMacroelements.includes(m)} onChange={() => toggleMacroelement(m)} />
          </span>
        ))}
      </span>
      <div className="flex flex-row pt-2 space-x-5">
        <div>
          {Minerals.map((m) => (
            <div className="flex-1" key={m}>
              <input className="mr-1" type="checkbox" id={'pick-' + m} checked={selectedMinerals.includes(m)} onChange={() => toggleMineral(m)} />
              <label htmlFor={'pick-' + m}>{m}</label>
            </div>
          ))}
        </div>
        <div>
          {Vitamins.map((v) => (
            <div className="flex-1" key={v}>
              <input className="mr-1" type="checkbox" id={'pick-' + v} checked={selectedVitamins.includes(v)} onChange={() => toggleVitamin(v)} />
              <label htmlFor={'pick-' + v}>{v}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
