import { Menu } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import TaskApi from "@/api/TaskApi";
import ListApi from "@/api/ListApi";
import type { TaskContextType } from "./context/TaskContext";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/handleApiError";

interface OptionDialogProps {
  listUid: string;
  projectUid: string;
  taskActions: TaskContextType["taskActions"];
  listActions: TaskContextType["listActions"];
}

const OptionDialog = ({
  listUid,
  projectUid,
  taskActions,
  listActions,
}: OptionDialogProps) => {
  const handleAddCard = () => {
    // console.log("Add card selected");
    TaskApi.createTask(listUid, projectUid, taskActions);
  };
  const handleRemoveList = async () => {
    // console.log("Remove List with all its Tasks");
    // ListApi.deleteList(listUid, listActions);
    try {
      // ListApi.createList(listName.name, listActions);
      await ListApi.deleteList(listUid, listActions);

      // await ListApi.createList(listName.name, projectUid);
      toast.success(`Successfully Deleted List`);
    } catch (error: unknown) {
      handleApiError(error);
    }
  };
  const handleRemoveAllTask = async () => {
    // console.log("Remove All Task");
    try {
      await TaskApi.deleteAllTask(listUid, taskActions);
      toast.success(`Successfully Deleted List`);
    } catch (error: unknown) {
      handleApiError(error);
    }
  };
  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <HiOutlineDotsHorizontal />
        </Menu.Trigger>

        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="addCard" onSelect={handleAddCard}>
              Add card
            </Menu.Item>
            <Menu.Item value="removeList" onSelect={handleRemoveList}>
              Remove list
            </Menu.Item>
            <Menu.Item value="removeAllTask" onSelect={handleRemoveAllTask}>
              Remove all task
            </Menu.Item>
            <Menu.Item value="moveAllCard">
              Move all cards in this list
            </Menu.Item>
            <Menu.Item value="movePostion">Move Card</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </>
  );
};

export default OptionDialog;
