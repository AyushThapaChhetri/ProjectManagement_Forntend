export interface Project {
  id: string;
  uid: string;
  name: string;
  description?: string;
  deadline?: string; // ISO string, e.g., "2025-05-27T12:00:00Z"
  managerId: number;
  createdAt: string;
  updatedAt: string;
  // For inline editing on sidebar
}
export interface ProjectState {
  //   selectedProjectId: string | null; // Optional but helpful
  selectedProjectId: string | null;
  projects: Project[];
}

export type ProjectAction =
  // Sets the entire list of projects, usually after fetching from the backend
  | { type: "SET_PROJECTS"; payload: Project[] }

  // Adds a new project to the state
  | { type: "ADD_PROJECT"; payload: Project }

  // Updates an existing project based on its ID with the given partial updates
  | {
      type: "UPDATE_PROJECT";
      payload: { id: string; updates: Partial<Project> };
    }

  // Deletes a project by its ID
  | { type: "DELETE_PROJECT"; payload: { id: string } }

  // Toggles or sets the isEditing state of a specific project (for inline editing UI)
  | {
      type: "SELECT_PROJECT";
      payload: { id: string };
    }
  | {
      type: "DESELECT_PROJECT";
    };
