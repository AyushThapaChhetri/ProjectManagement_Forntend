import { useEffect, useReducer, useState, type ReactNode } from "react";

import { initialState } from "../reducer/taskInitialState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "../reducer/reducer";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  // const [state, dispatch] = useReducer(taskReducer, initialState);
  const [state, dispatch] = useReducer(taskReducer, initialState, () => {
    const localData = localStorage.getItem("localStorageItem");
    return localData ? JSON.parse(localData) : initialState;
  });

  const [activeTask, setActiveTask] = useState<string | null>(null);
  // console.log("state: ", state);
  const onDrop = (listId: string, position: number) => {
    // console.log(
    //   `${activeTask} is going to place into ${listId} and at the postion ${position}`
    // );

    if (activeTask == null || activeTask === undefined) return;

    dispatch({
      type: "MOVE_TASK",
      payload: {
        id: activeTask,
        listId,
        position,
      },
    });
  };

  useEffect(() => {
    localStorage.setItem("localStorageItem", JSON.stringify(state));
  }, [state]);

  return (
    <TaskContext.Provider
      value={{ state, dispatch, activeTask, setActiveTask, onDrop }}
    >
      {children}
    </TaskContext.Provider>
  );
};
