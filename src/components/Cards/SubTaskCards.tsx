import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import type { Task } from "./reducer/task.types";
import { useState } from "react";
// import { TaskContext } from "./TaskContext";
// import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TaskEdit from "./TaskEdit";
import TaskApi from "@/api/TaskApi";
import { useTaskContext } from "@/hooks/useTaskContext";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/handleApiError";

interface SubTaskCardsProps {
  task: Task;
  listUid: string;
  listName: string;
  projectUid: string;
}

const SubTaskCards = ({ task, listName }: SubTaskCardsProps) => {
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [isTaskEditDialogOpen, setIsTaskEditDialogOpen] = useState(false);

  const { taskActions, selectList, selectTask } = useTaskContext();
  // console.log("State: ", state);

  const handleDelete = async () => {
    // console.log("Delete id: ", task.id);

    try {
      await TaskApi.deleteTask(task.uid, taskActions);
      toast.success(`Successfully delete Task`);
    } catch (error: unknown) {
      handleApiError(error);
    }
  };

  return (
    <>
      <Flex
        w="100%"
        bg="white"
        flexDirection="row"
        // gap={2}
        wordBreak="break-word"
        whiteSpace="pre-wrap"
        // minH="30px"
        minH={task.name.length === 0 ? "30px" : undefined}
        height="auto"
        p="5px"
        rounded="sm"
        justify="center"
        cursor="grab"
        _active={{
          opacity: 0.7,
          border: "1px solid black",
        }}
        align="flex-start"
        // Add these CSS properties
        overflow="visible"
        position="relative"
        flexShrink={0}
        onMouseEnter={() => {
          setShowCheckBox(true);
        }}
        onMouseLeave={() => {
          // console.log("Task DialogOpen", isTaskEditDialogOpen);
          //false vayo vane execute garcha
          if (!isTaskEditDialogOpen) {
            setShowCheckBox(false);
          }
        }}
      >
        {/* Checkbox wrapper with transitions */}
        <Box
          position="absolute"
          left="5px"
          // Conditionally render only when not editing and showCheckBox is true
          style={{
            transition:
              "opacity 0.2s ease, transform 0.2s ease, margin-right 0.2s ease",
            // opacity: showCheckBox && !task.isEditing ? 1 : 0,
            opacity: showCheckBox ? 1 : 0,
            transform:
              // showCheckBox && !task.isEditing
              showCheckBox ? "translateX(0)" : "translateX(-20px)", // Adjust as needed
            // pointerEvents: showCheckBox && !task.isEditing ? "auto" : "none", // Disable interaction when hidden
            pointerEvents: showCheckBox ? "auto" : "none", // Disable interaction when hidden
            flexShrink: 0, // Prevent checkbox from shrinking
            // marginRight: showCheckBox && !task.isEditing ? "8px" : "0px", // Margin for spacing, transitioned
            marginRight: showCheckBox ? "8px" : "0px", // Margin for spacing, transitioned
            // Adjust position if you want it exactly at the left edge and text moves independently
            // position: "absolute",
            // left: "0",
          }}
        >
          <Checkbox.Root size="sm">
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>
        </Box>

        <Text
          w="100%"
          fontSize="14px"
          wordBreak="break-word"
          whiteSpace="pre-wrap"
          overflowWrap="break-word"
          paddingLeft={showCheckBox ? "28px" : "0px"} // Base on checkbox width + margin
          transition="padding-left 0.5s ease"
          lineHeight="1.4"
          draggable
          onDragStart={(e) => {
            e.stopPropagation();
            e.dataTransfer.setData("text/plain", task.uid); // required for browser drag
            selectList(null);
            selectTask(task.uid);
            console.log("Drag started for task:", task.uid);
          }}
          onDragEnd={(e) => {
            e.stopPropagation();
            console.log("Drag ended for task:", task.uid);
          }}
        >
          {task.name}
        </Text>

        {/* Deleting and Edit icons */}
        {/* {showCheckBox && !task.isEditing && ( */}
        {showCheckBox && (
          <Flex gap={3}>
            <Box cursor="pointer" _hover={{ color: "red.500" }}>
              <MdDelete size={18} onClick={handleDelete} />
            </Box>
            <Box cursor="pointer" _hover={{ color: "blue.500" }}>
              {/* <FaRegEdit size={18} /> */}
              <TaskEdit
                onDialogStateChange={setIsTaskEditDialogOpen}
                setShowCheckBox={setShowCheckBox}
                task={task}
                listName={listName}
              />
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default SubTaskCards;
