import type { ProjectContextType } from "@/components/Cards/context/ProjectContext";
import api from "./Api";

type ProjectActions = ProjectContextType["projectActions"];
type ProjectPayload = {
  name: string;
  description?: string | undefined;
  deadline?: string | undefined;
};

export const ProjectApi = {
  async createProject(data: ProjectPayload, projectActions: ProjectActions) {
    // const newProject = {
    //   id: `temp-${Date.now()}`,
    //   uid: "",
    //   name: data.name,
    //   description: data.description,
    //   deadline: data.deadline,
    //   managerId: 1,
    //   createdAt: new Date(Date.now()).toISOString(),
    //   updatedAt: new Date(Date.now()).toISOString(),
    // };
    try {
      const response = await api.post("/projects", data);
      const newProject = response.data;
      // console.log(newProject);
      projectActions.addProject(newProject.data);
    } catch (error) {
      console.error("Failed to create project:", error);
      throw error;
    }
  },
  async selectProject(projectUid: string, projectActions: ProjectActions) {
    // console.log("select Project from api:", projectUid);
    projectActions.selectProject(projectUid);
  },
  async updateProject(
    projectUid: string,
    data: ProjectPayload,
    projectActions: ProjectActions
  ) {
    try {
      const response = await api.put(`/projects/${projectUid}`, data);
      projectActions.updateProject(projectUid, response.data.data);
    } catch (error) {
      console.error("Failed to update project:", error);
      throw error;
    }
  },
  async deleteProject(projectUid: string, projectActions: ProjectActions) {
    try {
      await api.delete(`/projects/${projectUid}`);
      projectActions.deleteProject(projectUid);
    } catch (error) {
      console.error("Failed to delete project:", error);
      throw error;
    }
  },
  async deselectProject(projectActions: ProjectActions) {
    projectActions.deselectProject();
  },
  async fetchProjects(projectActions: ProjectActions) {
    try {
      const response = await api.get("/projects");
      const projects = response.data;
      projectActions.setProjects(projects.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  },
};
