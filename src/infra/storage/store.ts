import { NutrientsItem } from '../../domain/NutrientsItem.ts';
import Dexie, { EntityTable } from 'dexie';
import { get24HourRange } from '../../util/date.ts';

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
