import { Button, NumberInput, Stepper, TextInput } from "@mantine/core";
import { MethodStep } from "@prisma/client";
import UploadImage from "components/uploadImage";
import { EagerRecipe } from "models/eagerRecipe";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { cleanupRecipe } from "utils/cleanupRecipe";
import { makeDefinedNum, makeDefinedStr } from "utils/define";
import EditMethod from "./editMethod";

type PropType = {
  initRecipe: EagerRecipe;
  save: (recipe: EagerRecipe) => Promise<string>;
  saveText: string;
};

const Edit: FC<PropType> = (props) => {
  const router = useRouter();
  // Just stepper things
  const [active, setActive] = useState(0);
  const nextStep = async () => {
    if (active < 1) {
      setActive(active + 1);
    } else {
      try {
        const id = await onSave();
        router.push(`/pea/${id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [recipeData, setRecipeData] = useState<EagerRecipe>(props.initRecipe);

  const onSave = async (): Promise<string> => {
    return await props.save(cleanupRecipe(recipeData));
  };

  return (
    <div className="max-w-2xl m-auto">
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="Basic Info">
          <TextInput
            label="Title"
            required
            value={recipeData.title}
            onChange={(event) => {
              setRecipeData((prev) => ({
                ...prev,
                title: makeDefinedStr(event.target.value),
              }));
            }}
          ></TextInput>
          <NumberInput
            label="Servings"
            hideControls
            required
            value={recipeData.servings as number}
            onChange={(servings) => {
              setRecipeData((prev) => ({
                ...prev,
                servings: makeDefinedNum(servings),
              }));
            }}
          ></NumberInput>
          <NumberInput
            label="Total Minutes"
            hideControls
            value={recipeData.totalMinutes as number}
            onChange={(mins) => {
              setRecipeData((prev) => ({
                ...prev,
                totalMinutes: makeDefinedNum(mins, null),
              }));
            }}
          ></NumberInput>
          <NumberInput
            label="Hands-On Minutes"
            hideControls
            value={recipeData.handsOnMinutes as number}
            onChange={(mins) => {
              setRecipeData((prev) => ({
                ...prev,
                handsOnMinutes: makeDefinedNum(mins, null),
              }));
            }}
          ></NumberInput>
          <UploadImage
            value={recipeData.image}
            onChange={(id) => setRecipeData((prev) => ({ ...prev, image: id }))}
          ></UploadImage>
        </Stepper.Step>
        <Stepper.Step label="Method">
          <EditMethod
            steps={recipeData.methodSteps || []}
            onStepsChange={(steps: MethodStep[]) =>
              setRecipeData((prev) => ({
                ...prev,
                methodSteps: steps,
              }))
            }
          ></EditMethod>
        </Stepper.Step>
      </Stepper>
      <div className="w-full grid gap-3 grid-cols-2 mt-6">
        <Button
          variant="light"
          onClick={prevStep}
          disabled={active === null || active === 0}
        >
          Back
        </Button>
        <Button onClick={nextStep}>
          {active === 1 ? props.saveText : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Edit;
