import { createContext } from "react";
import type { Project, ProjectState } from "../reducer/project.type";

export interface ProjectContextType {
  state: ProjectState;
  projectActions: {
    selectProject: (projectUid: string) => void;
    addProject: (newProject: Project) => void;
    updateProject: (projectId: string, updateProject: Partial<Project>) => void;
    deleteProject: (projectId: string) => void;
    deselectProject: () => void;
    setProjects: (projects: Project[]) => void;
  };
}
export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);
