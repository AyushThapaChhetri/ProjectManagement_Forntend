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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProjectClick = () => {
    // console.log("From SideBar");
    ProjectApi.selectProject(project.uid, projectActions);
  };
  // console.log("From SideBar", selectedProjectId);

  return (
    <>
      <Flex
        onMouseEnter={() => {
          setShowIcons(true);
        }}
        onMouseLeave={() => {
          // Only hide if menu is not open
          if (!menuOpen) setShowIcons(false);
        }}
        onClick={handleProjectClick}
      >
        <ProjectEditPopover
          showIcons={showIcons}
          project={project}
          setShowIcons={setShowIcons}
          projectActions={projectActions}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </Flex>
    </>
  );
};

export default SideBarProject;
