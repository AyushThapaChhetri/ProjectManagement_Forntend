import { createContext } from "react";
// import type { TaskState, TaskAction } from "./task.types";
import type { AppState, TaskAction } from "./task.types";

export interface TaskContextType {
  // state: TaskState;
  state: AppState;
  dispatch: React.Dispatch<TaskAction>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
