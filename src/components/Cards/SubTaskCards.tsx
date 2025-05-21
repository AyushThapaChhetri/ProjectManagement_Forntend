import { Flex, Text } from "@chakra-ui/react";
import type { Task } from "./task.types";
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  // type FocusEvent,
  // type FormEvent,
  type KeyboardEvent,
} from "react";
// import { TaskContext } from "./TaskContext";
import { TaskContext } from "./TaskContext"; // Import TaskContextType

interface SubTaskCardsProps {
  task: Task;
  listId: string;
}

const SubTaskCards = ({ task, listId }: SubTaskCardsProps) => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("SubTaskCards must be used within a TaskProvider");
  }

  const { dispatch } = context;

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
      dispatch({ type: "DELETE_TASK", payload: task.id });
    } else {
      dispatch({
        type: "UPDATE_TASK",
        payload: {
          id: task.id,
          updates: { name: trimmed, isEditing: false },
        },
      });
      dispatch({
        type: "ADD_TASK",
        payload: {
          id: `temp-${Date.now()}`,
          listId: listId,
          uid: "",
          projectId: 1,
          name: "",
          priority: "Medium",
          status: "Todo",
          createdAt: "",
          updatedAt: "",
          isEditing: true,
        },
      });
    }
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
        flexDirection="column"
        wordBreak="break-word"
        whiteSpace="pre-wrap"
        // minH="30px"
        minH={task.name.length === 0 ? "30px" : undefined}
        height="auto"
        p="5px"
        rounded="sm"
        justify="center"
        align="flex-start"
        // Add these CSS properties
        overflow="visible"
        position="relative"
        flexShrink={0}
      >
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
                // overflow: "hidden",
                overflowY: "auto", // Changed from hidden to auto
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                fontSize: "14px",
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
            lineHeight="1.4"
            // overflowY={"auto"}
          >
            {task.name}
          </Text>
        )}
      </Flex>
    </>
  );
};
export default SubTaskCards;
