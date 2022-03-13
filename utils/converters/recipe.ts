import { Prisma } from "@prisma/client";
import { EagerRecipe } from "models/eagerRecipe";

/** Wipes out the ingredients, which (currrently) need to be inserted separately */
export function fullRecipeToPrismaCreate(
  fullRecipe: EagerRecipe
): Prisma.RecipeCreateInput {
  const prismaRecipe: Prisma.RecipeCreateInput = {
    // Start with fullRecipe fields
    ...fullRecipe,
    // set methodSteps to undefined to add later (different structure)
    methodSteps: undefined,
    // this is only ever set by the database upon creation
    createdAt: undefined,
  };

  // Add the method steps (if exist)
  if (fullRecipe.methodSteps?.length) {
    prismaRecipe.methodSteps = {
      createMany: {
        data: fullRecipe.methodSteps.map((step) => ({
          ...step,
          id: undefined,
          recipeId: undefined,
          ingredients: undefined,
        })),
      },
    };
  }
  return prismaRecipe;
}

export function fullRecipeToPrismaUpdate(
  fullRecipe: EagerRecipe
): Prisma.RecipeUpdateInput {
  // start with the "insert" type. This is castable to the update input
  const insertRecipe: Prisma.RecipeUpdateInput =
    fullRecipeToPrismaCreate(fullRecipe);
  // we will need to delete all method steps, before creating the new ones
  // so add deleteMany: { } to the object
  //! Operations occur in order, so deleteMany must be defined first
  insertRecipe.methodSteps = { deleteMany: {}, ...insertRecipe.methodSteps };
  return insertRecipe;
}
