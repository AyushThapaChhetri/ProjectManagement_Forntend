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

    case "MOVE_LIST": {
      const { listId, position } = action.payload;

      // const listToMove = state.lists.find((t) => t.id === listId);
      // if (!listToMove) return state;

      // const filteredState = state.lists.filter((t) => t.id !== listId);

      // reordered = [...[A, B], X, ...[C, D]] → [A, B, X, C, D]
      // Break an array into individual elements and flatten them into a new array.
      // const reordered = [
      //   ...filteredState.slice(0, position),
      //   listToMove,
      //   ...filteredState.slice(position),
      // ];
      const oldIndex = state.lists.findIndex((l) => l.id === listId);
      if (oldIndex === -1) return state;

      // Compute the adjusted insertion index
      const insertAt = oldIndex < position ? position - 1 : position;

      // Build the filtered list (item removed)
      const filtered = state.lists.filter((l) => l.id !== listId);

      // Re-insert at the corrected position
      const reordered = [
        ...filtered.slice(0, insertAt),
        state.lists[oldIndex], // the item being moved
        ...filtered.slice(insertAt),
      ];

      return {
        ...state,
        lists: reordered,
      };
    }

    case "DELETE_PROJECT_LIST": {
      const { pId } = action.payload;
      return {
        ...state,
        tasks: state?.tasks?.filter((t) => t.projectId !== pId),
        lists: state?.lists?.filter((l) => l.projectId !== pId),
      };
    }

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

// case "RESET_STATE":
//   return initialState;
