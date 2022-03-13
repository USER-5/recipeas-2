import { Ingredient, Prisma } from "@prisma/client";

export function ingredientToPrismaCreate(
  ingredient: Ingredient
): Prisma.IngredientCreateManyInput {
  return {
    ...ingredient,
    id: undefined,
  };
}
