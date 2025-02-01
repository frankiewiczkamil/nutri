import { Mineral, mineralUnits } from '../domain/Mineral.ts';
import { unitLabels } from '../domain/Unit.ts';
import { Macroelement } from '../domain/Macro.ts';
import { Vitamin, vitaminUnits } from '../domain/Vitamin.ts';

type HeaderProps = {
  selectedMinerals: Mineral[];
  selectedVitamins: Vitamin[];
  selectedMacroelements: Macroelement[];
};

export function Header({ selectedMinerals, selectedMacroelements, selectedVitamins }: Readonly<HeaderProps>) {
  return (
    <div className="flex flex-row font-bold bg-white sticky top-0 z-10 border-b mb-2 pb-2">
      {selectedMacroelements.map((m) => (
        <div className="flex-1" key={m}>
          {m}
          <br />
          (g)
        </div>
      ))}
      {selectedVitamins.map((v) => (
        <div className="flex-1" key={v}>
          {v}
          <br />({unitLabels[vitaminUnits[v]]})
        </div>
      ))}
      {selectedMinerals.map((m) => (
        <div className="flex-1" key={m}>
          {m}
          <br />({unitLabels[mineralUnits[m]]})
        </div>
      ))}
    </div>
  );
}
