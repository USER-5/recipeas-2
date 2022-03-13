import { PrismaClient } from "@prisma/client";
import { EagerRecipe } from "models/eagerRecipe";
import { cloneDeep } from "utils/cloneDeep";

const prisma = new PrismaClient();

export default async function getRecipe(id: string): Promise<EagerRecipe> {
  var recipe = await prisma.recipe
    .findUnique({
      where: { id: id },
      include: {
        methodSteps: {
          include: {
            ingredients: true,
          },
        },
      },
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  if (recipe) {
    recipe = cloneDeep(recipe);

    // this entire block is just to counter that ingredient amounts are returned as strings for some reason.
    // TODO when prisma get their shit together, this can be yeeted
    recipe.methodSteps = recipe.methodSteps?.map((step) => ({
      ...step,
      ingredients: step.ingredients.map((ingredient) => ({
        ...ingredient,
        amount: parseFloat(ingredient.amount as any),
      })),
    }));

    return recipe;
  } else {
    throw new Error("Not Found");
  }
}
