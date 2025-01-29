import { NutrientsItem } from '../../domain/NutrientsItem.ts';
import Dexie, { EntityTable } from 'dexie';
import { get24HourRange, getMidnightTimestamp } from '../../util/date.ts';

const db = new Dexie('Nutri') as Dexie & {
  log: EntityTable<NutrientsItem, 'id'>;
};

db.version(1).stores({
  log: 'id, timestamp, deleted',
});

export function addItem(newItem: NutrientsItem): void {
  db.log.put(newItem);
}

export function readItemsByDay(timestamp: number): Promise<Array<NutrientsItem>> {
  return db.log
    .where('timestamp')
    .inAnyRange([get24HourRange(timestamp)])
    .toArray();
}

export function getPastDaysMetadata() {
  const dayPartitions: Record<number, number> = {};
  // naive impl blocking the thread, inefficient for large datasets
  // for the future some kind an async iterator is required
  db.log.each((item) => {
    const timestamp = getMidnightTimestamp(item.timestamp);
    if (dayPartitions[timestamp] === undefined) {
      dayPartitions[timestamp] = 0;
    }
    dayPartitions[timestamp] += item.nutrients?.length ?? 0;
  });

  return dayPartitions;
}
