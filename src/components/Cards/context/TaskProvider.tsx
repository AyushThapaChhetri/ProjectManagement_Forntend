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
  const [activeList, setActiveList] = useState<string | null>(null);
  console.log("state: ", activeTask);
  const onDrop = (position: number, listId?: string) => {
    // console.log(
    //   `${activeTask} is going to place into ${listId} and at the postion ${position}`
    // );
    console.log(
      `${activeList} list is going to place into   at the postion ${position}`
    );

    // 1) If we’re dropping a list
    //   if (activeList == null || activeList === undefined) return;
    //   if (activeList) {
    //     dispatch({
    //       type: "MOVE_LIST",
    //       payload: { listId: activeList, position },
    //     });
    //     setActiveList(null);
    //     return;
    //   }

    //   if (activeTask == null || activeTask === undefined) return;

    //   if (!listId) {
    //     console.error("listId is required for MOVE_TASK");
    //     return;
    //   }

    //   dispatch({
    //     type: "MOVE_TASK",
    //     payload: {
    //       id: activeTask,
    //       listId,
    //       position,
    //     },
    //   });

    //   setActiveTask(null);
    // };

    // First check if we're dropping a list
    if (activeList) {
      dispatch({
        type: "MOVE_LIST",
        payload: { listId: activeList, position },
      });
      setActiveList(null);
      return;
    }

    // Then check if it's a task
    if (activeTask && listId) {
      dispatch({
        type: "MOVE_TASK",
        payload: {
          id: activeTask,
          listId,
          position,
        },
      });
      setActiveTask(null);
      return;
    }
  };
  useEffect(() => {
    localStorage.setItem("localStorageItem", JSON.stringify(state));
  }, [state]);

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        activeTask,
        setActiveTask,
        activeList,
        setActiveList,
        onDrop,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
