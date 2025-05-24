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

export interface Task {
  id: string;
  listId: string;
  uid: string;
  projectId: number;
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
  | { type: "DELETE_TASK"; payload: { id: string } }
  | { type: "DELETE_ALL_TASK"; payload: { id: string } }
  // Add list actions
  | { type: "ADD_LIST"; payload: List }
  | { type: "UPDATE_LIST"; payload: { id: string; updates: Partial<List> } }
  | { type: "DELETE_LIST"; payload: { id: string } };
// | { type: "DELETE_LIST"; payload: string };
