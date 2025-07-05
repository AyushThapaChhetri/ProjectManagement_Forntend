import { useEffect, useReducer, type ReactNode } from "react";
import { ProjectContext } from "./ProjectContext";
import type { Project } from "../reducer/project.type";
import { initialProjectState } from "../reducer/initialProjectState";
import { projectReducer } from "../reducer/projectReducer";
import { ProjectApi } from "@/api/ProjectApi";

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    projectReducer,
    initialProjectState,
    () => {
      const localData = localStorage.getItem("projectState");
      return localData ? JSON.parse(localData) : initialProjectState;
    }
  );
  const selectProject = (projectUid: string) => {
    // console.log("project id from provider", projectUid);
    dispatch({ type: "SELECT_PROJECT", payload: { uid: projectUid } });
  };

  const deselectProject = () => {
    console.log("deselect project");
    dispatch({ type: "DESELECT_PROJECT" });
  };
  const addProject = (newProject: Project) => {
    // console.log("Project from the Provider: ", newProject);
    dispatch({ type: "ADD_PROJECT", payload: newProject });
  };
  const updateProject = (
    projectUid: string,
    updateProject: Partial<Project>
  ) => {
    // console.log("Project from the Provider: ", IdleDeadline, updateProject);
    dispatch({
      type: "UPDATE_PROJECT",
      payload: {
        uid: projectUid,
        updates: updateProject,
      },
    });
  };

  const deleteProject = (projectId: string) => {
    console.log("Project to be deleted: ", projectId);
    dispatch({ type: "DELETE_PROJECT", payload: { uid: projectId } });
  };
  const setProjects = (projects: Project[]) => {
    dispatch({ type: "SET_PROJECTS", payload: projects });
  };

  // Fetch projects on mount
  useEffect(() => {
    ProjectApi.fetchProjects({
      selectProject,
      addProject,
      updateProject,
      deleteProject,
      deselectProject,
      setProjects,
    });
  }, []);

  // Sync local storage
  useEffect(() => {
    localStorage.setItem("projectState", JSON.stringify(state));
  }, [state]);

  return (
    <ProjectContext.Provider
      value={{
        state,
        projectActions: {
          selectProject,
          addProject,
          updateProject,
          deleteProject,
          deselectProject,
          setProjects,
        },
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
