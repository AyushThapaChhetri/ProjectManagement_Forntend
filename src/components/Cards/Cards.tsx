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
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
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
import { TaskTitleSchema } from "@/schemas/taskSchema";
type FormValues = InferType<typeof listSchema>;
type TaskTitleForm = InferType<typeof TaskTitleSchema>;

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
    const [showNewInput, setShowNewInput] = useState(false);
    const { selectList, selectTask, taskActions, listActions, onDrop } =
      useTaskContext();
    const localCardRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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

    // Add this useEffect hook
    useEffect(() => {
      // if (task.isEditing && textAreaRef.current) {
      if (showNewInput && textAreaRef.current) {
        const textarea = textAreaRef.current;
        requestAnimationFrame(() => {
          textarea.style.height = "auto";
          const newHeight = Math.max(textarea.scrollHeight, 40); // Minimum height

          if (newHeight < 160) {
            textarea.style.height = `${newHeight}px`;
          } else {
            textarea.style.height = "160px";
          }

          textarea.scrollIntoView({ behavior: "smooth", block: "end" });
        });
      }
      // }, [task.isEditing]);
    }, [showNewInput]);

    // console.log("Current state in Cards component:", state);

    const handleAddTask = () => {
      console.log("Task type form opened ");
      setShowNewInput(true);
      // Wait for textarea to render
      setTimeout(() => {
        textAreaRef.current?.focus();
      }, 0);
      // TaskApi.createTask(uid, projectUid, taskActions);
    };
    // Filter tasks to only show those belonging to this specific list
    const listTasks = tasks.filter((task) => task.listUid === uid);

    const {
      register: registerTask,
      handleSubmit: handleTaskSubmit,
      reset: resetTaskForm,
      // formState: { errors: taskErrors },
    } = useForm({
      resolver: yupResolver(TaskTitleSchema),
    });

    const handleTaskSubmitFn: SubmitHandler<TaskTitleForm> = async (data) => {
      const trimmed = (data.name ?? "").trim();
      if (trimmed === "") {
        // TaskApi.deleteTask(task.uid, taskActions);
        setShowNewInput(false);
        return;
      } else {
        try {
          await TaskApi.createTask(trimmed, uid, projectUid, taskActions);
          resetTaskForm();
        } catch (error: unknown) {
          handleApiError(error);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // prevent newline
        handleTaskSubmit(handleTaskSubmitFn)();
      }
    };

    // const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    const handleBlur = () => {
      handleTaskSubmit(handleTaskSubmitFn)();
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;

      // Always reset height first
      textarea.style.height = "auto";
      const newHeight = textarea.scrollHeight;

      // Apply calculated height
      if (newHeight < 160) {
        textarea.style.height = `${newHeight}px`;
        textarea.style.overflowY = "hidden";
      } else {
        textarea.style.height = "160px";
        textarea.style.overflowY = "auto";
      }
    };

    const {
      // register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(listSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      // console.log("Form is submitting..."); // This should log
      // console.log(data.name); // Your final form data
      try {
        await ListApi.updateList(uid, data.name, listActions);
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
                <React.Fragment key={task.uid}>
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

            {showNewInput && (
              <form
                onSubmit={handleTaskSubmit(handleTaskSubmitFn)}
                style={{
                  width: "100%",
                  display: "contents", // So the form doesn't affect layout
                }}
              >
                {(() => {
                  const { ref, onBlur, onChange, name, ...rest } =
                    registerTask("name");

                  return (
                    <textarea
                      name={name}
                      {...rest}
                      ref={(e) => {
                        ref(e); // RHF internal ref
                        textAreaRef.current = e; // your custom logic
                      }}
                      onChange={(e) => {
                        handleChange(e); // your custom height logic
                        onChange(e); // RHF form sync
                      }}
                      onBlur={(e) => {
                        onBlur(e); // RHF blur
                        handleBlur(); // your custom blur logic
                      }}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      style={{
                        width: "100%",
                        // border: "none",
                        outline: "none",
                        borderRadius: "5px",
                        maxHeight: "160px",
                        resize: "none",
                        fontSize: "16px",
                        overflowY: "auto",
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        padding: "8px",
                        position: "relative",
                        zIndex: 1,
                        boxSizing: "border-box",
                        minHeight: "40px",
                        transition: "height 0.2s ease",
                        border: "1px solid #ccc",
                      }}
                    />
                  );
                })()}
              </form>
            )}
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
