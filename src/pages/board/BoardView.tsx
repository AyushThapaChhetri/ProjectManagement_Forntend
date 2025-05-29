import ListApi from "@/api/ListApi";
import CardDropArea from "@/components/Cards/CardDropArea";
import Cards from "@/components/Cards/Cards";
import type { List, Task } from "@/components/Cards/reducer/task.types";
import DrawerSideBar from "@/components/Drawer/DrawerSideBar";
// import DrawerSideBar from "@/components/DrawerSideBar";
import Navbar from "@/components/Navbar";
import { useTaskContext } from "@/hooks/useTaskContext";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  // Text,
  // Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, {
  // useEffect,
  // useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

const BoardView = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [listName, setListName] = useState({
    name: "",
  });

  const { state, listActions, onDrop } = useTaskContext();

  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // NEW: State to store the height of the currently dragged card
  const [draggedCardHeight, setDraggedCardHeight] = useState<
    number | undefined
  >(undefined);

  // NEW: Callback function to receive height from the Cards component when drag starts
  const handleCardDragStart = (cardId: string, height: number) => {
    setDraggedCardHeight(height); // Set the height to apply to all drop areas
    console.log(
      `BoardView: Card ${cardId} started dragging. Its height: ${height}px`
    );
  };

  // NEW: Callback function to reset height when drag ends
  const handleCardDragEnd = (cardId: string) => {
    setDraggedCardHeight(undefined); // Clear the height when drag ends
    console.log(`BoardView: Card ${cardId} stopped dragging.`);
  };

  const handleAddList = () => {
    // setAddListButtonVanish((prev) => !prev);
    setShowAddListForm(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setListName((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = listName.name.trim();
    if (trimmed === "") {
      console.log("Input is empty. Submission prevented.");
      return;
    } else {
      ListApi.createList(listName.name, listActions);

      setShowAddListForm(false);
      setListName({ name: "" });
    }
  };

  const handleBlur = () => {
    if (listName.name.trim() === "") {
      setShowAddListForm(false);
      setListName({ name: "" }); // Clear input
    }
  };
  const sidebarRef = useRef(null);
  // const responsiveWidthOpen = useBreakpointValue({ base: "60vw", md: "20vw" });
  const responsiveWidthOpen = useBreakpointValue({
    base: "60vw",
    // mobileLg: "50vw",
    tabletSm: "40vw",
    tabletLg: "30vw",
    laptopSm: "20vw",
  });
  const responsiveWidthClose = useBreakpointValue({ base: "10vw", md: "3vw" });
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  return (
    <>
      <Flex
        direction="column"
        boxSizing="border-box"
        height="100dvh"
        w="100vw"
        overflow="hidden"
      >
        <Navbar />
        <Flex flexGrow="1" height="calc(100vh - 5rem)">
          {/* Sidebar with dynamic width */}
          <Box
            ref={sidebarRef}
            bg="blackAlpha.300"
            width={isDrawerOpen ? responsiveWidthOpen : responsiveWidthClose}
            minWidth={isDrawerOpen ? responsiveWidthOpen : responsiveWidthClose} // Ensure instant space reservation
            // overflow="hidden"

            transition="width 0.3s ease"
            pos="relative"
            flexShrink={0}
          >
            <DrawerSideBar
              isOpen={isDrawerOpen}
              onToggle={toggleDrawer}
              containerRef={sidebarRef}
            />
          </Box>

          {/* Right side content */}
          <Flex
            flexGrow="1"
            direction="column"
            overflowX="hidden"
            maxWidth={`calc(100vw - ${isDrawerOpen ? responsiveWidthOpen : responsiveWidthClose})`}
            transition="width 0.3s ease"
            overflow="hidden"
          >
            <Flex
              boxShadow="sm"
              h={{ base: "4rem", wide: "3rem" }}
              pl="2rem"
              align="center"
              bg="gray.100"
              flexShrink="0"
            >
              <Heading>Boards</Heading>
            </Flex>

            {/* Cards section with remaining space and horizontal scrolling */}
            <Flex
              padding="2rem"
              w="100%"
              // gap={10}
              // bg="blue"
              boxSizing="border-box"
              flexGrow="1"
              overflowX="auto" // Enable horizontal scrolling
              whiteSpace="nowrap" // Keep cards in a single row
            >
              {/* NEW: Initial CardDropArea, uses the draggedCardHeight */}
              <CardDropArea
                position={0}
                onDrop={onDrop}
                expectedHeight={draggedCardHeight}
              />

              {state?.lists?.map((e: List, i) => {
                const listTasks = state.tasks.filter(
                  (task: Task) => task.listId === e.id
                );
                return (
                  <React.Fragment key={e.id}>
                    <Cards
                      key={e.id}
                      id={e.id}
                      name={e.name}
                      tasks={listTasks} // Pass filtered tasks
                      draggable
                      innerRef={(el) => {
                        // Using the direct `ref` prop
                        if (el) cardRefs.current.set(e.id, el);
                        else cardRefs.current.delete(e.id);
                      }}
                      onDragStartCallback={handleCardDragStart} // Pass callback
                      onDragEndCallback={handleCardDragEnd} // Pass callback
                    />

                    {/* NEW: Subsequent CardDropArea, also uses the draggedCardHeight */}
                    <CardDropArea
                      position={i + 1}
                      onDrop={onDrop}
                      expectedHeight={draggedCardHeight}
                    />
                  </React.Fragment>
                );
              })}
              {/* {addListButtonVanish ? ( */}
              {!showAddListForm ? (
                <Button w="272px" onClick={handleAddList}>
                  Add Another List
                </Button>
              ) : (
                <Flex
                  direction="column"
                  width="272px"
                  height="fit-content"
                  bg="purple.400"
                  rounded="md"
                  p="8px"
                  boxSizing="border-box"
                  gap={2}
                  flexShrink="0"
                >
                  <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap={2} flexShrink="0">
                      <Input
                        name="name"
                        placeholder="Enter list name..."
                        value={listName.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        autoFocus
                        fontSize="16px"
                        size="sm"
                      />
                      <Button type="submit"> AddList</Button>
                    </Flex>
                  </form>
                </Flex>
              )}
              {/* <Cards /> */}
            </Flex>
          </Flex>
        </Flex>
        {/* <Box position="absolute" bottom="40px">
          <Text fontSize="26px">Active Card -{activeTask}</Text>
          <Text fontSize="26px">Active List -{activeList}</Text>
        </Box> */}
      </Flex>
    </>
  );
};
export default BoardView;
