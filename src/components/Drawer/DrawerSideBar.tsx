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
import { IoAddSharp } from "react-icons/io5";

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
            <Flex direction="column" w="100%" h="100%" bg={"none"} gap={5}>
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
                    base: "12px",
                    mobileLg: "14px",
                    tablet: "16px",
                    ultraHd: "20px",
                  }}
                >
                  Focus Workspace
                </Text>
              </Flex>
              <Link href="/board">
                <Flex
                  gap={5}
                  // justify="flex-start"
                  // justify="center"
                  alignItems={"center"}
                  // bg={"red"}
                >
                  <Icon
                    size={{
                      base: "xs",
                      mobileLg: "sm",

                      ultraHd: "lg",
                    }}
                  >
                    <FaFlipboard />
                  </Icon>
                  <Text
                    fontFamily="sans-serif"
                    fontSize={{ base: "13px", wide: "16px" }}
                    // pt="2.5px"
                  >
                    Boards
                  </Text>
                </Flex>
              </Link>
              <Flex
                borderBottomWidth="2px"
                borderColor="gray"
                justify="space-between"
              >
                <Text
                  fontFamily="sans-serif"
                  fontSize={{ base: "14px", wide: "17px" }}
                  // pt="2.5px"
                >
                  Projects
                </Text>
                <Icon
                  size={{
                    base: "xs",
                    mobileLg: "lg",
                  }}
                >
                  <IoAddSharp />
                </Icon>
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
