import DrawerSideBar from "@/components/DrawerSideBar";
// import DrawerSideBar from "@/components/DrawerSideBar";
import Navbar from "@/components/Navbar";
import { Flex } from "@chakra-ui/react";
import { useRef } from "react";

const BoardView = () => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <Navbar />
      <Flex>
        <Flex
          ref={sidebarRef}
          // flexGrow="1"
          // w="3%"
          // flexBasis="0"
          //   border="2px solid black"
          // height={{ mobileSm: "100vh", md: "100vh" }}
          height={{ base: "100vh" }}
          //   bg="blackAlpha.700"
          bg="gray.300"
          position="relative"
        >
          <DrawerSideBar containerRef={sidebarRef} />
        </Flex>
        <Flex flexGrow="1"></Flex>
      </Flex>
    </>
  );
};
export default BoardView;
