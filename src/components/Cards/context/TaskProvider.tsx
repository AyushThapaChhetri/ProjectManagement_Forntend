import { useEffect, useReducer, useRef, useState, type ReactNode } from "react";

import { initialState } from "../reducer/taskInitialState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "../reducer/reducer";
import type { List, Task } from "../reducer/task.types";
import ListApi from "@/api/ListApi";
import TaskApi from "@/api/TaskApi";
import { useProjectContext } from "@/hooks/userProjectContext";
import api from "@/api/Api";

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

  const prevTasksRef = useRef<Task[]>([]);
  const prevListsRef = useRef<List[]>([]);

  const onDrop = async (position: number, listUid?: string) => {
    try {
      // First check if we're dropping a list
      if (activeList) {
        prevListsRef.current = [...state.lists];
        dispatch({
          type: "MOVE_LIST",
          payload: { listUid: activeList, position },
        });

        // Moved setActiveList to dragend callback
        return;
      }

      if (activeTask && listUid) {
        // Capture the previous task state before making changes
        prevTasksRef.current = [...state.tasks];
        // Sync first
        dispatch({
          type: "MOVE_TASK",
          payload: {
            uid: activeTask,
            listUid,
            position,
          },
        });

        // Sync with backend, passing the previous state for potential revert

        return;
      }
    } finally {
      // Always reset active states after drop
      setActiveList(null);
      setActiveTask(null);
    }
  };
  useEffect(() => {
    if (prevListsRef.current.length > 0) {
      syncListOrderWithBackend(state.lists, prevListsRef.current);
    }
  }, [state.lists]);

  const syncListOrderWithBackend = async (
    currentList: List[],
    previousList: List[]
  ) => {
    console.log("List of previous states: ", previousList);
    console.log("List of states: ", currentList);

    const updated = currentList.map((list: List, index) => {
      return {
        uid: list.uid,
        projectUid: list.projectUid,
        position: index,
      };
    });

    console.log("Updated form of Array: ", updated);
    try {
      console.log("This is sent to server : ", { lists: updated });

      await api.patch("/lists/reorder", { lists: updated });
      console.log("Hello not executed");
    } catch (error) {
      console.error("Sync failed:", error);
      dispatch({
        type: "REVERT_LISTS",
        payload: previousList,
      });
      throw error;
    }
  };

  useEffect(() => {
    if (prevTasksRef.current.length > 0) {
      syncTaskOrderWithBackend(state.tasks, prevTasksRef.current);
      prevTasksRef.current = [];
    }
  }, [state.tasks]);

  const syncTaskOrderWithBackend = async (
    currentTask: Task[],
    previousTasks: Task[]
  ) => {
    // Group tasks by listUid
    // It groups all tasks into separate arrays based on their listUid.
    //     {
    //   "list-1": [taskA, taskB, taskC],
    //   "list-2": [taskD, taskE],

    // }
    const tasksByList = currentTask.reduce<Record<string, Task[]>>(
      (acc, task: Task) => {
        if (!acc[task.listUid]) {
          acc[task.listUid] = [];
        }
        acc[task.listUid].push(task);
        return acc;
      },
      {}
    );

    console.log("Task by List form task provider: ", tasksByList);

    // Prepare updates
    //     For every task inside each list:
    // Assign it a new order based on its current index (which reflects drag & drop).
    //     [
    //   { uid: "task-1", listUid: "list-1", order: 0 },
    //   { uid: "task-2", listUid: "list-1", order: 1 },
    //   { uid: "task-3", listUid: "list-2", order: 0 },
    // ]

    const updates: { uid: string; listUid: string; position: number }[] = [];
    for (const listUid in tasksByList) {
      const listTasks = tasksByList[listUid];
      listTasks.forEach((task, index) => {
        updates.push({
          uid: task.uid,
          listUid: task.listUid,
          position: index,
        });
      });
    }

    console.log("Hello ", updates);
    console.log("Updates  form task provider: ", updates);
    // Send to backend

    try {
      await api.patch("/tasks/reorder", { tasks: updates });

      console.log("Task order synced");
    } catch (error) {
      console.error("Sync failed:", error);
      dispatch({
        type: "REVERT_TASKS",
        payload: previousTasks,
      });
      throw error;
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
