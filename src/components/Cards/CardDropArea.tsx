import { useTaskContext } from "@/hooks/useTaskContext";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

interface CardDropAreaProps {
  position: number;
  onDrop: (position: number) => void;
  // onDrop: (position: number) => void;
  expectedHeight?: number; // Explicitly typed as optional number
}

const CardDropArea = ({
  position,
  onDrop,
  expectedHeight = 0,
}: CardDropAreaProps) => {
  const [showDrop, setShowDrop] = useState(false);
  const { activeTask } = useTaskContext();

  // Only render when we are dragging a card (activeList != null):
  // if (activeList === null) return null;

  // console.log("show drop from the card drop area: ", showDrop);
  return (
    <>
      <Flex
        // w="307px"

        w={showDrop && !activeTask ? "307px" : "50px"}
        bg="purple.300"
        rounded="md"
        marginX={showDrop && !activeTask ? "10px" : 0}
        h={showDrop && !activeTask ? Math.max(expectedHeight, 100) : "20px"}
        maxH="100%"
        flexShrink="0"
        opacity={showDrop && !activeTask ? 1 : 0}
        //   p="5px"
        //   mb={"10px"}
        //  h={showDrop ? "30px" : "15px"}
        //  rounded="sm"
        //  flexShrink={0}
        //  opacity={showDrop ? 1 : 0}
        //  transition={showDrop ? "all 0.1s ease-out" : "none"}
        onDragEnter={() => setShowDrop(true)}
        onDragLeave={() => setShowDrop(false)}
        onDrop={(e) => {
          e.preventDefault(); // prevent the browser default
          if (activeTask) return;
          onDrop(position);
          setShowDrop(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        //If you don’t call e.preventDefault(), the browser assumes you don’t want to allow dropping here.
      ></Flex>
    </>
  );
};

export default CardDropArea;
