import { useEffect, useReducer, useState, type ReactNode } from "react";

import { initialState } from "../reducer/taskInitialState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "../reducer/reducer";
import type { List, Task } from "../reducer/task.types";
import ListApi from "@/api/ListApi";
import TaskApi from "@/api/TaskApi";
import { useProjectContext } from "@/hooks/userProjectContext";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { state: projectState } = useProjectContext();

  const [state, dispatch] = useReducer(taskReducer, initialState, () => {
    const localData = localStorage.getItem("localStorageItem");
    return localData ? JSON.parse(localData) : initialState;
  });

  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [activeList, setActiveList] = useState<string | null>(null);
  // console.log("state: ", activeTask);

  const findTask = (taskUid: string) => {
    dispatch({ type: "FIND_TASK", payload: { uid: taskUid } });
  };
  const selectTask = (taskUid: string | null) => {
    setActiveTask(taskUid);
  };
  // console.log("From Provider:", activeTask);

  const selectList = (listUid: string | null) => {
    setActiveList(listUid);
  };
  // console.log("From Provider:", activeList);

  const addTask = (newTask: Task) => {
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  // const editTask = (taskUid: string, task: Partial<Task>) => {
  //   const updates = { ...task }; // shallow copy

  //   // Remove keys
  //   delete updates.id;
  //   delete updates.isEditing;

  //   dispatch({
  //     type: "EDIT_TASK",
  //     payload: { id: taskId, updates: updates },
  //   });
  // };

  const updateTask = (taskUid: string, task: Partial<Task>) => {
    dispatch({ type: "UPDATE_TASK", payload: { uid: taskUid, updates: task } });
  };

  const deleteTask = (taskUid: string) => {
    dispatch({ type: "DELETE_TASK", payload: { uid: taskUid } });
  };

  const deleteAllTask = (listUid: string) => {
    dispatch({ type: "DELETE_ALL_TASK", payload: { id: listUid } });
  };

  const setTasks = (tasks: Task[]) => {
    dispatch({ type: "SET_TASKS", payload: tasks });
  };

  const selectTaskState = (taskUid: string) => {
    dispatch({ type: "SELECT_TASKS", payload: { uid: taskUid } });
  };

  const clearSelectedTask = () => {
    dispatch({ type: "CLEAR_SELECTED_TASK" });
  };

  const addList = (newList: List) => {
    dispatch({ type: "ADD_LIST", payload: newList });
  };

  const updateList = (listUid: string, list: Partial<List>) => {
    dispatch({ type: "UPDATE_LIST", payload: { id: listUid, updates: list } });
  };
  const deleteList = (listUid: string) => {
    dispatch({ type: "DELETE_LIST", payload: { id: listUid } });
  };
  const deleteProjectList = (projectUid: string) => {
    dispatch({ type: "DELETE_PROJECT_LIST", payload: { pUid: projectUid } });
  };

  const setLists = (lists: List[]) => {
    dispatch({ type: "SET_LISTS", payload: lists });
  };

  const onDrop = (position: number, listUid?: string) => {
    // console.log(
    //   `${activeTask} is going to place into ${listUid} and at the postion ${position}`
    // );
    // console.log(
    //   `${activeList} list is going to place into   at the postion ${position}`
    // );

    // // First check if we're dropping a list
    // if (activeList) {
    //   dispatch({
    //     type: "MOVE_LIST",
    //     payload: { listUid: activeList, position },
    //   });
    //   setActiveList(null);
    //   return;
    // }

    // // Then check if it's a task
    // if (activeTask && listUid) {
    //   dispatch({
    //     type: "MOVE_TASK",
    //     payload: {
    //       id: activeTask,
    //       listUid,
    //       position,
    //     },
    //   });
    //   setActiveTask(null);
    //   return;
    // }
    // console.log(`onDrop called with position: ${position}, listUid: ${listUid}`);
    // console.log(`ActiveTask: ${activeTask}, ActiveList: ${activeList}`);
    try {
      // First check if we're dropping a list
      if (activeList) {
        dispatch({
          type: "MOVE_LIST",
          payload: { listUid: activeList, position },
        });
        // Moved setActiveList to dragend callback
        return;
      }

      if (activeTask && listUid) {
        dispatch({
          type: "MOVE_TASK",
          payload: {
            uid: activeTask,
            listUid,
            position,
          },
        });
        // Moved setActiveTask to dragend callback
        return;
      }
    } finally {
      // Always reset active states after drop
      setActiveList(null);
      setActiveTask(null);
    }
  };

  useEffect(() => {
    if (projectState.selectedProjectUid) {
      ListApi.fetchLists(projectState.selectedProjectUid, {
        addList,
        updateList,
        deleteList,
        deleteProjectList,
        setLists,
      });
      TaskApi.fetchTasks(projectState.selectedProjectUid, {
        findTask,
        addTask,
        updateTask,
        deleteTask,
        deleteAllTask,
        setTasks,
      });
    }
  }, [projectState.selectedProjectUid]);
  useEffect(() => {
    localStorage.setItem("localStorageItem", JSON.stringify(state));
  }, [state]);

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        activeTask,
        activeList,
        selectTask,
        selectList,
        onDrop,
        taskActions: {
          state,
          findTask,
          addTask,
          selectTaskState,
          clearSelectedTask,
          updateTask,
          deleteTask,
          deleteAllTask,
          setTasks,
        },
        listActions: {
          addList,
          updateList,
          deleteList,
          deleteProjectList,
          setLists,
        },
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
