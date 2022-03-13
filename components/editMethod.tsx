import { Textarea, TextInput } from "@mantine/core";
import {
  FullMethodStep,
  getDefaultStep,
  stepEffectivelyNull,
} from "models/eagerRecipe";
import React, { FC } from "react";
import Ingredients from "./ingredients";

type Props = {
  steps: FullMethodStep[];
  onStepsChange: (steps: FullMethodStep[]) => void;
};

const EditMethod: FC<Props> = ({ steps, onStepsChange }) => {
  const createStep = (step?: FullMethodStep) => {
    onStepsChange([...steps, step || getDefaultStep(steps.length)]);
  };
  const deleteStep = (index: number) => {
    let modifiedSteps = [...steps];
    modifiedSteps.splice(index, 1);
    modifiedSteps = renumberSteps(modifiedSteps);
    onStepsChange(modifiedSteps);
  };

  const renumberSteps = (steps: FullMethodStep[]) => {
    return steps.map((step, i) => {
      return { ...step, index: i };
    });
  };

  const updateStep = <T extends keyof FullMethodStep>(
    index: number,
    field: T,
    newValue: FullMethodStep[T]
  ) => {
    // if it's a new step, create it
    if (steps.length <= index) {
      createStep({ ...getDefaultStep(index), [field]: newValue });
    } else {
      const modifiedSteps = [...steps];
      modifiedSteps[index][field] = newValue;

      onStepsChange(modifiedSteps);
    }
  };
  const checkForDelete = (index: number) => {
    if (steps.length > index && stepEffectivelyNull(steps[index])) {
      deleteStep(index);
    }
  };
  return (
    <>
      {[...steps, getDefaultStep(steps.length)].map((step) => (
        <div
          key={step.index}
          className="shadow-md p-3 my-6 bg-mt-gray-0 dark:bg-mt-dark-6 rounded-md focus-within:shadow-lg"
          onBlur={() => checkForDelete(step.index)}
        >
          <h3 className="font-light">
            {step.index + 1}. {step.title || "No Title"}
          </h3>
          <TextInput
            label="Step Title"
            value={step.title}
            onChange={(event) =>
              updateStep(step.index, "title", event.target.value)
            }
          ></TextInput>
          <Textarea
            label="Instructions"
            value={step.mainText}
            onChange={(event) =>
              updateStep(step.index, "mainText", event.target.value)
            }
          ></Textarea>
          <Ingredients
            value={step.ingredients}
            onChange={(ingr?) => {
              updateStep(step.index, "ingredients", ingr);
            }}
          ></Ingredients>
        </div>
      ))}
    </>
  );
};

export default EditMethod;
