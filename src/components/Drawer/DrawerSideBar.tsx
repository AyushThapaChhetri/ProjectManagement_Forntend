// import {
//   Button,
//   Drawer,
//   IconButton,
//   Portal,
//   useBreakpointValue,
//   useDisclosure,
//   //   Text,
// } from "@chakra-ui/react";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import { MdKeyboardArrowLeft } from "react-icons/md";

// import React, { useEffect } from "react";
// import type { RefObject } from "react";

// type DrawerSideBarProps = {
//   containerRef: RefObject<HTMLDivElement | null>;
// };

// const DrawerSideBar: React.FC<DrawerSideBarProps> = ({ containerRef }) => {
//   const responsiveWidth = useBreakpointValue({ base: "80vw", md: "20vw" });
//   // Chakra v3 ships useDisclosure
//   // const { open, onOpen, onClose } = useDisclosure();
//   const { open, setOpen, onClose } = useDisclosure();
//   // Whenever open toggles, mutate the container's width

//   useEffect(() => {
//     // Apply transition only once (or whenever the ref changes)

//     // console.log(open);
//     if (!containerRef.current || !responsiveWidth) return;
//     containerRef.current.style.transition = "width 0.5s ease-in-out";
//     containerRef.current.style.width = open ? responsiveWidth : "3vw";
//   }, [open, responsiveWidth, containerRef]);

//   return (
//     <>
//       <Drawer.Root
//         size="xs"
//         placement="start"
//         open={open}
//         onOpenChange={({ open: nextOpen }) => setOpen(nextOpen)}
//         closeOnInteractOutside={false}
//       >
//         <IconButton
//           aria-label="Call support"
//           rounded="full"
//           size="2xs"
//           // position="absolute"
//           right="-15px"
//           top="5px"
//           variant="outline"
//           bg="gray.300"
//           color="white"
//           display={open ? "none" : "flex"}
//           onClick={() => setOpen((prev) => !prev)}
//         >
//           <MdKeyboardArrowRight />
//         </IconButton>
//         <Portal container={containerRef}>
//           <Drawer.Backdrop pos="absolute" boxSize="full" pointerEvents="none" />
//           <Drawer.Positioner pos="absolute" boxSize="full" pointerEvents="auto">
//             <Drawer.Content>
//               <Drawer.Header>
//                 <Drawer.Title>Focus Workspace</Drawer.Title>
//               </Drawer.Header>
//               <Drawer.Body>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               </Drawer.Body>
//               <Drawer.Footer>
//                 <Drawer.ActionTrigger asChild>
//                   <Button variant="outline">Cancel</Button>
//                 </Drawer.ActionTrigger>
//                 <Button>Save</Button>
//               </Drawer.Footer>
//               <Drawer.CloseTrigger asChild>
//                 {/* <CloseButton size="sm" onClick={onClose} /> */}
//                 <IconButton
//                   aria-label="Call support"
//                   rounded="full"
//                   size="2xs"
//                   position="absolute"
//                   right="-15px"
//                   top="5px"
//                   variant="outline"
//                   bg="gray.300"
//                   color="white"
//                   zIndex="popover"
//                   display={open ? "flex" : "none"}
//                   onClick={onClose}
//                 >
//                   <MdKeyboardArrowLeft />
//                 </IconButton>
//               </Drawer.CloseTrigger>
//             </Drawer.Content>
//           </Drawer.Positioner>
//         </Portal>
//       </Drawer.Root>
//     </>
//   );
// };

// export default DrawerSideBar;

import { Box, CloseButton, IconButton, Portal } from "@chakra-ui/react";
import type { RefObject } from "react";
// import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
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
            <p>Drawer content goes here.</p>
          </Box>
        </Portal>
      )}
    </>
  );
};

export default DrawerSideBar;
