export function roundToDecimalPlaces(decimalPlaceFactor: number = 100) {
  return (n: number) => Math.floor(n * decimalPlaceFactor) / decimalPlaceFactor;
}
