import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import type { Task } from "./reducer/task.types";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  // type FocusEvent,
  // type FormEvent,
  type KeyboardEvent,
} from "react";
// import { TaskContext } from "./TaskContext";
// import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TaskEdit from "./TaskEdit";
import TaskApi from "@/api/TaskApi";
import { useTaskContext } from "@/hooks/useTaskContext";

interface SubTaskCardsProps {
  task: Task;
  listId: string;
  listName: string;
  projectId: string;
}

const SubTaskCards = ({
  task,
  listId,
  projectId,
  listName,
}: SubTaskCardsProps) => {
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [isTaskEditDialogOpen, setIsTaskEditDialogOpen] = useState(false);

  const { taskActions, selectList, selectTask } = useTaskContext();
  // console.log("State: ", state);

  const [formData, setFormData] = useState({
    taskTitle: task.name || "", // Initialize with existing name if available
  });

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Add this useEffect hook
  useEffect(() => {
    if (task.isEditing && textAreaRef.current) {
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
  }, [task.isEditing]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
    // Auto-resize the textarea by setting its height dynamically
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Form event
  const handleSubmit = () => {
    const trimmed = formData.taskTitle.trim();
    if (trimmed === "") {
      TaskApi.deleteTask(task.id, taskActions);
    } else {
      TaskApi.editTask(
        task.id,
        {
          name: trimmed,
          updatedAt: new Date(Date.now()).toISOString(),
          isEditing: false,
        },
        taskActions
      );

      TaskApi.createTask(listId, projectId, taskActions);
    }
  };

  const handleDelete = () => {
    // console.log("Delete id: ", task.id);
    TaskApi.deleteTask(task.id, taskActions);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSubmit();
    }
  };

  // const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
  const handleBlur = () => {
    handleSubmit();
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
            opacity: showCheckBox && !task.isEditing ? 1 : 0,
            transform:
              showCheckBox && !task.isEditing
                ? "translateX(0)"
                : "translateX(-20px)", // Adjust as needed
            pointerEvents: showCheckBox && !task.isEditing ? "auto" : "none", // Disable interaction when hidden
            flexShrink: 0, // Prevent checkbox from shrinking
            marginRight: showCheckBox && !task.isEditing ? "8px" : "0px", // Margin for spacing, transitioned
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

        {task.isEditing ? (
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "contents", // ← this makes form take up same height as textarea
            }}
          >
            <textarea
              ref={textAreaRef}
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              autoFocus
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                borderRadius: "5px",
                maxHeight: "160px",
                resize: "none",
                fontSize: "16px",
                // overflow: "hidden",
                overflowY: "auto", // Changed from hidden to auto
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                padding: "8px",
                // Add these properties
                position: "relative",
                zIndex: 1,
                boxSizing: "border-box",
                // Add these properties:
                minHeight: "40px", // Ensure minimum click area
                transition: "height 0.2s ease", // Smooth resizing
                // border: "1px solid #ccc",
                // borderRadius: "4px",
              }}
            />
          </form>
        ) : (
          <Text
            w="100%"
            fontSize="14px"
            wordBreak="break-word"
            whiteSpace="pre-wrap"
            overflowWrap="break-word"
            paddingLeft={showCheckBox ? "28px" : "0px"} // Base on checkbox width + margin
            transition="padding-left 0.5s ease"
            lineHeight="1.4"
            // overflowY={"auto"}
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              e.dataTransfer.setData("text/plain", task.id); // required for browser drag
              selectList(null);
              selectTask(task.id);
              console.log("Drag started for task:", task.id);
            }}
            onDragEnd={(e) => {
              e.stopPropagation();

              console.log("Drag ended for task:", task.id);
              // selectTask(null);
            }}
          >
            {task.name}
          </Text>
        )}
        {showCheckBox && !task.isEditing && (
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
