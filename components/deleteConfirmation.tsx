import { Button, Modal } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  recipeId: string;
  recipeName: string;
  open: boolean;
  onClose: () => void;
};

const DeleteConfirmation: FC<Props> = (props) => {
  const router = useRouter();
  const deleteMe = async () => {
    await fetch(`/api/recipe?id=${props.recipeId}`, { method: "DELETE" });
    router.push("/");
  };

  return (
    <Modal
      opened={props.open}
      onClose={props.onClose}
      title={`Deleting ${props.recipeName}`}
      centered
    >
      Are you sure? This cannot be undone.
      <div className="grid grid-cols-2 justify-center">
        <Button
          className="w-min m-auto"
          variant="outline"
          onClick={props.onClose}
        >
          No
        </Button>
        <Button className="w-min m-auto" onClick={deleteMe}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
