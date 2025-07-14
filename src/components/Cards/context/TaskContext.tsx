import { createContext } from "react";
// import type { TaskState, TaskAction } from "./task.types";
import type { AppState, List, Task, TaskAction } from "../reducer/task.types";

export interface TaskContextType {
  // state: TaskState;
  state: AppState;
  dispatch: React.Dispatch<TaskAction>;
  activeTask: string | null;
  selectTask: (taskUid: string | null) => void;

  taskActions: {
    state: AppState;
    findTask: (taskUid: string) => void;
    selectTaskState: (taskUid: string) => void;
    clearSelectedTask: () => void;
    addTask: (newTask: Task) => void;
    updateTask: (taskUid: string, task: Partial<Task>) => void;
    deleteTask: (taskUid: string) => void;
    deleteAllTask: (listId: string) => void;
    setTasks: (tasks: Task[]) => void;
  };
  activeList: string | null;
  selectList: (listUid: string | null) => void;

  listActions: {
    addList: (newList: List) => void;
    updateList: (listId: string, list: Partial<List>) => void;
    deleteList: (listId: string) => void;
    deleteProjectList: (projectUid: string) => void;
    setLists: (lists: List[]) => void;
  };
  onDrop: (position: number, listId?: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
