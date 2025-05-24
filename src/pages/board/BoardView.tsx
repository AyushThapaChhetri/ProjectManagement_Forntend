import ListApi from "@/api/ListApi";
import Cards from "@/components/Cards/Cards";
import type { List, Task } from "@/components/Cards/task.types";
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
  useBreakpointValue,
} from "@chakra-ui/react";
import {
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

  const { state, dispatch } = useTaskContext();

  // console.log("State: ", state);

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
  // useEffect(() => {
  //   console.log("Lists updated: ", state.lists);
  // }, [state.lists]);

  // useEffect(() => {
  //   console.log("Form boolean changed: ", showAddListForm);
  // }, [showAddListForm]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = listName.name.trim();
    if (trimmed === "") {
      console.log("Input is empty. Submission prevented.");
      return;
    } else {
      ListApi.createList(listName.name, dispatch);
      // const newList = {
      //   id: `temp-${Date.now()}`,
      //   uid: "",
      //   name: listName.name,
      //   projectId: 1,
      //   createdAt: "",
      //   updatedAt: "",
      //   isEditing: true,
      // };
      // dispatch({ type: "ADD_LIST", payload: newList });
      // setAddListFlexVanish((prev) => !prev);
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
  const responsiveWidthOpen = useBreakpointValue({ base: "60vw", md: "20vw" });
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
              gap={10}
              // bg="blue"
              boxSizing="border-box"
              flexGrow="1"
              overflowX="auto" // Enable horizontal scrolling
              whiteSpace="nowrap" // Keep cards in a single row
            >
              {state?.lists?.map((e: List) => {
                const listTasks = state.tasks.filter(
                  (task: Task) => task.listId === e.id
                );
                return (
                  <Cards
                    key={e.id}
                    id={e.id}
                    name={e.name}
                    tasks={listTasks} // Pass filtered tasks
                  />
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
      </Flex>
    </>
  );
};
export default BoardView;
