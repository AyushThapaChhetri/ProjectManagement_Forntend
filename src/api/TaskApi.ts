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
    taskName: string,
    listUid: string,
    projectUid: string,
    taskActions: taskActions
  ) {
    const newTask = {
      name: taskName,
      listUid: listUid,
      projectUid: projectUid,
      priority: "low",
      status: "todo",
    };
    // console.log("Creating task:", newTask);

    try {
      const response = await api.post(`/tasks`, newTask);
      const serverTask = response.data.data;
      // console.log("From server after updation", serverTask);
      // Replace temporary task with server task
      taskActions.addTask(serverTask);
    } catch (error) {
      console.error("Failed to create task on server:", error);
      throw error;
    }
    // Example: return await axios.post("/tasks", payload);
  },

  async updateTask(uid: string, task: Partial<Task>, taskActions: taskActions) {
    try {
      const response = await api.patch(`/tasks/${uid}`, task);
      const serverTask = response.data.data;
      console.log("From server after updation", serverTask);
      // // Replace temporary task with server task
      taskActions.updateTask(serverTask.uid, serverTask);
      console.log("Updation datas", task);
    } catch (error) {
      console.error("Failed to update task on server:", error);
      throw error;
    }
  },
  async deleteTask(uid: string, taskActions: taskActions) {
    try {
      await api.delete(`/tasks/${uid}`);
      taskActions.deleteTask(uid);
    } catch (error) {
      console.error("Failed to delete task from server:", error);
      throw error;
    }
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

  async selectTaskState(taskUid: string, taskActions: taskActions) {
    taskActions.selectTaskState(taskUid);
  },
  async clearSelectedTask(taskActions: taskActions) {
    taskActions.clearSelectedTask();
  },
  async getUsersByUids(taskUid: string) {
    try {
      // console.log(`Before Data: /tasks/${taskUid}/assigned_Users `);
      const response = await api.get(`/tasks/${taskUid}/assigned_Users`);
      const users = response.data.data.assignedToUsers;
      // console.log("From server Data: ", users);
      const mappedResponse = users.map(
        (user: {
          uid: string;
          firstName: string;
          lastName: string;
          email: string;
        }) => {
          return { uid: user.uid, name: `${user.firstName} ${user.lastName}` };
        }
      );
      // console.log("MappedUser: ", mappedResponse);
      return mappedResponse;
    } catch (error) {
      console.log("Failed to fetch Assigned Users: ", error);
      throw error;
    }
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
      // console.log("Fetch From TaaskApi from apis: ", tasks);
      taskActions.setTasks(tasks.data);
    } catch (error) {
      console.log("Failed to fetch Tasks: ", error);
      throw error;
    }
  },
};

export default TaskApi;
