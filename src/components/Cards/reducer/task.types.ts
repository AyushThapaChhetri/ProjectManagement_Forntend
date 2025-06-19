export const Priorities = ["high", "medium", "low"] as const;
export type Priority = (typeof Priorities)[number];

export const Statuses = [
  "todo",
  "inProgress",
  "inReview",
  "completed",
] as const;
// TypeScript infers:readonly ["todo", "inProgress", "inReview", "completed"]
export type Status = (typeof Statuses)[number];
// This creates a union type from the array. type Status = "todo" | "inProgress" | "inReview" | "completed";
// Since the array's index type is number (because you access elements like Statuses[0], Statuses[1], etc.), you do:

// export interface Project {
//   id: number;
//   uid: string;
//   name: string;
//   description?: string;
//   deadline?: string; // ISO string, e.g., "2025-05-27T12:00:00Z"
//   managerId: number;
//   createdAt: string;
//   updatedAt: string;
//   isEditing: boolean; // For inline editing on sidebar
// }

export interface List {
  id: string;
  uid: string;
  name: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  isEditing: boolean;
}

export interface Task {
  id: string;
  listId: string;
  uid: string;
  projectId: string;
  name: string;
  description?: string;
  priority: Priority;
  status: Status;
  startDate?: string;
  endDate?: string;
  estimatedHours?: number;
  assignedToId?: number;
  createdAt: string;
  updatedAt: string;
  isEditing: boolean;
}

export interface AppState {
  // selectedProjectId: number | null; // Optional but helpful

  // projects: Project[];
  lists: List[];
  tasks: Task[];
}

// export interface TaskState {
//   tasks: Task[];
// }

// export type ProjectAction =
//   // Sets the entire list of projects, usually after fetching from the backend
//   | { type: "SET_PROJECTS"; payload: Project[] }

//   // Adds a new project to the state
//   | { type: "ADD_PROJECT"; payload: Project }

//   // Updates an existing project based on its ID with the given partial updates
//   | {
//       type: "UPDATE_PROJECT";
//       payload: { id: number; updates: Partial<Project> };
//     }

//   // Deletes a project by its ID
//   | { type: "DELETE_PROJECT"; payload: { id: number } }

//   // Toggles or sets the isEditing state of a specific project (for inline editing UI)
//   | {
//       type: "SET_PROJECT_EDITING";
//       payload: { id: number; isEditing: boolean };
//     };

export type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: { id: string; updates: Partial<Task> } }
  | { type: "DELETE_TASK"; payload: { id: string } }
  | { type: "DELETE_ALL_TASK"; payload: { id: string } }
  | {
      type: "MOVE_TASK";
      payload: { id: string; listId: string; position: number };
    }
  // Add list actions
  | { type: "ADD_LIST"; payload: List }
  | { type: "UPDATE_LIST"; payload: { id: string; updates: Partial<List> } }
  | { type: "DELETE_LIST"; payload: { id: string } }
  | { type: "MOVE_LIST"; payload: { listId: string; position: number } }
  | { type: "DELETE_PROJECT_LIST"; payload: { pId: string } };
// | { type: "DELETE_LIST"; payload: string };
