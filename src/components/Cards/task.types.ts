export interface Task {
  id: string;
  listId: string;
  uid: string;
  projectId: number;
  name: string;
  description?: string;
  priority: string;
  status: string;
  startDate?: string;
  endDate?: string;
  estimatedHours?: number;
  assignedToId?: number;
  createdAt: string;
  updatedAt: string;
  isEditing: boolean;
}

export interface List {
  id: string;
  uid: string;
  name: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
  isEditing: boolean;
}

export interface AppState {
  lists: List[];
  tasks: Task[];
}

// export interface TaskState {
//   tasks: Task[];
// }

export type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: { id: string; updates: Partial<Task> } }
  | { type: "DELETE_TASK"; payload: string }
  // Add list actions
  | { type: "ADD_LIST"; payload: List }
  | { type: "UPDATE_LIST"; payload: { id: string; updates: Partial<List> } }
  | { type: "DELETE_LIST"; payload: string };
