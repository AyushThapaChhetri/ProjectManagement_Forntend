import { Flex } from "@chakra-ui/react";

const CardDropArea = () => {
  return (
    <Flex
      w="307px"
      bg="purple.300"
      maxH="100%"
      flexShrink="0"
      //   p="5px"
      //   mb={"10px"}
      //  h={showDrop ? "30px" : "15px"}
      //  rounded="sm"
      //  flexShrink={0}
      //  opacity={showDrop ? 1 : 0}
      //  transition={showDrop ? "all 0.1s ease-out" : "none"}
      //  onDragEnter={() => setShowDrop(true)}
      //  onDragLeave={() => setShowDrop(false)}
      //  onDrop={(e) => {
      //    e.preventDefault(); // prevent the browser default
      //    onDrop(listId, position); // 🚀 call your callback
      //    setShowDrop(false);
      //  }}
      //  onDragOver={(e) => e.preventDefault()}
    ></Flex>
  );
};

export default CardDropArea;
