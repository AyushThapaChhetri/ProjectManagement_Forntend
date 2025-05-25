// import type { TaskPayload } from "./types";
import type { Task, TaskAction } from "@/components/Cards/reducer/task.types";

type DispatchFn = React.Dispatch<TaskAction>;

const TaskApi = {
  async createTask(listId: string, dispatch: DispatchFn) {
    const newTask: Task = {
      id: `temp-${Date.now()}`, // Temporary ID; replace with backend ID
      listId: listId,
      uid: "", // Generates a UUID
      projectId: 1, // Example; adjust as needed
      name: "",
      priority: "low",
      status: "todo",
      createdAt: new Date(Date.now()).toISOString(),
      updatedAt: new Date(Date.now()).toISOString(),
      isEditing: true,
    };
    // console.log("Creating task:", newTask);
    dispatch({ type: "ADD_TASK", payload: newTask });
    // Example: return await axios.post("/tasks", payload);
  },

  // async getTasks(listId: string) {
  //   console.log("Fetching tasks for listId:", listId);
  //   // Example: return await axios.get(`/tasks?listId=${listId}`);
  // },

  async updateTask(id: string, task: Partial<Task>, dispatch: DispatchFn) {
    // console.log("Updating task:", task);

    dispatch({ type: "UPDATE_TASK", payload: { id: id, updates: task } });
  },

  async deleteTask(id: string, dispatch: DispatchFn) {
    // console.log("Deleting task:", id);
    dispatch({ type: "DELETE_TASK", payload: { id: id } });
    // Example: return await axios.delete(`/tasks/${id}`);
  },

  async deleteAllTask(id: string, dispatch: DispatchFn) {
    // console.log("Deleting all task with ListId:", id);
    dispatch({ type: "DELETE_ALL_TASK", payload: { id: id } });
    // Example: return await axios.delete(`/tasks/${id}`);
  },
};

export default TaskApi;
