import type { ProjectAction, ProjectState } from "./project.type";

export const projectReducer = (
  state: ProjectState,
  action: ProjectAction
): ProjectState => {
  switch (action.type) {
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case "SELECT_PROJECT":
      return {
        ...state,
        selectedProjectId: action.payload.id,
      };
    case "UPDATE_PROJECT": {
      const { id, updates } = action.payload;

      const findProject = state?.projects?.find((p) => p.id === id);
      if (!findProject) return state;

      // const changingProject = state?.projects?.filter((p) => p.id === id);

      // const filteredProject = state?.projects?.filter((p) => p.id !== id);

      const editProject = {
        ...findProject,
        name: updates.name !== undefined ? updates.name : findProject.name,
        description:
          updates.description !== undefined
            ? updates.description
            : findProject.description,
        deadline:
          updates.deadline !== undefined
            ? updates.deadline
            : findProject.deadline,
        updatedAt:
          updates.updatedAt !== undefined
            ? updates.updatedAt
            : findProject.updatedAt,
      };

      // const updatedProject = [...filteredProject, editProject];

      const updatedProject = state?.projects?.map((p) =>
        p.id === id ? editProject : p
      );

      return {
        ...state,
        projects: updatedProject,
      };
    }

    // case "DELETE_PROJECT": {
    //   const projects = state?.projects?.filter(
    //     (p) => p.id !== action.payload.id
    //   );
    //   return {
    //     ...state,
    //     projects: projects,
    //   };
    // }
    case "DELETE_PROJECT": {
      return {
        ...state,
        projects: state.projects?.filter((p) => p.id !== action.payload.id),
      };
    }
    case "DESELECT_PROJECT":
      return {
        ...state,
        selectedProjectId: null,
      };
    default:
      return state;
  }
};
