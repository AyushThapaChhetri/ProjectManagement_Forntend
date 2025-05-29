import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ProjectAddPopover from "./ProjectAddPopover";
import type { Project } from "../Cards/reducer/project.type";
import { ProjectApi } from "@/api/ProjectApi";
import type { ProjectContextType } from "../Cards/context/ProjectContext";
import { useState } from "react";
interface ProjectEditPopoverProps {
  showIcons: boolean;
  project: Project;
  projectActions: ProjectContextType["projectActions"];
  setShowIcons: React.Dispatch<React.SetStateAction<boolean>>;
  // setShowIcons: (visibility: boolean) => void;
  // setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // menuOpen: boolean;
}
const ProjectEditPopover = ({
  showIcons,
  project,
  setShowIcons,
  projectActions,
}: ProjectEditPopoverProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [editOpen, setEditOpen] = useState(false);
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
              e.stopPropagation();
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
                  // console.log("EDIT SUBMIT PAYLOAD:", project.id, data);
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
                onSelect={() => {
                  ProjectApi.deleteProject(project.id, projectActions);
                }}
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
