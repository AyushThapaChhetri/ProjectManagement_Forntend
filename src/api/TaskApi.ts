// import type { TaskPayload } from "./types";
import type { TaskContextType } from "@/components/Cards/context/TaskContext";
import type {
  // List,
  Task,
} from "@/components/Cards/reducer/task.types";
import api from "./Api";

type taskActions = TaskContextType["taskActions"];

const TaskApi = {
  async createTask(
    listUid: string,
    projectUid: string,
    taskActions: taskActions
  ) {
    const newTask: Task = {
      id: `temp-${Date.now()}`, // Temporary ID; replace with backend ID
      listUid: listUid,
      uid: "",
      projectUid: projectUid,
      name: "",
      priority: "low",
      status: "todo",
      createdAt: "",
      updatedAt: "",
      isEditing: true,
    };
    console.log("Creating task:", newTask);
    taskActions.addTask(newTask);
    // Example: return await axios.post("/tasks", payload);
  },

  async editTask(id: string, task: Partial<Task>, taskActions: taskActions) {
    const currentTask = taskActions.state.tasks.find((t) => t.id === id);
    if (!currentTask) return;

    if (currentTask.isEditing) {
      if (task.name && task.name.trim() !== "") {
        try {
          const response = await api.post("/tasks", {
            listUid: currentTask.listUid,
            projectUid: currentTask.projectUid,
            name: task.name,
            priority: currentTask.priority,
            status: currentTask.status,
          });
          const serverTask = response.data.data;
          console.log("From", serverTask);
          // Replace temporary task with server task
          taskActions.editTask(id, {
            ...serverTask,
            isEditing: false,
          });
          // Create new temporary task
          this.createTask(
            currentTask.listUid,
            currentTask.projectUid,
            taskActions
          );
        } catch (error) {
          console.error("Failed to create task on server:", error);
          throw error;
        }
      }
    }
    // else {
    //   // Update existing server task
    //   try {
    //     await api.patch(`/tasks/${currentTask.uid}`, task);
    //     taskActions.updateTask(id, task);
    //   } catch (error) {
    //     console.error("Failed to update task:", error);
    //     throw error;
    //   }
    // }
  },

  async updateTask(uid: string, task: Partial<Task>, taskActions: taskActions) {
    try {
      const response = await api.patch(`/tasks/${uid}`, task);
      const serverTask = response.data.data;
      console.log("From server after updation", serverTask);
      // Replace temporary task with server task
      taskActions.updateTask(serverTask.uid, serverTask);
    } catch (error) {
      console.error("Failed to update task on server:", error);
      throw error;
    }
  },
  async deleteTask(id: string, taskActions: taskActions) {
    const task = taskActions.state.tasks.find((t) => t.id === id);
    if (!task) return;

    if (!task.isEditing) {
      try {
        await api.delete(`/tasks/${task.uid}`);
      } catch (error) {
        console.error("Failed to delete task from server:", error);
        throw error;
      }
    }
    taskActions.deleteTask(id);
  },

  async deleteAllTask(listUid: string, taskActions: taskActions) {
    // console.log("Deleting all task with ListId:", id);
    try {
      await api.delete(`/tasks/list/${listUid}`);
    } catch (error) {
      console.error("Failed to delete task from server:", error);
      throw error;
    }
    taskActions.deleteAllTask(listUid);
  },
  async fetchTasks(
    selectedProjectUid: string | null,
    taskActions: Pick<
      taskActions,
      | "findTask"
      | "addTask"
      | "updateTask"
      | "deleteTask"
      | "deleteAllTask"
      | "setTasks"
    >
  ) {
    try {
      // const response = await api.get("tasks");

      if (!selectedProjectUid) return;
      const response = await api.get(`projects/${selectedProjectUid}/tasks`);
      const tasks = response.data;
      taskActions.setTasks(tasks.data);
    } catch (error) {
      console.log("Failed to fetch Tasks: ", error);
    }
  },
};

export default TaskApi;
