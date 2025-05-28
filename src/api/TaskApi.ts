// import type { TaskPayload } from "./types";
import type { TaskContextType } from "@/components/Cards/context/TaskContext";
import type {
  // List,
  Task,
} from "@/components/Cards/reducer/task.types";

type taskActions = TaskContextType["taskActions"];

const TaskApi = {
  async createTask(listId: string, taskActions: taskActions) {
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
    taskActions.addTask(newTask);
    // Example: return await axios.post("/tasks", payload);
  },

  // async getTasks(listId: string) {
  //   console.log("Fetching tasks for listId:", listId);
  //   // Example: return await axios.get(`/tasks?listId=${listId}`);
  // },

  async editTask(id: string, task: Partial<Task>, taskActions: taskActions) {
    // console.log("Updating task:", task);
    taskActions.updateTask(id, task);
  },

  async deleteTask(id: string, taskActions: taskActions) {
    // console.log("Deleting task:", id);
    taskActions.deleteTask(id);
    // Example: return await axios.delete(`/tasks/${id}`);
  },

  async deleteAllTask(id: string, taskActions: taskActions) {
    // console.log("Deleting all task with ListId:", id);
    taskActions.deleteAllTask(id);
    // Example: return await axios.delete(`/tasks/${id}`);
  },
};

export default TaskApi;
