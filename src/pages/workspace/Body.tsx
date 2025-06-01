import DrawerSideBar from "@/components/Drawer/DrawerSideBar";
import Navbar from "@/components/Navbar";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useRef, useState } from "react";
// import { useProjectContext } from "@/hooks/userProjectContext";
// import Board from "../board/Board";
// import ProjectWrapper from "../project/Project";
import { Outlet, useNavigate } from "react-router";

const Body = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [board, setBoard] = useState(false);
  // const { state } = useProjectContext();
  // const projectId = state.selectedProjectId;
  // if(state.selectedProjectId) console.log()

  // useEffect(() => {
  //   if (projectId) {
  //     console.log("Project id: ", projectId);
  //   }
  // }, [projectId]);

  const sidebarRef = useRef(null);
  const responsiveWidthOpen = useBreakpointValue({
    base: "80vw",
    mobileSm: "60vw",
    tabletSm: "40vw",
    tabletLg: "30vw",
    laptopSm: "25vw",
    wide: "20vw",
  });
  const responsiveWidthClose = useBreakpointValue({ base: "10vw", md: "3vw" });
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const navigate = useNavigate();
  return (
    <>
      <Flex justify="center" w="100vw" h={"100dvh"}>
        <Flex
          direction="column"
          boxSizing="border-box"
          // h="100vh"
          h="100%"
          w="100%"
          maxWidth="3200px"
          maxH={"1500px"}
          overflow="hidden"
        >
          <Navbar />
          <Flex
            flexGrow="1"
            height="calc(100% - 5rem)"

            // border={"2px solid black"}
          >
            {/* Sidebar with dynamic width */}
            <Box
              ref={sidebarRef}
              bg="blackAlpha.300"
              width={isDrawerOpen ? responsiveWidthOpen : responsiveWidthClose}
              minWidth={
                isDrawerOpen ? responsiveWidthOpen : responsiveWidthClose
              }
              transition="width 0.3s ease"
              pos="relative"
              flexShrink={0}
            >
              <DrawerSideBar
                isOpen={isDrawerOpen}
                onToggle={toggleDrawer}
                containerRef={sidebarRef}
                onSelectBoard={() => navigate("/body")}
                // setBoard={setBoard}
              />
            </Box>

            {/* Right side content */}
            <Flex
              flexGrow="1"
              direction="column"
              maxWidth={`calc(100vw - ${isDrawerOpen ? responsiveWidthOpen : responsiveWidthClose})`}
              transition="width 0.3s ease"
              overflow="hidden"
            >
              {/* <Board />
                {projectId && <ProjectWrapper projectId={projectId} />} */}
              {/* <Flex height="100%">
              </Flex> */}
              <Outlet />
            </Flex>
          </Flex>
          {/* <Box position="absolute" bottom="40px">
          <Text fontSize="26px">Active Card -{activeTask}</Text>
          <Text fontSize="26px">Active List -{activeList}</Text>
        </Box> */}
        </Flex>
      </Flex>
    </>
  );
};
export default Body;
