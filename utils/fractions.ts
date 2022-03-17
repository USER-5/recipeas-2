const ALLOWED_DENOMINATORS = [1, 2, 3, 4, 6, 8];
const LENIENCY = 0.01;

/**
 * Returns the best matching fraction, or the original number as a string
 * @param input the number to convert
 */
export function findFraction(input: number): string {
  // find the best denominator (first to match)
  const bestDenominator = ALLOWED_DENOMINATORS.find((denominator) => {
    const remainder = (input * denominator) % 1;
    return remainder === 0 || remainder < LENIENCY || remainder > 1 - LENIENCY;
  });

  // if none, return input parsed
  console.log("" + input + " " + bestDenominator);
  if (bestDenominator === 1 || bestDenominator === undefined) {
    return input.toString();
  }

  // subtract whole part, and find remainder as fraction
  const wholePart = Math.floor(input);
  const remainder = input - wholePart;
  const fractionPart = `${remainder * bestDenominator}\u2044${bestDenominator}`;

  // format
  if (wholePart) {
    return `${wholePart} ${fractionPart}`;
  } else {
    return fractionPart;
  }
}
