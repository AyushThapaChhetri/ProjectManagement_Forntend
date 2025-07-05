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
import { type List, type Task } from "./reducer/task.types";
import React, { useCallback, useRef } from "react";
import OptionDialog from "./OptionDialog";
import TaskApi from "@/api/TaskApi";
import { useTaskContext } from "@/hooks/useTaskContext";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { listSchema } from "@/schemas/listSchema";
import type { InferType } from "yup";
import TaskDropArea from "./TaskDropArea";
import ListApi from "@/api/ListApi";
import { handleApiError } from "@/utils/handleApiError";
type FormValues = InferType<typeof listSchema>;

interface CardsProps {
  uid: List["uid"];
  name: List["name"];
  tasks: Task[]; // New prop
  draggable?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
  projectUid: string;
  onDragStartCallback: (height: number) => void; // NEW: Callback for drag start
  onDragEndCallback: (cardId: string) => void; // NEW: Callback for drag end
}

const Cards = React.memo(
  ({
    uid,
    name,
    tasks,
    draggable,
    innerRef,
    projectUid,
    onDragStartCallback,
    onDragEndCallback,
  }: CardsProps) => {
    const { selectList, selectTask, taskActions, listActions, onDrop } =
      useTaskContext();
    const localCardRef = useRef<HTMLDivElement>(null);

    const setCombinedRef = useCallback(
      (node: HTMLDivElement | null) => {
        localCardRef.current = node;

        if (!innerRef) return;
        if (typeof innerRef === "function") {
          innerRef(node);
        } else if ("current" in innerRef) {
          // innerRef is a RefObject
          innerRef.current = node;
        }
      },
      [innerRef]
    );

    // console.log("Current state in Cards component:", state);

    const handleAddTask = () => {
      TaskApi.createTask(uid, projectUid, taskActions);
    };
    // Filter tasks to only show those belonging to this specific list
    const listTasks = tasks.filter((task) => task.listUid === uid);

    const {
      // register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(listSchema),
    });
    const onSubmit: SubmitHandler<FormValues> = (data) => {
      // console.log("Form is submitting..."); // This should log
      // console.log(data.name); // Your final form data
      try {
        ListApi.updateList(uid, data.name, listActions);
        // toast.success(`Successfully Updated List`);
      } catch (error: unknown) {
        handleApiError(error);
      }
      // reset();
    };

    return (
      <>
        <Flex
          ref={setCombinedRef}
          direction="column"
          h="fit-content"
          maxH="96%"
          draggable={draggable}
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", uid); // “kickstart” native drag
            selectTask(null);
            selectList(uid);
            // NEW: Get height from localCardRef and call the callback
            if (localCardRef.current) {
              // onDragStartCallback(id, localCardRef.current.offsetHeight);
              onDragStartCallback(localCardRef.current.offsetHeight);
            }
            console.log("Drag started for list:", uid);
          }}
          onDragEnd={() => {
            console.log("Drag ended for list:", uid);
            // selectList(null);
            // NEW: Call the drag end callback
            onDragEndCallback(uid);
          }}
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
          // gap={2}
          // flexShrink={1}
        >
          <Flex
            alignItems="center"
            // userSelect="none"
            justify={"space-between"}
          >
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
                        css={{
                          display: "inline-block",
                          textWrap: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
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
              <OptionDialog
                listUid={uid}
                projectUid={projectUid}
                taskActions={taskActions}
                listActions={listActions}
              />
            </Box>
          </Flex>
          {/* {!taskArrayLength && ( */}
          <Flex
            direction="column"
            overflowY="auto"
            overflowX="hidden"
            gap={"2px"}
            padding="5px"
            scrollMarginX="0px"
            // userSelect="none"
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
            {/* Drop area at the very top of an empty list  */}

            <TaskDropArea listUid={uid} position={0} onDrop={onDrop} />

            {/* <TaskDropArea listId={id} position={0} onDrop={onDrop} /> */}
            {listTasks.length > 0 &&
              listTasks?.map((task: Task, i) => (
                <React.Fragment key={task.id}>
                  <SubTaskCards
                    task={task}
                    projectUid={projectUid}
                    listUid={uid}
                    listName={name}
                  />
                  <TaskDropArea
                    listUid={uid}
                    position={i + 1}
                    onDrop={onDrop}
                    // listName={name}
                  />
                </React.Fragment>
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
  }
);
export default Cards;
