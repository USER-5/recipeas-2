import { useNotifications } from "@mantine/notifications";
import Edit from "components/edit";
import { EagerRecipe } from "models/eagerRecipe";
import { GetServerSideProps } from "next";
import getRecipe from "utils/serverFunctions/getRecipe";
import React, { FC } from "react";

type Props = {
  recipe: EagerRecipe;
};

const EditPage: FC<Props> = ({ recipe }) => {
  const notifications = useNotifications();
  const update = async (updatedRecipe: EagerRecipe) => {
    const res = await fetch("/api/recipe", {
      method: "PUT",
      body: JSON.stringify(updatedRecipe),
    });
    if (!res.ok || res.status !== 200) {
      const errorText = await res.text();
      notifications.showNotification({
        title: "Unable to update recipe",
        message:
          errorText || "Something went wrong while updating your recipe.",
        color: "red",
      });
      throw new Error(errorText);
    }
    return updatedRecipe.id;
  };
  return (
    <>
      <Edit save={update} saveText="Update" initRecipe={recipe}></Edit>
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

export default EditPage;
