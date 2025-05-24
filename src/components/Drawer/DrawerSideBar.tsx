import {
  Avatar,
  Box,
  CloseButton,
  Flex,
  Icon,
  IconButton,
  Portal,
  Text,
  Link,
} from "@chakra-ui/react";
import type { RefObject } from "react";
// import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaFlipboard } from "react-icons/fa6";

import F from "@/assets/F.png";

// Define the props interface
interface DrawerSideBarProps {
  isOpen: boolean; // Whether the drawer is open
  onToggle: () => void; // Function to toggle the drawer state
  containerRef: RefObject<HTMLDivElement | null>; // Ref to the container element
}

const DrawerSideBar = ({
  isOpen,
  onToggle,
  containerRef,
}: DrawerSideBarProps) => {
  return (
    <>
      {!isOpen && (
        <IconButton
          aria-label={isOpen ? "Close drawer" : "Open drawer"}
          onClick={onToggle}
          position="absolute"
          // top="50%"
          // left="50%"
          // transform="translate(-50%, -50%)"
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
            <Flex direction="column" w="100%" h="100%" bg={"none"} gap={20}>
              <Flex gap={2} borderBottomWidth="2px" h="50px">
                <Avatar.Root
                  shape="rounded"
                  size={{ base: "sm", ultraHd: "lg" }}
                >
                  <Avatar.Fallback name="F" />
                  <Avatar.Image src={F} />
                </Avatar.Root>
                <Text fontFamily="sans-serif" fontSize="24px">
                  Focus Workspace
                </Text>
              </Flex>
              <Link href="/board">
                <Flex
                  gap={5}
                  justify="flex-start"
                  // bg={"red"}
                >
                  <Icon size="lg">
                    <FaFlipboard />
                  </Icon>
                  <Text
                    fontFamily="sans-serif"
                    fontSize="18px"
                    // pt="2.5px"
                  >
                    Boards
                  </Text>
                </Flex>
              </Link>
            </Flex>
            {/* <p>Drawer content goes here.</p> */}
          </Box>
        </Portal>
      )}
    </>
  );
};

export default DrawerSideBar;
