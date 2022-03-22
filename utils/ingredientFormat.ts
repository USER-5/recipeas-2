import { Ingredient } from "@prisma/client";
import { findFraction } from "./fractions";

export function ingredientFormat(
  ingredient: Pick<Ingredient, "amount" | "name" | "unit" | "notes">
): string {
  return `${findFraction(ingredient.amount)} ${ingredient.unit} of ${
    ingredient.name
  }${ingredient.notes && `, ${ingredient.notes}`}`;
}
