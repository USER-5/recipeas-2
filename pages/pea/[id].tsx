import { ActionIcon, Checkbox } from "@mantine/core";
import DeleteConfirmation from "components/deleteConfirmation";
import { EagerRecipe } from "models/eagerRecipe";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import getRecipe from "utils/serverFunctions/getRecipe";
import defaultImage from "public/default.jpg";
import React, { FC, useState } from "react";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import { shoppingListReducer } from "utils/shoppingListReducer";
import { ingredientFormat } from "utils/ingredientFormat";

type Props = {
  recipe: EagerRecipe;
};

const PeaPage: FC<Props> = ({ recipe }) => {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const edit = () => {
    router.push(`/edit/${recipe.id}`);
  };
  return (
    <>
      <DeleteConfirmation
        recipeId={recipe.id}
        recipeName={recipe.title}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      ></DeleteConfirmation>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <h1>{recipe.title}</h1>
          <span>
            Serves: {recipe.servings}
            {recipe.totalMinutes && <> | Total Time: {recipe.totalMinutes}</>}
            {recipe.handsOnMinutes && <> | Hands-On: {recipe.handsOnMinutes}</>}
          </span>
          <div>
            <ActionIcon
              className="min-w-max h-max p-1 inline-block"
              onClick={() => setDeleteModalOpen(true)}
            >
              <RiDeleteBin2Line className="text-2xl"></RiDeleteBin2Line>
            </ActionIcon>
            <ActionIcon
              className="min-w-max h-max p-1 inline-block"
              onClick={edit}
            >
              <RiEdit2Line className="text-2xl"></RiEdit2Line>
            </ActionIcon>
          </div>
        </div>
        <div className="relative aspect-[4/3]">
          <Image
            alt="Hopefully, a photo of the finished recipe"
            sizes="(min-width: 768px) 50vw, 100vw"
            layout="fill"
            objectFit="cover"
            src={recipe.image ? "/uploaded/" + recipe.image : defaultImage}
          ></Image>
        </div>
      </div>
      <div>
        <h2>Shopping List</h2>
        {recipe.methodSteps
          ?.flatMap((step) => step.ingredients)
          .reduce(shoppingListReducer, [])
          // sort by name in case of a near-miss, at least the ingredients will be side-by-side
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((ingredient) => (
            <Checkbox
              className="m-1"
              size="md"
              key={ingredient.id}
              label={ingredientFormat(ingredient)}
            ></Checkbox>
          ))}
      </div>
      <div>
        <h2>Method</h2>
        {recipe.methodSteps?.map((step) => {
          return (
            <React.Fragment key={step.id}>
              <h3 className="mt-6">
                {step.title ? (
                  <>
                    <span className="font-light">{step.index + 1}.</span>{" "}
                    {step.title}
                  </>
                ) : (
                  <>Step {step.index + 1}:</>
                )}
              </h3>
              <p className="font-light leading-loose">{step.mainText}</p>
              {step.ingredients && step.ingredients.length > 0 && (
                <>
                  <h4 className="mt-6">Ingredients for this step:</h4>
                  <ul>
                    {step.ingredients?.map((ingredient) => {
                      return (
                        <li
                          key={ingredient.id}
                          className="list-disc list-inside m-1"
                        >
                          {ingredientFormat(ingredient)}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const recipe = await getRecipe(query.id as string);
    return {
      props: {
        recipe,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default PeaPage;
