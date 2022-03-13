import { useNotifications } from "@mantine/notifications";
import Edit from "components/edit";
import { DEFAULT_FULL_RECIPE, EagerRecipe } from "models/eagerRecipe";
import { FC } from "react";

const CreatePage: FC = () => {
  const notifications = useNotifications();

  const createRecipe = async (data: EagerRecipe): Promise<string> => {
    const res = await fetch("/api/recipe", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok || res.status !== 200) {
      const errorText = await res.text();
      notifications.showNotification({
        title: "Unable to create recipe",
        message:
          errorText || "Something went wrong while creating your recipe.",
        color: "red",
      });
      throw new Error(errorText);
    }
    return res.text();
  };

  return (
    <Edit
      save={createRecipe}
      initRecipe={DEFAULT_FULL_RECIPE}
      saveText="Create"
    ></Edit>
  );
};

export default CreatePage;
