import { Flex, Text } from "@chakra-ui/react";
import type { Project } from "../Cards/reducer/project.type";
import { useState } from "react";
import type { ProjectContextType } from "../Cards/context/ProjectContext";
import { ProjectApi } from "@/api/ProjectApi";
import ProjectEditPopover from "../popover/ProjectEditPopover";

interface SideBarProjectProps {
  project: Project;
  projectActions: ProjectContextType["projectActions"];
  selectedProjectId: string | null;
}
const SideBarProject = ({
  project,
  projectActions,
  selectedProjectId,
}: SideBarProjectProps) => {
  const [showIcons, setShowIcons] = useState(false);

  const handleProjectClick = () => {
    ProjectApi.selectProject(project.id, projectActions);
  };
  // console.log("From SideBar", selectedProjectId);

  return (
    <>
      <Flex
        align="center"
        rounded="md"
        ml="10px"
        py={"5px"}
        px="20px"
        bg={selectedProjectId === project.id ? "gray.300" : "transparent"}
        _hover={{
          bg: "gray.300",
        }}
        onMouseEnter={() => {
          setShowIcons(true);
        }}
        onMouseLeave={() => setShowIcons(false)}
        justify="space-between"
        cursor="pointer"
        caretColor="transparent"
        onClick={handleProjectClick}
      >
        <Text fontSize={{ base: "14px", wide: "17px" }}>{project.name}</Text>

        <ProjectEditPopover
          showIcons={showIcons}
          project={project}
          setShowIcons={setShowIcons}
          projectActions={projectActions}
        />
      </Flex>
    </>
  );
};

export default SideBarProject;
