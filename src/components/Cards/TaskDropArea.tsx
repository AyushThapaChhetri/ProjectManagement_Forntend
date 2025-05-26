import { useTaskContext } from "@/hooks/useTaskContext";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

interface TaskDropAreaProps {
  listId: string;
  position: number;
  onDrop: (position: number, listId: string) => void;
}

const TaskDropArea = ({ listId, position, onDrop }: TaskDropAreaProps) => {
  const [showDrop, setShowDrop] = useState(false);
  const { activeList } = useTaskContext();
  return (
    <Flex
      w="100%"
      bg="purple.300"
      //   p="5px"
      //   mb={"10px"}
      h={showDrop && !activeList ? "30px" : "15px"}
      rounded="sm"
      flexShrink={0}
      opacity={showDrop && !activeList ? 1 : 0}
      transition={showDrop && !activeList ? "all 0.1s ease-out" : "none"}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={(e) => {
        e.preventDefault(); // prevent the browser default
        if (activeList) return;
        onDrop(position, listId); //  call your callback
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    ></Flex>
  );
};

export default TaskDropArea;
