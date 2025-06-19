import { createContext } from "react";
// import type { TaskState, TaskAction } from "./task.types";
import type { AppState, List, Task, TaskAction } from "../reducer/task.types";

export interface TaskContextType {
  // state: TaskState;
  state: AppState;
  dispatch: React.Dispatch<TaskAction>;
  activeTask: string | null;
  selectTask: (taskId: string | null) => void;

  taskActions: {
    addTask: (newTask: Task) => void;
    updateTask: (taskId: string, task: Partial<Task>) => void;
    deleteTask: (taskId: string) => void;
    deleteAllTask: (listId: string) => void;
  };
  activeList: string | null;
  selectList: (listId: string | null) => void;

  listActions: {
    addList: (newList: List) => void;
    updateList: (listId: string, list: Partial<List>) => void;
    deleteList: (listId: string) => void;
    deleteProjectList: (projectId: string) => void;
  };
  onDrop: (position: number, listId?: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
