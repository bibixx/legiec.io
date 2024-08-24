export function safeParseInt(value: string, radix: number): number {
  const parsed = Number.parseInt(value, radix);

  return Number.isNaN(parsed) ? 0 : parsed;
}
