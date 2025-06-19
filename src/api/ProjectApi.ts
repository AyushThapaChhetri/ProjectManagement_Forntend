import type { ProjectContextType } from "@/components/Cards/context/ProjectContext";

type ProjectActions = ProjectContextType["projectActions"];
type ProjectPayload = {
  name: string;
  description?: string | undefined;
  deadline?: string | undefined;
};
export const ProjectApi = {
  async createProject(data: ProjectPayload, projectActions: ProjectActions) {
    const newProject = {
      id: `temp-${Date.now()}`,
      uid: "",
      name: data.name,
      description: data.description,
      deadline: data.deadline, // ISO string, e.g., "2025-05-27T12:00:00Z"
      managerId: 1,
      createdAt: new Date(Date.now()).toISOString(),
      updatedAt: new Date(Date.now()).toISOString(),
    };
    projectActions.addProject(newProject);
  },
  async selectProject(projectId: string, projectActions: ProjectActions) {
    projectActions.selectProject(projectId);
  },
  async updateProject(
    projectId: string,
    data: ProjectPayload,
    projectActions: ProjectActions
  ) {
    const finalData = {
      ...data,
      updatedAt: new Date(Date.now()).toISOString(),
    };
    projectActions.updateProject(projectId, finalData);
  },
  async deleteProject(projectId: string, projectActions: ProjectActions) {
    projectActions.deleteProject(projectId);
  },
  async deselectProject(projectActions: ProjectActions) {
    projectActions.deselectProject();
  },
};
