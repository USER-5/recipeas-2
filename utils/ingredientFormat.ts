import { Ingredient } from "@prisma/client";

export function ingredientFormat(ingredient: Ingredient): string {
  return `${ingredient.amount} ${ingredient.unit} of ${ingredient.name}${
    ingredient.notes && `, ${ingredient.notes}`
  }`;
}
