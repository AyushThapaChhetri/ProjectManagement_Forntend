import type { AppState, TaskAction } from "./task.types";

export const taskReducer = (state: AppState, action: TaskAction): AppState => {
  switch (action.type) {
    case "SET_LISTS":
      return { ...state, lists: action.payload };

    case "ADD_LIST":
      return { ...state, lists: [...state.lists, action.payload] };

    case "UPDATE_LIST":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.uid === action.payload.id
            ? { ...list, ...action.payload.updates }
            : list
        ),
      };

    case "DELETE_LIST":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.listUid !== action.payload.id),
        lists: state.lists.filter((list) => list.uid !== action.payload.id),
      };

    case "MOVE_LIST": {
      const { listUid, position } = action.payload;

      // const listToMove = state.lists.find((t) => t.id === listUid);
      // if (!listToMove) return state;

      // const filteredState = state.lists.filter((t) => t.id !== listUid);

      // reordered = [...[A, B], X, ...[C, D]] → [A, B, X, C, D]
      // Break an array into individual elements and flatten them into a new array.
      // const reordered = [
      //   ...filteredState.slice(0, position),
      //   listToMove,
      //   ...filteredState.slice(position),
      // ];
      const oldIndex = state.lists.findIndex((l) => l.uid === listUid);
      if (oldIndex === -1) return state;

      // Compute the adjusted insertion index
      const insertAt = oldIndex < position ? position - 1 : position;

      // Build the filtered list (item removed)
      const filtered = state.lists.filter((l) => l.uid !== listUid);

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
      const { pUid } = action.payload;
      return {
        ...state,
        tasks: state?.tasks?.filter((t) => t.projectUid !== pUid),
        lists: state?.lists?.filter((l) => l.projectUid !== pUid),
      };
    }

    case "REVERT_LISTS": {
      return {
        ...state,
        lists: action.payload,
      };
    }

    case "SET_TASKS":
      return { ...state, tasks: action.payload };

    case "SELECT_TASKS": {
      const task = state.tasks.find((task) => task.uid === action.payload.uid);
      return { ...state, selectedTask: task ?? null };
    }

    case "CLEAR_SELECTED_TASK": {
      return { ...state, selectedTask: null };
    }

    case "FIND_TASK": {
      const foundTask = state.tasks.find(
        (task) => task.uid === action.payload.uid
      );
      return { ...state, selectedTask: foundTask ?? null };
    }
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.uid === action.payload.uid
            ? { ...task, ...action.payload.updates }
            : task
        ),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.uid === action.payload.uid
            ? { ...task, ...action.payload.updates }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.uid !== action.payload.uid),
      };

    case "DELETE_ALL_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.listUid !== action.payload.id),
      };
    case "MOVE_TASK": {
      const { uid, listUid, position } = action.payload;

      // 1) Remove the task from wherever it was
      const taskToMove = state.tasks.find((t) => t.uid === uid);
      if (!taskToMove) return state;

      const withoutTask = state.tasks.filter((t) => t.uid !== uid);

      // 2) Update its listUid
      const moved = { ...taskToMove, listUid };

      // 3) Split the tasks that belong to target list
      const otherLists = withoutTask.filter((t) => t.listUid !== listUid);
      const sameList = withoutTask.filter((t) => t.listUid === listUid);

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
    case "REVERT_TASKS": {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    default:
      return state;
  }
};

// case "RESET_STATE":
//   return initialState;
