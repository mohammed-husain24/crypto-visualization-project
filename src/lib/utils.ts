export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function toTwoDigitHex(value: number): string {
  return value.toString(16).toUpperCase().padStart(2, "0");
}

export function chunkArray<T>(items: T[], size: number): T[][] {
  const output: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    output.push(items.slice(index, index + size));
  }

  return output;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const next = x % y;
    x = y;
    y = next;
  }

  return x;
}

export function isPrime(value: number): boolean {
  if (value < 2) {
    return false;
  }

  for (let divisor = 2; divisor * divisor <= value; divisor += 1) {
    if (value % divisor === 0) {
      return false;
    }
  }

  return true;
}

export function formatBits(bits: string, groupSize = 4): string {
  const groups = bits.match(new RegExp(`.{1,${groupSize}}`, "g")) ?? [];
  return groups.join(" ");
}
