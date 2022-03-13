export function unDefineNum(
  input: number | null | undefined,
  defaultValue: null | undefined = null
): number | null | undefined {
  return input ? input : defaultValue;
}
