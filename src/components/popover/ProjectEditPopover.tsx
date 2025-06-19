import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ProjectAddPopover from "./ProjectAddPopover";
import type { Project } from "../Cards/reducer/project.type";
import { ProjectApi } from "@/api/ProjectApi";
import type { ProjectContextType } from "../Cards/context/ProjectContext";
import { useState } from "react";
import { useTaskContext } from "@/hooks/useTaskContext";
// import TaskApi from "@/api/TaskApi";
import ListApi from "@/api/ListApi";
import { useNavigate } from "react-router";
interface ProjectEditPopoverProps {
  showIcons: boolean;
  project: Project;
  projectActions: ProjectContextType["projectActions"];
  setShowIcons: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProjectEditPopover = ({
  showIcons,
  project,
  setShowIcons,
  projectActions,
}: ProjectEditPopoverProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { listActions } = useTaskContext();
  const navigate = useNavigate();
  const handleDeleteProject = async () => {
    try {
      await ProjectApi.deleteProject(project.id, projectActions);
      await ListApi.deleteProjectList(project.id, listActions);
      navigate("/body");
    } catch (error) {
      console.error("Failed to delete project or list:", error);
    }
  };

  return (
    <>
      <Menu.Root
        open={menuOpen}
        onOpenChange={(details) => setMenuOpen(details.open)}
      >
        <Menu.Trigger asChild>
          <IconButton
            size="xs"
            rounded="md"
            opacity={showIcons ? 1 : 0}
            pointerEvents={showIcons ? "auto" : "none"}
            variant="outline"
            bg="none"
            _hover={{
              bg: "gray.400",
            }}
            onClick={(e) => {
              // e.preventDefault();
              e.stopPropagation();
              console.log("Clicked From Edit button");
            }}
          >
            <HiOutlineDotsHorizontal />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <ProjectAddPopover
                key={project.id}
                mode="edit"
                initialData={{
                  name: project.name,
                  description: project.description ?? undefined,
                  deadline: project.deadline ?? undefined,
                }}
                setShowIcons={setShowIcons}
                onSubmitHandler={(data) => {
                  ProjectApi.updateProject(project.id, data, projectActions);
                  setMenuOpen(false);
                  setShowIcons(false);
                }}
                setMenuOpen={setMenuOpen}
                triggerElement={
                  <Menu.Item
                    value="edit"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Edit
                  </Menu.Item>
                }
              />
              <Menu.Item
                value="delete"
                color="fg.error"
                _hover={{ bg: "bg.error", color: "fg.error" }}
                onSelect={handleDeleteProject}
              >
                Delete...
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
};

export default ProjectEditPopover;
