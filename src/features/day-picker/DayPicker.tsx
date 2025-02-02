import { isDayBeforeYesterday, isToday, isYesterday } from '../../util/date.ts';

type Props = {
  daysMetadata: Record<number, number>;
  pickDay: (day: number) => void;
  selectedDay: number;
};

export function DayPicker({ daysMetadata, pickDay, selectedDay }: Readonly<Props>) {
  return (
    <div className="flex  overflow-auto">
      {Object.keys(daysMetadata)
        .sort((a, b) => b.localeCompare(a))
        .map((day) => (
          <button key={day} onClick={() => pickDay(Number(day))} className={'p-1 hover:bg-neutral-800' + (day === '' + selectedDay ? ' bg-neutral-800' : '')}>
            {getDayString(Number(day))}
          </button>
        ))}
    </div>
  );
}

function getDayString(day: number) {
  if (isToday(day)) {
    return 'Today';
  } else if (isYesterday(day)) {
    return 'Yesterday';
  } else if (isDayBeforeYesterday(day)) {
    return 'Day B. Y.';
  }

  return new Date(day).toLocaleDateString();
}
