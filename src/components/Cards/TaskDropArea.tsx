import { Flex } from "@chakra-ui/react";
import { useState } from "react";

interface TaskDropAreaProps {
  listId: string;
  position: number;
  onDrop: (listId: string, position: number) => void;
}

const TaskDropArea = ({ listId, position, onDrop }: TaskDropAreaProps) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <Flex
      w="100%"
      bg="purple.300"
      //   p="5px"
      //   mb={"10px"}
      h={showDrop ? "30px" : "15px"}
      rounded="sm"
      flexShrink={0}
      opacity={showDrop ? 1 : 0}
      transition={showDrop ? "all 0.1s ease-out" : "none"}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={(e) => {
        e.preventDefault(); // prevent the browser default
        onDrop(listId, position); // 🚀 call your callback
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    ></Flex>
  );
};

export default TaskDropArea;
