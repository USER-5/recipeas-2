import {
  EagerRecipe,
  ingredientEffectivelyNull,
  stepEffectivelyNull,
} from "models/eagerRecipe";

/** Cleans up a recipe for saving
 *  removes empty array elements, etc.
 * @param recipe
 */
export function cleanupRecipe(recipe: EagerRecipe): EagerRecipe {
  return {
    ...recipe,
    methodSteps: recipe.methodSteps
      ?.filter((step) => !stepEffectivelyNull(step))
      .map((step) => ({
        ...step,
        ingredients: step.ingredients?.filter(
          (ingredient) => !ingredientEffectivelyNull(ingredient)
        ),
      })),
  };
}
