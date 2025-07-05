import ListApi from "@/api/ListApi";
import CardDropArea from "@/components/Cards/CardDropArea";
import Cards from "@/components/Cards/Cards";
import type { Task, List } from "@/components/Cards/reducer/task.types";
import { useProjectContext } from "@/hooks/userProjectContext";
import { useTaskContext } from "@/hooks/useTaskContext";
import { handleApiError } from "@/utils/handleApiError";
import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import React, {
  // useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
// import { toast } from "react-toastify";

interface BoardProps {
  projectUid: string;
}

const Project = ({ projectUid }: BoardProps) => {
  // const Project = () => {
  const [showAddListForm, setShowAddListForm] = useState(false);
  const { state: projectState } = useProjectContext();
  const { state, listActions, onDrop } = useTaskContext();
  const [listName, setListName] = useState({
    name: "",
  });
  // console.log("From Project");

  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // NEW: State to store the height of the currently dragged card
  const [draggedCardHeight, setDraggedCardHeight] = useState<
    number | undefined
  >(undefined);

  const project = useMemo(() => {
    return projectState?.projects?.find((p) => p.uid === projectUid);
  }, [projectState?.projects, projectUid]);

  // Only the lists that belong to this project:
  const projectList = useMemo(
    () => state?.lists?.filter((l) => l.projectUid === project?.uid) ?? [],
    [state.lists, project?.uid]
  );

  // Only the tasks that belong to this project:
  const projectTask = useMemo(
    () => state?.tasks?.filter((t) => t.projectUid === project?.uid) ?? [],
    [state.tasks, project?.uid]
  );

  // useEffect(() => {
  //   if (project) {
  //     console.log("Project found: ", project);
  //   }
  // }, [project]);

  if (!project) return;

  // const projectList = state?.lists?.filter((l) => l.projectId === project.id);
  // const projectTask = state?.tasks?.filter((t) => t.projectId === project.id);

  // NEW: Callback function to receive height from the Cards component when drag starts
  const handleCardDragStart = (height: number) => {
    setDraggedCardHeight(height); // Set the height to apply to all drop areas
    // console.log(
    //   `BoardView: Card ${cardId} started dragging. Its height: ${height}px`
    // );
  };

  // NEW: Callback function to reset height when drag ends
  // const handleCardDragEnd = (cardId: string) => {
  const handleCardDragEnd = () => {
    // console.log("Started Dragging");
    setDraggedCardHeight(undefined); // Clear the height when drag ends
    // console.log(`BoardView: Card ${cardId} stopped dragging.`);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmed = listName.name.trim();
    if (trimmed === "") {
      // console.log("Input is empty. Submission prevented.");
      return;
    } else {
      try {
        // ListApi.createList(listName.name, listActions);
        await ListApi.createList(listName.name, projectUid, listActions);
        // await ListApi.createList(listName.name, projectUid);
        // toast.success(`Successfully Created List ${listName.name}`);
        setShowAddListForm(false);
        setListName({ name: "" });
      } catch (error: unknown) {
        handleApiError(error);
      }
    }
  };

  const handleBlur = () => {
    if (listName.name.trim() === "") {
      setShowAddListForm(false);
      setListName({ name: "" }); // Clear input
    }
  };
  return (
    <>
      <Flex direction="column" width="100%" h="100%">
        <Flex
          boxShadow="sm"
          h={{ base: "4rem", wide: "3rem" }}
          pl="2rem"
          align="center"
          bg="gray.100"
          flexShrink="0"
        >
          {/* <Heading>Boards</Heading> */}
          <Heading>{project.name}</Heading>
        </Flex>
        <Flex
          //   border={"2px solid black"}
          //   bg="yellow"
          py={"1.5rem"}
          pr={"3rem"}
          h={"100%"}
          overflowX="auto"
        >
          {/* NEW: Initial CardDropArea, uses the draggedCardHeight */}
          <CardDropArea
            position={0}
            onDrop={onDrop}
            expectedHeight={draggedCardHeight}
          />

          {/* {state?.lists?.map((e: List, i) => { */}
          {projectList?.map((e: List, i) => {
            // const listTasks = state.tasks.filter(
            const listTasks = projectTask?.filter(
              (task: Task) => task.listUid === e.uid
            );
            return (
              <React.Fragment key={e.uid}>
                <Cards
                  key={e.uid}
                  uid={e.uid}
                  name={e.name}
                  projectUid={e.projectUid}
                  tasks={listTasks} // Pass filtered tasks
                  draggable
                  innerRef={(el) => {
                    // Using the direct `ref` prop
                    if (el) cardRefs.current.set(e.uid, el);
                    else cardRefs.current.delete(e.uid);
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
    </>
  );
};

export default Project;
