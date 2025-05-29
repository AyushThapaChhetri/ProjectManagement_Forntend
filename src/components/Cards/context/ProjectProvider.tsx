import { useEffect, useReducer, type ReactNode } from "react";
import { ProjectContext } from "./ProjectContext";
import type { Project } from "../reducer/project.type";
import { initialProjectState } from "../reducer/initialProjectState";
import { projectReducer } from "../reducer/projectReducer";

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    projectReducer,
    initialProjectState,
    () => {
      const localData = localStorage.getItem("projectState");
      return localData ? JSON.parse(localData) : initialProjectState;
    }
  );
  const selectProject = (projectId: string) => {
    console.log("project id from provider", projectId);
    dispatch({ type: "SELECT_PROJECT", payload: { id: projectId } });
  };
  const addProject = (newProject: Project) => {
    // console.log("Project from the Provider: ", newProject);
    dispatch({ type: "ADD_PROJECT", payload: newProject });
  };
  const updateProject = (
    projectId: string,
    updateProject: Partial<Project>
  ) => {
    // console.log("Project from the Provider: ", IdleDeadline, updateProject);
    dispatch({
      type: "UPDATE_PROJECT",
      payload: {
        id: projectId,
        updates: updateProject,
      },
    });
  };

  const deleteProject = (projectId: string) => {
    console.log("Project to be deleted: ", projectId);
    dispatch({ type: "DELETE_PROJECT", payload: { id: projectId } });
  };
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
        },
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
