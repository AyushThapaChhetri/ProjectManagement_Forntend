import { Menu } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import TaskApi from "@/api/TaskApi";
import type { TaskAction } from "./task.types";
import ListApi from "@/api/ListApi";

interface OptionDialogProps {
  listId: string;
  dispatch: React.Dispatch<TaskAction>;
}

const OptionDialog = ({ listId, dispatch }: OptionDialogProps) => {
  const handleAddCard = () => {
    // console.log("Add card selected");
    TaskApi.createTask(listId, dispatch);
  };
  const handleRemoveList = () => {
    // console.log("Remove List with all its Tasks");
    ListApi.deleteList(listId, dispatch);
  };
  const handleRemoveAllTask = () => {
    // console.log("Remove All Task");
    TaskApi.deleteAllTask(listId, dispatch);
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
