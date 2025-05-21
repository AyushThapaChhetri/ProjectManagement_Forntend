import { useReducer, type ReactNode } from "react";
import { taskReducer } from "./reducer";
import { initialState } from "./taskInitialState";
import { TaskContext } from "./TaskContext";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
