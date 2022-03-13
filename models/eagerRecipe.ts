import { Ingredient, MethodStep, Recipe } from "@prisma/client";
import { makeDefinedNum } from "utils/define";

export type FullMethodStep = MethodStep & { ingredients?: Ingredient[] };
export type EagerRecipe = Recipe & { methodSteps?: FullMethodStep[] };

export const DEFAULT_FULL_RECIPE: EagerRecipe = {
  id: "",
  title: "",
  createdAt: new Date(),
  servings: 4,
  handsOnMinutes: null,
  totalMinutes: null,
  image: null,
};

export function getDefaultStep(index: number): FullMethodStep {
  return {
    id: "",
    index,
    mainText: "",
    title: "",
    recipeId: "",
  };
}

export function stepEffectivelyNull(step: FullMethodStep): boolean {
  return (
    step.title.trim() === "" &&
    step.mainText.trim() === "" &&
    (step.ingredients || []).every(ingredientEffectivelyNull)
  );
}

export function getDefaultIngredient(): Ingredient {
  return {
    id: Math.random().toString(),
    methodStepId: "",
    name: "",
    unit: "",
    amount: undefined as any,
    notes: "",
  };
}

export function ingredientEffectivelyNull(ingredient: Ingredient): boolean {
  return (
    makeDefinedNum(ingredient.amount) === 0 &&
    ingredient.name.trim() === "" &&
    ingredient.unit.trim() === "" &&
    ingredient.notes.trim() === "" &&
    ingredient.unit.trim() === ""
  );
}
