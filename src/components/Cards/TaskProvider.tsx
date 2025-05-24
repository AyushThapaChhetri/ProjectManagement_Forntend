import { useEffect, useReducer, type ReactNode } from "react";
import { taskReducer } from "./reducer";
import { initialState } from "./taskInitialState";
import { TaskContext } from "./TaskContext";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  // const [state, dispatch] = useReducer(taskReducer, initialState);
  const [state, dispatch] = useReducer(taskReducer, initialState, () => {
    const localData = localStorage.getItem("localStorageItem");
    return localData ? JSON.parse(localData) : initialState;
  });
  console.log("state: ", state);

  useEffect(() => {
    localStorage.setItem("localStorageItem", JSON.stringify(state));
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
