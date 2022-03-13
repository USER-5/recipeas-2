/** Determines if the input value is defined, and not null */
export function defined(value: any) {
  return value !== undefined && value !== null;
}

/** If the input is null or undefined, it'll return the default value */
export function makeDefinedNum(
  input: number | null | undefined,
  defaultValue?: number
): number;
export function makeDefinedNum(
  input: number | null | undefined,
  defaultValue: null
): number | null;
export function makeDefinedNum(
  input: number | null | undefined,
  defaultValue: number | null | undefined = 0
): number | null {
  return defined(input) ? (input as number) : defaultValue;
}

/** If the input is null or undefined, it'll return the default value */
export function makeDefinedStr(
  input: string | null | undefined,
  defaultValue?: string
): string;
export function makeDefinedStr(
  input: string | null | undefined,
  defaultValue: null
): string | null;
export function makeDefinedStr(
  input: string | null | undefined,
  defaultValue: string | null | undefined = ""
): string | null {
  return defined(input) ? (input as string) : defaultValue;
}
