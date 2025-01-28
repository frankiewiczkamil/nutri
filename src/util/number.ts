export function toFixedIfNecessary(num: number, decimalPlaces: number) {
  if (num % 1 !== 0) {
    return num.toFixed(decimalPlaces);
  } else {
    return num.toString();
  }
}
