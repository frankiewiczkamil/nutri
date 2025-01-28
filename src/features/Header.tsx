import { Mineral, mineralUnits } from '../domain/Mineral.ts';
import { unitLabels } from '../domain/Unit.ts';

type HeaderProps = {
  minerals: Mineral[];
};

export function Header({ minerals }: Readonly<HeaderProps>) {
  return (
    <div className="flex flex-row font-bold bg-white sticky top-0 z-10 border-b mb-2 pb-2">
      {minerals.map((m) => (
        <div className="flex-1" key={m}>
          {m}
          <br />({unitLabels[mineralUnits[m]]})
        </div>
      ))}
    </div>
  );
}
