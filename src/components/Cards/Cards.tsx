import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import SubTaskCards from "./SubTaskCards";
import { type List, type Task } from "./task.types";
import React, { useContext } from "react";
import { TaskContext } from "./TaskContext";
// import { taskReducer } from "./reducer";
interface CardsProps {
  id: List["id"];
  name: List["name"];
  tasks: Task[]; // New prop
}

const Cards = React.memo(({ id, name, tasks }: CardsProps) => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("Cards must be used within a TaskProvider");
  }
  const { dispatch } = context;
  // console.log("Current state in Cards component:", state);

  const handleAddTask = () => {
    // setIsAdding(true);
    const newTask: Task = {
      id: `temp-${Date.now()}`, // Temporary ID; replace with backend ID
      listId: id,
      uid: "", // Generates a UUID
      projectId: 1, // Example; adjust as needed
      name: "",
      priority: "Medium",
      status: "Todo",
      createdAt: "",
      updatedAt: "",
      isEditing: true,
    };
    // console.log("new inserted value: ", newTask);
    dispatch({ type: "ADD_TASK", payload: newTask });
    // inputRef.current.focus();
  };
  // Filter tasks to only show those belonging to this specific list
  const listTasks = tasks.filter((task) => task.listId === id);
  return (
    <>
      <Flex
        direction="column"
        h="fit-content"
        maxH="100%"
        // h="calc(100% - 36px - 26px)"
        w="272px"
        maxW="272px"
        // bg="red"
        // bg="blackAlpha.300"
        bg="purple.400"
        rounded="md"
        p="8px"
        boxSizing="border-box"
        flexShrink="0"
        gap={2}
        // flexShrink={1}
      >
        <Flex
          // h="6%"
          // h="36px"
          // maxH="6%"
          // flexGrow="1"
          alignItems="center"
          // gap={2}
          // border="2px solid black"
        >
          <Text as="h2">{name}</Text>
        </Flex>
        <Flex
          direction="column"
          overflowY="auto"
          overflowX="hidden"
          gap={2}
          padding="5px"
          scrollMarginX="0px"
          // bg="blue"
          css={{
            "&::-webkit-scrollbar": {
              width: "8px", // <-- change width here
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888", // color of the scrollbar thumb
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555", // on hover
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1", // background of scrollbar
            },
          }}
        >
          {/* {state?.tasks?.map((task: Task) => (
            <SubTaskCards key={task.id} task={task} />
          ))} */}
          {/* {tasks.map(
            (
              task: Task // Use passed tasks prop
            ) => (
              <SubTaskCards key={task.id} task={task} />
            )
          )} */}
          {/* <SubTaskCards />
          <SubTaskCards />
          < */}

          {listTasks.map((task: Task) => (
            <SubTaskCards key={task.id} task={task} listId={id} />
          ))}
        </Flex>
        <Flex
          // flexGrow="1"
          // h="6%"
          // mt="5px"
          h="40px"
          // justify="flex-end"
        >
          <Button
            size="sm"
            w="100%"
            _hover={{ bg: "gray.700" }}
            onClick={handleAddTask}
          >
            <Icon size="sm">
              <IoMdAdd />
            </Icon>
            Add a card
          </Button>
        </Flex>
      </Flex>
    </>
  );
});
export default Cards;
