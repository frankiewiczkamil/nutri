export const DAY = 24 * 60 * 60 * 1000;

export function getMidnightTimestamp(timestamp: number): number {
  return timestamp - (timestamp % DAY);
}

export function isYesterday(timestamp: number): boolean {
  return timestamp === getMidnightTimestamp(Date.now()) - DAY;
}

export function isToday(timestamp: number): boolean {
  return timestamp === getMidnightTimestamp(Date.now());
}

export function isDayBeforeYesterday(timestamp: number): boolean {
  return timestamp === getMidnightTimestamp(Date.now()) - 2 * DAY;
}

export const get24HourRange = (timestamp: number): [number, number] => {
  const start = timestamp - (timestamp % DAY);
  return [start, start + DAY - 1];
};
