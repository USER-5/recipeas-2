import { Ingredient } from "@prisma/client";
import { findFraction } from "./fractions";

export function ingredientFormat(ingredient: Ingredient): string {
  return `${findFraction(ingredient.amount)} ${ingredient.unit} of ${
    ingredient.name
  }${ingredient.notes && `, ${ingredient.notes}`}`;
}
