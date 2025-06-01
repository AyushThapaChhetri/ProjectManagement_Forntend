import ListApi from "@/api/ListApi";
import CardDropArea from "@/components/Cards/CardDropArea";
import Cards from "@/components/Cards/Cards";
import type { Task, List } from "@/components/Cards/reducer/task.types";
import { useProjectContext } from "@/hooks/userProjectContext";
import { useTaskContext } from "@/hooks/useTaskContext";
import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import React, {
  // useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

interface BoardProps {
  projectId: string;
}

const Project = ({ projectId }: BoardProps) => {
  // const Project = () => {
  const [showAddListForm, setShowAddListForm] = useState(false);
  const { state: projectState } = useProjectContext();
  const { state, listActions, onDrop } = useTaskContext();
  const [listName, setListName] = useState({
    name: "",
  });

  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // NEW: State to store the height of the currently dragged card
  const [draggedCardHeight, setDraggedCardHeight] = useState<
    number | undefined
  >(undefined);

  const project = useMemo(() => {
    return projectState?.projects?.find((p) => p.id === projectId);
  }, [projectState?.projects, projectId]);

  // Only the lists that belong to this project:
  const projectList = useMemo(
    () => state?.lists?.filter((l) => l.projectId === project?.id) ?? [],
    [state.lists, project?.id]
  );

  // Only the tasks that belong to this project:
  const projectTask = useMemo(
    () => state?.tasks?.filter((t) => t.projectId === project?.id) ?? [],
    [state.tasks, project?.id]
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = listName.name.trim();
    if (trimmed === "") {
      // console.log("Input is empty. Submission prevented.");
      return;
    } else {
      // ListApi.createList(listName.name, listActions);
      ListApi.createList(listName.name, projectId, listActions);

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
              (task: Task) => task.listId === e.id
            );
            return (
              <React.Fragment key={e.id}>
                <Cards
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  projectId={e.projectId}
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
    </>
  );
};

export default Project;
