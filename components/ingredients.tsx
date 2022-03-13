import { NumberInput, TextInput } from "@mantine/core";
import { Ingredient } from "@prisma/client";
import {
  getDefaultIngredient,
  ingredientEffectivelyNull,
} from "models/eagerRecipe";
import React, { FC } from "react";
import { makeDefinedNum } from "utils/define";

type Props = {
  value?: Ingredient[];
  onChange: (ingr?: Ingredient[]) => void;
};

const Ingredients: FC<Props> = ({ value, onChange }) => {
  const createIngredient = (ingr?: Ingredient) => {
    onChange([...ingredients, ingr || blankIngredient]);
  };
  const deleteIngredient = (index: number) => {
    let modifiedIngr = [...ingredients];
    modifiedIngr.splice(index, 1);
    onChange(modifiedIngr);
  };

  const checkDelete = (index: number) => {
    if (
      ingredients.length > index &&
      ingredientEffectivelyNull(ingredients[index])
    ) {
      deleteIngredient(index);
    }
  };

  const ingredients = value || [];
  const blankIngredient = getDefaultIngredient();
  const updateIngredient = <T extends keyof Ingredient>(
    index: number,
    field: T,
    newValue: Ingredient[T]
  ) => {
    // if it's a new step, create it
    if (ingredients.length <= index) {
      if (!newValue) return;
      createIngredient({
        ...blankIngredient,
        [field]: newValue,
      });
    } else {
      const modifiedIngr = [...ingredients];
      modifiedIngr[index][field] = newValue;

      onChange(modifiedIngr);
    }
  };
  return (
    <div className="mt-6 pt-3">
      <h4>Ingredients</h4>
      {[...ingredients, blankIngredient].map((ingredient, index) => (
        <div
          key={ingredient.id}
          className="grid grid-cols-2 gap-3 p-3 py-6 border-b border-mt-gray-4 dark:border-mt-dark-3 last:border-0"
          onBlur={() => checkDelete(index)}
        >
          <TextInput
            label="Name"
            name="ingredient_name"
            placeholder="Carrot"
            value={ingredient.name}
            onChange={(event) =>
              updateIngredient(index, "name", event.target.value)
            }
          ></TextInput>
          <NumberInput
            label="Amount"
            placeholder="2.5"
            precision={3}
            value={ingredient.amount || undefined}
            inputMode="decimal"
            hideControls
            onChange={(val) =>
              updateIngredient(
                index,
                "amount",
                makeDefinedNum(val, null) as number
              )
            }
          ></NumberInput>
          <TextInput
            label="Unit"
            value={ingredient.unit}
            placeholder="Each"
            onChange={(event) =>
              updateIngredient(index, "unit", event.target.value)
            }
          ></TextInput>
          <TextInput
            label="Notes (Optional)"
            value={ingredient.notes}
            placeholder="Chopped"
            onChange={(event) =>
              updateIngredient(index, "notes", event.target.value)
            }
          ></TextInput>
        </div>
      ))}
    </div>
  );
};

export default Ingredients;
