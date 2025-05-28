import { useEffect, useReducer, useState, type ReactNode } from "react";

import { initialState } from "../reducer/taskInitialState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "../reducer/reducer";
import type { List, Task } from "../reducer/task.types";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState, () => {
    const localData = localStorage.getItem("localStorageItem");
    return localData ? JSON.parse(localData) : initialState;
  });

  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [activeList, setActiveList] = useState<string | null>(null);
  // console.log("state: ", activeTask);

  const selectTask = (taskId: string | null) => {
    setActiveTask(taskId);
  };

  const selectList = (listId: string | null) => {
    setActiveList(listId);
  };

  const addTask = (newTask: Task) => {
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const updateTask = (taskId: string, task: Partial<Task>) => {
    dispatch({ type: "UPDATE_TASK", payload: { id: taskId, updates: task } });
  };

  const deleteTask = (taskId: string) => {
    dispatch({ type: "DELETE_TASK", payload: { id: taskId } });
  };

  const deleteAllTask = (listId: string) => {
    dispatch({ type: "DELETE_ALL_TASK", payload: { id: listId } });
  };

  const addList = (newList: List) => {
    dispatch({ type: "ADD_LIST", payload: newList });
  };

  const updateList = (listId: string, list: Partial<List>) => {
    dispatch({ type: "UPDATE_LIST", payload: { id: listId, updates: list } });
  };
  const deleteList = (listId: string) => {
    dispatch({ type: "DELETE_LIST", payload: { id: listId } });
  };

  // const clearState = () => {
  //   dispatch({ type: "RESET_STATE" });
  //   localStorage.removeItem("localStorageItem");
  // };
  const onDrop = (position: number, listId?: string) => {
    // console.log(
    //   `${activeTask} is going to place into ${listId} and at the postion ${position}`
    // );
    console.log(
      `${activeList} list is going to place into   at the postion ${position}`
    );

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
      // value={{
      //   state,
      //   dispatch,
      //   activeTask,
      //   selectTask,
      //   addTask,
      //   updateTask,
      //   deleteTask,
      //   deleteAllTask,
      //   activeList,
      //   selectList,
      //   addList,
      //   updateList,
      //   deleteList,
      //   onDrop,
      // }}
      value={{
        state,
        dispatch,
        activeTask,
        activeList,
        selectTask,
        selectList,
        onDrop,
        taskActions: {
          addTask,
          updateTask,
          deleteTask,
          deleteAllTask,
        },
        listActions: {
          addList,
          updateList,
          deleteList,
        },
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
