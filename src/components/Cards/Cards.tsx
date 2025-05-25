import {
  Box,
  Button,
  // Code,
  Editable,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import SubTaskCards from "./SubTaskCards";
import { type List, type Task } from "./task.types";
import React from "react";

import OptionDialog from "./OptionDialog";
import TaskApi from "@/api/TaskApi";
import { useTaskContext } from "@/hooks/useTaskContext";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { listSchema } from "@/schemas/listSchema";
import type { InferType } from "yup";

type FormValues = InferType<typeof listSchema>;

// import { taskReducer } from "./reducer";
interface CardsProps {
  id: List["id"];
  name: List["name"];
  tasks: Task[]; // New prop
}

const Cards = React.memo(({ id, name, tasks }: CardsProps) => {
  const { dispatch } = useTaskContext();

  // console.log("Current state in Cards component:", state);

  const handleAddTask = () => {
    TaskApi.createTask(id, dispatch);
    // setIsAdding(true);
    // const newTask: Task = {
    //   id: `temp-${Date.now()}`, // Temporary ID; replace with backend ID
    //   listId: id,
    //   uid: "", // Generates a UUID
    //   projectId: 1, // Example; adjust as needed
    //   name: "",
    //   priority: "low",
    //   status: "todo",
    //   createdAt: "",
    //   updatedAt: "",
    //   isEditing: true,
    // };
    // console.log("new inserted value: ", newTask);
    // dispatch({ type: "ADD_TASK", payload: newTask });
    // inputRef.current.focus();
  };
  // Filter tasks to only show those belonging to this specific list
  const listTasks = tasks.filter((task) => task.listId === id);

  const {
    // register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(listSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // TaskApi.updateTask(
    //   task.id,
    //   {
    //     ...data,
    //     updatedAt: new Date(Date.now()).toISOString(),
    //   },
    //   dispatch
    // );
    console.log("Form is submitting..."); // This should log
    console.log(data); // Your final form data

    // reset();
  };
  const taskArrayLength = listTasks.length === 0;
  //
  // console.log("Errors from RHF", errors);
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
        <Flex alignItems="center" userSelect="none" justify={"space-between"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue={name}
              render={({ field }) => (
                <Box>
                  <Editable.Root
                    size={"sm"}
                    fontSize="16px"
                    invalid={!!errors.name}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    onValueCommit={() => handleSubmit(onSubmit)()}
                  >
                    <Editable.Preview
                      border={errors.name ? "1px solid red" : "none"}
                      borderColor={errors.name ? "red.500" : "gray.300"}
                      w={"200px"}
                      _hover={{ bg: "purple.300" }}
                      borderRadius="md"
                      p="1"
                    />
                    <Editable.Input
                      border={errors.name ? "1px solid red" : "1px solid"}
                      placeholder={errors.name?.message}
                      _placeholder={{ color: "red.500" }}
                    />
                  </Editable.Root>
                </Box>
              )}
            />
          </form>
          <Box bg={"none"}>
            <OptionDialog listId={id} dispatch={dispatch} />
          </Box>
        </Flex>
        {!taskArrayLength && (
          <Flex
            direction="column"
            overflowY="auto"
            overflowX="hidden"
            gap={2}
            padding="5px"
            scrollMarginX="0px"
            userSelect="none"
            cursor="pointer"
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
            {listTasks?.map((task: Task) => (
              <SubTaskCards
                key={task.id}
                task={task}
                listId={id}
                listName={name}
              />
            ))}
          </Flex>
        )}
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

// <Editable.Root
//   size={"sm"}
//   invalid={!!errors.name}
//   defaultValue={field.value}
//   onChange={field.onChange}
//   onValueCommit={() => handleSubmit(onSubmit)()}
//   //                   () => {
//   //   const fn = handleSubmit(onSubmit); // Step 1: this returns a function
//   //   fn();                              // Step 2: now we call that function
//   // }
//   activationMode="dblclick"
// >
//   <Editable.Preview
//     border={errors.name ? "1px solid red" : "1px solid"}
//     borderColor={errors.name ? "red.500" : "gray.300"}
//     borderRadius="md"
//     p="1"
//   />
//   <Editable.Input
//     border={errors.name ? "1px solid red" : "1px solid"}
//   />
//   <Code>{errors.name?.message}</Code>
// </Editable.Root>
