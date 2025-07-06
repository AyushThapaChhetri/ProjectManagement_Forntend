import type { TaskContextType } from "@/components/Cards/context/TaskContext";
import api from "./Api";

type listActions = TaskContextType["listActions"];
const ListApi = {
  async createList(
    listName: string,
    projectUid: string,
    listActions: listActions
  ) {
    // console.log("Creation of list");
    // const newList = {
    //   id: `temp-${Date.now()}`,
    //   uid: "",
    //   name: listName,
    //   projectUid: projectUid,
    //   createdAt: "",
    //   updatedAt: "",
    //   isEditing: true,
    // };
    const newList = {
      name: listName,
      projectUid: projectUid,
    };
    try {
      const response = await api.post("/lists", newList);
      const responseList = response.data;
      console.log(responseList.data);
      listActions.addList(responseList.data);
    } catch (error) {
      console.error("Failed to create project: ", error);
      throw error;
    }
  },
  async updateList(
    listUid: string,
    listName: string,
    listActions: listActions
  ) {
    try {
      const updateData = {
        name: listName,
      };
      const response = await api.patch(`/lists/${listUid}`, updateData);
      console.log("List update successful: ", response.data.data);
      listActions.updateList(listUid, response.data.data);
    } catch (error) {
      console.error("Failed to update project:", error);
      throw error;
    }
  },
  async deleteList(listUid: string, listActions: listActions) {
    // listActions.deleteList(listUid);
    try {
      console.log(`before deletion : /lists/${listUid}`);
      await api.delete(`/lists/${listUid}`);
      listActions.deleteList(listUid);
    } catch (error) {
      console.error("Failed to delete List: ", error);
      throw error;
    }
  },
  async deleteProjectList(projectId: string, listActions: listActions) {
    listActions.deleteProjectList(projectId);
  },
  async fetchLists(
    selectedProjectUid: string | null,
    listActions: listActions
  ) {
    try {
      if (!selectedProjectUid) return;
      const response = await api.get(`projects/${selectedProjectUid}/lists`);
      // const response = await api.get("/lists");
      const lists = response.data;
      listActions.setLists(lists.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  },
  // async (){

  // }
};

export default ListApi;
