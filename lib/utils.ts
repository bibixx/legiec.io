import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNotNullable = <T>(el: T | null | undefined): el is T => {
  return el != null;
};

export const mapAndStrip = <InputType, OutputType, InvalidType>(
  array: InputType[],
  predicate: (value: InputType) => OutputType | InvalidType,
  shouldBeKept: (value: OutputType | InvalidType) => value is OutputType
) => {
  return array.reduce((acc, el) => {
    const value = predicate(el);

    if (shouldBeKept(value)) {
      acc.push(value);
    }

    return acc;
  }, [] as OutputType[]);
};

export const mapAndStripNullable = <InputType, OutputType>(
  array: InputType[],
  predicate: (value: InputType) => OutputType | null | undefined
): OutputType[] => mapAndStrip(array, predicate, isNotNullable<OutputType>);

export const sleep = (t: number) => new Promise((r) => setTimeout(r, t));

export class PromiseWithResolvers<T, E = Error> {
  public resolve!: (value: T) => void;
  public reject!: (value: E) => void;

  public promise: Promise<T>;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export const FLATTENED_ZOD_ROOT = Symbol.for("flattenedZodRoot");
export function flattenZodErrors(zodErrors: ZodError) {
  const errors: Record<string | symbol, string> = {};

  for (let i = zodErrors.issues.length - 1; i >= 0; i--) {
    const issue = zodErrors.issues[i];
    const key =
      issue.path.length === 0 ? FLATTENED_ZOD_ROOT : issue.path.join(".");

    errors[key] = issue.message;
  }

  return errors;
}

export type Result<T, E = string> =
  | { ok: true; result: T }
  | { ok: false; error: E };
