import {
  Ingredient,
  MethodStep,
  Prisma,
  PrismaClient,
  Recipe,
} from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { EagerRecipe } from "models/eagerRecipe";
import { HTTPError } from "models/httpError";
import { ingredientToPrismaCreate } from "utils/converters/ingredient";
import {
  fullRecipeToPrismaCreate,
  fullRecipeToPrismaUpdate,
} from "utils/converters/recipe";
import { defined } from "utils/define";

export async function createRecipe(
  prisma: Pick<PrismaClient, "recipe" | "ingredient">,
  recipe: EagerRecipe
): Promise<Recipe> {
  const prismaRecipe = fullRecipeToPrismaCreate(recipe);
  // let the DB set this bad boi
  prismaRecipe.id = undefined;

  checkRecipeProps(prismaRecipe);

  const created = await prisma.recipe.create({
    data: prismaRecipe,
    include: { methodSteps: { include: { ingredients: true } } },
  });
  if (!created?.id) throw new HTTPError();

  // insert the ingredients
  const associatedIngredients = associateIngredients(created, recipe);
  await createIngredients(prisma, associatedIngredients);

  // we have at least some ingredients
  return created;
}

export async function createIngredients(
  prisma: Pick<PrismaClient, "ingredient">,
  ingredients: Ingredient[]
) {
  const prismaIngredients = ingredients.map(ingredientToPrismaCreate);
  if (
    ingredients.some(
      (ingredient) => !ingredient.name || !ingredient.amount || !ingredient.unit
    )
  ) {
    throw new HTTPError({
      message: "An ingredient is incomplete",
      code: StatusCodes.BAD_REQUEST,
    });
  }
  await prisma.ingredient.createMany({ data: prismaIngredients });
}

export async function updateRecipe(
  prisma: Pick<PrismaClient, "recipe" | "ingredient">,
  recipe: EagerRecipe
): Promise<void> {
  // request should contain a recipe to update
  const prismaRecipe = fullRecipeToPrismaUpdate(recipe);

  checkRecipeProps(prismaRecipe);
  if (!recipe.id) {
    throw new HTTPError({
      message: "ID not set",
      code: StatusCodes.BAD_REQUEST,
    });
  }

  const persistedRecipe = await prisma.recipe.update({
    where: {
      // trust the object's ID
      id: recipe.id as string,
    },
    data: {
      ...prismaRecipe,
    },
    include: {
      methodSteps: true,
    },
  });

  // insert the ingredients
  const associatedIngredients = associateIngredients(persistedRecipe, recipe);
  console.log(persistedRecipe);
  await createIngredients(prisma, associatedIngredients);
}

/** Throws meaningful errors if the object is bad */
function checkRecipeProps(
  recipe: Prisma.RecipeCreateInput | Prisma.RecipeUpdateInput
) {
  if (recipe.title && (recipe.title as string).trim().length === 0) {
    throw new HTTPError({
      message: "Title cannot be empty",
      code: StatusCodes.BAD_REQUEST,
    });
  }
  if (!defined(recipe.servings)) {
    throw new HTTPError({
      message: "Servings are required",
      code: StatusCodes.BAD_REQUEST,
    });
  }
}

/** Returns a flattened list of the ingredients, with associated step IDs
 *
 * @param persisted  The prisma-persisted recipe (with IDs)
 * @param original   The user-sent recipe (with ingredients, but not IDs)
 * @returns          A flattened list of ingredients, ready to be written to the database
 */
function associateIngredients(
  persisted: Recipe & {
    methodSteps: MethodStep[];
  },
  original: EagerRecipe
): Ingredient[] {
  return (
    original.methodSteps
      // only care about those with ingredients
      ?.filter((step) => step.ingredients?.length)
      // flatMap to the step's ingredients
      .flatMap((step) =>
        //* Traveral guarantee: we filtered out steps with no ingredients already
        step.ingredients!.map((ingredient) => ({
          ...ingredient,
          methodStepId:
            persisted.methodSteps?.find(
              (persistedStep) => persistedStep.index === step.index
            )!.id || "",
        }))
      ) || []
  );
}
