export function randomNumber(min: number, max: number, precision = 0) {
  const factor = Math.pow(10, precision);
  const value = Math.random() * (max - min) + min;

  return Math.round(value * factor) / factor;
}

export function randomBoolean() {
  return Math.random() < 0.5;
}
