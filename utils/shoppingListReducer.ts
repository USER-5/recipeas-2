import { Ingredient } from "@prisma/client";

export function shoppingListReducer(
  previousValue?: Ingredient[],
  currentValue?: Ingredient
): Ingredient[] {
  // handling undefined-s
  if (!previousValue) {
    previousValue = [];
  }
  if (!currentValue) {
    // how?
    return previousValue;
  }

  // check for a match
  const index = previousValue?.findIndex(
    (value) =>
      // yeah we need a very exact match. At least it's case-insensitive...
      value.name.toLowerCase() === currentValue?.name.toLowerCase() &&
      value.unit.toLowerCase() === currentValue?.unit.toLowerCase() &&
      value.notes.toLowerCase() === currentValue?.notes.toLowerCase()
  );

  // if a match, accumulate the amount
  if (index !== -1 && previousValue) {
    previousValue[index] = {
      ...previousValue[index],
      amount: previousValue[index].amount + currentValue?.amount,
    };
  } else {
    // otherwise, add a new entry
    previousValue.push(currentValue);
  }
  return previousValue;
}
