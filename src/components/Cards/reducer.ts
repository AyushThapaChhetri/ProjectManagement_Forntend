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
        lists: state.lists.filter((list) => list.id !== action.payload),
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
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};
