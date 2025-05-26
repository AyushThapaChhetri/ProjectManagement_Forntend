import { createContext } from "react";
// import type { TaskState, TaskAction } from "./task.types";
import type { AppState, TaskAction } from "../reducer/task.types";

export interface TaskContextType {
  // state: TaskState;
  state: AppState;
  dispatch: React.Dispatch<TaskAction>;
  activeTask: string | null;
  setActiveTask: React.Dispatch<React.SetStateAction<string | null>>;
  activeList: string | null;
  setActiveList: React.Dispatch<React.SetStateAction<string | null>>;
  onDrop: (position: number, listId?: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
