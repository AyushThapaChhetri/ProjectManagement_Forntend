import {
  Avatar,
  Box,
  CloseButton,
  Flex,
  Icon,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react";
import React, { type RefObject } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaFlipboard } from "react-icons/fa6";

import F from "@/assets/F.png";
import ProjectAddPopover from "../popover/ProjectAddPopover";
import SideBarProject from "./SideBarProject";
import { Link, useLocation, useNavigate } from "react-router";
import type { Project } from "../Cards/reducer/project.type";
import { useProjectContext } from "@/hooks/userProjectContext";
import { FaUserAlt } from "react-icons/fa";
import { ProjectApi } from "@/api/ProjectApi";

// import { useProjectContext } from "@/hooks/userProjectContext";
// import type { Project } from "../Cards/reducer/project.type";
// import { ProjectApi } from "@/api/ProjectApi";

// Define the props interface
interface DrawerSideBarProps {
  isOpen: boolean; // Whether the drawer is open
  onToggle: () => void; // Function to toggle the drawer state
  containerRef: RefObject<HTMLDivElement | null>; // Ref to the container element
  // setBoard: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectBoard: () => void;
}

const DrawerSideBar = ({
  isOpen,
  onToggle,
  containerRef,
  // onSelectBoard,
  // setBoard,
}: DrawerSideBarProps) => {
  // const { state, projectActions } = useProjectContext();

  // const handleDeselectProject = () => {
  //   console.log("deselect from drawersidebar");
  //   ProjectApi.deselectProject(projectActions);
  //   setBoard(true);
  // };
  const { state, projectActions } = useProjectContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // is the “Boards” link active?
  // const boardsActive = pathname === "/body";
  const isActive = (path: string) => {
    // console.log(path);
    return pathname === path;
  };
  return (
    <>
      {!isOpen && (
        <IconButton
          aria-label={isOpen ? "Close drawer" : "Open drawer"}
          onClick={onToggle}
          position="absolute"
          top="5px"
          right="-15px"
          zIndex="1"
          size="xs"
          bg="blackAlpha.300"
          color="black"
          rounded="full"
        >
          <MdKeyboardArrowRight />
          {/* {isOpen ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />} */}
        </IconButton>
      )}
      {isOpen && (
        <Portal container={containerRef}>
          <Box
            pos="absolute"
            inset="0"
            bg="gray.200"
            p="4"
            borderRightWidth="2px" // overflowY="auto"
          >
            <CloseButton
              onClick={onToggle}
              position="absolute"
              top="2"
              right="2"
            />
            <Flex
              direction="column"
              w="100%"
              h="100%"
              bg={"none"}
              // bg={"green"}
              gap={5}
            >
              <Flex
                gap={2}
                // justifyContent={"center"}
                alignItems={"center"}
                borderBottomWidth="2px"
                borderColor="gray"
                h="50px"
              >
                <Avatar.Root
                  shape="rounded"
                  size={{ base: "2xs", ultraHd: "md" }}
                >
                  <Avatar.Fallback name="F" />
                  <Avatar.Image src={F} />
                </Avatar.Root>
                <Text
                  fontFamily="sans-serif"
                  fontSize={{
                    base: "14px",
                    // mobileLg: "14px",
                    tablet: "16px",
                    ultraHd: "20px",
                  }}
                >
                  Focus Workspace
                </Text>
              </Flex>
              <Flex direction="column">
                <Link to="/body">
                  <Flex
                    gap={3}
                    alignItems={"center"}
                    rounded="md"
                    ml="5px"
                    py="6px"
                    px="20px"
                    bg={isActive("/body") ? "gray.300" : "transparent"}

                    // bg={"red"}
                  >
                    <Icon
                      size={{
                        base: "xs",
                        mobileLg: "sm",
                        // wide: "md",
                        ultraHd: "md",
                      }}
                    >
                      <FaFlipboard />
                    </Icon>
                    <Text
                      fontFamily="sans-serif"
                      fontSize={{ base: "14px", wide: "16px" }}
                      // fontSize={{ base: "13px", wide: "16px" }}
                      // pt="2.5px"
                    >
                      Boards
                    </Text>
                  </Flex>
                </Link>
                <Link to="/body/users">
                  <Flex
                    gap={3}
                    alignItems={"center"}
                    rounded="md"
                    ml="5px"
                    py="6px"
                    px="20px"
                    bg={isActive("/body/users") ? "gray.300" : "transparent"}

                    // bg={"red"}
                  >
                    <Icon
                      size={{
                        base: "xs",
                        mobileLg: "sm",
                        // wide: "md",
                        ultraHd: "md",
                      }}
                    >
                      <FaUserAlt />
                    </Icon>
                    <Text
                      fontFamily="sans-serif"
                      fontSize={{ base: "14px", wide: "16px" }}
                      // fontSize={{ base: "13px", wide: "16px" }}
                      // pt="2.5px"
                    >
                      Users
                    </Text>
                  </Flex>
                </Link>
              </Flex>
              <Flex
                direction="column"
                flexGrow="1"
                // gap={1}
                // border="1px solid grey"
                maxH={{ wide: "75%", ultraHd: "80%" }}
              >
                <Flex
                  borderBottomWidth="2px"
                  borderColor="gray"
                  justify="space-between"
                >
                  <Text
                    fontFamily="sans-serif"
                    fontSize={{ base: "16px", wide: "18px" }}
                    // color="white"
                    // pt="2.5px"
                  >
                    Projects
                  </Text>

                  <ProjectAddPopover />
                </Flex>
                <Flex
                  direction="column"
                  flexGrow="1"
                  pt="8px"
                  gap={2}
                  overflowY="auto"
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
                  // border="1px solid grey"
                >
                  {/* {state?.projects?.map((project: Project) => {
                    return (
                      <SideBarProject
                        key={project.id}
                        project={project}
                        projectActions={projectActions}
                        selectedProjectId={state.selectedProjectId}
                      />
                    );
                  })} */}
                  {state?.projects?.map((project: Project) => {
                    const projectPath = `/body/projects/${project.uid}`;
                    // const isActive = pathname === projectPath;

                    return (
                      <React.Fragment key={project.uid}>
                        <Flex
                          align="center"
                          rounded="md"
                          ml="10px"
                          py={"5px"}
                          px="20px"
                          bg={
                            isActive(projectPath) ? "gray.300" : "transparent"
                          }
                          _hover={{
                            bg: "gray.300",
                          }}
                          cursor="pointer"
                          caretColor="transparent"
                          onClick={() => {
                            navigate(`/body/projects/${project.uid}`);
                            // console.log("Clicked", project.name);
                            ProjectApi.selectProject(
                              project.uid,
                              projectActions
                            );
                          }}
                        >
                          <Flex flexGrow={1}>
                            <Box>
                              <Text fontSize={{ base: "14px", wide: "17px" }}>
                                {project.name}
                              </Text>
                            </Box>
                          </Flex>
                          <Box
                            onClick={(e) => {
                              e.stopPropagation(); // prevent navigation
                            }}
                          >
                            <SideBarProject project={project} />
                          </Box>
                        </Flex>
                      </React.Fragment>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
            {/* <p>Drawer content goes here.</p> */}
          </Box>
        </Portal>
      )}
    </>
  );
};

export default DrawerSideBar;
