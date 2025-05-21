// import { useReducer } from "react";
// import { initialTask, TaskActionType, type Task } from "./task.types";
// import { taskReducer } from "./reducer";

// const useTaskContext = (initialTask: Task) => {
//   const [state, dispatch] = useReducer(taskReducer, initialTask);

//   const add = (newTask: Task) =>
//     dispatch({
//       type: TaskActionType.ADD,
//       task: newTask,
//     });

//   return { state, add };
// };

// type UseTaskContextType = ReturnType<typeof useTaskContext>;

// // export TaskContext = createContext<useTaskContextType>

// const initContextState: UseTaskContextType = {
//   state: initialTask,
// };

// Cards/TaskContext.tsx

// import { createContext, useReducer, type ReactNode } from "react";
// import { taskReducer } from "./reducer";
// import { initialState } from "./taskInitialState";
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
