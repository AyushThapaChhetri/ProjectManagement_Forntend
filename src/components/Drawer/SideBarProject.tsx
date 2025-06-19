import { Flex } from "@chakra-ui/react";
import type { Project } from "../Cards/reducer/project.type";
import { useState } from "react";
// import type { ProjectContextType } from "../Cards/context/ProjectContext";
import { ProjectApi } from "@/api/ProjectApi";
import ProjectEditPopover from "../popover/ProjectEditPopover";
import { useProjectContext } from "@/hooks/userProjectContext";

interface SideBarProjectProps {
  project: Project;
  // projectActions: ProjectContextType["projectActions"];
  // selectedProjectId: string | null;
}
const SideBarProject = ({
  project,
  // projectActions,
  // selectedProjectId,
}: SideBarProjectProps) => {
  const [showIcons, setShowIcons] = useState(false);
  const { projectActions } = useProjectContext();

  const handleProjectClick = () => {
    ProjectApi.selectProject(project.id, projectActions);
  };
  // console.log("From SideBar", selectedProjectId);

  return (
    <>
      <Flex
        onMouseEnter={() => {
          setShowIcons(true);
        }}
        onMouseLeave={() => setShowIcons(false)}
        onClick={handleProjectClick}
      >
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
