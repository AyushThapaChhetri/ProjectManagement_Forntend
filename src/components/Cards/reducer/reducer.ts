import type { AppState, TaskAction } from "./task.types";

export const taskReducer = (state: AppState, action: TaskAction): AppState => {
  switch (action.type) {
    case "ADD_LIST":
      return { ...state, lists: [...state.lists, action.payload] };

    case "UPDATE_LIST":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.id
            ? { ...list, ...action.payload.updates }
            : list
        ),
      };

    case "DELETE_LIST":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.listId !== action.payload.id),
        lists: state.lists.filter((list) => list.id !== action.payload.id),
      };

    // case "SET_TASKS":
    //   return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case "DELETE_ALL_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.listId !== action.payload.id),
      };
    case "MOVE_TASK": {
      const { id, listId, position } = action.payload;

      // 1) Remove the task from wherever it was
      const taskToMove = state.tasks.find((t) => t.id === id);
      if (!taskToMove) return state;

      const withoutTask = state.tasks.filter((t) => t.id !== id);

      // 2) Update its listId
      const moved = { ...taskToMove, listId };

      // 3) Split the tasks that belong to target list
      const otherLists = withoutTask.filter((t) => t.listId !== listId);
      const sameList = withoutTask.filter((t) => t.listId === listId);

      // 4) Insert at `position` in sameList
      const reordered = [
        ...sameList.slice(0, position),
        moved,
        ...sameList.slice(position),
      ];

      // 5) Merge back everything
      return {
        ...state,
        tasks: [...otherLists, ...reordered],
      };
    }
    default:
      return state;
  }
};
